import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Award,
  CalendarCheck,
  ChevronRight,
  Clock,
  Layers,
  Lightbulb,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import type { EvaluationResult } from '@emigrant/shared';

interface ResultDashboardProps {
  result: EvaluationResult;
  onReset: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, onReset }) => {
  useEffect(() => {
    if (result.isEligible) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00F2FE', '#4FACFE', '#10B981', '#F59E0B'],
      });
    }
  }, [result.isEligible]);

  const percentage = Math.min(100, Math.round((result.totalScore / result.thresholdScore) * 100));

  const categoryLabels: Record<string, string> = {
    age: '申请人年龄加分',
    education: '最高学历与学位背景',
    language: '语言水平评级 (IELTS/PTE)',
    experience_overseas: '海外紧缺工作资历',
    experience_local: '目标国本地工签资历',
    job_offer: '本地雇主Offer / 薪资倍数',
    partner: '配偶综合技能加成',
    stem_specialist: 'STEM 专业研究型学历',
    state_nomination: '州政府担保 / 省提名加成',
    general: '其他官方附加项 (NAATI/PY)',
    salary_benchmark: '高薪直通基准支柱',
  };

  const estimatedTimelines: Record<string, string> = {
    nz_smc: '6 - 9 个月 (居留快速通道)',
    au_189: '3 - 12 个月 (按分数轮次择优邀请)',
    au_190: '6 - 12 个月 (州担保获批后转永居)',
    ca_ee_fsw: '6 个月 (联邦快速通道全流程)',
  };

  const timeline = estimatedTimelines[result.visaId] || '6 - 12 个月';

  return (
    <div id="result-dashboard" className="w-full max-w-5xl mx-auto my-8 space-y-6">
      {/* 1. Hero Verdict & Score Gauge Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-panel p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
          result.isEligible
            ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/25 via-zinc-900/90 to-cyan-950/30'
            : result.passThreshold
            ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/25 via-zinc-900/90 to-zinc-950/90'
            : 'border-rose-500/40 bg-gradient-to-br from-rose-950/25 via-zinc-900/90 to-zinc-950/90'
        }`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
            result.isEligible ? 'bg-emerald-500/10' : 'bg-rose-500/10'
          }`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column: Verdict Badge & Copy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase flex items-center gap-1.5 border ${
                  result.isEligible
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-neon-emerald'
                    : result.passThreshold
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-neon-amber'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}
              >
                {result.isEligible ? (
                  <>
                    <ShieldCheck className="w-4 h-4" /> 核心准入判定：符合 2026 法定邀请与申请标准
                  </>
                ) : result.passThreshold ? (
                  <>
                    <ShieldAlert className="w-4 h-4" /> 评分达标，但需补充前置法定必要条件
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> 核心准入判定：目前总分低于基准线 (缺 {result.gapAnalysis.pointsShortage} 分)
                  </>
                )}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {result.visaName}
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {result.isEligible
                ? `您的综合画像已完全满足 ${result.visaName} 的法定准入要求。总得分达到 ${result.totalScore} 分（官方基准线 ${result.thresholdScore} 分），具备极高获邀申请成功率。`
                : result.meetsMandatoryRequirements
                ? `您的各项法定资格基础合规，但当前总分 ${result.totalScore} 分暂未达到官方优先获邀基准线 (${result.thresholdScore} 分)。建议根据下方的提分路径进行针对性突破。`
                : `存在 ${result.disqualificationReasons.length} 项前置硬性条件暂未达标，请重点排查前置指标（如年龄上限、语言门槛或本地合规 Offer）。`}
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-zinc-500">预估审批周期:</span>
                <span className="text-cyan-300 font-semibold">{timeline}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900/90 px-3 py-1.5 rounded-xl border border-zinc-800">
                <CalendarCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-500">法案适用批次:</span>
                <span className="text-emerald-300 font-semibold">2026 年度配额</span>
              </div>
            </div>

            {/* Disqualification List if any */}
            {result.disqualificationReasons.length > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> 前置硬性条件未达标清单：
                </div>
                {result.disqualificationReasons.map((reason, idx) => (
                  <div key={idx} className="pl-5 list-disc">
                    • {reason}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Score Circular Gauge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 backdrop-blur-md">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer Ring SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-zinc-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className={result.isEligible ? 'stroke-emerald-400' : 'stroke-cyan-400'}
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * Math.min(100, percentage)) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                />
              </svg>

              {/* Center Score Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black font-mono text-white">
                  {result.totalScore}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  / 基准 {result.thresholdScore} 分
                </span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs font-mono font-semibold text-cyan-300">
                评分达标率: {percentage}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Score Dimension Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Category Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" /> 各维度得分细则与贡献比 (Score Breakdown)
            </h4>
            <span className="text-xs font-mono text-zinc-400">
              共命中 {Object.keys(result.scoreByCategory).length} 项有效加分
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(result.scoreByCategory).map(([cat, score]) => (
              <div key={cat} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">{categoryLabels[cat] || cat}</span>
                  <span className="text-cyan-300 font-bold">+{score} 分</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                    style={{ width: `${Math.min(100, (score / result.thresholdScore) * 100 * 2)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Policy Rule Mutual Exclusion Resolution */}
        <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> 政策互斥与上限封顶结算 (Rule Alignment)
            </h4>
            <span className="text-xs font-mono text-emerald-400">法案智能对齐</span>
          </div>

          <div className="space-y-3">
            {Object.keys(result.capGroupSummaries).length > 0 ? (
              Object.entries(result.capGroupSummaries).map(([groupName, summary]) => (
                <div
                  key={groupName}
                  className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-zinc-200">
                      {groupName === 'nz_skill_pillar'
                        ? '新西兰技能三支柱 (学历/薪资/注册互斥取最高)'
                        : groupName === 'nz_exp_pillar'
                        ? '新西兰本地经验支柱 (上限封顶3分)'
                        : groupName === 'au_age'
                        ? '澳洲年龄梯度 (排他单选)'
                        : groupName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      计入得分: {summary.appliedPoints} 分 / 上限 {summary.capLimit} 分
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    根据移民法案规范，该项已为您自动选取最高性价比得分项。
                  </p>
                </div>
              ))
            ) : (
              <div className="text-xs text-zinc-500 py-6 text-center">
                当前通道无互斥分组限制，所有命中加分项均以标准线性累加
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Actionable Quick-Wins Pathways */}
      {result.gapAnalysis.potentialScenarios.length > 0 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 space-y-4 bg-gradient-to-b from-cyan-950/20 to-zinc-900/90 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                3 个最快提分行动建议 (Actionable Quick-Wins)
              </h3>
              <p className="text-xs text-zinc-400">
                根据您的背景短板与 2026 最新政策红利，为您规划的最高性价比提分路线
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {result.gapAnalysis.potentialScenarios.map((scenario, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-cyan-500/40 transition group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                    {scenario.scenarioTitle}
                  </h5>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                    +{scenario.potentialAdditionalPoints} 分
                  </span>
                </div>

                <p className="text-xs text-zinc-300 mb-3">{scenario.description}</p>

                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">
                    实施难度: <span className="text-amber-400">{scenario.effortLevel === 'low' ? '低 (推荐优先)' : scenario.effortLevel === 'medium' ? '适中' : '需长期准备'}</span>
                  </span>
                  <span className="text-cyan-400 flex items-center gap-0.5">
                    {scenario.actionableStep} <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Action Buttons Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 重新调整背景画像
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-neon-cyan transition"
        >
          <Award className="w-3.5 h-3.5" /> 导出 2026 个人专属规划报告
        </button>
      </div>
    </div>
  );
};
