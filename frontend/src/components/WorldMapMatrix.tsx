import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Graticule,
  Sphere,
} from 'react-simple-maps';
import {
  ArrowRight,
  Clock,
  Coins,
  Globe,
  Layers,
  TrendingUp,
  X,
  Zap,
} from 'lucide-react';
import type { Country, CountryCode } from '@emigrant/shared';

// TopoJSON geography file path
const GEO_URL = '/world-110m.json';

interface WorldMapMatrixProps {
  countries?: Country[];
  selectedCountry: CountryCode | 'ALL';
  onSelectCountry: (code: CountryCode) => void;
  onStartEvaluation: (code: CountryCode) => void;
}

export interface MapCountryNode {
  code: CountryCode;
  name: string;
  nativeName: string;
  flag: string;
  region: 'Oceania' | 'Europe' | 'North America' | 'Asia';
  coordinates: [number, number]; // [Longitude, Latitude]
  prChannel: string;
  workVisa: string;
  processingTime: string;
  medianIncome: string;
  difficulty: '适中' | '严谨' | '极高竞争' | '高门槛';
  difficultyColor: string;
  shortages: string[];
  hotBadge: string;
  summaryNote: string;
}

export const MAP_NODES: MapCountryNode[] = [
  {
    code: 'NZ',
    name: 'New Zealand',
    nativeName: '新西兰',
    flag: '🇳🇿',
    region: 'Oceania',
    coordinates: [174.7633, -40.9006],
    prChannel: 'SMC 6分制技术移民 / 绿名单直接居留',
    workVisa: '最长 3 年开放工签 (PSWV)',
    processingTime: '6 - 9 个月',
    medianIncome: 'NZ$75,000 - $125,000',
    difficulty: '适中',
    difficultyColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    shortages: ['软件工程师', '建筑/土木', '注册护士', '中小学幼教', '电工技工'],
    hotBadge: '永久回头签 (IRRV)',
    summaryNote: '硕士(5分)+1年本地经验即满6分；绿名单Tier 1紧缺职业享直接居留通道。',
  },
  {
    code: 'AU',
    name: 'Australia',
    nativeName: '澳大利亚',
    flag: '🇦🇺',
    region: 'Oceania',
    coordinates: [133.7751, -25.2744],
    prChannel: 'GSM 189独立技术 / 190州担保 / 491偏远地区',
    workVisa: '2 - 4 年 485 毕业生工签',
    processingTime: '4 - 12 个月',
    medianIncome: 'AU$85,000 - $145,000',
    difficulty: '严谨',
    difficultyColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    shortages: ['IT与网络安全', '各类工程', '医护康复', '幼教/中学', '采矿地质'],
    hotBadge: '高薪直通车 / 州担+5分',
    summaryNote: '65分基准线；语言PTE 8炸(+20分)与州担保(+5分)为高概率获邀核心杀手锏。',
  },
  {
    code: 'CA',
    name: 'Canada',
    nativeName: '加拿大',
    flag: '🇨🇦',
    region: 'North America',
    coordinates: [-106.3468, 56.1304],
    prChannel: 'Express Entry (CRS) / 省提名 PNP 计划',
    workVisa: '最长 3 年 PGWP 毕业工签',
    processingTime: '6 个月快速审理',
    medianIncome: 'CA$72,000 - $120,000',
    difficulty: '极高竞争',
    difficultyColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    shortages: ['STEM科技类', '医护健康', '法语复合人才', '技工行业', '运输物流'],
    hotBadge: 'PNP省提名额外加600分',
    summaryNote: '综合排名CRS打分体系；STEM与医护享有定向降分抽选，省提名直接加600分保录。',
  },
  {
    code: 'DE',
    name: 'Germany',
    nativeName: '德国',
    flag: '🇩🇪',
    region: 'Europe',
    coordinates: [10.4515, 51.1657],
    prChannel: '欧盟蓝卡 (EU Blue Card) / 机会卡 (Chancenkarte)',
    workVisa: '18 个月找工作签证 (Jobseeker)',
    processingTime: '3 - 6 个月',
    medianIncome: '€55,000 - €90,000',
    difficulty: '适中',
    difficultyColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    shortages: ['软件研发', '电气/机械工程', '可再生能源', '临床医学', '数控技工'],
    hotBadge: '21-27个月光速永居',
    summaryNote: '2024新移民法降低蓝卡薪资门槛；德语B1仅需21个月即可换取德国永久居留。',
  },
  {
    code: 'IE',
    name: 'Ireland',
    nativeName: '爱尔兰',
    flag: '🇮🇪',
    region: 'Europe',
    coordinates: [-8.2439, 53.4129],
    prChannel: '关键技能工作许可 (CSEP) / Stamp 4 快速通道',
    workVisa: '2 年 Third Level Graduate Scheme',
    processingTime: '2 - 4 个月',
    medianIncome: '€50,000 - €105,000',
    difficulty: '适中',
    difficultyColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    shortages: ['硅谷欧洲总部研发', '生物制药', '金融精算', '数据科学'],
    hotBadge: '2年直转 Stamp 4 绿卡',
    summaryNote: '欧洲唯一母语为英语的欧盟+英国双通行国；CSEP工作满2年直转Stamp 4永居。',
  },
  {
    code: 'SE',
    name: 'Sweden',
    nativeName: '瑞典',
    flag: '🇸🇪',
    region: 'Europe',
    coordinates: [18.6435, 60.1282],
    prChannel: '北欧高技能人才工签 / 4年转永居通道',
    workVisa: '1 年毕业求职居留许可',
    processingTime: '3 - 6 个月',
    medianIncome: '45,000 - 85,000 SEK/月',
    difficulty: '适中',
    difficultyColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    shortages: ['ICT软件通信', '绿色电池工程', '自动化', '生物医学'],
    hotBadge: '福利天花板 / 全家随迁',
    summaryNote: '雇主Offer达标即可获批工签，工作满4年申请永久居留，享顶级北欧社会福利。',
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    nativeName: '英国',
    flag: '🇬🇧',
    region: 'Europe',
    coordinates: [-3.4360, 55.3781],
    prChannel: 'Skilled Worker Visa / Global Talent 杰出人才',
    workVisa: '2 年 Graduate Route 毕业生签证',
    processingTime: '3 - 8 周 (快速通道)',
    medianIncome: '£42,000 - £85,000',
    difficulty: '严谨',
    difficultyColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    shortages: ['人工智能与算法', '金融科技量化', '专科医疗', '高等科研'],
    hotBadge: '5年工作转 ILR 永居',
    summaryNote: '持有合规担保雇主CoS且达到薪资中位数，5年转英国永居；全球英才免担保。',
  },
  {
    code: 'SG',
    name: 'Singapore',
    nativeName: '新加坡',
    flag: '🇸🇬',
    region: 'Asia',
    coordinates: [103.8198, 1.3521],
    prChannel: 'COMPASS 积分制互补专才 / ONE Pass 顶级专才',
    workVisa: 'EP (Employment Pass) / S Pass',
    processingTime: '1 - 3 个月',
    medianIncome: 'SG$75,000 - $180,000',
    difficulty: '极高竞争',
    difficultyColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    shortages: ['AI与半导体芯片', '家族办公室/资管', '云架构安全', 'Web3金融'],
    hotBadge: '亚太金融枢纽 / 极低个税',
    summaryNote: 'COMPASS积分制40分准入门槛；高薪技术人才薪水与名校学历具备显著加分优势。',
  },
];

