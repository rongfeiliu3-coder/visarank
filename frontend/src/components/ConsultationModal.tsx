import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  Award,
  Scale,
  Calendar,
  GraduationCap,
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Main Dialog Container */}
      <div className="relative bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-7 space-y-5 overflow-hidden z-10 animate-scale-up my-auto">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c2410c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#0284c7]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-2 rounded-2xl hover:bg-[#efe9de] transition-colors cursor-pointer"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Area */}
        <div className="space-y-1.5 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c2410c]/10 border border-[#c2410c]/25 text-[#c2410c] text-[11px] font-mono font-bold">
              <Award className="w-3 h-3" />
              名校硕博团队 · 独立出海规划
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-[10px] font-mono font-bold">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              1v1 方案定制
            </span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
            {visaContextName ? `【${visaContextName}】1v1 方案咨询与法案排雷` : '主理人 1v1 出海方案咨询与文书精修'}
          </h2>
          <p className="text-xs text-stone-500 font-sans">
            拒绝流水线套版 · 结合官方立法规则与海外课业/就业真实门槛倒推路径
          </p>
        </div>

        {/* Compact Dual-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
          {/* Left Column: 3 Minimalist Service Cards (7 cols) */}
          <div className="sm:col-span-7 space-y-2.5 flex flex-col justify-between">
            {/* Card 1: 15分钟法案初审 */}
            <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
              <div className="w-7 h-7 rounded-xl bg-[#c2410c]/10 text-[#c2410c] flex items-center justify-center shrink-0 mt-0.5">
                <Scale className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1 text-xs">
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>15分钟法案初审</span>
                  <span className="text-[10px] font-mono text-[#c2410c] bg-[#efe9de] px-1.5 py-0.2 rounded font-bold">排雷</span>
                </div>
                <div className="text-[11px] text-stone-500 leading-snug">
                  官方移民局立法规则合规判定，精准排查职业代码 (ANZSCO/NOC) 与红线卡点。
                </div>
              </div>
            </div>

            {/* Card 2: 3年全景落地推演 */}
            <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
              <div className="w-7 h-7 rounded-xl bg-sky-500/10 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1 text-xs">
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>3年全景落地推演</span>
                  <span className="text-[10px] font-mono text-sky-800 bg-sky-50 px-1.5 py-0.2 rounded font-bold">时间线</span>
                </div>
                <div className="text-[11px] text-stone-500 leading-snug">
                  选校/选国、找工实习、时薪中位数达标与永居申报节点图，锁定高 ROI 留存路径。
                </div>
              </div>
            </div>

            {/* Card 3: 名校导师学术辅导与文书精修 */}
            <div className="p-3 rounded-2xl bg-white border border-[#e6dfd8] flex items-start gap-2.5 shadow-2xs hover:border-[#c2410c]/40 transition-all">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1 text-xs">
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>导师学术辅导与文书精修</span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">硕博团队</span>
                </div>
                <div className="text-[11px] text-stone-500 leading-snug">
                  海外名校硕博 1v1 课业答疑、代码架构解析与英文文书 (SOP/CV) 深度重构。
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Fast Contact (5 cols) */}
          <div className="sm:col-span-5 p-4 rounded-2xl bg-white border border-[#e6dfd8] shadow-card-soft text-center flex flex-col items-center justify-between space-y-3">
            <div className="space-y-0.5">
              <div className="text-xs font-mono font-bold text-[#c2410c] flex items-center justify-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>微信扫码直连</span>
              </div>
              <div className="text-[10px] text-stone-400 font-mono">
                顾问在线 (9:00 - 23:00)
              </div>
            </div>

            {/* QR Code Container */}
            <div className="p-1 rounded-2xl border border-[#e6dfd8] bg-white shadow-2xs">
              <img
                src="/wechat-qr.png"
                alt="主理人微信二维码"
                className="w-32 h-32 rounded-xl object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/wechat-qr.jpg';
                }}
              />
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyPhone}
              className={`w-full py-2 px-2.5 rounded-xl border text-[11px] font-mono font-bold flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-[#efe9de] hover:bg-[#c2410c] text-stone-800 hover:text-white border-[#e6dfd8] hover:border-[#c2410c]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>已复制: {contactPhone}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制微信号: {contactPhone}</span>
                </>
              )}
            </button>

            {/* Quota Badge */}
            <div className="text-[10px] font-mono text-[#c2410c] bg-[#fff7ed] px-2 py-0.5 rounded-full border border-[#fed7aa]">
              ⚡ 今日深度评估限额 3 名
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="pt-2.5 border-t border-[#e6dfd8] flex items-center justify-between text-[10px] font-mono text-stone-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-stone-400" />
            <span>提供选校规划与学术文书精修，不涉及管制类代办。</span>
          </div>
          <span>VisaRank Advisory Studio</span>
        </div>
      </div>
    </div>
  );
};
