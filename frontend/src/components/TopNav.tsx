import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Clock,
  LogOut,
  User as UserIcon,
  FileText,
} from 'lucide-react';
import type { CountryCode } from '@emigrant/shared';
import { TRACKS_DATA } from '../data/mockTracks';
import { useAuth } from '../context/AuthContext';

interface TopNavProps {
  activeCountry: CountryCode | 'ALL';
  onSelectCountry: (code: CountryCode | 'ALL') => void;
  onOpenAssessment: () => void;
  onOpenSavedHistory?: () => void;
  onOpenConsultation?: () => void;
}

const COUNTRIES_LIST: { code: CountryCode; name: string; flag: string; badge?: string; targetVisaId: string }[] = [
  { code: 'NZ', name: '新西兰 (NZ)', flag: '🇳🇿', badge: '6分制SMC', targetVisaId: 'nz_smc' },
  { code: 'AU', name: '澳大利亚 (AU)', flag: '🇦🇺', badge: '189/190/491', targetVisaId: 'au_189' },
  { code: 'CA', name: '加拿大 (CA)', flag: '🇨🇦', badge: 'EE / PNP', targetVisaId: 'ca_ee' },
  { code: 'DE', name: '德国 (DE)', flag: '🇩🇪', badge: '欧盟蓝卡/双元制', targetVisaId: 'de_blue_card' },
  { code: 'SG', name: '新加坡 (SG)', flag: '🇸🇬', badge: 'EP COMPASS', targetVisaId: 'sg_ep' },
  { code: 'JP', name: '日本 (JP)', flag: '🇯🇵', badge: '高度人才/技人国', targetVisaId: 'jp_hsp' },
  { code: 'US', name: '美国 (US)', flag: '🇺🇸', badge: 'EB-2 NIW/OPT', targetVisaId: 'us_eb2_niw' },
  { code: 'NL', name: '荷兰 (NL)', flag: '🇳🇱', badge: 'Zoekjaar找工', targetVisaId: 'nl_zoekjaar' },
  { code: 'UK', name: '英国 (UK)', flag: '🇬🇧', badge: 'SWV工签', targetVisaId: 'uk_skilled_worker' },
  { code: 'IE', name: '爱尔兰 (IE)', flag: '🇮🇪', badge: 'CSEP关键技能', targetVisaId: 'ie_csep' },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeCountry,
  onSelectCountry,
  onOpenAssessment,
  onOpenSavedHistory,
  onOpenConsultation,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (trackRef.current && !trackRef.current.contains(e.target as Node)) {
        setIsTrackDropdownOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userInitial = user?.name
    ? user.name.slice(0, 1).toUpperCase()
    : user?.email
    ? user.email.slice(0, 1).toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#e6dfd8] select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Clean Serif Brand Logo + 2026 Micro Tag */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer group py-1"
        >
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-xl tracking-tight text-[#141413] font-bold group-hover:text-[#c2410c] transition-colors">
              Visa<span className="text-[#c2410c]">Rank</span>
            </span>
            <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-[#efe9de] text-[#6c6a64] border border-[#e6dfd8] tracking-wider">
              2026
            </span>
          </div>
        </Link>

        {/* Right-Aligned Minimalist Navigation Cluster */}
        <div className="flex items-center gap-2 sm:gap-5 md:gap-6">
          {/* 1. Global Overview Text Link */}
          <Link
            to="/"
            className="hidden md:inline-block text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            全球总览
          </Link>

          {/* 2. Track Classification Minimal Dropdown */}
          <div className="relative" ref={trackRef}>
            <button
              onClick={() => {
                setIsTrackDropdownOpen(!isTrackDropdownOpen);
                setIsCountryDropdownOpen(false);
                setIsUserDropdownOpen(false);
              }}
              className="flex items-center gap-0.5 sm:gap-1 text-xs font-medium text-stone-700 hover:text-stone-900 transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
            >
              <span>赛道</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isTrackDropdownOpen ? 'rotate-180 text-stone-700' : ''}`} />
            </button>

            {isTrackDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] shadow-card-hover p-1.5 space-y-0.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                  8大专业留存对比
                </div>
                {TRACKS_DATA.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      navigate(`/tracks/${t.id}`);
                      setIsTrackDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between text-stone-700 hover:bg-[#efe9de] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span>{t.icon}</span>
                      <span className="font-medium">{t.name.split(' (')[0]}</span>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                        t.riskOverall === 'friendly'
                          ? 'bg-[#eaf6ed] text-[#2e7d32]'
                          : t.riskOverall === 'moderate'
                          ? 'bg-[#fdf6e2] text-[#996500]'
                          : 'bg-[#faeaea] text-[#a62828]'
                      }`}
                    >
                      {t.riskBadge.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Legislation Library Minimal Dropdown */}
          <div className="relative" ref={countryRef}>
            <button
              onClick={() => {
                setIsCountryDropdownOpen(!isCountryDropdownOpen);
                setIsTrackDropdownOpen(false);
                setIsUserDropdownOpen(false);
              }}
              className="flex items-center gap-0.5 sm:gap-1 text-xs font-medium text-stone-700 hover:text-stone-900 transition-colors py-2 px-1 cursor-pointer min-h-[44px]"
            >
              <span>法案</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180 text-stone-700' : ''}`} />
            </button>

            {isCountryDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-60 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] shadow-card-hover p-1.5 space-y-0.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                  单一国家立法打分树
                </div>
                {COUNTRIES_LIST.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onSelectCountry(c.code);
                      navigate(`/visas/${c.targetVisaId}`);
                      setIsCountryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                      activeCountry === c.code
                        ? 'bg-[#efe9de] text-[#141413] font-bold'
                        : 'text-[#3d3d3a] hover:bg-[#efe9de]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                    {c.badge && (
                      <span className="text-[9px] font-mono text-stone-500 bg-[#f5f0e8] px-1.5 py-0.2 rounded border border-[#e6dfd8]">
                        {c.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. History Archive Text Link with Clock Icon */}
          {onOpenSavedHistory && (
            <button
              onClick={onOpenSavedHistory}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer min-h-[44px]"
              title="查看已保存的测算方案"
            >
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>历史档案</span>
            </button>
          )}

          {/* 5. 📑 深度报告 Text / Badge Link */}
          {onOpenConsultation && (
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#c2410c] hover:text-[#9a3412] bg-[#c2410c]/8 hover:bg-[#c2410c]/15 px-3 py-1.5 rounded-xl border border-[#c2410c]/20 transition-all cursor-pointer shadow-xs min-h-[36px]"
              title="解锁 2026 全球技术移民 10+ 页深度量化推演报告"
            >
              <FileText className="w-3.5 h-3.5 text-[#c2410c]" />
              <span>深度研报 (¥19.9)</span>
            </button>
          )}

          {/* 6. User Status (Minimalist Avatar / Clean Text) */}
          <div className="relative" ref={userRef}>
            {isAuthenticated ? (
              <div className="flex items-center">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#181715] text-[#faf9f5] flex items-center justify-center text-xs font-mono font-bold hover:scale-105 transition-transform cursor-pointer shadow-xs"
                  title={user?.name || user?.email}
                >
                  {userInitial}
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-[#faf9f5] border border-[#e6dfd8] shadow-card-hover p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 border-b border-[#e6dfd8]/60">
                      <div className="text-xs font-bold text-stone-900 truncate">
                        {user?.name || '用户'}
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono truncate">
                        {user?.email}
                      </div>
                    </div>
                    {onOpenSavedHistory && (
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onOpenSavedHistory();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-stone-700 hover:bg-[#efe9de] flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                      >
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>我的历史档案</span>
                      </button>
                    )}
                    {onOpenConsultation && (
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          onOpenConsultation();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#c2410c] hover:bg-[#fff7ed] flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#c2410c]" />
                        <span>10+页专属推演研报</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-[#c64545] hover:bg-[#faeaea] flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>退出登录</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer py-2 px-1 min-h-[44px]"
              >
                <UserIcon className="w-3.5 h-3.5 text-stone-400" />
                <span>登录</span>
              </button>
            )}
          </div>

          {/* 7. Primary Action CTA: Coral Solid Button */}
          <button
            onClick={onOpenAssessment}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#cc785c] hover:bg-[#b86246] active:bg-[#9a3412] text-white text-xs font-semibold shadow-xs transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer min-h-[38px]"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">智能测算</span>
            <span className="text-[9px] font-mono bg-white/20 px-1 py-0.2 rounded font-bold hidden xs:inline">免费</span>
            <ArrowRight className="w-3 h-3 hidden sm:inline shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
};
