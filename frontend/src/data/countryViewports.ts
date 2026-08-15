import type { CountryCode } from '@emigrant/shared';
import { TRACKS_DATA } from '@emigrant/shared';

export type VisaCategoryTag = 'PR' | 'SKILLED' | 'GRADUATE' | 'SEEKER_WHV';

export interface TopVisaItem {
  id: string;
  name: string;
  code: string;
  category: VisaCategoryTag;
  summary?: string;
}

export interface TrackMetric {
  tier: 'GREEN' | 'YELLOW' | 'RED';
  badge: string;
  score: number; // 0 ~ 10
}

export interface CountryViewportData {
  id: CountryCode;
  name: string;
  englishName: string;
  flag: string;
  center: [number, number]; // [longitude, latitude]
  zoom: number; // Focus zoom level
  stayFriendlyScore: number; // Overall stay-friendly score (0 ~ 10)
  keyMetricsSubtitle?: string;
  officialPortalUrl?: string;
  officialPortalName?: string;
  summary: string;
  fatalBottlenecks: string[];
  topVisas: TopVisaItem[];
  trackMetrics: Record<string, TrackMetric>;
}

export const CATEGORY_TAG_CONFIG: Record<
  VisaCategoryTag,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  PR: {
    label: '永居 PR',
    bg: 'bg-[#eaf6ed]',
    text: 'text-[#2e7d32]',
    border: 'border-[#c5e8ce]',
    dot: '#5DB872',
  },
  SKILLED: {
    label: '技能工签',
    bg: 'bg-[#e0f2fe]',
    text: 'text-[#0284c7]',
    border: 'border-[#bae6fd]',
    dot: '#3B82F6',
  },
  GRADUATE: {
    label: '毕业工签',
    bg: 'bg-[#fef9c3]',
    text: 'text-[#a16207]',
    border: 'border-[#fde047]',
    dot: '#D4A017',
  },
  SEEKER_WHV: {
    label: '找工/WHV',
    bg: 'bg-[#f3e8ff]',
    text: 'text-[#9333ea]',
    border: 'border-[#e9d5ff]',
    dot: '#8B5CF6',
  },
};

// Base static geographic coordinates & portals for 14 countries
const COUNTRY_BASE_META: Record<
  CountryCode,
  {
    name: string;
    englishName: string;
    flag: string;
    center: [number, number];
    zoom: number;
    officialPortalUrl: string;
    officialPortalName: string;
    topVisas: TopVisaItem[];
  }