export const WorldMapMatrix: React.FC<WorldMapMatrixProps> = ({
  selectedCountry,
  onSelectCountry,
  onStartEvaluation,
}) => {
  const [activeRegion, setActiveRegion] = useState<'ALL' | 'Oceania' | 'Europe' | 'North America' | 'Asia'>('ALL');
  const [hoveredNode, setHoveredNode] = useState<MapCountryNode | null>(null);
  const [pinnedCountries, setPinnedCountries] = useState<CountryCode[]>(['NZ', 'AU', 'CA']);

  const filteredNodes = activeRegion === 'ALL'
    ? MAP_NODES
    : MAP_NODES.filter((n) => n.region === activeRegion);

  const togglePinCountry = (code: CountryCode, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (pinnedCountries.includes(code)) {
      setPinnedCountries(pinnedCountries.filter((c) => c !== code));
    } else {
      if (pinnedCountries.length >= 3) {
        setPinnedCountries([...pinnedCountries.slice(1), code]);
      } else {
        setPinnedCountries([...pinnedCountries, code]);
      }
    }
  };

  return (
    <div className="relative w-full rounded-3xl border border-zinc-800 bg-zinc-950/95 overflow-hidden shadow-2xl">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <span>全球发达国家移民与签证全景交互地图</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                2026 实时法案
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              精准覆盖大洋洲、北美、欧洲与亚洲等核心发达目的地，点击航标即可探索居留门槛与紧缺工种
            </p>
          </div>
        </div>

        {/* Region Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
          {[
            { id: 'ALL', label: '全球全景' },
            { id: 'Oceania', label: '大洋洲 (澳/新)' },
            { id: 'North America', label: '北美 (加拿大)' },
            { id: 'Europe', label: '欧洲 (德/爱/瑞/英)' },
            { id: 'Asia', label: '亚洲 (新加坡)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveRegion(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRegion === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* High Precision Map Canvas */}
      <div className="relative w-full aspect-[2.1/1] min-h-[420px] max-h-[580px] bg-[#05070D] flex items-center justify-center overflow-hidden select-none">
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{
            scale: 165,
            center: [12, 10],
          }}
          className="w-full h-full"
        >
          {/* Subtle Latitude/Longitude Graticule */}
          <Graticule stroke="rgba(255, 255, 255, 0.04)" strokeWidth={0.5} />
          <Sphere stroke="rgba(6, 182, 212, 0.15)" strokeWidth={0.75} id="sphere" fill="transparent" />

          {/* Real World Vector Geographies */}
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#0F172A"
                    stroke="#1E293B"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none', transition: 'all 250ms' },
                      hover: { fill: '#1E293B', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Interactive Country Markers */}
          {filteredNodes.map((node) => {
            const isSelected = selectedCountry === node.code;

            return (
              <Marker
                key={node.code}
                coordinates={node.coordinates}
                onClick={() => {
                  onSelectCountry(node.code);
                  setHoveredNode(node);
                }}
                onMouseEnter={() => setHoveredNode(node)}
                className="cursor-pointer group"
              >
                {/* Outer Pulsing Glow */}
                <circle r={18} fill="none" stroke="#06B6D4" strokeWidth={1.5} opacity={0.4} className="animate-ping" />
                <circle r={24} fill="none" stroke="#10B981" strokeWidth={0.75} opacity={0.2} />

                {/* Core Marker Node */}
                <circle
                  r={isSelected ? 8 : 6}
                  fill={isSelected ? '#00F2FE' : '#0F172A'}
                  stroke={isSelected ? '#FFFFFF' : '#38BDF8'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  className="transition-all duration-300 group-hover:scale-125"
                />

                {/* Micro Flag Label */}
                <g transform="translate(10, -8)">
                  <rect
                    rx={4}
                    width={56}
                    height={18}
                    fill="rgba(10, 15, 29, 0.9)"
                    stroke={isSelected ? '#06B6D4' : '#334155'}
                    strokeWidth={1}
                  />
                  <text
                    x={4}
                    y={13}
                    fill="#F1F5F9"
                    fontSize={10}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                  >
                    {node.flag} {node.code}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>

        {/* Hover Snapshot Micro-Card (Interactive Overlay) */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ duration: 0.2 }}
              className="absolute z-30 bottom-6 right-6 w-96 max-w-[92vw] p-5 rounded-2xl glass-panel border border-cyan-500/40 bg-zinc-900/95 shadow-2xl backdrop-blur-2xl"
            >
              {/* Micro-Card Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{hoveredNode.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{hoveredNode.nativeName}</h4>
                      <span className="text-xs text-zinc-400 font-mono">({hoveredNode.name})</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-medium">
                      {hoveredNode.hotBadge}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setHoveredNode(null)}
                  className="p-1 text-zinc-500 hover:text-zinc-300 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Policy Snapshot Metrics */}
              <div className="py-3 space-y-2 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-zinc-400 flex items-center gap-1 shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> 核心通道:
                  </span>
                  <span className="font-medium text-zinc-200 text-right">{hoveredNode.prChannel}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" /> 毕业工签 (PSWV):
                  </span>
                  <span className="font-medium text-emerald-300 font-mono">{hoveredNode.workVisa}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> 中位年薪参考:
                  </span>
                  <span className="font-mono text-amber-300">{hoveredNode.medianIncome}</span>
                </div>

                {/* Summary Note */}
                <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-[11px] text-zinc-300 leading-relaxed">
                  💡 {hoveredNode.summaryNote}
                </div>

                {/* Shortage Tags */}
                <div className="pt-1">
                  <span className="text-[11px] text-zinc-400 block mb-1">重点紧缺大类:</span>
                  <div className="flex flex-wrap gap-1">
                    {hoveredNode.shortages.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-zinc-800 flex items-center gap-2">
                <button
                  onClick={(e) => togglePinCountry(hoveredNode.code, e)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition ${
                    pinnedCountries.includes(hoveredNode.code)
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  {pinnedCountries.includes(hoveredNode.code) ? '已加入对比' : '+ 对比'}
                </button>

                <button
                  onClick={() => onStartEvaluation(hoveredNode.code)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-neon-cyan flex items-center justify-center gap-1.5 transition"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>精准测算此国</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Comparison Dock (Bottom) */}
      {pinnedCountries.length > 0 && (
        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                主流目的地多维横向对比看板 ({pinnedCountries.length}/3)
              </span>
            </div>
            <button
              onClick={() => setPinnedCountries([])}
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              清空对比
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pinnedCountries.map((code) => {
              const node = MAP_NODES.find((m) => m.code === code) || MAP_NODES[0]!;
              return (
                <div
                  key={code}
                  className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/40 transition relative group flex flex-col justify-between"
                >
                  <button
                    onClick={(e) => togglePinCountry(code, e)}
                    className="absolute top-2.5 right-2.5 p-1 text-zinc-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-2xl">{node.flag}</span>
                      <div>
                        <h5 className="text-xs font-bold text-white">{node.nativeName}</h5>
                        <span className="text-[10px] text-cyan-400 font-mono line-clamp-1">{node.prChannel}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-zinc-300 font-mono">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">工签年限:</span>
                        <span className="text-emerald-400">{node.workVisa}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">中位薪资:</span>
                        <span>{node.medianIncome}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">审理周期:</span>
                        <span className="text-zinc-400">{node.processingTime}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartEvaluation(code)}
                    className="mt-3 w-full py-1.5 rounded-xl bg-zinc-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-zinc-300 text-[11px] font-medium transition flex items-center justify-center gap-1 border border-zinc-700"
                  >
                    <span>进行 {node.nativeName} 路径测算</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
