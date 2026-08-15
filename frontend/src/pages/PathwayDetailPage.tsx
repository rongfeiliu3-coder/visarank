import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Scale,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Flag,
  RotateCcw,
  CheckSquare,
  Square,
  CircleDot,
  Circle,
  ShieldCheck,
  BookOpen,
  Building2,
  FileText,
  Search,
  MessageCircle,
} from 'lucide-react';
import {
  PATHWAYS_REGISTRY,
  VISA_CATEGORY_BADGES,
  type PathwayRuleItem,
} from '../data/visaRegistryData';
import { VisaNavSidebar } from '../components/VisaNavSidebar';
import { SEOHead } from '../components/SEOHead';
import { getVisaDetailSeoMeta } from '../utils/seoUtils';

interface PathwayDetailPageProps {
  onOpenAssessment?: () => void;
  onOpenConsultation?: (visaName?: string) => void;
  onOpenFeedback?: (visaId?: string, visaName?: string) => void;
}

export const PathwayDetailPage: React.FC<PathwayDetailPageProps> = ({
  onOpenConsultation,
  onOpenFeedback,
}) => {
  const { visaId } = useParams<{ visaId: string }>();

  // Lookup pathway or fallback to nz_smc
  const currentPathway =
    PATHWAYS_REGISTRY[visaId || ''] || PATHWAYS_REGISTRY.nz_smc!;

  const badgeConfig =
    VISA_CATEGORY_BADGES[currentPathway.pillCategory] ||
    VISA_CATEGORY_BADGES.work;

  // Track checked rule item IDs for interactive self-scoring
  const [selectedItemIds, setSelectedItemIds] = useState<Record<string, boolean>>({});

  // Occupation search and category tab state
  const [occupationSearchQuery, setOccupationSearchQuery] = useState<string>('');
  const [selectedOccupationCategory, setSelectedOccupationCategory] = useState<string>('ALL');

  // Reset checked state when visaId changes with default checked items
  useEffect(() => {
    const initialChecked: Record<string, boolean> = {};
    currentPathway.rules.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.id && (item.defaultChecked || item.isMandatory)) {
          initialChecked[item.id] = true;
        }
      });
    });
    setSelectedItemIds(initialChecked);
    setOccupationSearchQuery('');
    setSelectedOccupationCategory('ALL');
  }, [currentPathway.id]);

  // Handle toggling an item
  const handleToggleItem = (categoryIndex: number, item: PathwayRuleItem) => {
    if (!item.id) return;
    const cat = currentPathway.rules[categoryIndex];
    if (!cat) return;

    if (cat.selectionMode === 'single') {
      // Uncheck all other items in this single-choice category
      const nextChecked = { ...selectedItemIds };
      cat.items.forEach((it) => {
        if (it.id) nextChecked[it.id] = false;
      });
      nextChecked[item.id] = true;
      setSelectedItemIds(nextChecked);
    } else {
      // Toggle for multiple choice
      setSelectedItemIds((prev) => ({
        ...prev,
        [item.id!]: !prev[item.id!],
      }));
    }
  };

  const handleResetScoring = () => {
    const defaultState: Record<string, boolean> = {};
    currentPathway.rules.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.id && (item.defaultChecked || item.isMandatory)) {
          defaultState[item.id] = true;
        }
      });
    });
    setSelectedItemIds(defaultState);
  };

  // Calculate live cumulative score
  const { totalScore, passScore, isPassed, scoreDiff } = useMemo(() => {
    let sum = 0;
    currentPathway.rules.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.id && selectedItemIds[item.id] && typeof item.numericPoints === 'number') {
          sum += item.numericPoints;
        }
      });
    });

    const target =
      currentPathway.numericThreshold ||
      (typeof currentPathway.passThreshold === 'number' ? currentPathway.passThreshold : 0);
    const passed = target > 0 ? sum >= target : true;
    const diff = target > 0 ? target - sum : 0;

    return {
      totalScore: sum,
      passScore: target,
      isPassed: passed,
      scoreDiff: diff,
    };
  }, [currentPathway, selectedItemIds]);

  // Filter occupations based on search and category tab
  const filteredOccupationGroups = useMemo(() => {
    if (!currentPathway.occupationGroups || currentPathway.occupationGroups.length === 0) {
      return [];
    }

    const query = occupationSearchQuery.trim().toLowerCase();

    return currentPathway.occupationGroups
      .map((group) => {
        // Filter by category tab
        if (selectedOccupationCategory !== 'ALL' && group.categoryName !== selectedOccupationCategory) {
          return null;
        }

        // Filter occupations by search query
        if (!query) {
          return group;
        }

        const matchingOccupations = group.occupations.filter((occ) => {
          return (
            occ.name.toLowerCase().includes(query) ||
            occ.englishName.toLowerCase().includes(query) ||
            occ.code.toLowerCase().includes(query) ||
            occ.qualificationReq.toLowerCase().includes(query) ||
            occ.wageReq.toLowerCase().includes(query) ||
            occ.highlightTag.toLowerCase().includes(query)
          );
        });

        if (matchingOccupations.length === 0) {
          return null;
        }

        return {
          ...group,
          occupations: matchingOccupations,
        };
      })
      .filter(Boolean) as typeof currentPathway.occupationGroups;
  }, [currentPathway.occupationGroups, occupationSearchQuery, selectedOccupationCategory]);

  const seoMeta = useMemo(() => getVisaDetailSeoMeta(currentPathway), [currentPathway]);

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden flex flex-row bg-[#faf8f5] select-none">
      {/* Dynamic SEO & Programmatic Head with GovernmentService + FAQPage JSON-LD */}
      <SEOHead
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={seoMeta.keywords}
        canonicalUrl={seoMeta.canonicalUrl}
        ogImage={seoMeta.ogImage}
        jsonLd={seoMeta.jsonLd}
      />

      {/* 1. Left Independent Scroll Accordion Sidebar */}
      <VisaNavSidebar
        currentVisaId={currentPathway.id}
        currentCountryCode={currentPathway.code}
      />

      {/* 2. Right Independent Scroll Main Workbench Canvas */}
      <main className="flex-1 h-full overflow-y-auto bg-[#faf8f5] p-4 sm:p-6 lg:p-10 pb-32 space-y-6 sm:space-y-8 select-text">
        {/* Mobile-Only Header Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between gap-2 pb-3 border-b border-[#e6dfd8] text-xs">
          <Link
            to="/"
            className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回决策大厅</span>
          </Link>
          <span className="text-[11px] font-mono text-stone-400">
            {currentPathway.flag} {currentPathway.countryName}
          </span>
        </div>

        {/* Header Title & Official Legislative Link */}
        <div className="space-y-4 border-b border-[#e6dfd8] pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2.5 rounded-2xl bg-[#efe9de] border border-[#e6dfd8] shadow-xs">
                {currentPathway.flag}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                    {currentPathway.name}
                  </h1>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeConfig.className}`}
                  >
                    {badgeConfig.label}
                  </span>
                </div>
                <p className="font-mono text-xs text-stone-500 mt-1">
                  {currentPathway.englishName} · 官方代码: {currentPathway.code}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <a
                href={currentPathway.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] border border-[#e6dfd8] text-xs font-mono text-stone-700 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>官方移民局法案源</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              {onOpenFeedback && (
                <button
                  type="button"
                  onClick={() => onOpenFeedback(currentPathway.id, currentPathway.name)}
                  className="px-3 py-2 rounded-xl bg-[#faf9f5] hover:bg-[#efe9de] border border-[#e6dfd8] hover:border-[#c2410c]/40 text-xs font-mono text-stone-600 hover:text-[#c2410c] flex items-center gap-1 transition-all cursor-pointer shadow-2xs"
                  title="发现政策参数或门槛有变动？点击提交纠错"
                >
                  <Flag className="w-3.5 h-3.5 text-[#c2410c]" />
                  <span>政策变动纠错</span>
                </button>
              )}

              <div className="px-3 py-2 rounded-xl bg-[#efe9de]/50 border border-[#e6dfd8] text-[11px] font-mono text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>最新审核: {currentPathway.lastVerifiedDate}</span>
              </div>
            </div>
          </div>

          {/* Legislative Summary Paragraph */}
          <div className="p-4 rounded-2xl bg-[#efe9de]/40 border border-[#e6dfd8] text-xs sm:text-sm text-stone-700 leading-relaxed">
            <span className="font-bold text-stone-900 font-mono">法案综述：</span>
            {currentPathway.keyRuleSummary}
          </div>

          {/* Special Transition Alert Notice */}
          {currentPathway.specialTransitionNotice && (
            <div className="p-4 rounded-2xl bg-[#fff7ed] border border-[#ffedd5] text-stone-900 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c] font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>{currentPathway.specialTransitionNotice.title}</span>
              </div>
              <p className="text-stone-700 text-[11px] leading-relaxed">
                {currentPathway.specialTransitionNotice.content}
              </p>
            </div>
          )}

          {/* Quick Metrics Bar: 6 Core Authority Indicators (Zero-Truncation Grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {/* 1. 官方申请规费 */}
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/80 border border-[#e6dfd8] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-[#c2410c]/30 transition-all duration-200">
              <div className="text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                <span>💰</span> 官方申请规费
              </div>
              <div className="space-y-1">
                <div className="font-serif text-base sm:text-lg font-bold text-[#c2410c] tracking-tight whitespace-normal break-words leading-tight">
                  {currentPathway.officialFee?.local || '查阅官网'}
                </div>
                <div className="text-[10px] font-mono text-stone-600 bg-[#faf9f5] px-1.5 py-0.5 rounded border border-[#e6dfd8] inline-block whitespace-normal break-words">
                  {currentPathway.officialFee?.cnyEstimate || '参考实时汇率'}
                </div>
              </div>
            </div>

            {/* 2. 法案执行周期 */}
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/80 border border-[#e6dfd8] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-[#0284c7]/30 transition-all duration-200">
              <div className="text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                <span>⏱️</span> 法案执行周期
              </div>
              <div className="space-y-1">
                <div className="font-serif text-xs sm:text-sm font-bold text-stone-900 leading-snug whitespace-normal break-words">
                  {currentPathway.effectivePeriod || '现行法案'}
                </div>
                <div className="text-[10px] font-mono text-[#0284c7] bg-[#e0f2fe] px-1.5 py-0.5 rounded border border-[#bae6fd] inline-block font-semibold whitespace-normal break-words">
                  v{currentPathway.version || '2026.1'} · 生效中
                </div>
              </div>
            </div>

            {/* 3. 及格/准入门槛 */}
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/80 border border-[#e6dfd8] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-[#c2410c]/30 transition-all duration-200">
              <div className="text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                <span>🎯</span> 及格/准入门槛
              </div>
              <div className="space-y-1">
                <div className="font-serif text-sm sm:text-base font-bold text-[#c2410c] whitespace-normal break-words leading-snug">
                  {typeof currentPathway.passThreshold === 'number'
                    ? `${currentPathway.passThreshold} 分及格`
                    : currentPathway.passThreshold}
                </div>
                <div className="text-[10px] font-mono text-stone-500 whitespace-normal break-words">
                  {currentPathway.isPointsBased ? '打分制动态遴选' : '合规准入直批'}
                </div>
              </div>
            </div>

            {/* 4. 工签/居留属性 */}
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/80 border border-[#e6dfd8] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-[#10b981]/30 transition-all duration-200">
              <div className="text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                <span>📜</span> 工签/居留属性
              </div>
              <div className="space-y-1">
                <div className="font-serif text-sm sm:text-base font-bold text-[#10b981] whitespace-normal break-words leading-snug">
                  {currentPathway.pswDuration || '详见法案条款'}
                </div>
                <div className="text-[10px] font-mono text-stone-500 whitespace-normal break-words">
                  {currentPathway.pillCategory === 'pr' ? '永久居民绿卡 (PR)' : '合法工作/居留许可'}
                </div>
              </div>
            </div>

            {/* 5. 官方审理周期 */}
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/80 border border-[#e6dfd8] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-stone-400 transition-all duration-200">
              <div className="text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                <span>⏳</span> 官方审理周期
              </div>
              <div className="space-y-1">
                <div className="font-serif text-sm sm:text-base font-bold text-stone-800 whitespace-normal break-words leading-snug">
                  {currentPathway.processingTime || '约 3 ~ 6 个月'}
                </div>
                <div className="text-[10px] font-mono text-stone-500 whitespace-normal break-words">
                  移民局常规时效
                </div>
              </div>
            </div>

            {/* 6. 通道分类属性 */}
            <div className="p-3.5 rounded-2xl bg-[#efe9de]/80 border border-[#e6dfd8] flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-purple-400 transition-all duration-200">
              <div className="text-[10px] font-mono text-stone-500 font-semibold uppercase flex items-center gap-1.5">
                <span>🏛️</span> 通道分类属性
              </div>
              <div className="space-y-1">
                <div>
                  <span className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeConfig.className}`}>
                    {badgeConfig.label}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-stone-500 whitespace-normal break-words">
                  {currentPathway.category}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 💡 主理人硬核剖析 / 现实避坑锐评 (Advisor's Candid Verdict) */}
        {currentPathway.advisorVerdict && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#faf8f5] via-[#f7f3eb] to-[#efe9de] border-2 border-[#d97706]/30 shadow-card-soft space-y-5 relative overflow-hidden">
            {/* Decorative Background Stamp */}
            <div className="absolute top-3 right-4 select-none pointer-events-none opacity-5 font-mono text-6xl font-black text-amber-900">
              VERDICT
            </div>

            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd8] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-sm">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      主理人硬核剖析 / 现实避坑锐评
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-500/20">
                      CANDID VERDICT
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-500">
                    资深出海主理人真实视角 · 剔除中介滤镜 · 直击法案红线与生存概率
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-stone-500" />
                <span>基于 2026 最新法定判例</span>
              </div>
            </div>

            {/* Highlight Punchy Quote */}
            <div className="relative p-4 rounded-2xl bg-[#efe4d3]/70 border-l-4 border-[#c2410c] text-stone-900 shadow-sm">
              <div className="text-xs sm:text-sm font-serif font-bold leading-relaxed text-[#9a3412]">
                “{currentPathway.advisorVerdict.highlightQuote}”
              </div>
            </div>

            {/* Deep Dive Realpolitik Summary */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔍</span> 现实生存逻辑与政经大势
              </div>
              <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed whitespace-pre-line bg-[#ffffff]/60 p-4 rounded-2xl border border-[#e6dfd8]">
                {currentPathway.advisorVerdict.summary}
              </p>
            </div>

            {/* Fatal Traps & Hidden Thresholds */}
            {currentPathway.advisorVerdict.fatalTraps && currentPathway.advisorVerdict.fatalTraps.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>⚠️ 现实致命雷区与隐形门槛 (Fatal Traps)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {currentPathway.advisorVerdict.fatalTraps.map((trap: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-stone-800 space-y-1"
                    >
                      <div className="text-[10px] font-mono font-bold text-rose-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                        <span>雷区 {idx + 1}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-stone-700">
                        {trap}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Personas: Ideal vs Discouraged */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Ideal For */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                <div className="text-xs font-mono font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>✅ 绝佳适配人群 (Ideal For)</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {currentPathway.advisorVerdict.idealFor}
                </p>
              </div>

              {/* Discouraged For */}
              <div className="p-3.5 rounded-2xl bg-stone-500/5 border border-stone-400/20 space-y-1.5">
                <div className="text-xs font-mono font-bold text-stone-800 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-stone-600" />
                  <span>🚫 强烈劝退人群 (Discouraged For)</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {currentPathway.advisorVerdict.discouragedFor}
                </p>
              </div>
            </div>

            {/* Statutory Law Quote Citation */}
            {currentPathway.advisorVerdict.officialLawQuote && (
              <div className="pt-2 border-t border-[#e6dfd8] flex items-start gap-2 text-[10px] font-mono text-stone-500">
                <Scale className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span className="leading-normal">
                  <strong className="text-stone-700 font-semibold">法定法案条文背书：</strong>
                  {currentPathway.advisorVerdict.officialLawQuote}
                </span>
              </div>
            )}

            {/* 📋 评估我的背景与该签证对口度 1v1 行动按钮 */}
            {onOpenConsultation && (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#ffffff]/80 p-4 rounded-2xl border border-[#e6dfd8] shadow-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="text-xs font-bold text-stone-900 flex items-center justify-center sm:justify-start gap-1.5 font-serif">
                    <MessageCircle className="w-3.5 h-3.5 text-[#c2410c]" />
                    <span>不确定自身背景是否能精准匹配该签证法案？</span>
                  </div>
                  <div className="text-[11px] text-stone-600 font-sans">
                    由名校理工科硕博团队 1v1 排查职业代码卡点、高命中英文文书精修与海外学业/论文护航
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultation(currentPathway.name)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#c2410c] hover:bg-[#9a3412] active:bg-[#7c2d12] text-white text-xs font-bold font-sans shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5 shrink-0"
                >
                  <span>📋 评估我的背景与该签证对口度</span>
                  <span className="text-xs font-bold">→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 🏛️ 1. 法定前置强制准入清单 (Universal Statutory Pre-requisites) */}
        {currentPathway.prerequisites && (
          <div className="p-5 sm:p-6 rounded-3xl bg-[#faf9f5] border border-[#e6dfd8] shadow-card-soft space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd8] pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#c2410c]/10 border border-[#c2410c]/20 flex items-center justify-center text-[#c2410c] shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      法定前置强制准入清单
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-800 border border-rose-500/20">
                      MANDATORY PREREQUISITES
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-500">
                    4 大通用刚性底线必须同时满足，缺一不可（一票否决制）
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-stone-400">法定准入红线</span>
            </div>

            {/* 4 Universal Baseline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. 年龄上限 */}
              <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1.5 hover:border-[#c2410c]/30 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#c2410c]" /> ① 年龄上限
                  </span>
                  <span className="text-[10px] bg-[#faf9f5] px-1.5 py-0.2 rounded border border-[#e6dfd8]">不可逾越</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {currentPathway.prerequisites.ageLimit}
                </p>
              </div>

              {/* 2. 语言基准 */}
              <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1.5 hover:border-[#0284c7]/30 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#0284c7]" /> ② 语言基准
                  </span>
                  <span className="text-[10px] bg-[#faf9f5] px-1.5 py-0.2 rounded border border-[#e6dfd8]">硬性门槛</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {currentPathway.prerequisites.languageBenchmark}
                </p>
              </div>

              {/* 3. 雇主资质 */}
              <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1.5 hover:border-[#10b981]/30 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#10b981]" /> ③ 雇主资质
                  </span>
                  <span className="text-[10px] bg-[#faf9f5] px-1.5 py-0.2 rounded border border-[#e6dfd8]">合规审查</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {currentPathway.prerequisites.employerAccreditation}
                </p>
              </div>

              {/* 4. 健康与品格 */}
              <div className="p-3.5 rounded-2xl bg-[#efe9de]/60 border border-[#e6dfd8] space-y-1.5 hover:border-purple-400 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 font-bold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> ④ 健康与品格
                  </span>
                  <span className="text-[10px] bg-[#faf9f5] px-1.5 py-0.2 rounded border border-[#e6dfd8]">无犯罪证明</span>
                </div>
                <p className="text-xs text-stone-800 leading-relaxed font-medium">
                  {currentPathway.prerequisites.healthAndCharacter}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 📋 2. 官方紧缺职业与代码大表 (Statutory Eligible Occupations with Codes) */}
        {currentPathway.occupationGroups && currentPathway.occupationGroups.length > 0 && (
          <div className="p-5 sm:p-6 rounded-3xl bg-[#faf9f5] border border-[#e6dfd8] shadow-card-soft space-y-5">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e6dfd8] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0284c7]/10 border border-[#0284c7]/20 flex items-center justify-center text-[#0284c7] shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      官方紧缺职业与法定代码大表
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-800 border border-blue-500/20">
                      STATUTORY OCCUPATIONS
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-500">
                    涵盖 ANZSCO / NOC / SOC 官方代码、学历资质要求与薪资门槛
                  </p>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={occupationSearchQuery}
                  onChange={(e) => setOccupationSearchQuery(e.target.value)}
                  placeholder="搜索职业名称或 6 位代码..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#efe9de]/60 border border-[#e6dfd8] text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#c2410c] focus:bg-[#faf9f5] transition-all font-mono"
                />
                {occupationSearchQuery && (
                  <button
                    onClick={() => setOccupationSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setSelectedOccupationCategory('ALL')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedOccupationCategory === 'ALL'
                    ? 'bg-[#c2410c] text-white shadow-xs'
                    : 'bg-[#efe9de]/70 hover:bg-[#efe9de] text-stone-600 border border-[#e6dfd8]'
                }`}
              >
                全部专业分类
              </button>
              {currentPathway.occupationGroups.map((grp, gIdx) => (
                <button
                  key={gIdx}
                  onClick={() => setSelectedOccupationCategory(grp.categoryName)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedOccupationCategory === grp.categoryName
                      ? 'bg-[#c2410c] text-white shadow-xs'
                      : 'bg-[#efe9de]/70 hover:bg-[#efe9de] text-stone-600 border border-[#e6dfd8]'
                  }`}
                >
                  <span>{grp.categoryName}</span>
                  <span className="text-[10px] font-mono opacity-80">({grp.occupations.length})</span>
                </button>
              ))}
            </div>

            {/* Occupations Grid by Group */}
            <div className="space-y-6">
              {filteredOccupationGroups.length === 0 ? (
                <div className="p-8 text-center bg-[#efe9de]/40 rounded-2xl border border-dashed border-[#e6dfd8] text-xs text-stone-500 font-mono">
                  未找到匹配 “{occupationSearchQuery}” 的职业。建议检查关键词或切换分类。
                </div>
              ) : (
                filteredOccupationGroups.map((group, grpIdx) => (
                  <div key={grpIdx} className="space-y-3">
                    <div className="flex items-center justify-between bg-[#efe9de]/60 px-3.5 py-2 rounded-xl border border-[#e6dfd8]">
                      <div className="font-serif font-bold text-xs text-stone-800 flex items-center gap-2">
                        <span>{group.categoryName}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500">
                        {group.occupations.length} 个适用职位
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {group.occupations.map((occ, occIdx) => (
                        <div
                          key={occIdx}
                          className="p-4 rounded-2xl bg-[#ffffff]/80 border border-[#e6dfd8] hover:border-[#c2410c]/40 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 space-y-2.5 flex flex-col justify-between"
                        >
                          <div className="space-y-1.5">
                            {/* Header: Title + English + Code + Highlight Tag */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="font-bold text-xs sm:text-sm text-stone-900">
                                  {occ.name}
                                </div>
                                <div className="text-[11px] font-mono text-stone-500 truncate">
                                  {occ.englishName}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1 shrink-0">
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#efe9de] text-[#c2410c] border border-[#e6dfd8]">
                                  {occ.code}
                                </span>
                                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                                  {occ.highlightTag}
                                </span>
                              </div>
                            </div>

                            {/* Requirements Breakdown */}
                            <div className="space-y-1 pt-1.5 border-t border-[#e6dfd8]/60 text-[11px]">
                              <div className="flex items-start gap-1.5 text-stone-700">
                                <span className="font-mono text-stone-400 shrink-0 font-bold">🎓 学历资质：</span>
                                <span className="leading-snug">{occ.qualificationReq}</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-stone-700">
                                <span className="font-mono text-stone-400 shrink-0 font-bold">💰 薪资标准：</span>
                                <span className="leading-snug text-[#9a3412] font-medium">{occ.wageReq}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Live Interactive Self-Scoring Dashboard (原地点按自评计算器) */}
        {currentPathway.isPointsBased && passScore > 0 && (
          <div className="p-5 rounded-3xl bg-[#efe9de] border border-[#e6dfd8] shadow-card-soft space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e6dfd8] pb-3">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider">
                  INTERACTIVE CALCULATOR // 原地交互式条款测算器
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-bold text-stone-900">
                    当前自评累计得分：
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#c2410c] font-mono">
                    {totalScore} 分
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    / 及格线 {passScore} 分
                  </span>
                </div>
              </div>

              <button
                onClick={handleResetScoring}
                className="px-3 py-1.5 rounded-xl bg-[#faf9f5] hover:bg-[#e6dfd8] border border-[#e6dfd8] text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                title="重置自评分数"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重置自评</span>
              </button>
            </div>

            {/* Status Assessment Pill Bar */}
            <div
              className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-medium ${
                isPassed
                  ? 'bg-[#eaf6ed] border-[#c5e8ce] text-[#2e7d32]'
                  : 'bg-[#fdf6e2] border-[#f4e2a8] text-[#996500]'
              }`}
            >
              {isPassed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>
                    🎉 恭喜！您当前自选累计得分已达到法定及格门槛（{totalScore} / {passScore} 分），具备该签证递交或受邀资格！
                  </span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    ⚠️ 您当前自选累计得分距离及格线还差 <strong className="font-mono">{scoreDiff} 分</strong>。建议通过提升语言成绩（如PTE八炸+20分）、偏远地区加分或累积本地工作年限寻求突破。
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Complete Policy Scoring Rules Table with Interactive Selection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#c2410c]" />
              <h2 className="font-serif text-xl font-bold text-stone-900">
                完整政策立法打分树与判定细则
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              点选条款实时验算 · 对齐 2026 官方立法公报
            </span>
          </div>

          <div className="space-y-5">
            {currentPathway.rules.map((section, sIdx) => (
              <div
                key={sIdx}
                className="rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] overflow-hidden shadow-card-soft"
              >
                <div className="bg-[#efe9de]/70 px-4 py-3 border-b border-[#e6dfd8] font-bold text-xs text-stone-800 font-serif flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{section.category}</span>
                    {section.selectionMode === 'single' && (
                      <span className="text-[10px] font-mono text-stone-500 font-normal">
                        (单选项)
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">Section {sIdx + 1}</span>
                </div>

                <div className="divide-y divide-[#e6dfd8]/60">
                  {section.items.map((item, iIdx) => {
                    const isChecked = item.id ? !!selectedItemIds[item.id] : false;
                    const isSingle = section.selectionMode === 'single';

                    return (
                      <div
                        key={iIdx}
                        onClick={() => handleToggleItem(sIdx, item)}
                        className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-[#efe9de]/50 border-l-4 border-l-[#c2410c]'
                            : 'hover:bg-[#efe9de]/20'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Selection Radio / Checkbox Indicator */}
                          {item.id && typeof item.numericPoints === 'number' && (
                            <div className="pt-0.5 text-[#c2410c] flex-shrink-0">
                              {isSingle ? (
                                isChecked ? (
                                  <CircleDot className="w-4 h-4" />
                                ) : (
                                  <Circle className="w-4 h-4 text-stone-400" />
                                )
                              ) : isChecked ? (
                                <CheckSquare className="w-4 h-4" />
                              ) : (
                                <Square className="w-4 h-4 text-stone-400" />
                              )}
                            </div>
                          )}

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-bold text-xs ${isChecked ? 'text-[#c2410c]' : 'text-stone-900'}`}>
                                {item.chineseName}
                              </span>
                              {item.isMandatory && (
                                <span className="px-2 py-0.2 rounded-full bg-[#fae5e5] text-[#c64545] text-[10px] font-mono font-bold border border-[#f5c6c6]">
                                  Mandatory 强制底线
                                </span>
                              )}
                              {item.specialNoticeTag && (
                                <span className="px-2 py-0.2 rounded-full bg-[#fdf6e2] text-[#996500] text-[10px] font-mono font-bold border border-[#f4e2a8] flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  <span>{item.specialNoticeTag}</span>
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 font-mono">
                              {item.name}
                            </p>
                            <p className="text-xs text-stone-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0 flex items-center gap-3 self-end sm:self-center">
                          <span
                            className={`font-serif text-lg font-bold font-mono px-3.5 py-1 rounded-xl border shadow-xs transition-colors ${
                              isChecked
                                ? 'bg-[#c2410c] text-white border-[#c2410c]'
                                : 'bg-[#efe9de] text-[#c2410c] border-[#e6dfd8]'
                            }`}
                          >
                            {typeof item.points === 'number'
                              ? `+${item.points} 分`
                              : item.points}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📜 3. 官方立法依据与材料证据链 (Operational Manual & Evidence Trail) */}
        {currentPathway.legalEvidence && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#faf8f5] to-[#efe9de] border border-[#d97706]/30 shadow-card-soft space-y-4">
            {/* Section Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e6dfd8] pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-800 shadow-xs">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                      官方立法依据与材料证据链
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-500/20">
                      EVIDENCE TRAIL
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-500">
                    官方移民法典依据与申请递交必备证据清单 (Audit Ready)
                  </p>
                </div>
              </div>
              <div className="text-[10px] font-mono text-stone-400 flex items-center gap-1">
                <span>对齐 2026 移民法案公报</span>
              </div>
            </div>

            {/* Operational Manual Citation Quote */}
            <div className="p-3.5 rounded-2xl bg-[#ffffff]/70 border-l-4 border-[#d97706] text-xs text-stone-800 space-y-1">
              <div className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                官方移民局操作手册立法依据 (Statutory Reference)
              </div>
              <p className="font-serif font-bold text-stone-900 leading-relaxed">
                “{currentPathway.legalEvidence.operationalManualBasis}”
              </p>
            </div>

            {/* Evidence Trail Checklist Tokens */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span>递交必备材料证据链 (Essential Evidentiary Checklist)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentPathway.legalEvidence.requiredEvidenceList.map((item: string, eIdx: number) => (
                  <div
                    key={eIdx}
                    className="p-3 rounded-xl bg-[#ffffff]/80 border border-[#e6dfd8] flex items-start gap-2.5 text-xs text-stone-800 hover:border-[#10b981]/40 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-[#10b981] flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                      {eIdx + 1}
                    </div>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clean Informational Footer Note */}
        <div className="p-4 rounded-2xl bg-[#efe9de]/50 border border-[#e6dfd8] text-xs text-stone-600 flex items-center justify-between">
          <span>💡 提示：本页打分与判定细则基于 2026 各国移民局现行立法公报。如需跨 14 国全局背景画像逆向匹配，可点击顶部导航栏右上角的【开始智能测算】。</span>
          <span className="font-mono text-[10px] text-stone-400">VisaRank 2026 Engine</span>
        </div>
      </main>
    </div>
  );
};
