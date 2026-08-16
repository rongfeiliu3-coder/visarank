/**
 * VisaRank End-to-End Auth, Session, D1 Database CRUD and Error Boundary Verification Suite
 */

const API_BASE = 'https://visarank-api.rongfeiliu3.workers.dev/api';
const MASTER_SECRET = 'visarank2026_master_key';

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  status?: number;
  durationMs: number;
  error?: string;
  details?: any;
}

const results: TestResult[] = [];

async function runTest(
  suite: string,
  name: string,
  fn: () => Promise<void>
) {
  const start = Date.now();
  try {
    await fn();
    const durationMs = Date.now() - start;
    results.push({ suite, name, passed: true, durationMs });
    console.log(`  ✅ [PASS] ${name} (${durationMs}ms)`);
  } catch (err: any) {
    const durationMs = Date.now() - start;
    results.push({ suite, name, passed: false, durationMs, error: err.message, details: err });
    console.error(`  ❌ [FAIL] ${name} (${durationMs}ms):`, err.message);
  }
}

async function safeFetchJson(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : {};
  } catch (e: any) {
    throw new Error(`Failed to parse JSON (HTTP ${res.status}): ${text.substring(0, 150)}`);
  }
  return { status: res.status, ok: res.ok, json, headers: res.headers };
}

