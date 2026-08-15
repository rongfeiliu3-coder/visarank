import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  HelpCircle,
  Clock,
  Compass,
  Search,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';

export interface PathwayRow {
  rank: number;
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  visaCode: string;
  visaName: string;
  visaId: string;
  category: 'points' | 'work' | 'study' | 'hybrid';
  categoryLabel: string;
  pswDuration: string;
  thresholdScore: string;
  medianSalary: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskLabel: string;
  processingTime: string;
  officialUrl: string;
  keyFeature: string;
}

const PATHWAY_DATA: PathwayRow[] = [
  {
    rank: 1,
    countryCode: 'NZ',
    countryName: '新西兰 (New Zealand)',
    flag: '🇳🇿',
    visaCode: 'SMC 6分制',
    visaName: '技术移民居留签证 (Skilled Migrant Category)',
    visaId: 'nz_smc',
    category: 'points',
    categoryLabel: '6分制居留',
    pswDuration: '3 年开放工签',
    thresholdScore: '累计满 6 分',
    medianSalary: 'NZD 35.00/时 (~$72.8k/年)',
    riskLevel: 'low',
    riskLabel: '🟢 宽松低风险 (获邀确定)',
    processingTime: '6 - 9 个月',
    officialUrl: 'https://www.immigration.govt.nz',
    keyFeature: '硕士获 5 分 + 本地 1 年工作即满 6 分，永久回头签',
  },
  {
    rank: 2,
    countryCode: 'CA',
    countryName: '加拿大 (Canada)',
    flag: '🇨🇦',
    visaCode: 'EE · FSW / CEC',
    visaName: '联邦快速通道 (Express Entry CRS)',
    visaId: 'ca_ee',
    category: 'points',
    categoryLabel: '打分择优/省提名',
    pswDuration: '3 年 PGWP',
    thresholdScore: 'CRS 480 - 520 分',
    medianSalary: 'CAD 75,000 / 年',
    riskLevel: 'low',
    riskLabel: '🟢 定向邀请友好',
    processingTime: '6 个月',
    officialUrl: 'https://www.canada.ca',
    keyFeature: 'STEM/医疗类别低分抽选，各省 PNP 自带 600 分保障',
  },
  {
    rank: 3,
    countryCode: 'DE',
    countryName: '德国 (Germany)',
    flag: '🇩🇪',
    visaCode: 'EU Blue Card',
    visaName: '德国欧盟蓝卡 & 机会卡 (Chancenkarte)',
    visaId: 'de_blue_card',
    category: 'work',
    categoryLabel: '欧洲蓝卡',
    pswDuration: '18 个月找工作签',
    thresholdScore: '紧缺年薪 €41,041',
    medianSalary: 'EUR 45,300 / 年',
    riskLevel: 'low',
    riskLabel: '🟢 欧洲首选 (21月永居)',
    processingTime: '1 - 3 个月',
    officialUrl: 'https://www.make-it-in-germany.com',
    keyFeature: '持蓝卡工作 21 个月 + 德语 B1 即可直接转为德国永久居留',
  },
  {
    rank: 4,
    countryCode: 'IE',
    countryName: '爱尔兰 (Ireland)',
    flag: '🇮🇪',
    visaCode: 'CSEP 关键技能',
    visaName: '关键技能工作许可 (Critical Skills)',
    visaId: 'ie_csep',
    category: 'work',
    categoryLabel: '雇主工签转永居',
    pswDuration: '2 年 Stamp 1G',
    thresholdScore: '年薪 €38,000+',
    medianSalary: 'EUR 38,000 / 年',
    riskLevel: 'low',
    riskLabel: '🟢 纯英语国 · 2年PR',
    processingTime: '2 - 3 个月',
    officialUrl: 'https://www.irishimmigration.ie',
    keyFeature: '工作满 2 年直接换发 Stamp 4 永居身份，欧盟唯一纯英语国',
  },
  {
    rank: 5,
    countryCode: 'JP',
    countryName: '日本 (Japan)',
    flag: '🇯🇵',
    visaCode: 'HSP 高度专门职',
    visaName: '高度人才积分制 1号 (HSP 1)',
    visaId: 'jp_hsp',
    category: 'points',
    categoryLabel: '高度人才积分',
    pswDuration: '1 年特定活动',
    thresholdScore: '达到 80 分',
    medianSalary: 'JPY 6,000,000 / 年',
    riskLevel: 'low',
    riskLabel: '🟢 1年极速拿永住',
    processingTime: '1 - 2 个月',
    officialUrl: 'https://www.moj.go.jp/isa',
    keyFeature: '满 80 分仅需在日工作 1 年直接申请永住（绿卡），日元汇率红利',
  },
  {
    rank: 6,
    countryCode: 'AU',
    countryName: '澳大利亚 (Australia)',
    flag: '🇦🇺',
    visaCode: 'GSM 189 / 190',
    visaName: '技术移民打分制 (General Skilled Migration)',
    visaId: 'au_189',
    category: 'points',
    categoryLabel: '打分制永居',
    pswDuration: '2 - 4 年 (卡35岁)',
    thresholdScore: '最低 65 分 (实际85+)',
    medianSalary: 'AUD 85,000 / 年',
    riskLevel: 'medium',
    riskLabel: '🟡 医护幼教友好/IT内卷',
    processingTime: '3 - 9 个月',
    officialUrl: 'https://immi.homeaffairs.gov.au',
    keyFeature: '医护幼教 65 分即邀，但 485 工签严卡 35 岁上限，IT/商科内卷',
  },
  {
    rank: 7,
    countryCode: 'SG',
    countryName: '新加坡 (Singapore)',
    flag: '🇸🇬',
    visaCode: 'EP · COMPASS',
    visaName: '就业准证 (Employment Pass)',
    visaId: 'sg_ep',
    category: 'work',
    categoryLabel: '高技能工签',
    pswDuration: '无专属 PSW',
    thresholdScore: '月薪 S$5,600 + 40分',
    medianSalary: 'SGD 67,200 / 年',
    riskLevel: 'medium',
    riskLabel: '🟡 高薪门槛 / PR黑盒',
    processingTime: '1 - 3 周',
    officialUrl: 'https://www.mom.gov.sg',
    keyFeature: '起薪门槛较高但税率极低，COMPASS 评估企业多样性，PR审批偏黑盒',
  },
  {
    rank: 8,
    countryCode: 'UK',
    countryName: '英国 (United Kingdom)',
    flag: '🇬🇧',
    visaCode: 'Skilled Worker',
    visaName: '技术工人签证 (Skilled Worker Visa)',
    visaId: 'uk_skilled_worker',
    category: 'work',
    categoryLabel: '雇主担保工签',
    pswDuration: '2 年 Graduate 签',
    thresholdScore: '年薪 £38,700 门槛',
    medianSalary: 'GBP 38,700 / 年',
    riskLevel: 'high',
    riskLabel: '🔴 紧缩高门槛 (£38.7k)',
    processingTime: '3 - 8 周',
    officialUrl: 'https://www.gov.uk',
    keyFeature: '最低年薪门槛暴涨至 £38,700，取消大部分家属陪读，应届初级岗极难达标',
  },
  {
    rank: 9,
    countryCode: 'US',
    countryName: '美国 (United States)',
    flag: '🇺🇸',
    visaCode: 'H-1B / EB-2 NIW',
    visaName: '专业技术工签与国家利益豁免绿卡',
    visaId: 'us_eb2_niw',
    category: 'hybrid',
    categoryLabel: '抽签/硕博豁免',
    pswDuration: '1+2年 STEM OPT',
    thresholdScore: 'H-1B 抽签 / NIW',
    medianSalary: 'USD 110,000 / 年',
    riskLevel: 'high',
    riskLabel: '🔴 抽签率<15% / 十年排期',
    processingTime: '45天加急 + 排期',
    officialUrl: 'https://www.uscis.gov',
    keyFeature: '薪资与科研天花板，但 H-1B 中签率极低且 EB-2/3 绿卡中国大陆排期长达 8-10 年',
  },
];

