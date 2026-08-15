import type { TrackId, ProfessionalTrack } from '../types/track';
import { calculateTrackScore } from '../types/track';

export const TRACKS_DATA: Record<TrackId, ProfessionalTrack> = {
  it_ai: {
    id: 'it_ai',
    name: "计算机与人工智能 (CS/AI)",
    shortName: "CS / AI",
    icon: "💻",
    hotness: "极高需求 · 区域强分化",
    summary: "全栈架构、AI 大模型、数据工程与网络安全。欧洲/新西兰直通 PR，美英加卡工签薪资高墙。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(9.0, 9.2, 8.5, 7.5),
        headlineMetric: "Green List Tier 1 直接PR ｜ SMC 硕士 5分+1年工作",
        summary: "新西兰对高级软件工程师与网络安全实行绿名单 Tier 1 直接居留；普通 IT 硕士凭 5 分主分，在奥克兰或外岛工作 1 年达中位数 $35/h 即可 100% 批签永居。",
        fatalBottlenecks: [
          "初级 Junior 开发岗位在奥克兰已基本饱和，雇主普遍要求 2~3 年以上即战力经验；",
          "SMC 必须持有认证雇主 (AEWV) 时薪达中位数 NZD $35.00/h 的全职合同，若职位被压低判定为 Level 4 则需 1.5 倍时薪 ($52.50/h)；",
          "外岛偏远地区 IT 岗位较少，主要集中在奥克兰与惠灵顿公立机构与科技企业。"
],
        recommendedVisas: [
          {
                    "id": "nz_green_list",
                    "code": "绿名单 STR",
                    "name": "绿色名单直接居留签",
                    "highlight": "ANZSCO 261312 免工签直接PR"
          },
          {
                    "id": "nz_smc",
                    "code": "SMC 6分制",
                    "name": "技术移民居留签证",
                    "highlight": "硕士5分+1年本地工作达标"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(7.0, 6.8, 8.2, 5.5),
        headlineMetric: "ACS 职业评估扣年限 ｜ 189 卷至 85-90 分 ｜ 482 雇主转 186",
        summary: "澳洲 IT 研发岗位薪资丰厚，但 189 独立技术移民因池中积压大量高分候选人导致获邀门槛居高不下，需转战新州/维州/西澳 190 州担保或 482 雇主担保路线。",
        fatalBottlenecks: [
          "ACS 职业评估严苛，非澳洲本土学历直接扣除 2~4 年海外工作经验，应届生必须读 PY 职业年或积累 1 年本土经验；",
          "189 独立技术池中软件工程师裸分普遍卷至 85~95 分，几乎必须凑满 PTE 八炸 (+20分) 与 CCL 社区语言 (+5分)；",
          "482 雇主担保受 TSMIT $73,150 门槛限制，且必须先为同一雇主工作满 2 年方可转 186 永居。"
],
        recommendedVisas: [
          {
                    "id": "au_190",
                    "code": "190 州担保",
                    "name": "各州技术移民永居",
                    "highlight": "维州/新州定向科技通道"
          },
          {
                    "id": "au_482",
                    "code": "482 TSS工签",
                    "name": "技能短缺雇主工签",
                    "highlight": "2年转186永居绿卡"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(7.5, 7.2, 7.8, 6.0),
        headlineMetric: "EE STEM 定向抽选 470~490分 ｜ BC PNP Tech 每周直抽",
        summary: "加拿大联邦 Express Entry 开设 STEM 专属分类抽选，软件开发 (NOC 21232) 与数据科学分数显著低于全类别；BC 省与安省 Tech 通道提供强劲省提名背书。",
        fatalBottlenecks: [
          "普通全类别 CRS 分数高居 530+ 分，若未进 STEM 定向池或无 LMIA/省提名加分极难被捞；",
          "大多伦多与大温哥华地区初级程序员面临大量北美裁员回流竞争，找首份 Local Job 周期延长至 4~6 个月；",
          "安省 OINP 人力资本优先通道对工作经验核验极其细致，税单社保与 JD 职责稍有偏差即遭审计。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "EE 联邦通道",
                    "name": "快速通道 CRS 定向",
                    "highlight": "STEM 类别低分直邀"
          },
          {
                    "id": "ca_pnp_tech",
                    "code": "BC PNP Tech",
                    "name": "BC省科技省提名",
                    "highlight": "持 35 类紧缺 Offer +600分"
          }
],
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(9.2, 9.4, 8.8, 7.8),
        headlineMetric: "欧盟蓝卡 €41.0k 门槛 ｜ 21个月德语B1转永居 ｜ 免专业背景限制",
        summary: "德国是全欧 IT 留存确定性最高的国家。欧盟蓝卡新政对 IT 紧缺人才降至年薪 €41,041，且认可 3 年从业经验免对口文凭，工作满 21 个月 + 德语 B1 直接批永久居留 (Niederlassungserlaubnis)。",
        fatalBottlenecks: [
          "虽工作语言为全英语，但在德生活、租房与融入高度依赖德语，21 个月转永居必须考过歌德/telc B1 证书；",
          "德国外管局 (Ausländerbehörde) 预约等待周期极长（柏林/法兰克福常需 3~5 个月），工签审批排队严重；",
          "德国税率与社保扣除较高（单身一级税卡综合扣除约 40%~42%），到手现金流需合理规划。"
],
        recommendedVisas: [
          {
                    "id": "de_blue_card",
                    "code": "EU 蓝卡",
                    "name": "欧盟蓝卡工作许可",
                    "highlight": "21个月德语B1换德国永居"
          },
          {
                    "id": "de_chancenkarte",
                    "code": "机会卡",
                    "name": "积分制找工签证",
                    "highlight": "6分获发1年自由求职"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(5.5, 5.0, 7.5, 4.5),
        headlineMetric: "£38,700 薪资高墙 ｜ 5年工签转 ILR ｜ Graduate Visa 2年",
        summary: "英国科技生态繁荣但工签新政将普通 Skilled Worker 最低门槛暴涨至 £38,700/年，应届毕业生仅凭 Graduate Visa 找 Junior 职位极难跨越该赞助底线。",
        fatalBottlenecks: [
          "£38,700 的法定最低工签门槛远超伦敦以外地区 Junior 软件开发平均起薪 (£28k~£34k)，大量企业明确不提供 Visa Sponsorship；",
          "每年需缴纳 £1,035/人的 NHS IHS 附加费，全家 5 年续签规费成本极高；",
          "大厂校招 (Grad Scheme) 严重卷入全球名校毕业生，普通院校留学生缺乏实习积累极难突围。"
],
        recommendedVisas: [
          {
                    "id": "uk_skilled_worker",
                    "code": "Skilled Worker",
                    "name": "技术工作签证",
                    "highlight": "需匹配 £38.7k Sponsor"
          },
          {
                    "id": "uk_graduate_visa",
                    "code": "Graduate Visa",
                    "name": "毕业生找工签证",
                    "highlight": "2年自由合法停留缓冲"
          }
],
        humorTip: "留英 IT 同学若在 2 年 PSW 内未拿到能开出 £38.7k 的 Sponsor，建议尽早做好回国或转战爱尔兰/欧洲大陆的 Plan B！欢迎加微信获取主理人精准求职文书精修。",
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(8.8, 8.9, 9.0, 7.2),
        headlineMetric: "欧洲硅谷 ｜ CSEP 关键技能 €38k ｜ 21个月转 Stamp 4 永居",
        summary: "爱尔兰聚集了 Google、Meta、Apple、TikTok 等欧洲总部。软件工程师 (SOC 2136) 列入 Critical Skills 清单，最低年薪仅需 €38,000，工作满 21 个月免劳工测试直接转 Stamp 4 永居卡。",
        fatalBottlenecks: [
          "首都都柏林住房危机极其严峻，租房成本高昂且房源极度紧缺，新毕业生找房难度不亚于找工作；",
          "大厂校招 Headcount 随全球科技周期波动较大，中小型本地企业往往需要 50:50 欧盟员工配比；",
          "医疗与公共交通等基础设施承载力相对有限。"
],
        recommendedVisas: [
          {
                    "id": "ie_csep",
                    "code": "CSEP 关键技能",
                    "name": "关键技能工作许可",
                    "highlight": "21个月直接换Stamp 4"
          },
          {
                    "id": "ie_stamp1g",
                    "code": "Stamp 1G",
                    "name": "毕业生找工许可",
                    "highlight": "硕士享2年合法全职求职"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(7.8, 8.2, 7.5, 6.8),
        headlineMetric: "高度专门职 80分1年永住 ｜ 技人国工签无配额 ｜ 严重缺人",
        summary: "日本 IT 研发极度缺人，政策极度友好。硕士学位 (20分) + 日语 N1 (15分) + 顶尖大学 (10分) + 年轻轻松凑满 80 分，工作满 1 年即可申请日本永住（绿卡）。",
        fatalBottlenecks: [
          "传统日企 IT 薪资水平（年收 400万~600万日元）相比欧美偏低，且存在年功序列与加班文化；",
          "不会日语仅凭英语在乐天、LINE、Mercari 等外资科技企业尚可，在普通传统日企生存空间受限；",
          "日元汇率波动导致换算为人民币/美元后的名义收入吸引力有所稀释。"
],
        recommendedVisas: [
          {
                    "id": "jp_hsp",
                    "code": "高度专门职 1号",
                    "name": "高度人才签证",
                    "highlight": "80分仅需1年申请永住"
          },
          {
                    "id": "jp_work",
                    "code": "技·人·国",
                    "name": "技术·人文知识·国际业务",
                    "highlight": "合规企业签约即批"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(6.8, 6.0, 8.5, 6.2),
        headlineMetric: "COMPASS 40分制 ｜ 月薪 SGD $5.6k ｜ PR 审批黑盒",
        summary: "新加坡亚洲金融与科技枢纽，IT 薪资极具竞争力且税率极低。EP 工签实行 COMPASS 积分制，SOL 紧缺职业加 20 分；但转新加坡 PR 属于 ICA 内部综合考量（种族、融合度、纳税）的无明确分数线黑盒。",
        fatalBottlenecks: [
          "EP 最低薪资基准连年上调至 SGD $5,600/月（金融业 $6,200/月），且随年龄增长薪资底线大幅提高；",
          "转 PR 审批周期长（6~12个月）且通过率不对外公开，非华裔/缺乏本地长期贡献者被拒概率较高；",
          "房租与生活成本位列全球前三，带家属需满足更高的薪资门槛。"
],
        recommendedVisas: [
          {
                    "id": "sg_ep",
                    "code": "EP (COMPASS)",
                    "name": "就业准证 Employment Pass",
                    "highlight": "MOM SOL 紧缺加20分"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(6.2, 5.8, 9.5, 4.0),
        headlineMetric: "STEM OPT 3年全职 ｜ H-1B 抽签中签率 15%~25% ｜ NIW 免雇主",
        summary: "全球最高薪资与顶尖技术策源地。STEM 专业毕业生享 36 个月 OPT 工作许可；理工硕博若有论文引用可自主递交 EB-2 NIW 国家利益豁免绿卡，绕过 H-1B 抽签死结。",
        fatalBottlenecks: [
          "H-1B 抽签中签率常年低迷（中签率约 15%~25%），抽不中则面临 Day-1 CPT 或被外派欧洲/加拿大；",
          "中国大陆出生申请人面临极其漫长的 EB-2 / EB-3 排期（通常需 4~6 年）；",
          "科技大厂裁员导致 PERM 劳工证大规模冻结，雇主担保通道受到实质性阻滞。"
],
        recommendedVisas: [
          {
                    "id": "us_eb2_niw",
                    "code": "EB-2 NIW",
                    "name": "国家利益豁免绿卡",
                    "highlight": "理工硕博免雇主自主申请"
          },
          {
                    "id": "us_stem_opt",
                    "code": "STEM OPT",
                    "name": "3年全职工作许可延期",
                    "highlight": "留美求职最强时间缓冲"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(8.2, 8.5, 8.2, 7.5),
        headlineMetric: "Zoekjaar 找工签 ｜ Top 200 本硕直通 ｜ 优惠工签 €2,865",
        summary: "荷兰拥有 ASML、Booking、飞利浦等科技巨头，全英文工作普及率全欧第一。全球 Top 200 高校硕士毕业生可无条件获得 1 年 Zoekjaar 自由求职签证，转高技术移民享 €2,865/月 优惠薪资线。",
        fatalBottlenecks: [
          "阿姆斯特丹、埃因霍温等城市面临与爱尔兰类似的严重租房短缺；",
          "5 年转永居/入籍必须考过荷兰语融入考试 (Inburgeringsexamen，现提升至 B1 水平)；",
          "高技术移民企业必须具备 IND 保荐资质 (Recognised Sponsor)。"
],
        recommendedVisas: [
          {
                    "id": "nl_zoekjaar",
                    "code": "Zoekjaar",
                    "name": "硕博毕业生找工签证",
                    "highlight": "Top 200 名校毕业直接申"
          },
          {
                    "id": "nl_kennismigrant",
                    "code": "Kennismigrant",
                    "name": "高技术移民工作许可",
                    "highlight": "享 30% Ruling 税收减免"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(7.6, 7.8, 7.2, 6.5),
        headlineMetric: "Passeport Talent 4年工签 ｜ RECE 找工居留",
        summary: "法国优秀人才签证 Passeport Talent 为科技创新创业者与高薪工程师提供 4 年有效居留，免劳工部审查。",
        fatalBottlenecks: [
          "法语在职场晋升与本地初创企业沟通中依然是隐形门槛；",
          "行政审批官僚化严重，各省 Prefeture 办事效率参差不齐。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "Passeport Talent",
                    "name": "优秀人才居留证",
                    "highlight": "4年有效全家同行"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.5, 6.8),
        headlineMetric: "月薪 28,480 SEK 门槛 ｜ 4年工作转永居",
        summary: "瑞典拥有 Spotify、爱立信等科技企业，全英文工作环境优秀，持正规工签工作满 4 年可申请瑞典永居。",
        fatalBottlenecks: [
          "新政大幅上调法定工作许可最低月薪至 28,480 SEK；",
          "工签审理期内禁止离境，移民局严查雇主保险缴费历史 (保险稍有欠缴即被遣返)。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "Arbetstillstånd",
                    "name": "技术工作许可",
                    "highlight": "4年转瑞典永居"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(7.4, 7.6, 7.5, 6.5),
        headlineMetric: "Positive List 紧缺工签 ｜ Pay Limit 高薪计划",
        summary: "丹麦 Positive List 紧缺清单涵盖 IT 架构师与系统工程师，符合资质即可快速获批工签。",
        fatalBottlenecks: [
          "丹麦永居需满足严格的 8 年居留（或 4 年高薪特例）及丹麦语 2 级考试；",
          "税率全球最高梯队，高薪计划年薪要求高达 48.7 万丹麦克朗。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "Positive List",
                    "name": "紧缺职业工作许可",
                    "highlight": "对口IT学历极速获批"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 7.2, 7.0),
        headlineMetric: "Specialist Fast-track 2周下签 ｜ 2年找工居留",
        summary: "芬兰对高科技专家提供全欧最快的 2 周极速下签通道，留学生毕业享长达 2 年全职找工居留，工作满 4 年可申请永久居留。",
        fatalBottlenecks: [
          "芬兰本土科技就业市场规模较小，岗位集中在赫尔辛基与奥卢周边；",
          "冬季气候寒冷漫长，需具备较强心理适应能力。"
],
        recommendedVisas: [
          {
                    "id": "fi_specialist",
                    "code": "Specialist",
                    "name": "特聘技术专家工签",
                    "highlight": "2周极速获批全家同行"
          }
],
      },
    },
  },
  engineering_trades: {
    id: 'engineering_trades',
    name: "核心工科与绿色技术 (Engineering)",
    shortName: "工科 / 绿色技术",
    icon: "🏗️",
    hotness: "国家基建刚需 · 工业强国红利",
    summary: "土木、电气、机械、新能源与矿业工程。华盛顿协议互认，欧洲/澳洲矿区州担配额充足。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(8.9, 9.0, 8.6, 7.5),
        headlineMetric: "华盛顿协议 BEng ｜ 绿色名单 Tier 1 直接PR ｜ 基建大潮",
        summary: "新西兰在水务基础设施、可再生能源与道路交通上面临数十年不遇的工程师短缺。土木 (233211)、电气 (233311)、工程造价 (233213) 均在 Green List Tier 1，持华盛顿协议工学学士 + 中位数 Offer 直接批 PR。",
        fatalBottlenecks: [
          "必须持有华盛顿协议 (Washington Accord) 认证的 BEng 荣誉学士学位，普通理科学士需通过 Engineering NZ 复杂的同等学力评估；",
          "结构工程师在当地从事高层建筑需取得 CPEng 注册特许工程师执照，通常需要 4~5 年项目实践；",
          "制造加工业规模较小，机械工程师岗位需求显著少于土木与电气水利。"
],
        recommendedVisas: [
          {
                    "id": "nz_green_list",
                    "code": "绿名单 Tier 1",
                    "name": "直接居留签证",
                    "highlight": "土木/电气/造价免工签直接PR"
          },
          {
                    "id": "nz_smc",
                    "code": "SMC 6分制",
                    "name": "技术移民居留",
                    "highlight": "工科硕士5分+1年工作直接批"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(8.6, 8.5, 8.8, 7.0),
        headlineMetric: "EA 职业评估秒过 ｜ 矿业土木州担 75分秒邀 ｜ 西澳/昆州直通",
        summary: "澳洲矿业采掘、可再生能源与各州基建带来庞大工科红利。土木、采矿、电力与环境工程师通过 Engineers Australia (EA) 评估难度远低于 IT，在西澳 (WA)、南澳 (SA)、昆州 (QLD) 190/491 州担保中享有极高优先配额。",
        fatalBottlenecks: [
          "非华盛顿协议高校毕业生需撰写 3 篇复杂的 CDR (Career Episodes) 技术报告，查重与工程逻辑审查严格；",
          "初级应届毕业生若缺乏本地现场经验 (Site Experience) 容易卡在第一份工作，建议积极考取 White Card 白卡进工地实习；",
          "纯机械/工业工程在悉尼墨尔本岗位偏少，需愿意前往西澳珀斯、昆州布里斯班等资源型重镇。"
],
        recommendedVisas: [
          {
                    "id": "au_189",
                    "code": "189 独立技术",
                    "name": "独立技术移民永居",
                    "highlight": "工科大类常态化获邀"
          },
          {
                    "id": "au_190",
                    "code": "190 州担保",
                    "name": "各州技术移民永居",
                    "highlight": "西澳/南澳矿业绿色通道"
          }
],
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(9.5, 9.6, 9.4, 8.2),
        headlineMetric: "工业4.0制造强国 ｜ 蓝卡 €41.0k 紧缺 ｜ 机械/电气/汽车直批",
        summary: "德国是全球工科留学生的绝对圣地。机械制造、汽车工程、电气自动化、绿色氢能等列入顶格紧缺，享 €41,041 蓝卡优惠薪资，毕业后在西门子、博世、宝马等工业巨头就业即可 21 个月稳拿永居。",
        fatalBottlenecks: [
          "传统德国工业企业（尤其是中大型隐形冠军 Mittelstand）对德语要求极高，现场技术交流与文档管理通常需德语 B2 甚至 C1；",
          "德国 TU9 理工大学毕业难度极大，学制常有延毕（平均 2.5~3.5 年完成硕士）；",
          "工业企业多分布在斯图加特、慕尼黑等高生活成本南部联邦州或偏远工业小镇。"
],
        recommendedVisas: [
          {
                    "id": "de_blue_card",
                    "code": "EU 蓝卡",
                    "name": "欧盟蓝卡工作许可",
                    "highlight": "机械/电气21个月直接转永居"
          },
          {
                    "id": "de_chancenkarte",
                    "code": "机会卡",
                    "name": "积分制找工签证",
                    "highlight": "工科名校毕业生免Offer直通"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(7.8, 7.5, 8.0, 6.2),
        headlineMetric: "EE STEM 定向抽选 ｜ 阿省能源走廊 ｜ P.Eng 执业注册",
        summary: "加拿大阿尔伯塔省 (Alberta) 能源与石油工业、安省先进制造带来稳定工科需求，土木与机械工程师受惠于联邦 Express Entry STEM 定向低分抽选。",
        fatalBottlenecks: [
          "成为加拿大专业工程师 (P.Eng) 需通过省级工程师协会 (如 PEO / APEGA) 严苛审核与 4 年本地受监督工作经历；",
          "阿省等资源型省份受国际油价与大宗商品周期波动显著；",
          "普通全类别 EE 门槛居高不下，需通过省提名或法语双语加分对冲。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "EE 联邦通道",
                    "name": "STEM 分类定向抽选",
                    "highlight": "土木/电气/机械低分直邀"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(6.2, 5.8, 7.8, 5.0),
        headlineMetric: "£38,700 薪资高墙 ｜ 海上风电/高铁基建 ｜ 5年工签转 ILR",
        summary: "英国在海上风电、高铁 (HS2) 及国防航天领域缺乏资深工程师，但起薪同样受 £38,700 门槛制约，需争取大厂 Graduate Scheme 方可获得 Sponsorship。",
        fatalBottlenecks: [
          "初级工科岗位起薪往往低于 £38,700，大量中小型工程咨询公司因担保成本放弃招聘国际生；",
          "涉密国防与高端航天项目通常限制非英籍/非北约国籍学者进入核心研发。",
          "5 年转永居流程漫长，全家规费成本高昂。"
],
        recommendedVisas: [
          {
                    "id": "uk_skilled_worker",
                    "code": "Skilled Worker",
                    "name": "技术工作签证",
                    "highlight": "需对齐 £38.7k Sponsor"
          }
],
        humorTip: "留英工科同学建议大二大三务必拿下 Summer Placement 工业实习，否则毕业面对 £38.7k 薪资高墙只能泪洒希思罗！主理人团队提供专业工科 CV 重构服务。",
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(8.5, 8.6, 8.8, 7.0),
        headlineMetric: "半导体与医疗器械工程 ｜ CSEP €38k ｜ 21个月转 Stamp 4",
        summary: "爱尔兰聚集了 Intel、Boston Scientific、Pfizer 等半导体与医疗器械巨头，微电子、生物工艺及自动化工程师享有 CSEP 关键技能 21 个月转永居特权。",
        fatalBottlenecks: [
          "都柏林及科克地区住房租金高昂；",
          "非半导体与生物制药相关的重型工业制造在爱尔兰规模有限。"
],
        recommendedVisas: [
          {
                    "id": "ie_csep",
                    "code": "CSEP 关键技能",
                    "name": "关键技能工作许可",
                    "highlight": "半导体/医疗器械21个月转Stamp4"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(8.2, 8.5, 8.5, 6.8),
        headlineMetric: "精密制造大国 ｜ 高度人才加分 ｜ 技人国签证免配额",
        summary: "日本重工业、半导体材料与机器人制造极度渴求工科人才，理工科毕业生进日产、三菱、索尼等直接签约技人国工签，高度专门职满 80 分 1 年拿永住。",
        fatalBottlenecks: [
          "工厂与研发中心多位于关东/关西近郊或地方城市；",
          "需要掌握扎实的工程日语与安全规程。"
],
        recommendedVisas: [
          {
                    "id": "jp_hsp",
                    "code": "高度专门职 1号",
                    "name": "高度人才签证",
                    "highlight": "80分1年拿永住"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(7.0, 6.2, 8.5, 6.5),
        headlineMetric: "先进制造与半导体枢纽 ｜ COMPASS 40分制",
        summary: "新加坡在晶圆制造、海事工程与绿色能源方面持续招募资深工程师，但转 PR 依然受国家配额限制。",
        fatalBottlenecks: [
          "晶圆厂倒班与无尘室工作压力较大；",
          "PR 审批无明确分数线。"
],
        recommendedVisas: [
          {
                    "id": "sg_ep",
                    "code": "EP (COMPASS)",
                    "name": "就业准证",
                    "highlight": "高端制造对口月薪 SGD $5.6k+"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(6.8, 6.2, 9.4, 4.5),
        headlineMetric: "STEM OPT 3年 ｜ EB-2 NIW 芯片与能源科研豁免",
        summary: "美国在芯片半导体 (CHIPS Act)、航空航天、新能源方面投资巨大，工科硕博凭借论文与专利非常适合走 EB-2 NIW 国家利益豁免直接拿绿卡。",
        fatalBottlenecks: [
          "H-1B 抽签中签率低，EB-2 存在数年排期；",
          "核心航空航天与国防涉密岗位限制 Green Card 或 US Citizen。"
],
        recommendedVisas: [
          {
                    "id": "us_eb2_niw",
                    "code": "EB-2 NIW",
                    "name": "国家利益豁免绿卡",
                    "highlight": "工科硕博免雇主拿绿卡"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(8.8, 9.0, 9.0, 7.8),
        headlineMetric: "ASML 欧洲光刻中心 ｜ 埃因霍温高科技园区 ｜ 优惠工签 €2,865",
        summary: "荷兰拥有光刻机霸主 ASML 及顶尖高科技园区 Brainport，机械、光学、半导体与软件工程享有全欧最高水平的英文研发环境与 30% Ruling 税收减免。",
        fatalBottlenecks: [
          "埃因霍温住房极度紧缺；",
          "5 年后换永居需考荷兰语 B1。"
],
        recommendedVisas: [
          {
                    "id": "nl_zoekjaar",
                    "code": "Zoekjaar",
                    "name": "找工签证",
                    "highlight": "名校工科直通1年自由求职"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 7.8, 6.5),
        headlineMetric: "航空航天与核能大国 ｜ Passeport Talent 4年",
        summary: "法国在空中客车 (Airbus)、达索航空、核能电力拥有全球顶级产业链，持人才通行证免劳工测试。",
        fatalBottlenecks: [
          "传统国企与军工单位涉及安全涉密；",
          "日常法语沟通需达到 B2 以上。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "Passeport Talent",
                    "name": "优秀人才居留证",
                    "highlight": "4年有效全家同行"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(8.0, 8.2, 8.0, 7.0),
        headlineMetric: "绿色电池与重型卡车制造 ｜ 4年转永居",
        summary: "瑞典在绿色钢铁、沃尔沃重卡、Northvolt 电池等绿色转型领域大量招聘工程师，英文普及度极高。",
        fatalBottlenecks: [
          "部分初创电池厂面临供应链与融资重组风险；",
          "法定最低月薪提升至 28,480 SEK。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "Arbetstillstånd",
                    "name": "工作许可",
                    "highlight": "4年转永居"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(8.2, 8.4, 8.2, 6.8),
        headlineMetric: "风电巨头 Vestas / Ørsted ｜ Positive List 紧缺",
        summary: "丹麦是全球风力发电与绿色能源策源地，风能与土木电气工程师享有 Positive List 极速签证通道。",
        fatalBottlenecks: [
          "丹麦永居要求 8 年居留与丹麦语 2 级考试；",
          "生活成本与税率高。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "Positive List",
                    "name": "紧缺职业工作许可",
                    "highlight": "绿色能源极速获批"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(8.0, 8.2, 7.8, 7.0),
        headlineMetric: "海事造船与林业工程 ｜ 2周极速专家工签",
        summary: "芬兰在大型邮轮制造、绿色造纸与清洁能源技术方面持续招募工程专家，享 2 周下签通道与 4 年转永居。",
        fatalBottlenecks: [
          "本土制造业体量有限；",
          "冬季日照极短。"
],
        recommendedVisas: [
          {
                    "id": "fi_specialist",
                    "code": "Specialist",
                    "name": "特聘技术专家工签",
                    "highlight": "2周极速下签"
          }
],
      },
    },
  },
  nursing_health: {
    id: 'nursing_health',
    name: "护理与临床医疗 (Healthcare)",
    shortName: "护理 / 医疗",
    icon: "🩺",
    hotness: "全球硬通货 · 极速获邀特权",
    summary: "注册护士、全科医生、物理治疗与医学检验。各国移民局首批保送秒邀，核心门槛在于行会执照注册与语言。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(9.8, 9.9, 9.8, 8.5),
        headlineMetric: "Green List Tier 1 直接PR ｜ 无等待期秒批 ｜ 护理行会注册",
        summary: "新西兰对注册护士实行全网最强绿名单 Tier 1 直接居留，境内/境外只要完成 Nursing Council of NZ 官方注册并拿到合规 Job Offer，免工作年限直接批全家永久居留。",
        fatalBottlenecks: [
          "国内学历需通过 CGFNS 资格认证并完成 CAP (Competence Assessment Programme) 临床过渡课程；",
          "语言门槛死卡雅思学术类听说读写 4 个 7 或 OET 4 个 B。"
],
        recommendedVisas: [
          {
                    "id": "nz_green_list",
                    "code": "绿名单 Tier 1",
                    "name": "直接居留签证 (STR)",
                    "highlight": "注册护士直接递交PR秒批"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(9.6, 9.8, 9.6, 8.2),
        headlineMetric: "189 独立技术 65分保送 ｜ ANMAC 全评 ｜ AHPRA 执业注册",
        summary: "澳洲注册护士 (254499) 与助产士在 189 独立技术移民中常态化 65 分最低及格线秒邀，各州 190 州担保无脑保送，起薪达 AUD $75k~$95k/年。",
        fatalBottlenecks: [
          "AHPRA 注册必须达到雅思 Academic 4 个 7 或 PTE 4 个 65 (允许 6 个月内拼分一次)；",
          "护士留学申请极其火爆，各大学 Nursing 课程名额每年极早被抢空。"
],
        recommendedVisas: [
          {
                    "id": "au_189",
                    "code": "189 独立技术",
                    "name": "独立技术移民永居",
                    "highlight": "65分最低基准线即邀"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(9.2, 9.4, 9.0, 7.8),
        headlineMetric: "EE Healthcare 定向抽选 430分 ｜ 省提名免打分直通",
        summary: "加拿大联邦快速通道开设 Healthcare 专属定向抽选，护士与医疗技师分数低至 430 分左右，各省均开设医护专属特快绿卡通道。",
        fatalBottlenecks: [
          "海外护士转换 NNAS (National Nursing Assessment Service) 认证流程冗长（耗时 1~2 年）；",
          "部分省份要求补充临床实践考试 (OSCE) 或补修本地学分。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "EE 联邦通道",
                    "name": "Healthcare 定向抽选",
                    "highlight": "430~460分超低分直通PR"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(8.8, 8.9, 9.0, 7.5),
        headlineMetric: "Health and Care 签证 ｜ 免缴 NHS IHS 附加费 ｜ 5年转永居",
        summary: "英国对 NHS 与合规养老机构护士提供专属健康与护理签证，全额免除每年 £1,035/人的 IHS 附加费，薪资门槛享受优惠待遇。",
        fatalBottlenecks: [
          "需通过 NMC 电脑机考 (CBT) 与现场实操考试 (OSCE)；",
          "NHS 公立医院临床工作节奏快、负荷大。"
],
        recommendedVisas: [
          {
                    "id": "uk_skilled_worker",
                    "code": "Health and Care",
                    "name": "医疗护理专属签证",
                    "highlight": "免IHS附加费/5年永居"
          }
],
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(8.8, 9.0, 8.8, 7.5),
        headlineMetric: "双元制培训 (Ausbildung) ｜ 带薪免学费 ｜ 毕业即转绿卡",
        summary: "德国针对护理人才开设带薪双元制职业培训（每月发放 €1,100~€1,300 津贴），毕业后 100% 被医院留用，工作满 2 年直接申请德国永居。",
        fatalBottlenecks: [
          "入学前必须达到德语 B1~B2 临床沟通水平；",
          "护理实操包括大量基础照护工作，需要较强心理适应力。"
],
        recommendedVisas: [
          {
                    "id": "de_ausbildung",
                    "code": "双元制",
                    "name": "带薪职业教育",
                    "highlight": "毕业直通德国永居"
          }
],
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(9.2, 9.5, 9.2, 8.0),
        headlineMetric: "NMBI 注册护士 ｜ CSEP 关键技能 ｜ 21个月换 Stamp 4 永居",
        summary: "爱尔兰公立与私立医院护士列入顶级关键技能清单，通过 NMBI 注册后签约即享 CSEP，21 个月直接转 Stamp 4 永居。",
        fatalBottlenecks: [
          "NMBI 海外资格审核耗时较长；",
          "都柏林生活成本较高。"
],
        recommendedVisas: [
          {
                    "id": "ie_csep",
                    "code": "CSEP",
                    "name": "关键技能工作许可",
                    "highlight": "21个月转Stamp 4"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(8.0, 8.2, 8.0, 7.0),
        headlineMetric: "特定技能 2号 / 介护福祉士 ｜ 终身居留可带家属",
        summary: "日本介护与护理极度缺人，考取介护福祉士国家资格或特定技能 2 号可实现无限期居留并携全家赴日定居。",
        fatalBottlenecks: [
          "介护福祉士国家考试为全日文，专业词汇量大；",
          "起薪相对欧美偏低。"
],
        recommendedVisas: [
          {
                    "id": "jp_ssw",
                    "code": "特定技能",
                    "name": "特定技能签证",
                    "highlight": "2号转永住可带家属"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(7.8, 7.5, 8.5, 7.0),
        headlineMetric: "SNB 注册护士 ｜ 公立医院签约 ｜ 获批 PR 概率极高",
        summary: "新加坡三大公立医疗集群常态化招募国际护士，通过 SNB 执业注册并签约后，申请新加坡 PR 获批率显著高于商科金融。",
        fatalBottlenecks: [
          "初级护士多持有 S Pass 或工作准证；",
          "工作节奏极度紧凑。"
],
        recommendedVisas: [
          {
                    "id": "sg_spass",
                    "code": "S Pass",
                    "name": "中级技能准证",
                    "highlight": "公立医院直接担保"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(8.5, 8.8, 9.5, 6.8),
        headlineMetric: "EB-3 Schedule A 豁免劳工证 ｜ NCLEX-RN 绿卡直通",
        summary: "美国将注册护士列入 Schedule A 紧缺职业，免除 PERM 劳工证审查，通过 NCLEX-RN 考试并拿到雇主聘书可直接递交 EB-3 移民签证。",
        fatalBottlenecks: [
          "中国大陆出生申请人面临数年 EB-3 签证排期；",
          "需通过 VisaScreen 英语认证 (雅思口语 7.0 / 总分 6.5)。"
],
        recommendedVisas: [
          {
                    "id": "us_eb2_niw",
                    "code": "EB-3 Schedule A",
                    "name": "医护豁免劳工证移民",
                    "highlight": "持 NCLEX-RN 雇主担保拿绿卡"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.8, 6.0),
        headlineMetric: "BIG 注册执照 ｜ 荷兰语 B2 硬门槛",
        summary: "荷兰医疗体系完善但进入门槛死卡 BIG 注册执照与荷兰语 B2 临床考试，非荷语背景申请人较难直接执业。",
        fatalBottlenecks: [
          "荷兰语 BIG 考试难度极高；",
          "非欧盟学历认证繁复。"
],
        recommendedVisas: [
          {
                    "id": "nl_kennismigrant",
                    "code": "高技术移民",
                    "name": "高技术移民工签",
                    "highlight": "通过 BIG 注册后直通"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(7.2, 7.5, 7.5, 5.5),
        headlineMetric: "Ordre des Infirmiers 执业注册 ｜ 法语 B2",
        summary: "法国公立医院紧缺护士，但执业必须通过法国护士公会注册并具备流畅法语临床沟通能力。",
        fatalBottlenecks: [
          "海外非欧盟文凭认证需补修临床实习；",
          "薪资与规费相对固定。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "Passeport Talent",
                    "name": "优秀人才居留",
                    "highlight": "公立医院全职聘用"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.8, 6.0),
        headlineMetric: "Socialstyrelsen 执照 ｜ 瑞典语 C1 临床门槛",
        summary: "瑞典医疗护理缺口大，但国家卫生福利委员会 (Socialstyrelsen) 严格要求医学瑞典语达到 C1 等级。",
        fatalBottlenecks: [
          "瑞典语 C1 考试极为硬核；",
          "执业前需完成理论考试与临床见习。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "工签",
                    "name": "技术工作许可",
                    "highlight": "通过执照认证后4年转永居"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(7.6, 7.8, 7.8, 6.0),
        headlineMetric: "丹麦患者安全局执照 ｜ 丹麦语 3 级考试",
        summary: "丹麦开设医疗工作许可，但需在 3 年内通过丹麦语 3 级考试并完成执照适应性实习。",
        fatalBottlenecks: [
          "语言学习周期长；",
          "永居居留时间要求长。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "Positive List",
                    "name": "紧缺工签",
                    "highlight": "医护紧缺直批"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 7.8, 6.2),
        headlineMetric: "Valvira 执业注册 ｜ 芬兰语/瑞典语门槛",
        summary: "芬兰老龄化加剧急需护士，通过国家监管局 Valvira 注册后享有极高就业稳定性与 4 年转永居。",
        fatalBottlenecks: [
          "芬兰语学习难度大；",
          "海外学历审核周期 6~12 个月。"
],
        recommendedVisas: [
          {
                    "id": "fi_specialist",
                    "code": "Specialist",
                    "name": "专家工签",
                    "highlight": "医院直聘4年转永居"
          }
],
      },
    },
  },
  early_childhood: {
    id: 'early_childhood',
    name: "幼教与中学教育 (Education)",
    shortName: "幼教 / 中学教育",
    icon: "👶",
    hotness: "极度短缺 · 语言高墙",
    summary: "幼教 (ECT) 与中学 STEM/外语教师。澳新优先保送获邀，核心卡点在 AITSL/Teaching Council 雅思 7788。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(9.4, 9.5, 9.2, 8.0),
        headlineMetric: "1年 GD 课程 ｜ Green List Tier 1 注册教师 ｜ 直接PR",
        summary: "新西兰幼教与中学教师位列 Green List Tier 1，读 1 年 GD (Graduate Diploma) 课程取得 Teaching Council 注册并获聘用，直接递交永久居留。",
        fatalBottlenecks: [
          "入学前必须考过雅思学术类 4 个 7 (读写听各7.0，听说各7.0) 或完成英联邦 3~4 年本科学历豁免；",
          "幼教日常体力与安全责任较重。"
],
        recommendedVisas: [
          {
                    "id": "nz_green_list",
                    "code": "绿名单 Tier 1",
                    "name": "直接居留签证",
                    "highlight": "注册教师直接拿PR"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(9.4, 9.6, 9.2, 7.8),
        headlineMetric: "AITSL 职评保送 ｜ 189/190 65分秒邀 ｜ 紧缺顶流",
        summary: "澳洲幼儿教师 (241111) 与中学教师 (241411) 长期稳居 189 独立技术与各州 190 担保最低 65 分获邀天梯榜首，就业岗位极度充裕。",
        fatalBottlenecks: [
          "AITSL 教师职业评估死卡雅思 7788（读写 7.0，听力 8.0，口语 8.0），仅在澳/英/美/新/加完成 4 年全日制高等教育方可豁免；",
          "需具备澳洲本地 45~60 天以上教育实习合格证明。"
],
        recommendedVisas: [
          {
                    "id": "au_189",
                    "code": "189 独立技术",
                    "name": "独立技术移民永居",
                    "highlight": "65分超低分保送获邀"
          },
          {
                    "id": "au_190",
                    "code": "190 州担保",
                    "name": "各州技术移民",
                    "highlight": "维州/新州绿色通道"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(8.0, 8.2, 8.2, 7.0),
        headlineMetric: "ECE 幼教省提名 ｜ BC/阿省专属通道",
        summary: "加拿大 BC 省与阿尔伯塔省等针对 ECE (Early Childhood Educator) 开设专项省提名抽选，分数显著低于全类别。",
        fatalBottlenecks: [
          "薪资水平普遍处于中低位（约 CAD $20~$26/h）；",
          "各省 ECE 执照互认流程各异。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "省提名通道",
                    "name": "BC PNP ECE 定向",
                    "highlight": "幼教专向超低分获邀"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(6.5, 6.0, 7.5, 5.5),
        headlineMetric: "QTS 教师资格 ｜ STEM/外语中学教师 ｜ £38.7k 门槛",
        summary: "英国对数学、物理及外语中学教师提供 QTS 认证与工签，但普通幼教岗位极难达到 £38,700 的法定薪资门槛。",
        fatalBottlenecks: [
          "幼教起薪普遍低于工签高墙；",
          "QTS 考核对英国国家课程教学大纲要求极严。"
],
        recommendedVisas: [
          {
                    "id": "uk_skilled_worker",
                    "code": "Skilled Worker",
                    "name": "工作签证",
                    "highlight": "中学STEM教师专项担保"
          }
],
        humorTip: "想去英国做幼教的同学请三思：普通幼儿园几乎开不出 £38.7k 的工签工资，建议转战澳新 1 年读完直接永居！",
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 8.0, 6.5),
        headlineMetric: "Erzieher 幼师培训 ｜ 严重缺人 ｜ 德语 B2",
        summary: "德国各州公立与教会幼儿园严重缺人，通过 Erzieher 双元制职业培训或高校教育学认证，毕业后直接转永居。",
        fatalBottlenecks: [
          "必须达到德语 B2 甚至 C1 级别母语级沟通；",
          "各联邦州文教部认证流程独立。"
],
        recommendedVisas: [
          {
                    "id": "de_ausbildung",
                    "code": "双元制培训",
                    "name": "幼师职业教育",
                    "highlight": "带薪培训毕业留用"
          }
],
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 8.0, 6.8),
        headlineMetric: "Teaching Council 注册 ｜ 英语 7788 门槛",
        summary: "爱尔兰对中学 STEM 教师有一定需求，通过 Teaching Council 注册后可匹配正规全职工作许可。",
        fatalBottlenecks: [
          "小学教师必须掌握爱尔兰语 (Gaeilge)；",
          "都柏林生活成本高。"
],
        recommendedVisas: [
          {
                    "id": "ie_csep",
                    "code": "CSEP",
                    "name": "工作许可",
                    "highlight": "注册中学教师通道"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.0, 6.5),
        headlineMetric: "国际学校英语教师 ｜ 技人国工签",
        summary: "日本私立国际学校与英语培训机构持续招聘外教，持有海外本科学位直接下发技人国工签。",
        fatalBottlenecks: [
          "公立学校教师需日本国籍；",
          "薪资涨幅相对平缓。"
],
        recommendedVisas: [
          {
                    "id": "jp_work",
                    "code": "技·人·国",
                    "name": "国际业务工签",
                    "highlight": "国际学校直聘"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(6.8, 6.0, 7.5, 6.0),
        headlineMetric: "ECDA 认证幼教 ｜ S Pass 准证",
        summary: "新加坡幼儿培育署 (ECDA) 认证 L2 级华文幼教需求稳定，但多发放 S Pass 准证，转 PR 需看长期融合度。",
        fatalBottlenecks: [
          "薪资处于中等水平；",
          "PR 审批通过率存在不确定性。"
],
        recommendedVisas: [
          {
                    "id": "sg_spass",
                    "code": "S Pass",
                    "name": "中级工作准证",
                    "highlight": "华文幼教稳定获聘"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(6.0, 5.5, 7.5, 4.5),
        headlineMetric: "K-12 教师 ｜ J-1 交流或 H-1B 抽签",
        summary: "美国部分公立学区通过 J-1 教师交流项目引进双语与数学教师，转 EB-2/EB-3 需经漫长雇主担保。",
        fatalBottlenecks: [
          "J-1 签证受 2 年回国服务条款 (212e) 限制；",
          "公立学区财政预算受限。"
],
        recommendedVisas: [
          {
                    "id": "us_stem_opt",
                    "code": "OPT/J-1",
                    "name": "教师交流与工作",
                    "highlight": "双语教师合作项目"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.2, 5.8),
        headlineMetric: "国际学校 ｜ DUO 教师资质认证",
        summary: "荷兰阿姆斯特丹与海牙国际学校招募全英文教师，需完成 DUO 资格比对。",
        fatalBottlenecks: [
          "公立学校死卡荷兰语教学能力；",
          "国际学校职位竞争激烈。"
],
        recommendedVisas: [
          {
                    "id": "nl_kennismigrant",
                    "code": "高技术移民",
                    "name": "高技术工作许可",
                    "highlight": "国际学校直接担保"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(6.5, 6.8, 6.8, 5.0),
        headlineMetric: "CAP Petite Enfance ｜ 法语 B2",
        summary: "法国公立与私立托幼机构需通过 CAP Petite Enfance 资格考试与流畅法语沟通。",
        fatalBottlenecks: [
          "薪资处于法定最低工资 (SMIC) 附近；",
          "转身份耗时长。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "工作居留",
                    "name": "普通受薪居留",
                    "highlight": "持合同申请居留"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.2, 5.8),
        headlineMetric: "Lärarlegitimation 执照 ｜ 瑞典语 C1",
        summary: "瑞典教师执照 (Lärarlegitimation) 需瑞典语 C1 水平，国际学校全英文授课岗位相对少。",
        fatalBottlenecks: [
          "语言门槛极高；",
          "非对口学历需重读教育学分。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "工签",
                    "name": "工作许可",
                    "highlight": "4年转永居"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.2, 5.8),
        headlineMetric: "Pædagog 丹麦教育资质 ｜ 丹麦语 3 级",
        summary: "丹麦幼教与社工 (Pædagog) 重视丹麦语与本地教育理念，海外申请人直接执业难度高。",
        fatalBottlenecks: [
          "语言与文化壁垒显著；",
          "永居审查严格。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "Positive List",
                    "name": "紧缺许可",
                    "highlight": "国际学校岗位"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(7.2, 7.4, 7.2, 6.0),
        headlineMetric: "Varhaiskasvatuksen opettaja ｜ 芬兰语认证",
        summary: "芬兰以全球顶尖基础教育闻名，幼教老师需持有芬兰语教育学士学位或 OPH 官方认证。",
        fatalBottlenecks: [
          "语言要求极难逾越；",
          "公立学校基本无英文授课岗位。"
],
        recommendedVisas: [
          {
                    "id": "fi_specialist",
                    "code": "Specialist",
                    "name": "专家居留",
                    "highlight": "国际教育机构聘用"
          }
],
      },
    },
  },
  finance_business: {
    id: 'finance_business',
    name: "文商、金融与管理 (Business & Finance)",
    shortName: "文商 / 金融",
    icon: "📊",
    hotness: "极高内卷 · 留存极度艰难",
    summary: "泛商科、金融分析、市场营销与工商管理。全球技术移民黑名单，非高薪或特定通道需做好 100% 回国准备。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(5.6, 5.5, 6.0, 5.0),
        headlineMetric: "时薪 NZD $35/h 刚性门槛 ｜ 文商科中介挂靠严打",
        summary: "新西兰对通用行政、市场营销、初级会计基本处于技术移民劝退状态，移民官对泛商科岗位是否属于 Level 1-3 技能岗位审查极严，时薪必须硬达 $35.00/h。",
        fatalBottlenecks: [
          "本地商科初级岗位起薪通常在 $25~$28/h，远低于 $35/h 法定门槛，极难批签 SMC；",
          "文商科 Job Offer 极易被判定为“非技能性就业 (Non-skilled employment)”。"
],
        recommendedVisas: [
          {
                    "id": "nz_smc",
                    "code": "SMC 6分制",
                    "name": "技术移民签证",
                    "highlight": "需极高薪资($35/h+)与合规JD"
          }
],
        humorTip: "读商科的同学请做好 100% 体验新西兰纯净自然风光后回国的心理准备！如果非要留，建议考虑转码或转幼教，或尽早加微信让主理人帮你定制技术向文书！",
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(5.8, 5.2, 6.5, 4.8),
        headlineMetric: "189 会计/审计 100分封顶 ｜ 州担极度边缘化",
        summary: "澳洲会计、金融、市场营销是全澳内卷天花板。189 独立技术中会计裸分卷至 95~100 分依然不获邀，各州州担保优先配额全盘倾斜医护、工科与基建。",
        fatalBottlenecks: [
          "会计 CA/CPA 职评必须雅思 4 个 7 或读 PY 职业年；",
          "初级银行与四大审计起薪常卡在 TSMIT $73,150 门槛边缘，雇主极不愿提供 482 担保。"
],
        recommendedVisas: [
          {
                    "id": "au_190",
                    "code": "190 州担保",
                    "name": "各州技术移民",
                    "highlight": "需前往偏远地区(491)对冲"
          }
],
        humorTip: "在澳洲读 Finance/Marketing 的同学建议把 Master 当作人生旅程，做好 100% 回国冲刺国内券商/互联网的准备；硬要留澳请联系主理人规划跨专业或偏远地区对冲！",
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(6.2, 5.8, 6.8, 5.2),
        headlineMetric: "全类别 CRS 530+ 分高墙 ｜ 泛商科无定向优势",
        summary: "加拿大 Express Entry 当前全类别抽选分数高居 530 分以上，泛商科文科在没有法语 NCLC 7+ 或省提名 +600 分加持下，仅凭 3 年本地经验极难被抽中。",
        fatalBottlenecks: [
          "无分类定向特权（不像 Tech/Healthcare）；",
          "多伦多金融街实习竞争激烈，应届生很难拿下 LMIA 加分。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "EE 联邦",
                    "name": "快速通道",
                    "highlight": "极度依赖法语双语加分"
          }
],
        humorTip: "商科留加破局唯二法门：要么把法语死磕到 B2 (直接保送)，要么做好回国准备。主理人团队提供专业法语规划与回国名企求职文书重构。",
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(6.8, 7.0, 7.2, 5.5),
        headlineMetric: "常规蓝卡 €45,300 门槛 ｜ 德语 C1 商务流利",
        summary: "德国对金融与商业管理要求法定常规蓝卡年薪 €45,300，且法兰克福/慕尼黑金融机构对商务德语 (C1) 要求极高，非母语级沟通极难拿到高薪 Offer。",
        fatalBottlenecks: [
          "德国商科薪资线高于 IT 紧缺线 (€45.3k vs €41.0k)；",
          "英语工作机会多集中在初创运营或客服岗，薪资常难达标。"
],
        recommendedVisas: [
          {
                    "id": "de_blue_card",
                    "code": "EU 蓝卡",
                    "name": "常规欧盟蓝卡",
                    "highlight": "年薪硬达 €45,300"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(5.2, 4.8, 6.8, 4.0),
        headlineMetric: "£38,700 绝对死线 ｜ 投行/咨询卷王 ｜ 2年PSW后回国潮",
        summary: "英国文商科留学生规模极其庞大，但工签门槛提升至 £38,700 彻底切断了普通管培生与市场运营的工签之路，90% 以上文商科留学生在 2 年 Graduate Visa 结束后回国。",
        fatalBottlenecks: [
          "除了伦敦顶级投行与 MBB 咨询，中小型企业绝无可能为文商科应届生开出 £38.7k 并提供 Sponsor；",
          "大厂校招竞争比常达 1:500。"
],
        recommendedVisas: [
          {
                    "id": "uk_graduate_visa",
                    "code": "PSW 找工签",
                    "name": "毕业生签证",
                    "highlight": "体验英伦2年全职"
          }
],
        humorTip: "去英国读 1 年授课商硕的宝子们，心态放平做好 100% 回国搞钱准备，这才是最成熟的心态！主理人提供顶级英文 CV 与商科 Motivation Letter 重构服务。",
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(6.5, 6.2, 7.5, 5.5),
        headlineMetric: "非紧缺门槛 €64,000/年 ｜ 欧洲金融服务中心",
        summary: "爱尔兰国际金融服务中心 (IFSC) 机构众多，但文商科未列入 Critical Skills 清单，普通工作许可年薪要求高达 €64,000，门槛极高。",
        fatalBottlenecks: [
          "非关键技能需做劳工市场测试 (LMT)；",
          "年薪 €64k 对应届生几乎不可逾越。"
],
        recommendedVisas: [
          {
                    "id": "ie_stamp1g",
                    "code": "Stamp 1G",
                    "name": "毕业生找工",
                    "highlight": "2年大厂管培机会"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.0, 6.0),
        headlineMetric: "综合职就职 ｜ 技人国签证 ｜ 日语 N1 必备",
        summary: "日本商社、银行与零售业通过“新卒一括采用”招聘大量文商科留学生，只要日语流畅 (N1) 并通过 SPI 笔试，拿到 Offer 即可批技人国工签。",
        fatalBottlenecks: [
          "就职活动 (就活) 流程极度繁琐（需参加无数说明会与多轮面试）；",
          "传统企业起薪较低（年收 300万~400万日元）。"
],
        recommendedVisas: [
          {
                    "id": "jp_work",
                    "code": "技·人·国",
                    "name": "国际业务工签",
                    "highlight": "应届综合职入职即批"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(6.5, 5.5, 8.5, 5.0),
        headlineMetric: "金融业 EP 最低门槛 SGD $6,200/月 ｜ 投行/PE 枢纽",
        summary: "新加坡金融业发达，但 MOM 将金融行业 EP 准入门槛提高至 $6,200/月，且企业需满足严格的本地员工配比。",
        fatalBottlenecks: [
          "金融应届生起薪门槛极高；",
          "转 PR 审批完全黑盒。"
],
        recommendedVisas: [
          {
                    "id": "sg_ep",
                    "code": "EP",
                    "name": "就业准证",
                    "highlight": "金融行业月薪 $6.2k+"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(5.2, 4.5, 9.0, 3.5),
        headlineMetric: "非 STEM 仅 1 年 OPT ｜ H-1B 抽签中签率极低",
        summary: "美国文商科非 STEM 专业仅有 12 个月 OPT 工作许可，只有一次 H-1B 抽签机会，绝大多数文商科留学生在毕业 1 年内离境。",
        fatalBottlenecks: [
          "抽签中签率低于 20%；",
          "雇主不愿为仅有 1 年 OPT 的员工办理 PERM。"
],
        recommendedVisas: [
          {
                    "id": "us_stem_opt",
                    "code": "OPT",
                    "name": "1年实习许可",
                    "highlight": "珍惜1次抽签机会"
          }
],
        humorTip: "非 STEM 文商科美本美硕同学，毕业回国建设祖国是大概率事件，建议大二大三积极寻找国内名企 Remote 实习！",
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.5, 6.0),
        headlineMetric: "Zoekjaar 1年找工 ｜ 跨国公司欧洲总部",
        summary: "荷兰跨国企业聚集，通过 Zoekjaar 获得 1 年自由工作权，转工签需达到标准薪资线。",
        fatalBottlenecks: [
          "非技术岗位全英文职位竞争激烈；",
          "5年转永居需考荷兰语。"
],
        recommendedVisas: [
          {
                    "id": "nl_zoekjaar",
                    "code": "找工签",
                    "name": "毕业生居留",
                    "highlight": "自由求职1年"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(6.5, 6.8, 7.0, 5.2),
        headlineMetric: "高商 (HEC/ESSEC) ｜ 法语 C1 商务流利",
        summary: "法国顶级高商毕业生在巴黎金融咨询圈有一定认可度，但必须具备母语级法语表达能力。",
        fatalBottlenecks: [
          "法语商务沟通是绝对刚需；",
          "普通院校商科留法极难。"
],
        recommendedVisas: [
          {
                    "id": "fr_rece",
                    "code": "RECE",
                    "name": "找工创业居留",
                    "highlight": "高商硕士12个月找工"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(6.2, 6.5, 6.8, 5.5),
        headlineMetric: "月薪 28,480 SEK ｜ 本地人脉与瑞典语依赖",
        summary: "瑞典文商科岗位规模较小，初级运营与行政很难跨越 28,480 SEK 薪资门槛。",
        fatalBottlenecks: [
          "岗位饱和；",
          "工签政策收紧。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "工签",
                    "name": "工作许可",
                    "highlight": "达标全职担保"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(6.0, 6.2, 6.8, 5.0),
        headlineMetric: "Pay Limit 高薪计划 (487k DKK) ｜ 语言壁垒",
        summary: "丹麦文商科必须走 Pay Limit 高薪计划，年薪门槛高达 48.7 万克朗。",
        fatalBottlenecks: [
          "应届生薪资无法达标；",
          "永居时间长。"
],
        recommendedVisas: [
          {
                    "id": "dk_pay_limit",
                    "code": "Pay Limit",
                    "name": "高薪工签",
                    "highlight": "年薪超487k DKK"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(6.2, 6.5, 6.5, 5.5),
        headlineMetric: "2年找工居留 ｜ 本地商业圈规模小",
        summary: "芬兰虽提供 2 年找工居留，但非科技类文商科企业空缺极少。",
        fatalBottlenecks: [
          "市场体量极小；",
          "芬兰语壁垒。"
],
        recommendedVisas: [
          {
                    "id": "fi_post_study",
                    "code": "找工居留",
                    "name": "毕业生找工",
                    "highlight": "2年自由居留"
          }
],
      },
    },
  },
  biotech_pharma: {
    id: 'biotech_pharma',
    name: "生物医药与自然科学 (Biotech)",
    shortName: "生物 / 制药",
    icon: "🔬",
    hotness: "高学历科研导向 · 产业集群依赖",
    summary: "生物信息、药剂研发、临床试验与农业科学。依赖美英爱德产业园区与 NIW/GTI 顶尖科研豁免通道。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 7.5, 6.8),
        headlineMetric: "农业科技与食品科学 ｜ 绿色名单生物科学",
        summary: "新西兰在乳业生物技术、农业科学与海洋生物方面拥有专属绿名单通道。",
        fatalBottlenecks: [
          "传统纯生物医药研发岗位相对集中在奥克兰几所大学及科研院所；",
          "纯实验室技术员时薪需达 $35.00/h。"
],
        recommendedVisas: [
          {
                    "id": "nz_green_list",
                    "code": "绿名单",
                    "name": "直接居留",
                    "highlight": "农业科技与食品科学"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(8.0, 8.2, 8.0, 6.8),
        headlineMetric: "GTI / NIV 国家创新签证 ｜ 墨尔本生物医药集群",
        summary: "澳洲将生物医疗健康产业列为国家创新签证 (NIV/858) 核心领域，硕博科研人才免打分直接拿绿卡。",
        fatalBottlenecks: [
          "本科生缺乏独立实验项目经验较难通过 VETASSESS 职评；",
          "研发岗位集中在墨尔本 Parkville 医疗区。"
],
        recommendedVisas: [
          {
                    "id": "au_858",
                    "code": "858 创新签证",
                    "name": "国家创新移民",
                    "highlight": "生物科研硕博免打分PR"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(7.8, 7.8, 7.8, 6.5),
        headlineMetric: "STEM 定向抽选 ｜ 魁省/安省生物走廊",
        summary: "加拿大在蒙特利尔与多伦多拥有庞大制药集群，生信与药剂人才受惠于 EE STEM 定向抽选。",
        fatalBottlenecks: [
          "湿实验 (Wet Lab) 岗位起薪较低；",
          "研发周期长。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "EE STEM",
                    "name": "快速通道",
                    "highlight": "生命科学定向直邀"
          }
],
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(8.8, 9.0, 8.8, 7.2),
        headlineMetric: "拜耳/默克制药基地 ｜ 蓝卡 €41.0k 紧缺",
        summary: "德国是欧洲制药第一强国，生物医药与化学研发直接适用 €41,041 蓝卡紧缺标准，21 个月转永居。",
        fatalBottlenecks: [
          "博士学位 (PhD) 在德企研发体系中是核心晋升门槛；",
          "部分工厂需德语沟通。"
],
        recommendedVisas: [
          {
                    "id": "de_blue_card",
                    "code": "EU 蓝卡",
                    "name": "欧盟蓝卡",
                    "highlight": "制药研发21个月永居"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(7.5, 7.2, 8.5, 6.0),
        headlineMetric: "牛剑伦敦金三角 ｜ Global Talent 杰出人才",
        summary: "英国生物医药科研实力极强，阿斯利康、GSK 等巨头提供高薪研发岗位，顶尖学者可走 Global Talent 免雇主直通永居。",
        fatalBottlenecks: [
          "初级实验员薪资卡在 £38.7k 门槛；",
          "博士后博后博后循环。"
],
        recommendedVisas: [
          {
                    "id": "uk_global_talent",
                    "code": "Global Talent",
                    "name": "全球人才签证",
                    "highlight": "科研学者免雇主3年永居"
          }
],
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(9.0, 9.2, 9.2, 7.5),
        headlineMetric: "全球前 10 大药企 9 家在爱 ｜ CSEP €38k",
        summary: "爱尔兰是全球最大的生物药品出口国之一，Pfizer、Novartis 等巨头大量招聘制药工程与生物分析师，21 个月转 Stamp 4 永居。",
        fatalBottlenecks: [
          "都柏林与科克住房紧缺；",
          "对 GMP 无菌生产规范经验要求高。"
],
        recommendedVisas: [
          {
                    "id": "ie_csep",
                    "code": "CSEP",
                    "name": "关键技能工签",
                    "highlight": "生物制药21个月换Stamp 4"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 7.8, 6.5),
        headlineMetric: "武田制药等传统强企 ｜ 高度专门职 80分",
        summary: "日本在再生医疗与小分子药物研发实力雄厚，生物硕博走高度人才加分极高。",
        fatalBottlenecks: [
          "企业文化严谨保守；",
          "需具备专业日语发表能力。"
],
        recommendedVisas: [
          {
                    "id": "jp_hsp",
                    "code": "高度人才",
                    "name": "专门技术1号",
                    "highlight": "80分1年永住"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(7.8, 7.2, 8.8, 6.5),
        headlineMetric: "启奥生物医药园 (Biopolis) ｜ EP 准证",
        summary: "新加坡 Biopolis 汇集顶尖科研机构与药企，生物医学博士起薪高且受政府重点支持。",
        fatalBottlenecks: [
          "研发多依赖政府 A*STAR 基金资助；",
          "PR 审批依旧黑盒。"
],
        recommendedVisas: [
          {
                    "id": "sg_ep",
                    "code": "EP",
                    "name": "就业准证",
                    "highlight": "生物医药研发优先"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(8.2, 8.0, 9.5, 5.5),
        headlineMetric: "波士顿/旧金山湾区 ｜ EB-2 NIW 绿卡直通",
        summary: "美国是全球生物医药资本与研发绝对核心，硕博发表论文与高引用是申请 EB-2 NIW 国家利益豁免绿卡的天然优势。",
        fatalBottlenecks: [
          "EB-2 签证排期 4~5 年；",
          "非生信 (Bioinfo) 纯生物初级岗位薪资偏低。"
],
        recommendedVisas: [
          {
                    "id": "us_eb2_niw",
                    "code": "EB-2 NIW",
                    "name": "国家利益豁免绿卡",
                    "highlight": "生物医药论文免雇主绿卡"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(8.2, 8.5, 8.2, 7.0),
        headlineMetric: "莱顿生物科技园 ｜ 优惠薪资工签",
        summary: "荷兰莱顿生物科技园拥有完善研发链，Zoekjaar 找工签转高技术移民享受 €2,865 优惠薪资。",
        fatalBottlenecks: [
          "住房紧缺；",
          "5年转永居需荷兰语。"
],
        recommendedVisas: [
          {
                    "id": "nl_zoekjaar",
                    "code": "找工签",
                    "name": "毕业生居留",
                    "highlight": "生物名校直通"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.5, 6.2),
        headlineMetric: "赛诺菲制药巨头 ｜ Passeport Talent",
        summary: "法国生物医药拥有赛诺菲与巴斯德研究所，科研博士可申请人才通行证。",
        fatalBottlenecks: [
          "科研基金申请竞争大；",
          "法语要求。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "Passeport Talent",
                    "name": "优秀人才",
                    "highlight": "科研学者4年居留"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(8.0, 8.2, 8.0, 6.8),
        headlineMetric: "卡罗林斯卡医学院 ｜ 4年转永居",
        summary: "瑞典在诺贝尔医学奖摇篮卡罗林斯卡学院周边聚集大量生物科技企业，全英文研发。",
        fatalBottlenecks: [
          "工签薪资门槛提升；",
          "气候适应。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "工签",
                    "name": "技术工作许可",
                    "highlight": "4年转永居"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(8.8, 9.0, 8.8, 7.2),
        headlineMetric: "诺和诺德 (Novo Nordisk) 帝国 ｜ 减重药/胰岛素",
        summary: "丹麦诺和诺德 (Novo Nordisk) 爆发式增长带动全丹麦生物医药产业链，研发与生产人才极其紧缺，享 Positive List 高薪极速通道。",
        fatalBottlenecks: [
          "首都哥本哈根租房昂贵；",
          "永居需丹麦语。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "Positive List",
                    "name": "紧缺许可",
                    "highlight": "制药龙头扩招"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.5, 6.8),
        headlineMetric: "生物健康大数据 ｜ 2周极速专家工签",
        summary: "芬兰在生物样本库与数字化健康领域具有特色研发优势，特聘专家 2 周快速下签。",
        fatalBottlenecks: [
          "市场体量较小；",
          "岗位数量有限。"
],
        recommendedVisas: [
          {
                    "id": "fi_specialist",
                    "code": "Specialist",
                    "name": "专家工签",
                    "highlight": "生物大数据研发"
          }
],
      },
    },
  },
  hospitality_culinary: {
    id: 'hospitality_culinary',
    name: "酒店旅游与餐饮实操 (Hospitality)",
    shortName: "西厨 / 酒店旅游",
    icon: "🍳",
    hotness: "蓝领实操 · 时薪考核",
    summary: "主厨 (Chef)、西点师与酒店高级运营。澳新德国技术工人通道，核心卡点在法定中位数时薪与技工职评。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(8.2, 8.4, 8.2, 7.0),
        headlineMetric: "Chef 主厨绿色名单 ｜ 时薪中位数 $35.00/h",
        summary: "新西兰旅游业发达，主厨 (Chef) 在技能工签中需求旺盛，达法定中位数时薪 ($35.00/h) 可走 SMC 或绿色名单通道。",
        fatalBottlenecks: [
          "初级帮厨 (Cook) 处于紧缩限制清单，必须做到主管/主厨 (Chef) 级别；",
          "时薪必须硬达 $35.00/h。"
],
        recommendedVisas: [
          {
                    "id": "nz_green_list",
                    "code": "绿名单",
                    "name": "技术居留",
                    "highlight": "西厨主管达标即批"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(8.4, 8.5, 8.5, 7.2),
        headlineMetric: "TRA 技工评估 ｜ 482 雇主担保 2年转 186PR",
        summary: "澳洲餐饮酒店极度缺人，主厨 (Chef / 351311) 列入中长期紧缺清单，通过 TRA 职业评估后签约 482 工签，满 2 年转 186 永居。",
        fatalBottlenecks: [
          "TRA 职业评估需完成 JRP (Job Ready Program) 4 步走考核与 1725 小时带薪工作；",
          "482 薪资需满足 TSMIT $73,150 底线。"
],
        recommendedVisas: [
          {
                    "id": "au_482",
                    "code": "482 工签",
                    "name": "TSS 雇主担保",
                    "highlight": "2年转186永居"
          }
],
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(8.5, 8.8, 8.5, 7.5),
        headlineMetric: "Ausbildung 酒店西厨 ｜ 带薪免学费 ｜ 毕业留德永居",
        summary: "德国餐饮与五星级酒店大量通过 Ausbildung 招募国际生，学习期间每月发 €1,000+ 津贴，毕业后直接转德国工签并享 2 年转永居。",
        fatalBottlenecks: [
          "入学要求德语 B1 沟通能力；",
          "厨房实操与倒班作息辛苦。"
],
        recommendedVisas: [
          {
                    "id": "de_ausbildung",
                    "code": "双元制",
                    "name": "西厨带薪培训",
                    "highlight": "包就业直接转德国永居"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(7.5, 7.6, 7.8, 6.8),
        headlineMetric: "省提名紧缺工种 ｜ 阿省/大西洋四省通道",
        summary: "加拿大各省（如阿尔伯塔、大西洋四省）对餐饮与酒店经理提供低门槛省提名通道。",
        fatalBottlenecks: [
          "联邦 EE 缺乏高分优势，需依赖省提名；",
          "薪资水平处于中低位。"
],
        recommendedVisas: [
          {
                    "id": "ca_pnp_tech",
                    "code": "省提名",
                    "name": "各省酒店餐饮通道",
                    "highlight": "持雇主Offer快速获邀"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(5.5, 5.0, 6.8, 4.5),
        headlineMetric: "£38,700 薪资高墙 ｜ 仅极少数米其林名厨达标",
        summary: "英国将 Skilled Worker 最低门槛提高至 £38,700，普通西厨与酒店管培生薪资几乎无法达标，通道基本关闭。",
        fatalBottlenecks: [
          "行业起薪远低于 £38.7k；",
          "餐饮业缺乏工签配额。"
],
        recommendedVisas: [
          {
                    "id": "uk_graduate_visa",
                    "code": "PSW",
                    "name": "找工签证",
                    "highlight": "2年体验后回国"
          }
],
        humorTip: "想留英做餐饮的同学做好回国准备，除非能入职伦敦顶级米其林餐厅且主厨亲自为你开出 £38.7k 高薪！",
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(7.2, 7.5, 7.5, 6.2),
        headlineMetric: "Executive Chef 关键技能 ｜ 旅游大国",
        summary: "爱尔兰对行政主厨 (Executive Chef) 等高级岗位提供工作许可支持。",
        fatalBottlenecks: [
          "初级职位多受限；",
          "都柏林生活成本高。"
],
        recommendedVisas: [
          {
                    "id": "ie_csep",
                    "code": "工签",
                    "name": "工作许可",
                    "highlight": "高级主厨通道"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 8.0, 7.0),
        headlineMetric: "特定技能 (外食业/宿泊业) ｜ 5年自由工作",
        summary: "日本特定技能签证开放餐饮 (外食业) 与酒店 (宿泊业)，考取相应技能测试与日语 N4 即可赴日工作。",
        fatalBottlenecks: [
          "特定技能 1 号转 2 号考核严格；",
          "加班较普遍。"
],
        recommendedVisas: [
          {
                    "id": "jp_ssw",
                    "code": "特定技能",
                    "name": "外食与酒店技能签证",
                    "highlight": "技能达标直接赴日"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(6.8, 6.0, 7.8, 6.0),
        headlineMetric: "顶奢酒店餐饮 ｜ S Pass / Work Permit",
        summary: "新加坡滨海湾金沙、圣淘沙等顶奢酒店常年招聘国际调酒师与主厨，多持有 S Pass 或 WP。",
        fatalBottlenecks: [
          "低层级工作准证无法申请 PR；",
          "工时较长。"
],
        recommendedVisas: [
          {
                    "id": "sg_spass",
                    "code": "S Pass",
                    "name": "中级准证",
                    "highlight": "高星级酒店直聘"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(5.5, 5.0, 7.5, 4.5),
        headlineMetric: "J-1 酒店实习 ｜ EB-3 非技术排期长",
        summary: "美国万豪、希尔顿等提供 12 个月 J-1 实习项目，转永居需经漫长 EB-3 非技术移民排期。",
        fatalBottlenecks: [
          "J-1 结束通常需离境；",
          "EB-3 非技术排期长达 8~10 年。"
],
        recommendedVisas: [
          {
                    "id": "us_stem_opt",
                    "code": "J-1",
                    "name": "酒店文化交流",
                    "highlight": "1年名企实习"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(6.8, 7.0, 7.2, 5.8),
        headlineMetric: "旅游大国 ｜ 荷兰语与高薪门槛",
        summary: "阿姆斯特丹旅游酒店发达，但普通工签受高额法定薪资限制。",
        fatalBottlenecks: [
          "非欧盟员工担保难度高；",
          "租房成本大。"
],
        recommendedVisas: [
          {
                    "id": "nl_zoekjaar",
                    "code": "找工签",
                    "name": "毕业生居留",
                    "highlight": "名校酒店管理1年找工"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(7.8, 8.0, 8.2, 6.5),
        headlineMetric: "蓝带西厨/法式大餐圣地 ｜ 法语 B2",
        summary: "法国是全球西餐与西点发源地，蓝带等名校毕业生在法米其林餐厅实习机会多，签约后可申请受薪工签。",
        fatalBottlenecks: [
          "厨房法语术语必须纯熟；",
          "工作强度极大。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "工签",
                    "name": "受薪工作居留",
                    "highlight": "法式西餐直通"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(6.5, 6.8, 6.8, 5.5),
        headlineMetric: "月薪 28,480 SEK 刚性门槛",
        summary: "瑞典餐饮业同样受 28,480 SEK 严格薪资门槛限制。",
        fatalBottlenecks: [
          "工签审核严苛；",
          "餐饮业雇主违规风险大。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "工签",
                    "name": "工作许可",
                    "highlight": "达标全职担保"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(6.8, 7.0, 7.0, 5.5),
        headlineMetric: "Noma 北欧料理圣地 ｜ Pay Limit 高薪门槛",
        summary: "丹麦新北欧料理全球知名，但工签需跨越高薪门槛。",
        fatalBottlenecks: [
          "普通厨师薪资难达高薪计划；",
          "语言门槛。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "工作许可",
                    "name": "技术工签",
                    "highlight": "高端主厨通道"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(6.8, 7.0, 7.0, 6.0),
        headlineMetric: "拉普兰极光旅游季 ｜ 季节性与全职工签",
        summary: "芬兰冬季拉普兰极光旅游旺季对酒店与餐饮有大量季节性与全职工签需求。",
        fatalBottlenecks: [
          "淡旺季明显；",
          "语言壁垒。"
],
        recommendedVisas: [
          {
                    "id": "fi_specialist",
                    "code": "工签",
                    "name": "工作居留",
                    "highlight": "旅游旺季直招"
          }
],
      },
    },
  },
  creative_design: {
    id: 'creative_design',
    name: "创意设计、传媒与人文 (Creative & Media)",
    shortName: "设计 / 传媒",
    icon: "🎨",
    hotness: "文化壁垒高 · 自由职业倾向",
    summary: "UI/UX 交互、影视特效、新闻传播与艺术策展。高度依赖作品集与独立商业赞助，传统技术移民极为收紧。",
    countryRankings: {
      NZ: {
        countryCode: 'NZ',
        countryName: 'NZ',
        flag: '',
        scores: calculateTrackScore(6.0, 5.8, 6.5, 5.2),
        headlineMetric: "维塔数码 (Wētā FX) 影视特效 ｜ 独立作品集依赖",
        summary: "新西兰在《阿凡达》《指环王》特效公司维塔数码 (Wētā FX) 拥有全球顶级影视工业，顶尖 3D/动画艺术家可获工签担保；普通平面设计与文科极难走通 SMC。",
        fatalBottlenecks: [
          "普通文科设计时薪极难达到 $35.00/h；",
          "影视项目制合同存在空档期风险。"
],
        recommendedVisas: [
          {
                    "id": "nz_smc",
                    "code": "SMC",
                    "name": "技术移民",
                    "highlight": "高薪影视特效直通"
          }
],
      },
      AU: {
        countryCode: 'AU',
        countryName: 'AU',
        flag: '',
        scores: calculateTrackScore(6.2, 5.8, 6.8, 5.0),
        headlineMetric: "VETASSESS 景观/工业设计 ｜ 传媒文科严重内卷",
        summary: "澳洲景观建筑师 (Landscape Architect) 与 UI/UX 设计尚有州担保机会，新闻传播与纯艺术在独立技术移民中基本处于垫底获邀状态。",
        fatalBottlenecks: [
          "平面设计与广告专员配额极少；",
          "初级设计薪资难达 TSMIT $73,150。"
],
        recommendedVisas: [
          {
                    "id": "au_190",
                    "code": "190 州担保",
                    "name": "各州技术移民",
                    "highlight": "景观与UX设计通道"
          }
],
      },
      CA: {
        countryCode: 'CA',
        countryName: 'CA',
        flag: '',
        scores: calculateTrackScore(6.8, 6.5, 7.2, 5.5),
        headlineMetric: "温哥华/蒙特利尔游戏与影视 ｜ 自雇移民 (Self-employed)",
        summary: "加拿大是全球游戏 (EA/Ubisoft) 与影视重镇，艺术文化界人才可通过联邦自雇移民 (Self-employed Persons Program) 免雇主拿 PR。",
        fatalBottlenecks: [
          "自雇移民需证明连续 2 年以上世界级文化成就或知名自雇纳税经历；",
          "常规 EE 分数过高。"
],
        recommendedVisas: [
          {
                    "id": "ca_ee",
                    "code": "自雇移民",
                    "name": "联邦文化艺术自雇",
                    "highlight": "知名艺术家免雇主PR"
          }
],
      },
      DE: {
        countryCode: 'DE',
        countryName: 'DE',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.5, 6.5),
        headlineMetric: "柏林艺术家自由职业签证 (Freiberufler) ｜ 创意之都",
        summary: "德国柏林是全球创意与当代艺术之都，针对自由设计师、音乐家、策展人提供专门的 Freiberufler 自由职业签证，纳税满 3 年可申请永居。",
        fatalBottlenecks: [
          "需提供多家德国本地客户的意向合作信 (Letters of Intent)；",
          "收入稳定性考核严苛。"
],
        recommendedVisas: [
          {
                    "id": "de_chancenkarte",
                    "code": "Freiberufler",
                    "name": "自由职业艺术家签证",
                    "highlight": "柏林创意人才专属居留"
          }
],
      },
      UK: {
        countryCode: 'UK',
        countryName: 'UK',
        flag: '',
        scores: calculateTrackScore(6.0, 5.5, 7.8, 4.5),
        headlineMetric: "伦敦设计传媒之都 ｜ Global Talent (Arts Council 官方背书)",
        summary: "英国是全球艺术设计与传媒策源地，顶尖创意人才可通过英国艺术委员会 (Arts Council England) 背书申请 Global Talent 签证，免雇主 3 年转永居；普通毕业生需面对 £38.7k 工签高墙。",
        fatalBottlenecks: [
          "普通设计媒体起薪远低于 £38.7k；",
          "Arts Council 背书通过率极低。"
],
        recommendedVisas: [
          {
                    "id": "uk_global_talent",
                    "code": "Global Talent",
                    "name": "全球人才签证 (艺术类)",
                    "highlight": "Arts Council 背书3年永居"
          }
],
        humorTip: "在伦艺/皇艺学设计的同学，建议在 2 年 Graduate Visa 期间放手搞创作与个人品牌，做好回国加入顶尖设计工作室的心态准备！主理人提供中英文艺术陈述与 CV 精修。",
      },
      IE: {
        countryCode: 'IE',
        countryName: 'IE',
        flag: '',
        scores: calculateTrackScore(6.5, 6.2, 7.2, 5.5),
        headlineMetric: "游戏与数字媒体 ｜ 2年找工居留",
        summary: "爱尔兰游戏开发与动画制作拥有一定产业基础，毕业生享 2 年找工缓冲。",
        fatalBottlenecks: [
          "非核心开发类设计岗位受限；",
          "租房成本高。"
],
        recommendedVisas: [
          {
                    "id": "ie_stamp1g",
                    "code": "Stamp 1G",
                    "name": "找工许可",
                    "highlight": "2年全职工作"
          }
],
      },
      JP: {
        countryCode: 'JP',
        countryName: 'JP',
        flag: '',
        scores: calculateTrackScore(7.2, 7.5, 7.2, 6.0),
        headlineMetric: "动漫、游戏与工业设计 ｜ 技人国签证",
        summary: "日本动漫二次元、任天堂等游戏公司及汽车造型设计持续招募优秀画师与 3D 设计师，签约即批技人国工签。",
        fatalBottlenecks: [
          "动画制作原画师工作强度极大、起薪较低；",
          "需具备流畅日语表达。"
],
        recommendedVisas: [
          {
                    "id": "jp_work",
                    "code": "技·人·国",
                    "name": "国际业务工签",
                    "highlight": "动漫游戏大厂直聘"
          }
],
      },
      SG: {
        countryCode: 'SG',
        countryName: 'SG',
        flag: '',
        scores: calculateTrackScore(6.2, 5.5, 7.8, 5.0),
        headlineMetric: "亚太创意营销枢纽 ｜ COMPASS 40分制",
        summary: "新加坡聚集全球顶尖 4A 广告与创意机构，但 EP 薪资门槛 ($5.6k) 对初级设计岗位构成挑战。",
        fatalBottlenecks: [
          "薪资门槛较高；",
          "PR 审批黑盒。"
],
        recommendedVisas: [
          {
                    "id": "sg_ep",
                    "code": "EP",
                    "name": "就业准证",
                    "highlight": "高级创意总监通道"
          }
],
      },
      US: {
        countryCode: 'US',
        countryName: 'US',
        flag: '',
        scores: calculateTrackScore(6.5, 6.0, 9.0, 4.5),
        headlineMetric: "好莱坞与硅谷 UI/UX ｜ O-1B 杰出艺术人才",
        summary: "美国在好莱坞影视、游戏与硅谷顶级科技 UI/UX 拥有极高薪资，有国际获奖与知名作品集的艺术家可申请 O-1B 杰出人才工作签证（免抽签）。",
        fatalBottlenecks: [
          "普通文科设计非 STEM 仅 1 年 OPT；",
          "O-1B 证据链要求高。"
],
        recommendedVisas: [
          {
                    "id": "us_o1a",
                    "code": "O-1B",
                    "name": "杰出艺术人才签证",
                    "highlight": "免抽签留美全职工作"
          }
],
      },
      NL: {
        countryCode: 'NL',
        countryName: 'NL',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.8, 6.5),
        headlineMetric: "代尔夫特与埃因霍温工业设计 ｜ 自由求职 1年",
        summary: "荷兰拥有代尔夫特理工工业设计与皇家艺术学院，设计思维领先全球，Zoekjaar 找工签提供 1 年缓冲。",
        fatalBottlenecks: [
          "全英文职位竞争激烈；",
          "5年转永居需荷兰语。"
],
        recommendedVisas: [
          {
                    "id": "nl_zoekjaar",
                    "code": "找工签",
                    "name": "毕业生居留",
                    "highlight": "顶尖设计名校直通"
          }
],
      },
      FR: {
        countryCode: 'FR',
        countryName: 'FR',
        flag: '',
        scores: calculateTrackScore(7.5, 7.8, 7.8, 6.2),
        headlineMetric: "巴黎时尚与奢侈品设计 ｜ Passeport Talent",
        summary: "法国是全球时尚、奢侈品管理与艺术策展中心，优秀设计师可申请人才通行证。",
        fatalBottlenecks: [
          "奢侈品行业圈子极小；",
          "法语母语级要求。"
],
        recommendedVisas: [
          {
                    "id": "fr_talent_passport",
                    "code": "Passeport Talent",
                    "name": "优秀人才居留",
                    "highlight": "时尚与艺术设计通道"
          }
],
      },
      SE: {
        countryCode: 'SE',
        countryName: 'SE',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.5, 6.0),
        headlineMetric: "北欧极简家具与工业设计 ｜ 4年转永居",
        summary: "瑞典宜家 (IKEA) 与北欧极简设计享誉世界，工业与交互设计具备全英文机会。",
        fatalBottlenecks: [
          "月薪需达 28,480 SEK；",
          "职位数量有限。"
],
        recommendedVisas: [
          {
                    "id": "se_work_permit",
                    "code": "工签",
                    "name": "工作许可",
                    "highlight": "4年转永居"
          }
],
      },
      DK: {
        countryCode: 'DK',
        countryName: 'DK',
        flag: '',
        scores: calculateTrackScore(7.2, 7.5, 7.5, 6.0),
        headlineMetric: "丹麦设计大师之国 ｜ 建筑与家具设计",
        summary: "丹麦在建筑设计 (BIG) 与家具设计领域享有盛誉，名校毕业生可申请找工卡。",
        fatalBottlenecks: [
          "高薪工签门槛高；",
          "丹麦语壁垒。"
],
        recommendedVisas: [
          {
                    "id": "dk_positive_list",
                    "code": "工作许可",
                    "name": "设计工签",
                    "highlight": "知名建筑设计事务所"
          }
],
      },
      FI: {
        countryCode: 'FI',
        countryName: 'FI',
        flag: '',
        scores: calculateTrackScore(7.0, 7.2, 7.2, 6.2),
        headlineMetric: "阿尔托大学艺术设计 ｜ 2年找工居留",
        summary: "芬兰阿尔托大学 (Aalto) 在工业设计与建筑学名列前茅，毕业生享 2 年全职找工居留。",
        fatalBottlenecks: [
          "本土商业市场小；",
          "职位多偏向北欧本土。"
],
        recommendedVisas: [
          {
                    "id": "fi_post_study",
                    "code": "找工居留",
                    "name": "毕业生居留",
                    "highlight": "2年自由找工"
          }
],
      },
    },
  },
};
