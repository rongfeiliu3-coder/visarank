-- ==============================================================================
-- Cloudflare D1 Relational Schema for Emigrant Platform
-- ==============================================================================

-- 1. Countries Table
CREATE TABLE IF NOT EXISTS countries (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    native_name TEXT NOT NULL,
    flag TEXT NOT NULL,
    currency TEXT NOT NULL,
    official_immigration_url TEXT NOT NULL,
    description TEXT,
    policy_status TEXT DEFAULT 'active' CHECK (policy_status IN ('active', 'beta', 'maintenance', 'deprecated')),
    last_policy_update TEXT NOT NULL,
    highlight_badges TEXT, -- JSON Array of badge tags
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- 2. Visas Table
CREATE TABLE IF NOT EXISTS visas (
    id TEXT PRIMARY KEY,
    country_code TEXT NOT NULL REFERENCES countries(code) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('study', 'work', 'pr', 'whv', 'investor', 'family')),
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    chinese_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    threshold_score REAL DEFAULT 0,
    max_score_possible REAL,
    invitation_mechanism TEXT NOT NULL CHECK (invitation_mechanism IN ('points_ranked', 'threshold_pass', 'state_nomination', 'employer_sponsored', 'first_come_first_served')),
    eoi_required INTEGER DEFAULT 0,
    job_offer_mandatory INTEGER DEFAULT 0,
    age_limit INTEGER,
    official_fee_amount REAL,
    official_fee_currency TEXT,
    official_fee_local TEXT,
    official_fee_cny TEXT,
    effective_period TEXT,
    official_source_url TEXT,
    last_verified_date TEXT,
    wage_requirement_note TEXT,
    estimated_processing_time TEXT,
    tags TEXT, -- JSON Array of tags
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_visas_country ON visas(country_code);
CREATE INDEX IF NOT EXISTS idx_visas_category ON visas(category);

-- 3. Shortage Occupations Table
CREATE TABLE IF NOT EXISTS occupations (
    id TEXT PRIMARY KEY,
    country_code TEXT NOT NULL REFERENCES countries(code) ON DELETE CASCADE,
    standard TEXT NOT NULL CHECK (standard IN ('ANZSCO', 'NOC_2021', 'SOC_UK', 'SSOC')),
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    chinese_title TEXT NOT NULL,
    skill_level TEXT NOT NULL,
    tier TEXT,
    is_green_list INTEGER DEFAULT 0,
    is_regional_demand INTEGER DEFAULT 0,
    assessing_authority TEXT,
    min_qualification_level TEXT,
    salary_amount REAL,
    salary_currency TEXT,
    salary_period TEXT DEFAULT 'annual',
    bonus_points REAL DEFAULT 0,
    aliases TEXT, -- JSON Array of aliases/keywords
    description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_occupations_country_code ON occupations(country_code, code);
CREATE INDEX IF NOT EXISTS idx_occupations_title ON occupations(title);

-- 4. Policy Rules Table (Decoupled JsonLogic Rule Tree)
CREATE TABLE IF NOT EXISTS policy_rules (
    id TEXT PRIMARY KEY,
    visa_id TEXT NOT NULL REFERENCES visas(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    chinese_name TEXT NOT NULL,
    description TEXT NOT NULL,
    logic_json TEXT NOT NULL, -- Standard JsonLogic JSON expression
    points REAL DEFAULT 0,
    score_formula TEXT,
    is_mandatory INTEGER DEFAULT 0,
    cap_group TEXT, -- Identification for mutually exclusive or capped groups
    cap_strategy TEXT DEFAULT 'max_of' CHECK (cap_strategy IN ('max_of', 'sum_up_to_max', 'exclusive_choice')),
    cap_limit REAL,
    order_index INTEGER DEFAULT 0,
    effective_from TEXT NOT NULL,
    effective_to TEXT,
    version TEXT DEFAULT '1.0',
    official_clause_ref TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_policy_rules_visa ON policy_rules(visa_id, is_active);
CREATE INDEX IF NOT EXISTS idx_policy_rules_cap_group ON policy_rules(visa_id, cap_group);

-- 5. Policy Diff & Regulation Logs
CREATE TABLE IF NOT EXISTS policy_diff_logs (
    id TEXT PRIMARY KEY,
    country_code TEXT NOT NULL REFERENCES countries(code) ON DELETE CASCADE,
    visa_id TEXT REFERENCES visas(id) ON DELETE SET NULL,
    change_date TEXT NOT NULL,
    title TEXT NOT NULL,
    chinese_title TEXT NOT NULL,
    summary TEXT NOT NULL,
    diff_payload TEXT, -- JSON object of diff
    ai_impact_analysis TEXT,
    source_url TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_policy_diff_country ON policy_diff_logs(country_code, change_date);

-- 6. User Evaluation Snapshot Logs (Edge analytics)
CREATE TABLE IF NOT EXISTS evaluation_logs (
    id TEXT PRIMARY KEY,
    visa_id TEXT NOT NULL,
    country_code TEXT NOT NULL,
    total_score REAL NOT NULL,
    is_eligible INTEGER NOT NULL,
    profile_snapshot TEXT NOT NULL, -- JSON
    result_snapshot TEXT NOT NULL, -- JSON
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_evaluation_logs_visa ON evaluation_logs(visa_id, created_at);

-- 7. Users Table (Progressive Auth & RBAC)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    created_at TEXT DEFAULT (datetime('now')),
    last_login_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 8. User Assessments History Table
CREATE TABLE IF NOT EXISTS user_assessments (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    profile_snapshot TEXT NOT NULL, -- JSON profile snapshot
    result_snapshot TEXT NOT NULL,  -- JSON match result snapshot
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_user_assessments_user ON user_assessments(user_id, created_at);

-- 9. Policy Corrections and Community Feedback Table
CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    visa_id TEXT,
    page_url TEXT NOT NULL,
    category TEXT DEFAULT 'correction' CHECK (category IN ('correction', 'official_gazette', 'suggestion')),
    content TEXT NOT NULL,
    contact TEXT,
    client_ip TEXT,
    client_country TEXT,
    client_city TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_feedbacks_visa ON feedbacks(visa_id, created_at);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created ON feedbacks(created_at);

-- 10. Email Verification & Password Reset Codes
CREATE TABLE IF NOT EXISTS verification_codes (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    purpose TEXT NOT NULL CHECK (purpose IN ('reset_password', 'register_verify', 'login_verify')),
    expires_at INTEGER NOT NULL,
    used_at INTEGER,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email, purpose);
CREATE INDEX IF NOT EXISTS idx_verification_codes_created ON verification_codes(created_at);

-- 11. Activation Tokens Table (¥19.9 Deep Report Codes)
CREATE TABLE IF NOT EXISTS activation_tokens (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    is_used INTEGER DEFAULT 0,
    used_at INTEGER,
    user_email TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_activation_tokens_code ON activation_tokens(code);
CREATE INDEX IF NOT EXISTS idx_activation_tokens_used ON activation_tokens(is_used);

