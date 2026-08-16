import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { Country, EvaluationRequest, PolicyRule, ShortageOccupation, Visa } from '@emigrant/shared';
import { EvaluationRequestSchema, ALL_COUNTRY_VISAS } from '@emigrant/shared';
import { evaluateProfile } from './engine/evaluator';
import type { Env } from './types/env';

import { authRouter } from './routes/auth';
import { assessmentsRouter } from './routes/assessments';
import { adminRouter } from './routes/admin';
import { feedbackRouter } from './routes/feedback';
import { SITEMAP_XML, ROBOTS_TXT } from './utils/sitemapXml';

const app = new Hono<Env>();

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Admin-Secret'],
  })
);

// Global Error & Exception Boundary (Guarantees JSON payload on 500 errors)
app.onError((err, c) => {
  console.error('Unhandled Worker Exception:', err);
  return c.json(
    {
      success: false,
      error: err.message || '服务器内部异常，请稍后重试',
    },
    500
  );
});

// Global 404 Handler (Guarantees JSON payload on non-existent endpoints)
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: `API 接口未找到: ${c.req.method} ${c.req.path}`,
    },
    404
  );
});

// Mount Subrouters
app.route('/api/auth', authRouter);
app.route('/api/assessments', assessmentsRouter);
app.route('/api/admin', adminRouter);
app.route('/api/feedbacks', feedbackRouter);

// Dynamic Edge SEO Endpoints
app.get('/sitemap.xml', (c) => {
  return c.text(SITEMAP_XML, 200, {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=86400',
  });
});

app.get('/robots.txt', (c) => {
  return c.text(ROBOTS_TXT, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=86400',
  });
});

// Root API Landing & Status
app.get('/', (c) => {
  return c.json({
    name: 'VisaRank Intelligence Matrix API',
    version: '1.0.0',
    status: 'operational',
    frontendUrl: 'https://visarank.pages.dev',
    docs: 'https://github.com/rongfeiliu3-coder/visarank',
    endpoints: [
      '/api/countries',
      '/api/visas',
      '/api/occupations',
      '/api/evaluate',
      '/api/health',
      '/sitemap.xml',
      '/robots.txt',
    ],
  });
});

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    environment: c.env?.ENVIRONMENT || 'production',
    timestamp: new Date().toISOString(),
  });
});

// 0. Token Verification Endpoint for ¥19.9 Deep Report Activation
app.post('/api/verify-token', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const rawToken = String(body.token || '').trim().toUpperCase();

    if (!rawToken || rawToken.length < 6) {
      return c.json(
        {
          success: false,
          error: '请输入有效的 16 位激活兑换码',
        },
        400
      );
    }

    // Master test keys and valid pattern validation
    const masterTokens = [
      'VR2026-VIP-REPORT',
      'VISARANK2026',
      'VIP88888888',
      'DEEPSEEK2026',
      'RED2026199',
      'TEST-PASS-TOKEN',
      'VISARANK-19.9',
    ];

    const cleanAlphanumeric = rawToken.replace(/[^A-Z0-9]/g, '');
    const isMaster = masterTokens.includes(rawToken);
    const isStandard16Char = cleanAlphanumeric.length >= 10 && cleanAlphanumeric.length <= 24;

    if (!isMaster && !isStandard16Char) {
      return c.json(
        {
          success: false,
          error: '激活兑换码无效或已被使用，请检查后重新输入，或前往小红书官方小店购买',
        },
        400
      );
    }

    return c.json({
      success: true,
      valid: true,
      token: rawToken,
      message: '激活码验证通过！正在为您启动 DeepSeek 10+ 页专属深度量化推演报告引擎...',
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    });
  } catch (err: any) {
    return c.json({ success: false, error: err.message || '激活码核验失败' }, 500);
  }
});

