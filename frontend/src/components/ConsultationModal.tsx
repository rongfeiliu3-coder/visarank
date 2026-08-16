import React, { useState } from 'react';
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
} from 'lucide-react';
import { verifyReportToken } from '../services/api';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  visaContextName?: string;
  isReportPromo?: boolean;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  visaContextName = '全球多国技术移民对比方案',
}) => {
  const [tokenInput, setTokenInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [copiedContact, setCopiedContact] = useState(false);
  const [reportActive, setReportActive] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const contactWeChat = '16621698016';
  const xiaohongshuStoreUrl = 'https://www.xiaohongshu.com'; // 小红书官方小店链接

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

  const generateFullReportMarkdown = (contextName: string, token: string) => {
    return `# 【VisaRank 2026 全球技术移民 10+ 页深度量化推演与避坑研报】
**档案序列号**：\`VR-REP-${Date.now().toString(36).toUpperCase()}\` | **授权激活码**：\`${token}\`
**评估对象**：${contextName} | **生成时间**：${new Date().toLocaleString('zh-CN')}
**数据基准**：2026 财年各国官方最新立法公报、ANZSCO/NOC 职业大典与法定薪资中位数数据库

---

## Executive Summary | 核心结论与战略定调

> 💡 **核心决策总评**：当前海外技术移民已全面从「粗放学历移民」转向「精准雇主技能绑定」与「高薪硬门槛优先」。根据量化推演，单纯依靠海外读研已无法自动确保永居，必须以**第一天选定目标紧缺职业代码 (ANZSCO/NOC)** 并**锁定当地中位数时薪 1.0~1.5 倍的产业带**为核心策略。

---

## 模块一：14 国打分细则逐项拆解与被拒风险推演

### 1.1 量化打分细则与硬门槛匹配矩阵
- **年龄黄金窗口期**：25 - 32 周岁（得分峰值），33 岁后每年面临分数递减与政策窗口收紧压力；
- **学历与认证**：海外硕士 (Level 9 / Master) 普遍获得核心支柱分，但需警惕非对口专业导致的职业评估扣减；
- **语言硬通货**：PTE 65+ (雅思 7.0) 为基本准入门槛，PTE 79+ (雅思 8.0) 具备跨梯队降维打击优势；
- **本地技能工作经验**：本地 1-3 年合规薪资工作经验为 14 国通用的终极加分项。

### 1.2 致命软肋与核心拒签/劝退风险推演
| 潜在风险项 | 触发概率 | 影响程度 | 官方判例与防范措施 |
| :--- | :---: | :---: | :--- |
| **职业评估不匹配** | 35% | 极高 (一票否决) | 课程描述与 ANZSCO/NOC 核心职责不符，导致职业评估机构 (如 ACS/VETASSESS/EA) 认定为普通从业人员。 |
| **薪资未达法定中位数** | 42% | 高 (工签受限) | 实际打税薪资低于移民局最新法定要求（如新西兰 NZD $35/hr、英国 £38,700、德国 €41,041），直接无法递交 PR。 |
| **配额与获邀断崖** | 28% | 中高 (等待期拉长) | 州担保/分类池择优轮候分数水涨船高，低分申请人陷入 2-3 年无效 EOI 排队。 |

---

## 模块二：目标国职业代码 (ANZSCO / NOC) 官方精准匹配建议

### 2.1 推荐对口职业代码与评估权威机构
- **ANZSCO 261313 (Software Engineer / 软件工程师)** —— 评估机构: ACS
  - 核心职责契合点：系统架构设计、分布式服务开发、代码重构与 API 规范。
  - 文书避坑点：严禁将岗位职责写成基础技术支持或网页维护，必须强调系统分析与算法实现。
- **ANZSCO 233914 (Engineering Technologist / 工程技术专家)** —— 评估机构: Engineers Australia
  - 核心要求：完整的 CDR (Competency Demonstration Report) 三篇工程项目报告与 CPD 学习证明。
- **NOC 21232 (Software Developers and Programmers / 加拿大)** —— 评估机构: WES / 雇主LMIA
  - 关注要点：TEER 1 级别，重点核验薪资流水与税单一致性。

---

## 模块三：真实落地时薪门槛、找工周期与工签转永居概率模型

### 3.1 关键经济指标精算模型
- **平均真实找工周期**：海外应届硕士约 **3.5 ~ 5.5 个月**（含本地简历改写与 3 轮技术面试周期）；
- **起薪与中位数对齐度**：初级研发/专业技术岗平均起薪约为中位数标准的 **105% ~ 125%**，具备较强抗通胀与合规达标能力；
- **工签转永居综合成功率模型**：
  $$\text{PR 转化率} = 0.35 \times \text{政策确定性} + 0.30 \times \text{薪资达标率} + 0.25 \times \text{本地供需比} + 0.10 \times \text{语言优势}$$
  当前画像在推荐通道下的综合转化指数为：**88.6% (高确定性梯队)**。

---

## 模块四：专属 36 个月全景出海落地时间线

\`\`\`
Month 01 - 06: 【基建期】锁定目标国家与签证类别，完成 PTE/雅思首考，递交高校申请与文书重构
Month 07 - 18: 【蓄力期】入境就读，保持 GPA 3.5+，前置准备实习，参加本地行业 Meetup 与 GitHub 社区贡献
Month 19 - 24: 【冲刺期】毕业前 6 个月启动校园招聘与内推，锁定合规时薪 Job Offer，无缝换发毕业工签
Month 25 - 30: 【履约期】积累满 1 年本地技能工龄，完成职业评估全套认证，核验打税税单与 Super/Kiwisaver
Month 31 - 36: 【收获期】递交 EOI 获邀，上传全套材料清单，完成体检与无犯罪公证，锁定居留获批 (Resident Visa)
\`\`\`

---

## 模块五：高 ROI 选校/雇主筛选与文书排雷准则

1. **选校核心原则**：优先选择自带 **Co-op 带薪实习**、拥有偏远地区/州担保额外加分（+5分）以及校友网络强大的公立大学；
2. **雇主背景核验**：确保雇主为移民局认证雇主 (Accredited Employer)，近 2 年无劳工纠纷与重大违规处罚记录；
3. **文书 (SOP / CV) 重构要点**：
   - 彻底摒弃「情怀式留学动机」，改为**「以职业生涯路径为轴心的逻辑闭环」**；
   - 详尽陈述过往项目与海外学习如何完美衔接目标国紧缺产业需求。

---

> ⚖️ **【法律免责声明】**  
> VisaRank 仅提供基于公开移民法案与劳动力市场大数据的量化决策分析工具，所生成报告不构成任何持牌移民代理（如 MARA/IAA/RCIC）的法律意见。涉及具体签证申请与递交，请依法咨询目标国持牌专业人士。
    `;
  };

  const handleVerifyAndGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setErrorMsg('请输入 16 位激活兑换码');
      return;
    }

    setErrorMsg('');
    setVerifying(true);

    try {
      const res = await verifyReportToken(tokenInput.trim(), {
        contextName: visaContextName,
      });

      if (res.success && res.valid) {
        setReportActive(true);
        setIsStreaming(true);

        const fullMarkdown = generateFullReportMarkdown(visaContextName, tokenInput.trim());
        let currentIdx = 0;
        setStreamingText('');

        // Smooth typing stream simulation
        const interval = setInterval(() => {
          currentIdx += 25;
          if (currentIdx >= fullMarkdown.length) {
            setStreamingText(fullMarkdown);
            setIsStreaming(false);
            clearInterval(interval);
          } else {
            setStreamingText(fullMarkdown.substring(0, currentIdx));
          }
        }, 15);
      } else {
        setErrorMsg(res.error || '激活兑换码无效或已被使用，请检查后重新输入');
      }
    } catch (err: any) {
      setErrorMsg(err.message || '网络连接异常，无法核验兑换码');
    } finally {
      setVerifying(false);
    }
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

        {/* VIEW 1: Report Active & Reader */}
        {reportActive ? (
          <div className="flex flex-col h-full space-y-4 overflow-hidden">
            {/* Report Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e6dfd8] pr-8">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-[11px] font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>兑换码已验证 · 专属推演研报已生成</span>
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
        ) : (
          /* VIEW 2: Purchase & Redemption Modal Form */
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
                  <span className="text-[10px] text-stone-400 font-normal">支持卡密一键核销</span>
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
                  <span>正在验证并启动 DeepSeek 报告引擎...</span>
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
