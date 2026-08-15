import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertOctagon,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';

interface LandingHeroProps {
  onStartAssessment: (countryCode?: CountryCode) => void;
  onExplorePolicies: () => void;
}

interface ProfessionComparison {
  id: string;
  name: string;
  icon: string;
  hotness: string;
  nodes: {
    country: string;
    flag: string;
    code: CountryCode;
    status: 'high' | 'medium' | 'hard';
    badge: string;
    detail: string;
    successRate: string;
  }[];
}

const PROFESSIONS: ProfessionComparison[] = [
  {
    id: 'cs',
    name: '计算机 / 软件研发',
    icon: '💻',
    hotness: '极高需求 · 区域分化',
    nodes: [
      {
        country: '新西兰',
        flag: '🇳🇿',
        code: 'NZ',
        status: 'high',
        badge: '硕士6分直通PR',
        detail: 'Tier 1 绿名单免打分，本地工作1年即满6分永居',
        successRate: '留存率 86%',
      },
      {
        country: '德国',
        flag: '🇩🇪',
        code: 'DE',
        status: 'high',
        badge: '蓝卡 21月永居',
        detail: '紧缺行业年薪门槛降至 €41,041，21个月B1直接转永居',
        successRate: '留存率 82%',
      },
      {
        country: '加拿大',
        flag: '🇨🇦',
        code: 'CA',
        status: 'high',
        badge: 'STEM 定向抽选',
        detail: '3年 PGWP 毕业工签，Express Entry STEM 类别低分邀请',
        successRate: '留存率 75%',
      },
      {
        country: '澳大利亚',
        flag: '🇦🇺',
        code: 'AU',
        status: 'medium',
        badge: 'EOI 85分高位内卷',
        detail: 'ACS 职评收紧，189独立技术需拼 PTE 满分及州担保',
        successRate: '留存率 38%',
      },
      {
        country: '美国 / 英国',
        flag: '🇺🇸',
        code: 'UK',
        status: 'hard',
        badge: 'H-1B <15% / £38.7k',
        detail: '美 H-1B 抽签中签率暴跌，英工签门槛大幅上调',
        successRate: '留存率 12%',
      },
    ],
  },
  {
    id: 'nursing',
    name: '医疗护理 / 物理治疗',
    icon: '🩺',
    hotness: '全球硬通货 · 极速获邀',
    nodes: [
      {
        country: '澳大利亚',
        flag: '🇦🇺',
        code: 'AU',
        status: 'high',
        badge: '189/190 极速秒邀',
        detail: '注册护士享受移民局优先轮次，65分裸分即获永居邀请',
        successRate: '留存率 95%',
      },
      {
        country: '新西兰',
        flag: '🇳🇿',
        code: 'NZ',
        status: 'high',
        badge: '绿名单直接居留',
        detail: 'Straight to Residence 一阶段直发 PR 绿卡',
        successRate: '留存率 94%',
      },
      {
        country: '爱尔兰',
        flag: '🇮🇪',
        code: 'IE',
        status: 'high',
        badge: 'CSEP 2年直通Stamp4',
        detail: '医疗紧缺通道免劳工测试，工作满2年直换永居',
        successRate: '留存率 89%',
      },
      {
        country: '英国',
        flag: '🇬🇧',
        code: 'UK',
        status: 'medium',
        badge: 'Health & Care Visa',
        detail: '豁免 £38.7k 高薪要求，但已取消家属陪读签证',
        successRate: '留存率 65%',
      },
    ],
  },
  {
    id: 'teaching',
    name: '幼教 / 中学教育',
    icon: '👶',
    hotness: '紧缺红利 · 语言门槛高',
    nodes: [
      {
        country: '澳大利亚',
        flag: '🇦🇺',
        code: 'AU',
        status: 'high',
        badge: '优先批复通道',
        detail: 'AITSL 职评 7788 语言通过后，各州抢录提供 190 绿卡',
        successRate: '留存率 92%',
      },
      {
        country: '新西兰',
        flag: '🇳🇿',
        code: 'NZ',
        status: 'high',
        badge: 'GD 1年获注册教师',
        detail: '完成 NZQA 认可教师资格，毕业即获认证雇主聘书与 PR',
        successRate: '留存率 90%',
      },
      {
        country: '加拿大',
        flag: '🇨🇦',
        code: 'CA',
        status: 'medium',
        badge: '省提名教育专项',
        detail: 'BC / 安省教育专项通道，需配合本地教师执照',
        successRate: '留存率 68%',
      },
    ],
  },
  {
    id: 'engineering',
    name: '工程 / 自动化与机电',
    icon: '🏗️',
    hotness: '稳健技术移民',
    nodes: [
      {
        country: '德国',
        flag: '🇩🇪',
        code: 'DE',
        status: 'high',
        badge: '工业核心蓝卡',
        detail: '德国制造业核心支柱，工程师职位极易获批蓝卡与永居',
        successRate: '留存率 87%',
      },
      {
        country: '新西兰',
        flag: '🇳🇿',
        code: 'NZ',
        status: 'high',
        badge: '绿名单 Tier 1',
        detail: 'IPENZ / Washington Accord 互认直接走快速居留',
        successRate: '留存率 84%',
      },
      {
        country: '澳大利亚',
        flag: '🇦🇺',
        code: 'AU',
        status: 'medium',
        badge: 'EA CDR / 190州担',
        detail: '需通过 EA 工程师评估，西澳与南澳配额相对充足',
        successRate: '留存率 58%',
      },
    ],
  },
  {
    id: 'business',
    name: '金融 / 会计与商科',
    icon: '📊',
    hotness: '极度内卷 · 需策略转型',
    nodes: [
      {
        country: '新西兰',
        flag: '🇳🇿',
        code: 'NZ',
        status: 'medium',
        badge: '高薪直通 (1.5x薪资)',
        detail: '达时薪 NZD 50.34 获 3分，结合硕士 5分直接超额通过',
        successRate: '留存率 45%',
      },
      {
        country: '澳大利亚',
        flag: '🇦🇺',
        code: 'AU',
        status: 'hard',
        badge: 'EOI 95分+ 地狱级',
        detail: '会计审计获邀分已突破 95 分，裸申几无可能',
        successRate: '留存率 15%',
      },
      {
        country: '英国 / 新加坡',
        flag: '🇬🇧',
        code: 'SG',
        status: 'hard',
        badge: 'COMPASS $6.2k / £38.7k',
        detail: '新加坡金融 EP 门槛升至 $6,200，英国工签门槛封死初级岗',
        successRate: '留存率 10%',
      },
    ],
  },
];

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAssessment,
  onExplorePolicies,
}) => {
  const [selectedProfession, setSelectedProfession] = useState<string>('cs');

  const activeProf =
    PROFESSIONS.find((p) => p.id === selectedProfession) || PROFESSIONS[0]!;

  return (
    <section className="relative pt-6 pb-10 space-y-8 select-none">
      {/* 1. Header Badges & Typography */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        {/* Badge Pill (Claude / OpenTheRank style) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efe9de] border border-[#e6dfd8] shadow-card-soft text-xs text-[#3d3d3a]">
          <span className="w-2 h-2 rounded-full bg-[#5db872] animate-pulse" />
          <span className="font-mono font-medium tracking-wide">
            🌐 2026 全球移民与工签决策情报
          </span>
          <span className="text-[#cc785c] font-semibold text-[11px] pl-1 border-l border-[#d8cfc4]">
            法案库实时对齐
          </span>
        </div>

        {/* Hero Display Headline (Huge Editorial Contrast) */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#141413] font-normal tracking-tight-display leading-[1.15]">
          同一个专业，换一个国家，
          <br />
          <span className="text-[#cc785c] font-bold">
            结局天差地别。
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#6c6a64] max-w-2xl mx-auto leading-relaxed font-sans">
          每年数十万留学生因信息差陷入“读完即送中”的困境。
          <br className="hidden sm:inline" />
          VisaRank 实时对齐 2026 各国移民法案，用真实数据助你打破信息壁垒。
        </p>

        {/* CTA Buttons Cluster */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => onStartAssessment('NZ')}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#cc785c] hover:bg-[#a9583e] active:bg-[#91462f] text-white text-sm font-semibold shadow-card-hover flex items-center justify-center gap-2 transition-all duration-150 transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>开始智能路径测算</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExplorePolicies}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#efe9de] hover:bg-[#e8e0d2] text-[#141413] border border-[#e6dfd8] text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#6c6a64]" />
            <span>浏览 2026 全球法案库</span>
          </button>
        </div>
      </div>

      {/* 2. Pain-Point Stats Grid (3-Column Contrast Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto pt-2">
        {/* Stat 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] shadow-card-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8e8b82]">
            <span className="font-mono">COST & SUNK RISK</span>
            <AlertOctagon className="w-4 h-4 text-[#c64545]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#141413]">
              78.4%
            </span>
            <span className="text-xs font-semibold text-[#c64545] font-mono">
              留学成本清零率
            </span>
          </div>
          <p className="text-[11px] text-[#6c6a64] leading-relaxed">
            人均 300万+ 留学预算因选错无工签衔接通道的国家，导致资金与应届求职窗口双重落空。
          </p>
        </div>

        {/* Stat 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] shadow-card-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8e8b82]">
            <span className="font-mono">POLICY PRESSURE INDEX</span>
            <TrendingUp className="w-4 h-4 text-[#d4a017]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#141413]">
              92.0
            </span>
            <span className="text-xs font-semibold text-[#c64545] font-mono">
              485工签与H1B紧缩指数
            </span>
          </div>
          <p className="text-[11px] text-[#6c6a64] leading-relaxed">
            澳洲485降至35岁上限、英年薪上调至£38.7k、美抽签率不足15%，传统留学国门槛急剧收紧。
          </p>
        </div>

        {/* Stat 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] shadow-card-soft space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8e8b82]">
            <span className="font-mono">RETENTION WINDOW</span>
            <CheckCircle2 className="w-4 h-4 text-[#5db872]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#141413]">
              1 ~ 2 年
            </span>
            <span className="text-xs font-semibold text-[#2e7d32] font-mono">
              确定性留存窗口期
            </span>
          </div>
          <p className="text-[11px] text-[#6c6a64] leading-relaxed">
            新西兰6分制、德国机会卡与爱尔兰CSEP等新兴路径，依然保留高确定性的快速上岸窗口。
          </p>
        </div>
      </div>

      {/* 3. Visual Interactive Global Node Showcase (1:1 with OpenTheRank Hero) */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#efe9de]/50 border border-[#e6dfd8] p-5 sm:p-7 space-y-6 shadow-card-soft">
        {/* Showcase Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e6dfd8] pb-4">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono text-[#8e8b82] uppercase tracking-wider">
              CROSS-BORDER DISPARITY VISUALIZER
            </div>
            <h3 className="font-serif text-lg font-bold text-[#141413]">
              选定专业跨国留存难度对比：<span className="text-[#cc785c]">{activeProf.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#6c6a64] bg-[#faf9f5] px-3 py-1.5 rounded-lg border border-[#e6dfd8]">
            <span className="w-2 h-2 rounded-full bg-[#cc785c]" />
            <span>{activeProf.hotness}</span>
          </div>
        </div>

        {/* Global Node Arcs & Result Cards Preview (OpenTheRank Concept) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {activeProf.nodes.map((node, idx) => (
            <div
              key={idx}
              onClick={() => onStartAssessment(node.code)}
              className="p-4 rounded-2xl bg-[#faf9f5] hover:bg-[#ffffff] border border-[#e6dfd8] hover:border-[#cc785c]/60 shadow-xs hover:shadow-card-hover transition-all cursor-pointer group space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{node.flag}</span>
                    <span className="font-bold text-sm text-[#141413] group-hover:text-[#cc785c] transition-colors">
                      {node.country}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      node.status === 'high'
                        ? 'bg-[#eaf6ed] text-[#2e7d32] border border-[#c5e8ce]'
                        : node.status === 'medium'
                        ? 'bg-[#fdf6e2] text-[#996500] border border-[#f4e2a8]'
                        : 'bg-[#faeaea] text-[#a62828] border border-[#f5c6c6]'
                    }`}
                  >
                    ● {node.successRate}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#141413] flex items-center gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#efe9de] text-[10px] font-mono text-[#3d3d3a]">
                      {node.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6c6a64] leading-snug">
                    {node.detail}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#e6dfd8]/60 flex items-center justify-between text-[11px] text-[#8e8b82] group-hover:text-[#cc785c]">
                <span>测算此国路径</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Profession Switcher Bar (Bottom of Hero Map) */}
        <div className="pt-3 border-t border-[#e6dfd8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#6c6a64] whitespace-nowrap">
            切换目标专业查看全球结局：
          </span>

          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end">
            {PROFESSIONS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProfession(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  selectedProfession === p.id
                    ? 'bg-[#181715] text-[#faf9f5] font-semibold shadow-sm'
                    : 'bg-[#faf9f5] text-[#6c6a64] hover:bg-[#e8e0d2] border border-[#e6dfd8]'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.name.split(' / ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
