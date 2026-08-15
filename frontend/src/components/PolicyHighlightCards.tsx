import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';

interface PolicyHighlightCardsProps {
  onSelectCountry: (countryCode: CountryCode) => void;
}

export const PolicyHighlightCards: React.FC<PolicyHighlightCardsProps> = ({
  onSelectCountry,
}) => {
  const friendlyRegions = [
    {
      rank: 1,
      code: 'NZ' as CountryCode,
      name: '新西兰',
      flag: '🇳🇿',
      pathway: '硕士起享 3 年开放工签 · SMC 6分制',
      keyBenefit: '配偶同享开放工签，绿名单 Tier 1 免打分直通 PR',
      badge: '获邀窗口期',
      scoreMetric: 'NZD 35.00/h',
    },
    {
      rank: 2,
      code: 'CA' as CountryCode,
      name: '加拿大',
      flag: '🇨🇦',
      pathway: '硕士毕业享 3 年 PGWP 工签 · Express Entry',
      keyBenefit: 'STEM 与医疗紧缺类别定向抽选，法语额外加 50 分',
      badge: '定向低分邀请',
      scoreMetric: 'CRS 480 分',
    },
    {
      rank: 3,
      code: 'DE' as CountryCode,
      name: '德国',
      flag: '🇩🇪',
      pathway: '机会卡 1年找工作签 · 欧盟蓝卡',
      keyBenefit: '蓝卡持有人工作满 21 个月 + 德语 B1 即可直接转永居',
      badge: '欧洲最优通道',
      scoreMetric: '年薪 €45.3k',
    },
  ];

  const strictRegions = [
    {
      rank: 1,
      code: 'UK' as CountryCode,
      name: '英国',
      flag: '🇬🇧',
      pathway: 'Skilled Worker 技术工人签证',
      keyRisk: '最低薪资门槛暴涨至 £38,700，取消大部分家属陪读',
      badge: '+48% 薪资涨幅',
      scoreMetric: '年薪 £38.7k',
    },
    {
      rank: 2,
      code: 'AU' as CountryCode,
      name: '澳大利亚',
      flag: '🇦🇺',
      pathway: '485 毕业生工签 · 189 独立技术',
      keyRisk: '485 工签年龄上限降至 35 岁，语言要求提至 6.5，配额收缩',
      badge: '年龄/语言收紧',
      scoreMetric: '基准 65 分起',
    },
    {
      rank: 3,
      code: 'SG' as CountryCode,
      name: '新加坡',
      flag: '🇸🇬',
      pathway: 'COMPASS 积分评估 · EP 工签',
      keyRisk: 'EP 薪资门槛上调至 S$5,600/月，严格审查企业员工国籍多元化',
      badge: '高门槛竞争',
      scoreMetric: '月薪 S$5.6k',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Card: Most Friendly / Longest PSW Regions (Soft Green Card) */}
      <div className="rounded-2xl bg-[#f2f8f3] border border-[#d4edd9] p-5 shadow-card-soft space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d4edd9] pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#e3f4e6] text-[#2e7d32] border border-[#c5e8ce]">
              <TrendingDown className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[11px] font-mono font-semibold text-[#2e7d32] uppercase tracking-wider">
                2026 毕业生工签最长 · 获邀最友好地区
              </div>
              <h2 className="font-serif text-base text-[#141413] font-bold">
                宽松窗口期与低门槛直通通道
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#e3f4e6] text-[#2e7d32] font-semibold border border-[#c5e8ce]">
            TOP 3 推荐
          </span>
        </div>

        {/* List of 3 Friendly Regions */}
        <div className="space-y-2">
          {friendlyRegions.map((item) => (
            <div
              key={item.code}
              onClick={() => onSelectCountry(item.code)}
              className="p-3 rounded-xl bg-[#faf9f5]/90 hover:bg-[#faf9f5] border border-[#d4edd9] hover:border-[#a3dbae] transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs font-bold text-[#8e8b82] w-5">
                  #{item.rank}
                </span>
                <span className="text-xl leading-none">{item.flag}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#141413] group-hover:text-[#cc785c] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce] font-medium font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6c6a64] truncate mt-0.5">
                    {item.pathway} · {item.keyBenefit}
                  </div>
                </div>
              </div>

              {/* Metric & Action */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="font-mono text-xs font-semibold text-[#2e7d32]">
                    {item.scoreMetric}
                  </div>
                  <div className="text-[9px] text-[#8e8b82]">准入基准</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCountry(item.code);
                  }}
                  className="p-1.5 rounded-lg bg-[#efe9de] group-hover:bg-[#cc785c] group-hover:text-white text-[#3d3d3a] transition-colors"
                  title="聚焦该国"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Card: Strictest / High Threshold Regions (Soft Red Card) */}
      <div className="rounded-2xl bg-[#faf2f2] border border-[#f5dada] p-5 shadow-card-soft space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f5dada] pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#fae5e5] text-[#c64545] border border-[#f5c6c6]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[11px] font-mono font-semibold text-[#c64545] uppercase tracking-wider">
                2026 政策紧缩 · 语言及薪资门槛最高地区
              </div>
              <h2 className="font-serif text-base text-[#141413] font-bold">
                高门槛与配额收紧警示通道
              </h2>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#fae5e5] text-[#c64545] font-semibold border border-[#f5c6c6]">
            TOP 3 风险提示
          </span>
        </div>

        {/* List of 3 Strict Regions */}
        <div className="space-y-2">
          {strictRegions.map((item) => (
            <div
              key={item.code}
              onClick={() => onSelectCountry(item.code)}
              className="p-3 rounded-xl bg-[#faf9f5]/90 hover:bg-[#faf9f5] border border-[#f5dada] hover:border-[#f0bebe] transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs font-bold text-[#8e8b82] w-5">
                  #{item.rank}
                </span>
                <span className="text-xl leading-none">{item.flag}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#141413] group-hover:text-[#c64545] transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#faeaea] text-[#a62828] border border-[#f5c6c6] font-medium font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6c6a64] truncate mt-0.5">
                    {item.pathway} · {item.keyRisk}
                  </div>
                </div>
              </div>

              {/* Metric & Action */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <div className="font-mono text-xs font-semibold text-[#c64545]">
                    {item.scoreMetric}
                  </div>
                  <div className="text-[9px] text-[#8e8b82]">法定门槛</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCountry(item.code);
                  }}
                  className="p-1.5 rounded-lg bg-[#efe9de] group-hover:bg-[#c64545] group-hover:text-white text-[#3d3d3a] transition-colors"
                  title="聚焦该国"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