> = {
  NZ: {
    name: '新西兰',
    englishName: 'New Zealand',
    flag: '🇳🇿',
    center: [174.886, -40.9006],
    zoom: 5.2,
    officialPortalUrl: 'https://www.immigration.govt.nz',
    officialPortalName: '新西兰移民局官方公报 (INZ)',
    topVisas: [
      { id: 'nz_smc', code: 'SMC 6分制', name: '技术移民居留签证', category: 'PR', summary: '硕士5分+1年本地经验满6分获批永久回头签' },
      { id: 'nz_green_list', code: '绿名单 Tier 1', name: '直接居留签证 (STR)', category: 'PR', summary: '紧缺清单直接递交永居，极速获批永久回头签' },
      { id: 'nz_pswv', code: 'PSWV 开放工签', name: '毕业生工作签证 (最长3年)', category: 'GRADUATE', summary: '硕士毕业即享 3 年开放全职工签' },
      { id: 'nz_whv', code: 'WHV 打工度假', name: '打工度假签证 (每年1000名额)', category: 'SEEKER_WHV', summary: '低成本肉身入境，转学签与工签黄金跳板' },
    ],
  },
  AU: {
    name: '澳大利亚',
    englishName: 'Australia',
    flag: '🇦🇺',
    center: [133.7751, -25.2744],
    zoom: 3.5,
    officialPortalUrl: 'https://immi.homeaffairs.gov.au',
    officialPortalName: '澳大利亚内政事务部 (Home Affairs)',
    topVisas: [
      { id: 'au_189', code: '189 独立技术', name: '独立技术移民永居', category: 'PR', summary: '不绑定雇主与地域，全澳自由定居' },
      { id: 'au_190', code: '190 州担保', name: '各州政府担保技术移民永居', category: 'PR', summary: '各州优先配额倾斜，获得额外 5 分加分' },
      { id: 'au_482', code: '482 技能短缺', name: 'TSS 雇主担保临时工签', category: 'SKILLED', summary: '满足 TSMIT 门槛，为同一雇主工作满 2 年转 186' },
      { id: 'au_858', code: '国家创新签证', name: '原全球人才 GTI 858', category: 'PR', summary: '十大前沿领域顶尖学者免打分直接绿卡' },
    ],
  },
  CA: {
    name: '加拿大',
    englishName: 'Canada',
    flag: '🇨🇦',
    center: [-106.3468, 56.1304],
    zoom: 3.2,
    officialPortalUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    officialPortalName: '加拿大移民难民及公民部 (IRCC)',
    topVisas: [
      { id: 'ca_ee', code: 'EE 联邦通道', name: '快速通道 (Express Entry CRS)', category: 'PR', summary: 'CRS 评分系统，定向 Tech/Healthcare/法语' },
      { id: 'ca_pnp_tech', code: 'BC/ON 省提名', name: 'BC Tech / 安省技能优先', category: 'PR', summary: '对口紧缺岗位 +600 分直接保送 PR' },
      { id: 'ca_pgwp', code: 'PGWP 毕业工签', name: '公立大学毕业后工作许可', category: 'GRADUATE', summary: '最长可获发 3 年全职开放工签' },
    ],
  },
  DE: {
    name: '德国',
    englishName: 'Germany',
    flag: '🇩🇪',
    center: [10.4515, 51.1657],
    zoom: 5.6,
    officialPortalUrl: 'https://www.bamf.de',
    officialPortalName: '德国联邦移民与难民局 (BAMF)',
    topVisas: [
      { id: 'de_blue_card', code: '欧盟蓝卡', name: 'EU Blue Card 居留许可', category: 'SKILLED', summary: '紧缺年薪 €41,041，21个月德语B1转永居' },
      { id: 'de_chancenkarte', code: '机会卡', name: 'Chancenkarte 积分制找工签', category: 'SEEKER_WHV', summary: '6分即批1年自由求职，免雇主Offer入境' },
      { id: 'de_ausbildung', code: '双元制培训', name: '带薪职业教育与就业居留', category: 'SKILLED', summary: '每月发津贴包就业，2年转德国永居' },
    ],
  },
  UK: {
    name: '英国',
    englishName: 'United Kingdom',
    flag: '🇬🇧',
    center: [-3.436, 55.3781],
    zoom: 5.4,
    officialPortalUrl: 'https://www.gov.uk/government/organisations/uk-visas-and-immigration',
    officialPortalName: '英国签证与移民局 (UKVI)',
    topVisas: [
      { id: 'uk_skilled_worker', code: 'Skilled Worker', name: '技术工作签证', category: 'SKILLED', summary: '年薪达 £38,700 门槛，5年可申请永居 ILR' },
      { id: 'uk_graduate_visa', code: 'Graduate Visa', name: '毕业生签证 (PSW)', category: 'GRADUATE', summary: '本科/硕士享 2 年全职自由停留找工' },
      { id: 'uk_global_talent', code: 'Global Talent', name: '全球人才签证', category: 'PR', summary: '顶尖科研与艺术人才免雇主3年转永居' },
    ],
  },
  IE: {
    name: '爱尔兰',
    englishName: 'Ireland',
    flag: '🇮🇪',
    center: [-8.2439, 53.4129],
    zoom: 5.8,
    officialPortalUrl: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/',
    officialPortalName: '爱尔兰企业与就业部 (DETE)',
    topVisas: [
      { id: 'ie_csep', code: 'CSEP 关键技能', name: '关键技能工作许可', category: 'SKILLED', summary: '最低年薪 €38,000，21个月直接转 Stamp 4 永居' },
      { id: 'ie_stamp1g', code: 'Stamp 1G', name: '第三级毕业生找工许可', category: 'GRADUATE', summary: '硕士毕业享 2 年 Stay Back 全职求职' },
    ],
  },
  JP: {
    name: '日本',
    englishName: 'Japan',
    flag: '🇯🇵',
    center: [138.2529, 36.2048],
    zoom: 4.8,
    officialPortalUrl: 'https://www.isa.go.jp',
    officialPortalName: '日本出入国在留管理厅 (ISA)',
    topVisas: [
      { id: 'jp_hsp', code: '高度专门职 1号', name: '高度人才积分制在留资格', category: 'PR', summary: '满 80 分仅需 1 年即可申请日本永住' },
      { id: 'jp_work', code: '技·人·国', name: '技术·人文知识·国际业务', category: 'SKILLED', summary: '无配额限制，合规企业签署契约即批' },
      { id: 'jp_ssw', code: '特定技能', name: '特定技能 1号/2号', category: 'SKILLED', summary: '14 大紧缺实操领域，2 号可带家属转永住' },
    ],
  },
  SG: {
    name: '新加坡',
    englishName: 'Singapore',
    flag: '🇸🇬',
    center: [103.8198, 1.3521],
    zoom: 8.5,
    officialPortalUrl: 'https://www.mom.gov.sg',
    officialPortalName: '新加坡人力部 (MOM)',
    topVisas: [
      { id: 'sg_ep', code: 'EP (COMPASS)', name: '就业准证 Employment Pass', category: 'SKILLED', summary: 'COMPASS 40 分达标，最低月薪 SGD $5,600' },
      { id: 'sg_spass', code: 'S Pass', name: '中级工作准证', category: 'SKILLED', summary: '技术人员通道，最低月薪 SGD $3,150' },
      { id: 'sg_one_pass', code: 'ONE Pass', name: '顶级专才准证', category: 'PR', summary: '月薪 $30k 顶级高管，5 年免绑定雇主准证' },
    ],
  },
  US: {
    name: '美国',
    englishName: 'United States',
    flag: '🇺🇸',
    center: [-95.7129, 37.0902],
    zoom: 3.5,
    officialPortalUrl: 'https://www.uscis.gov',
    officialPortalName: '美国公民及移民服务局 (USCIS)',
    topVisas: [
      { id: 'us_eb2_niw', code: 'EB-2 NIW', name: '国家利益豁免绿卡', category: 'PR', summary: '理工硕博免雇主免 PERM 自主申请绿卡' },
      { id: 'us_stem_opt', code: 'STEM OPT', name: '3 年全职工作许可延期', category: 'GRADUATE', summary: 'STEM 专业毕业生享 36 个月 OPT 找工缓冲' },
      { id: 'us_o1a', code: 'O-1A', name: '杰出人才工作签证', category: 'SKILLED', summary: '高学术成就学者免抽签全职留美工签' },
    ],
  },
  NL: {
    name: '荷兰',
    englishName: 'Netherlands',
    flag: '🇳🇱',
    center: [5.2913, 52.1326],
    zoom: 6.2,
    officialPortalUrl: 'https://ind.nl',
    officialPortalName: '荷兰移民归化局 (IND)',
    topVisas: [
      { id: 'nl_zoekjaar', code: 'Zoekjaar', name: '硕博毕业生找工签证', category: 'SEEKER_WHV', summary: '全球 Top 200 毕业生获发 1 年自由求职居留' },
      { id: 'nl_kennismigrant', code: '高技术移民', name: 'Kennismigrant 工作许可', category: 'SKILLED', summary: '享 30% Ruling 税收减免，5 年转永居/入籍' },
    ],
  },
  FR: {
    name: '法国',
    englishName: 'France',
    flag: '🇫🇷',
    center: [2.2137, 46.2276],
    zoom: 5.2,
    officialPortalUrl: 'https://www.service-public.fr',
    officialPortalName: '法国公共服务管理局 (Service-Public)',
    topVisas: [
      { id: 'fr_talent_passport', code: 'Passeport Talent', name: '优秀人才居留证', category: 'SKILLED', summary: '4 年有效免劳工部测试，全家自由居留' },
      { id: 'fr_rece', code: 'RECE 找工', name: '找工创业居留', category: 'GRADUATE', summary: '硕博毕业享 12 个月找工与创业许可' },
    ],
  },
  SE: {
    name: '瑞典',
    englishName: 'Sweden',
    flag: '🇸🇪',
    center: [18.6435, 60.1282],
    zoom: 4.2,
    officialPortalUrl: 'https://www.migrationsverket.se',
    officialPortalName: '瑞典移民局 (Migrationsverket)',
    topVisas: [
      { id: 'se_work_permit', code: '工作许可', name: 'Arbetstillstånd 技能工签', category: 'SKILLED', summary: '月薪达 28,480 SEK 门槛，工作满 4 年转永居' },
      { id: 'se_job_seeker', code: '毕业找工', name: '高等教育毕业生居留', category: 'GRADUATE', summary: '高校毕业后享 1 年居留找工' },
    ],
  },
  DK: {
    name: '丹麦',
    englishName: 'Denmark',
    flag: '🇩🇰',
    center: [9.5018, 56.2639],
    zoom: 5.8,
    officialPortalUrl: 'https://www.nyidanmark.dk',
    officialPortalName: '丹麦国际招聘与融合署 (SIRI)',
    topVisas: [
      { id: 'dk_positive_list', code: 'Positive List', name: '高教紧缺职业工签', category: 'SKILLED', summary: '紧缺清单直接签约获批工作许可' },
      { id: 'dk_pay_limit', code: 'Pay Limit', name: '高薪上限计划工签', category: 'SKILLED', summary: '年薪超 487k DKK 自动批签' },
    ],
  },
  FI: {
    name: '芬兰',
    englishName: 'Finland',
    flag: '🇫🇮',
    center: [25.7482, 61.9241],
    zoom: 4.5,
    officialPortalUrl: 'https://migri.fi',
    officialPortalName: '芬兰移民局 (Migri)',
    topVisas: [
      { id: 'fi_specialist', code: 'Specialist', name: '特聘专家极速工签', category: 'SKILLED', summary: '2 周极速获批下签，工作满 4 年转永居' },
      { id: 'fi_post_study', code: '毕业找工', name: '芬兰毕业生 2 年找工居留', category: 'GRADUATE', summary: '全欧最长 2 年全职求职停留许可' },
    ],
  },
};

