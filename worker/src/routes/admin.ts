import { Hono } from 'hono';
import type { Env } from '../types/env';
import { verifyJwt } from '../utils/crypto';

export const adminRouter = new Hono<Env>();

/**
 * Admin Secret Authentication Middleware
 */
async function verifyAdminSecret(c: any): Promise<boolean> {
  const configuredSecret = c.env?.ADMIN_SECRET || 'visarank2026_master_key';
  const querySecret = c.req.query('secret');
  const headerSecret = c.req.header('x-admin-secret');

  if (querySecret === configuredSecret || headerSecret === configuredSecret) {
    return true;
  }

  // Check Bearer token (Master Key or Admin JWT)
  const authHeader = c.req.header('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === configuredSecret) return true;
    try {
      const payload = await verifyJwt(token, c.env?.JWT_SECRET);
      if (payload && (payload.role === 'admin' || payload.email === 'rongfeiliu3@gmail.com')) {
        return true;
      }
    } catch {}
  }

  return false;
}

/**
 * Middleware for all /api/admin routes
 */
adminRouter.use('*', async (c, next) => {
  const isAuthorized = await verifyAdminSecret(c);
  if (!isAuthorized) {
    return c.json(
      {
        success: false,
        error: '未授权的 Admin 访问凭证，请输入 Master Key 或以管理员账号登录',
      },
      401
    );
  }
  return await next();
});

/**
 * GET /api/admin/users
 * Returns list of registered users
 */
adminRouter.get('/users', async (c) => {
  try {
    const userRows = await c.env.DB.prepare(
      `SELECT id, email, name, role, created_at, last_login_at
       FROM users
       ORDER BY created_at DESC
       LIMIT 100`
    ).all();

    return c.json({
      success: true,
      data: userRows.results || [],
    });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || '获取用户列表失败' }, 500);
  }
});

/**
 * GET /api/admin/overview
 * Returns statistical summary & recent 50 detailed assessment profiles
 */
adminRouter.get('/overview', async (c) => {
  try {
    // 1. Total Registered Users
    const usersCountRes = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
    const totalUsers = usersCountRes?.count ?? 0;

    // 2. Total Assessments
    const assessCountRes = await c.env.DB.prepare('SELECT COUNT(*) as count FROM user_assessments').first<{ count: number }>();
    const totalAssessments = assessCountRes?.count ?? 0;

    // 3. Total Feedbacks
    let totalFeedbacks = 0;
    try {
      const feedCountRes = await c.env.DB.prepare('SELECT COUNT(*) as count FROM feedbacks').first<{ count: number }>();
      totalFeedbacks = feedCountRes?.count ?? 0;
    } catch {}

    // 4. Recent 50 Assessments
    const rawRows = await c.env.DB.prepare(
      `SELECT a.id, a.user_id, a.title, a.profile_snapshot, a.result_snapshot, a.created_at, u.email as user_email
       FROM user_assessments a
       LEFT JOIN users u ON a.user_id = u.id
       ORDER BY a.created_at DESC
       LIMIT 50`
    ).all();

    // 5. Recent 20 Feedbacks
    let recentFeedbacks: any[] = [];
    try {
      const feedRows = await c.env.DB.prepare(
        `SELECT id, visa_id, page_url, category, content, contact, client_ip, client_country, client_city, created_at
         FROM feedbacks
         ORDER BY created_at DESC
         LIMIT 20`
      ).all();
      recentFeedbacks = feedRows.results || [];
    } catch {}

    const recentAssessments = rawRows.results.map((row: any) => {
      let profile: any = {};
      let results: any[] = [];
      try {
        profile = JSON.parse(row.profile_snapshot || '{}');
      } catch {}
      try {
        results = JSON.parse(row.result_snapshot || '[]');
      } catch {}

      const clientMeta = profile._clientMeta || {};
      const tier1Matches = Array.isArray(results)
        ? results.filter((r) => r.tier === 'tier1').map((r) => `${r.countryName} (${r.matchScore}分)`)
        : [];

      const topMatch = Array.isArray(results) && results.length > 0 ? results[0] : null;

      return {
        id: row.id,
        createdAt: row.created_at,
        isGuest: !row.user_id,
        userEmail: row.user_email || null,
        clientIp: clientMeta.clientIp || 'unknown',
        clientCountry: clientMeta.clientCountry || 'unknown',
        clientCity: clientMeta.clientCity || 'unknown',
        profile: {
          age: profile.age ?? null,
          maritalStatus: profile.maritalStatus ?? null,
          domesticCityTier: profile.domesticCityTier ?? null,
          educationLevel: profile.educationLevel ?? null,
          fieldCategory: profile.fieldCategory ?? null,
          specificJobOrMajor: profile.specificJobOrMajor ?? '',
          experienceYears: profile.experienceYears ?? null,
          englishBand: profile.englishBand ?? null,
          budgetTier: profile.budgetTier ?? null,
          pathwayPreference: profile.pathwayPreference ?? null,
          corePriority: profile.corePriority ?? null,
          departureMotivations: profile.departureMotivations || [],
        },
        rawProfileJson: profile,
        tier1Matches,
        topRecommendation: topMatch
          ? {
              country: topMatch.countryName,
              score: topMatch.matchScore,
              visa: topMatch.primaryVisa,
            }
          : null,
      };
    });

    return c.json({
      success: true,
      data: {
        totalUsers,
        totalAssessments,
        totalFeedbacks,
        recentCount: recentAssessments.length,
        recentAssessments,
        recentFeedbacks,
      },
    });
  } catch (err: any) {
    console.error('Admin overview error:', err);
    return c.json({ success: false, error: err.message || '获取数据大盘失败' }, 500);
  }
});

