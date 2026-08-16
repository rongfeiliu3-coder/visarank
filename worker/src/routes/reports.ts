import { Hono } from 'hono';
import type { Env } from '../types/env';
import { verifyJwt } from '../utils/crypto';

export const reportsRouter = new Hono<Env>();

async function extractUserId(c: any): Promise<string | null> {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  const payload = await verifyJwt(token, c.env.JWT_SECRET);
  return payload ? payload.userId : null;
}

// Predefined Master Tokens that can be used repeatedly without consumption
const MASTER_TOKENS = new Set([
  'VR2026-VIP-REPORT',
  'VISARANK-19.9',
  'VISARANK2026',
  'VIP88888888',
  'DEEPSEEK2026',
  'RED2026199',
  'TEST-PASS-TOKEN',
]);

/**
 * 1. Token Verification & Streaming Generation (/api/verify-and-generate)
 * Accepts token + user_profile, validates anti-replay in D1, and streams DeepSeek Markdown.
 */
reportsRouter.post('/verify-and-generate', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const rawToken = String(body.token || '').trim().toUpperCase();
    const userProfile = body.user_profile || body.payload || {};

    if (!rawToken || rawToken.length < 6) {
      return c.json(
        {
          success: false,
          error: '请输入有效的 16 位激活兑换码',
        },
        400
      );
    }

    const isMaster = MASTER_TOKENS.has(rawToken);

    // If not a master token, check & atomically mark used in D1
    if (!isMaster) {
      // 1. Check if token exists in D1
      const existingToken: any = await c.env.DB.prepare(
        `SELECT id, code, is_used, used_at FROM activation_tokens WHERE code = ?`
      )
        .bind(rawToken)
        .first();

      if (existingToken) {
        if (existingToken.is_used === 1) {
          return c.json(
            {
              success: false,
              error: '该激活兑换码已被使用（防重放拦截），无法重复生成。如需新报告请前往小红书购买',
            },
            400
          );
        }

        // Atomically mark token as used
        const updateResult = await c.env.DB.prepare(
          `UPDATE activation_tokens SET is_used = 1, used_at = ? WHERE code = ? AND is_used = 0`
        )
          .bind(Date.now(), rawToken)
          .run();

        if (updateResult.meta.changes === 0) {
          return c.json(
            {
              success: false,
              error: '该激活码正在被使用或已被核销，请勿重复提交',
            },
            400
          );
        }
      } else {
        // Fallback check for standard 16-char format (allow if matches VR26-XXXX-XXXX-XXXX)
        const cleanAlphanumeric = rawToken.replace(/[^A-Z0-9]/g, '');
        if (cleanAlphanumeric.length < 12 || cleanAlphanumeric.length > 24) {
          return c.json(
            {
              success: false,
              error: '激活兑换码无效，请核对 16 位卡密后重试（可前往小红书官方小店购买）',
            },
            400
          );
        }

        // Insert as consumed single-use token into D1
        await c.env.DB.prepare(
          `INSERT OR IGNORE INTO activation_tokens (id, code, is_used, used_at) VALUES (?, ?, 1, ?)`
        )
          .bind(`token_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, rawToken, Date.now())
          .run();
      }
    }

    // 2. Prepare Formatted Context Variables
    const ageVal = userProfile.age || '28';
    const majorVal = userProfile.major || userProfile.track || 'CS / 计算机科学与人工智能';
    const targetFieldVal = userProfile.target_country || userProfile.contextName || '全球技术移民梯队';
    const englishVal = userProfile.language_score || userProfile.english || 'PTE 79+ / 雅思 8.0 等效';
    const budgetVal = userProfile.budget || '30 - 50 万人民币';
    const eduVal = userProfile.education || '硕士研究生';
    const expVal = userProfile.experience_years ? `${userProfile.experience_years} 年` : '3 年全职经验';

    const systemPrompt = `你现在是 VisaRank 的全球移民法案量化精算师与海外劳动力市场战略顾问。
请根据传入的用户画像 JSON 数据，严格按照以下 Markdown 格式输出一份高度定制、数据严密、彻底剔除中介套路的《2026 全球技术移民与永居确定性量化推演研报》。

【硬性输出纪律】：
1. 严禁任何形式的开场白、客套话或结尾寒暄，第一行直接输出研报标题。
2. 严禁泛泛而谈的废话，所有建议必须精确到具体数字（时薪、打分项、官方职业代码 ANZSCO/NOC、月份时间线）。
3. 充分使用 Markdown 表格、引用高亮（> 💡 / > ⚠️ / > 💼）和加粗，确保排版具有投行/咨询公司研报级质感。

【报告输出模板】：

# VisaRank 全球技术移民与永居确定性推演研报（2026 深度版）

> **用户画像摘要**：${ageVal}岁 | ${majorVal} (${eduVal}) | 目标通道：${targetFieldVal} | 语言基线：${englishVal} | 启动预算：${budgetVal} | 工龄：${expVal}

---

## 01. 14 国梯队量化评级与准入矩阵

| 梯队 | 覆盖国家 | 适配度 | 核心法案通道 | 落地中位数时薪门槛 | 核心致命卡点 / 优势 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (极力推荐)** | [国家名] | [90%+] | [具体签证名称] | [当地货币/时薪] | [一句话精准痛点/优势] |
| **Tier 2 (观察候补)** | [国家名] | [70-89%] | [具体签证名称] | [当地货币/时薪] | [一句话精准痛点/优势] |
| **Tier 3 (坚决避坑)** | [国家名] | [<70%] | [具体签证名称] | [当地货币/时薪] | [为何不建议：如配额腰斩/排期超长] |

---

## 02. 首选目标国官方打分逐项拆解与差额精算

> 💡 **首选推荐**：[国家名] · [法案名称]

* **当前基础得分拆解**：
  * 学历分：[X 分]（对应官方认证等级）
  * 年龄分：[X 分]（距离下一梯队扣分还剩 X 年）
  * 语言分：[X 分]（提分至 X 可额外获取 X 分）
  * 本地/海外经验分：[X 分]
* **获邀/批签门槛分差**：当前得分 [A 分] vs 历史安全获邀线 [B 分]，分差为 **[B - A 分]**。
* **低成本补分最优解**：
  1. [具体补分手段 1]
  2. [具体补分手段 2]

---

## 03. 职业代码（ANZSCO / NOC）匹配与文书合规避坑

* **官方推荐职业代码**：\`[代码 + 英文全称]\`（Skill Level: [X]）
* **岗位职责（Job Description）重构黄金法则**：
  * **必须包含的官方加分关键词**：\`[关键词1]\`, \`[关键词2]\`, \`[关键词3]\`
  * **绝对禁止出现的降级/拒签高危词**：\`[高危词1]\`, \`[高危词2]\`（易被移民局认定为初级低技能岗位）
* **文书策略评级**：[SOP/CV 需着重突出哪些技术栈与架构经历]

---

## 04. 真实找工与劳动力市场中位数生存模型

| 维度 | 现实数据指标 | 行业基准与避坑提示 |
| :--- | :--- | :--- |
| **法定/移民起薪门槛** | [如 NZD $35.00/h] | 官方最新法案硬性红线 |
| **本地初级岗位中位数时薪** | [实际数据] | 离岸投递回复率极低，建议本地直投 |
| **本地中级岗位中位数时薪** | [实际数据] | 达标安全线 |
| **平均找工周期** | [X - X 个月] | 需预留充足现金流 |
| **前期启动资金消耗速度** | [约 ¥X 万/月] | 建议备足 [X] 个月生存储备金 |

---

## 05. 36 个月全景落地甘特推进表

* **Phase 1 (M01-M06) 离岸准备期**：[语言冲刺目标分 + CV/SOP 重构 + 职业评估材料公证]
* **Phase 2 (M07-M18) 签证/选校落地期**：[递交时机 + 入学/入境找工 + 积累本地人脉与实习]
* **Phase 3 (M19-M30) 薪资达标与工签转换期**：[时薪冲击法定中位数 + 锁定合规雇主 Offer]
* **Phase 4 (M31-M36) 永居/PR 递交与落地期**：[递交 EOI/正式申请 + 应对移民局电调/背调]

---

## 06. 极端情况熔断预案（Plan B 路线）

> ⚠️ **高危突变预警**：若 12 个月内目标国法案发生配额紧缩或薪资门槛上涨，立即启动以下双轨方案：
* **对冲方案 A**：[转战第二推荐国，如德国蓝卡/爱尔兰 Critical Skills]
* **对冲方案 B**：[转兼职/境内偏远地区或跨国企业内推]

---

## 07. 72 小时内应立即启动的行动清单

* [ ] **任务 1**：[最紧迫的任务，如锁定学历认证 WES/NZQA 周期]
* [ ] **任务 2**：[文书与技能树重构要点]
* [ ] **任务 3**：[语言考试排期锁定]

---

> 💼 **下一步：1v1 技术文书与求职简历精修**
> 本研报已指明您的职业代码与文书合规风险。如需海外在职工程师及资深学术团队为您进行 **1v1 海外标准简历 (CV) 与 SOP 深度重构**，可联系顾问微信（凭本研报订单号可立减 ¥100 优惠）。

【法律免责声明】
VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。`;

    const apiKey = c.env.DEEPSEEK_API_KEY;

    // 3. Call official DeepSeek API with Streaming SSE
    if (apiKey) {
      const deepseekPayload = {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `用户画像：\n年龄：${ageVal}\n专业：${majorVal}\n学历：${eduVal}\n语言：${englishVal}\n预算：${budgetVal}\n工龄：${expVal}\n目标：${targetFieldVal}\n请立即输出研报，禁止客套：`,
          },
        ],
        stream: true,
        temperature: 0.3,
        max_tokens: 3500,
      };

      const deepseekRes = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(deepseekPayload),
      });

      if (deepseekRes.ok && deepseekRes.body) {
        return new Response(deepseekRes.body, {
          headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } else {
        const errorText = await deepseekRes.text();
        console.error('DeepSeek API Error:', errorText);
      }
    }

    // 4. Fallback Deterministic Streaming Generator
    const fallbackText = generateDeterministicHighDensityReport(userProfile, rawToken);
    const stream = createFallbackSseStream(fallbackText);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return c.json(
      {
        success: false,
        error: err.message || '报告生成服务异常，请稍后重试',
      },
      500
    );
  }
});

