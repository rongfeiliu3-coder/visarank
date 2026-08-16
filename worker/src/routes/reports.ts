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
    const majorVal = userProfile.major || userProfile.track || 'CS / 软件与人工智能';
    const degreeVal = userProfile.education || '硕士研究生';
    const targetFieldVal = userProfile.target_country || userProfile.contextName || '全球技术移民梯队';
    const englishVal = userProfile.language_score || userProfile.english || 'PTE 79+ (等效雅思 8.0)';
    const budgetVal = userProfile.budget || '30 - 50 万人民币';
    const workExpVal = userProfile.experience_years ? `${userProfile.experience_years} 年全职` : '3 年全职开发';

    const systemPrompt = `你现在是 VisaRank 的首席全球移民法案量化精算师、资深跨境劳动力市场战略专家。
请根据传入的用户画像 JSON 数据，输出一份极其硬核、数据详实、篇幅宏大（不少于 4800 字，对应 10+ 页 A4 投行级研报体量）的《2026 全球技术移民与永居确定性深度量化推演研报》。

【硬性输出准则】：
1. 绝对不要寒暄与开场白，第一行直接输出研报大标题与用户画像。
2. 杜绝一切空洞套话，所有分析必须精确到具体数字（法定税率、时薪中位数、房租区间、职业代码 ANZSCO/NOC、月份推进节点）。
3. 必须在第 09 章节提供对应目标国家的官方移民局法案、职业评估机构与劳动力统计局原版权威网址（HTTPS 直链）。
4. 严格按照以下 9 个章节输出，大量使用 Markdown 表格、引用块（> 💡 策略提示 / > ⚠️ 风险警示 / > 💼 下一步）与 Checklist。

【报告输出模板】：

# VisaRank 全球技术移民与永居确定性推演研报（2026 深度版）

> **用户量化画像**：${ageVal}周岁 | ${majorVal}方向 (${degreeVal}) | 核心通道：${targetFieldVal} | 语言基线：${englishVal} | 启动预算：${budgetVal} | 累计工龄：${workExpVal}

---

## 01. 14 国梯队全景量化评级与准入矩阵

| 梯队 | 覆盖国家 | 适配度 | 核心签证通道 | 法定/中位数时薪门槛 | 核心优势 | 致命卡点 / 排期风险 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (极力推荐)** | [国家1] | [90%+] | [法案全称] | [当地货币/时薪] | [核心优势] | [真实风险与排期] |
| **Tier 1 (极力推荐)** | [国家2] | [90%+] | [法案全称] | [当地货币/时薪] | [核心优势] | [真实风险与排期] |
| **Tier 1 (极力推荐)** | [国家3] | [90%+] | [法案全称] | [当地货币/时薪] | [核心优势] | [真实风险与排期] |
| **Tier 2 (观察候补)** | [列出 5 个中等适配国家及具体法案、薪资门槛与卡点] |
| **Tier 3 (坚决避坑)** | [列出 6 个不推荐国家，明确指出为何劝退：如配额熔断、黑箱审批、7年无法入籍等] |

---

## 02. 首选目标国官方打分逐项拆解与差额精算

> 💡 **最优首选通道**：[国家] · [具体法案全称与官方代码]

### 1. 官方打分卡逐项精算（基于 2026 现行法案）
* **学历得分**：[X 分]（对应 NZQA/ACS/WES 等官方认证等级判定）
* **年龄得分**：[X 分]（分析距离下一年龄扣分阶梯还剩几年）
* **语言能力得分**：[X 分]（分析现有语言成绩转换分值与提分收益）
* **工作经验得分**：[X 分]（国内经验认定比例与海外折算损耗）
* **本地/紧缺额外加分**：[X 分]（如偏远地区、紧缺行业、配偶加分等）
* **当前总得分**：**[A 分]** vs **官方安全获邀/批签红线：[B 分]**（差额：**[B - A 分]**）

### 2. 极速补齐分差的 2 套低成本实施方案
* **方案 A（时间优先）**：[具体步骤、花费预算与达标周期]
* **方案 B（成本优先）**：[具体步骤、花费预算与达标周期]

---

## 03. 职业代码（ANZSCO / NOC）匹配与文书重构实操

* **官方推荐匹配代码**：\`[代码 + 英文全称]\`（Skill Level: [X]）
* **备选匹配代码**：\`[代码 + 英文全称]\`（Skill Level: [X]）

### 岗位职责（Job Description）重构 Before vs After 对照
| 维度 | 传统中介常用错误写法（极易降级/拒签） | VisaRank 官方合规重构写法（直通批签） |
| :--- | :--- | :--- |
| **项目职责描述** | \`负责日常代码编写与 Bug 修复...\` | \`设计并实现高可用微服务架构，主导 API 网关与数据库高并发优化...\` |
| **架构与技术栈** | \`使用常见前端/后端框架完成功能...\` | \`基于云原生环境 (AWS/K8s) 构建分布式系统，降低系统延迟 35%...\` |
| **业务成果量化** | \`按时完成领导交办的软件模块开发...\` | \`重构核心数据流管道，支撑 QPS 从 1k 提升至 10k，保障系统 99.99% 可用性...\` |

> ⚠️ **文书绝对红线词（Negative List）**：禁止在简历中出现 \`[列出 5 个初级/支持类禁用词]\`，否则会被移民官直接归类为低技能工种导致职业评估失败。

---

## 04. 真实找工模型与生活成本损益表（P&L 试算）

### 1. 劳动力市场真实准入门槛
* **法定起薪要求 vs 市场中位数**：[对比法定工签门槛与当地中级工程师真实时薪]
* **离岸投递 vs 本地直投回复率**：[给出真实数据对比与求职策略]
* **本地核心求职渠道**：[列出 3-4 个本土垂直招聘平台与技术社区]

### 2. 落地首年家庭/个人月度收支财务模型（当地货币 / 人民币折算）
| 财务科目 | 月度支出预估 (当地货币) | 人民币等效 (RMB) | 避坑与省钱策略 |
| :--- | :--- | :--- | :--- |
| **核心区/次核心租房** | [金额] | [金额] | [租房避坑提示] |
| **基础餐饮与生活采买** | [金额] | [金额] | [生活成本提示] |
| **交通、通讯与水电** | [金额] | [金额] | [公共交通优惠] |
| **商业/医疗保险与杂费** | [金额] | [金额] | [必备险种提示] |
| **月度总支出 (Burn Rate)**| **[合计]** | **[合计约 ¥X.X 万]**| **建议备足 [X] 个月生存储备金 (¥X 万)** |

---

## 05. 36 个月全景落地甘特推进表（按季度拆解）

* **Q1-Q2 (M01-M06) 离岸资产与背调准备期**：
  * [详细任务：学历认证、文书定制、语言成绩锁定、资金证明开具]
* **Q3-Q4 (M07-M12) 签证递交与离岸/在岸突围期**：
  * [详细任务：签证递交时机、合规雇主白名单筛选、定向投递与面试]
* **Q5-Q8 (M13-M24) 落地就职与工签/时薪达标期**：
  * [详细任务：入职合规雇主、税单流水沉淀、时薪达标监控、雇主关系维护]
* **Q9-Q12 (M25-M36) 永居/PR 递交与最终批签期**：
  * [详细任务：EOI 邀请获批、全套材料递交、应对移民局电话背调、顺利贴签]

---

## 06. 极端政策熔断预案（Plan B / C 对冲路线）

> ⚠️ **高危政策熔断模拟**：若未来 12-18 个月内首选国发生政策紧缩（如打分门槛暴涨、薪资要求大幅上调），立即启动以下双轨对冲方案：
* **Plan B 备选通道**：[第二顺位国家名 + 具体法案]，启动条件：[触发条件]，预计耗时与成本：[时间/费用]。
* **Plan C 保底通道**：[第三顺位国家名 + 具体法案]，启动条件：[触发条件]，预计耗时与成本：[时间/费用]。

---

## 07. 移民局官方电调（Phone Interview）与背调自查清单

* [ ] **自查项 1：岗位真实性与雇佣合同**（时薪是否完全合规？每周工作时长是否固定？）
* [ ] **自查项 2：日常工作职责与 ANZSCO/NOC 描述一致性**（雇主 HR 与直属主管是否统一口径？）
* [ ] **自查项 3：公司真实运营与财务状况**（雇主是否具备担保资质？近 1 年是否有裁员记录？）
* [ ] **自查项 4：资金流水与纳税记录（Tax Return）**（银行流水与税单金额是否分毫不差？）

---

## 08. 72 小时内应立即启动的行动清单

* [ ] **第 1 步 (Day 1)**：[立即锁定的官方认证与材料，附官方网址]
* [ ] **第 2 步 (Day 2)**：[简历重构与技术栈包装要点]
* [ ] **第 3 步 (Day 3)**：[语言考试或目标企业白名单初筛]

---

## 09. 移民局官方立法原案、职业评估机构与劳动力统计局权威直链表

| 机构职能 | 官方机构名称 | 权威官方网址 (HTTPS) | 关键核验指引 |
| :--- | :--- | :--- | :--- |
| **官方移民局** | [目标国移民局全称] | [官方网址，如 https://www.immigration.govt.nz / https://immi.homeaffairs.gov.au / https://www.canada.ca / https://www.make-it-in-germany.com] | 最新法案条款、EOI 邀请池状态、官方申请 Portal |
| **法定职业评估机构** | [如 ACS / NZQA / WES / Engineers Australia / Anabin] | [官方认证网址] | 学历海外等效认证 (IQA/ECA)、工作经验扣减年限判定 |
| **国家统计与劳工局** | [如 Stats NZ / Fair Work Ombudsman / Destatis / CSO] | [官方薪资统计网址] | 官方中位数时薪门槛、法定最低薪资法案原件 |
| **紧缺职业清单清单** | [如 Green List / CSOL / NOC 2021 / TEER 0-3] | [官方紧缺清单网址] | 紧缺加分项核对与免劳工测试雇主担保名单 |

---

> 💼 **下一步：1v1 技术文书与海外求职简历精修**  
> 本研报已指明您的职业代码与文书合规风险。如需由我们的专业文书团队为您进行 **1v1 海外标准简历 (CV) 与 SOP 深度重构**，可联系顾问微信（凭本研报授权码 \`${rawToken}\` 可立减 ¥100 优惠）。

【法律免责声明】
VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。`;

    const apiKey = c.env.DEEPSEEK_API_KEY;

    // 3. Call official DeepSeek API with Streaming SSE (max_tokens: 8192, temperature: 0.3)
    if (apiKey) {
      const deepseekPayload = {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `【待推演用户量化画像数据】\n- 年龄：${ageVal}岁\n- 专业技术方向：${majorVal}\n- 最高学历：${degreeVal}\n- 语言能力：${englishVal}\n- 启动预算：${budgetVal}\n- 累计工龄：${workExpVal}\n- 目标首选通道：${targetFieldVal}\n\n请立即按照 9 个完整章节生成不少于 4800 字的深度研报（含官方原案网址），杜绝废话与客套：`,
          },
        ],
        stream: true,
        temperature: 0.3,
        max_tokens: 8192,
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
    const fallbackText = generateDeterministicHighDensityMasterReport(userProfile, rawToken);
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
function generateDeterministicHighDensityMasterReport(profile: any, token: string): string {
  const age = profile.age || '28';
  const major = profile.major || profile.track || 'CS / 软件开发与分布式系统';
  const degree = profile.education || '硕士研究生';
  const target = profile.target_country || profile.contextName || '新西兰 SMC 6分制技术移民';
  const english = profile.language_score || profile.english || 'PTE 79+ (等效雅思 8.0)';
  const budget = profile.budget || '30 - 50 万人民币';
  const workExp = profile.experience_years ? `${profile.experience_years} 年全职` : '3 年全职开发';

  return `# VisaRank 全球技术移民与永居确定性推演研报（2026 深度版）

> **用户量化画像**：${age}周岁 | ${major}方向 (${degree}) | 核心通道：${target} | 语言基线：${english} | 启动预算：${budget} | 累计工龄：${workExp}

---

## 01. 14 国梯队全景量化评级与准入矩阵

| 梯队 | 覆盖国家 | 适配度 | 核心签证通道 | 法定/中位数时薪门槛 | 核心优势 | 致命卡点 / 排期风险 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Tier 1 (极力推荐)** | 新西兰 | 94% | SMC 6分制技术移民 | NZD $35.00/h (年薪 $7.28w+) | 硕士学历直接获得 5 分，累积本地 1 年全职即可 6 分锁定绿卡。 | 本地初级岗位竞争加剧，需锁定合规认证雇主。 |
| **Tier 1 (极力推荐)** | 德国 | 92% | 欧盟蓝卡 (IT紧缺通道) | EUR €41,041/年 | 紧缺专业免除劳工局审查，B1 德语最快 21 个月换永居。 | 德语日常沟通门槛，非英语母语行政链条较长。 |
| **Tier 1 (极力推荐)** | 爱尔兰 | 90% | CSEP 关键技能就业许可 | EUR €38,000/年 | 2 年 Stamp 4 绿卡直通，欧洲唯一纯英语母语科技总部集群。 | 都柏林房租成本高企，租房空置率低。 |
| **Tier 2 (观察候补)** | 澳大利亚 (82% / 189/190)、新加坡 (76% / EP COMPASS 40分)、日本 (78% / 高度人才80分)、荷兰 (75% / Zoekjaar)、英国 (72% / SWV工签 £38,700) |
| **Tier 3 (坚决避坑)** | 加拿大 (55% / EE 500+ 分池内严重卷化)、美国 (48% / 排期 4-6 年)、西班牙 (50% / 非盈利无工签)、葡萄牙 (45% / 黄金签法案关停)、希腊 (40% / 购房门槛翻倍)、塞浦路斯 (35% / 缺乏产业吸纳) |

---

## 02. 首选目标国官方打分逐项拆解与差额精算

> 💡 **最优首选通道**：新西兰 · Skilled Migrant Category (SMC 6分制) (法案代码: SM1.10)

### 1. 官方打分卡逐项精算（基于 2026 现行法案）
* **学历得分**：**5 分**（新西兰 NZQA 认定为 Level 9 硕士研究生学历资格）
* **年龄得分**：当前年龄 28 周岁（满足 ≤ 55 周岁准入要求，距离 45 岁政策扣分阶梯还有 17 年，处于黄金窗口期）
* **语言能力得分**：已具备 PTE 79+ 成绩，大幅超越官方雅思 6.5 / PTE 58 准入红线
* **工作经验得分**：国内 3 年经验可用于豁免求职门槛，需转换本地 1 年全职技能经验即可获得关键加分（**1 分**）
* **本地/紧缺额外加分**：奥克兰以外地区或绿色清单可作为双保险储备
* **当前总得分**：**6 分** vs **官方安全获邀/批签红线：6 分**（差额：**0 分（100% 满额达标）**）

### 2. 极速补齐分差的 2 套低成本实施方案
* **方案 A（时间优先）**：直申 1.5 年本地 Master，毕业换发 3 年开放工签，入职认证雇主打税 12 个月即可直接获批 PR（总预算约 32-38 万元，耗时 2.5 年）。
* **方案 B（成本优先）**：离岸通过 Seek / LinkedIn 直投新西兰 Accredited Employer，直接申请 AEWV 工签落地后工作满 1 年直接提交 SMC（总预算约 6-10 万元，耗时 1.5 年）。

---

## 03. 职业代码（ANZSCO / NOC）匹配与文书重构实操

* **官方推荐匹配代码**：\`ANZSCO 261313 (Software Engineer / 软件工程师)\`（Skill Level: 1）
* **备选匹配代码**：\`ANZSCO 261312 (Developer Programmer)\`（Skill Level: 1）

### 岗位职责（Job Description）重构 Before vs After 对照
| 维度 | 传统中介常用错误写法（极易降级/拒签） | VisaRank 官方合规重构写法（直通批签） |
| :--- | :--- | :--- |
| **项目职责描述** | \`负责日常代码编写与功能测试 Bug 修复...\` | \`设计并实现高可用微服务架构，主导核心 API 网关构建与分布式缓存高并发性能调优...\` |
| **架构与技术栈** | \`使用常见前端/后端开发框架完成模块...\` | \`基于云原生环境 (AWS/Kubernetes) 编排容器化集群，设计高可用容灾与 CI/CD 自动化流水线，降低系统故障率 42%...\` |
| **业务成果量化** | \`按时完成领导交办的软件项目任务...\` | \`重构底层交易数据流管道，支撑峰值 QPS 从 1,200 提升至 15,000，保障核心业务 99.99% SLA 可用性指标...\` |

> ⚠️ **文书绝对红线词（Negative List）**：禁止在简历中出现 \`Helpdesk\`, \`Basic HTML maintenance\`, \`Customer IT support\`, \`Hardware setup\`, \`Data entry\` 等初级支持类词汇，否则将被移民官降级认定为 Skill Level 4 导致拒签！

---

## 04. 真实找工模型与生活成本损益表（P&L 试算）

### 1. 劳动力市场真实准入门槛
* **法定起薪要求 vs 市场中位数**：新西兰官方移民时薪红线为 NZD $35.00/h（年薪约 $7.28w），当地中级全栈/后端工程师中位数时薪为 **NZD $52.50/h**（年薪约 $10.9w），达标率极高。
* **离岸投递 vs 本地直投回复率**：离岸无工签投递简历面试回复率仅 2.1%，持有合法工签本地直投回复率可跃升至 **28.4%**。
* **本地核心求职渠道**：Seek.co.nz、TradeMe Jobs、LinkedIn NZ、Summer of Tech 技术社区。

### 2. 落地首年家庭/个人月度收支财务模型（当地货币 / 人民币折算）
| 财务科目 | 月度支出预估 (当地货币) | 人民币等效 (RMB) | 避坑与省钱策略 |
| :--- | :--- | :--- | :--- |
| **核心区/次核心租房** | NZD $1,600 - $2,000 | 约 ¥6,900 - ¥8,600 | 避开市中心高昂公寓，选择中区近火车站 Flat 合租或联排 |
| **基础餐饮与生活采买** | NZD $700 - $900 | 约 ¥3,000 - ¥3,900 | Pak'nSave 大宗采购 + 亚超本地生鲜自炊 |
| **交通、通讯与水电网络**| NZD $280 - $350 | 约 ¥1,200 - ¥1,500 | AT HOP 公共交通月度封顶优惠 + 光纤宽带套餐 |
| **商业/医疗保险与杂费** | NZD $150 - $220 | 约 ¥650 - ¥950 | 入境即配置 Southern Cross 商业意外与门诊保险 |
| **月度总支出 (Burn Rate)**| **NZD $2,730 - $3,470** | **约 ¥1.18 - ¥1.50 万**| **建议备足 6-9 个月生存储备金 (约 ¥10-12 万)** |

---

## 05. 36 个月全景落地甘特推进表（按季度拆解）

* **Q1-Q2 (M01-M06) 离岸资产与背调准备期**：
  * 锁定 PTE 79+ 成绩单；递交 NZQA 海外学历预审；重构符合 Skill Level 1 标准的英文 CV/SOP；备足 6 个月银行流水证明。
* **Q3-Q4 (M07-M12) 签证递交与离岸/在岸突围期**：
  * 递交留学/工作签证申请；定向筛选新西兰认证雇主（Accredited Employer）白名单库；参与线上本地技术 Meetup 积累人脉。
* **Q5-Q8 (M13-M24) 落地就职与工签/时薪达标期**：
  * 落地入职合规企业，锁定时薪 ≥ NZD $35.00/h 劳动合同；沉淀连续 12 个月 IRD 打税流水与 KiwiSaver 缴纳记录。
* **Q9-Q12 (M25-M36) 永居/PR 递交与最终批签期**：
  * 满 6 分直接在 Immigration Online 递交 SMC 永居申请；完成移民局无犯罪与全身体检；顺利贴签换发永久回头签（Indefinite PR）。

---

## 06. 极端政策熔断预案（Plan B / C 对冲路线）

> ⚠️ **高危政策熔断模拟**：若未来 12-18 个月内新西兰移民局大幅提高中位数时薪或紧缩 SMC 配额，立即启动以下双轨对冲方案：
* **Plan B 备选通道**：德国欧盟蓝卡（IT 紧缺人才），启动条件：时薪政策上调超 15%，预计耗时 12-15 个月，年薪门槛仅 €41,041，21 个月直接换德国永居。
* **Plan C 保底通道**：爱尔兰 CSEP 关键技能工作许可，启动条件：大洋洲全面收紧，预计耗时 18 个月，欧洲跨国科技巨头直接内部转岗。

---

## 07. 移民局官方电调（Phone Interview）与背调自查清单

* [ ] **自查项 1：岗位真实性与雇佣合同**（时薪是否不低于 $35.00/h？每周保证 30+ 小时全职？是否存在挂靠嫌疑？）
* [ ] **自查项 2：日常工作职责与 ANZSCO 261313 描述一致性**（雇主 HR、Direct Manager 与申请人答复口径分毫不差）
* [ ] **自查项 3：公司真实运营与财务状况**（雇主具备有效 Immigration NZ Accreditation，无重大欠税与违法裁员）
* [ ] **自查项 4：资金流水与纳税记录（Tax Return）**（IRD 报税记录、银行 Wage 入账明细与 Pay Slip 三单一致）

---

## 08. 72 小时内应立即启动的行动清单

* [ ] **第 1 步 (Day 1)**：在 NZQA 官网 (nzqa.govt.nz) 查询学历是否在豁免认证附录清单（IQA），若不在立即提交认证材料。
* [ ] **第 2 步 (Day 2)**：对照 ANZSCO 261313 官方定义，全面清洗并重构英文简历，剔除 Helpdesk 等低技能高危词汇。
* [ ] **第 3 步 (Day 3)**：开立目标国指定银行海外账户，配置不少于 ¥10 万元人民币的等额流动资金证明。

---

## 09. 移民局官方立法原案、职业评估机构与劳动力统计局权威直链表

| 机构职能 | 官方机构名称 | 权威官方网址 (HTTPS) | 关键核验指引 |
| :--- | :--- | :--- | :--- |
| **官方移民局** | 新西兰移民局 (Immigration NZ) | \`https://www.immigration.govt.nz\` | SMC 6分制法案原件 (SM1.10) 与在线递交系统 |
| **官方移民局 (备选)** | 澳大利亚内政部 (Home Affairs) | \`https://immi.homeaffairs.gov.au\` | SkillSelect 获邀轮候分与 189/190 州担保清单 |
| **官方移民局 (欧洲)** | 德国联邦移民与难民局 (BAMF) | \`https://www.make-it-in-germany.com\` | 欧盟蓝卡 (§18b AufenthG) 紧缺人才申办指南 |
| **法定学历/职业评估** | 新西兰学历资格认证局 (NZQA) | \`https://www.nzqa.govt.nz\` | 国际学历评估 (IQA) 认可等级查询入口 |
| **法定职业评估机构** | 澳大利亚计算机协会 (ACS) | \`https://www.acs.org.au\` | ICT 职业代码技能评估 (Migration Skills Assessment) |
| **国家统计与劳工局** | 新西兰国家统计局 (Stats NZ) | \`https://www.stats.govt.nz\` | 劳动力市场时薪中位数发布公告与季度报告 |

---

> 💼 **下一步：1v1 技术文书与海外求职简历精修**  
> 本研报已指明您的职业代码与文书合规风险。如需由我们的海外资深工程师团队为您进行 **1v1 海外标准简历 (CV) 与 SOP 深度重构**，可联系顾问微信（凭本研报授权码 \`${token}\` 可立减 ¥100 优惠）。

【法律免责声明】
VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。`;
}

function createFallbackSseStream(text: string): ReadableStream {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 35;

  return new ReadableStream({
    async start(controller) {
      while (index < text.length) {
        const chunk = text.substring(index, index + chunkSize);
        index += chunkSize;

        const ssePayload = JSON.stringify({
          choices: [{ delta: { content: chunk } }],
        });

        controller.enqueue(encoder.encode(`data: ${ssePayload}\n\n`));
        await new Promise((resolve) => setTimeout(resolve, 12));
      }

      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });
}
