import type { PathwayMeta } from '../data/visaRegistryData';
import { ALL_COUNTRY_VISAS } from '@emigrant/shared';

export const SITE_DOMAIN = 'https://visarank.com';
export const DEFAULT_OG_IMAGE = 'https://visarank.com/og-image.png';

// Create quick lookup map for shared visa metadata
const SHARED_VISAS_MAP = new Map(ALL_COUNTRY_VISAS.map((v) => [v.id, v]));

/**
 * Generate L1 Homepage SEO Meta
 */
export function getHomeSeoMeta() {
  return {
    title: 'VisaRank 2026 | 全球留学·工签·永居决策中台与政策打分智库',
    description:
      '客观监测 14 个主流发达经济体最新工签与永居门槛。覆盖 8 大赛道 47 类法定签证，提供 6 维逆向智能选国与致命软肋避坑剖析。同一个专业，换一个国家，命运天差地别。',
    keywords:
      '全球移民政策, 2026工签门槛, 技术移民打分, 留学毕业工签, 绿名单, SMC 6分制, 欧盟蓝卡, 澳洲189, 加拿大EE, VisaRank',
    canonicalUrl: `${SITE_DOMAIN}/#/`,
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_DOMAIN}/#website`,
          url: SITE_DOMAIN,
          name: 'VisaRank',
          description:
            '全球留学·工签·永居决策中台与政策打分智库 (Global Study, Work Visa & Permanent Residency Intelligence Matrix)',
          inLanguage: 'zh-CN',
          publisher: {
            '@type': 'Organization',
            name: 'VisaRank Intelligence Matrix',
            url: SITE_DOMAIN,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_DOMAIN}/og-image.png`,
            },
          },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${SITE_DOMAIN}/#application`,
          name: 'VisaRank 智能选国与签证打分引擎',
          applicationCategory: 'DecisionSupportSystem',
          operatingSystem: 'All',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          featureList: [
            '14个主流国家移民政策实时对齐',
            '47类法定签证打分规则测算',
            '8大主流职业赛道横向对比',
            '政策致命软肋与避坑指南',
          ],
        },
      ],
    },
  };
}

export interface TrackSeoInput {
  id: string;
  name: string;
  shortName?: string;
  hotness?: string;
  summary?: string;
  countryRankings?: Record<string, { summary?: string; headlineMetric?: string }>;
  subDirections?: Array<{ title?: string; subtitle?: string }>;
}

/**
 * Generate L2 Track SEO Meta
 */
export function getTrackSeoMeta(track: TrackSeoInput) {
  const title = `${track.name} 留存与工签决策矩阵 2026 | VisaRank`;
  const hotnessDesc = track.hotness ? `态势研判：${track.hotness}。` : '';
  const summaryDesc = track.summary || '主流发达经济体紧缺职业、毕业工签及技术移民永居通道全景对比。';
  const description = `全景对比 ${track.name} 在主流 14 国的留存难度、工签薪资红线与技术移民永居通道。${hotnessDesc}${summaryDesc}`;
  const keywords = `${track.name}, 紧缺职业, 留学移民, 工签申请, 技术移民, 政策壁垒, ${track.shortName || track.name}, VisaRank`;
  const canonicalUrl = `${SITE_DOMAIN}/#/tracks/${track.id}`;

  const itemList = track.countryRankings
    ? Object.entries(track.countryRankings).map(([cCode, item], idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: `${cCode} - ${track.name} 留存评级`,
        description: item.summary || item.headlineMetric || '',
      }))
    : (track.subDirections || []).map((sub, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: sub.title || `细分方向 ${idx + 1}`,
        description: sub.subtitle || '',
      }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: canonicalUrl,
    inLanguage: 'zh-CN',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: itemList,
    },
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd,
  };
}

/**
 * Generate L3 Visa Pathway Detail SEO Meta & Schema.org JSON-LD (GovernmentService + FAQPage)
 */
