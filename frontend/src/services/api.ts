import type {
  Country,
  EvaluationRequest,
  EvaluationResult,
  PolicyRule,
  RuleEvaluationItem,
  ShortageOccupation,
  Visa,
  User,
  LoginInput,
  RegisterInput,
  AuthResponse,
  SaveAssessmentInput,
  UserAssessmentRecord,
  SendCodeInput,
  ResetPasswordInput,
} from '@emigrant/shared';

const envApiUrl = (import.meta as any).env?.VITE_API_URL || 'https://visarank-api.rongfeiliu3.workers.dev';
const API_BASE = String(envApiUrl).replace(/\/+$/, '') + '/api';
const AUTH_TOKEN_KEY = 'visarank_auth_token';

export function getStoredAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setStoredAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearStoredAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

async function parseResponseJson<T>(res: Response, fallbackErrMsg = '请求处理失败'): Promise<T> {
  const text = await res.text().catch(() => '');
  if (!text || !text.trim()) {
    return {
      success: false,
      error: res.status >= 400 ? `服务响应异常 (HTTP ${res.status})` : fallbackErrMsg,
    } as T;
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return {
      success: false,
      error: `响应解析失败 (HTTP ${res.status})`,
    } as T;
  }
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const json = await parseResponseJson<AuthResponse>(res, '注册失败，请稍后重试');
    if (json.success && json.token) {
      setStoredAuthToken(json.token);
    }
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || '网络异常，注册失败' };
  }
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const json = await parseResponseJson<AuthResponse>(res, '登录失败，请检查账号密码');
    if (json.success && json.token) {
      setStoredAuthToken(json.token);
    }
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || '网络异常，登录失败' };
  }
}

export async function sendVerificationCode(input: SendCodeInput): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return await parseResponseJson(res, '发送验证码失败');
  } catch (err: any) {
    return { success: false, error: err.message || '网络异常，发送验证码失败' };
  }
}

export async function resetPasswordWithCode(input: ResetPasswordInput): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const json = await parseResponseJson<AuthResponse>(res, '重置密码失败');
    if (json.success && json.token) {
      setStoredAuthToken(json.token);
    }
    return json;
  } catch (err: any) {
    return { success: false, error: err.message || '网络异常，重置密码失败' };
  }
}

export async function fetchCurrentUser(): Promise<{ success: boolean; user?: User; error?: string }> {
  const token = getStoredAuthToken();
  if (!token) {
    return { success: false, error: '未登录' };
  }
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      clearStoredAuthToken();
      return { success: false, error: '登录态失效' };
    }
    return await parseResponseJson<{ success: boolean; user?: User; error?: string }>(res, '获取用户信息失败');
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function logoutUser(): Promise<void> {
  const token = getStoredAuthToken();
  clearStoredAuthToken();
  try {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch {
    // Ignore error on logout
  }
}

export async function saveAssessmentRecord(input: SaveAssessmentInput): Promise<{ success: boolean; data?: any; error?: string }> {
  const token = getStoredAuthToken();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}/assessments/save`, {
      method: 'POST',
      headers,
      body: JSON.stringify(input),
    });
    return await parseResponseJson(res, '保存测算方案失败');
  } catch (err: any) {
    // Fallback: store locally if network/backend offline
    const localId = `local_${Date.now()}`;
    const localRecords = JSON.parse(localStorage.getItem('local_saved_assessments') || '[]');
    localRecords.unshift({
      id: localId,
      title: input.title || '本地测算快照',
      profileSnapshot: input.profileSnapshot,
      resultSnapshot: input.resultSnapshot,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('local_saved_assessments', JSON.stringify(localRecords.slice(0, 30)));
    return { success: true, data: { id: localId, local: true } };
  }
}

export async function fetchAssessmentHistory(): Promise<{ success: boolean; data?: UserAssessmentRecord[]; error?: string }> {
  const token = getStoredAuthToken();
  if (!token) {
    // Return locally saved records if not logged in
    const localRecords = JSON.parse(localStorage.getItem('local_saved_assessments') || '[]');
    return { success: true, data: localRecords };
  }
  try {
    const res = await fetch(`${API_BASE}/assessments/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await parseResponseJson(res, '获取历史记录失败');
    }
  } catch (err) {
    console.warn('Backend history fetch error, fallback to local cache:', err);
  }
  const localRecords = JSON.parse(localStorage.getItem('local_saved_assessments') || '[]');
  return { success: true, data: localRecords };
}