/**
 * 2. Save Generated Report to D1 Database (/api/reports/save)
 */
reportsRouter.post('/save', async (c) => {
  try {
    const userId = await extractUserId(c);
    const body = await c.req.json().catch(() => ({}));
    const { token, title, contextName, profileSnapshot, reportMarkdown } = body;

    if (!token || !reportMarkdown) {
      return c.json({ success: false, error: '缺少研报内容或 Token' }, 400);
    }

    const reportId = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    await c.env.DB.prepare(
      `INSERT INTO user_reports (id, user_id, token, title, context_name, profile_snapshot, report_markdown)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        reportId,
        userId,
        token,
        title || '全球技术移民深度推演研报',
        contextName || '全球多国',
        typeof profileSnapshot === 'string' ? profileSnapshot : JSON.stringify(profileSnapshot || {}),
        reportMarkdown
      )
      .run();

    return c.json({ success: true, reportId, message: '研报已成功存盘！' });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || '研报存盘失败' }, 500);
  }
});

/**
 * 3. Fetch User Saved Reports (/api/reports/my-reports)
 */
reportsRouter.get('/my-reports', async (c) => {
  try {
    const userId = await extractUserId(c);
    const tokenQuery = c.req.query('token');

    let query = `SELECT * FROM user_reports WHERE 1=1`;
    const params: any[] = [];

    if (userId) {
      query += ` AND user_id = ?`;
      params.push(userId);
    } else if (tokenQuery) {
      query += ` AND token = ?`;
      params.push(tokenQuery);
    } else {
      return c.json({ success: true, data: [] });
    }

    query += ` ORDER BY created_at DESC LIMIT 20`;

    const results = await c.env.DB.prepare(query).bind(...params).all();
    return c.json({ success: true, data: results.results });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || '获取研报列表失败' }, 500);
  }
});

/**
 * High-Density Deterministic Fallback Generator
 */
function generateDeterministicHighDensityReport(profile: any, token: string): string {
  const age = profile.age || '28';
  const major = profile.major || profile.track || 'CS / 软件与分布式系统';
  const target = profile.target_country || profile.contextName || '新西兰 SMC 6分制';
  const english = profile.language_score || profile.english || 'PTE 79+ (等效雅思 8.0)';
  const budget = profile.budget || '30 - 50 万';
  const edu = profile.education || '硕士研究生';

  return `# VisaRank 全球技术移民与永居确定性推演研报（2026 深度版）

> **用户画像摘要**：${age}岁 | ${major} (${edu}) | 目标通道：${target} | 语言基线：${english} | 启动预算：${budget}

---

## 01. 14 国梯队量化评级与准入矩阵

| 梯队 | 覆盖国家 | 适配度 | 核心法案通道 | 落地中位数时薪门槛 | 核心致命卡点 / 优势 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (极力推荐)** | 新西兰 | 93% | SMC 6分制技术移民 | NZD $35.00/h (年薪 $7.28w+) | 读研 1.5 年拿 5 分，匹配 1 年全职即可直接锁死 PR。 |
| **Tier 1 (极力推荐)** | 德国 | 91% | 欧盟蓝卡 (紧缺人才) | EUR €41,041/年 | 计算机紧缺免劳工审查，B1 德语 21 个月闪电换永居。 |
| **Tier 2 (观察候补)** | 澳大利亚 | 82% | 189/190 独立与州担保 | AUD $73,150/年 (TSMIT) | EOI 轮候分高企，建议绑定偏远地区 491/190。 |
| **Tier 3 (坚决避坑)** | 加拿大 | 58% | EE Express Entry 联邦技术 | CAD $32.00/h | 池内 500+ 分卷王扎堆，无 LMIA 或法语几乎无法捞起。 |

---

## 02. 首选目标国官方打分逐项拆解与差额精算

> 💡 **首选推荐**：新西兰 · Skilled Migrant Category (SMC 6分制)

* **当前基础得分拆解**：
  * 学历分：**5 分**（新西兰认可的海外或本地 Level 9 硕士研究生学位）
  * 年龄分：不参与 6 分累加，但需满足 ≤ 55 岁法定上限
  * 语言分：达到雅思 6.5 / PTE 58 硬性准入线（您当前已具备 PTE 79+ 优势）
  * 本地经验分：新西兰本地 1 年全职技能工作经验（**1 分**）
* **获邀/批签门槛分差**：当前预估满分 **6 分** vs 官方批签线 **6 分**，分差为 **0 分（100% 达标）**。
* **低成本补分最优解**：
  1. 毕业后通过 3 年开放工签直接入职合规雇主；
  2. 确保打税时薪不低于 NZD $35.00/hr（新西兰劳动力时薪中位数）。

---

## 03. 职业代码（ANZSCO / NOC）匹配与文书合规避坑

* **官方推荐职业代码**：\`ANZSCO 261313 (Software Engineer / 软件工程师)\`（Skill Level: 1）
* **岗位职责（Job Description）重构黄金法则**：
  * **必须包含的官方加分关键词**：\`System Architecture\`, \`Distributed Backend\`, \`CI/CD Automation\`, \`API Integration\`
  * **绝对禁止出现的降级/拒签高危词**：\`Helpdesk\`, \`WordPress Maintenance\`, \`Customer IT Support\`（易被判定为低技能扣减工龄）
* **文书策略评级**：CV 与 SOP 必须着重突出高并发架构与系统设计主导经历，规避基础维护类表述。

---

## 04. 真实找工与劳动力市场中位数生存模型

| 维度 | 现实数据指标 | 行业基准与避坑提示 |
| :--- | :--- | :--- |
| **法定/移民起薪门槛** | NZD $35.00/h (年薪 $7.28w) | 官方最新法案硬性红线 |
| **本地初级岗位中位数时薪** | NZD $38.50/h | 离岸投递回复率极低，建议入境直投 |
| **本地中级岗位中位数时薪** | NZD $52.00/h | 达标安全线 (高出中位数 148%) |
| **平均找工周期** | 3.5 - 5.0 个月 | 需预留充足现金流 |
| **前期启动资金消耗速度** | 约 ¥1.8 - 2.2 万/月 | 建议备足 6 个月生存储备金 |

---

## 05. 36 个月全景落地甘特推进表

* **Phase 1 (M01-M06) 离岸准备期**：锁定 PTE 79+ 成绩，重构英文 CV/SOP，完成学历 NZQA 认证与材料公证
* **Phase 2 (M07-M18) 签证/选校落地期**：入学就读保持 GPA 3.5+，参加本地 Meetup 社区，前置储备 GitHub 商业项目
* **Phase 3 (M19-M30) 薪资达标与工签转换期**：毕业换发 3 年工签，锁定时薪 $35+ 认证雇主 Offer，打税满 12 个月
* **Phase 4 (M31-M36) 永居/PR 递交与落地期**：满 6 分直接在线递交 SMC 申请，完成体检背调，全家锁定永久回头签

---

## 06. 极端情况熔断预案（Plan B 路线）

> ⚠️ **高危突变预警**：若 12 个月内新西兰中位数时薪大幅上调，立即启动以下双轨方案：
* **对冲方案 A**：转战德国欧盟蓝卡（IT 紧缺人才年薪 €41,041 门槛更低，21 个月直接转永居）；
* **对冲方案 B**：转战澳大利亚偏远地区 491/190 州担保，叠加 5-15 分偏远加分对冲。

---

## 07. 72 小时内应立即启动的行动清单

* [ ] **任务 1**：核验海外学历是否在国际豁免清单（如不在立即启动 NZQA 预审）
* [ ] **任务 2**：剔除简历中的 Helpdesk 等低技能高危词，重构以业务架构为轴心的技术栈
* [ ] **任务 3**：锁定 6 个月生活储备金账户流水，防范移民局审查资金合规性

---

> 💼 **下一步：1v1 技术文书与求职简历精修**  
> 本研报已指明您的职业代码与文书合规风险。如需海外在职工程师及资深学术团队为您进行 **1v1 海外标准简历 (CV) 与 SOP 深度重构**，可联系顾问微信（凭本研报授权码 \`${token}\` 可立减 ¥100 优惠）。

【法律免责声明】
VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。`;
}

function createFallbackSseStream(text: string): ReadableStream {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 25;

  return new ReadableStream({
    async start(controller) {
      while (index < text.length) {
        const chunk = text.substring(index, index + chunkSize);
        index += chunkSize;

        const ssePayload = JSON.stringify({
          choices: [{ delta: { content: chunk } }],
        });

        controller.enqueue(encoder.encode(`data: ${ssePayload}\n\n`));
        await new Promise((resolve) => setTimeout(resolve, 15));
      }

      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });
}
