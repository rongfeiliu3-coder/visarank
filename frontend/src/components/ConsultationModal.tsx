import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Award,
  Compass,
  FileEdit,
  GraduationCap,
  Briefcase,
  Clock,
  HeartHandshake,
  Gift,
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  visaContextName?: string;
  isReportPromo?: boolean;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  visaContextName,
  isReportPromo = false,
}) => {
  const [copied, setCopied] = useState(false);
  const contactPhone = '16621698016';

  if (!isOpen) return null;

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(contactPhone);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = contactPhone;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Main Dialog Container */}
      <div className="relative bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 space-y-5 overflow-hidden z-10 animate-scale-up my-auto">
        {/* Subtle Decorative Ambient Blurs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#c2410c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#0284c7]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-2xl hover:bg-[#efe9de] transition-colors cursor-pointer"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Report Promo Banner (if triggered from Unlock Report button) */}
        {isReportPromo && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#c2410c]/15 to-emerald-500/15 border border-[#c2410c]/30 flex items-center justify-between gap-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[#c2410c] text-white">
                <Gift className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-[#9a3412] font-serif">
                🎁 早鸟特惠：添加微信发送测算画像，限时免费获取 3 年时间线定制 PDF
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#c2410c] bg-white px-2 py-0.5 rounded-full border border-[#c2410c]/30 shrink-0 hidden sm:inline">
              原价 $9.9 · 今日限免
            </span>
          </div>
        )}

        {/* Header Badge & Title */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c2410c]/10 border border-[#c2410c]/25 text-[#c2410c] text-xs font-mono font-bold tracking-wide">
              <Award className="w-3.5 h-3.5" />
              名校理工科硕博团队 · 独立出海规划师
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-[11px] font-mono font-bold">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              1v1 深度方案定制
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
            主理人 1v1 方案咨询、文书精修与学术支持
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            {visaContextName ? (
              <>
                针对 <strong className="text-stone-900 font-serif font-bold">【{visaContextName}】</strong> 进行专项资格诊断、高命中英文文书定制与海外学业保驾护航：
              </>
            ) : (
              '拒绝传统中介流水线套版 · 懂真实技术架构与海外大学课业考核 · 击穿出海信息不对称'
            )}
          </p>
        </div>

        {/* Founder Backstory & Mission Banner (打破信息差与初心) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#efe9de]/80 border border-[#e6dfd8] space-y-2.5 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#c2410c] text-white">
              <HeartHandshake className="w-4 h-4" />
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-serif">
              主理人初心：打破信息壁垒，拒绝盲目留学的无谓消耗
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-stone-700 leading-relaxed text-justify">
            每年我们看到太多普通中产家庭耗费百万积蓄，在完全没有规划好留存路径与就业法案的情况下，盲目把孩子送出国。毕业后由于缺乏本地实习经验与对口资质，最终只能遗憾裸归。
            我们团队由<strong>海外名校理工科硕博</strong>与独立出海规划师联合创立，坚持<strong>“以终局留存与高 ROI 就业”</strong>为导向倒推选校。我们提供硬核文书精修、逆向选国以及专业课学术重难点答疑与代码架构辅导——
            <strong className="text-[#c2410c] font-semibold">
              助力学员以最高效率攻克课业考核难关，腾出极其宝贵的时间与精力去当地核心企业实习、找认证雇主积累实操经验、备考职业执照，全速跑赢移民时钟！
            </strong>
          </p>
        </div>

        {/* Main Content Grid: 4 Core Services (Left) & WeChat QR Card (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-1">
          {/* Left Column: 4 Strategic Service Cards (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#c2410c]" />
              <span>主理人深度服务板块</span>
            </div>

            <div className="space-y-2.5">
              {/* 1. 文书精修 */}
              <div className="p-3 rounded-2xl bg-[#ffffff]/80 border border-[#e6dfd8] flex items-start gap-2.5 hover:border-[#c2410c]/40 transition-all shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-[#c2410c]/10 text-[#c2410c] flex items-center justify-center shrink-0 mt-0.5">
                  <FileEdit className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 text-xs text-stone-800 flex-1">
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>理工科 / IT / 商科高命中英文文书精修 (SOP/PS/CV/RL)</span>
                    <span className="text-[10px] font-mono text-[#c2410c] bg-[#efe9de] px-1.5 py-0.5 rounded-md">名校团队</span>
                  </div>
                  <div className="text-[11px] text-stone-600 leading-snug">
                    理工科硕博亲自操刀，逐句重构技术架构、科研背景与算法逻辑，精准匹配海外招生官与目标国紧缺加分项。
                  </div>
                </div>
              </div>

              {/* 2. 课业答疑辅导 */}
              <div className="p-3 rounded-2xl bg-[#ffffff]/80 border border-[#e6dfd8] flex items-start gap-2.5 hover:border-[#c2410c]/40 transition-all shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 text-xs text-stone-800 flex-1">
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>海外大学理工科/商科课业答疑辅导与代码架构解析 (Mentorship & Code Review)</span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md">学术保驾</span>
                  </div>
                  <div className="text-[11px] text-stone-600 leading-snug">
                    计算机编程、算法调试、数据分析、专业课大作业重难点答疑与论文规范性 Proofreading 语言润色，全面提升学术能力。
                  </div>
                </div>
              </div>

              {/* 3. 高效时间管理与实习积累 */}
              <div className="p-3 rounded-2xl bg-[#f5f1eb] border border-[#d6cfc5] flex items-start gap-2.5 shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 text-xs text-stone-800 flex-1">
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>高效精力释放：全力冲刺核心实习、打工积累与工签人脉拓展</span>
                    <span className="text-[10px] font-mono text-amber-900 bg-amber-100/70 px-1.5 py-0.5 rounded-md">战略提速</span>
                  </div>
                  <div className="text-[11px] text-stone-600 leading-snug">
                    高效搞定专业课考点，把黄金精力用在当地找工面试、认证雇主实习、积累行业人脉与准备永居纳税资质上。
                  </div>
                </div>
              </div>

              {/* 4. 选校与职业代码诊断 */}
              <div className="p-3 rounded-2xl bg-[#ffffff]/80 border border-[#e6dfd8] flex items-start gap-2.5 hover:border-[#c2410c]/40 transition-all shadow-2xs">
                <div className="w-6 h-6 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5 text-xs text-stone-800 flex-1">
                  <div className="font-bold text-stone-900 flex items-center justify-between">
                    <span>目标国职业代码 (ANZSCO/NOC/SOC) 匹配与 14 国选校定位</span>
                    <span className="text-[10px] font-mono text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded-md">精准选校</span>
                  </div>
                  <div className="text-[11px] text-stone-600 leading-snug">
                    排查学历对口性与职评机构卡点，兼顾毕业工签时长 (PSW) 与欧陆免学费高性价比通道。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: WeChat QR Code Card (2 Cols) */}
          <div className="md:col-span-2 flex flex-col items-center justify-between p-5 rounded-3xl bg-[#ffffff] border border-[#e6dfd8] shadow-card-soft text-center space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-[#c2410c] flex items-center justify-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>微信扫码 · 极速直连主理人</span>
              </div>
              <div className="text-[11px] text-stone-500">
                名校硕博团队亲自对接与评估
              </div>
            </div>

            {/* QR Code Image */}
            <div className="relative group">
              <img
                src="/wechat-qr.png"
                alt="主理人微信二维码"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl border-2 border-[#e6dfd8] group-hover:border-[#c2410c]/50 transition-all duration-300 shadow-md object-contain bg-white p-1.5"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/wechat-qr.jpg';
                }}
              />
            </div>

            {/* One-Click Copy Phone Number */}
            <button
              onClick={handleCopyPhone}
              className={`w-full py-2.5 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[#efe9de] hover:bg-[#c2410c] text-stone-800 hover:text-white border-[#e6dfd8] hover:border-[#c2410c]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已复制手机号: {contactPhone}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>点击复制手机号: {contactPhone}</span>
                </>
              )}
            </button>

            {/* Daily Quota Notice */}
            <div className="text-[10px] font-mono text-stone-500 bg-[#faf9f5] px-2.5 py-1 rounded-full border border-[#e6dfd8] leading-tight">
              ⚡ 每日仅限 3 位深度评估（文书精修 / 课业答疑 / 14国路径诊断）
            </div>
          </div>
        </div>

        {/* Footer Compliance Disclaimer */}
        <div className="pt-3 border-t border-[#e6dfd8] flex items-center justify-between text-[10px] font-mono text-stone-400 flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
            <span>合规声明：提供选校规划、学术文书精修与海外课业答疑辅导，不涉及管制类移民法律代办。</span>
          </div>
          <span>VisaRank Advisory Studio · 2026</span>
        </div>
      </div>
    </div>
  );
};