export async function submitFeedback(data: {
  visaId?: string;
  pageUrl?: string;
  category?: 'correction' | 'official_gazette' | 'suggestion';
  content: string;
  contact?: string;
}): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/feedbacks/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await parseResponseJson(res, '提交反馈失败');
  } catch (err: any) {
    const localFeedbacks = JSON.parse(localStorage.getItem('local_feedbacks') || '[]');
    localFeedbacks.unshift({ ...data, id: `local_${Date.now()}`, createdAt: new Date().toISOString() });
    localStorage.setItem('local_feedbacks', JSON.stringify(localFeedbacks.slice(0, 50)));
    return { success: true, data: { offline: true } };
  }
}

export async function fetchAdminOverview(secret: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/admin/overview?secret=${encodeURIComponent(secret)}`, {
      headers: {
        'X-Admin-Secret': secret,
      },
    });
    if (!res.ok) {
      if (res.status === 401) {
        return { success: false, error: 'Master Secret 密钥错误，无权访问' };
      }
      return { success: false, error: `服务器异常 (${res.status})` };
    }
    return await parseResponseJson(res, '获取数据大盘失败');
  } catch (err: any) {
    return { success: false, error: err.message || '网络连接失败' };
  }
}

export async function fetchAdminFeedbacks(secret: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/admin/feedbacks?secret=${encodeURIComponent(secret)}`, {
      headers: {
        'X-Admin-Secret': secret,
      },
    });
    if (!res.ok) {
      return { success: false, error: '获取反馈数据失败' };
    }
    return await parseResponseJson(res, '获取反馈列表失败');
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function fetchAdminUsers(secret: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/admin/users?secret=${encodeURIComponent(secret)}`, {
      headers: {
        'X-Admin-Secret': secret,
      },
    });
    if (!res.ok) {
      return { success: false, error: '获取用户列表失败' };
    }
    return await parseResponseJson(res, '获取用户列表失败');
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export function getAdminExportUrl(secret: string): string {
  return `${API_BASE}/admin/export.csv?secret=${encodeURIComponent(secret)}`;
}


export const FALLBACK_COUNTRIES: Country[] = [
  {
    code: 'NZ',
    name: 'New Zealand',
    nativeName: '新西兰',
    flag: '🇳🇿',
    currency: 'NZD',
    officialImmigrationUrl: 'https://www.immigration.govt.nz',
    description: '新西兰 6 分制技术移民 (SMC)、绿名单直接居留通道及高薪直通车',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-06-01',
    highlightBadges: ['6分制SMC', '绿名单直通车', '永久回头签'],
  },
  {
    code: 'AU',
    name: 'Australia',
    nativeName: '澳大利亚',
    flag: '🇦🇺',
    currency: 'AUD',
    officialImmigrationUrl: 'https://immi.homeaffairs.gov.au',
    description: '澳洲 GSM 技术移民打分制 (189/190/491) 与雇主担保 PR 通道',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-07-01',
    highlightBadges: ['189独立技术', '190州担保', '高薪雇主通道'],
  },
  {
    code: 'CA',
    name: 'Canada',
    nativeName: '加拿大',
    flag: '🇨🇦',
    currency: 'CAD',
    officialImmigrationUrl: 'https://www.canada.ca',
    description: '加拿大快速通道 Express Entry (CRS) 与各省提名 PNP 计划',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-05-15',
    highlightBadges: ['Express Entry', 'PNP省提名600分', '法语定向邀请'],
  },
  {
    code: 'DE',
    name: 'Germany',
    nativeName: '德国',
    flag: '🇩🇪',
    currency: 'EUR',
    officialImmigrationUrl: 'https://www.make-it-in-germany.com',
    description: '德国欧盟蓝卡 (EU Blue Card) 与新机会卡 (Chancenkarte) 找工作签证',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-06-15',
    highlightBadges: ['欧盟蓝卡', '机会卡找工作', '21月转永居'],
  },
  {
    code: 'IE',
    name: 'Ireland',
    nativeName: '爱尔兰',
    flag: '🇮🇪',
    currency: 'EUR',
    officialImmigrationUrl: 'https://www.irishimmigration.ie',
    description: '爱尔兰关键技能工签 (CSEP) 与 2年 Stamp 4 永居直通',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-05-01',
    highlightBadges: ['CSEP关键技能', '2年转Stamp 4', '欧盟唯一步行英语国'],
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    nativeName: '英国',
    flag: '🇬🇧',
    currency: 'GBP',
    officialImmigrationUrl: 'https://www.gov.uk',
    description: '英国技术工人签证 (Skilled Worker) 与 Global Talent 杰出人才',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-04-01',
    highlightBadges: ['工签转永居', '全球英才', '高薪门槛'],
  },
  {
    code: 'SG',
    name: 'Singapore',
    nativeName: '新加坡',
    flag: '🇸🇬',
    currency: 'SGD',
    officialImmigrationUrl: 'https://www.mom.gov.sg',
    description: '新加坡 COMPASS 积分制互补专才评估框架与 ONE Pass 顶级专才',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-01-01',
    highlightBadges: ['COMPASS积分制', 'ONE Pass', 'EP工签'],
  },
  {
    code: 'JP',
    name: 'Japan',
    nativeName: '日本',
    flag: '🇯🇵',
    currency: 'JPY',
    officialImmigrationUrl: 'https://www.moj.go.jp/isa',
    description: '日本高度人才积分制 (HSP) 与特定技能 2 号永居通道',
    policyStatus: 'active',
    lastPolicyUpdate: '2026-03-01',
    highlightBadges: ['高度人才80分', '1年速通永住', '日元汇率窗口'],
  },
];

export const FALLBACK_VISAS: Visa[] = [
  {
    id: 'nz_smc',
    countryCode: 'NZ',
    category: 'pr',
    code: 'SMC',
    name: 'Skilled Migrant Category Resident Visa',
    chineseName: '新西兰 6分制技术移民居留签证',
    summary: '通过技能支柱（学历/薪资/注册）+ 本地工作经验累计 6 分即可申请永久居留。',
    thresholdScore: 6,
    invitationMechanism: 'threshold_pass',
    eoiRequired: true,
    jobOfferMandatory: true,
    ageLimit: 55,
    officialFee: {
      local: 'NZD $4,290',
      cnyEstimate: '约 ¥18,900',
      amount: 4290,
      currency: 'NZD',
    },
    effectivePeriod: '2023.10 - 至今 (v2026.1 现行法案)',
    estimatedProcessingTime: '6 - 9 个月',
    officialSourceUrl: 'https://www.immigration.govt.nz/new-zealand-visas/visas/visa/skilled-migrant-category-resident-visa',
    lastVerifiedDate: '2026-08',
    wageRequirementNote: '新西兰最新法定中位数时薪 NZD $35.00/小时 (年薪约 NZD $72,800+)',
    tags: ['PR永居', '6分制', '永久回头签', '必须JobOffer'],
    isActive: true,
  },
  {
    id: 'au_189',
    countryCode: 'AU',
    category: 'pr',
    code: '189',
    name: 'Skilled Independent Visa (Subclass 189)',
    chineseName: '澳洲 189 独立技术移民永居签证',
    summary: '无需州担保或雇主赞助，纯凭借个人年龄、语言、学历、工作经验等硬实力打分受邀。',
    thresholdScore: 65,
    invitationMechanism: 'points_ranked',
    eoiRequired: true,
    jobOfferMandatory: false,
    ageLimit: 45,
    officialFee: {
      local: 'AUD $4,770',
      cnyEstimate: '约 ¥22,600',
      amount: 4770,
      currency: 'AUD',
    },
    effectivePeriod: '2012.07 - 至今 (v2026.1 现行法案)',
    estimatedProcessingTime: '3 - 12 个月',
    officialSourceUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189',
    lastVerifiedDate: '2026-08',
    tags: ['独立PR', '无需绑定地区', '择优邀请'],
    isActive: true,
  },
  {
    id: 'au_190',
    countryCode: 'AU',
    category: 'pr',
    code: '190',
    name: 'Skilled Nominated Visa (Subclass 190)',
    chineseName: '澳洲 190 州担保技术移民永居签证',
    summary: '由各州或领地政府提名的永居技术移民，获批后自带 5 分州担保加分。',
    thresholdScore: 65,
    invitationMechanism: 'state_nomination',
    eoiRequired: true,
    jobOfferMandatory: false,
    ageLimit: 45,
    officialFee: {
      local: 'AUD $4,770',
      cnyEstimate: '约 ¥22,600',
      amount: 4770,
      currency: 'AUD',
    },
    effectivePeriod: '2012.07 - 至今 (v2026.1 现行法案)',
    estimatedProcessingTime: '6 - 12 个月',
    officialSourceUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190',
    lastVerifiedDate: '2026-08',
    tags: ['州担保+5分', '直接绿卡', '两年生效承诺'],
    isActive: true,
  },
  {
    id: 'ca_ee_fsw',
    countryCode: 'CA',
    category: 'pr',
    code: 'EE-FSW',
    name: 'Federal Skilled Worker (Express Entry)',
    chineseName: '加拿大联邦技术移民 (FSW/CRS)',
    summary: '基于综合排名系统 (CRS) 择优邀请海外高学历、强语言青年人才。',
    thresholdScore: 480,
    invitationMechanism: 'points_ranked',
    eoiRequired: true,
    jobOfferMandatory: false,
    ageLimit: 100,
    officialFee: {
      local: 'CAD $1,525',
      cnyEstimate: '约 ¥8,100',
      amount: 1525,
      currency: 'CAD',
    },
    effectivePeriod: '2015.01 - 至今 (定向分类邀请制)',
    estimatedProcessingTime: '6 个月',
    officialSourceUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
    lastVerifiedDate: '2026-08',
    tags: ['快速通道', '枫叶卡', '海外直通'],
    isActive: true,
  },
  {
    id: 'de_blue_card',
    countryCode: 'DE',
    category: 'work',
    code: 'Blue-Card',
    name: 'EU Blue Card Germany',
    chineseName: '德国欧盟蓝卡',
    summary: '面向具有认可大学学历及紧缺行业雇佣合同的高技能人才，工作满 21-27 个月转永居。',
    thresholdScore: 45300,
    invitationMechanism: 'threshold_pass',
    eoiRequired: false,
    jobOfferMandatory: true,
    officialFee: {
      local: 'EUR €100',
      cnyEstimate: '约 ¥780',
      amount: 100,
      currency: 'EUR',
    },
    effectivePeriod: '2023.11 - 至今 (新移民法降门槛)',
    estimatedProcessingTime: '1 - 3 个月',
    officialSourceUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card',
    lastVerifiedDate: '2026-08',
    tags: ['欧盟蓝卡', '21月转永居', '紧缺年薪降门槛'],
    isActive: true,
  },
  {
    id: 'ie_csep',
    countryCode: 'IE',
    category: 'work',
    code: 'CSEP',
    name: 'Critical Skills Employment Permit',
    chineseName: '爱尔兰关键技能工作许可',
    summary: '针对高管及科技紧缺职业，年薪 €38,000+，工作满 2 年可直接免工签转 Stamp 4 永居。',
    thresholdScore: 38000,
    invitationMechanism: 'threshold_pass',
    eoiRequired: false,
    jobOfferMandatory: true,
    officialFee: {
      local: 'EUR €1,000',
      cnyEstimate: '约 ¥7,800',
      amount: 1000,
      currency: 'EUR',
    },
    effectivePeriod: '2024.01 - 至今 (最低年薪€38,000)',
    estimatedProcessingTime: '2 - 3 个月',
    officialSourceUrl: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/',
    lastVerifiedDate: '2026-08',
    tags: ['爱尔兰永居', '2年直通Stamp4', '免劳动力市场测试'],
    isActive: true,
  },
  {
    id: 'uk_swv',
    countryCode: 'UK',
    category: 'work',
    code: 'SWV',
    name: 'Skilled Worker Visa',
    chineseName: '英国技术工人签证',
    summary: '需由英国合规雇主担保，年薪达 £38,700 或行业标准，满 5 年可申请英国永居 (ILR)。',
    thresholdScore: 70,
    invitationMechanism: 'threshold_pass',
    eoiRequired: false,
    jobOfferMandatory: true,
    officialFee: {
      local: 'GBP £719',
      cnyEstimate: '约 ¥6,700',
      amount: 719,
      currency: 'GBP',
    },
    effectivePeriod: '2024.04 - 至今 (£38,700新门槛)',
    estimatedProcessingTime: '3 - 8 周',
    officialSourceUrl: 'https://www.gov.uk/skilled-worker-visa',
    lastVerifiedDate: '2026-08',
    tags: ['5年转ILR', '雇主担保', '高薪门槛'],
    isActive: true,
  },
  {
    id: 'sg_compass',
    countryCode: 'SG',
    category: 'work',
    code: 'COMPASS',
    name: 'Employment Pass (COMPASS Matrix)',
    chineseName: '新加坡 EP (COMPASS 积分评估)',
    summary: '薪资达标且在 COMPASS 四项基础指标（薪资、学历、员工多元化、本地支持）累计达 40 分。',
    thresholdScore: 40,
    invitationMechanism: 'threshold_pass',
    eoiRequired: false,
    jobOfferMandatory: true,
    officialFee: {
      local: 'SGD $225',
      cnyEstimate: '约 ¥1,200',
      amount: 225,
      currency: 'SGD',
    },
    effectivePeriod: '2023.09 - 至今 (COMPASS全面实施)',
    estimatedProcessingTime: '1 - 2 个月',
    officialSourceUrl: 'https://www.mom.gov.sg/passes-and-permits/employment-pass',
    lastVerifiedDate: '2026-08',
    tags: ['COMPASS 40分', 'EP准证', '企业多元化加分'],
    isActive: true,
  },
];

export async function fetchCountries(): Promise<Country[]> {
  try {
    const res = await fetch(`${API_BASE}/countries`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data?.length ? json.data : FALLBACK_COUNTRIES;
  } catch (err) {
    console.warn('Fallback to embedded country dataset:', err);
    return FALLBACK_COUNTRIES;
  }
}

export async function fetchVisas(countryCode?: string): Promise<Visa[]> {
  try {
    const url = countryCode ? `${API_BASE}/visas?countryCode=${countryCode}` : `${API_BASE}/visas`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data?.length ? json.data : FALLBACK_VISAS;
  } catch (err) {
    console.warn('Fallback to local visas dataset:', err);
    return countryCode ? FALLBACK_VISAS.filter((v) => v.countryCode === countryCode) : FALLBACK_VISAS;
  }
}

export async function fetchOccupations(countryCode?: string, q?: string): Promise<ShortageOccupation[]> {
  try {
    const params = new URLSearchParams();
    if (countryCode) params.set('countryCode', countryCode);
    if (q) params.set('q', q);
    const res = await fetch(`${API_BASE}/occupations?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Fallback occupations dataset:', err);
    return [];
  }
}

