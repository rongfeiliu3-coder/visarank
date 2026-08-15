import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Send,
  Scale,
  Award,
} from 'lucide-react';

interface LegalConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCountryName: string;
  targetCountryFlag: string;
  profileSummary: string;
}

export const LegalConsultModal: React.FC<LegalConsultModalProps> = ({
  isOpen,
  onClose,
  targetCountryName,
  targetCountryFlag,
  profileSummary,
}) => {
  const [contactName, setContactName] = useState('');
  const [contactWay, setContactWay] = useState('');
  const [preferredTime, setPreferredTime] = useState('今晚 20:00 - 21:00 (北京时间)');
  const [consultationFocus, setConsultationFocus] = useState('法案资格预审与雇主聘书条款合规性');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative w-full max-w-xl bg-[#faf9f5] rounded-3xl shadow-2xl border border-[#e6dfd8] overflow-hidden z-10 my-8"
      >
        {/* Header Ribbon */}
        <div className="bg-[#181715] text-[#faf9f5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{targetCountryFlag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-white">
                  【{targetCountryName}】15 分钟持牌法务合规连线预审
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10b981] text-white font-bold">
                  B2B 高客单通道
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                官方持牌资质 (LIA / MARA / 德国执业律师) · 100% 客观合规
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 select-text">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* License Badges */}
              <div className="p-3.5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#c2410c]" />
                  <span className="font-bold text-stone-900">持牌顾问资历认证：</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-stone-600">
                  <span className="px-1.5 py-0.5 rounded bg-[#faf9f5] border border-[#e6dfd8] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#10b981]" />
                    新西兰 LIA
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#faf9f5] border border-[#e6dfd8] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#10b981]" />
                    澳洲 MARA
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#faf9f5] border border-[#e6dfd8] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#10b981]" />
                    德国律所
                  </span>
                </div>
              </div>

              {/* Profile Snapshot Notice */}
              <div className="p-3 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-800">已自动绑定您的测算画像：</span>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">{profileSummary}</p>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 font-mono">您的姓名 / 称谓</label>
                  <input
                    type="text"
                    required
                    placeholder="如: 张先生 / Dr. Li"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 focus:outline-none focus:border-[#c2410c]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 font-mono">联系微信 / 手机 / 邮箱</label>
                  <input
                    type="text"
                    required
                    placeholder="微信号或电话号码..."
                    value={contactWay}
                    onChange={(e) => setContactWay(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 focus:outline-none focus:border-[#c2410c]"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-stone-700 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#c2410c]" />
                  <span>期望连线时段 (15分钟视频/语音预审)</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 focus:outline-none focus:border-[#c2410c]"
                >
                  <option value="今晚 20:00 - 21:00 (北京时间)">今晚 20:00 - 21:00 (北京时间)</option>
                  <option value="明天上午 10:00 - 11:30 (北京时间)">明天上午 10:00 - 11:30 (北京时间)</option>
                  <option value="明天下午 14:30 - 16:00 (北京时间)">明天下午 14:30 - 16:00 (北京时间)</option>
                  <option value="本周末任意时段 (优先协调)">本周末任意时段 (优先协调)</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-stone-700 font-mono">核心咨询关注点</label>
                <textarea
                  rows={2}
                  value={consultationFocus}
                  onChange={(e) => setConsultationFocus(e.target.value)}
                  placeholder="输入您最关心的卡点问题..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#faf9f5] border border-[#e6dfd8] text-xs text-stone-800 focus:outline-none focus:border-[#c2410c] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-[#181715] hover:bg-[#c2410c] active:bg-[#9a3412] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-card-hover transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>正在提交预约登记...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>确认预约 15 分钟持牌法务预审 (免费资格筛查)</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Confirmation View */
            <div className="p-6 rounded-2xl bg-[#eaf6ed] border border-[#c5e8ce] text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-white text-[#2e7d32] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  预审登记已成功受理！
                </h4>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto leading-relaxed">
                  持牌法务顾问助理将在 2 小时内通过微信/邮箱与您确认连线会议室链接（时段：{preferredTime}），请留意通讯通知。
                </p>
              </div>

              <div className="pt-3 border-t border-[#c5e8ce]">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-[#181715] text-white text-xs font-semibold hover:bg-stone-800"
                >
                  完成并返回看板
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
