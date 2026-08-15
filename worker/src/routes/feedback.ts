import { Hono } from 'hono';
import type { Env } from '../types/env';

export const feedbackRouter = new Hono<Env>();

/**
 * POST /api/feedbacks/submit
 * Allows anonymous submission of policy corrections, official gazette updates, or suggestions
 */
feedbackRouter.post('/submit', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const { visaId, pageUrl, category = 'correction', content, contact } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return c.json(
        {
          success: false,
          error: '请填写详细的纠错或反馈内容',
        },
        400
      );
    }

    const clientIp = c.req.header('cf-connecting-ip') || c.req.header('x-real-ip') || c.req.header('x-forwarded-for') || '127.0.0.1';
    const clientCountry = c.req.header('cf-ipcountry') || 'CN';
    const clientCity = c.req.header('cf-ipcity') || 'Local';

    const feedbackId = crypto.randomUUID();
    const now = new Date().toISOString();
    const currentUrl = pageUrl || c.req.header('referer') || '/';

    await c.env.DB.prepare(
      `INSERT INTO feedbacks (id, visa_id, page_url, category, content, contact, client_ip, client_country, client_city, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        feedbackId,
        visaId || null,
        currentUrl,
        category,
        content.trim(),
        contact?.trim() || null,
        clientIp,
        clientCountry,
        clientCity,
        now
      )
      .run();

    return c.json({
      success: true,
      data: {
        id: feedbackId,
        category,
        createdAt: now,
        message: '感谢您为出海信息透明化与政策准确性贡献力量！',
      },
    });
  } catch (err: any) {
    console.error('Submit feedback error:', err);
    return c.json({ success: false, error: err.message || '提交反馈失败，请稍后再试' }, 500);
  }
});
