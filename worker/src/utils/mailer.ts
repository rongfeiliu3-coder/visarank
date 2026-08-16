/**
 * VisaRank Email Delivery Service via Resend REST API
 */

interface SendVerificationEmailOptions {
  toEmail: string;
  code: string;
  purpose: 'reset_password' | 'register_verify' | 'login_verify';
  apiKey?: string;
  fromEmail?: string;
}

export async function sendVerificationEmail({
  toEmail,
  code,
  purpose,
  apiKey,
  fromEmail,
}: SendVerificationEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const isReset = purpose === 'reset_password';
  const actionTitle = isReset ? '找回与重置登录密码' : '验证您的电子邮箱';
  const actionSubtitle = isReset
    ? '您正在申请重置 VisaRank 账号登录密码。请在密码重置页面输入下方 6 位数字验证码：'
    : '感谢您注册 VisaRank 决策中台。请在验证窗口输入下方 6 位数字验证码：';

  const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VisaRank 安全验证码</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f1eb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #181715;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f5f1eb; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background-color: #faf9f5; border: 1px solid #e6dfd8; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 36px 20px 36px; border-bottom: 1px solid #efe9de; background-color: #faf8f5;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; background-color: #c2410c; color: #ffffff; font-weight: bold; font-family: serif; font-size: 16px; padding: 6px 12px; border-radius: 8px; letter-spacing: 0.5px;">
                      VisaRank 🌐
                    </div>
                    <div style="font-size: 12px; color: #78716c; font-family: monospace; margin-top: 6px;">
                      全球留学·工签·永居决策中台
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 36px 24px 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #181715; font-family: Georgia, serif; line-height: 1.3;">
                ${actionTitle}
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #57534e; line-height: 1.6;">
                ${actionSubtitle}
              </p>

              <!-- Verification Code Box -->
              <div style="background-color: #efe9de; border: 2px dashed #c2410c; border-radius: 16px; padding: 24px 20px; text-align: center; margin-bottom: 28px;">
                <div style="font-size: 11px; font-family: monospace; color: #78716c; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                  安全验证码 · 10 分钟内有效
                </div>
                <div style="font-size: 38px; font-weight: 800; font-family: 'Courier New', monospace; letter-spacing: 8px; color: #c2410c;">
                  ${code}
                </div>
              </div>

              <!-- Security Tips -->
              <div style="background-color: #faf3ea; border-left: 4px solid #c2410c; padding: 14px 16px; border-radius: 0 12px 12px 0; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #9a3412; margin-bottom: 4px;">
                  🛡️ 安全防范提示
                </div>
                <div style="font-size: 12px; color: #7c2d12; line-height: 1.5;">
                  此验证码仅用于 VisaRank 官方平台身份核验。平台工作人员绝不会向您索取此代码，请勿泄露给任何人。如非本人操作，请立即忽略本邮件。
                </div>
              </div>

              <p style="margin: 0; font-size: 12px; color: #a8a29e; line-height: 1.5;">
                本邮件由系统自动发送，请勿直接回复。<br>
                官方网址: <a href="https://visarank.pages.dev" style="color: #c2410c; text-decoration: none;">visarank.pages.dev</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 36px 28px 36px; border-top: 1px solid #efe9de; background-color: #faf8f5; text-align: center;">
              <div style="font-size: 11px; color: #a8a29e; font-family: monospace;">
                © 2026 VisaRank Intelligence Matrix. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // If no Resend API key is configured, fallback to console logging
  if (!apiKey) {
    console.warn(`[Mailer Mock/Dev] No RESEND_API_KEY set. Simulated sending code "${code}" to ${toEmail}`);
    return {
      success: true,
      id: `sim_${Date.now()}`,
      error: 'RESEND_API_KEY 未配置，已在服务端控制台模拟输出验证码',
    };
  }

  try {
    const sender = fromEmail || 'VisaRank 安全中心 <onboarding@resend.dev>';
    const subject = isReset
      ? `【VisaRank】密码重置验证码: ${code}`
      : `【VisaRank】邮箱安全验证码: ${code}`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: sender,
        to: [toEmail],
        subject,
        html: htmlContent,
      }),
    });

    const data: any = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('Resend API Error:', data);
      return {
        success: false,
        error: data.message || `邮件发送失败 (HTTP ${res.status})`,
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (err: any) {
    console.error('Send Email Network Exception:', err);
    return {
      success: false,
      error: err.message || '网络异常，无法连接 Resend 邮件服务',
    };
  }
}