export interface GlobalRankTableProps {
  searchQuery?: string;
  activeCategoryFilter?: string;
  onSelectCountry?: (countryCode: CountryCode) => void;
  onOpenAssessment?: (countryCode: CountryCode) => void;
}

export const GlobalRankTable: React.FC<GlobalRankTableProps> = ({
  searchQuery = '',
  activeCategoryFilter = 'ALL',
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryFilter);
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);

  const filteredData = useMemo(() => {
    const query = (searchTerm || searchQuery).toLowerCase();
    return PATHWAY_DATA.filter((row) => {
      const matchCategory =
        selectedCategory === 'ALL' || row.category === selectedCategory;
      const matchSearch =
        query === '' ||
        row.countryName.toLowerCase().includes(query) ||
        row.visaName.toLowerCase().includes(query) ||
        row.keyFeature.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchTerm, searchQuery]);

  return (
    <section id="rank-table" className="space-y-4 max-w-6xl mx-auto select-none pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[11px] font-mono font-semibold text-[#8e8b82] mb-2">
            <span>DATABASE // 全球法案多维对比</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#141413] font-bold tracking-tight">
            全球主流国家法案与留存门槛全景总表
          </h2>
          <p className="text-xs sm:text-sm text-[#6c6a64] mt-1">
            横向对比工签年限、及格分数、薪资门槛与获邀确定性，打破单一国家信息不对称。
          </p>
        </div>

        {/* Search & Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索国家 / 签证..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#efe9de] border border-[#e6dfd8] text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#cc785c] w-36 sm:w-44"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { key: 'ALL', label: '全部通路' },
              { key: 'points', label: '打分制居留' },
              { key: 'work', label: '雇主/蓝卡工签' },
              { key: 'hybrid', label: '硕博特快' },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#141413] text-[#faf9f5] shadow-xs'
                    : 'bg-[#efe9de] text-[#6c6a64] hover:text-[#141413]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] shadow-card-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#efe9de] border-b border-[#e6dfd8] text-[#8e8b82] font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold w-12 text-center">排名</th>
                <th className="py-3 px-4 font-semibold">目标国与签证通道</th>
                <th className="py-3 px-4 font-semibold">通道分类</th>
                <th className="py-3 px-4 font-semibold">毕业工签 (PSW)</th>
                <th className="py-3 px-4 font-semibold">准入/薪资底线</th>
                <th className="py-3 px-4 font-semibold">获邀确定性 / 风险</th>
                <th className="py-3 px-4 font-semibold text-right">法案细则</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd8]/60">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-500">
                    暂无符合条件的法案数据
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr
                    key={row.rank}
                    onClick={() => navigate(`/visas/${row.visaId}`)}
                    className="hover:bg-[#efe9de]/40 transition-colors group cursor-pointer"
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-[#8e8b82]">
                      #{row.rank}
                    </td>

                    {/* Country & Visa */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl leading-none">{row.flag}</span>
                        <div>
                          <div className="font-serif font-bold text-[#141413] text-sm group-hover:text-[#cc785c] transition-colors">
                            {row.countryName.split(' (')[0]} · {row.visaCode}
                          </div>
                          <div className="text-[11px] text-[#6c6a64] line-clamp-1 mt-0.5">
                            {row.keyFeature}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#efe9de] text-[#6c6a64] font-mono text-[10px] border border-[#e6dfd8]">
                        {row.categoryLabel}
                      </span>
                    </td>

                    {/* PSW Duration */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#efe9de] border border-[#e6dfd8] text-[11px] font-mono font-medium text-[#141413]">
                        <Clock className="w-3 h-3 text-[#cc785c]" />
                        {row.pswDuration}
                      </span>
                    </td>

                    {/* Benchmark Score / Salary */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-[#141413] text-[11px]">
                        {row.thresholdScore}
                      </div>
                      <div className="text-[10px] text-[#8e8b82] font-mono">
                        {row.medianSalary}
                      </div>
                    </td>

                    {/* Policy Friendly / Risk Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-medium font-mono ${
                          row.riskLevel === 'low'
                            ? 'bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce]'
                            : row.riskLevel === 'medium'
                            ? 'bg-[#fdf6e2] text-[#996500] border border-[#f4e2a8]'
                            : 'bg-[#faeaea] text-[#a62828] border border-[#f5c6c6]'
                        }`}
                      >
                        {row.riskLabel}
                      </span>
                    </td>

                    {/* Action Button: Navigate directly to visa detail */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/visas/${row.visaId}`);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#efe9de] hover:bg-[#cc785c] hover:text-white border border-[#e6dfd8] hover:border-transparent text-[#3d3d3a] text-xs font-medium transition-all shadow-2xs group-hover:bg-[#cc785c] group-hover:text-white cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>查看法案细则</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="px-5 py-3 bg-[#efe9de] border-t border-[#e6dfd8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#6c6a64]">
          <div className="flex items-center gap-2 font-mono">
            <span>显示 {filteredData.length} 个重点通道</span>
            <span>·</span>
            <span>更新时间: 2026-08 财年最新官方公报</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#8e8b82]">
              <HelpCircle className="w-3 h-3" />
              点击任意行或【详细测算】即可唤起右侧评估引擎
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