export function getVisaDetailSeoMeta(visa: PathwayMeta) {
  const sharedVisa = SHARED_VISAS_MAP.get(visa.id);
  const visaTitle = visa.name || visa.englishName;
  const officialFeeText = visa.officialFee?.local || sharedVisa?.officialFee?.local || '查阅官方最新公报';
  const displayCode = sharedVisa?.code || (visa.code && visa.code.length > 2 ? visa.code : visa.id.toUpperCase());

  // Prevent duplicate country name if title already contains countryName
  const fullVisaName = visaTitle.startsWith(visa.countryName)
    ? visaTitle
    : `${visa.countryName}${visaTitle}`;

  // L3 Specification:
  // Title: ${visa.title} (${visa.code}) 2026最新政策打分与准入门槛 | VisaRank
  // Description: 全景解析${visa.countryName}${visa.title}：官方申请规费 ${visa.officialFee.local}、法案执行周期、ANZSCO 紧缺职业代码与致命雷区避坑指南。
  const title = `${visaTitle} (${displayCode}) 2026最新政策打分与准入门槛 | VisaRank`;
  const description = `全景解析${fullVisaName}：官方申请规费 ${officialFeeText}、法案执行周期、ANZSCO 紧缺职业代码与致命雷区避坑指南。`;
  const keywords = `${visa.countryName}签证, ${visaTitle}, ${displayCode}, 技术移民, 永居申请, 移民法案, 评分规则, 移民局规费, VisaRank`;
  const canonicalUrl = `${SITE_DOMAIN}/#/visas/${visa.id}`;

  // Construct structured FAQs from Fatal Traps, Wage requirements & Verdict
  const faqItems: { question: string; answer: string }[] = [];

  // FAQ 1: Wage requirement
  if (visa.wageRequirementNote) {
    faqItems.push({
      question: `申请 ${visa.name} 是否有强制薪资或时薪门槛？`,
      answer: `${visa.wageRequirementNote}。这是移民局审查申请人是否具备合格技能岗位 (Skilled Employment) 的法定核心门槛。`,
    });
  }

  // FAQ 2: Prerequisites / Threshold
  const thresholdNote =
    visa.passThreshold !== undefined
      ? `法定准入基准为 ${visa.passThreshold} 分（以最新法案细则为准）`
      : '请满足法案法定前置条件';
  faqItems.push({
    question: `${visa.name} (${visa.code}) 的准入门槛与打分要求是什么？`,
    answer: `${thresholdNote}。前置硬性指标：${
      visa.prerequisites?.ageLimit ? `【年龄】${visa.prerequisites.ageLimit}；` : ''
    }${
      visa.prerequisites?.languageBenchmark ? `【语言】${visa.prerequisites.languageBenchmark}；` : ''
    }${
      visa.prerequisites?.employerAccreditation ? `【雇主】${visa.prerequisites.employerAccreditation}。` : ''
    }`,
  });

  // FAQ 3: Fatal Traps & Pitfalls
  if (visa.advisorVerdict?.fatalTraps && visa.advisorVerdict.fatalTraps.length > 0) {
    faqItems.push({
      question: `${visa.name} 申请有哪些致命雷区与避坑要点？`,
      answer: visa.advisorVerdict.fatalTraps.join('；'),
    });
  }

  // FAQ 4: Official Processing Time & Fee
  faqItems.push({
    question: `${visa.name} 官方审理周期与官方规费是多少？`,
    answer: `法案执行/预估审理周期约为 ${visa.processingTime || '6 - 9 个月'}，官方移民局规费为 ${officialFeeText}${
      visa.officialFee?.cnyEstimate ? ` (${visa.officialFee.cnyEstimate})` : ''
    }。最新法案对齐时间：${visa.lastVerifiedDate || '2026.08'}。`,
  });

  // FAQ 5: Ideal Target Applicants
  if (visa.advisorVerdict?.idealFor) {
    faqItems.push({
      question: `${visa.name} 适合哪些背景人群申请？`,
      answer: `推荐画像：${visa.advisorVerdict.idealFor}${
        visa.advisorVerdict.discouragedFor ? `。注意谨慎申请画像：${visa.advisorVerdict.discouragedFor}` : ''
      }`,
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GovernmentService',
        '@id': `${canonicalUrl}#service`,
        name: `${visa.name} (${visa.code})`,
        alternateName: visa.englishName,
        serviceType: visa.category || 'Immigration & Visa Pathway',
        description: visa.keyRuleSummary || description,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
        provider: {
          '@type': 'GovernmentOrganization',
          name: `${visa.countryName}移民官方机构`,
          url: visa.officialDocUrl || 'https://visarank.com',
        },
        offers: {
          '@type': 'Offer',
          price: visa.officialFee?.amount || 0,
          priceCurrency: visa.officialFee?.currency || 'USD',
          description: officialFeeText,
        },
        termsOfService: visa.officialDocUrl,
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd,
  };
}
