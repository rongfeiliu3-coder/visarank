import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe2,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import type { CountryCode } from '@emigrant/shared';
import { getTrackCountryScore } from '@emigrant/shared';
import countries110m from 'world-atlas/countries-110m.json';
import { TRACKS_DATA } from '../../data/mockTracks';
import { COUNTRY_VIEWPORTS } from '../../data/countryViewports';
import { CountryHudDrawer } from './CountryHudDrawer';

interface GlobalHeatMapProps {
  onOpenAssessment: (countryCode?: CountryCode) => void;
  onSelectCountry?: (countryCode: CountryCode) => void;
  onNavigateToTrack?: (trackId: string) => void;
  onOpenConsultation?: (visaName?: string) => void;
}

const SVG_BASE_WIDTH = 1000;
const SVG_BASE_HEIGHT = 520;

// Departure Base Origin Point: China (Beijing / Shanghai Coordinate)
const ORIGIN_COORDINATE: [number, number] = [116.4074, 39.9042];

// Region ViewBox Presets
type RegionKey = 'GLOBAL' | 'EUROPE' | 'NORTH_AMERICA' | 'APAC';

interface ViewBoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const REGION_VIEWBOXES: Record<RegionKey, { label: string; icon: string; rect: ViewBoxRect }> = {
  GLOBAL: {
    label: '全球全景',
    icon: '🌐',
    rect: { x: 0, y: 0, w: SVG_BASE_WIDTH, h: SVG_BASE_HEIGHT },
  },
  EUROPE: {
    label: '欧洲精细',
    icon: '🇪🇺',
    rect: { x: 410, y: 30, w: 310, h: 250 },
  },
  NORTH_AMERICA: {
    label: '北美',
    icon: '🌎',
    rect: { x: 70, y: 40, w: 400, h: 300 },
  },
  APAC: {
    label: '亚太·澳新',
    icon: '🌏',
    rect: { x: 620, y: 130, w: 380, h: 350 },
  },
};

// European Spider Leader Line Callout Offsets (relative to geographic pin [px, py])
// Staggered & elongated to prevent Nordic / Continental congestion
const EUROPE_SPIDER_OFFSETS: Record<string, { dx: number; dy: number; labelAnchor: 'start' | 'end' | 'middle' }> = {
  IE: { dx: -48, dy: -24, labelAnchor: 'end' },    // Out to North Atlantic
  UK: { dx: -42, dy: -42, labelAnchor: 'end' },    // Out to Hebrides / NW Sea
  NL: { dx: -30, dy: -12, labelAnchor: 'end' },    // North Sea Channel
  FR: { dx: -46, dy: 30, labelAnchor: 'end' },     // Bay of Biscay SW
  DK: { dx: 44, dy: -34, labelAnchor: 'start' },   // Jutland NW / Baltic
  DE: { dx: 44, dy: 24, labelAnchor: 'start' },    // Central Europe East
  SE: { dx: 46, dy: -14, labelAnchor: 'start' },   // Baltic Sea East
  FI: { dx: 52, dy: 8, labelAnchor: 'start' },     // Gulf of Finland East
};

interface LandFeatureItem {
  id: string;
  code: CountryCode | null;
  path: string;
}

// ISO Numeric to 2-letter country code mapping for polygon click detection
const ISO_NUMERIC_TO_CODE: Record<string, CountryCode> = {
  '554': 'NZ',
  '036': 'AU',
  '36': 'AU',
  '124': 'CA',
  '276': 'DE',
  '372': 'IE',
  '826': 'UK',
  '392': 'JP',
  '840': 'US',
  '702': 'SG',
  '528': 'NL',
  '250': 'FR',
  '752': 'SE',
  '246': 'FI',
  '208': 'DK',
};

