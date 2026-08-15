import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="text-center pt-8 sm:pt-14 pb-4 max-w-4xl mx-auto select-none">
      {/* 1. Micro Eyebrow Badge: Emphasize Immigration & PR, not Study Abroad */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#efe9de] border border-[#e6dfd8] text-[11px] font-mono font-bold text-[#c2410c] mb-4 shadow-2xs">
        <span>🏛️ 全球技术移民·工签·永居确定性决策中台</span>
        <span className="text-stone-300">|</span>
        <span className="text-stone-600">只算真实移民与绿卡，不测虚假留学包装</span>
      </div>

      {/* 2. Main Headline (Serif Big Contrast Style) */}
      <h1 className="font-serif tracking-tight font-bold text-4xl sm:text-6xl text-stone-900 leading-[1.18]">
        只算「技术移民与永居确定性」，
        <br />
        <span className="text-[#c2410c]">同一个专业，选错国家，命运天差地别。</span>
      </h1>

      {/* 3. Subtitle */}
      <p className="text-sm sm:text-base font-medium text-stone-500 max-w-2xl mx-auto leading-relaxed mt-4">
        VisaRank 实时监测全球 14 国最新移民法案与中位数时薪门槛，打破传统中介信息差，为你推演真实的工签转永居概率、排期风险与落地可行性。
      </p>
    </section>
  );
};