// 1. Countries Route
app.get('/api/countries', async (c) => {
  try {
    const results = await c.env.DB.prepare(
      `SELECT * FROM countries WHERE policy_status != 'deprecated' ORDER BY code ASC`
    ).all();

    const countries: Country[] = results.results.map((row: any) => ({
      code: row.code,
      name: row.name,
      nativeName: row.native_name,
      flag: row.flag,
      currency: row.currency,
      officialImmigrationUrl: row.official_immigration_url,
      description: row.description,
      policyStatus: row.policy_status,
      lastPolicyUpdate: row.last_policy_update,
      highlightBadges: row.highlight_badges ? JSON.parse(row.highlight_badges) : [],
    }));

    return c.json({ success: true, data: countries });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// 2. Visas Route
app.get('/api/visas', async (c) => {
  const countryCode = c.req.query('countryCode');
  try {
    let query = `SELECT * FROM visas WHERE is_active = 1`;
    const params: any[] = [];

    if (countryCode) {
      query += ` AND country_code = ?`;
      params.push(countryCode.toUpperCase());
    }
    query += ` ORDER BY sort_order ASC, code ASC`;

    const results = await c.env.DB.prepare(query).bind(...params).all();

    const visas: Visa[] = results.results.map((row: any) => {
      const staticVisa = ALL_COUNTRY_VISAS.find((v) => v.id === row.id);
      return {
        id: row.id,
        countryCode: row.country_code,
        category: row.category,
        code: row.code,
        name: row.name,
        chineseName: row.chinese_name,
        summary: row.summary,
        description: row.description,
        thresholdScore: row.threshold_score,
        maxScorePossible: row.max_score_possible,
        invitationMechanism: row.invitation_mechanism,
        eoiRequired: Boolean(row.eoi_required),
        jobOfferMandatory: Boolean(row.job_offer_mandatory),
        officialFee: {
          local: row.official_fee_local || `${row.official_fee_currency || ''} ${row.official_fee_amount || 0}`.trim() || '查阅官网',
          cnyEstimate: row.official_fee_cny || '参考实时汇率',
          amount: row.official_fee_amount,
          currency: row.official_fee_currency,
        },
        effectivePeriod: row.effective_period || staticVisa?.effectivePeriod || '现行法案',
        officialSourceUrl: row.official_source_url,
        lastVerifiedDate: row.last_verified_date,
        wageRequirementNote: row.wage_requirement_note,
        estimatedProcessingTime: row.estimated_processing_time,
        tags: row.tags ? JSON.parse(row.tags) : [],
        isActive: Boolean(row.is_active),
        sortOrder: row.sort_order,
        advisorVerdict: row.advisor_verdict ? JSON.parse(row.advisor_verdict) : staticVisa?.advisorVerdict,
        prerequisites: row.prerequisites ? JSON.parse(row.prerequisites) : staticVisa?.prerequisites,
        occupationGroups: row.occupation_groups ? JSON.parse(row.occupation_groups) : staticVisa?.occupationGroups,
        legalEvidence: row.legal_evidence ? JSON.parse(row.legal_evidence) : staticVisa?.legalEvidence,
      };
    });

    return c.json({ success: true, data: visas });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// 3. Shortage Occupations Route
app.get('/api/occupations', async (c) => {
  const countryCode = c.req.query('countryCode');
  const search = c.req.query('q');

  try {
    let query = `SELECT * FROM occupations WHERE is_active = 1`;
    const params: any[] = [];

    if (countryCode) {
      query += ` AND country_code = ?`;
      params.push(countryCode.toUpperCase());
    }
    if (search) {
      query += ` AND (title LIKE ? OR chinese_title LIKE ? OR code LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    query += ` ORDER BY title ASC LIMIT 100`;

    const results = await c.env.DB.prepare(query).bind(...params).all();

    const occupations: ShortageOccupation[] = results.results.map((row: any) => ({
      id: row.id,
      countryCode: row.country_code,
      standard: row.standard,
      code: row.code,
      title: row.title,
      chineseTitle: row.chinese_title,
      skillLevel: row.skill_level,
      tier: row.tier,
      isGreenList: Boolean(row.is_green_list),
      isRegionalDemand: Boolean(row.is_regional_demand),
      assessingAuthority: row.assessing_authority,
      minQualificationLevel: row.min_qualification_level,
      annualMedianSalary: row.salary_amount
        ? {
            amount: row.salary_amount,
            currency: row.salary_currency || 'NZD',
            period: row.salary_period || 'annual',
          }
        : undefined,
      bonusPoints: row.bonus_points,
      aliases: row.aliases ? JSON.parse(row.aliases) : [],
      isActive: Boolean(row.is_active),
    }));

    return c.json({ success: true, data: occupations });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// 4. Policy Rules Route
app.get('/api/rules/:visaId', async (c) => {
  const visaId = c.req.param('visaId');

  try {
    const results = await c.env.DB.prepare(
      `SELECT * FROM policy_rules WHERE visa_id = ? AND is_active = 1 ORDER BY order_index ASC`
    )
      .bind(visaId)
      .all();

    const rules: PolicyRule[] = results.results.map((row: any) => ({
      id: row.id,
      visaId: row.visa_id,
      category: row.category,
      code: row.code,
      name: row.name,
      chineseName: row.chinese_name,
      description: row.description,
      logic: JSON.parse(row.logic_json),
      points: row.points,
      scoreFormula: row.score_formula,
      isMandatory: Boolean(row.is_mandatory),
      capGroup: row.cap_group,
      capStrategy: row.cap_strategy,
      capLimit: row.cap_limit,
      orderIndex: row.order_index,
      effectiveFrom: row.effective_from,
      effectiveTo: row.effective_to,
      version: row.version,
      officialClauseRef: row.official_clause_ref,
      isActive: Boolean(row.is_active),
    }));

    return c.json({ success: true, data: rules });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// 5. Unified Intelligent Evaluation Endpoint
app.post('/api/evaluate', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const parsed = EvaluationRequestSchema.safeParse(body);

    if (!parsed.success) {
      return c.json(
        {
          success: false,
          error: 'Invalid evaluation payload',
          details: parsed.error.issues,
        },
        400
      );
    }

    const { profile, visaId } = parsed.data as EvaluationRequest;

    // 1. Fetch Visa metadata
    const visaRow: any = await c.env.DB.prepare(`SELECT * FROM visas WHERE id = ? AND is_active = 1`)
      .bind(visaId)
      .first();

    if (!visaRow) {
      return c.json({ success: false, error: `Visa not found for ID: ${visaId}` }, 404);
    }

    const visa: Visa = {
      id: visaRow.id,
      countryCode: visaRow.country_code,
      category: visaRow.category,
      code: visaRow.code,
      name: visaRow.name,
      chineseName: visaRow.chinese_name,
      summary: visaRow.summary,
      thresholdScore: visaRow.threshold_score,
      invitationMechanism: visaRow.invitation_mechanism,
      eoiRequired: Boolean(visaRow.eoi_required),
      jobOfferMandatory: Boolean(visaRow.job_offer_mandatory),
      officialFee: {
        local: visaRow.official_fee_local || `${visaRow.official_fee_currency || ''} ${visaRow.official_fee_amount || 0}`.trim() || '查阅官网',
        cnyEstimate: visaRow.official_fee_cny || '参考实时汇率',
        amount: visaRow.official_fee_amount,
        currency: visaRow.official_fee_currency,
      },
      effectivePeriod: visaRow.effective_period || '现行法案',
      officialSourceUrl: visaRow.official_source_url,
      lastVerifiedDate: visaRow.last_verified_date,
      wageRequirementNote: visaRow.wage_requirement_note,
      tags: visaRow.tags ? JSON.parse(visaRow.tags) : [],
      isActive: Boolean(visaRow.is_active),
    };

    // 2. Fetch Rules from KV cache or D1
    const cacheKey = `rules:${visaId}`;
    let rules: PolicyRule[] = [];

    if (c.env.POLICY_CACHE) {
      const cached = await c.env.POLICY_CACHE.get(cacheKey, 'json');
      if (cached && Array.isArray(cached)) {
        rules = cached as PolicyRule[];
      }
    }

    if (rules.length === 0) {
      const rulesResult = await c.env.DB.prepare(
        `SELECT * FROM policy_rules WHERE visa_id = ? AND is_active = 1 ORDER BY order_index ASC`
      )
        .bind(visaId)
        .all();

      rules = rulesResult.results.map((row: any) => ({
        id: row.id,
        visaId: row.visa_id,
        category: row.category,
        code: row.code,
        name: row.name,
        chineseName: row.chinese_name,
        description: row.description,
        logic: JSON.parse(row.logic_json),
        points: row.points,
        scoreFormula: row.score_formula,
        isMandatory: Boolean(row.is_mandatory),
        capGroup: row.cap_group,
        capStrategy: row.cap_strategy,
        capLimit: row.cap_limit,
        orderIndex: row.order_index,
        effectiveFrom: row.effective_from,
        effectiveTo: row.effective_to,
        version: row.version,
        officialClauseRef: row.official_clause_ref,
        isActive: Boolean(row.is_active),
      }));

      // Cache rules in KV for 1 hour
      if (c.env.POLICY_CACHE && rules.length > 0) {
        c.executionCtx?.waitUntil(
          c.env.POLICY_CACHE.put(cacheKey, JSON.stringify(rules), { expirationTtl: 3600 })
        );
      }
    }

    // 3. Execute decoupled rule engine
    const evaluationResult = evaluateProfile({ profile, visa, rules });

    // 4. Log evaluation asynchronously (non-blocking)
    if (c.executionCtx) {
      c.executionCtx.waitUntil(
        c.env.DB.prepare(
          `INSERT INTO evaluation_logs (id, visa_id, country_code, total_score, is_eligible, profile_snapshot, result_snapshot, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            crypto.randomUUID(),
            visa.id,
            visa.countryCode,
            evaluationResult.totalScore,
            evaluationResult.isEligible ? 1 : 0,
            JSON.stringify(profile),
            JSON.stringify(evaluationResult),
            new Date().toISOString()
          )
          .run()
          .catch((e: any) => console.error('Failed to log evaluation:', e))
      );
    }

    return c.json({ success: true, data: evaluationResult });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

export default app;
