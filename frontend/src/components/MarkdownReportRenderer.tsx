import React, { useMemo } from 'react';
import { marked } from 'marked';
import { Sparkles, ShieldCheck, FileCheck, Lock, Award } from 'lucide-react';

interface MarkdownReportRendererProps {
  content: string;
  isStreaming?: boolean;
  profileSnapshot?: any;
  title?: string;
  token?: string;
  createdAt?: string;
}

export const MarkdownReportRenderer: React.FC<MarkdownReportRendererProps> = ({
  content,
  isStreaming,
  profileSnapshot,
  title = '2026 全球技术移民与永居确定性深度量化推演与避坑研报',
  token = 'VR2026-VIP-REPORT',
  createdAt,
}) => {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    try {
      marked.setOptions({
        gfm: true,
        breaks: true,
      });

      const parsed = marked.parse(content) as string;
      // Enhance headings and tables with avoid-break classes for print & PDF
      return parsed
        .replace(/<h2>/g, '<h2 class="report-section-h2 avoid-break">')
        .replace(/<table>/g, '<div class="avoid-break overflow-x-auto my-4"><table class="avoid-break">')
        .replace(/<\/table>/g, '</table></div>');
    } catch {
      return content;
    }
  }, [content]);

  const dateFormatted = useMemo(() => {
    if (createdAt) {
      return createdAt.substring(0, 10);
    }
    return new Date().toISOString().substring(0, 10);
  }, [createdAt]);

  const profile = profileSnapshot || {};
  const age = profile.age || '28';
  const major = profile.fieldCategory || profile.major || 'CS / 软件与分布式系统';
  const degree = profile.educationLevel || profile.education || '硕士研究生';
  const english = profile.englishLevel || profile.language_score || 'PTE 79+ (等效雅思 8.0)';
  const budget = profile.targetBudget || profile.budget || '30 - 50 万人民币';
  const workExp = profile.workExperienceYears ? `${profile.workExperienceYears} 年全职` : '3 年全职开发';

  return (
    <div className="report-markdown-canvas text-stone-800 leading-relaxed font-sans select-text">
      {/* ========================================================================= */}
      {/* 1. INDEPENDENT PUBLICATION-GRADE COVER PAGE (A4 FIRST PAGE)               */}
      {/* ========================================================================= */}
      <div className="report-cover-page bg-white p-6 sm:p-10 rounded-2xl border-2 border-stone-900 shadow-sm mb-10 flex flex-col justify-between min-h-[580px] sm:min-h-[720px]">
        {/* Cover Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-stone-900 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-serif font-black text-sm">
                VR
              </div>
              <div>
                <div className="font-serif font-bold text-stone-900 text-sm tracking-wide">
                  VisaRank Analytics
                </div>
                <div className="text-[10px] font-mono text-stone-500 uppercase">
                  Global Immigration & Labor Economics Lab
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 border border-stone-300 text-[10px] font-mono font-bold text-stone-700">
              <Lock className="w-3 h-3 text-[#c2410c]" />
              <span>STRICTLY CONFIDENTIAL // 绝密精算版</span>
            </div>
          </div>

          {/* Series Badge */}
          <div className="pt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c2410c]/10 text-[#c2410c] text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              2026 全球 14 国移民法案量化推演专题报告 · 10+ 页完整版
            </span>
          </div>

          {/* Main Cover Title */}
          <div className="space-y-2 pt-2">
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-stone-900 leading-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed max-w-2xl">
              拒绝传统中介信息差与虚假承诺。基于 14 国官方立法库、ANZSCO/NOC 职业评估准则及 2026 劳动力市场真实薪资中位数联合精算推演。
            </p>
          </div>
        </div>

        {/* User Profile Metadata Matrix Card */}
        <div className="my-6 p-4 sm:p-5 rounded-xl bg-[#faf9f5] border border-stone-300 space-y-3">
          <div className="text-xs font-bold font-mono text-stone-900 uppercase flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#c2410c]" />
              <span>推演对象量化画像档案 (Profile Snapshot)</span>
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold flex items-center gap-1">
              <Award className="w-3 h-3 text-emerald-600" />
              置信度 99.2% (Tier 1 算力)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <div className="text-[10px] font-mono text-stone-400">档案编号 / 激活码</div>
              <div className="font-mono font-bold text-stone-900">{token}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-stone-400">年龄 / 阶段</div>
              <div className="font-bold text-stone-900">{age} 周岁 (黄金窗口期)</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-stone-400">专业领域</div>
              <div className="font-bold text-stone-900">{major}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-stone-400">最高学历</div>
              <div className="font-bold text-stone-900">{degree}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-stone-400">语言基线</div>
              <div className="font-bold text-stone-900">{english}</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-stone-400">启动预算 / 工龄</div>
              <div className="font-bold text-stone-900">{budget} · {workExp}</div>
            </div>
          </div>
        </div>

        {/* Cover Footer */}
        <div className="border-t border-stone-300 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>报告生成日期：{dateFormatted} · VisaRank Quantitative Engine v2.6</span>
          </div>
          <div>
            <span>版权所有 © 2026 VisaRank Analytics · 仅限个人决策使用</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BODY CONTENT (RENDERED HIGH-DENSITY MARKDOWN)                          */}
      {/* ========================================================================= */}
      <div
        className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:text-stone-900 prose-h1:border-b prose-h1:border-[#e6dfd8] prose-h1:pb-3 prose-h2:text-base sm:prose-h2:text-lg prose-h2:text-stone-900 prose-h2:mt-6 prose-h2:mb-3 prose-p:text-xs sm:prose-p:text-[13px] prose-p:leading-relaxed prose-table:my-4 prose-table:text-xs prose-th:bg-[#efe9de] prose-th:text-stone-900 prose-th:font-bold prose-th:p-2.5 prose-td:p-2.5 prose-td:border-b prose-td:border-[#e6dfd8] prose-tr:even:bg-[#faf9f5] prose-strong:text-stone-900 prose-li:text-xs sm:prose-li:text-[13px] prose-blockquote:border-l-4 prose-blockquote:border-[#c2410c] prose-blockquote:bg-[#fff7ed] prose-blockquote:p-3 prose-blockquote:rounded-r-xl prose-blockquote:text-xs prose-blockquote:text-stone-700 prose-blockquote:my-3 prose-code:text-[#c2410c] prose-code:font-mono prose-code:bg-[#efe9de] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[11px]"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Streaming Blinking Cursor Indicator */}
      {isStreaming && (
        <div className="inline-flex items-center gap-1.5 text-xs text-[#c2410c] font-mono mt-2 animate-pulse">
          <span className="w-2 h-4 bg-[#c2410c] inline-block" />
          <span>DeepSeek 正在流式精算推演中...</span>
        </div>
      )}
    </div>
  );
};
