import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Check,
  Copy,
  Sparkles,
  ShieldAlert,
  Target,
  TrendingUp,
  CalendarDays,
  KeyRound,
  ExternalLink,
  Download,
  FileText,
  AlertCircle,
  QrCode,
  CheckCircle2,
  RefreshCw,
  FolderPlus,
  ArrowRight,
  ChevronDown,
  Lock,
  BookmarkCheck,
  BookOpen,
  GraduationCap,
  Loader2,
  Cpu,
} from 'lucide-react';
import {
  streamVerifyAndGenerateReport,
  fetchAssessmentHistory,
  saveUserReport,
  fetchUserSavedReports,
  type SavedReportItem,
} from '../services/api';
import type { UserAssessmentRecord } from '@emigrant/shared';
import { MarkdownReportRenderer } from './MarkdownReportRenderer';
import { downloadReportPdf } from '../utils/pdfExport';

type ReportModalState = 'IDLE' | 'GENERATING' | 'COMPLETED';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  visaContextName?: string;
  isReportPromo?: boolean;
  onOpenAssessment?: () => void;
  currentAssessmentRecord?: UserAssessmentRecord | null;
}

const GENERATING_STEPS = [
  '正在接入 14 国移民局 2026 官方最新法案底层数据库...',
  '正在执行 ANZSCO / NOC 职业代码深度匹配与打分精算...',
  '正在推演当地劳动力市场 IT 中位数时薪与净储蓄 P&L 模型...',
  '正在构建 36 个月全景落地甘特图与政策熔断预案...',
  '正在排版并生成投行级深度量化推演研报...',
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  visaContextName = '全球多国技术移民对比方案',
  onOpenAssessment,
  currentAssessmentRecord,
}) => {
  // State Machine: IDLE | GENERATING | COMPLETED
  const [modalState, setModalState] = useState<ReportModalState>('IDLE');
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');
  const [tokenInput, setTokenInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [copiedContact, setCopiedContact] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // History Assessment Records State (For linking)
  const [historyRecords, setHistoryRecords] = useState<UserAssessmentRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');
  const [loadingRecords, setLoadingRecords] = useState<boolean>(false);

  // Saved Deep Reports State (For reading previously unlocked reports)
  const [savedReports, setSavedReports] = useState<SavedReportItem[]>([]);

  // Ref for capturing PDF render target
  const reportRef = useRef<HTMLDivElement>(null);

  const contactWeChat = '16621698016';
  const xiaohongshuStoreUrl = 'https://www.xiaohongshu.com'; // 小红书官方小店链接

  useEffect(() => {
    if (isOpen) {
      setLoadingRecords(true);
      fetchAssessmentHistory().then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setHistoryRecords(res.data);
          if (currentAssessmentRecord) {
            setSelectedRecordId(currentAssessmentRecord.id);
          } else {
            setSelectedRecordId(res.data[0]?.id || '');
          }
        } else if (currentAssessmentRecord) {
          setHistoryRecords([currentAssessmentRecord]);
          setSelectedRecordId(currentAssessmentRecord.id);
        } else {
          setHistoryRecords([]);
          setSelectedRecordId('');
        }
        setLoadingRecords(false);
      });

      // Load previously saved reports
      fetchUserSavedReports().then((res) => {
        if (res.success && res.data) {
          setSavedReports(res.data);
        }
      });
    } else {
      // Reset state on close
      setModalState('IDLE');
      setErrorMsg('');
      setCurrentStepIndex(0);
    }
  }, [isOpen, currentAssessmentRecord]);

  // Step advancement timer in GENERATING state
  useEffect(() => {
    let interval: any = null;
    if (modalState === 'GENERATING') {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < GENERATING_STEPS.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 1800);
    } else {
      setCurrentStepIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [modalState]);

  if (!isOpen) return null;

  const handleCopyContact = async () => {
    try {
      await navigator.clipboard.writeText(contactWeChat);
      setCopiedContact(true);
      setTimeout(() => setCopiedContact(false), 2500);
    } catch {
      setCopiedContact(true);
      setTimeout(() => setCopiedContact(false), 2500);
    }
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(streamingText);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    } catch {
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    }
  };

  const selectedRecord = historyRecords.find((r) => r.id === selectedRecordId) || historyRecords[0];

  const handleVerifyAndGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setErrorMsg('请输入 16 位激活兑换码');
      return;
    }

    setErrorMsg('');
    setModalState('GENERATING');
    setIsSaved(false);
    setStreamingText('');

    const profileData = selectedRecord?.profileSnapshot || {};
    const resultData = selectedRecord?.resultSnapshot || {};
    const effectiveTitle = selectedRecord?.title || visaContextName;

    let accumulatedText = '';

    await streamVerifyAndGenerateReport(
      tokenInput.trim(),
      {
        contextName: effectiveTitle,
        target_country: effectiveTitle,
        age: profileData.age,
        major: profileData.fieldCategory || profileData.major,
        education: profileData.educationLevel,
        language_score: profileData.englishLevel,
        experience_years: profileData.workExperienceYears,
        budget: profileData.targetBudget,
        family_status: profileData.familyStatus,
        core_goal: profileData.priorityGoal,
        result_snapshot: resultData,
      },
      (chunk) => {
        accumulatedText += chunk;
        setStreamingText((prev) => prev + chunk);
      },
      () => {
        // Stream completed -> Transition smoothly to COMPLETED
        setModalState('COMPLETED');
        setIsSaved(true);
        // Auto-save completed report
        saveUserReport({
          token: tokenInput.trim(),
          title: effectiveTitle,
          contextName: effectiveTitle,
          profileSnapshot: profileData,
          reportMarkdown: accumulatedText,
        }).then(() => {
          fetchUserSavedReports().then((res) => {
            if (res.success && res.data) setSavedReports(res.data);
          });
        });
      },
      (err) => {
        setErrorMsg(err || '激活兑换码无效或已被使用，请检查后重新输入');
        setModalState('IDLE');
      }
    );
  };

  const handleOpenSavedReport = (rep: SavedReportItem) => {
    setStreamingText(rep.report_markdown);
    setIsSaved(true);
    setModalState('COMPLETED');
  };

  const handleDirectDownloadPdf = async () => {
    if (!reportRef.current) return;
    setDownloadingPdf(true);
    const dateStr = new Date().toISOString().substring(0, 10);
    const filename = `VisaRank-2026-全球技术移民深度推演研报-${dateStr}.pdf`;
    await downloadReportPdf(reportRef.current, filename);
    setDownloadingPdf(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-text overflow-y-auto">
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/70 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Main Container */}
      <div
        className={`relative bg-[#faf9f5] border border-[#e6dfd8] rounded-3xl shadow-2xl w-full p-5 sm:p-7 overflow-hidden z-10 my-auto transition-all duration-300 ${
          modalState === 'COMPLETED'
            ? 'max-w-4xl max-h-[92vh] flex flex-col'
            : modalState === 'GENERATING'
            ? 'max-w-xl'
            : 'max-w-2xl'
        }`}
      >
        {/* Decorative Ambient Accents */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c2410c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#0284c7]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-700 p-2 rounded-2xl hover:bg-[#efe9de] transition-colors cursor-pointer z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* STATE 1: GENERATING (High-Tech Pipeline Loading State)       */}
        {/* ============================================================ */}
        {modalState === 'GENERATING' && (
          <div className="py-6 sm:py-8 space-y-6">
            {/* Header with High-Tech Shimmer */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#181715] text-[#c2410c] flex items-center justify-center mx-auto shadow-md relative overflow-hidden">
                <Cpu className="w-7 h-7 animate-pulse text-[#c2410c]" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 text-[#c2410c] text-[11px] font-mono font-bold">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>DeepSeek 深度量化精算引擎运行中</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                正在生成 10+ 页深度量化推演研报
              </h3>
              <p className="text-xs text-stone-500 font-sans max-w-md mx-auto">
                系统正在对 14 国移民法案、ANZSCO/NOC 职业代码与真实薪资中位数进行多维联合精算...
              </p>
            </div>

            {/* Dynamic 5-Step Pipeline Checklist */}
            <div className="bg-white border border-[#e6dfd8] rounded-2xl p-4 sm:p-5 space-y-3 shadow-inner">
              {GENERATING_STEPS.map((step, idx) => {
                const isFinished = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#fff7ed] border border-[#fed7aa] text-stone-900 font-medium'
                        : isFinished
                        ? 'text-stone-700'
                        : 'text-stone-400 opacity-60'
                    }`}
                  >
                    {/* Status Icon */}
                    <div className="shrink-0">
                      {isFinished ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-[#c2410c] text-white flex items-center justify-center">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center text-[10px] font-mono">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    {/* Step Text */}
                    <span className="text-xs sm:text-[13px] font-mono leading-tight">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simulated Live Character Stream Counter */}
            <div className="text-center text-[11px] font-mono text-stone-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>已推演并生成 {streamingText.length} 字符数据 · 即将完成排版</span>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 2: COMPLETED (Full Report Rendered with Direct PDF)     */}
        {/* ============================================================ */}
        {modalState === 'COMPLETED' && (
          <div className="flex flex-col h-full space-y-3 overflow-hidden">
            {/* Report Top Action Bar (Enabled only when completed) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e6dfd8] pr-8">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-[11px] font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>推演研报已生成 · 10+ 页完整版已存盘</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  【2026 全球技术移民 10+ 页深度量化推演与避坑研报】
                </h3>
              </div>

              {/* Action Buttons: Direct PDF Download & Copy */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleDirectDownloadPdf}
                  disabled={downloadingPdf}
                  className="px-3.5 py-1.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center gap-1.5 shadow-card-hover transition-all cursor-pointer disabled:opacity-50 min-h-[36px]"
                  title="直接下载 PDF 格式研报到您的电脑"
                >
                  {downloadingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>正在生成 PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>📥 直接下载 PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyReport}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 border border-[#e6dfd8] transition-colors cursor-pointer shadow-2xs min-h-[36px]"
                >
                  {copiedReport ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">已复制全文</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>复制全文</span>
                    </>
                  )}
                </button>

                {isSaved && (
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono font-medium flex items-center gap-1">
                    <BookmarkCheck className="w-3.5 h-3.5" />
                    <span>已存入智库</span>
                  </span>
                )}

                <button
                  onClick={() => {
                    setModalState('IDLE');
                    setStreamingText('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1 border border-[#e6dfd8] transition-colors cursor-pointer min-h-[36px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>返回</span>
                </button>
              </div>
            </div>

            {/* Scrollable Report Content Area (Captured by html2canvas for Direct PDF) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white border border-[#e6dfd8] rounded-2xl shadow-inner select-text">
              <div ref={reportRef} className="p-2 sm:p-4 bg-white">
                <MarkdownReportRenderer content={streamingText} isStreaming={false} />
              </div>
            </div>

            {/* Tiny Compliance Disclaimer at Bottom of Report */}
            <div className="pt-2 text-[10px] text-stone-400 font-mono text-center leading-relaxed">
              【法律免责声明】VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 3: IDLE (Input Redemption Code & Developer Mentorship) */}
        {/* ============================================================ */}
        {modalState === 'IDLE' && (
          <>
            {historyRecords.length === 0 && !loadingRecords ? (
              /* Subview: Must do assessment first */
              <div className="py-6 sm:py-8 px-2 space-y-5 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] text-[#c2410c] flex items-center justify-center mx-auto shadow-xs">
                  <FolderPlus className="w-7 h-7" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 text-[#c2410c] text-[11px] font-mono font-bold">
                    <Lock className="w-3 h-3" />
                    <span>研报生成前置要求</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    请先完成 1 次出海背景测算
                  </h2>
                  <p className="text-xs text-stone-500 font-sans leading-relaxed">
                    VisaRank 10+ 页深度量化推演研报需要基于您的<strong>年龄、专业赛道、学历、语言成绩与预算</strong>等真实画像进行 10+ 维度法案量化推演。请先完成 1 分钟测算后解锁！
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenAssessment) onOpenAssessment();
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold shadow-card-hover flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[44px]"
                  >
                    <span>🚀 立即开始 1 分钟智能背景测算</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Compliance Disclaimer */}
                <div className="pt-4 border-t border-[#e6dfd8] text-[10px] font-mono text-stone-400 leading-relaxed text-center">
                  【法律免责声明】VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
                </div>
              </div>
            ) : (
              /* Subview: Form to enter redemption code & select assessment */
              <div className="space-y-4 sm:space-y-5">
                {/* Header Area with Optional Saved Reports Tab */}
                <div className="flex items-start justify-between gap-3 pr-8">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 border border-[#c2410c]/25 text-[#c2410c] text-[11px] font-mono font-bold">
                        <Sparkles className="w-3 h-3" />
                        2026 全球立法与量化精算 · 专项研报
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fff7ed] border border-[#fed7aa] text-[#c2410c] text-[10px] font-mono font-bold">
                        ¥19.9 早鸟特惠
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                      解锁【2026 全球技术移民 10+ 页深度量化推演与避坑报告】
                    </h2>
                    <p className="text-xs text-stone-500 font-sans leading-relaxed">
                      拒绝中介报喜不报忧，基于官方最新法案与劳动力薪资中位数推演
                    </p>
                  </div>

                  {/* Subtab Toggle (Generate vs View Saved Reports) */}
                  {savedReports.length > 0 && (
                    <div className="flex items-center p-1 rounded-xl bg-[#efe9de] border border-[#e6dfd8] shrink-0">
                      <button
                        onClick={() => setActiveTab('generate')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          activeTab === 'generate'
                            ? 'bg-white text-stone-900 shadow-2xs'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        解锁新研报
                      </button>
                      <button
                        onClick={() => setActiveTab('history')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                          activeTab === 'history'
                            ? 'bg-white text-[#c2410c] shadow-2xs font-bold'
                            : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>已解锁 ({savedReports.length})</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* TAB CONTENT: Previously Saved Reports */}
                {activeTab === 'history' && savedReports.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-stone-800 font-serif flex items-center justify-between">
                      <span>您已解锁的深度推演研报库：</span>
                      <span className="text-[10px] text-stone-400 font-mono">无需重复付费，点击直接阅读</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {savedReports.map((rep) => (
                        <div
                          key={rep.id}
                          onClick={() => handleOpenSavedReport(rep)}
                          className="p-3 rounded-2xl bg-white border border-[#e6dfd8] hover:border-[#c2410c] shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
                        >
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-stone-900 group-hover:text-[#c2410c] transition-colors">
                              {rep.title}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono">
                              激活码: {rep.token} · 生成时间: {rep.created_at?.substring(0, 16).replace('T', ' ')}
                            </div>
                          </div>
                          <button className="px-3 py-1 rounded-xl bg-[#efe9de] group-hover:bg-[#c2410c] text-stone-700 group-hover:text-white text-xs font-semibold transition-all">
                            查看研报 →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* TAB CONTENT: Generate New Report */
                  <>
                    {/* Assessment Selector Dropdown */}
                    {historyRecords.length > 0 && (
                      <div className="p-3 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-1.5">
                        <label className="text-xs font-bold text-stone-800 font-serif flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-[#c2410c]" />
                            <span>选择关联的历史测算方案（大模型将基于该画像量身推演）：</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#c2410c] bg-white px-2 py-0.5 rounded-full border border-[#fed7aa]">
                            共 {historyRecords.length} 次测算
                          </span>
                        </label>
                        <div className="relative">
                          <select
                            value={selectedRecordId}
                            onChange={(e) => setSelectedRecordId(e.target.value)}
                            className="w-full pl-3 pr-8 py-2 rounded-xl bg-white border border-[#e6dfd8] text-xs font-mono text-stone-900 focus:outline-none focus:border-[#c2410c] appearance-none cursor-pointer"
                          >
                            {historyRecords.map((rec) => {
                              const results = Array.isArray(rec.resultSnapshot) ? rec.resultSnapshot : [];
                              const topMatch = results[0]?.matchScore ? `(首选匹配度 ${results[0].matchScore}%)` : '';
                              return (
                                <option key={rec.id} value={rec.id}>
                                  {rec.title} {topMatch} — {rec.createdAt.substring(0, 10)}
                                </option>
                              );
                            })}
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* 4 Core Selling Points Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Point 1 */}
                      <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
                        <div className="w-7 h-7 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 text-xs">
                          <div className="font-bold text-stone-900 flex items-center justify-between">
                            <span>14国打分细则逐项拆解与被拒风险推演</span>
                          </div>
                          <div className="text-[11px] text-stone-500 leading-snug">
                            逐条断言年龄、学历、语言打分上限，预演拒签与政策断崖卡点。
                          </div>
                        </div>
                      </div>

                      {/* Point 2 */}
                      <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
                        <div className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Target className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 text-xs">
                          <div className="font-bold text-stone-900 flex items-center justify-between">
                            <span>职业代码 (ANZSCO/NOC) 精准锚定</span>
                          </div>
                          <div className="text-[11px] text-stone-500 leading-snug">
                            对齐官方 Skill Level 1-3 清单，规避岗位职责偏离与认证机构拒批。
                          </div>
                        </div>
                      </div>

                      {/* Point 3 */}
                      <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
                        <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 text-xs">
                          <div className="font-bold text-stone-900 flex items-center justify-between">
                            <span>时薪门槛、找工周期与 PR 概率模型</span>
                          </div>
                          <div className="text-[11px] text-stone-500 leading-snug">
                            结合最新中位数薪资门槛，推演真实求职窗口期与永居转化率。
                          </div>
                        </div>
                      </div>

                      {/* Point 4 */}
                      <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
                        <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CalendarDays className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 text-xs">
                          <div className="font-bold text-stone-900 flex items-center justify-between">
                            <span>专属 36 个月时间线与选校/雇主策略</span>
                          </div>
                          <div className="text-[11px] text-stone-500 leading-snug">
                            输出月度颗粒度规划甘特图，锁定高 ROI 选校与雇主白名单。
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Error Banner */}
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-[#faeaea] border border-[#f5c6c6] text-xs text-[#a62828] flex items-center gap-2 animate-in fade-in duration-150">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Redemption Form */}
                    <form onSubmit={handleVerifyAndGenerate} className="space-y-3 pt-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-800 font-mono flex items-center justify-between">
                          <span>输入报告激活兑换码</span>
                          <span className="text-[10px] text-stone-400 font-normal">支持 16 位卡密一键核销</span>
                        </label>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={tokenInput}
                            onChange={(e) => {
                              setTokenInput(e.target.value.toUpperCase());
                              setErrorMsg('');
                            }}
                            placeholder="请输入 16 位激活兑换码（例如: VR2026-VIP-REPORT）"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e6dfd8] text-base sm:text-xs font-mono uppercase tracking-wider text-stone-900 focus:outline-none focus:border-[#c2410c]"
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-card-hover transition-all cursor-pointer min-h-[44px]"
                      >
                        <FileText className="w-4 h-4" />
                        <span>立即生成深度报告 (DeepSeek 8K 算力引擎)</span>
                      </button>
                    </form>

                    {/* Prominent Purchase & Developer Direct Mentorship Area */}
                    <div className="p-3.5 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="text-stone-800 font-medium flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#c2410c] animate-ping" />
                          <span>需要卡密或技术文书 / DIY 辅导？</span>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={xiaohongshuStoreUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#ff2442] hover:bg-[#e01a35] text-white text-xs font-bold shadow-xs transition-colors"
                          >
                            <span>📕 前往小红书小店（¥19.9 秒发卡密）</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            type="button"
                            onClick={() => setShowQr(!showQr)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#fed7aa] text-stone-800 hover:text-[#c2410c] text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                          >
                            <QrCode className="w-3.5 h-3.5 text-[#c2410c]" />
                            <span>{showQr ? '收起咨询卡片' : '扫码咨询独立开发者 · 专业文书团队 & DIY 辅导'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Collapsible QR Code & Developer Direct Services Box */}
                      {showQr && (
                        <div className="pt-3 border-t border-[#fed7aa] space-y-3 animate-in fade-in duration-200">
                          {/* Developer Profile & WeChat Card */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 p-3.5 rounded-2xl bg-white border border-[#fed7aa] shadow-2xs">
                            <div className="flex items-center gap-3.5">
                              <img
                                src="/wechat-qr.png"
                                alt="主理人微信二维码"
                                className="w-24 h-24 rounded-xl border border-[#e6dfd8] bg-white p-1 object-contain shrink-0 shadow-2xs"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/wechat-qr.jpg';
                                }}
                              />
                              <div className="space-y-1.5 text-left text-xs">
                                <div className="font-bold text-stone-900 flex items-center gap-2 font-serif text-sm">
                                  <span>网站独立开发者 & 出海学术文书团队</span>
                                  <span className="text-[10px] font-mono bg-[#fff7ed] text-[#c2410c] px-1.5 py-0.5 rounded-md border border-[#fed7aa] font-bold">
                                    1v1 直连
                                  </span>
                                </div>
                                <p className="text-[11px] text-stone-600 leading-snug">
                                  专为<strong>预算有限、拒绝传统中介数万元暴利收割</strong>的留学生与出海技术人提供专业护航。
                                </p>
                                <div className="text-[11px] text-stone-500 font-mono flex items-center gap-2 pt-0.5">
                                  <span>微信号: <strong className="text-stone-900">{contactWeChat}</strong></span>
                                  <button
                                    type="button"
                                    onClick={handleCopyContact}
                                    className="text-[11px] text-[#c2410c] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    {copiedContact ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-600" />
                                        <span>已复制微信号</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>点击复制微信号</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 2 Focused Mentorship Offerings */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                            <div className="p-3 rounded-2xl bg-white/90 border border-[#fed7aa]/80 space-y-1 shadow-2xs">
                              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                                <FileText className="w-3.5 h-3.5 text-[#c2410c]" />
                                <span>海外技术文书 1v1 精修 (CV / SOP)</span>
                              </div>
                              <p className="text-[11px] text-stone-500 leading-relaxed">
                                海外在职资深工程师与名校硕博团队亲笔重构，严密对齐目标国官方职业代码（ANZSCO / NOC）加分项，彻底剔除低技能拒签高危词。
                              </p>
                            </div>

                            <div className="p-3 rounded-2xl bg-white/90 border border-[#fed7aa]/80 space-y-1 shadow-2xs">
                              <div className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
                                <GraduationCap className="w-3.5 h-3.5 text-[#c2410c]" />
                                <span>高性价比 DIY 申请全流程陪跑</span>
                              </div>
                              <p className="text-[11px] text-stone-500 leading-relaxed">
                                从高 ROI 选校与打分推演、WES/NZQA/ACS 职业评估认证，到签证递交材料清单核验，手把手陪跑指导，助您掌握自己出海的主动权。
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Tiny Compliance Disclaimer */}
                <div className="pt-2 border-t border-[#e6dfd8] text-[10px] font-mono text-stone-400 leading-relaxed text-center">
                  【法律免责声明】VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
