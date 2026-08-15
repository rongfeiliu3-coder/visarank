import type { CanonicalTrackId, TrackId, ProfessionalTrack, TrackCountryDetail } from '../types/track';
import { TRACK_COUNTRY_MATRIX } from './countryRankings';

interface TrackMeta {
  name: string;
  shortName: string;
  icon: string;
  hotness: string;
  summary: string;
}

const TRACK_METAS: Record<CanonicalTrackId, TrackMeta> = {
  cs_ai: {
    name: "计算机与人工智能 (CS/AI)",
    shortName: "CS / AI",
    icon: "💻",
    hotness: "极高需求 · 区域强分化",
    summary: "全栈架构、AI 大模型、数据工程与网络安全。欧洲/新西兰直通 PR，美英加卡工签薪资高墙。"
  },
  education: {
    name: "幼教与中教 (Education)",
    shortName: "幼教 / 中教",
    icon: "🎓",
    hotness: "极度短缺 · 语言高墙",
    summary: "幼教 (ECT) 与中学 STEM/外语教师。澳新优先保送获邀，核心卡点在 AITSL/Teaching Council 雅思 7788。"
  },
  healthcare: {
    name: "医护与健康 (Healthcare)",
    shortName: "医护 / 护理",
    icon: "🩺",
    hotness: "全球刚需 · 保送获邀",
    summary: "注册护士 (RN)、物理治疗与医技专才。英澳新加美全部列入最顶格优先通道。"
  },
  engineering: {
    name: "工科与绿色技术 (Engineering)",
    shortName: "工科 / 绿能",
    icon: "⚙️",
    hotness: "工业支柱 · 稳健永居",
    summary: "机械制造、电气自动化、新能源与微电子。德国欧盟蓝卡直降 €41k，荷兰/北欧绿能高地。"
  },
  business: {
    name: "文商与金融分析 (Business)",
    shortName: "文商 / 金融",
    icon: "📈",
    hotness: "竞争极度白热化 · 需策略破局",
    summary: "金融分析、会计精算、市场咨询与商业运营。英美澳传统大国工签高墙卡死，欧陆/新加坡高薪差异化突围。"
  },
  media: {
    name: "传媒与数字内容 (Media)",
    shortName: "传媒 / 数字",
    icon: "🎙️",
    hotness: "文化与语言壁垒 · 路径收窄",
    summary: "数字媒体、影视制作、新媒体运营与文化传播。初级薪资与工签红线脱节，多走自由职业或欧陆创意大厂。"
  },
  design: {
    name: "建筑与创意设计 (Design)",
    shortName: "建筑 / 设计",
    icon: "📐",
    hotness: "北欧西欧高地 · 英语通用",
    summary: "建筑设计、UI/UX 交互设计与工业产品造型。荷兰/德国包容度极高，英澳美面临执照或薪资考核。"
  },
  law: {
    name: "法律与公共政策 (Law & Humanities)",
    shortName: "法律 / 社科",
    icon: "⚖️",
    hotness: "本土法系壁垒 · 涉外合规突围",
    summary: "涉外法务、跨国合规、国际仲裁与知识产权。普通法系执业转换繁复，爱尔兰都柏林与英国跨国所高薪破局。"
  }
};

function buildTrackObject(id: TrackId, canonicalKey: CanonicalTrackId): ProfessionalTrack {
  const meta = TRACK_METAS[canonicalKey];
  const matrix = TRACK_COUNTRY_MATRIX[canonicalKey];
  const countryRankings: Record<string, TrackCountryDetail> = {};

  for (const [code, score] of Object.entries(matrix)) {
    countryRankings[code] = {
      countryCode: code as any,
      countryName: code,
      flag: '',
      scores: {
        policyFriendliness: score.dimensions.policy,
        prCertainty: score.dimensions.prCertainty,
        jobAndSalaryMatch: score.dimensions.jobMarket,
        lowBarrierIndex: score.dimensions.lowFriction,
        compositeScore: score.compositeScore,
        tier: score.tier,
        tierLabel: score.tierLabel,
      },
      headlineMetric: score.headline,
      summary: score.verdict,
      fatalBottlenecks: score.fatalBottlenecks,
      recommendedVisas: score.recommendedVisas,
      humorTip: score.humorTip,
    };
  }

  return {
    id,
    name: meta.name,
    shortName: meta.shortName,
    icon: meta.icon,
    hotness: meta.hotness,
    summary: meta.summary,
    countryRankings,
  };
}

// 8 大标准赛道与全量历史别名完整映射
export const TRACKS_DATA: Record<TrackId, ProfessionalTrack> = {
  // Canonical IDs
  cs_ai: buildTrackObject('cs_ai', 'cs_ai'),
  education: buildTrackObject('education', 'education'),
  healthcare: buildTrackObject('healthcare', 'healthcare'),
  engineering: buildTrackObject('engineering', 'engineering'),
  business: buildTrackObject('business', 'business'),
  media: buildTrackObject('media', 'media'),
  design: buildTrackObject('design', 'design'),
  law: buildTrackObject('law', 'law'),

  // Legacy Aliases
  it_ai: buildTrackObject('it_ai', 'cs_ai'),
  early_childhood: buildTrackObject('early_childhood', 'education'),
  nursing_health: buildTrackObject('nursing_health', 'healthcare'),
  engineering_trades: buildTrackObject('engineering_trades', 'engineering'),
  finance_business: buildTrackObject('finance_business', 'business'),
  biotech_pharma: buildTrackObject('biotech_pharma', 'media'),
  creative_design: buildTrackObject('creative_design', 'design'),
  law_humanities: buildTrackObject('law_humanities', 'law'),
  hospitality_culinary: buildTrackObject('hospitality_culinary', 'education'),
};
