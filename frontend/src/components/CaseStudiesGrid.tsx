import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Scale,
  Compass,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';

interface CaseStudiesGridProps {
  onStartAssessment?: (countryCode?: CountryCode) => void;
}

export const CaseStudiesGrid: React.FC<CaseStudiesGridProps> = () => {
  const navigate = useNavigate();

  return (
    <section id="case-studies" className="space-y-6 max-w-6xl mx-auto select-none pt-4">
      {/* Section Header with High-Conversion Subtitle */}
      <div className="text-center space-y-2.5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[11px] font-mono font-semibold text-stone-800">
          <span>CASE STUDIES // 真实决策复盘</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl text-stone-900 font-bold tracking-tight">
          三大真实决策案例：认知差距如何决定一生走向
        </h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium bg-[#efe9de]/50 py-2 px-4 rounded-xl border border-[#e6dfd8] max-w-2xl mx-auto">
          💡 <span className="font-bold text-[#c2410c]">破除信息差：</span>海外工签与技术移民规划从不是富人特权，普通工薪家庭如何用 50 万预算实现高 ROI 稳妥破局？
        </p>
      </div>

      {/* 3-Column Comparison Grid with Framer Motion Micro-Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* ================= CASE 1 ================= */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl bg-[#faf2f2] border border-[#f5dada] p-6 shadow-card-soft flex flex-col justify-between space-y-5 hover:border-[#c64545]/60 hover:shadow-[0_12px_24px_rgba(198,69,69,0.1)] transition-all"
        >
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-[#fae5e5] text-[#c64545] border border-[#f5c6c6] text-xs font-bold font-mono">
                  ❌ 踩坑预警
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#faf9f5] text-stone-700 text-[11px] font-medium border border-[#f5dada]">
                  高投入低留存
                </span>
              </div>
              <span className="font-mono text-xs text-[#c64545] font-bold">CASE 01</span>
            </div>

            {/* Case Title */}
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                盲目冲高开销专业 · 300万沉没成本困局
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                国内学生赴美攻读 Top 50 本科「环境科学」专业
              </p>
            </div>

            {/* Cost & Sunk Stats Box */}
            <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#f5dada] space-y-1">
              <div className="text-[11px] font-mono text-stone-500">四年总沉没成本支出</div>
              <div className="font-serif text-2xl font-bold text-[#c64545]">
                逾 300 万+ <span className="text-xs font-sans font-normal text-stone-500">人民币</span>
              </div>
            </div>

            {/* Pain Points Breakdown */}
            <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#c64545]" />
                <span>困局与痛点：</span>
              </div>
              <p className="bg-[#faf9f5]/80 p-3 rounded-xl border border-[#f5dada]/80 text-[11px] text-stone-600">
                环境科学属于非紧缺冷门岗，毕业仅 1 年 OPT 且无 STEM 延期。因 H-1B 仅有 1 次抽签机会且中签率低于 15%，加之 EB-2 职业移民中国大陆排期长达 10 年，被迫在工签到期前回国。
              </p>
            </div>

            {/* Retrospective Takeaway */}
            <div className="p-3 rounded-xl bg-[#fae5e5]/50 border border-[#f5c6c6] space-y-1 text-xs">
              <div className="font-bold text-[#c64545] text-[11px] uppercase tracking-wider font-mono">
                💡 决策复盘
              </div>
              <p className="text-[11px] text-stone-700 leading-snug">
                忽视了“专业属性与目的国工签/绿卡政策脱节”的致命盲区，单纯看大学综合排名而忽略了就业身份闭环。
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              onClick={() => navigate('/visas/nz_smc')}
              className="w-full py-2.5 rounded-xl bg-[#fae5e5] hover:bg-[#c64545] text-[#c64545] hover:text-white border border-[#f5c6c6] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>查看新西兰 SMC 6分制替代法案</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-[10px] font-mono text-stone-400">✨ 100% 免费评估 · 45秒快速生成</span>
          </div>
        </motion.div>

        {/* ================= CASE 2 ================= */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl bg-[#f2f8f3] border border-[#d4edd9] p-6 shadow-card-soft flex flex-col justify-between space-y-5 hover:border-[#2e7d32]/60 hover:shadow-[0_12px_24px_rgba(46,125,50,0.1)] transition-all"
        >
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-[#e3f4e6] text-[#2e7d32] border border-[#c5e8ce] text-xs font-bold font-mono">
                  ✅ 破局通道
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#faf9f5] text-stone-700 text-[11px] font-medium border border-[#d4edd9]">
                  精准锁定绿色名单
                </span>
              </div>
              <span className="font-mono text-xs text-[#2e7d32] font-bold">CASE 02</span>
            </div>

            {/* Case Title */}
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                紧缺清单前置锚定 · 50万预算高效超车
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                工科学生精准选新西兰/爱尔兰 Green List / CSEP 硕士
              </p>
            </div>

            {/* Cost & Sunk Stats Box */}
            <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#d4edd9] space-y-1">
              <div className="text-[11px] font-mono text-stone-500">1.5年学费加生活费总成本</div>
              <div className="font-serif text-2xl font-bold text-[#2e7d32]">
                40 ~ 50 万 <span className="text-xs font-sans font-normal text-stone-500">人民币</span>
              </div>
            </div>

            {/* Pain Points Breakdown */}
            <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7d32]" />
                <span>破局与收获：</span>
              </div>
              <p className="bg-[#faf9f5]/80 p-3 rounded-xl border border-[#d4edd9]/80 text-[11px] text-stone-600">
                毕业即享 2-3 年开放工签（PSW），因专业属于 Tier 1 紧缺范畴，起薪达到时薪中位数即可直接一阶段豁免打分直通居留，26 岁前全额锁定海外永久回头签/Stamp 4。
              </p>
            </div>

            {/* Retrospective Takeaway */}
            <div className="p-3 rounded-xl bg-[#e3f4e6]/50 border border-[#c5e8ce] space-y-1 text-xs">
              <div className="font-bold text-[#2e7d32] text-[11px] uppercase tracking-wider font-mono">
                💡 决策复盘
              </div>
              <p className="text-[11px] text-stone-700 leading-snug">
                投资产出比（ROI）提升 600%，以移民局法定选拔标准反推选校与专业，直击政策最宽松红利窗口。
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              onClick={() => navigate('/visas/nz_green_list')}
              className="w-full py-2.5 rounded-xl bg-[#e3f4e6] hover:bg-[#2e7d32] text-[#2e7d32] hover:text-white border border-[#c5e8ce] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>查看新西兰绿名单 Tier 1 直通细则</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-[10px] font-mono text-stone-400">✨ 100% 免费评估 · 45秒快速生成</span>
          </div>
        </motion.div>

        {/* ================= CASE 3 ================= */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl bg-[#fdf6e2]/60 border border-[#f4e2a8] p-6 shadow-card-soft flex flex-col justify-between space-y-5 hover:border-[#996500]/60 hover:shadow-[0_12px_24px_rgba(153,101,0,0.1)] transition-all"
        >
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-[#fdf2cd] text-[#996500] border border-[#f4e2a8] text-xs font-bold font-mono">
                  ⚖️ 对冲策略
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#faf9f5] text-stone-700 text-[11px] font-medium border border-[#f4e2a8]">
                  规避单点政策收紧
                </span>
              </div>
              <span className="font-mono text-xs text-[#996500] font-bold">CASE 03</span>
            </div>

            {/* Case Title */}
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                英澳加风暴接盘 vs 欧陆/日本多轨对冲
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                文商科/泛IT留学生遭遇传统大国政策暴涨的破局
              </p>
            </div>

            {/* Cost & Sunk Stats Box */}
            <div className="p-3.5 rounded-2xl bg-[#faf9f5] border border-[#f4e2a8] space-y-1">
              <div className="text-[11px] font-mono text-stone-500">学费负担与获邀周期</div>
              <div className="font-serif text-2xl font-bold text-[#996500]">
                德法免学费 · <span className="text-xs font-sans font-normal text-stone-500">日元汇率红利</span>
              </div>
            </div>

            {/* Pain Points Breakdown */}
            <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#996500]" />
                <span>对冲策略方案：</span>
              </div>
              <p className="bg-[#faf9f5]/80 p-3 rounded-xl border border-[#f4e2a8]/80 text-[11px] text-stone-600">
                建立多轨模型——将申请组合对冲至「德国机会卡 / 欧盟蓝卡（21月永居）」与「日本高度人才 80 分（1年永住）」，彻底免受英国工签 £38.7k 断崖式收紧的冲击。
              </p>
            </div>

            {/* Retrospective Takeaway */}
            <div className="p-3 rounded-xl bg-[#fdf2cd]/60 border border-[#f4e2a8] space-y-1 text-xs">
              <div className="font-bold text-[#996500] text-[11px] uppercase tracking-wider font-mono">
                💡 决策复盘
              </div>
              <p className="text-[11px] text-stone-700 leading-snug">
                告别“盲从传统四大国”，用全球决策矩阵实现家庭资产投入与海外身份路径的最优对冲。
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 pt-1">
            <button
              onClick={() => navigate('/visas/de_blue_card')}
              className="w-full py-2.5 rounded-xl bg-[#fdf2cd] hover:bg-[#996500] text-[#996500] hover:text-white border border-[#f4e2a8] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs group"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>查看德国欧盟蓝卡与机会卡法案</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-[10px] font-mono text-stone-400">💡 紧缺年薪 €41k + 21个月转德国永居</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
