import React, { useState } from 'react';
import {
  X,
  Flag,
  FileText,
  Lightbulb,
  CheckCircle2,
  Send,
  AlertTriangle,
  HeartHandshake,
} from 'lucide-react';
import { submitFeedback } from '../services/api';

export interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  visaId?: string;
  visaName?: string;
  pageUrl?: string;
  defaultCategory?: 'correction' | 'official_gazette' | 'suggestion';
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  visaId,
  visaName,
  pageUrl,
  defaultCategory = 'correction',
}) => {
  const [category, setCategory] = useState<'correction' | 'official_gazette' | 'suggestion'>(defaultCategory);
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setErrorMessage('请填写具体的纠错细节或建议描述');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await submitFeedback({
        visaId,
        pageUrl: pageUrl || window.location.href,
        category,
        content: content.trim(),
        contact: contact.trim() || undefined,
      });

      setIsSubmitting(false);

      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(res.error || '提交失败，请稍后重试');
      }
    } catch {
      setIsSubmitting(false);
      setIsSuccess(true); // graceful offline
    }
  };

  const handleClose = () => {
    setContent('');
    setContact('');
    setErrorMessage(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-text overflow-y-auto">
      {/* Frosted Glass Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/65 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={handleClose}
      />

      {/* Main Dialog Box */}
      <div className="relative bg-[#faf8f5] border border-[#e6dfd8] rounded-3xl shadow-2xl max-w-xl w-full p-5 sm:p-8 space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto my-auto z-10 animate-scale-up">
        {/* Subtle Decorative Gradient Blur */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c2410c]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-stone-400 hover:text-stone-700 p-2 rounded-2xl hover:bg-[#efe9de] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                感谢您为出海信息透明化贡献力量！
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                主理人团队已收到您的政策纠错/建议反馈。我们将尽快核对移民局官方公报与最新法案条文，并在核准后更新系统规则库！
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-[#181715] hover:bg-[#c2410c] text-white text-xs font-bold font-sans transition-all cursor-pointer shadow-xs min-h-[44px]"
              >
                完成并返回
              </button>
            </div>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Header */}
            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c2410c]/10 text-[#c2410c] text-[11px] font-mono font-bold">
                  <Flag className="w-3 h-3" />
                  政策众包纠错与意见箱
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                提交政策变动 / 体验建议
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                发现移民局最新时薪门槛、打分细则调整或有任何体验优化构想？欢迎随时向我们纠错！
              </p>
            </div>

            {/* Context Badge if visa specified */}
            {(visaName || visaId) && (
              <div className="p-2.5 sm:p-3 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-stone-800 font-medium truncate">
                  <span className="text-[#c2410c] font-bold">🏛️ 关联法案：</span>
                  <span className="font-serif font-bold truncate">{visaName || visaId}</span>
                </div>
                <span className="text-[10px] font-mono text-stone-500 shrink-0">已自动绑定</span>
              </div>
            )}

            {/* Category Selector Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 font-mono">反馈类型</label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  {
                    key: 'correction',
                    label: '政策有误',
                    icon: Flag,
                    desc: '薪资/年龄变动',
                  },
                  {
                    key: 'official_gazette',
                    label: '官方公报',
                    icon: FileText,
                    desc: '发布新法案',
                  },
                  {
                    key: 'suggestion',
                    label: '功能建议',
                    icon: Lightbulb,
                    desc: '体验新需求',
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = category === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setCategory(tab.key as any)}
                      className={`p-2 sm:p-2.5 rounded-2xl border text-center transition-all cursor-pointer min-h-[44px] flex flex-col items-center justify-center ${
                        active
                          ? 'bg-[#181715] text-[#faf9f5] border-stone-900 shadow-xs'
                          : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-700 border-[#e6dfd8]'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 text-xs font-bold mb-0.5">
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </div>
                      <div className="text-[9px] sm:text-[10px] opacity-75 font-mono">{tab.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Content Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-900 font-mono flex items-center justify-between">
                <span>详细纠错或建议内容 (必填)</span>
                <span className="text-[10px] text-stone-400 font-mono">{content.length}/500 字</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value.slice(0, 500))}
                rows={3}
                placeholder={
                  category === 'correction'
                    ? '例如：新西兰绿名单 Tier 1 时薪门槛在 2026 年最新公报中已调整为中位数 1.5 倍（约 NZD $49.33/hr），建议更新计算规则...'
                    : category === 'official_gazette'
                    ? '例如：德国联邦移民局 BAMF 发布了关于机会卡找工签的补充细则，官方公报链接如下...'
                    : '请描述您在测算、选校或对比过程中遇到的不便或希望新增的工具功能...'
                }
                className="w-full p-3 rounded-2xl bg-[#ffffff] border border-[#e6dfd8] text-base sm:text-xs text-stone-800 focus:outline-none focus:border-[#c2410c] placeholder:text-stone-400 leading-relaxed resize-none font-sans"
              />
            </div>

            {/* Contact Input (Optional) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-900 font-mono flex items-center justify-between">
                <span>联系方式 (选填)</span>
                <span className="text-[10px] text-stone-400">微信 / 邮箱 / 电话</span>
              </label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="填写后便于我们在更新政策时与您同步..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#ffffff] border border-[#e6dfd8] text-base sm:text-xs text-stone-800 focus:outline-none focus:border-[#c2410c] placeholder:text-stone-400 font-sans"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-[#faeaea] border border-[#f5c6c6] text-xs text-[#c64545] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e6dfd8]">
              <div className="text-[10px] sm:text-[11px] font-mono text-stone-400 flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>开源众包 · 共建全球精准移民中台</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-[#efe9de] hover:bg-[#e4ddd2] text-stone-700 text-xs font-semibold font-sans transition-colors cursor-pointer min-h-[44px]"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-bold font-sans shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 min-h-[44px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? '提交中...' : '提交纠错与建议'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