// Construct dynamic COUNTRY_VIEWPORTS derived directly from TRACKS_DATA
export const COUNTRY_VIEWPORTS: Record<CountryCode, CountryViewportData> = ((): Record<CountryCode, CountryViewportData> => {
  const result: Partial<Record<CountryCode, CountryViewportData>> = {};

  const countryCodes: CountryCode[] = ['NZ', 'AU', 'CA', 'DE', 'UK', 'IE', 'JP', 'SG', 'US', 'NL', 'FR', 'SE', 'DK', 'FI'];

  for (const ccode of countryCodes) {
    const meta = COUNTRY_BASE_META[ccode];
    if (!meta) continue;

    // Collect track metrics across all 8 tracks
    const trackMetrics: Record<string, TrackMetric> = {};
    let totalScoreSum = 0;
    let trackCount = 0;

    for (const [trackId, trackObj] of Object.entries(TRACKS_DATA)) {
      const countryDetail = trackObj.countryRankings[ccode];
      if (countryDetail) {
        trackMetrics[trackId] = {
          tier: countryDetail.scores.tier,
          badge: countryDetail.scores.tierLabel,
          score: countryDetail.scores.compositeScore,
        };
        totalScoreSum += countryDetail.scores.compositeScore;
        trackCount += 1;
      }
    }

    const defaultTrackDetail = TRACKS_DATA.it_ai.countryRankings[ccode];
    const avgScore = trackCount > 0 ? Number((totalScoreSum / trackCount).toFixed(1)) : 7.5;

    result[ccode] = {
      id: ccode,
      name: meta.name,
      englishName: meta.englishName,
      flag: meta.flag,
      center: meta.center,
      zoom: meta.zoom,
      stayFriendlyScore: avgScore,
      keyMetricsSubtitle: defaultTrackDetail?.headlineMetric,
      officialPortalUrl: meta.officialPortalUrl,
      officialPortalName: meta.officialPortalName,
      summary: defaultTrackDetail?.summary || '请选择上方专业赛道查看对口留存分析。',
      fatalBottlenecks: defaultTrackDetail?.fatalBottlenecks || ['请选择具体专业查看对口卡点。'],
      topVisas: meta.topVisas,
      trackMetrics,
    };
  }

  return result as Record<CountryCode, CountryViewportData>;
})();
