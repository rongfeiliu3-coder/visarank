import React from 'react';
import { Activity, Cpu, Flame, Layers, Sparkles } from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';

interface HeaderProps {
  activeCountry: CountryCode | 'ALL';
  onSelectCountry: (country: CountryCode | 'ALL') => void;
  onOpenRadar?: () => void;
  onOpenArchitecture?: () => void;
  onScrollToAssessment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCountry,
  onSelectCountry,
  onOpenRadar,
  onOpenArchitecture,
  onScrollToAssessment,
}) => {
  const countries: { code: CountryCode | 'ALL'; label: string; flag?: string }[] = [
    { code: 'ALL', label: '全球总览' },
    { code: 'NZ', label: '新西兰', flag: '🇳🇿' },
    { code: 'AU', label: '澳大利亚', flag: '🇦🇺' },
    { code: 'CA', label: '加拿大', flag: '🇨🇦' },
    { code: 'UK', label: '英国', flag: '🇬🇧' },
    { code: 'DE', label: '德国', flag: '🇩🇪' },
    { code: 'SG', label: '新加坡', flag: '🇸🇬' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#05070D]/85 backdrop-blur-xl">
      {/* Top Banner Ticker */}
      <div className="w-full bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-emerald-950/40 border-b border-cyan-500/20 px-4 py-1 text-xs text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-cyan-300 font-semibold text-[11px] tracking-wider uppercase">
            2026 移民法案库同步生效中:
          </span>
          <span className="text-zinc-300 text-[11px]">
            已收录新西兰 SMC 6分制、澳洲 2026-2027 财年配额及加拿大 Express Entry 最新定向抽选标准
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3.5 h-3.5" /> 官方数据源直连
          </span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-400">法案版本 v2026.8</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onSelectCountry('ALL')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-neon-cyan">
            <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center group-hover:bg-zinc-900 transition">
              <Cpu className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-wider text-white font-mono">EMIGRANT</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400 tracking-tight">全球主流发达国家 留学 · 工签 · 永居 规划系统</p>
          </div>
        </div>

        {/* Center Country Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800">
          {countries.map((c) => {
            const isSelected = activeCountry === c.code;
            return (
              <button
                key={c.code}
                onClick={() => onSelectCountry(c.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {c.flag && <span>{c.flag}</span>}
                <span>{c.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Architecture Tag */}
        <div className="flex items-center gap-2.5">
          {/* Architecture Badge for Engineers / Interviewers */}
          {onOpenArchitecture && (
            <button
              onClick={onOpenArchitecture}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 transition shadow-sm"
              title="查看边缘原生系统架构"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>⚙️ 架构全景</span>
            </button>
          )}

          {onOpenRadar && (
            <button
              onClick={onOpenRadar}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 hover:border-zinc-500 transition"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>政策异动雷达</span>
            </button>
          )}

          <button
            onClick={onScrollToAssessment}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-neon-cyan transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>开始背景评估</span>
          </button>
        </div>
      </div>
    </header>
  );
};
