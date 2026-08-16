import { Hono } from 'hono';
import type { Env } from '../types/env';
import { SaveAssessmentInputSchema, type UserAssessmentRecord } from '@emigrant/shared';
import { verifyJwt } from '../utils/crypto';

export const assessmentsRouter = new Hono<Env>();

/**
 * Helper to extract userId from Authorization header if present
 */
async function extractUserId(c: any): Promise<string | null> {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  const payload = await verifyJwt(token, c.env.JWT_SECRET);
  return payload ? payload.userId : null;
}

/**
 * POST /api/assessments/save
 * Save assessment record (supports logged-in user and anonymous)
 */
assessmentsRouter.post('/save', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const parsed = SaveAssessmentInputSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || '测算记录数据格式不正确',
        },
        400
      );
    }

    const { title, profileSnapshot, resultSnapshot } = parsed.data;
    const userId = await extractUserId(c);

    // Extract Cloudflare Edge Geo & Client Headers
    const clientIp = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || c.req.header('x-forwarded-for') || '127.0.0.1';
    const clientCountry = c.req.header('cf-ipcountry') || 'CN';
    const clientCity = c.req.header('cf-ipcity') || 'Local';
    const userAgent = c.req.header('user-agent') || 'Unknown';

    const recordId = crypto.randomUUID();
    const now = new Date().toISOString();
    const recordTitle = title || `全球智能选国方案 (${now.substring(0, 10)})`;

    // Enrich profile snapshot with client analytics metadata
    const enrichedProfile = {
      ...profileSnapshot,
      _clientMeta: {
        clientIp,
        clientCountry,
        clientCity,
        userAgent,
        savedAt: now,
        isGuest: !userId,
      },
    };

    await c.env.DB.prepare(
      `INSERT INTO user_assessments (id, user_id, title, profile_snapshot, result_snapshot, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(
        recordId,
        userId,
        recordTitle,
        JSON.stringify(enrichedProfile),
        JSON.stringify(resultSnapshot),
        now
      )
      .run();

    return c.json({
      success: true,
      data: {
        id: recordId,
        userId,
        title: recordTitle,
        isGuest: !userId,
        createdAt: now,
      },
    });
  } catch (err: any) {
    console.error('Save assessment error:', err);
    return c.json({ success: false, error: err.message || '保存测算方案失败' }, 500);
  }
});

/**
 * GET /api/assessments/history
 * Fetch assessment records for current logged-in user
 */
assessmentsRouter.get('/history', async (c) => {
  try {
    const userId = await extractUserId(c);
    if (!userId) {
      return c.json({ success: false, error: '请先登录以查看历史测算方案' }, 401);
    }

    const results = await c.env.DB.prepare(
      `SELECT id, user_id, title, profile_snapshot, result_snapshot, created_at
       FROM user_assessments
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`
    )
      .bind(userId)
      .all();

    const records: UserAssessmentRecord[] = results.results.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      title: row.title || '全球智能选国方案',
      profileSnapshot: row.profile_snapshot ? JSON.parse(row.profile_snapshot) : null,
      resultSnapshot: row.result_snapshot ? JSON.parse(row.result_snapshot) : null,
      createdAt: row.created_at,
    }));

    return c.json({ success: true, data: records });
  } catch (err: any) {
    console.error('Fetch assessment history error:', err);
    return c.json({ success: false, error: err.message || '获取历史记录失败' }, 500);
  }
});

/**
 * GET /api/assessments/:id
 * Retrieve a specific assessment snapshot
 */
assessmentsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const row: any = await c.env.DB.prepare(
      `SELECT id, user_id, title, profile_snapshot, result_snapshot, created_at
       FROM user_assessments
       WHERE id = ?`
    )
      .bind(id)
      .first();

    if (!row) {
      return c.json({ success: false, error: '未找到该测算记录' }, 404);
    }

    const record: UserAssessmentRecord = {
      id: row.id,
      userId: row.user_id,
      title: row.title || '全球智能选国方案',
      profileSnapshot: row.profile_snapshot ? JSON.parse(row.profile_snapshot) : null,
      resultSnapshot: row.result_snapshot ? JSON.parse(row.result_snapshot) : null,
      createdAt: row.created_at,
    };

    return c.json({ success: true, data: record });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || '读取方案详情失败' }, 500);
  }
});
