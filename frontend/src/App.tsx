import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import type { Country, CountryCode, UserAssessmentRecord } from '@emigrant/shared';
import { fetchCountries, fetchVisas } from './services/api';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { SavedAssessmentsDrawer } from './components/SavedAssessmentsDrawer';
import { ConsultationModal } from './components/ConsultationModal';
import { FeedbackModal } from './components/FeedbackModal';
import { TopNav } from './components/TopNav';
import { HomePage } from './pages/HomePage';
import { TrackCategoryPage } from './pages/TrackCategoryPage';
import { PathwayDetailPage } from './pages/PathwayDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AssessmentDrawer } from './components/AssessmentDrawer';

export const AppContent: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const location = useLocation();
  const isVisaDetailPage = location.pathname.startsWith('/visas/');
  const isAdminPage = location.pathname.startsWith('/admin');

  const [, setCountries] = useState<Country[]>([]);
  const [activeCountry, setActiveCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [drawerTargetCountry, setDrawerTargetCountry] = useState<CountryCode>('NZ');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [selectedAssessmentRecord, setSelectedAssessmentRecord] = useState<UserAssessmentRecord | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [consultVisaName, setConsultVisaName] = useState<string | undefined>();
  const [isConsultPromo, setIsConsultPromo] = useState<boolean>(false);

  // Community Feedback / Policy Correction Modal State
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [feedbackVisaId, setFeedbackVisaId] = useState<string | undefined>();
  const [feedbackVisaName, setFeedbackVisaName] = useState<string | undefined>();

  // Unlocked assessments state (persisted across sessions)
  const [unlockedAssessmentIds, setUnlockedAssessmentIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('visarank_unlocked_assessments_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleUnlockAssessment = (recordId?: string) => {
    const idToUnlock = recordId || 'CURRENT';
    setUnlockedAssessmentIds((prev) => {
      if (prev.includes(idToUnlock)) return prev;
      const updated = [...prev, idToUnlock];
      try {
        localStorage.setItem('visarank_unlocked_assessments_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  useEffect(() => {
    fetchCountries().then(setCountries);
    fetchVisas();
  }, []);

  const handleSelectCountry = (country: CountryCode | 'ALL') => {
    setActiveCountry(country);
    if (country !== 'ALL') {
      setDrawerTargetCountry(country);
    }
  };

  const handleOpenAssessment = (countryCode?: CountryCode) => {
    if (!isAuthenticated) {
      openAuthModal(
        'login',
        () => {
          setSelectedAssessmentRecord(null);
          if (countryCode) {
            setDrawerTargetCountry(countryCode);
            setActiveCountry(countryCode);
          }
          setIsDrawerOpen(true);
        },
        '💡 请先登录 VisaRank 账号，系统将永久同步您的 14 国测算画像与历史底牌'
      );
      return;
    }

    setSelectedAssessmentRecord(null);
    if (countryCode) {
      setDrawerTargetCountry(countryCode);
      setActiveCountry(countryCode);
    }
    setIsDrawerOpen(true);
  };

  const handleOpenConsultation = (visaName?: string, isPromo?: boolean) => {
    setConsultVisaName(visaName);
    setIsConsultPromo(!!isPromo);
    setIsConsultModalOpen(true);
  };

  const handleOpenFeedback = (visaId?: string, visaName?: string) => {
    setFeedbackVisaId(visaId);
    setFeedbackVisaName(visaName);
    setIsFeedbackModalOpen(true);
  };

  return (
    <div
      className={`bg-[#fbf9f5] text-[#141413] selection:bg-[#c2410c]/20 selection:text-[#9a3412] flex flex-col font-sans overflow-x-hidden max-w-full ${
        isVisaDetailPage || isAdminPage ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* 1. Full-Width Sticky Top Navigation (Hidden on /admin page) */}
      {!isAdminPage && (
        <TopNav
          activeCountry={activeCountry}
          onSelectCountry={handleSelectCountry}
          onOpenAssessment={() => handleOpenAssessment(activeCountry === 'ALL' ? 'NZ' : activeCountry)}
          onOpenSavedHistory={() => setIsSavedDrawerOpen(true)}
          onOpenConsultation={() => handleOpenConsultation()}
        />
      )}

      {/* 2. Main 3-Tier Routed Content Canvas */}
      <main
        className={
          isVisaDetailPage || isAdminPage
            ? 'flex-1 w-full h-[calc(100vh-64px)] overflow-hidden'
            : 'flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 overflow-x-hidden'
        }
      >
        <Routes>
          {/* Level 1: 首页决策大厅 */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenAssessment={handleOpenAssessment}
                onSelectCountry={(c) => {
                  setActiveCountry(c);
                  setDrawerTargetCountry(c);
                }}
                onOpenConsultation={handleOpenConsultation}
              />
            }
          />

          {/* Level 2: 专业/赛道分类聚合页 */}
          <Route
            path="/tracks/:trackId"
            element={
              <TrackCategoryPage
                onOpenAssessment={handleOpenAssessment}
              />
            }
          />

          {/* Level 3: 单一国家/通道深度决策页 (全视口双栏独立工作台) */}
          <Route
            path="/visas/:visaId"
            element={
              <PathwayDetailPage
                onOpenAssessment={handleOpenAssessment}
                onOpenConsultation={handleOpenConsultation}
                onOpenFeedback={handleOpenFeedback}
              />
            }
          />

          {/* Master Admin Dashboard Route */}
          <Route path="/admin" element={<AdminDashboardPage />} />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 3. High-End Editorial Dark Footer (Hidden on Dual-Pane Visa Detail & Admin Pages) */}
      {!isVisaDetailPage && !isAdminPage && (
        <footer className="bg-[#181715] text-[#faf9f5] border-t border-[#252320] mt-20 py-14 px-6 lg:px-12 select-none">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#252320]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#252320] flex items-center justify-center text-[#c2410c] shadow-xs">
                  <svg className="w-6 h-6 text-[#c2410c]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-white tracking-tight">
                    Visa<span className="text-[#c2410c]">Rank</span>
                  </div>
                  <div className="text-xs text-[#a09d96]">
                    Global Study, Work Visa & Permanent Residency Intelligence Matrix (3-Tier IA)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-[#a09d96] font-mono">
                <span className="flex items-center gap-1.5 text-[#10b981]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  3-Tier IA Engine: 100% Operational
                </span>
                <span>·</span>
                <span>Rule Engine v2.6 (2026 Fiscal Release)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#a09d96] leading-relaxed">
              <div className="space-y-2.5">
                <div className="font-bold text-white font-serif text-sm">
                  数据来源与法案对齐
                </div>
                <p>
                  算法模型严格对齐新西兰移民局 (INZ)、澳大利亚内政事务部 (Home Affairs)、加拿大移民局 (IRCC)、德国 BAMF 及日本法务省入管厅官方立法公报。
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="font-bold text-white font-serif text-sm">
                  客观中立与严谨测算
                </div>
                <p>
                  本中台不代表任何移民局官方立场，严禁任何形式的虚假宣传或中介挂靠，纯粹提供基于公开法案的多维打分、政策门槛对比与可行性差距诊断。
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="font-bold text-white font-serif text-sm">
                  三层渐进决策架构 (3-Tier IA)
                </div>
                <p>
                  Level 1 决策大厅宏观扫描 → Level 2 赛道聚合微观对比 → Level 3 政策打分树深度断言，打造专业客观的决策闭环。
                </p>
              </div>
            </div>

            {/* Compliance Disclaimer Banner in Footer */}
            <div className="pt-4 text-[10px] text-[#7a7871] font-mono leading-relaxed border-t border-[#252320]/60 text-center sm:text-left">
              【法律免责声明】VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
            </div>

            <div className="pt-4 border-t border-[#252320] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6c6a64] font-mono">
              <div>© 2026 VisaRank Intelligence Matrix. Inspired by OpenTheRank 3-Tier Progressive Architecture.</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleOpenFeedback()}
                  className="text-[#a09d96] hover:text-[#c2410c] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>💡 政策纠错 / 提交建议</span>
                </button>
                <a href="#/admin" className="text-[#a09d96] hover:text-white transition-colors">
                  <span>🛡️ 管理员后台</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* 4. Slide-Out Assessment Drawer (Global Match Matrix) */}
      <AssessmentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        targetCountry={drawerTargetCountry}
        initialRecord={selectedAssessmentRecord}
        unlockedAssessmentIds={unlockedAssessmentIds}
        onSelectCountry={(c) => {
          setDrawerTargetCountry(c);
          setActiveCountry(c);
        }}
        onOpenSavedHistory={() => setIsSavedDrawerOpen(true)}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 5. Slide-Out Saved Assessments History Drawer */}
      <SavedAssessmentsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        onSelectAssessment={(record) => {
          setSelectedAssessmentRecord(record);
          setIsSavedDrawerOpen(false);
          setIsDrawerOpen(true);
        }}
      />

      {/* 6. High-End Frosted Glass Auth Modal (Progressive Conversion) */}
      <AuthModal />

      {/* 7. ¥19.9 深度量化推演研报兑换与流式生成弹窗 */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        visaContextName={consultVisaName}
        isReportPromo={isConsultPromo}
        onOpenAssessment={() => handleOpenAssessment(activeCountry === 'ALL' ? 'NZ' : activeCountry)}
        currentAssessmentRecord={selectedAssessmentRecord}
        onUnlockAssessment={handleUnlockAssessment}
      />

      {/* 8. 政策变动众包纠错与意见箱弹窗 */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        visaId={feedbackVisaId}
        visaName={feedbackVisaName}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};
