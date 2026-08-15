import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Server,
  Workflow,
  X,
} from 'lucide-react';

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemArchitectureModal: React.FC<SystemArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-zinc-950 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
        >
          {/* Top ambient glow */}
          <div className="absolute top-0 left-1/3 w-96 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-[1px]">
                <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-mono">
                    EMIGRANT // Edge-Native Architecture Blueprint
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    DECOUPLED ENGINE
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  面向全球高并发与频繁法案变动的工业级边缘原生架构设计
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

          {/* Architecture Content Body */}
          <div className="py-5 space-y-6 overflow-y-auto pr-1 text-xs">
            {/* 1. Core Architecture Diagram / Stack Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Layer 1 */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold">
                  <Server className="w-4 h-4" />
                  <span>1. Edge Compute (Worker)</span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  基于 <span className="text-zinc-200 font-mono">Cloudflare Workers + Hono</span>，部署在全球 330+ 边缘数据中心，毫秒级就近响应，冷启动时间 &lt; 5ms。
                </p>
                <div className="pt-2 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-cyan-300">Hono v4</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-cyan-300">Zod Validation</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-cyan-300">Edge Caching</span>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                  <Database className="w-4 h-4" />
                  <span>2. Edge Storage (D1 + KV)</span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  <span className="text-zinc-200 font-mono">Cloudflare D1 (SQLite)</span> 存储国家、签证、职业与规则树；<span className="text-zinc-200 font-mono">Cloudflare KV</span> 对热点签证规则进行边缘高速缓存。
                </p>
                <div className="pt-2 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-emerald-300">D1 Relational DB</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-emerald-300">KV Hot Cache</span>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                  <Workflow className="w-4 h-4" />
                  <span>3. Rule Engine & AI</span>
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  采用 <span className="text-zinc-200 font-mono">json-logic-js</span> 彻底解耦业务规则与前端 UI，支持 CapGroup 互斥与封顶；结合 <span className="text-zinc-200 font-mono">DeepSeek</span> 进行政策 Diff 自动提取。
                </p>
                <div className="pt-2 flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-amber-300">JsonLogic AST</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-amber-300">CapGroup Resolver</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-amber-300">DeepSeek Diff</span>
                </div>
              </div>
            </div>

            {/* 2. Decoupled Rule Engine Code Sample */}
            <div className="p-4 rounded-2xl bg-[#090D16] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-zinc-300 font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>D1 Policy Rule Schema & JsonLogic Expression (Sample)</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">d1/schema.sql + evaluator.ts</span>
              </div>

              <pre className="p-3.5 rounded-xl bg-zinc-950 font-mono text-[11px] text-zinc-300 overflow-x-auto border border-zinc-800/80 leading-relaxed">
{`// D1 规则记录示例 (新西兰 SMC 6分制 - 硕士学历 5分)
{
  "code": "NZ_SMC_QUAL_MASTER",
  "category": "education",
  "points": 5,
  "is_mandatory": false,
  "cap_group": "nz_skill_pillar",
  "cap_strategy": "max_of",  // 技能三支柱 (学历/薪资/注册) 互斥取最高分
  "logic_json": {
    "==": [{ "var": "profile.education.level" }, "MASTER"]
  }
}`}
              </pre>
            </div>

            {/* 3. Engineering Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-zinc-200">零前端硬编码 (Zero Hardcoding)</div>
                  <div className="text-zinc-400 text-[11px]">
                    前端仅负责画像录入与结果呈现，任何打分梯队调整只需在 D1 更新一条 SQL，即时全网生效。
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-zinc-200">端到端类型安全 (End-to-End Type Safety)</div>
                  <div className="text-zinc-400 text-[11px]">
                    `@emigrant/shared` 统一管理 TypeScript 契约与运行时 Zod 校验，确保前后端输入输出 100% 对齐。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition"
            >
              关闭架构图
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