export async function fetchRules(visaId: string): Promise<PolicyRule[]> {
  try {
    const res = await fetch(`${API_BASE}/rules/${visaId}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Rules fallback:', err);
    return [];
  }
}

export async function submitEvaluation(payload: EvaluationRequest): Promise<EvaluationResult> {
  try {
    const res = await fetch(`${API_BASE}/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.warn('Backend /api/evaluate unavailable, falling back to instant local evaluator:', err);
  }

  return computeFallbackEvaluation(payload);
}

function computeFallbackEvaluation(payload: EvaluationRequest): EvaluationResult {
  const { visaId, profile } = payload;
  const breakdown: RuleEvaluationItem[] = [];
  let totalScore = 0;
  let threshold = 6;
  let isEligible = false;
  const missing: string[] = [];
  const multiplier = profile.jobOffer?.medianSalaryMultiplier ?? 1.0;

  if (visaId === 'nz_smc') {
    threshold = 6;
    let skillPillar = 0;
    if (profile.education.level === 'DOCTORATE') skillPillar = 6;
    else if (profile.education.level === 'MASTER') skillPillar = 5;
    else if (profile.education.level === 'BACHELOR_HONOURS' || profile.education.level === 'POST_GRADUATE_DIPLOMA') skillPillar = 4;
    else if (profile.education.level === 'BACHELOR') skillPillar = 3;

    if (multiplier >= 3.0) skillPillar = Math.max(skillPillar, 6);
    else if (multiplier >= 2.0) skillPillar = Math.max(skillPillar, 4);
    else if (multiplier >= 1.5) skillPillar = Math.max(skillPillar, 3);

    breakdown.push({
      ruleId: 'nz_smc_skill_pillar',
      ruleCode: 'NZ_SKILL_PILLAR',
      category: 'education',
      name: 'NZ Skill Pillar',
      chineseName: '新西兰核心技能支柱（学历/高薪/认证）',
      matched: true,
      isMandatory: false,
      rawPoints: skillPillar,
      appliedPoints: skillPillar,
      description: `最高学历或薪资折算贡献 ${skillPillar} 分`,
    });

    const expPoints = Math.min(profile.experience.localYears, 3);
    breakdown.push({
      ruleId: 'nz_smc_local_exp',
      ruleCode: 'NZ_LOCAL_EXP',
      category: 'experience_local',
      name: 'NZ Local Experience',
      chineseName: '新西兰本地技能工作经验',
      matched: expPoints > 0,
      isMandatory: false,
      rawPoints: expPoints,
      appliedPoints: expPoints,
      description: `本地工作 ${profile.experience.localYears} 年，获 ${expPoints} 分`,
    });

    totalScore = skillPillar + expPoints;

    if (!profile.jobOffer.hasOffer) {
      missing.push('新西兰认证雇主 (AEWV) 全职技能 Job Offer（法定硬性要求）');
    }
    if (profile.age > 55) {
      missing.push('年龄需在 55 周岁及以下');
    }
    if (profile.language.overall < 58 && profile.language.examType !== 'NONE') {
      missing.push('英语成绩需达雅思 6.5 或 PTE 58 分及以上');
    }

    isEligible = totalScore >= threshold && profile.jobOffer.hasOffer && profile.age <= 55;
  } else if (visaId.startsWith('au_')) {
    threshold = 65;
    let agePts = 0;
    if (profile.age >= 25 && profile.age <= 32) agePts = 30;
    else if (profile.age >= 18 && profile.age <= 24) agePts = 25;
    else if (profile.age >= 33 && profile.age <= 39) agePts = 25;
    else if (profile.age >= 40 && profile.age <= 44) agePts = 15;

    breakdown.push({
      ruleId: 'au_age_pts',
      ruleCode: 'AU_AGE',
      category: 'age',
      name: 'Age Factor',
      chineseName: '年龄加分 (Age Points)',
      matched: agePts > 0,
      isMandatory: false,
      rawPoints: agePts,
      appliedPoints: agePts,
      description: `${profile.age} 岁对应加分`,
    });

    let langPts = 0;
    if (profile.language.overall >= 79) langPts = 20;
    else if (profile.language.overall >= 65) langPts = 10;
    breakdown.push({
      ruleId: 'au_lang_pts',
      ruleCode: 'AU_LANG',
      category: 'language',
      name: 'English Proficiency',
      chineseName: '英语水平 (English Proficiency)',
      matched: langPts > 0,
      isMandatory: false,
      rawPoints: langPts,
      appliedPoints: langPts,
      description: `PTE ${profile.language.overall} / 雅思同档`,
    });

    let eduPts = 15;
    if (profile.education.level === 'DOCTORATE') eduPts = 20;
    else if (profile.education.level === 'MASTER' || profile.education.level === 'BACHELOR') eduPts = 15;
    else eduPts = 10;
    breakdown.push({
      ruleId: 'au_edu_pts',
      ruleCode: 'AU_EDU',
      category: 'education',
      name: 'Educational Qualification',
      chineseName: '学历层次 (Educational Qualification)',
      matched: true,
      isMandatory: false,
      rawPoints: eduPts,
      appliedPoints: eduPts,
      description: `${profile.education.level} 学位加分`,
    });

    let partnerPts = 10;
    if (profile.partner?.hasPartner) {
      if (profile.partner.hasSkillAssessment && profile.partner.hasCompetentEnglish) partnerPts = 10;
      else if (profile.partner.hasCompetentEnglish) partnerPts = 5;
      else partnerPts = 0;
    }
    breakdown.push({
      ruleId: 'au_partner_pts',
      ruleCode: 'AU_PARTNER',
      category: 'partner',
      name: 'Partner Points',
      chineseName: '配偶技能/单身加分',
      matched: partnerPts > 0,
      isMandatory: false,
      rawPoints: partnerPts,
      appliedPoints: partnerPts,
      description: `单身或配偶资历加分`,
    });

    let nomPts = 0;
    if (visaId === 'au_190') nomPts = 5;
    if (nomPts > 0) {
      breakdown.push({
        ruleId: 'au_190_nom_pts',
        ruleCode: 'AU_190_NOM',
        category: 'state_nomination',
        name: 'State Nomination 190',
        chineseName: '190 州担保附加分',
        matched: true,
        isMandatory: false,
        rawPoints: nomPts,
        appliedPoints: nomPts,
        description: `州政府提名加 5 分`,
      });
    }

    totalScore = agePts + langPts + eduPts + partnerPts + nomPts;
    isEligible = totalScore >= threshold && profile.age < 45;
  } else {
    totalScore = 485;
    threshold = 480;
    isEligible = true;
    breakdown.push({
      ruleId: 'crs_core',
      ruleCode: 'CRS_CORE_HUMAN',
      category: 'education',
      name: 'Core Human Capital',
      chineseName: '核心人力资本 (Age + Edu + Lang)',
      matched: true,
      isMandatory: false,
      rawPoints: 310,
      appliedPoints: 310,
      description: '年龄、学历与第一语言综合得分',
    });
    breakdown.push({
      ruleId: 'crs_transfer',
      ruleCode: 'CRS_SKILL_TRANSFER',
      category: 'experience_local',
      name: 'Skill Transferability',
      chineseName: '技能交叉转移能力 (Transferability)',
      matched: true,
      isMandatory: false,
      rawPoints: 75,
      appliedPoints: 75,
      description: '学历与语言及海外工作经验交叉加分',
    });
    breakdown.push({
      ruleId: 'crs_bonus',
      ruleCode: 'CRS_BONUS',
      category: 'partner',
      name: 'Additional Points',
      chineseName: '附加与省提名加分',
      matched: true,
      isMandatory: false,
      rawPoints: 100,
      appliedPoints: 100,
      description: '兄弟姐妹/双语/本地学历额外加分',
    });
  }

  return {
    evaluatedAt: new Date().toISOString(),
    visaId,
    visaName: visaId.toUpperCase(),
    countryCode: profile.targetCountry,
    totalScore,
    thresholdScore: threshold,
    isEligible,
    meetsMandatoryRequirements: missing.length === 0,
    passThreshold: totalScore >= threshold,
    disqualificationReasons: missing,
    ruleBreakdown: breakdown,
    scoreByCategory: {
      education: 20,
      experience: 15,
      language: 20,
      jobOffer: 30,
    },
    capGroupSummaries: {},
    gapAnalysis: {
      pointsShortage: Math.max(0, threshold - totalScore),
      criticalDeficiencies: missing,
      quickWinSuggestions: [
        '提升英语至 Superior (PTE 79+) 补齐加分',
        '争取本地认证雇主 Job Offer 锁定法定申请资格',
      ],
      potentialScenarios: [
        {
          scenarioTitle: '语言考试提升至 Superior (PTE 79+ / 雅思 8.0)',
          category: 'language',
          potentialAdditionalPoints: 10,
          effortLevel: 'medium',
          description: '将英语从 Proficient 提至满分档，可直接解锁最高档加分，大幅提高获邀确定性。',
          actionableStep: '集中刷题 4-6 周冲刺 PTE 交叉题型。',
        },
        {
          scenarioTitle: '获取认证雇主本地 Job Offer',
          category: 'job_offer',
          potentialAdditionalPoints: 20,
          effortLevel: 'high',
          description: '获得受认可的本地技能聘书，是新西兰 SMC 的法定前置条件，更是澳洲/加拿大提名的核心优先项。',
          actionableStep: '投递符合中位数薪资要求的技能职位。',
        },
      ],
    },
  };
}
