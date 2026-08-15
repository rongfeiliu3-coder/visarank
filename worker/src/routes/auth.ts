import { Hono } from 'hono';
import type { Env } from '../types/env';
import { LoginInputSchema, RegisterInputSchema } from '@emigrant/shared';
import { hashPassword, verifyPassword, signJwt, verifyJwt } from '../utils/crypto';

export const authRouter = new Hono<Env>();

/**
 * POST /api/auth/register
 */
authRouter.post('/register', async (c) => {
  try {
    const body = await c.req.json();
    const parsed = RegisterInputSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || '注册信息格式不正确',
        },
        400
      );
    }

    const { email, password, name } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing: any = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
      .bind(normalizedEmail)
      .first();

    if (existing) {
      return c.json({ success: false, error: '该邮箱已被注册，请直接登录' }, 400);
    }

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const displayName = name?.trim() || normalizedEmail.split('@')[0];

    await c.env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, name, created_at, last_login_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(userId, normalizedEmail, passwordHash, displayName, now, now)
      .run();

    const user = {
      id: userId,
      email: normalizedEmail,
      name: displayName,
      createdAt: now,
      lastLoginAt: now,
    };

    const token = await signJwt(
      { userId, email: normalizedEmail },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      user,
      token,
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return c.json({ success: false, error: err.message || '注册失败，请重试' }, 500);
  }
});

/**
 * POST /api/auth/login
 */
authRouter.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const parsed = LoginInputSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || '登录信息格式不正确',
        },
        400
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    const row: any = await c.env.DB.prepare(`SELECT * FROM users WHERE email = ?`)
      .bind(normalizedEmail)
      .first();

    if (!row) {
      return c.json({ success: false, error: '账号不存在或密码错误' }, 401);
    }

    const isValid = await verifyPassword(password, row.password_hash);
    if (!isValid) {
      return c.json({ success: false, error: '账号不存在或密码错误' }, 401);
    }

    const now = new Date().toISOString();
    c.executionCtx?.waitUntil(
      c.env.DB.prepare(`UPDATE users SET last_login_at = ? WHERE id = ?`)
        .bind(now, row.id)
        .run()
        .catch((e) => console.error('Failed to update last_login_at:', e))
    );

    const user = {
      id: row.id,
      email: row.email,
      name: row.name || row.email.split('@')[0],
      createdAt: row.created_at,
      lastLoginAt: now,
    };

    const token = await signJwt(
      { userId: row.id, email: row.email },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      user,
      token,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return c.json({ success: false, error: err.message || '登录失败，请重试' }, 500);
  }
});

/**
 * GET /api/auth/me
 */
authRouter.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token) {
      return c.json({ success: false, error: '未登录或登录态已失效' }, 401);
    }

    const payload = await verifyJwt(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json({ success: false, error: 'Token 无效或已过期' }, 401);
    }

    const row: any = await c.env.DB.prepare(`SELECT id, email, name, created_at, last_login_at FROM users WHERE id = ?`)
      .bind(payload.userId)
      .first();

    if (!row) {
      return c.json({ success: false, error: '用户不存在' }, 404);
    }

    const user = {
      id: row.id,
      email: row.email,
      name: row.name || row.email.split('@')[0],
      createdAt: row.created_at,
      lastLoginAt: row.last_login_at,
    };

    return c.json({ success: true, user });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || '获取用户信息失败' }, 500);
  }
});

/**
 * POST /api/auth/logout
 */
authRouter.post('/logout', async (c) => {
  return c.json({ success: true, message: '已安全登出' });
});
