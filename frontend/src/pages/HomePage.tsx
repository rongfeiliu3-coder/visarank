import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CountryCode } from '@emigrant/shared';
import { HeroSection } from '../components/HeroSection';
import { GlobalHeatMap } from '../components/map/GlobalHeatMap';
import { CaseStudiesGrid } from '../components/CaseStudiesGrid';
import { PolicyHighlightCards } from '../components/PolicyHighlightCards';
import { GlobalRankTable } from '../components/GlobalRankTable';
import { SEOHead } from '../components/SEOHead';
import { getHomeSeoMeta } from '../utils/seoUtils';

interface HomePageProps {
  onOpenAssessment: (countryCode?: CountryCode) => void;
  onSelectCountry: (countryCode: CountryCode) => void;
  onOpenConsultation?: (visaName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAssessment,
  onSelectCountry,
  onOpenConsultation,
}) => {
  const navigate = useNavigate();
  const seoMeta = getHomeSeoMeta();

  return (
    <div className="space-y-10 sm:space-y-16 py-3 sm:py-6 overflow-x-hidden max-w-full">
      {/* Dynamic SEO & Programmatic Head */}
      <SEOHead
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={seoMeta.keywords}
        canonicalUrl={seoMeta.canonicalUrl}
        ogImage={seoMeta.ogImage}
        jsonLd={seoMeta.jsonLd}
      />

      {/* 1. Hero Headline Section (1:1 OpenTheRank Minimalist Layout) */}
      <HeroSection />

      {/* 2. Global Decision Map with 8 Tracks & Zoom-to-Country HUD */}
      <GlobalHeatMap
        onOpenAssessment={onOpenAssessment}
        onSelectCountry={onSelectCountry}
        onNavigateToTrack={(trackId) => navigate(`/tracks/${trackId}`)}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 3. Three Deep Decision Case Studies (Framer-Motion Hover) */}
      <CaseStudiesGrid
        onStartAssessment={onOpenAssessment}
      />

      {/* 4. Double Column Policy Highlight Briefs */}
      <div id="policy-briefs" className="space-y-4">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
            2026 POLICY PULSE & REGIONAL BRIEF
          </div>
          <h2 className="font-serif text-2xl text-stone-900 font-bold">
            2026 全球政策宽松窗口与紧缩高压快报
          </h2>
        </div>
        <PolicyHighlightCards
          onSelectCountry={onSelectCountry}
        />
      </div>

      {/* 5. Global Multi-Dimensional Benchmark Rank Table */}
      <div id="rank-table" className="pt-4">
        <GlobalRankTable
          searchQuery=""
          activeCategoryFilter="ALL"
          onOpenAssessment={onOpenAssessment}
          onSelectCountry={onSelectCountry}
        />
      </div>
    </div>
  );
};
