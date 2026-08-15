import React from 'react';
import {
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';

export interface NavItem {
  id: CountryCode | 'ALL';
  name: string;
  sub: string;
  flag?: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'ALL', name: '全球总览', sub: 'Global Matrix', flag: '🌐' },
  { id: 'NZ', name: '新西兰', sub: 'SMC 6分制居留', flag: '🇳🇿', badge: '获邀友好' },
  { id: 'AU', name: '澳大利亚', sub: '189/190 技术移民', flag: '🇦🇺' },
  { id: 'CA', name: '加拿大', sub: 'Express Entry CRS', flag: '🇨🇦', badge: '3年工签' },
  { id: 'DE', name: '德国', sub: '欧盟蓝卡 / 机会卡', flag: '🇩🇪' },
  { id: 'IE', name: '爱尔兰', sub: '关键技能 CSEP', flag: '🇮🇪' },
  { id: 'UK', name: '英国', sub: 'Skilled Worker', flag: '🇬🇧', badge: '门槛上调' },
  { id: 'SG', name: '新加坡', sub: 'COMPASS 积分制', flag: '🇸🇬' },
  { id: 'JP', name: '日本', sub: '高度人才 / 永住', flag: '🇯🇵' },
];

interface SidebarProps {
  activeCountry: CountryCode | 'ALL';
  onSelectCountry: (country: CountryCode | 'ALL') => void;
  onOpenAssessment: (country?: CountryCode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCountry,
  onSelectCountry,
  onOpenAssessment,
}) => {
  return (
    <aside className="w-64 h-screen sticky top-0 flex-shrink-0 bg-[#faf9f5] border-r border-[#e6dfd8] flex flex-col justify-between z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="px-5 py-5 border-b border-[#e6dfd8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Claude-style 4-Spoke Radial Spike Glyph / Compass */}
            <div className="w-8 h-8 rounded-lg bg-[#181715] flex items-center justify-center text-[#faf9f5] shadow-sm">
              <svg className="w-5 h-5 text-[#cc785c]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg tracking-tight text-[#141413] font-bold">
                  Visa<span className="text-[#cc785c]">Rank</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#efe9de] text-[#6c6a64] border border-[#e6dfd8]">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-[#6c6a64] leading-tight mt-0.5">
                全球留学·工签·永居决策中台
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#8e8b82] uppercase">
            国家与通道矩阵 (Pathways)
          </div>
          <nav className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeCountry === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCountry(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                    isActive
                      ? 'bg-[#efe9de] text-[#141413] font-semibold shadow-card-soft border-l-[3px] border-[#cc785c]'
                      : 'text-[#3d3d3a] hover:bg-[#f5f0e8] hover:text-[#141413]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-base leading-none">{item.flag}</span>
                    <div className="truncate">
                      <div className="truncate text-xs font-medium text-[#141413]">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-[#8e8b82] truncate leading-tight">
                        {item.sub}
                      </div>
                    </div>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium whitespace-nowrap ml-1 ${
                        item.badge.includes('友好') || item.badge.includes('工签')
                          ? 'bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce]'
                          : 'bg-[#faeaea] text-[#a62828] border border-[#f5c6c6]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cc785c] ml-1 flex-shrink-0" />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-[#e6dfd8] space-y-3 bg-[#f5f0e8]/50">
        {/* Quick CTA Card */}
        <div className="p-3 rounded-xl bg-[#efe9de] border border-[#e6dfd8] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141413]">
            <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>智能背景匹配</span>
          </div>
          <p className="text-[11px] text-[#6c6a64] leading-snug">
            45秒实时测算各主流国技术打分与及格概率。
          </p>
          <button
            onClick={() => onOpenAssessment(activeCountry === 'ALL' ? 'NZ' : activeCountry)}
            className="w-full py-1.5 px-3 rounded-md bg-[#cc785c] hover:bg-[#a9583e] text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>开始背景测算</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live sync badge */}
        <div className="flex items-center justify-between text-[11px] text-[#6c6a64] px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5db872] animate-pulse" />
            <span>2026 法案库实时同步</span>
          </div>
          <span className="font-mono text-[10px] text-[#8e8b82]">v2.4</span>
        </div>
      </div>
    </aside>
  );
};
