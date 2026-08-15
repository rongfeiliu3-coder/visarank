import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  Compass,
  FileText,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';
import {
  COUNTRY_VISA_GROUPS,
  VISA_CATEGORY_BADGES,
} from '../data/visaRegistryData';

interface VisaNavSidebarProps {
  currentVisaId: string;
  currentCountryCode: CountryCode;
  onSelectVisa?: (visaId: string) => void;
}

export const VisaNavSidebar: React.FC<VisaNavSidebarProps> = ({
  currentVisaId,
  currentCountryCode,
  onSelectVisa,
}) => {
  const navigate = useNavigate();

  // Find initial active country code
  const initialCountryCode = currentCountryCode || 'NZ';

  // Open countries state (Set of country codes)
  const [openCountries, setOpenCountries] = useState<Record<string, boolean>>({
    [initialCountryCode]: true,
  });

  // Whenever currentCountryCode or currentVisaId changes, auto-expand the active country
  useEffect(() => {
    const matchGroup = COUNTRY_VISA_GROUPS.find((g) =>
      g.visas.some(
        (v) =>
          v.id === currentVisaId ||
          (v.id === 'ca_ee' && currentVisaId === 'ca_ee_fsw') ||
          (v.id === 'uk_skilled_worker' && currentVisaId === 'uk_swv') ||
          (v.id === 'us_eb2_niw' && currentVisaId === 'us_niw')
      )
    );

    const activeCode = matchGroup?.countryCode || currentCountryCode;
    if (activeCode) {
      setOpenCountries((prev) => ({
        ...prev,
        [activeCode]: true,
      }));
    }
  }, [currentVisaId, currentCountryCode]);

  const toggleCountry = (code: string) => {
    setOpenCountries((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  const handleVisaClick = (visaId: string) => {
    if (onSelectVisa) onSelectVisa(visaId);
    navigate(`/visas/${visaId}`);
  };

  const totalVisaCount = COUNTRY_VISA_GROUPS.reduce(
    (acc, cur) => acc + cur.visas.length,
    0
  );

  return (
    <aside className="hidden lg:block w-[280px] xl:w-[320px] shrink-0 h-full overflow-y-auto border-r border-[#e6dfd8] bg-[#faf8f5]/80 p-4 space-y-4 select-none">
      {/* 1. Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>← 返回首页决策总览</span>
      </Link>

      {/* 2. Main Accordion Container */}
      <div className="rounded-3xl bg-[#faf9f5] border border-[#e6dfd8] p-2.5 shadow-card-soft space-y-1.5">
        <div className="px-3 pt-2 pb-1 text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#c2410c]" />
            <span>全生命周期签证通道智库</span>
          </span>
          <span className="text-[9px] text-stone-400 font-normal">
            {COUNTRY_VISA_GROUPS.length} 国 / {totalVisaCount} 法案
          </span>
        </div>

        {/* Accordion Group List */}
        <div className="space-y-1">
          {COUNTRY_VISA_GROUPS.map((group) => {
            const isOpen = !!openCountries[group.countryCode];
            const hasActiveVisa = group.visas.some(
              (v) =>
                v.id === currentVisaId ||
                (v.id === 'ca_ee' && currentVisaId === 'ca_ee_fsw') ||
                (v.id === 'uk_skilled_worker' && currentVisaId === 'uk_swv') ||
                (v.id === 'us_eb2_niw' && currentVisaId === 'us_niw')
            );

            return (
              <div
                key={group.countryCode}
                className="rounded-2xl border border-transparent overflow-hidden transition-colors"
              >
                {/* Accordion Header Button */}
                <button
                  type="button"
                  onClick={() => toggleCountry(group.countryCode)}
                  className={`w-full text-left px-3 py-2.5 rounded-2xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    hasActiveVisa
                      ? 'bg-[#efe9de] text-stone-900 font-bold'
                      : 'text-stone-700 hover:bg-[#efe9de]/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{group.flag}</span>
                    <span>{group.countryName}</span>
                    <span className="text-[10px] font-mono text-stone-400 font-normal">
                      ({group.visas.length})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasActiveVisa && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c2410c]" />
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-stone-700' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Smooth Expandable Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-1 pb-1.5 pl-2 pr-1 space-y-1">
                        {group.visas.map((v) => {
                          const isActive =
                            v.id === currentVisaId ||
                            (v.id === 'ca_ee' && currentVisaId === 'ca_ee_fsw') ||
                            (v.id === 'uk_skilled_worker' && currentVisaId === 'uk_swv') ||
                            (v.id === 'us_eb2_niw' && currentVisaId === 'us_niw');

                          const badgeConfig =
                            VISA_CATEGORY_BADGES[v.pillCategory] ||
                            VISA_CATEGORY_BADGES.work;

                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => handleVisaClick(v.id)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                                isActive
                                  ? 'bg-[#181715] text-[#faf9f5] font-bold shadow-xs'
                                  : 'text-stone-700 hover:bg-[#efe9de]'
                              }`}
                            >
                              <div className="min-w-0 pr-2">
                                <div className="truncate text-xs flex items-center gap-1.5">
                                  <FileText className={`w-3 h-3 ${isActive ? 'text-[#cc785c]' : 'text-stone-400'}`} />
                                  <span className="truncate">{v.codeName}</span>
                                </div>
                                <div
                                  className={`text-[10px] truncate pl-4.5 ${
                                    isActive ? 'text-stone-300' : 'text-stone-500'
                                  }`}
                                >
                                  {v.shortName}
                                </div>
                              </div>

                              <span
                                className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border flex-shrink-0 ${
                                  isActive
                                    ? 'bg-[#2a2825] text-[#faf9f5] border-stone-700'
                                    : badgeConfig.className
                                }`}
                              >
                                {badgeConfig.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Provenance Guarantee Card */}
      <div className="p-4 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] text-xs space-y-1.5 shadow-xs">
        <div className="font-bold text-stone-800 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
          <span>法案权威溯源保证</span>
        </div>
        <p className="text-[11px] text-stone-600 leading-relaxed">
          涵盖 10 大热门出海国：打工度假 WHV、PSW 毕业工签、双元制技工、找工机会卡与直接永居 PR，严格对齐 2026 移民局立法公报。
        </p>
      </div>
    </aside>
  );
};
