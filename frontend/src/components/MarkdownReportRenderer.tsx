import React, { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownReportRendererProps {
  content: string;
  isStreaming?: boolean;
}

export const MarkdownReportRenderer: React.FC<MarkdownReportRendererProps> = ({
  content,
  isStreaming,
}) => {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    try {
      // Configure marked options
      marked.setOptions({
        gfm: true,
        breaks: true,
      });
      return marked.parse(content) as string;
    } catch {
      return content;
    }
  }, [content]);

  return (
    <div className="report-markdown-canvas text-stone-800 leading-relaxed font-sans select-text">
      {/* Rendered HTML with High-Density Styling */}
      <div
        className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:font-bold prose-h1:text-xl sm:prose-h1:text-2xl prose-h1:text-stone-900 prose-h1:border-b prose-h1:border-[#e6dfd8] prose-h1:pb-3 prose-h2:text-base sm:prose-h2:text-lg prose-h2:text-[#c2410c] prose-h2:mt-6 prose-h2:mb-3 prose-p:text-xs sm:prose-p:text-[13px] prose-p:leading-relaxed prose-table:my-4 prose-table:text-xs prose-th:bg-[#efe9de] prose-th:text-stone-900 prose-th:font-bold prose-th:p-2.5 prose-td:p-2.5 prose-td:border-b prose-td:border-[#e6dfd8] prose-tr:even:bg-[#faf9f5] prose-strong:text-stone-900 prose-li:text-xs sm:prose-li:text-[13px] prose-blockquote:border-l-4 prose-blockquote:border-[#c2410c] prose-blockquote:bg-[#fff7ed] prose-blockquote:p-3 prose-blockquote:rounded-r-xl prose-blockquote:text-xs prose-blockquote:text-stone-700 prose-blockquote:my-3 prose-code:text-[#c2410c] prose-code:font-mono prose-code:bg-[#efe9de] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[11px]"
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
