import { Hono } from 'hono';
import type { Env } from '../types/env';
import { LoginInputSchema, RegisterInputSchema, SendCodeInputSchema, ResetPasswordInputSchema } from '@emigrant/shared';
import { hashPassword, verifyPassword, signJwt, verifyJwt } from '../utils/crypto';
import { sendVerificationEmail } from '../utils/mailer';

export const authRouter = new Hono<Env>();

/**
 * POST /api/auth/register
 */
authRouter.post('/register', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
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
    const role = normalizedEmail === 'rongfeiliu3@gmail.com' ? 'admin' : 'user';

    await c.env.DB.prepare(
      `INSERT INTO users (id, email, password_hash, name, role, created_at, last_login_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(userId, normalizedEmail, passwordHash, displayName, role, now, now)
      .run();

    const user = {
      id: userId,
      email: normalizedEmail,
      name: displayName,
      role,
      createdAt: now,
      lastLoginAt: now,
    };

    const token = await signJwt(
      { userId, email: normalizedEmail, role },
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
    const body = await c.req.json().catch(() => ({}));
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

    const userRole = row.role || (normalizedEmail === 'rongfeiliu3@gmail.com' ? 'admin' : 'user');

    const user = {
      id: row.id,
      email: row.email,
      name: row.name || row.email.split('@')[0],
      role: userRole,
      createdAt: row.created_at,
      lastLoginAt: now,
    };

    const token = await signJwt(
      { userId: row.id, email: row.email, role: userRole },
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
 * POST /api/auth/send-code
 * Send 6-digit verification code via Resend email
 */
authRouter.post('/send-code', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const parsed = SendCodeInputSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || '邮箱格式不正确',
        },
        400
      );
    }

    const { email, purpose } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    // If purpose is reset_password, check if user exists
    if (purpose === 'reset_password') {
      const userExists = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`)
        .bind(normalizedEmail)
        .first();

      if (!userExists) {
        return c.json(
          {
            success: false,
            error: '该邮箱尚未注册 VisaRank 账号，请先注册',
          },
          400
        );
      }
    }

    // Rate Limiting: Check if code requested in last 60 seconds (10 min TTL -> expires_at > now + 9 min)
    const threshold = Date.now() + 9 * 60 * 1000;
    const recentCode: any = await c.env.DB.prepare(
      `SELECT id, expires_at FROM verification_codes
       WHERE email = ? AND purpose = ? AND expires_at > ?
       ORDER BY expires_at DESC LIMIT 1`
    )
      .bind(normalizedEmail, purpose, threshold)
      .first();

    if (recentCode) {
      const waitSeconds = Math.max(1, Math.ceil((recentCode.expires_at - threshold) / 1000));
      return c.json(
        {
          success: false,
          error: `验证码已发送至您的邮箱，请查收邮件或等待 ${waitSeconds} 秒后重新获取`,
          remainingSeconds: waitSeconds,
        },
        429
      );
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeId = crypto.randomUUID();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    // Save to D1
    await c.env.DB.prepare(
      `INSERT INTO verification_codes (id, email, code, purpose, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(codeId, normalizedEmail, code, purpose, expiresAt, new Date().toISOString())
      .run();

    // Send email via Resend
    const sendResult = await sendVerificationEmail({
      toEmail: normalizedEmail,
      code,
      purpose,
      apiKey: c.env.RESEND_API_KEY,
      fromEmail: c.env.EMAIL_FROM,
    });

    if (!sendResult.success) {
      return c.json(
        {
          success: false,
          error: sendResult.error || '验证码邮件发送失败，请稍后重试',
        },
        500
      );
    }

    return c.json({
      success: true,
      message: '6 位数字安全验证码已发送至您的邮箱，请在 10 分钟内完成验证。',
      expiresInSeconds: 600,
    });
  } catch (err: any) {
    console.error('Send code error:', err);
    return c.json({ success: false, error: err.message || '发送验证码失败' }, 500);
  }
});

/**
 * POST /api/auth/reset-password
 * Verify 6-digit code and reset user password
 */
authRouter.post('/reset-password', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const parsed = ResetPasswordInputSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || '重置密码信息格式不正确',
        },
        400
      );
    }

    const { email, code, newPassword } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();
    const nowTimestamp = Date.now();

    // Verify code in D1
    const validCodeRecord: any = await c.env.DB.prepare(
      `SELECT id, expires_at, used_at FROM verification_codes
       WHERE email = ? AND code = ? AND purpose = 'reset_password' AND used_at IS NULL AND expires_at > ?
       ORDER BY created_at DESC LIMIT 1`
    )
      .bind(normalizedEmail, code.trim(), nowTimestamp)
      .first();

    if (!validCodeRecord) {
      return c.json(
        {
          success: false,
          error: '验证码无效或已过期，请核对后重新输入或重新获取',
        },
        400
      );
    }

    // Check user existence
    const userRow: any = await c.env.DB.prepare(`SELECT * FROM users WHERE email = ?`)
      .bind(normalizedEmail)
      .first();

    if (!userRow) {
      return c.json({ success: false, error: '未找到该邮箱对应的用户账号' }, 404);
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);
    const nowIso = new Date().toISOString();

    // Update password in DB
    await c.env.DB.prepare(
      `UPDATE users SET password_hash = ?, last_login_at = ? WHERE email = ?`
    )
      .bind(newPasswordHash, nowIso, normalizedEmail)
      .run();

    // Mark verification code as used
    await c.env.DB.prepare(
      `UPDATE verification_codes SET used_at = ? WHERE id = ?`
    )
      .bind(nowTimestamp, validCodeRecord.id)
      .run();

    const userRole = userRow.role || (normalizedEmail === 'rongfeiliu3@gmail.com' ? 'admin' : 'user');

    const user = {
      id: userRow.id,
      email: userRow.email,
      name: userRow.name || userRow.email.split('@')[0],
      role: userRole,
      createdAt: userRow.created_at,
      lastLoginAt: nowIso,
    };

    const token = await signJwt(
      { userId: userRow.id, email: userRow.email, role: userRole },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      message: '密码重置成功！已为您自动登录',
      user,
      token,
    });
  } catch (err: any) {
    console.error('Reset password error:', err);
    return c.json({ success: false, error: err.message || '重置密码失败，请重试' }, 500);
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

    const row: any = await c.env.DB.prepare(`SELECT id, email, name, role, created_at, last_login_at FROM users WHERE id = ?`)
      .bind(payload.userId)
      .first();

    if (!row) {
      return c.json({ success: false, error: '用户不存在' }, 404);
    }

    const userRole = row.role || (row.email === 'rongfeiliu3@gmail.com' ? 'admin' : 'user');

    const user = {
      id: row.id,
      email: row.email,
      name: row.name || row.email.split('@')[0],
      role: userRole,
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
