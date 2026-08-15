import React from 'react';
import { motion } from 'framer-motion';

export interface PresetScenario {
  id: string;
  name: string;
  icon: string;
  hotness: string;
  keyContrast: string;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'cs',
    name: '计算机 / 软件研发',
    icon: '💻',
    hotness: '极高需求 · 区域分化',
    keyContrast: '新西兰 86% 留存 vs 美国 H-1B 抽签 <15%',
  },
  {
    id: 'nursing',
    name: '医疗护理 / 物理治疗',
    icon: '🩺',
    hotness: '全球硬通货 · 极速获邀',
    keyContrast: '澳纽 65分裸分秒邀 vs 传统排期',
  },
  {
    id: 'teaching',
    name: '幼教 / 中学教育',
    icon: '👶',
    hotness: '紧缺红利 · 语言优先',
    keyContrast: 'AITSL 职评通过即获 190 绿卡',
  },
  {
    id: 'engineering',
    name: '泛工科 / 绿色与自动化',
    icon: '🏗️',
    hotness: '稳健技术通道',
    keyContrast: '德国蓝卡 21月永居 vs 英澳加门槛上浮',
  },
  {
    id: 'business',
    name: '文商科 / 路径多轨对冲',
    icon: '📈',
    hotness: '高内卷 · 需策略破局',
    keyContrast: '日本 80分 1年永住 + 新西兰高薪对冲',
  },
];

interface PresetBarProps {
  activePresetId: string;
  onSelectPreset: (presetId: string) => void;
}

export const PresetBar: React.FC<PresetBarProps> = ({
  activePresetId,
  onSelectPreset,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 select-none">
      <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-[#c2410c]" />
        <span>选择意向专业情境查看全球决策大图：</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
        {PRESET_SCENARIOS.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`px-3.5 py-2 rounded-xl text-xs transition-all flex items-center gap-2 relative ${
                isActive
                  ? 'bg-[#181715] text-[#faf9f5] font-semibold shadow-md'
                  : 'bg-[#faf9f5] hover:bg-[#efe9de] text-stone-600 border border-[#e6dfd8]'
              }`}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
              {isActive && (
                <motion.span
                  layoutId="activePresetIndicator"
                  className="w-1.5 h-1.5 rounded-full bg-[#10b981]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
