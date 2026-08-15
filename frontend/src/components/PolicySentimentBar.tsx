import React from 'react';
import { Activity } from 'lucide-react';

export const PolicySentimentBar: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto select-none">
      <div className="rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] p-4 sm:p-5 shadow-card-soft space-y-3">
        {/* Header & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#efe9de] flex items-center justify-center text-[#c2410c]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-stone-900">
                  2026 全球移民政策情绪指数 (Policy Sentiment Index)
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#faeaea] text-[#c64545] border border-[#f5c6c6]">
                  🔴 结构性紧缩与极度分化
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>法案库每日同步中 · 核验至 2026-08</span>
          </div>
        </div>

        {/* Metric Bar Progress Track */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-500">全球政策门槛阻力值</span>
            <span className="font-bold text-stone-900">
              <span className="text-[#c2410c] text-sm">74</span> / 100 (高阻力高分化)
            </span>
          </div>

          <div className="relative h-2.5 w-full rounded-full bg-[#efe9de] overflow-hidden">
            {/* Gradient fill */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#10b981] via-[#d4a017] to-[#c2410c] transition-all duration-1000"
              style={{ width: '74%' }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-mono text-stone-400">
            <span>0 极度宽松 (历史极低)</span>
            <span>50 均衡博弈</span>
            <span>100 极度紧闭 (断崖关停)</span>
          </div>
        </div>

        {/* Editorial Brief & Takeaway */}
        <div className="pt-2 border-t border-[#e6dfd8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
          <p className="leading-relaxed">
            <span className="font-semibold text-stone-800">权威简评：</span>
            “传统四大国全面收紧文商配额与工签年限，欧陆免学费蓝卡与新西兰/爱尔兰紧缺绿色清单迎来黄金窗口期。”
          </p>

          <span className="text-[11px] font-mono text-stone-400 whitespace-nowrap">
            算法权重：PSW时长 30% · 薪资门槛 40% · 审批透明度 30%
          </span>
        </div>
      </div>
    </div>
  );
};