/**
 * GET /api/admin/feedbacks
 * Fetch all submitted feedbacks
 */
adminRouter.get('/feedbacks', async (c) => {
  try {
    const feedRows = await c.env.DB.prepare(
      `SELECT id, visa_id, page_url, category, content, contact, client_ip, client_country, client_city, created_at
       FROM feedbacks
       ORDER BY created_at DESC
       LIMIT 100`
    ).all();

    return c.json({
      success: true,
      data: feedRows.results || [],
    });
  } catch (err: any) {
    console.error('Admin fetch feedbacks error:', err);
    return c.json({ success: false, error: err.message || '获取反馈列表失败' }, 500);
  }
});

/**
 * GET /api/admin/export.csv
 * Stream/export all assessment records into UTF-8 CSV
 */
adminRouter.get('/export.csv', async (c) => {
  try {
    const rawRows = await c.env.DB.prepare(
      `SELECT a.id, a.user_id, a.title, a.profile_snapshot, a.result_snapshot, a.created_at, u.email as user_email
       FROM user_assessments a
       LEFT JOIN users u ON a.user_id = u.id
       ORDER BY a.created_at DESC
       LIMIT 1000`
    ).all();

    const headers = [
      '测算ID',
      '测算时间',
      '用户类型',
      '注册邮箱',
      '访客IP',
      '访客国家/地区',
      '访客城市',
      '年龄',
      '婚姻随行',
      '国内城市层级',
      '最高学历',
      '专业赛道',
      '具体岗位专业',
      '全职工作年限',
      '英语水平',
      '出海预算',
      '偏好路径',
      '第一核心诉求',
      'Tier 1 推荐国家',
      '最高匹配国家',
      '首选签证通道',
      '匹配最高得分',
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = rawRows.results.map((row: any) => {
      let profile: any = {};
      let results: any[] = [];
      try {
        profile = JSON.parse(row.profile_snapshot || '{}');
      } catch {}
      try {
        results = JSON.parse(row.result_snapshot || '[]');
      } catch {}

      const clientMeta = profile._clientMeta || {};
      const tier1Matches = Array.isArray(results)
        ? results.filter((r) => r.tier === 'tier1').map((r) => `${r.countryName}(${r.matchScore}分)`).join('; ')
        : '';
      const topMatch = Array.isArray(results) && results.length > 0 ? results[0] : null;

      return [
        row.id,
        row.created_at,
        row.user_id ? '注册用户' : '匿名访客',
        row.user_email || '',
        clientMeta.clientIp || '',
        clientMeta.clientCountry || '',
        clientMeta.clientCity || '',
        profile.age ?? '',
        profile.maritalStatus ?? '',
        profile.domesticCityTier ?? '',
        profile.educationLevel ?? '',
        profile.fieldCategory ?? '',
        profile.specificJobOrMajor ?? '',
        profile.experienceYears ?? '',
        profile.englishBand ?? '',
        profile.budgetTier ?? '',
        profile.pathwayPreference ?? '',
        profile.corePriority ?? '',
        tier1Matches,
        topMatch?.countryName || '',
        topMatch?.primaryVisa || '',
        topMatch?.matchScore ?? '',
      ].map(escapeCsv).join(',');
    });

    // Add UTF-8 BOM for Microsoft Excel compatibility
    const csvContent = '\uFEFF' + headers.map(escapeCsv).join(',') + '\n' + rows.join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="visarank_assessments_${new Date().toISOString().substring(0, 10)}.csv"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Admin export error:', err);
    return c.json({ success: false, error: err.message || '导出 CSV 失败' }, 500);
  }
});
