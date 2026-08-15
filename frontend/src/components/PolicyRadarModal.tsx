import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ExternalLink,
  Flame,
  Sparkles,
  X,
} from 'lucide-react';

interface PolicyRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PolicyUpdateItem {
  id: string;
  country: string;
  flag: string;
  date: string;
  badge: string;
  badgeColor: string;
  title: string;
  summary: string;
  impactAnalysis: string;
  sourceUrl: string;
}

export const PolicyRadarModal: React.FC<PolicyRadarModalProps> = ({ isOpen, onClose }) => {
  const updates: PolicyUpdateItem[] = [
    {
      id: 'diff-nz-2026',
      country: '新西兰 (NZ)',
      flag: '🇳🇿',
      date: '2026-06-01',
      badge: 'SMC 6分制优化',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      title: '新西兰移民局更新 SMC 6分制高薪与绿名单职业薪资中位数基准',
      summary: '全职技能工作时薪中位数调整，博士直通 6 分通道审理提速，绿名单 Tier 1 直接居留通道保持优先放量。',
      impactAnalysis: '持有硕士学历者（5分）仅需积累 1 年合规工签经验即可稳妥锁定 6 分申请居留权。',
      sourceUrl: 'https://www.immigration.govt.nz',
    },
    {
      id: 'diff-au-2026',
      country: '澳大利亚 (AU)',
      flag: '🇦🇺',
      date: '2026-07-01',
      badge: 'GSM 配额重组',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      title: '澳洲内政部启动 2026 新财年 189/190 技术移民与 Core Skills 紧缺清单',
      summary: '重点向 STEM 专业研发人才、高精尖工程及偏远地区 491 州担保倾斜，单身申请人与高技能配偶加分项保持关键竞争力。',
      impactAnalysis: '裸分 75-85 分申请人建议重点搭配 190 州担保（+5分）或通过 PTE 8 炸（+20分）锁定邀请。',
      sourceUrl: 'https://immi.homeaffairs.gov.au',
    },
    {
      id: 'diff-ca-2026',
      country: '加拿大 (CA)',
      flag: '🇨🇦',
      date: '2026-05-15',
      badge: '定向邀请增强',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      title: '加拿大 IRCC 全面扩大 Express Entry 针对 STEM 与医护类别的定向抽选比例',
      summary: '通用全类别 CRS 门槛仍维持高位，但 STEM、医疗与法语专业人才的定向抽选分数线大幅降低 60-80 分。',
      impactAnalysis: '具备特定行业经验或省提名 PNP（+600分）的申请人具备绝对邀请优势。',
      sourceUrl: 'https://www.canada.ca',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-zinc-950 shadow-2xl overflow-hidden relative max-h-[85vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <span>全球政策异动雷达 (Policy Diff Stream)</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  由边缘定时任务自动抓取并经 DeepSeek 提取的政策变更快照
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Timeline Feed Content */}
          <div className="py-4 space-y-4 overflow-y-auto pr-1">
            {updates.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-cyan-500/30 transition space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.flag}</span>
                    <span className="text-xs font-bold text-white">{item.country}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.date}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-zinc-200">{item.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.summary}</p>

                {/* AI Impact Callout */}
                <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-200 font-mono">政策影响评估：</span>
                    {item.impactAnalysis}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-zinc-400 hover:text-cyan-300 flex items-center gap-1 transition"
                  >
                    <span>查阅移民局官方公报</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition"
            >
              关闭雷达
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
