import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  Loader2,
  Database,
  ShieldAlert,
  Activity,
  Binary,
  Layers,
} from 'lucide-react';

interface AssessmentCalculatingViewProps {
  onComplete: () => void;
  durationMs?: number; // default ~2800ms
}

interface StepItem {
  id: number;
  text: string;
  subtext: string;
  icon: React.ReactNode;
}

const CALCULATION_STEPS: StepItem[] = [
  {
    id: 1,
    text: '① 正在解析个人 6 维背景与紧缺资质画像...',
    subtext: '分析年龄梯度、学历认证层级、职业评估匹配与英语基准...',
    icon: <Binary className="w-4 h-4 text-[#c2410c]" />,
  },
  {
    id: 2,
    text: '② 实时并行检索 14 国 38 项最新立法准入门槛...',
    subtext: '载入 2026 最新官方公报规则、SMC/189/EE/蓝卡打分树...',
    icon: <Database className="w-4 h-4 text-[#0284c7]" />,
  },
  {
    id: 3,
    text: '③ 模拟各国最新中位数时薪、年龄惩罚与排期风险模型...',
    subtext: '运算各行业 TSMIT 薪资基准、名额配额容量与通胀滞纳阻尼...',
    icon: <Activity className="w-4 h-4 text-[#d97706]" />,
  },
  {
    id: 4,
    text: '④ 正在生成您的全球 Tier 1/2/3 适配梯队与致命避坑清单...',
    subtext: '构建定制化 3 年战略时间线、核心政策红线与避坑预警...',
    icon: <Layers className="w-4 h-4 text-[#10b981]" />,
  },
];

export const AssessmentCalculatingView: React.FC<AssessmentCalculatingViewProps> = ({
  onComplete,
  durationMs = 2800,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(10);

  useEffect(() => {
    const stepDuration = durationMs / CALCULATION_STEPS.length;

    // Progress counter timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const delta = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + delta, 99);
      });
    }, stepDuration / 5);

    // Step status machine timers
    const stepTimers: ReturnType<typeof setTimeout>[] = [];
    CALCULATION_STEPS.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setActiveStep(idx);
      }, idx * stepDuration);
      stepTimers.push(timer);
    });

    // Complete timer
    const finishTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        onComplete();
      }, 350);
    }, durationMs);

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full h-full min-h-[560px] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f5efe6] to-[#faf8f5]"
    >
      {/* Background Decorative Ambient Radial Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c2410c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0284c7]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full mx-auto space-y-8 z-10 flex flex-col items-center text-center">
        {/* Central Glowing Orbital Compass / Neural Computing Core */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Outer Dashed Orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-[#c2410c]/25"
          />

          {/* Middle Counter-Rotating Orbit with Particle Nodes */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-[#d97706]/30"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#c2410c] shadow-sm" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#0284c7] shadow-sm" />
          </motion.div>

          {/* Inner Glowing Radar Core */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#efe9de] via-white to-[#efe9de] border border-[#e6dfd8] shadow-card-soft flex items-center justify-center relative overflow-hidden"
          >
            {/* Core Radar Scan Line */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#c2410c]/15 to-transparent origin-center"
            />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <Cpu className="w-8 h-8 text-[#c2410c]" />
              <span className="text-[9px] font-mono font-bold text-stone-700 mt-1">
                AI MATCH
              </span>
            </div>
          </motion.div>
        </div>

        {/* Section Header & Live Telemetry Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[11px] font-mono text-stone-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>NEURAL EVALUATION ENGINE v2026.1</span>
            <span className="text-stone-300">|</span>
            <span className="text-[#c2410c] font-semibold">14 COUNTRIES · 46 PATHWAYS</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            正在为您智能匹配全球决策图谱
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 font-sans max-w-md mx-auto">
            系统正在综合年龄、资历、中位数时薪基准及紧缺法案条款进行多维蒙特卡洛矩阵推演...
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c2410c] animate-spin" />
              <span>多核策略实时验算中</span>
            </span>
            <span className="font-bold text-[#c2410c]">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-[#efe9de] rounded-full overflow-hidden border border-[#e6dfd8] p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#f97316] rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 blur-xs" />
            </motion.div>
          </div>
        </div>

        {/* 4-Step Dynamic Status Machine */}
        <div className="w-full bg-[#faf9f5]/80 backdrop-blur-xs rounded-2xl border border-[#e6dfd8] p-4 sm:p-5 shadow-card-soft text-left space-y-3">
          {CALCULATION_STEPS.map((step, idx) => {
            const isCompleted = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  isCurrent
                    ? 'bg-white border-[#c2410c]/30 shadow-xs ring-1 ring-[#c2410c]/10'
                    : isCompleted
                    ? 'bg-[#efe9de]/40 border-[#e6dfd8] text-stone-700'
                    : 'bg-transparent border-transparent opacity-40 text-stone-400'
                }`}
              >
                {/* State Icon Indicator */}
                <div className="mt-0.5 flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#c2410c] animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-stone-300 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-xs font-semibold font-serif leading-snug ${
                        isCurrent
                          ? 'text-[#c2410c]'
                          : isCompleted
                          ? 'text-stone-900'
                          : 'text-stone-400'
                      }`}
                    >
                      {step.text}
                    </p>
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold text-[#c2410c] bg-[#ffedd5] px-1.5 py-0.5 rounded border border-[#fed7aa] animate-pulse">
                        EXEC...
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-mono text-[#10b981] font-medium">
                        READY
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5 leading-tight truncate">
                    {step.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Security / Privacy Guarantee Note */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
          <ShieldAlert className="w-3.5 h-3.5 text-stone-400" />
          <span>本地端到端加密算力 · 不记录非必要私密画像 · 官方公开法案核验</span>
        </div>
      </div>
    </motion.div>
  );
};
