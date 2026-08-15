import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  HeartHandshake,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import type {
  CountryCode,
  EducationLevel,
  EvaluationRequest,
  EvaluationResult,
  LanguageExamType,
  Visa,
} from '@emigrant/shared';
import { submitEvaluation } from '../services/api';

interface AssessmentFunnelProps {
  initialCountry?: CountryCode;
  visas: Visa[];
  onEvaluationComplete: (result: EvaluationResult) => void;
}

export const AssessmentFunnel: React.FC<AssessmentFunnelProps> = ({
  initialCountry = 'NZ',
  visas,
  onEvaluationComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [targetCountry, setTargetCountry] = useState<CountryCode>(initialCountry);
  const [selectedVisaId, setSelectedVisaId] = useState<string>('nz_smc');
  const [age, setAge] = useState<number>(29);

  // Step 1: Education
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('MASTER');
  const [isStem, setIsStem] = useState<boolean>(true);
  const [isLocalStudy, setIsLocalStudy] = useState<boolean>(false);
  const [studyDurationYears] = useState<number>(2);

  // Step 2: Language & Experience
  const [examType, setExamType] = useState<LanguageExamType>('PTE_A');
  const [languageScore, setLanguageScore] = useState<number>(79); // Default Superior
  const [overseasYears, setOverseasYears] = useState<number>(4);
  const [localYears, setLocalYears] = useState<number>(1);
  const [hasJobOffer, setHasJobOffer] = useState<boolean>(true);
  const [salaryMultiplier, setSalaryMultiplier] = useState<number>(1.5);
  const [registrationTier] = useState<number>(0);

  // Step 3: Partner & Bonuses
  const [partnerStatus, setPartnerStatus] = useState<
    'single_or_citizen' | 'skilled_english' | 'english_only' | 'none'
  >('single_or_citizen');
  const [stateNominationType, setStateNominationType] = useState<
    'none' | '190' | '491_state' | 'pnp_express_entry'
  >('none');
  const [hasNaatiCcl, setHasNaatiCcl] = useState<boolean>(false);
  const [completedProfessionalYear, setCompletedProfessionalYear] = useState<boolean>(false);

  // Synchronize Visa when Country changes
  useEffect(() => {
    const availableVisas = visas.filter((v) => v.countryCode === targetCountry);
    if (availableVisas.length > 0 && availableVisas[0]) {
      setSelectedVisaId(availableVisas[0].id);
    }
  }, [targetCountry, visas]);

  // Compute Language standard mapping
  const computeLanguageStandard = () => {
    if (examType === 'NONE') {
      return {
        label: '暂无成绩 (需规划考取)',
        color: 'text-zinc-500',
        auDesc: '未满足准入门槛',
        clb: 0,
      };
    }
    if (languageScore >= 79) {
      return {
        label: 'Superior 满分档 (雅思 8.0 / PTE 79+)',
        color: 'text-emerald-400',
        auDesc: 'AU GSM 满额 +20分 / CA CLB 10',
        clb: 10,
      };
    }
    if (languageScore >= 65) {
      return {
        label: 'Proficient 熟练档 (雅思 7.0 / PTE 65+)',
        color: 'text-cyan-400',
        auDesc: 'AU GSM +10分 / CA CLB 8',
        clb: 8,
      };
    }
    if (languageScore >= 50) {
      return {
        label: 'Competent 基础档 (雅思 6.0 / PTE 50+)',
        color: 'text-amber-400',
        auDesc: '满足法定最低准入门槛 (+0分)',
        clb: 6,
      };
    }
    return {
      label: '低于准入门槛 (需强化备考)',
      color: 'text-rose-400',
      auDesc: '未达最低 6.0 申请门槛',
      clb: 4,
    };
  };

  const langStandard = computeLanguageStandard();

  const handleRunEvaluation = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const isSingleOrCitizen = partnerStatus === 'single_or_citizen';
    const isSkilledEnglish = partnerStatus === 'skilled_english';
    const isEnglishOnly = partnerStatus === 'english_only';

    const auBandVal: 'None' | 'Competent' | 'Proficient' | 'Superior' =
      languageScore >= 79 ? 'Superior' : languageScore >= 65 ? 'Proficient' : languageScore >= 50 ? 'Competent' : 'None';

    const payload: EvaluationRequest = {
      visaId: selectedVisaId,
      profile: {
        age,
        targetCountry,
        targetVisaId: selectedVisaId,
        education: {
          level: educationLevel,
          isStem,
          countryOfStudy: isLocalStudy ? targetCountry : 'CN',
          isLocalStudy,
          studyDurationYears,
        },
        experience: {
          overseasYears,
          localYears,
          occupationCode: '261313',
          isCurrentEmployed: true,
        },
        language: {
          examType,
          overall: languageScore,
          listening: languageScore,
          reading: languageScore,
          writing: languageScore,
          speaking: languageScore,
          computedAUBand: auBandVal,
          computedCLB: langStandard.clb,
        },
        jobOffer: {
          hasOffer: hasJobOffer,
          isAccreditedEmployer: hasJobOffer,
          medianSalaryMultiplier: salaryMultiplier,
          occupationCode: '261313',
        },
        registration: registrationTier > 0 ? { hasRegistration: true, tierLevel: registrationTier } : undefined,
        partner: {
          hasPartner: !isSingleOrCitizen,
          isCitizenOrPR: isSingleOrCitizen,
          hasCompetentEnglish: isSkilledEnglish || isEnglishOnly,
          hasSkillAssessment: isSkilledEnglish,
        },
        stateNomination:
          stateNominationType !== 'none'
            ? {
                isApplying: true,
                nominationCategory: stateNominationType as any,
              }
            : undefined,
        otherFactors: {
          hasNaatiCcl,
          completedProfessionalYear,
        },
      },
    };

    try {
      const result = await submitEvaluation(payload);
      onEvaluationComplete(result);
    } catch (err: any) {
      setSubmitError(err.message || '评估测算失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCountryVisas = visas.filter((v) => v.countryCode === targetCountry);

  const stepTitles = [
    { num: 1, title: '基本背景与意向国家', subtitle: 'Demographics & Target' },
    { num: 2, title: '语言水平与工作资历', subtitle: 'Language & Experience' },
    { num: 3, title: '本地薪资与附加优势', subtitle: 'Job Offer & Extra Points' },
  ];

  return (
    <div id="assessment-funnel" className="w-full max-w-4xl mx-auto my-8">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Funnel Stepper Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                个人背景多维适配度评估 (Profile Eligibility Screener)
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              基于各国移民局 2026 最新官方评分模型，45秒全方位核验准入门槛与加分细则
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2">
            {stepTitles.map((step) => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num as any)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentStep === step.num
                    ? 'bg-cyan-500 text-zinc-950 shadow-neon-cyan scale-105'
                    : currentStep > step.num
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                }`}
              >
                {currentStep > step.num ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <span>0{step.num}</span>
                )}
                <span className="hidden md:inline font-sans font-normal text-[11px]">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content Container */}
        <AnimatePresence mode="wait">
          {/* STEP 1: DEMOGRAPHICS & TARGET COUNTRY */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* 1. Target Country & Visa Channel */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" /> 1. 意向目标国家与核心申请通道
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { code: 'NZ', name: '新西兰 (NZ)', flag: '🇳🇿', tag: 'SMC 6分制居留' },
                    { code: 'AU', name: '澳大利亚 (AU)', flag: '🇦🇺', tag: 'GSM 189/190技术' },
                    { code: 'CA', name: '加拿大 (CA)', flag: '🇨🇦', tag: 'Express Entry 联邦' },
                  ].map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setTargetCountry(c.code as CountryCode)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        targetCountry === c.code
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-neon-cyan'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl">{c.flag}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-cyan-300">
                          {c.tag}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-zinc-100">{c.name}</div>
                    </button>
                  ))}
                </div>

                {/* Visa Selector Pills */}
                {currentCountryVisas.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentCountryVisas.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVisaId(v.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          selectedVisaId === v.id
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                        }`}
                      >
                        {v.chineseName} ({v.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Age Slider */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> 申请人周岁年龄 (Age)
                  </label>
                  <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-sm border border-cyan-500/30">
                    {age} 周岁
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>18 岁</span>
                  <span className="text-cyan-400">25 - 32 岁 (黄金年龄段满额加分)</span>
                  <span>45 岁 (澳洲技术移民上限)</span>
                  <span>55 岁 (新西兰SMC上限)</span>
                </div>
              </div>

              {/* 3. Education Qualification */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" /> 2. 最高学历与学术背景
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { level: 'DOCTORATE', label: '博士学位 (PhD)', pts: 'NZ 6分 / AU 20分' },
                    { level: 'MASTER', label: '硕士研究生 (Master)', pts: 'NZ 5分 / AU 15分' },
                    { level: 'BACHELOR_HONOURS', label: '荣誉学士 / PGD', pts: 'NZ 4分 / Level 8' },
                    { level: 'BACHELOR', label: '本科学士 (Bachelor)', pts: 'NZ 3分 / AU 15分' },
                  ].map((item) => (
                    <button
                      key={item.level}
                      onClick={() => setEducationLevel(item.level as EducationLevel)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        educationLevel === item.level
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-neon-cyan'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-zinc-100">{item.label}</div>
                      <div className="text-[10px] font-mono text-cyan-400 mt-1">{item.pts}</div>
                    </button>
                  ))}
                </div>

                {/* STEM & Local Study Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> STEM / ICT / 工程类专业背景
                    </span>
                    <input
                      type="checkbox"
                      checked={isStem}
                      onChange={(e) => setIsStem(e.target.checked)}
                      className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-cyan-500 focus:ring-cyan-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> 目标国 2年+ 本地全日制学习经历
                    </span>
                    <input
                      type="checkbox"
                      checked={isLocalStudy}
                      onChange={(e) => setIsLocalStudy(e.target.checked)}
                      className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-cyan-500 focus:ring-cyan-500"
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: LANGUAGE & PROFESSIONAL EXPERIENCE */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* 1. Language Exam & Slider */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5" /> 1. 官方语言成绩评级 (IELTS / PTE / CELPIP)
                  </label>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold ${langStandard.color}`}>
                      {langStandard.label}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {[
                    { type: 'PTE_A', label: 'PTE Academic (推荐)' },
                    { type: 'IELTS_G', label: 'IELTS (雅思 G类)' },
                    { type: 'CELPIP_G', label: 'CELPIP (思培)' },
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setExamType(item.type as LanguageExamType)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        examType === item.type
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">成绩水平:</span>
                    <span className="text-cyan-300 font-bold text-sm">{languageScore} 分 ({langStandard.auDesc})</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="90"
                    step="1"
                    value={languageScore}
                    onChange={(e) => setLanguageScore(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>50 (雅思 6.0 门槛)</span>
                    <span className="text-cyan-400">65 (雅思 7.0 / +10分)</span>
                    <span className="text-emerald-400">79+ (雅思 8.0 满分 / +20分)</span>
                  </div>
                </div>
              </div>

              {/* 2. Experience Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Overseas Exp */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> 国内/海外紧缺技能工作年限
                    </span>
                    <span className="font-mono text-cyan-300 font-bold">{overseasYears} 年</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={overseasYears}
                    onChange={(e) => setOverseasYears(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block">
                    近10年内海外相关技能工龄 (AU 3-8年可加 5~15分)
                  </span>
                </div>

                {/* Local Exp */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> 目标国本地合法工签年限
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">{localYears} 年</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={localYears}
                    onChange={(e) => setLocalYears(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block">
                    新西兰每年 +1分 (上限3分) / 澳洲本地 1-8年 +5~20分
                  </span>
                </div>
              </div>

              {/* 3. Job Offer & Salary Multiplier */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> 3. 本地雇主 Job Offer 与高薪倍数
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs text-zinc-300">持有合规雇主聘用 Offer</span>
                    <input
                      type="checkbox"
                      checked={hasJobOffer}
                      onChange={(e) => setHasJobOffer(e.target.checked)}
                      className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-cyan-500"
                    />
                  </label>
                </div>

                {hasJobOffer && (
                  <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">薪资水平相对当地行业中位数倍数:</span>
                      <span className="font-mono text-amber-300 font-bold">{salaryMultiplier}x 中位数</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { mul: 1.0, label: '1.0x (基准薪资)' },
                        { mul: 1.5, label: '1.5x (NZ 3分)' },
                        { mul: 2.0, label: '2.0x (NZ 4分)' },
                        { mul: 3.0, label: '3.0x (NZ 6分满分)' },
                      ].map((item) => (
                        <button
                          key={item.mul}
                          onClick={() => setSalaryMultiplier(item.mul)}
                          className={`p-2 rounded-lg text-[11px] font-medium border text-center transition ${
                            salaryMultiplier === item.mul
                              ? 'bg-amber-500/10 border-amber-500/60 text-amber-300'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: PARTNER & EXTRA ADVANTAGES */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* 1. Partner Status */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" /> 1. 配偶/伴侣综合背景 (Partner Profile)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'single_or_citizen',
                      title: '单身 / 伴侣已是目标国公民或PR',
                      desc: '澳洲技术移民直接享满额 +10 分加分',
                      pts: '+10 分 (AU)',
                    },
                    {
                      id: 'skilled_english',
                      title: '伴侣通过职业评估 + 4个6雅思/PTE 50',
                      desc: '双技能人才共同申请',
                      pts: '+10 分 (AU)',
                    },
                    {
                      id: 'english_only',
                      title: '伴侣具备 Competent 英语水平',
                      desc: '无职业评估但语言成绩达标',
                      pts: '+5 分 (AU)',
                    },
                    {
                      id: 'none',
                      title: '伴侣暂无英文成绩与职业评估',
                      desc: '基准随迁状态',
                      pts: '+0 分',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setPartnerStatus(item.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        partnerStatus === item.id
                          ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-neon-cyan'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-bold text-zinc-100">{item.title}</div>
                        <span className="text-[10px] font-mono text-cyan-400 bg-zinc-800 px-1.5 py-0.5 rounded">
                          {item.pts}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. State & Regional Nominations */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 2. 州政府担保 / 省提名意向 (Nomination Preference)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'none', label: '无州担保需求', pts: '纯个人裸分评测' },
                    { id: '190', label: 'AU 190 州政府担保', pts: '直接获赠 +5 分' },
                    { id: '491_state', label: 'AU 491 偏远地区担保', pts: '超高 +15 分加成' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setStateNominationType(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        stateNominationType === item.id
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-neon-emerald'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-zinc-100">{item.label}</div>
                      <div className="text-[10px] font-mono text-emerald-400 mt-1">{item.pts}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Additional Australian Bonus Factors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <span className="text-xs text-zinc-300">通过 NAATI CCL 社区语言口译认证 (+5分)</span>
                  <input
                    type="checkbox"
                    checked={hasNaatiCcl}
                    onChange={(e) => setHasNaatiCcl(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <span className="text-xs text-zinc-300">完成 Professional Year 职业年课程 (+5分)</span>
                  <input
                    type="checkbox"
                    checked={completedProfessionalYear}
                    onChange={(e) => setCompletedProfessionalYear(e.target.checked)}
                    className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-cyan-500"
                  />
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message */}
        {submitError && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
            {submitError}
          </div>
        )}

        {/* Navigation & Submit Bottom Bar */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-zinc-800">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep((currentStep - 1) as any)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition"
            >
              <ChevronLeft className="w-4 h-4" /> 上一步
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep((currentStep + 1) as any)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-neon-cyan transition"
            >
              下一步 <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleRunEvaluation}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-neon-cyan transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>正在比对 2026 最新法案模型...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>立即生成 2026 全维智能评估报告</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