export const GlobalHeatMap: React.FC<GlobalHeatMapProps> = ({
  onOpenAssessment,
  onSelectCountry,
  onNavigateToTrack,
  onOpenConsultation,
}) => {
  const [activeTrackId, setActiveTrackId] = useState<string>('it_ai');
  const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode | null>(null);
  const [hoveredCountryCode, setHoveredCountryCode] = useState<CountryCode | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionKey>('GLOBAL');
  const [currentViewBox, setCurrentViewBox] = useState<ViewBoxRect>(REGION_VIEWBOXES.GLOBAL.rect);

  const activeTrackMeta =
    TRACKS_DATA.find((t) => t.id === activeTrackId) || TRACKS_DATA[0]!;

  // High Precision D3 Projection
  const { landFeatures, graticulePath, projection, originPixel } = useMemo(() => {
    const proj = geoNaturalEarth1()
      .scale(162)
      .translate([SVG_BASE_WIDTH / 2, SVG_BASE_HEIGHT / 2 + 10]);

    const pathGen = geoPath().projection(proj);

    const geoData = feature(
      countries110m as any,
      countries110m.objects.countries as any
    ) as any;

    const featuresWithPaths: LandFeatureItem[] = (geoData.features || []).map((f: any): LandFeatureItem => {
      const code = ISO_NUMERIC_TO_CODE[String(f.id)] || null;
      return {
        id: String(f.id),
        code,
        path: pathGen(f) || '',
      };
    });

    const graticule = geoGraticule10();
    const gratPath = pathGen(graticule) || '';
    const orig = proj(ORIGIN_COORDINATE) || [680, 200];

    return {
      landFeatures: featuresWithPaths,
      graticulePath: gratPath,
      projection: proj,
      originPixel: orig,
    };
  }, []);

  // Compute 14 Country Nodes projected pixel coordinates
  const countryNodes = useMemo(() => {
    return Object.values(COUNTRY_VIEWPORTS).map((country) => {
      const projected = projection(country.center) || [0, 0];
      const scoreDetail = getTrackCountryScore(activeTrackId, country.id);
      const trackMetric = {
        tier: scoreDetail.tier,
        badge: scoreDetail.tierLabel,
        score: scoreDetail.compositeScore,
      };

      const spiderOffset = EUROPE_SPIDER_OFFSETS[country.id];
      const hasSpiderLeader = !!spiderOffset;
      const calloutX = projected[0] + (spiderOffset?.dx || 8);
      const calloutY = projected[1] + (spiderOffset?.dy || -9);

      return {
        ...country,
        x: projected[0] || 0,
        y: projected[1] || 0,
        calloutX,
        calloutY,
        hasSpiderLeader,
        spiderOffset,
        trackMetric,
      };
    });
  }, [projection, activeTrackId]);

  // Selected Target Node
  const selectedNode = useMemo(() => {
    if (!selectedCountryCode) return null;
    return countryNodes.find((c) => c.id === selectedCountryCode) || null;
  }, [selectedCountryCode, countryNodes]);

  // Smooth Flowing Quadratic Bezier Arc Path from Origin (China) to Target Node
  const arcPath = useMemo(() => {
    if (!selectedNode) return '';

    const x0 = originPixel[0];
    const y0 = originPixel[1];
    const x1 = selectedNode.x;
    const y1 = selectedNode.y;

    const dx = x1 - x0;
    const dy = y1 - y0;
    const dist = Math.hypot(dx, dy);

    // Dynamic upward curvature
    const bow = Math.min(Math.max(dist * 0.28, 35), 90);
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;

    const cx = mx - (dy / dist) * (bow * 0.3);
    const cy = my - Math.abs(bow);

    return `M ${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`;
  }, [selectedNode, originPixel]);

  // Pan-Zoom Camera to Country
  const zoomToCountry = (country: typeof countryNodes[0]) => {
    const isEurope = !!EUROPE_SPIDER_OFFSETS[country.id];
    if (isEurope) {
      // Zoom into European sector
      setCurrentViewBox(REGION_VIEWBOXES.EUROPE.rect);
      setActiveRegion('EUROPE');
    } else if (['US', 'CA'].includes(country.id)) {
      // North America sector
      setCurrentViewBox(REGION_VIEWBOXES.NORTH_AMERICA.rect);
      setActiveRegion('NORTH_AMERICA');
    } else if (['AU', 'NZ', 'JP', 'SG'].includes(country.id)) {
      // APAC sector
      setCurrentViewBox(REGION_VIEWBOXES.APAC.rect);
      setActiveRegion('APAC');
    } else {
      // Default focused bounding box
      const targetW = 320;
      const targetH = 220;
      const targetX = Math.max(0, Math.min(SVG_BASE_WIDTH - targetW, country.x - targetW / 2));
      const targetY = Math.max(0, Math.min(SVG_BASE_HEIGHT - targetH, country.y - targetH / 2));
      setCurrentViewBox({ x: targetX, y: targetY, w: targetW, h: targetH });
    }
  };

  const handleCountrySelect = (code: CountryCode) => {
    const target = countryNodes.find((c) => c.id === code);
    if (target) {
      setSelectedCountryCode(code);
      zoomToCountry(target);
      if (onSelectCountry) onSelectCountry(code);
    }
  };

  const handleResetView = () => {
    setSelectedCountryCode(null);
    setActiveRegion('GLOBAL');
    setCurrentViewBox(REGION_VIEWBOXES.GLOBAL.rect);
  };

  const handleRegionPillClick = (region: RegionKey) => {
    setActiveRegion(region);
    setCurrentViewBox(REGION_VIEWBOXES[region].rect);
  };

  // Escape key handler to reset view & close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getNodeColor = (tier: 'GREEN' | 'YELLOW' | 'RED') => {
    switch (tier) {
      case 'GREEN':
        return {
          fill: '#10B981',
          pulse: 'rgba(16, 185, 129, 0.35)',
          text: '#10b981',
        };
      case 'YELLOW':
        return {
          fill: '#D4A017',
          pulse: 'rgba(212, 160, 23, 0.35)',
          text: '#fbbf24',
        };
      case 'RED':
        return {
          fill: '#E11D48',
          pulse: 'rgba(225, 29, 72, 0.35)',
          text: '#f43f5e',
        };
    }
  };

  return (
    <section id="decision-map" className="space-y-4 max-w-6xl mx-auto select-none">
      {/* 1. Track Pills Selector (8 Major Professional Tracks) */}
      <div className="p-1.5 rounded-2xl bg-[#efe9de]/70 border border-[#e6dfd8] flex flex-nowrap items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
        {TRACKS_DATA.map((t) => {
          const isActive = t.id === activeTrackId;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTrackId(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#181715] text-[#faf9f5] font-semibold shadow-sm'
                  : 'bg-transparent text-stone-600 hover:bg-[#faf9f5]'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.shortName}</span>
              {t.riskOverall === 'strict' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#c64545]" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Interactive SVG Map Canvas Container */}
      <div className="relative rounded-3xl bg-[#f8f6f0] border border-[#e6dfd8] p-3 sm:p-4 overflow-hidden shadow-card-soft">
        {/* Top-Left Control Cluster: Region Quick-Pills + Title */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 flex-wrap">
          {/* Region Quick Navigation Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#faf9f5]/90 backdrop-blur-md border border-[#e6dfd8] shadow-xs">
            {(Object.keys(REGION_VIEWBOXES) as RegionKey[]).map((rKey) => {
              const reg = REGION_VIEWBOXES[rKey];
              const isSelectedReg = activeRegion === rKey && !selectedCountryCode;
              return (
                <button
                  key={rKey}
                  onClick={() => handleRegionPillClick(rKey)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                    isSelectedReg
                      ? 'bg-[#181715] text-white font-bold shadow-xs'
                      : 'text-stone-600 hover:bg-[#efe9de]'
                  }`}
                >
                  <span>{reg.icon}</span>
                  <span className="hidden sm:inline">{reg.label}</span>
                </button>
              );
            })}

            {/* Reset Button (Visible when zoomed or selected) */}
            {(selectedCountryCode || activeRegion !== 'GLOBAL') && (
              <button
                onClick={handleResetView}
                className="px-2 py-1 rounded-lg text-xs font-mono text-[#c2410c] hover:bg-[#efe9de] flex items-center gap-1 transition-colors cursor-pointer"
                title="复位至全球全景 (ESC)"
              >
                <RotateCcw className="w-3 h-3" />
                <span>复位</span>
              </button>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#faf9f5]/90 backdrop-blur-md border border-[#e6dfd8] text-xs shadow-xs">
            <Globe2 className="w-3.5 h-3.5 text-[#c2410c]" />
            <span className="font-serif font-bold text-stone-900">
              {activeTrackMeta.name.split(' (')[0]}
            </span>
          </div>
        </div>

        {/* Top-Right Quick Legend */}
        <div className="absolute top-4 right-4 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#faf9f5]/90 backdrop-blur-md border border-[#e6dfd8] text-[11px] font-mono text-stone-600 shadow-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>宽松/直通</span>
          </span>
          <span className="text-stone-300">|</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D4A017]" />
            <span>需加分</span>
          </span>
          <span className="text-stone-300">|</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
            <span>高门槛</span>
          </span>
        </div>

        {/* 3. SVG Map Base Canvas (Smooth Animated ViewBox Pan-Zoom) */}
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: '480px' }}
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'ocean-bg') {
              handleResetView();
            }
          }}
        >
          <motion.svg
            id="ocean-bg"
            viewBox={`${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.w} ${currentViewBox.h}`}
            className="w-full h-auto block select-none cursor-grab"
            style={{ maxHeight: '540px' }}
            animate={{
              viewBox: `${currentViewBox.x} ${currentViewBox.y} ${currentViewBox.w} ${currentViewBox.h}`,
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Graticule Grid */}
            <path
              d={graticulePath}
              fill="none"
              stroke="#e6dfd8"
              strokeWidth={0.5}
              strokeDasharray="2 2"
              opacity={0.6}
            />

            {/* Land Geographies with Highlighted Boundary Contour */}
            {landFeatures.map((feat) => {
              const isTargetCountry = feat.code !== null;
              const isSelected = feat.code === selectedCountryCode;
              const isHovered = feat.code === hoveredCountryCode;

              const landFill = isSelected
                ? '#cc785c'
                : isHovered
                ? '#e5dcce'
                : isTargetCountry
                ? '#e9e2d5'
                : '#ece7dd';

              const fillOpacity = isSelected ? 0.22 : 1;

              return (
                <path
                  key={feat.id}
                  d={feat.path}
                  fill={landFill}
                  fillOpacity={fillOpacity}
                  stroke={isSelected ? '#cc785c' : isTargetCountry ? '#d5cbbe' : '#ded6cc'}
                  strokeWidth={isSelected ? 1.8 : 0.6}
                  className="transition-colors duration-200 cursor-pointer"
                  onMouseEnter={() => {
                    if (feat.code) setHoveredCountryCode(feat.code);
                  }}
                  onMouseLeave={() => setHoveredCountryCode(null)}
                  onClick={(e) => {
                    if (feat.code) {
                      e.stopPropagation();
                      handleCountrySelect(feat.code);
                    }
                  }}
                />
              );
            })}

            {/* Departure Origin Pin: China (CN) */}
            <g transform={`translate(${originPixel[0]}, ${originPixel[1]})`}>
              <circle r={3.5} fill="#c2410c" />
              <circle r={7} fill="none" stroke="#c2410c" strokeWidth={1} opacity={0.6} />
              <text
                x={0}
                y={13}
                textAnchor="middle"
                fontSize={8}
                fill="#8a8178"
                fontFamily="monospace"
                fontWeight="bold"
              >
                出海基准点 (CN)
              </text>
            </g>

            {/* Dynamic Flowing Bezier Arc Line */}
            {selectedNode && arcPath && (
              <g key={`arc-${selectedNode.id}`}>
                <path
                  d={arcPath}
                  fill="none"
                  stroke="#cc785c"
                  strokeWidth={3}
                  strokeOpacity={0.25}
                />
                <motion.path
                  d={arcPath}
                  fill="none"
                  stroke="#cc785c"
                  strokeWidth={1.8}
                  strokeDasharray="5 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                    strokeDashoffset: [0, -18],
                  }}
                  transition={{
                    pathLength: { duration: 0.35, ease: 'easeOut' },
                    strokeDashoffset: { duration: 1.2, repeat: Infinity, ease: 'linear' },
                  }}
                />
              </g>
            )}

            {/* 14 Country Nodes & Spider Leader Lines */}
            {countryNodes.map((country) => {
              const isSelected = country.id === selectedCountryCode;
              const isHovered = country.id === hoveredCountryCode;
              const colorConfig = getNodeColor(country.trackMetric.tier);

              return (
                <g
                  key={country.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCountryCode(country.id)}
                  onMouseLeave={() => setHoveredCountryCode(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCountrySelect(country.id);
                  }}
                >
                  {/* Spider Leader Line for High-Density Europe Countries */}
                  {country.hasSpiderLeader && (
                    <path
                      d={`M ${country.x} ${country.y} Q ${(country.x + country.calloutX) / 2} ${country.y} ${country.calloutX} ${country.calloutY + 7}`}
                      fill="none"
                      stroke={isSelected ? '#cc785c' : isHovered ? '#8a8178' : '#c4b9ac'}
                      strokeWidth={isSelected ? 1.4 : 0.8}
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Node Geographic Anchor Point */}
                  <g transform={`translate(${country.x}, ${country.y})`}>
                    {/* Ripple on active/selected node */}
                    {isSelected ? (
                      <motion.circle
                        r={8}
                        fill="none"
                        stroke={colorConfig.fill}
                        strokeWidth={2}
                        animate={{
                          r: [8, 20, 28],
                          opacity: [0.9, 0.4, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                    ) : (
                      <motion.circle
                        r={10}
                        fill={colorConfig.pulse}
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2.6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      r={isSelected ? 6.5 : 5}
                      fill={colorConfig.fill}
                      stroke="#faf9f5"
                      strokeWidth={isSelected ? 2 : 1.5}
                      className="shadow-sm transition-all"
                    />
                    <circle r={isSelected ? 2.5 : 1.8} fill="#ffffff" />
                  </g>

                  {/* Callout Badge (Positioned at calloutX, calloutY with spider clearance) */}
                  <g transform={`translate(${country.calloutX}, ${country.calloutY})`}>
                    <rect
                      x={-2}
                      y={0}
                      width={28}
                      height={14}
                      rx={3.5}
                      fill={isSelected || isHovered ? '#181715' : '#faf9f5'}
                      stroke={isSelected ? '#cc785c' : '#e6dfd8'}
                      strokeWidth={isSelected ? 1.2 : 0.8}
                      className="shadow-2xs"
                    />
                    <text
                      x={12}
                      y={10}
                      textAnchor="middle"
                      fill={isSelected || isHovered ? '#faf9f5' : '#292524'}
                      fontSize={8.5}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {country.id}
                    </text>
                  </g>
                </g>
              );
            })}
          </motion.svg>

          {/* 4. Right-Hand High-End Editorial Drawer (Unified Single Card Interface) */}
          <AnimatePresence>
            {selectedCountryCode && (
              <CountryHudDrawer
                countryCode={selectedCountryCode}
                activeTrackId={activeTrackId}
                activeTrackName={activeTrackMeta.name}
                onClose={handleResetView}
                onOpenAssessment={onOpenAssessment}
                onOpenConsultation={onOpenConsultation}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <div className="pt-2 border-t border-[#e6dfd8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-800">💡 交互说明：</span>
            <span>点击任意国家或区域胶囊，镜头平滑推进聚焦，轮廓发光并展开右侧官方智库看板。</span>
          </div>

          {onNavigateToTrack && (
            <button
              onClick={() => onNavigateToTrack(activeTrackId)}
              className="inline-flex items-center gap-1 text-[#c2410c] hover:text-[#9a3412] font-semibold transition-colors cursor-pointer"
            >
              <span>查看 {activeTrackMeta.shortName} 完整矩阵</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
