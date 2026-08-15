import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Compass,
  ExternalLink,
  Building2,
  Scale,
  MessageCircle,
  AlertTriangle,
} from 'lucide-react';
import type { CountryCode, TrackId } from '@emigrant/shared';
import { TRACKS_DATA } from '@emigrant/shared';
import {
  COUNTRY_VIEWPORTS,
  CATEGORY_TAG_CONFIG,
} from '../../data/countryViewports';

interface CountryHudDrawerProps {
  countryCode: CountryCode | null;
  activeTrackId?: string;
  activeTrackName?: string;
  onClose: () => void;
  onOpenAssessment: (countryCode?: CountryCode) => void;
  onOpenConsultation?: (visaName?: string) => void;
}

export const CountryHudDrawer: React.FC<CountryHudDrawerProps> = ({
  countryCode,
  activeTrackId = 'it_ai',
  activeTrackName = '计算机与人工智能',
  onClose,
  onOpenAssessment,
  onOpenConsultation,
}) => {
  const navigate = useNavigate();

  if (!countryCode) return null;

  const data = COUNTRY_VIEWPORTS[countryCode];
  if (!data) return null;

  // Retrieve 100% track-specific details from master TRACKS_DATA
  const trackObj = TRACKS_DATA[activeTrackId as TrackId] || TRACKS_DATA.it_ai;
  const trackDetail = trackObj.countryRankings[countryCode];

  const scores = trackDetail?.scores || {
    policyFriendliness: 7.5,
    prCertainty: 7.5,
    jobAndSalaryMatch: 7.5,
    lowBarrierIndex: 7.0,
    compositeScore: data.stayFriendlyScore,
    tier: (data.stayFriendlyScore >= 8.5 ? 'GREEN' : data.stayFriendlyScore < 6.8 ? 'RED' : 'YELLOW') as 'GREEN' | 'YELLOW' | 'RED',
    tierLabel: data.stayFriendlyScore >= 8.5 ? '宽松 · 红利直通' : data.stayFriendlyScore < 6.8 ? '紧缩 · 高压劝退' : '适中 · 需策略加分',
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 8.5) return 'text-[#2e7d32] bg-[#eaf6ed] border-[#c5e8ce]';
    if (score >= 6.8) return 'text-[#996500] bg-[#fdf6e2] border-[#f4e2a8]';
    return 'text-[#c64545] bg-[#faeaea] border-[#f5c6c6]';
  };

  const handleVisaClick = (visaId: string) => {
    navigate(`/visas/${visaId}`);
  };

  const headline = trackDetail?.headlineMetric || data.keyMetricsSubtitle;
  const summaryText = trackDetail?.summary || data.summary;
  const bottlenecks = trackDetail?.fatalBottlenecks || data.fatalBottlenecks;
  const recommendedVisas = trackDetail?.recommendedVisas || data.topVisas;
  const isStrictTrack = scores.compositeScore < 6.8;

  return (
    <AnimatePresence>
      <motion.aside
        key={countryCode + activeTrackId}
        initial={{ y: 240, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 240, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        className="fixed inset-x-0 bottom-0 max-h-[85vh] z-50 rounded-t-3xl md:rounded-3xl bg-[#faf8f5]/98 backdrop-blur-xl border-t md:border border-[#e6dfd8] shadow-[0_-10px_40px_rgba(24,23,21,0.18)] md:shadow-[0_20px_48px_rgba(24,23,21,0.16)] p-4 sm:p-6 overflow-y-auto select-none md:absolute md:top-3 md:right-3 md:bottom-3 md:left-auto md:w-[420px] md:max-h-none flex flex-col justify-between safe-bottom"
      >
        {/* Mobile Pull Indicator */}
        <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto mb-2 md:hidden shrink-0" />

        {/* Top Content Area */}
        <div className="space-y-3 sm:space-y-4">
          {/* 1. Header: Flag, Name, Official Portal Badge & Close */}
          <div className="space-y-3 border-b border-[#e6dfd8] pb-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl p-1.5 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] shadow-2xs">
                  {data.flag}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight">
                      {data.name}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-500 bg-[#efe9de] px-1.5 py-0.2 rounded border border-[#e6dfd8] font-bold">
                      {data.id}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">
                    {data.englishName} · {activeTrackName.split(' (')[0]} 对口评估
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-xl bg-[#efe9de]/80 hover:bg-[#e6dfd8] text-stone-600 hover:text-stone-900 border border-[#e6dfd8] transition-colors cursor-pointer"
                title="收起抽屉 (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Immigration Portal Direct Link */}
            {data.officialPortalUrl && (
              <a
                href={data.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-3 py-2 rounded-xl bg-[#efe9de]/70 hover:bg-[#efe9de] border border-[#e6dfd8] text-xs text-[#c2410c] hover:text-[#9a3412] font-semibold flex items-center justify-between transition-all group shadow-2xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">
                    🏛️ {data.officialPortalName || '移民局官方立法公报'}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>

          {/* 2. Standardized 4-Dimensional Scoring Breakdown */}
          <div className="p-3.5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] space-y-3 shadow-xs">
            {/* Top Row: Composite Score + Tier Badge */}
            <div className="flex items-center justify-between border-b border-[#e6dfd8]/80 pb-2.5">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider flex items-center gap-1">
                  <Scale className="w-3 h-3 text-[#c2410c]" />
                  <span>4维量化留存指数 (4D Composite)</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                    {scores.compositeScore.toFixed(1)}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">/ 10.0</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border shadow-2xs ${getScoreColorClass(
                    scores.compositeScore
                  )}`}
                >
                  {scores.tierLabel}
                </span>
                <span className="text-[9px] font-mono text-stone-400">
                  35% 政策 + 30% PR + 25% 就业 + 10% 门槛
                </span>
              </div>
            </div>

            {/* 4 Dimension Progress Sub-Scores */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {/* 1. 政策友好度 (35%) */}
              <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e6dfd8]/80 space-y-1">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium text-[10px]">📜 政策友好度 (35%)</span>
                  <span className="font-mono font-bold text-stone-900">{scores.policyFriendliness.toFixed(1)}</span>
                </div>
                <div className="w-full bg-[#efe9de] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scores.policyFriendliness >= 8.5 ? 'bg-emerald-500' : scores.policyFriendliness < 6.8 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${scores.policyFriendliness * 10}%` }}
                  />
                </div>
              </div>

              {/* 2. 永居确定性 (30%) */}
              <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e6dfd8]/80 space-y-1">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium text-[10px]">🎯 永居确定性 (30%)</span>
                  <span className="font-mono font-bold text-stone-900">{scores.prCertainty.toFixed(1)}</span>
                </div>
                <div className="w-full bg-[#efe9de] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scores.prCertainty >= 8.5 ? 'bg-emerald-500' : scores.prCertainty < 6.8 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${scores.prCertainty * 10}%` }}
                  />
                </div>
              </div>

              {/* 3. 就业薪资对口度 (25%) */}
              <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e6dfd8]/80 space-y-1">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium text-[10px]">💰 就业薪资 (25%)</span>
                  <span className="font-mono font-bold text-stone-900">{scores.jobAndSalaryMatch.toFixed(1)}</span>
                </div>
                <div className="w-full bg-[#efe9de] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scores.jobAndSalaryMatch >= 8.5 ? 'bg-emerald-500' : scores.jobAndSalaryMatch < 6.8 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${scores.jobAndSalaryMatch * 10}%` }}
                  />
                </div>
              </div>

              {/* 4. 低壁垒指数 (10%) */}
              <div className="p-2 rounded-xl bg-[#faf9f5] border border-[#e6dfd8]/80 space-y-1">
                <div className="flex items-center justify-between text-stone-600">
                  <span className="font-medium text-[10px]">🚪 低门槛指数 (10%)</span>
                  <span className="font-mono font-bold text-stone-900">{scores.lowBarrierIndex.toFixed(1)}</span>
                </div>
                <div className="w-full bg-[#efe9de] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${scores.lowBarrierIndex >= 8.5 ? 'bg-emerald-500' : scores.lowBarrierIndex < 6.8 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${scores.lowBarrierIndex * 10}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. 100% Track-Specific Parameter Subtitle & Summary */}
          <div className="space-y-1.5 bg-[#efe9de]/40 p-3.5 rounded-2xl border border-[#e6dfd8]">
            {headline && (
              <div className="text-xs font-bold text-stone-900 font-mono flex items-center gap-1">
                <span className="text-[#c2410c]">⚡</span>
                <span>{headline}</span>
              </div>
            )}
            <p className="text-xs text-stone-700 leading-relaxed font-sans">
              {summaryText}
            </p>
          </div>

          {/* 4. Fatal Bottlenecks (100% Track-Specific Alert Breakdown) */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#c64545]">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>【{activeTrackName.split(' (')[0]}】核心痛点与劝退真相</span>
            </div>

            <div className="space-y-1.5">
              {bottlenecks.map((bottleneck, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#faeaea]/60 border border-[#f5c6c6] text-[11px] text-[#7a1c1c] leading-relaxed flex items-start gap-2"
                >
                  <span className="font-mono font-bold text-[#c64545] flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{bottleneck}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Humorous Tip & Consultation CTA (For Strict/Red Tracks or Special Guidance) */}
          {(trackDetail?.humorTip || isStrictTrack) && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] border border-[#fed7aa] space-y-2.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c] font-serif">
                <AlertTriangle className="w-3.5 h-3.5 text-[#c2410c]" />
                <span>主理人破局提醒 (Reality Check)</span>
              </div>
              <p className="text-[11px] text-[#9a3412] leading-relaxed font-sans">
                {trackDetail?.humorTip || '该专业在此国技术移民属于高内卷赛道，留存概率较低。建议做好 100% 回国搞钱准备；如决心出海留存，建议尽早进行跨专业/跨国别或技术文书对冲！'}
              </p>
              {onOpenConsultation && (
                <button
                  onClick={() => onOpenConsultation(`${data.name} · ${activeTrackName}`)}
                  className="w-full py-2 px-3 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-bold font-sans flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>💬 预约主理人 1v1 文书精修与学业/背景对冲诊断</span>
                </button>
              )}
            </div>
          )}

          {/* 6. Key Visa Pathways (Direct Link to /visas/:visaId) */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <Compass className="w-3.5 h-3.5 text-[#c2410c]" />
              <span>代表性签证法案通道</span>
            </div>

            <div className="space-y-1.5">
              {recommendedVisas.map((v: any) => {
                const tagConfig = CATEGORY_TAG_CONFIG[v.category as keyof typeof CATEGORY_TAG_CONFIG] || CATEGORY_TAG_CONFIG.PR;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleVisaClick(v.id)}
                    className="w-full text-left p-2.5 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] border border-[#e6dfd8] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded border ${tagConfig.bg} ${tagConfig.text} ${tagConfig.border}`}
                        >
                          {tagConfig.label}
                        </span>
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {v.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-600 truncate mt-0.5">
                        {v.name}
                      </div>
                      {(v.highlight || v.summary) && (
                        <div className="text-[10px] text-[#c2410c] font-mono line-clamp-1 mt-0.5">
                          {v.highlight || v.summary}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Action Button */}
        <div className="pt-4 border-t border-[#e6dfd8] mt-4 space-y-2">
          <button
            onClick={() => onOpenAssessment(data.id)}
            className="w-full py-3 rounded-2xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>免费测算 {data.name} 移民及格分</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="text-center text-[10px] font-mono text-stone-500">
            基于公开法案规则断言 · 45秒生成定制诊断
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
