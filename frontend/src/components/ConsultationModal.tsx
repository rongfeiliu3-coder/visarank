import React, { useState, useEffect } from 'react';
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
  Printer,
  FileText,
  AlertCircle,
  QrCode,
  CheckCircle2,
  RefreshCw,
  FolderPlus,
  ArrowRight,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { streamVerifyAndGenerateReport, fetchAssessmentHistory } from '../services/api';
import type { UserAssessmentRecord } from '@emigrant/shared';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  visaContextName?: string;
  isReportPromo?: boolean;
  onOpenAssessment?: () => void;
  currentAssessmentRecord?: UserAssessmentRecord | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  visaContextName = '全球多国技术移民对比方案',
  onOpenAssessment,
  currentAssessmentRecord,
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [copiedContact, setCopiedContact] = useState(false);
  const [reportActive, setReportActive] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // History Assessment Records State
  const [historyRecords, setHistoryRecords] = useState<UserAssessmentRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');
  const [loadingRecords, setLoadingRecords] = useState<boolean>(false);

  const contactWeChat = '16621698016';
  const xiaohongshuStoreUrl = 'https://www.xiaohongshu.com'; // 小红书官方小店链接

  useEffect(() => {
    if (isOpen) {
      setLoadingRecords(true);
      fetchAssessmentHistory().then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setHistoryRecords(res.data);
          // If currentAssessmentRecord exists and matches, pick it, else pick the latest
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
    }
  }, [isOpen, currentAssessmentRecord]);

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

  const selectedRecord = historyRecords.find((r) => r.id === selectedRecordId) || historyRecords[0];

  const handleVerifyAndGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setErrorMsg('请输入 16 位激活兑换码');
      return;
    }

    setErrorMsg('');
    setVerifying(true);

    const profileData = selectedRecord?.profileSnapshot || {};
    const resultData = selectedRecord?.resultSnapshot || {};

    let receivedAnyChunk = false;

    await streamVerifyAndGenerateReport(
      tokenInput.trim(),
      {
        contextName: selectedRecord?.title || visaContextName,
        target_country: selectedRecord?.title || visaContextName,
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
        if (!receivedAnyChunk) {
          receivedAnyChunk = true;
          setReportActive(true);
          setIsStreaming(true);
          setStreamingText('');
        }
        setStreamingText((prev) => prev + chunk);
      },
      () => {
        setIsStreaming(false);
        setVerifying(false);
      },
      (err) => {
        setErrorMsg(err || '激活兑换码无效或已被使用，请检查后重新输入');
        setVerifying(false);
      }
    );
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-text overflow-y-auto">
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Main Container */}
      <div
        className={`relative bg-[#faf9f5] border border-[#e6dfd8] rounded-3xl shadow-2xl w-full p-5 sm:p-7 overflow-hidden z-10 my-auto transition-all duration-300 ${
          reportActive ? 'max-w-4xl max-h-[90vh] flex flex-col' : 'max-w-2xl'
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

        {/* VIEW 1: Report Active & Reader (Streamed from DeepSeek) */}
        {reportActive ? (
          <div className="flex flex-col h-full space-y-4 overflow-hidden">
            {/* Report Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e6dfd8] pr-8">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-[11px] font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>兑换码已核销 · DeepSeek 专属推演研报实时生成</span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  【2026 全球技术移民 10+ 页深度量化推演与避坑研报】
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintReport}
                  className="px-3 py-1.5 rounded-xl bg-[#efe9de] hover:bg-[#e4dcce] text-stone-800 text-xs font-semibold flex items-center gap-1.5 border border-[#e6dfd8] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>打印 / 导出 PDF</span>
                </button>
                <button
                  onClick={() => {
                    setReportActive(false);
                    setStreamingText('');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1 border border-[#e6dfd8] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>返回</span>
                </button>
              </div>
            </div>

            {/* Scrollable Report Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white border border-[#e6dfd8] rounded-2xl shadow-inner font-sans text-xs sm:text-sm text-stone-800 space-y-4 leading-relaxed select-text">
              <div className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
                {streamingText}
                {isStreaming && (
                  <span className="inline-block w-2 h-4 bg-[#c2410c] ml-1 animate-pulse" />
                )}
              </div>
            </div>

            {/* Disclaimer at Bottom of Report */}
            <div className="pt-2 text-[10px] text-stone-400 font-mono text-center leading-relaxed">
              【法律免责声明】VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
            </div>
          </div>
        ) : historyRecords.length === 0 && !loadingRecords ? (
          /* VIEW 2: Empty Assessment State (Must do assessment first) */
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
          /* VIEW 3: Purchase & Redemption Modal Form (With Assessment Selector) */
          <div className="space-y-4 sm:space-y-5">
            {/* Header Area */}
            <div className="space-y-1.5 pr-8">
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

            {/* Assessment Selector Dropdown */}
            {historyRecords.length > 0 && (
              <div className="p-3 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-1.5">
                <label className="text-xs font-bold text-stone-800 font-serif flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#c2410c]" />
                    <span>选择关联的历史测算方案：</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#c2410c] bg-white px-2 py-0.5 rounded-full border border-[#fed7aa]">
                    共 {historyRecords.length} 次测算记录
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
              {/* Point 1: 14国打分细则逐项拆解与被拒风险推演 */}
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

              {/* Point 2: 目标国职业代码官方精准匹配建议 */}
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

              {/* Point 3: 真实落地时薪门槛、找工周期与工签转永居概率模型 */}
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

              {/* Point 4: 专属 36 个月出海时间线与选校/雇主筛选策略 */}
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

            {/* Redemption Area */}
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
                disabled={verifying}
                className="w-full py-3 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-card-hover transition-all cursor-pointer disabled:opacity-50 min-h-[44px]"
              >
                {verifying ? (
                  <span>正在验证卡密并调用 DeepSeek 引擎推演...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>立即生成深度报告 (DeepSeek AI 加速引擎)</span>
                  </>
                )}
              </button>
            </form>

            {/* Prominent Purchase Guide Area */}
            <div className="p-3.5 rounded-2xl bg-[#fff7ed] border border-[#fed7aa] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-stone-800 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c2410c] animate-ping" />
                  <span>还没有激活码？</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={xiaohongshuStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#ff2442] hover:bg-[#e01a35] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>📕 前往小红书官方小店购买（¥19.9 自动秒发卡密）</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowQr(!showQr)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-[#fed7aa] text-stone-700 hover:text-[#c2410c] text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#c2410c]" />
                    <span>{showQr ? '收起二维码' : '扫码购买 / 微信咨询'}</span>
                  </button>
                </div>
              </div>

              {/* Collapsible QR Code & Contact Box */}
              {showQr && (
                <div className="pt-2 border-t border-[#fed7aa] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <img
                      src="/wechat-qr.png"
                      alt="主理人微信"
                      className="w-20 h-20 rounded-xl border border-[#e6dfd8] bg-white p-0.5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/wechat-qr.jpg';
                      }}
                    />
                    <div className="space-y-1 text-left">
                      <div className="font-bold text-stone-900 text-xs">主理人微信人工发卡 / 答疑</div>
                      <div className="text-[11px] text-stone-500 font-mono">微信号: {contactWeChat}</div>
                      <button
                        type="button"
                        onClick={handleCopyContact}
                        className="text-[11px] text-[#c2410c] font-bold hover:underline flex items-center gap-1 cursor-pointer"
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
                  <div className="text-[11px] text-stone-500 text-right">
                    💡 购买后系统自动发送 16 位卡密，填入上方即可秒级生成。
                  </div>
                </div>
              )}
            </div>

            {/* Compliance Disclaimer */}
            <div className="pt-2 border-t border-[#e6dfd8] text-[10px] font-mono text-stone-400 leading-relaxed text-center">
              【法律免责声明】VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
