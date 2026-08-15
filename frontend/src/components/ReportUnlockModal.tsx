import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Sparkles,
  Lock,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Users,
  FileText,
  DollarSign,
  ArrowRight,
  Download,
} from 'lucide-react';

interface ReportUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCountryName: string;
  targetCountryFlag: string;
  profileSummary: string;
}

export const ReportUnlockModal: React.FC<ReportUnlockModalProps> = ({
  isOpen,
  onClose,
  targetCountryName,
  targetCountryFlag,
  profileSummary,
}) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleUnlockDemo = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPurchased(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative w-full max-w-2xl bg-[#faf9f5] rounded-3xl shadow-2xl border border-[#e6dfd8] overflow-hidden z-10 my-8"
      >
        {/* Header Ribbon */}
        <div className="bg-[#181715] text-[#faf9f5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{targetCountryFlag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-white">
                  【{targetCountryName}】个人专属 3 年跨国工签与永居推演研报
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#c2410c] text-white font-bold">
                  B2C 深度版
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                基于画像：{profileSummary} · 严谨对齐 2026 移民立法法案库
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto select-text">
          {!isPurchased ? (
            <>
              {/* 5 Core Deliverables Preview */}
              <div className="space-y-3">
                <div className="text-xs font-bold font-mono text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#c2410c]" />
                  <span>研报核心交付价值 (20+ 页高精度推演)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#c2410c]" />
                      <span>1. 逐月里程碑甘特推演</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      前置 6 个月备考/职评 ➔ 入境 1-24 个月薪资交税与评定 ➔ 递交 PR 黄金窗口精准排期。
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-[#c2410c]" />
                      <span>2. 避坑对冲方案 (Plan B)</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      若遭遇雇主倒闭、政策名额突变或裁员，如何无缝转轨备用工签与跨国对冲跳板。
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#c2410c]" />
                      <span>3. 同背景真实上岸案例库</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      检索 2024-2026 同等学历、工种与年龄申请人的真实获批用时、起薪谈判与实际踩坑复盘。
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-[#10b981]" />
                      <span>4. 跨国薪资合规与谈判指南</span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      传授如何与海外雇主在 Offer 中锁死法定中位数时薪、每周全职工时与岗位代码 (ANZSCO/NOC)。
                    </p>
                  </div>
                </div>
              </div>

              {/* Frosted Glass Blurred Sample Preview */}
              <div className="relative rounded-2xl border border-[#e6dfd8] p-5 bg-[#faf9f5] overflow-hidden">
                <div className="space-y-2.5 opacity-40 blur-[2px] pointer-events-none select-none">
                  <div className="h-4 bg-stone-300 rounded-md w-3/4" />
                  <div className="h-3 bg-stone-200 rounded-md w-full" />
                  <div className="h-3 bg-stone-200 rounded-md w-5/6" />
                  <div className="h-3 bg-stone-200 rounded-md w-2/3" />
                  <div className="h-20 bg-stone-100 rounded-xl border border-stone-200 p-2" />
                </div>

                <div className="absolute inset-0 bg-[#faf9f5]/70 backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-[#181715] text-[#faf9f5] flex items-center justify-center shadow-md">
                    <Lock className="w-5 h-5 text-[#c2410c]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">
                      完整 20+ 页推演研报已锁定
                    </h4>
                    <p className="text-[11px] text-stone-500 max-w-sm mt-0.5">
                      系统已根据您的 6 维画像完成法案计算，解锁后立即可在线查阅并导出 PDF。
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Free Early-Bird Unlock Footer Action */}
              <div className="p-4 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-[#c2410c] font-mono">
                      早鸟限免
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#eaf6ed] text-[#2e7d32] font-bold border border-[#c5e8ce]">
                      0 元限时解锁
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    解锁后永久可读 · 支持多次调整画像免费重新推演
                  </div>
                </div>

                <button
                  onClick={handleUnlockDemo}
                  disabled={isProcessing}
                  className="px-6 py-3 rounded-2xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-card-hover transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <span>正在生成专属推演报告...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>免费解锁完整 3 年落地推演</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Unlocked Full Interactive Report View */
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 rounded-2xl bg-[#eaf6ed] border border-[#c5e8ce] text-xs text-[#2e7d32] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#2e7d32]" />
                  <span className="font-bold text-sm">恭喜！您的专属 3 年跨国推演研报已成功解锁</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 rounded-xl bg-white border border-[#c5e8ce] text-[#2e7d32] text-xs font-semibold flex items-center gap-1 hover:bg-[#eaf6ed]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>导出 PDF</span>
                </button>
              </div>

              {/* Month-by-Month Full Gantt View */}
              <div className="p-5 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] space-y-3">
                <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c2410c]" />
                  <span>【{targetCountryName}】36 个月逐月落地全景甘特规划表</span>
                </h4>

                <div className="space-y-2.5 text-xs text-stone-700">
                  <div className="p-3 rounded-xl bg-[#efe9de]/50 border border-[#e6dfd8]">
                    <span className="font-bold text-stone-900 font-mono block mb-1">
                      M1 ~ M6 阶段：前置材料与资质合规准备
                    </span>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      完成职业评估机构认证 (如 NZQA / ACS / NMBI / TRA)，锁死英语成绩 (雅思 6.5+ / PTE 65+)，同步启动海外认证雇主 (AEWV / Sponsor) 职位简历精准投递。
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#efe9de]/50 border border-[#e6dfd8]">
                    <span className="font-bold text-stone-900 font-mono block mb-1">
                      M7 ~ M18 阶段：入境全职合规履约与薪资锁定
                    </span>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      持合法工作许可入境，确保薪资流水达到法定中位数门槛；配偶同步激活全职开放工签补贴家庭，子女免费入读当地公立学校。
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#efe9de]/50 border border-[#e6dfd8]">
                    <span className="font-bold text-stone-900 font-mono block mb-1">
                      M19 ~ M36 阶段：满足法定年限并一键锁定永居 (PR)
                    </span>
                    <p className="text-[11px] leading-relaxed text-stone-600">
                      依法缴纳公费社保与所得税满法定要求，在线递交永久居留申请，获批无限制永久回头签或欧盟长期居留。
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan B Hedging & Case Studies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-[#c2410c]" />
                    <span>Plan B 跨国对冲跳板策略</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    若遇本国移民配额缩减，建议立即激活爱尔兰 CSEP 或德国机会卡作为欧洲对冲备选，学历资质可直接平移互认。
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] space-y-1.5">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#10b981]" />
                    <span>同背景案例数据库基准</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    统计显示同类背景申请人平均获批周期为 14.2 个月，起薪中位数约为当地法定基准的 1.15 倍。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
