import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="text-center pt-4 sm:pt-12 pb-2 sm:pb-4 max-w-4xl mx-auto px-3 sm:px-0 select-none">
      {/* 1. Micro Eyebrow Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[10px] sm:text-[11px] font-mono font-bold text-[#c2410c] mb-3 sm:mb-4 shadow-2xs max-w-full">
        <span>🏛️ 2026 技术移民·工签·永居决策中台</span>
        <span className="text-stone-300 hidden xs:inline">|</span>
        <span className="text-stone-600 hidden xs:inline">只算法案与留存底牌</span>
      </div>

      {/* 2. Main Headline (Serif Big Contrast Style) */}
      <h1 className="font-serif tracking-tight font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.25] sm:leading-[1.18]">
        只算「技术移民与永居确定性」
        <br />
        <span className="text-[#c2410c] text-xl sm:text-3xl md:text-5xl inline-block mt-1 sm:mt-2">同一个专业，选错国家，命运天差地别。</span>
      </h1>

      {/* 3. Subtitle */}
      <p className="text-xs sm:text-sm md:text-base font-medium text-stone-600 max-w-2xl mx-auto leading-relaxed mt-3 sm:mt-4">
        VisaRank 实时监测全球 14 国最新移民法案与中位数时薪门槛，打破传统中介信息差，为你推演真实的工签转永居概率、排期风险与落地可行性。
      </p>
    </section>
  );
};
