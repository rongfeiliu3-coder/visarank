import React, { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  Users,
  BarChart3,
  MessageSquare,
  Download,
  RefreshCw,
  Search,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  Globe2,
  Calendar,
  Lock,
  LogOut,
  Flag,
  Copy,
} from 'lucide-react';
import {
  fetchAdminOverview,
  fetchAdminFeedbacks,
  fetchAdminUsers,
  getAdminExportUrl,
} from '../services/api';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/SEOHead';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [adminSecret, setAdminSecret] = useState<string>(() => {
    return sessionStorage.getItem('visarank_admin_secret') || (user?.role === 'admin' ? 'visarank2026_master_key' : '');
  });
  const [inputSecret, setInputSecret] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Dashboard Data State
  const [overviewData, setOverviewData] = useState<any>(null);
  const [feedbacksList, setFeedbacksList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'assessments' | 'users' | 'feedbacks'>('assessments');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<'all' | 'guest' | 'registered'>('all');
  const [feedbackCategoryFilter, setFeedbackCategoryFilter] = useState<'all' | 'correction' | 'official_gazette' | 'suggestion'>('all');

  // Selected Detail Snapshot Modal
  const [selectedSnapshot, setSelectedSnapshot] = useState<any | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // Auto-fill admin secret if current user is admin
  useEffect(() => {
    if (user?.role === 'admin' && !adminSecret) {
      setAdminSecret('visarank2026_master_key');
    }
  }, [user]);

  // Verify and load data when adminSecret changes
  useEffect(() => {
    if (adminSecret) {
      loadDashboard(adminSecret);
    }
  }, [adminSecret]);

  const loadDashboard = async (secret: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const res = await fetchAdminOverview(secret);
      if (res.success && res.data) {
        setOverviewData(res.data);
        sessionStorage.setItem('visarank_admin_secret', secret);

        // Fetch full feedbacks list
        const feedRes = await fetchAdminFeedbacks(secret);
        if (feedRes.success && feedRes.data) {
          setFeedbacksList(feedRes.data);
        } else if (res.data.recentFeedbacks) {
          setFeedbacksList(res.data.recentFeedbacks);
        }

        // Fetch full registered users list
        const usersRes = await fetchAdminUsers(secret);
        if (usersRes.success && usersRes.data) {
          setUsersList(usersRes.data);
        }
      } else {
        setAuthError(res.error || 'Master Key 密钥无效，请重新输入');
        sessionStorage.removeItem('visarank_admin_secret');
        setAdminSecret('');
      }
    } catch (err: any) {
      setAuthError(err.message || '网络连接异常');
      sessionStorage.removeItem('visarank_admin_secret');
      setAdminSecret('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSecret.trim()) {
      setAuthError('请输入 Master Secret Key');
      return;
    }
    setIsVerifying(true);
    setAdminSecret(inputSecret.trim());
    setIsVerifying(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('visarank_admin_secret');
    setAdminSecret('');
    setOverviewData(null);
    setFeedbacksList([]);
    setUsersList([]);
  };

  const handleCopyJson = () => {
    if (!selectedSnapshot) return;
    navigator.clipboard.writeText(JSON.stringify(selectedSnapshot, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // ----------------------------------------------------
  // 1. Master Key Auth Login Screen (if not authenticated)
  // ----------------------------------------------------
  if (!adminSecret || !overviewData) {
    return (
      <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center p-4">
        <SEOHead
          title="系统管理控制台 | VisaRank"
          description="VisaRank 内部管理中枢"
          noIndex={true}
        />
        <div className="max-w-md w-full bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-2xl p-8 space-y-6 animate-scale-up">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#c2410c]/10 text-[#c2410c] flex items-center justify-center border border-[#c2410c]/20">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-stone-900">
              VisaRank 管理后台
            </h1>
            <p className="text-xs text-stone-600">
              请输入 Master Secret Key 访问全局画像大盘与纠错管理
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-stone-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#c2410c]" />
                <span>管理员密钥 (Master Secret Key)</span>
              </label>
              <input
                type="password"
                value={inputSecret}
                onChange={(e) => setInputSecret(e.target.value)}
                placeholder="输入配置的 ADMIN_SECRET..."
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#e6dfd8] text-xs font-mono text-stone-900 focus:outline-none focus:border-[#c2410c]"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-[#faeaea] border border-[#f5c6c6] text-xs text-[#c64545] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying || isLoading}
              className="w-full py-3 rounded-2xl bg-[#181715] hover:bg-[#c2410c] text-white text-xs font-bold font-sans transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? '验证密钥中...' : '进入管理员控制台'}</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[10px] font-mono text-stone-400">
            默认主密钥：visarank2026_master_key
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. Main Admin Dashboard View
  // ----------------------------------------------------
  const rawAssessments: any[] = overviewData.recentAssessments || [];
  
  // Filtered Assessments
  const filteredAssessments = rawAssessments.filter((item) => {
    if (userTypeFilter === 'guest' && !item.isGuest) return false;
    if (userTypeFilter === 'registered' && item.isGuest) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchIp = (item.clientIp || '').toLowerCase().includes(q);
      const matchJob = (item.profile?.specificJobOrMajor || '').toLowerCase().includes(q);
      const matchTrack = (item.profile?.fieldCategory || '').toLowerCase().includes(q);
      const matchCountry = (item.topRecommendation?.country || '').toLowerCase().includes(q);
      const matchEmail = (item.userEmail || '').toLowerCase().includes(q);
      return matchIp || matchJob || matchTrack || matchCountry || matchEmail;
    }
    return true;
  });

  // Filtered Feedbacks
  const filteredFeedbacks = feedbacksList.filter((fb) => {
    if (feedbackCategoryFilter !== 'all' && fb.category !== feedbackCategoryFilter) return false;
    return true;
  });

  const guestCount = rawAssessments.filter((a) => a.isGuest).length;
  const guestRatio = rawAssessments.length > 0 ? Math.round((guestCount / rawAssessments.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f5f1eb] text-stone-900 select-text pb-16">
      <SEOHead
        title="全量画像大盘与纠错审查 | VisaRank 管理控制台"
        description="VisaRank 内部管理中枢"
        noIndex={true}
      />
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e6dfd8] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c2410c] text-white flex items-center justify-center font-serif font-bold text-base shadow-sm">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg font-bold text-stone-900 leading-none">
                  VisaRank 管理控制台
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-500/20">
                  Master Auth Active
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                全量 6 维画像沉淀流水 · 社区政策众包纠错审查中枢
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => loadDashboard(adminSecret)}
              className="px-3 py-1.5 rounded-xl bg-[#efe9de] hover:bg-[#e4ddd2] text-stone-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#e6dfd8]"
              title="刷新实时数据"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>刷新</span>
            </button>

            <a
              href={getAdminExportUrl(adminSecret)}
              download
              className="px-3.5 py-1.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              title="下载全量用户画像 CSV 报表"
            >
              <Download className="w-3.5 h-3.5" />
              <span>导出全量 CSV</span>
            </a>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-[#faf8f5] hover:bg-[#efe9de] text-stone-600 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-[#e6dfd8]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>退出</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Canvas */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        {/* 1. KPI Stats Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-[#faf8f5] border border-[#e6dfd8] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-mono font-bold uppercase">累计测算总量</span>
              <BarChart3 className="w-4 h-4 text-[#c2410c]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {overviewData.totalAssessments}
              <span className="text-xs font-sans text-stone-500 font-normal ml-1.5">次</span>
            </div>
            <div className="text-[10px] font-mono text-stone-500">
              含未登录匿名访客静默落盘
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-[#faf8f5] border border-[#e6dfd8] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-mono font-bold uppercase">注册用户数</span>
              <Users className="w-4 h-4 text-[#0284c7]" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {overviewData.totalUsers}
              <span className="text-xs font-sans text-stone-500 font-normal ml-1.5">人</span>
            </div>
            <div className="text-[10px] font-mono text-stone-500">
              渐进式转化账户池
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-[#faf8f5] border border-[#e6dfd8] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-mono font-bold uppercase">政策纠错与建议</span>
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {overviewData.totalFeedbacks ?? feedbacksList.length}
              <span className="text-xs font-sans text-stone-500 font-normal ml-1.5">条</span>
            </div>
            <div className="text-[10px] font-mono text-stone-500">
              社区众包法案更新提醒
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-[#faf8f5] border border-[#e6dfd8] shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-xs font-mono font-bold uppercase">匿名访客留存率</span>
              <Globe2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {guestRatio}%
            </div>
            <div className="text-[10px] font-mono text-stone-500">
              边缘 IP 与地域自动捕获
            </div>
          </div>
        </div>

        {/* 2. Tab Navigation Switcher */}
        <div className="flex items-center justify-between border-b border-[#e6dfd8] pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'assessments'
                  ? 'bg-[#181715] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-stone-600 hover:bg-[#efe9de] border border-[#e6dfd8]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>全量测算画像流水 ({rawAssessments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'users'
                  ? 'bg-[#181715] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-stone-600 hover:bg-[#efe9de] border border-[#e6dfd8]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>注册用户池 ({usersList.length || overviewData.totalUsers})</span>
            </button>

            <button
              onClick={() => setActiveTab('feedbacks')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'feedbacks'
                  ? 'bg-[#181715] text-white shadow-xs'
                  : 'bg-[#faf8f5] text-stone-600 hover:bg-[#efe9de] border border-[#e6dfd8]'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>政策纠错与意见箱 ({feedbacksList.length})</span>
            </button>
          </div>
        </div>

        {/* 3. TAB 1: ASSESSMENTS STREAM */}
        {activeTab === 'assessments' && (
          <div className="space-y-4 animate-fade-in">
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6dfd8] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索岗位 / 赛道 / 城市 / 推荐国..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#e6dfd8] text-xs font-sans text-stone-800 focus:outline-none focus:border-[#c2410c]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <span className="text-[11px] font-mono text-stone-500">用户类型:</span>
                {(['all', 'guest', 'registered'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setUserTypeFilter(type)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      userTypeFilter === type
                        ? 'bg-[#c2410c] text-white font-bold shadow-2xs'
                        : 'bg-white hover:bg-[#efe9de] text-stone-700 border border-[#e6dfd8]'
                    }`}
                  >
                    {type === 'all' ? '全部' : type === 'guest' ? '匿名访客' : '注册用户'}
                  </button>
                ))}
              </div>
            </div>

            {/* Assessment Records Table */}
            <div className="bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-800">
                  <thead className="bg-[#efe9de]/70 border-b border-[#e6dfd8] text-[11px] font-mono text-stone-600 uppercase">
                    <tr>
                      <th className="py-3 px-4">测算时间</th>
                      <th className="py-3 px-4">访客地区 / IP</th>
                      <th className="py-3 px-4">用户类型</th>
                      <th className="py-3 px-4">画像概览 (年龄/学历/岗位)</th>
                      <th className="py-3 px-4">语言 / 预算 / 诉求</th>
                      <th className="py-3 px-4">Top 1 命中推荐</th>
                      <th className="py-3 px-4 text-center">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6dfd8]/60">
                    {filteredAssessments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-400 font-mono">
                          暂无符合条件的测算记录
                        </td>
                      </tr>
                    ) : (
                      filteredAssessments.map((item) => (
                        <tr key={item.id} className="hover:bg-white/60 transition-colors">
                          {/* Time */}
                          <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              <span>{item.createdAt ? item.createdAt.substring(0, 16).replace('T', ' ') : '刚刚'}</span>
                            </div>
                          </td>

                          {/* Client Geo & IP */}
                          <td className="py-3.5 px-4">
                            <div className="font-mono text-xs font-bold text-stone-900 flex items-center gap-1">
                              <span>{item.clientCountry}</span>
                              <span className="text-[10px] text-stone-500 font-normal">({item.clientCity})</span>
                            </div>
                            <div className="font-mono text-[10px] text-stone-400">{item.clientIp}</div>
                          </td>

                          {/* User Type */}
                          <td className="py-3.5 px-4">
                            {item.isGuest ? (
                              <span className="px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-700 text-[10px] font-mono">
                                匿名访客
                              </span>
                            ) : (
                              <div className="space-y-0.5">
                                <span className="px-2 py-0.5 rounded-md bg-[#c2410c]/10 text-[#c2410c] text-[10px] font-mono font-bold">
                                  注册用户
                                </span>
                                <div className="text-[10px] text-stone-500 truncate max-w-[120px]">{item.userEmail}</div>
                              </div>
                            )}
                          </td>

                          {/* Profile Overview */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <div className="font-bold text-stone-900">
                                {item.profile?.specificJobOrMajor || '未填岗位'} · {item.profile?.fieldCategory || '通用赛道'}
                              </div>
                              <div className="text-[10px] font-mono text-stone-500">
                                {item.profile?.age ? `${item.profile.age}岁` : '年龄未知'} · {item.profile?.educationLevel || '学历未选'} · {item.profile?.experienceYears ? `${item.profile.experienceYears}年工作` : '应届/少于1年'}
                              </div>
                            </div>
                          </td>

                          {/* Language / Budget / Priority */}
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <div className="text-stone-800 font-mono text-[11px]">
                                {item.profile?.englishBand ? `雅思 ${item.profile.englishBand}` : '语言未填'} · {item.profile?.budgetTier ? `预算 ${item.profile.budgetTier}` : '预算未知'}
                              </div>
                              <div className="text-[10px] text-stone-500">
                                优先: {item.profile?.corePriority || '平衡考虑'}
                              </div>
                            </div>
                          </td>

                          {/* Top 1 Match */}
                          <td className="py-3.5 px-4">
                            {item.topRecommendation ? (
                              <div className="space-y-0.5">
                                <div className="font-bold text-[#c2410c] flex items-center gap-1 font-mono">
                                  <span>{item.topRecommendation.country}</span>
                                  <span className="text-[10px] bg-[#c2410c]/10 px-1.5 py-0.2 rounded font-bold">
                                    {item.topRecommendation.score}分
                                  </span>
                                </div>
                                <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
                                  {item.topRecommendation.visa}
                                </div>
                              </div>
                            ) : (
                              <span className="text-stone-400 text-[10px]">-</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => setSelectedSnapshot(item.rawProfileJson || item.profile)}
                              className="px-2.5 py-1.5 rounded-xl bg-[#efe9de] hover:bg-[#181715] text-stone-700 hover:text-white text-xs font-mono font-medium transition-colors cursor-pointer border border-[#e6dfd8]"
                              title="查看完整 6 维 JSON 快照"
                            >
                              <Eye className="w-3.5 h-3.5 inline mr-1" />
                              <span>快照</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB 2: REGISTERED USERS LIST */}
        {activeTab === 'users' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-800">
                  <thead className="bg-[#efe9de]/70 border-b border-[#e6dfd8] text-[11px] font-mono text-stone-600 uppercase">
                    <tr>
                      <th className="py-3 px-4">用户 ID</th>
                      <th className="py-3 px-4">电子邮箱</th>
                      <th className="py-3 px-4">称呼 / 姓名</th>
                      <th className="py-3 px-4">权限角色</th>
                      <th className="py-3 px-4">注册时间</th>
                      <th className="py-3 px-4">最后登录时间</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6dfd8]/60">
                    {usersList.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400 font-mono">
                          暂无注册用户数据
                        </td>
                      </tr>
                    ) : (
                      usersList.map((u) => (
                        <tr key={u.id} className="hover:bg-white/60 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                            {u.id}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                            {u.email}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-stone-800">
                            {u.name || '-'}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                              u.role === 'admin'
                                ? 'bg-[#c2410c]/10 text-[#c2410c] border border-[#c2410c]/20'
                                : 'bg-stone-200/80 text-stone-700'
                            }`}>
                              {u.role === 'admin' ? '👑 Admin 管理员' : '👤 User 用户'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                            {u.created_at ? u.created_at.substring(0, 16).replace('T', ' ') : '-'}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                            {u.last_login_at ? u.last_login_at.substring(0, 16).replace('T', ' ') : '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. TAB 3: FEEDBACKS LIST */}
        {activeTab === 'feedbacks' && (
          <div className="space-y-4 animate-fade-in">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { key: 'all', label: '全部反馈' },
                { key: 'correction', label: '🚩 政策参数纠错' },
                { key: 'official_gazette', label: '📜 官方新公报' },
                { key: 'suggestion', label: '💡 产品建议' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFeedbackCategoryFilter(cat.key as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    feedbackCategoryFilter === cat.key
                      ? 'bg-[#c2410c] text-white font-bold shadow-2xs'
                      : 'bg-[#faf8f5] hover:bg-[#efe9de] text-stone-700 border border-[#e6dfd8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Feedbacks Grid */}
            {filteredFeedbacks.length === 0 ? (
              <div className="p-12 text-center bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl text-stone-400 font-mono">
                暂无用户提交的纠错或建议记录
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-5 rounded-3xl bg-[#faf8f5] border border-[#e6dfd8] shadow-2xs space-y-3 hover:border-[#c2410c]/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        fb.category === 'correction'
                          ? 'bg-[#faeaea] text-[#c64545]'
                          : fb.category === 'official_gazette'
                          ? 'bg-sky-50 text-sky-800'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {fb.category === 'correction' ? '🚩 政策参数纠错' : fb.category === 'official_gazette' ? '📜 官方新公报' : '💡 产品建议'}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {fb.created_at ? fb.created_at.substring(0, 16).replace('T', ' ') : '刚刚'}
                      </span>
                    </div>

                    {fb.visa_id && (
                      <div className="text-xs font-mono font-bold text-[#c2410c] flex items-center gap-1">
                        <span>🏛️ 关联法案：</span>
                        <span>{fb.visa_id}</span>
                      </div>
                    )}

                    <div className="p-3.5 rounded-2xl bg-white border border-[#e6dfd8] text-xs text-stone-800 leading-relaxed font-sans whitespace-pre-wrap">
                      {fb.content}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-1 border-t border-[#e6dfd8]/60">
                      <div>
                        联系方式: <strong className="text-stone-800">{fb.contact || '未留'}</strong>
                      </div>
                      <div>
                        {fb.client_country} ({fb.client_city || 'Local'})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 5. Raw JSON Profile Snapshot Modal */}
      {selectedSnapshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setSelectedSnapshot(null)}
          />
          <div className="relative bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4 z-10 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[#e6dfd8] pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#c2410c]" />
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  用户 6 维画像原始 JSON 快照
                </h3>
              </div>
              <button
                onClick={() => setSelectedSnapshot(null)}
                className="p-1.5 rounded-xl hover:bg-[#efe9de] text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-2xl bg-[#181715] p-4 text-emerald-400 font-mono text-xs leading-relaxed border border-stone-800">
              <pre>{JSON.stringify(selectedSnapshot, null, 2)}</pre>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-stone-400">
                可直接复制用于算法复盘与回测
              </span>
              <button
                onClick={handleCopyJson}
                className="px-4 py-2 rounded-xl bg-[#181715] hover:bg-[#c2410c] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copiedJson ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? '已复制 JSON' : '复制 JSON 快照'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