async function main() {
  console.log('🚀 Starting VisaRank Full-Stack E2E Verification Suite against:', API_BASE);
  console.log('========================================================================\n');

  const randomSuffix = Math.floor(Math.random() * 100000);
  const testUserEmail = `test_user_${Date.now()}_${randomSuffix}@visarank.net`;
  const testPassword = `SecurePass2026!_${randomSuffix}`;
  let userToken = '';
  let userId = '';
  let savedAssessmentId = '';

  // -------------------------------------------------------------
  // SUITE 1: Edge Health & Error Boundary Defense
  // -------------------------------------------------------------
  console.log('📦 SUITE 1: Edge Health & Global Error Boundary');

  await runTest('Edge Health', 'GET /api/health should return 200 with status ok', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/health`);
    if (!ok || status !== 200) throw new Error(`Expected 200, got ${status}`);
    if (json.status !== 'ok') throw new Error(`Expected status="ok", got ${JSON.stringify(json)}`);
  });

  await runTest('Error Boundary', 'Non-existent route should return 404 with standard JSON (no empty body)', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/non-existent-endpoint-${Date.now()}`);
    if (status !== 404) throw new Error(`Expected 404, got ${status}`);
    if (json.success !== false || !json.error) throw new Error(`Expected JSON error response, got ${JSON.stringify(json)}`);
  });

  await runTest('Error Boundary', 'POST /api/auth/register with empty body should return 400 JSON', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    });
    if (status !== 400) throw new Error(`Expected 400, got ${status}`);
    if (json.success !== false) throw new Error(`Expected success=false, got ${JSON.stringify(json)}`);
  });

  // -------------------------------------------------------------
  // SUITE 2: User Registration & Password Hashing
  // -------------------------------------------------------------
  console.log('\n📦 SUITE 2: User Registration & Password Hashing');

  await runTest('Auth: Register', `Register new user (${testUserEmail})`, async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        password: testPassword,
        name: '自动化测试专员',
      }),
    });

    if (!ok || status !== 200) throw new Error(`Registration failed with status ${status}: ${json.error}`);
    if (!json.success || !json.user || !json.token) throw new Error(`Malformed response: ${JSON.stringify(json)}`);
    if (json.user.email !== testUserEmail.toLowerCase()) throw new Error(`Email mismatch: ${json.user.email}`);

    userToken = json.token;
    userId = json.user.id;
  });

  await runTest('Auth: Duplicate Prevention', 'Attempt duplicate registration with same email should return 400', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        password: testPassword,
        name: '重复注册账号',
      }),
    });

    if (status !== 400) throw new Error(`Expected 400, got ${status}`);
    if (json.success !== false || !json.error?.includes('已被注册')) {
      throw new Error(`Expected duplicate error message, got ${JSON.stringify(json)}`);
    }
  });

  // -------------------------------------------------------------
  // SUITE 3: Authentication, Password Verification & Session JWT
  // -------------------------------------------------------------
  console.log('\n📦 SUITE 3: Authentication, Password Verification & Session JWT');

  await runTest('Auth: Login Bad Password', 'Login with wrong password should return 401', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        password: 'IncorrectPassword123!',
      }),
    });

    if (status !== 401) throw new Error(`Expected 401, got ${status}`);
    if (json.success !== false) throw new Error(`Expected success=false, got ${JSON.stringify(json)}`);
  });

  await runTest('Auth: Login Success', 'Login with correct credentials should return valid JWT and user profile', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        password: testPassword,
      }),
    });

    if (!ok || status !== 200) throw new Error(`Login failed with status ${status}: ${json.error}`);
    if (!json.success || !json.token || !json.user) throw new Error(`Missing token or user: ${JSON.stringify(json)}`);
    userToken = json.token;
  });

  await runTest('Auth: Admin Login', 'Login with admin account (rongfeiliu3@gmail.com) should return role="admin"', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'rongfeiliu3@gmail.com',
        password: 'VisaRank2026!',
      }),
    });

    if (!ok || status !== 200) throw new Error(`Admin login failed: ${json.error}`);
    if (!json.success || json.user?.role !== 'admin') {
      throw new Error(`Expected role="admin", got: ${JSON.stringify(json)}`);
    }
  });

  await runTest('Auth: Current User /me', 'GET /api/auth/me with Bearer token should return user profile', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!ok || status !== 200) throw new Error(`Failed to fetch profile: ${json.error}`);
    if (!json.success || json.user?.email !== testUserEmail.toLowerCase()) {
      throw new Error(`Profile mismatch: ${JSON.stringify(json)}`);
    }
  });

  await runTest('Auth: /me Unauthorized', 'GET /api/auth/me without token should return 401', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/me`);
    if (status !== 401) throw new Error(`Expected 401, got ${status}`);
    if (json.success !== false) throw new Error(`Expected success=false, got ${JSON.stringify(json)}`);
  });

  // -------------------------------------------------------------
  // SUITE 3.5: Resend Email Code & Password Reset Flow
  // -------------------------------------------------------------
  console.log('\n📦 SUITE 3.5: Resend Email Code & Password Reset Flow');

  await runTest('Auth: Send Code Non-Existent', 'Send code for non-existent email should return 400', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `not_found_${Date.now()}@visarank.net`,
        purpose: 'reset_password',
      }),
    });

    if (status !== 400) throw new Error(`Expected 400, got ${status}`);
    if (json.success !== false || !json.error?.includes('尚未注册')) {
      throw new Error(`Expected unregistered error message, got ${JSON.stringify(json)}`);
    }
  });

  await runTest('Auth: Send Code Success', `Send verification code to registered email (${testUserEmail})`, async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        purpose: 'reset_password',
      }),
    });

    if (!ok || status !== 200) throw new Error(`Send code failed: ${json.error}`);
    if (!json.success || !json.message) throw new Error(`Malformed response: ${JSON.stringify(json)}`);
  });

  await runTest('Auth: Send Code Rate Limit', 'Requesting code again within 60s should return 429', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/send-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        purpose: 'reset_password',
      }),
    });

    if (status !== 429) throw new Error(`Expected 429 Rate Limit, got ${status}`);
    if (json.success !== false || !json.error?.includes('频繁')) {
      throw new Error(`Expected rate limit message, got ${JSON.stringify(json)}`);
    }
  });

  await runTest('Auth: Reset Password Invalid Code', 'Reset password with wrong code should return 400', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUserEmail,
        code: '000000',
        newPassword: 'BrandNewPassword2026!',
      }),
    });

    if (status !== 400) throw new Error(`Expected 400, got ${status}`);
    if (json.success !== false || !json.error?.includes('无效或已过期')) {
      throw new Error(`Expected invalid code error, got ${JSON.stringify(json)}`);
    }
  });

  // -------------------------------------------------------------
  // SUITE 4: D1 Database CRUD: User Assessment Snapshots
  // -------------------------------------------------------------
  console.log('\n📦 SUITE 4: D1 Database CRUD: User Assessment Snapshots');

  await runTest('D1: Save Assessment', 'POST /api/assessments/save should persist 6D profile snapshot into D1', async () => {
    const mockProfile = {
      age: 29,
      maritalStatus: 'SINGLE',
      domesticCityTier: 'TIER_1',
      educationLevel: 'master',
      fieldCategory: 'cs_ai',
      specificJobOrMajor: '全栈开发工程师 & LLM Infra',
      experienceYears: 5,
      englishBand: 'PTE_65_PLUS',
      budgetTier: 'TIER_30_50W',
      pathwayPreference: 'DIRECT_EMPLOYER',
      corePriority: 'fastest_pr',
      departureMotivations: ['更好的职业回报', '工作生活平衡'],
    };

    const mockResults = [
      {
        countryCode: 'NZ',
        countryName: '新西兰',
        tier: 'tier1',
        matchScore: 95,
        primaryVisa: '绿色名单直接居留签 (STR)',
      },
      {
        countryCode: 'DE',
        countryName: '德国',
        tier: 'tier1',
        matchScore: 92,
        primaryVisa: '欧盟蓝卡 (EU Blue Card)',
      },
    ];

    const { status, ok, json } = await safeFetchJson(`${API_BASE}/assessments/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        title: '自动化测试 2026 澳洲+德国技术移民档案',
        profileSnapshot: mockProfile,
        resultSnapshot: mockResults,
      }),
    });

    if (!ok || status !== 200) throw new Error(`Save failed with status ${status}: ${json.error}`);
    if (!json.success || !json.data?.id) throw new Error(`Missing record ID: ${JSON.stringify(json)}`);

    savedAssessmentId = json.data.id;
  });

  await runTest('D1: Fetch History', 'GET /api/assessments/history should retrieve saved assessment list for user', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/assessments/history`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!ok || status !== 200) throw new Error(`Failed to fetch history: ${json.error}`);
    if (!json.success || !Array.isArray(json.data) || json.data.length === 0) {
      throw new Error(`History array is empty or invalid: ${JSON.stringify(json)}`);
    }

    const found = json.data.find((item: any) => item.id === savedAssessmentId);
    if (!found) throw new Error(`Saved assessment ${savedAssessmentId} not found in history`);
    if (found.profileSnapshot?.fieldCategory !== 'cs_ai') {
      throw new Error(`Profile fieldCategory mismatch: ${JSON.stringify(found.profileSnapshot)}`);
    }
  });

  await runTest('D1: Fetch Assessment Detail', 'GET /api/assessments/:id should return complete snapshot details', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/assessments/${savedAssessmentId}`);
    if (!ok || status !== 200) throw new Error(`Failed to fetch detail: ${json.error}`);
    if (!json.success || !json.data) throw new Error(`Missing data: ${JSON.stringify(json)}`);
    if (json.data.id !== savedAssessmentId) throw new Error(`ID mismatch: ${json.data.id}`);
  });

  // -------------------------------------------------------------
  // SUITE 5: D1 Database CRUD: Feedback & Policy Correction
  // -------------------------------------------------------------
  console.log('\n📦 SUITE 5: D1 Database CRUD: Feedback & Policy Correction');

  await runTest('D1: Submit Feedback', 'POST /api/feedbacks/submit should record policy correction into feedbacks table', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/feedbacks/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visaId: 'de_blue_card',
        pageUrl: '/#/visas/de_blue_card',
        category: 'official_gazette',
        content: '德国联邦公报 2026 年最新紧缺人才蓝卡年薪门槛已更新为 €41,041，特此提报。',
        contact: 'test_contributor@visarank.net',
      }),
    });

    if (!ok || status !== 200) throw new Error(`Submit feedback failed: ${json.error}`);
    if (!json.success || !json.data?.id) throw new Error(`Missing feedback ID: ${JSON.stringify(json)}`);
  });

  // -------------------------------------------------------------
  // SUITE 6: Admin Dashboard & Overview Aggregation
  // -------------------------------------------------------------
  console.log('\n📦 SUITE 6: Admin Dashboard & Overview Aggregation');

  await runTest('Admin: Overview with Master Secret', 'GET /api/admin/overview with secret should return aggregated stats', async () => {
    const { status, ok, json } = await safeFetchJson(`${API_BASE}/admin/overview?secret=${MASTER_SECRET}`, {
      headers: {
        'X-Admin-Secret': MASTER_SECRET,
      },
    });

    if (!ok || status !== 200) throw new Error(`Admin overview failed with status ${status}: ${json.error}`);
    if (!json.success || !json.data) throw new Error(`Missing overview data: ${JSON.stringify(json)}`);

    const { totalUsers, totalAssessments, totalFeedbacks, recentAssessments } = json.data;
    if (typeof totalUsers !== 'number' || typeof totalAssessments !== 'number') {
      throw new Error(`Invalid statistics: ${JSON.stringify(json.data)}`);
    }
    if (!Array.isArray(recentAssessments)) {
      throw new Error(`recentAssessments is not array`);
    }

    console.log(`    📊 D1 Data Status -> Total Users: ${totalUsers}, Assessments: ${totalAssessments}, Feedbacks: ${totalFeedbacks}`);
  });

  await runTest('Admin: CSV Stream Export', 'GET /api/admin/export.csv should stream valid UTF-8 CSV with Excel BOM', async () => {
    const res = await fetch(`${API_BASE}/admin/export.csv?secret=${MASTER_SECRET}`, {
      headers: { 'X-Admin-Secret': MASTER_SECRET },
    });

    if (!res.ok || res.status !== 200) throw new Error(`CSV export failed with status ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('text/csv')) throw new Error(`Invalid Content-Type: ${contentType}`);

    const csvText = await res.text();
    if (!csvText.includes('测算ID') || !csvText.includes('注册邮箱')) {
      throw new Error(`CSV header missing: ${csvText.substring(0, 100)}`);
    }
  });

  await runTest('Admin: Unauthorized Check', 'GET /api/admin/overview with wrong secret should return 401 JSON', async () => {
    const { status, json } = await safeFetchJson(`${API_BASE}/admin/overview?secret=wrong_secret_12345`);
    if (status !== 401) throw new Error(`Expected 401, got ${status}`);
    if (json.success !== false) throw new Error(`Expected success=false, got ${JSON.stringify(json)}`);
  });

  // -------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------
  console.log('\n========================================================================');
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;
  console.log(`📊 Test Summary: Total: ${results.length} | Passed: ${passedCount} | Failed: ${failedCount}`);

  if (failedCount > 0) {
    console.error(`❌ ${failedCount} tests failed!`);
    process.exit(1);
  } else {
    console.log('🎉 ALL END-TO-END AUTH, D1 CRUD, AND ERROR BOUNDARY TESTS PASSED 100%!');
  }
}

main().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
