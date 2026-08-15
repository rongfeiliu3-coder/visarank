import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';
import { TRACKS_DATA } from '../data/mockTracks';
import { SEOHead } from '../components/SEOHead';
import { getTrackSeoMeta } from '../utils/seoUtils';

interface TrackCategoryPageProps {
  onOpenAssessment: (countryCode?: CountryCode) => void;
}

export const TrackCategoryPage: React.FC<TrackCategoryPageProps> = ({
  onOpenAssessment,
}) => {
  const { trackId } = useParams<{ trackId: string }>();
  const navigate = useNavigate();

  const currentTrack =
    TRACKS_DATA.find((t) => t.id === trackId) || TRACKS_DATA[0]!;

  const seoMeta = getTrackSeoMeta(currentTrack);

  return (
    <div className="space-y-10 py-6 select-none">
      {/* Dynamic SEO & Programmatic Head */}
      <SEOHead
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={seoMeta.keywords}
        canonicalUrl={seoMeta.canonicalUrl}
        ogImage={seoMeta.ogImage}
        jsonLd={seoMeta.jsonLd}
      />

      {/* 1. Breadcrumbs & Back */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-stone-500 font-medium">
          <Link to="/" className="hover:text-stone-900 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回决策大厅</span>
          </Link>
          <span>/</span>
          <span className="text-stone-400">赛道分类矩阵</span>
          <span>/</span>
          <span className="text-stone-900 font-semibold">{currentTrack.name}</span>
        </div>

        <button
          onClick={() => onOpenAssessment()}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>开始智能测算</span>
          <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.2 rounded font-bold">免费</span>
        </button>
      </div>

      {/* 2. Top Track Switcher Pills (1:1 with OpenTheRank L2) */}
      <div className="p-1.5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] flex items-center gap-1.5 overflow-x-auto">
        {TRACKS_DATA.map((t) => {
          const isActive = t.id === currentTrack.id;
          const isWarning = t.riskOverall === 'strict';

          return (
            <button
              key={t.id}
              onClick={() => navigate(`/tracks/${t.id}`)}
              className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 relative ${
                isActive
                  ? 'bg-[#181715] text-[#faf9f5] font-semibold shadow-sm'
                  : 'bg-transparent text-stone-600 hover:bg-[#faf9f5]'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.shortName}</span>
              {isWarning && <span className="text-[10px]">⚠️</span>}
            </button>
          );
        })}
      </div>

      {/* 3. Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          全球 {currentTrack.name.split(' (')[0]} 留存与工签决策矩阵
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
          {currentTrack.summary} 实时监测各国学费、毕业工签（PSW）及技术居留获邀门槛。
        </p>
      </div>

      {/* 4. 2-Column Card Grid with Mini-Rank Tables (OpenTheRank L2 Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentTrack.subDirections.map((sub, idx) => (
          <motion.div
            key={sub.id || idx}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl bg-[#faf9f5] border border-[#e6dfd8] p-5 sm:p-6 shadow-card-soft hover:shadow-card-hover space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e6dfd8] pb-3">
                <div>
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    {sub.title}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">{sub.subtitle}</p>
                </div>

                <span className="text-[11px] font-mono font-bold text-[#c2410c] px-2.5 py-1 rounded-full bg-[#fae5e5] border border-[#f5c6c6] self-start sm:self-auto">
                  {sub.metricHighlight}
                </span>
              </div>

              {/* Mini-Rank Table (1:1 with Screenshot 2) */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[11px] font-mono text-stone-400 border-b border-[#e6dfd8]/80">
                      <th className="py-2 font-medium w-8">#</th>
                      <th className="py-2 font-medium">国家 / 主力通道</th>
                      <th className="py-2 font-medium">工签时长</th>
                      <th className="py-2 font-medium">起薪/门槛</th>
                      <th className="py-2 font-medium text-right">留存评级</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6dfd8]/60 font-sans">
                    {sub.rankings.map((row) => (
                      <tr
                        key={row.rank}
                        className="hover:bg-[#efe9de]/50 transition-colors group cursor-pointer"
                        onClick={() => navigate(`/visas/${row.visaId}`)}
                      >
                        <td className="py-2.5 font-mono text-stone-400 font-semibold">
                          {row.rank}
                        </td>
                        <td className="py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base leading-none">{row.flag}</span>
                            <span className="font-bold text-stone-900 group-hover:text-[#c2410c] transition-colors">
                              {row.countryName}
                            </span>
                            <span className="text-[10px] font-mono text-stone-500 bg-[#efe9de] px-1 py-0.2 rounded border border-[#e6dfd8]">
                              {row.visaCode}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 text-stone-600 font-mono text-[11px]">
                          {row.pswDuration}
                        </td>
                        <td className="py-2.5 text-stone-700 font-mono text-[11px] font-medium">
                          {row.thresholdOrSalary}
                        </td>
                        <td className="py-2.5 text-right font-mono text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold ${
                              row.riskLevel === 'friendly'
                                ? 'bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce]'
                                : row.riskLevel === 'moderate'
                                ? 'bg-[#fdf6e2] text-[#996500] border border-[#f4e2a8]'
                                : 'bg-[#faeaea] text-[#a62828] border border-[#f5c6c6]'
                            }`}
                          >
                            {row.riskBadge}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card Footer Link to Level 3 */}
            <div className="pt-3 border-t border-[#e6dfd8] flex items-center justify-between">
              <span className="text-[11px] text-stone-500">点击任意行查看打分法案与算分模型</span>
              <button
                onClick={() => navigate(`/visas/${sub.targetVisaId}`)}
                className="text-xs font-semibold text-[#c2410c] hover:text-[#9a3412] flex items-center gap-1 transition-colors"
              >
                <span>查看完整法案与测算</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 5. Reality Check & Bottleneck Deep Breakdown Box */}
      <div className="rounded-3xl bg-[#efe9de]/70 border border-[#e6dfd8] p-6 sm:p-7 shadow-card-soft space-y-4">
        <div className="flex items-center gap-2 border-b border-[#e6dfd8] pb-3">
          <ShieldAlert className="w-5 h-5 text-[#c2410c]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">
            {currentTrack.name} 赛道客观留存真相与卡点剖析
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-2 bg-[#faf9f5] p-4 rounded-2xl border border-[#e6dfd8]">
            <div className="font-bold text-[#c64545] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>三大留存卡点剖析 (Key Bottlenecks)</span>
            </div>
            <ul className="space-y-2 text-stone-600 list-disc pl-4 text-[11px] leading-relaxed">
              {currentTrack.realityCheck.keyBottlenecks.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 bg-[#faf9f5] p-4 rounded-2xl border border-[#e6dfd8] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="font-bold text-[#2e7d32] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>破局与多轨对冲建议 (Plan B)</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                {currentTrack.realityCheck.actionableAlternative}
              </p>
            </div>

            <div className="pt-3 flex flex-col items-center gap-1">
              <button
                onClick={() => onOpenAssessment()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>开始智能测算</span>
                <span className="text-[9px] font-mono bg-white/20 px-1.5 py-0.2 rounded font-bold">免费</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-stone-500">✨ 100% 免费评估 · 45秒快速生成</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
