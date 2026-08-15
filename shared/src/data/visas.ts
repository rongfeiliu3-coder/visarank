import type { Visa } from '../types/visa';

export const ALL_COUNTRY_VISAS: Visa[] = [
  {
    "id": "nz_smc",
    "countryCode": "NZ",
    "category": "pr",
    "code": "SMC 6-Points",
    "name": "Skilled Migrant Category Resident Visa (6 Points)",
    "chineseName": "新西兰 6分制技术移民居留签证",
    "summary": "通过学历、职业注册或高薪三选一主技能（最高6分），叠加本地工作经验，积满6分即可一步到位申请全家永久居留。",
    "thresholdScore": 6,
    "maxScorePossible": 6,
    "invitationMechanism": "points_ranked",
    "eoiRequired": true,
    "jobOfferMandatory": true,
    "ageLimit": 55,
    "officialFee": {
      "local": "NZD $4,290",
      "cnyEstimate": "约 ¥18,900",
      "amount": 4290,
      "currency": "NZD"
    },
    "effectivePeriod": "2023.10 - 至今 (v2026.1 现行法案)",
    "estimatedProcessingTime": "6 - 9 个月",
    "officialSourceUrl": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/skilled-migrant-category-resident-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "认证雇主全职工作且时薪达中位数 NZD $35.00/h",
    "tags": [
      "技术移民",
      "打分制",
      "6分达标直接PR",
      "永久回头签"
    ],
    "isActive": true,
    "sortOrder": 1,
    "advisorVerdict": {
      "highlightQuote": "硕士 5 分 + 本地工作 1 年凑满 6 分看似大道至简，但核心命门在于你能不能在雇主认证收紧的当下，拿下 NZD $35/h 的合规中位数 Job Offer。",
      "summary": "新西兰 6 分制是目前西方主要移民国中为数不多“不设总配额动态池子、只要达标 6 分就 100% 获邀批签”的确定性通道。它彻底废弃了过去 180 分按分数高低盲目内卷抽选的恶习。\n但别被“硕士直接 5 分”冲昏头脑：移民局死卡三条硬指标——① 雇主必须通过 Accredited Employer 认证且未被列入劳工黑名单；② 合同薪资必须精确对齐 NZD $35.00/小时（年薪 NZD $72,800+，每年中位数动态上调）；③ 岗位职责必须与 ANZSCO 技能大纲 Skill Level 1~3 高度契合。如果职位被判定为 low-skilled 对应 Skill Level 4-5，时薪要求直接飙升至 1.5 倍（$52.50/h）！",
      "fatalTraps": [
        "时薪中位数判定以【递交申请时刻】为准，如在职期间官方中位数上调而雇主未同步加薪，申请将被直接驳回。",
        "雇主合规风险：若雇主在审理期内倒闭、被吊销认证或涉嫌劳工剥削，连带主申工签与 SMC 流程全盘冻结。",
        "职业对口审查：文科或商科硕士从事通用行政/销售等职位，极易被移民官裁定为“非技能性就业 (Non-skilled employment)”。",
        "配偶语言门槛：主申需雅思 6.5，配偶必须达到雅思 5.0，否则需预缴约 NZD $1,700+ 的昂贵语言学费。"
      ],
      "idealFor": "理工科、IT 研发、工程、注册医疗、高等教育背景，愿意去奥克兰以外或奥克兰本地踏实工作 1~2 年的年轻硕博人才。",
      "discouragedFor": "指望挂靠空壳公司买 Job Offer、英语无法考过 6.5、或从事初级泛文商科行政销售岗位的申请人。",
      "officialLawQuote": "INZ Operational Manual SR3.1: \"An applicant must have 6 points from either a recognized qualification, NZ registration, or high income, plus skilled employment in New Zealand with an accredited employer paid at or above median wage.\""
    },
    "prerequisites": {
      "ageLimit": "递交申请时年龄未满 56 周岁 (法定年龄天花板)",
      "languageBenchmark": "主申雅思 G 类 6.5 / PTE 58；配偶雅思 5.0 (或英联邦 2 年本硕学历免考豁免)",
      "employerAccreditation": "必须持有新西兰认证雇主 (AEWV 认证有效) 全职劳动合同 (每周 ≥ 30 小时)",
      "healthAndCharacter": "符合移民局健康审查要求且无严重刑事犯罪记录 (Police Clearance)"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 IT、数字软件与系统架构",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "全栈与后端开发工程师",
            "englishName": "Developer Programmer / Full-stack Developer",
            "code": "ANZSCO 261312",
            "qualificationReq": "NZQA Level 9 硕士 (5分) + 新西兰本地 1 年全职技能工作 (1分) 凑满 6 分",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "6分达标直接批 PR"
          },
          {
            "name": "商业系统分析师与产品经理",
            "englishName": "ICT Business Analyst / Product Lead",
            "code": "ANZSCO 261111",
            "qualificationReq": "NZQA Level 9 硕士 (5分) + 本地工作 1 年 (1分) 凑满 6 分",
            "wageReq": "法定中位数时薪 NZD $35.00/h",
            "highlightTag": "6分达标直接批 PR"
          }
        ]
      },
      {
        "categoryName": "💼 商业金融、专业服务与企业运营",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "注册会计师与财务审计师",
            "englishName": "Accountant / External Auditor",
            "code": "ANZSCO 221111",
            "qualificationReq": "CA ANZ / CPA Australia 官方注册会员 (6分直接顶满) 或 会计硕士 5分+1年工作",
            "wageReq": "法定中位数时薪 NZD $35.00/h",
            "highlightTag": "6分达标直接批 PR"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据新西兰移民局操作手册 INZ Operational Manual SR2.1 & SR3.1 (Skilled Migrant Category)",
      "requiredEvidenceList": [
        "NZQA 国际学历认证报告 (IQA) 或新西兰本地受认可大学学位证书与官方成绩单",
        "认证雇主 12 个月以上全职劳动合同及 ANZSCO Level 1-3 岗位职责匹配 Job Description",
        "新西兰税务局 IRD 纳税记录 (Earnings Summary) 与银行薪资流水清单",
        "主申请人雅思 6.5 / PTE 58 官方成绩单及随行配偶语言达标证明"
      ]
    }
  },
  {
    "id": "nz_green_list",
    "countryCode": "NZ",
    "category": "pr",
    "code": "Green List STR",
    "name": "Green List Straight to Residence Visa",
    "chineseName": "新西兰绿名单直接居留签证 (Tier 1 STR)",
    "summary": "面向医生、护士、土木/电气/软件工程师、中学教师等战略紧缺人才，持有认证雇主对口 Offer 直接发放永久居留。",
    "thresholdScore": 100,
    "maxScorePossible": 100,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "ageLimit": 55,
    "officialFee": {
      "local": "NZD $4,290",
      "cnyEstimate": "约 ¥18,900",
      "amount": 4290,
      "currency": "NZD"
    },
    "effectivePeriod": "2022.09 - 至今 (v2026 动态清单版)",
    "estimatedProcessingTime": "2 - 4 个月",
    "officialSourceUrl": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/straight-to-residence-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "时薪达中位数 NZD $35.00/h (部分需 $57.90/h)",
    "tags": [
      "绿名单Tier 1",
      "免打分直接PR",
      "护士医生紧缺",
      "工程师免等"
    ],
    "isActive": true,
    "sortOrder": 2,
    "advisorVerdict": {
      "highlightQuote": "绿名单 Tier 1 是目前移民新西兰的“终极王牌直通车”——免工签过渡、无需熬 6 分积分，落地即发全家永居 Resident Visa。",
      "summary": "新西兰绿色清单（Green List Tier 1 Straight to Residence）是新西兰为解决国家级硬核人才荒设立的特快专列。涵盖注册护士、全科医生、土木/电气/软件工程师、中学教师、地质测量师等紧缺硬核职业。\n只要你的学历通过 NZQA 认证（或属于华盛顿协议/首尔协议认证工程学位），并且拿下新西兰认证雇主的对口全职 Job Offer（薪资达中位数 $35/h，部分特定高薪工程职位需达更高标准），就可以直接在中国或境外直接递交绿卡申请，一人获批全家枫叶/绿卡直接到手！",
      "fatalTraps": [
        "职业注册壁垒：医疗护士/幼教/建筑师必须提前取得新西兰本地行会临时或正式执业执照，无执照 Offer 无效。",
        "工程学历认证坑：非华盛顿协议 (Washington Accord) 认证的普通国内双非工学学士，需额外做 IPENZ/EngNZ 阶段性知识评定。",
        "清单动态移出风险：新西兰移民局每 12~18 个月动态修正绿名单，某些次紧缺职位随时可能被降级至 Tier 2（需工作 2 年转永居）。"
      ],
      "idealFor": "已取得海外或本地执照的医生护士、资深软件架构师、注册结构/土木工程师及拥有丰富经验的紧缺专才。",
      "discouragedFor": "无行业注册执照、学历非对口工科、期望不考英语直接上车的普通泛文商科求职者。",
      "officialLawQuote": "INZ Operational Manual SR4.1: \"To be granted a Straight to Residence Visa, the applicant must have an offer of employment in an occupation on Tier 1 of the Green List and meet specific registration and qualification requirements.\""
    },
    "prerequisites": {
      "ageLimit": "递交申请时年龄未满 56 周岁 (法定不可逾越硬红线)",
      "languageBenchmark": "雅思 G 类 6.5 / PTE Academic 58 (或英美加澳新爱 2 年以上全日制本硕学历免考豁免)",
      "employerAccreditation": "必须持有新西兰移民局认证雇主 (Accredited Employer) 至少 12 个月全职劳动合同 (每周 ≥ 30 小时)",
      "healthAndCharacter": "全家通过移民局指定体检 (General Medical & Chest X-ray) 并提供近 10 年所有常住国无犯罪记录证明 (Police Certificate)"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 计算机、软件与前沿数字技术",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "软件工程师",
            "englishName": "Software Engineer",
            "code": "ANZSCO 261312",
            "qualificationReq": "华盛顿协议 (Washington Accord) 认证 BEng 或 NZQA Level 7+ 计算机学士",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "网络安全专家",
            "englishName": "Cyber Security Specialist",
            "code": "ANZSCO 262112",
            "qualificationReq": "NZQA Level 7+ 计算机/信息安全专业学士学位",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "ICT 架构师与系统分析师",
            "englishName": "ICT Systems Analyst & Architect",
            "code": "ANZSCO 261112",
            "qualificationReq": "NZQA Level 7+ 计算机科学或信息系统学士学位",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "数据库管理员与数据科学家",
            "englishName": "Data Specialist / Database Administrator",
            "code": "ANZSCO 261315",
            "qualificationReq": "NZQA Level 7+ 数据科学、应用数学或计算机学士",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "ICT 项目经理",
            "englishName": "ICT Project Manager",
            "code": "ANZSCO 135112",
            "qualificationReq": "NZQA Level 7+ 信息技术管理学士或 5 年以上高级管理背景",
            "wageReq": "法定中位数 1.5 倍时薪 NZD $52.50/h (年薪 $109,200+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          }
        ]
      },
      {
        "categoryName": "🩺 医疗健康、护理与临床医学",
        "categoryIcon": "Stethoscope",
        "occupations": [
          {
            "name": "注册护士 (老年护理/手术室/心理健康)",
            "englishName": "Registered Nurse (Aged Care / Surgical / Mental Health)",
            "code": "ANZSCO 254499",
            "qualificationReq": "新西兰护理行会 (Nursing Council of NZ) 官方执业注册 (Annual Practising Certificate)",
            "wageReq": "法定中位数时薪 NZD $35.00/h 或公立医院薪资协议等级",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "全科与专科医生",
            "englishName": "General Practitioner & Specialist Physician",
            "code": "ANZSCO 253111",
            "qualificationReq": "新西兰医学委员会 (Medical Council of NZ) 正式执业注册执照 (General / Vocational Scope)",
            "wageReq": "行业协议薪资标准 (Senior Medical Officer MECA)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "临床心理学家",
            "englishName": "Clinical Psychologist",
            "code": "ANZSCO 272311",
            "qualificationReq": "新西兰心理学家行会 (NZ Psychologists Board) 官方执业注册",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "物理治疗师与医学检验师",
            "englishName": "Physiotherapist & Medical Lab Scientist",
            "code": "ANZSCO 252511",
            "qualificationReq": "新西兰理疗委员会 (Physiotherapy Board of NZ) 官方注册证书",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          }
        ]
      },
      {
        "categoryName": "🏗️ 核心工程、基础设施与建筑建造",
        "categoryIcon": "HardHat",
        "occupations": [
          {
            "name": "土木与结构工程师",
            "englishName": "Civil & Structural Engineer",
            "code": "ANZSCO 233211",
            "qualificationReq": "华盛顿协议 (Washington Accord) BEng 或 Engineering NZ CPEng 执业注册",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "电气与电子工程师",
            "englishName": "Electrical & Electronics Engineer",
            "code": "ANZSCO 233311",
            "qualificationReq": "华盛顿协议 BEng 或 NZQA 认证电气工程工学学士",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          },
          {
            "name": "工程造价师与建筑工料测量师",
            "englishName": "Quantity Surveyor",
            "code": "ANZSCO 233213",
            "qualificationReq": "NZ Institute of Quantity Surveyors (NZIQS) 认可学位证书",
            "wageReq": "法定中位数时薪 NZD $35.00/h (年薪 NZD $72,800+)",
            "highlightTag": "Tier 1 境內/外直接递交 PR"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据新西兰移民局操作手册 INZ Operational Manual SR4.1 与 Green List Appendix 13 (2026年最新修订版)",
      "requiredEvidenceList": [
        "NZQA 国际学历资格评估报告 (IQA / International Qualification Assessment)",
        "认证雇主 (Accredited Employer) 签署的正式全职聘用合同与 ANZSCO 细化 Job Description",
        "新西兰对应法定行会 (Nursing Council / Engineering NZ / NZRAB / Medical Council) 执业资格注册证书",
        "新西兰税务局 IRD 完税凭证 (Monthly Tax Summary) 及合规薪资银行流水",
        "全家体格健康检查证明 (eMedical Information Sheet) 与近 10 年无犯罪记录公证件"
      ]
    }
  },
  {
    "id": "nz_aewv",
    "countryCode": "NZ",
    "category": "work",
    "code": "AEWV",
    "name": "Accredited Employer Work Visa",
    "chineseName": "新西兰认证雇主工作签证 (AEWV)",
    "summary": "由新西兰认证雇主担保，通过劳动力市场测试（Job Check），具备 3 年行业经验或对口学历，英语达标后签发的技能工签。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "NZD $750",
      "cnyEstimate": "约 ¥3,300",
      "amount": 750,
      "currency": "NZD"
    },
    "effectivePeriod": "2022.07 - 至今 (2024语言与经验大修版)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/accredited-employer-work-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "时薪达中位数 NZD $35.00/h (ANZSCO 4-5级需 $52.50/h)",
    "tags": [
      "雇主担保",
      "技能工签",
      "最长3-5年",
      "转PR必经跳板"
    ],
    "isActive": true,
    "sortOrder": 3,
    "advisorVerdict": {
      "highlightQuote": "AEWV 是新西兰工作的主力工签，但也是近年来政策变动最剧烈、合规雷区最密集的“高风险过渡桥梁”，切忌当成养老签证。",
      "summary": "认证雇主工作签证（AEWV）是目前在新西兰全职合法打工的核心工作许可。政策要求雇主首先完成移民局企业认证（Employer Accreditation），随后通过 Job Check 劳动力市场测试（向本地公民/居民公示招聘 14~21 天），最后才由雇员递交签证申请。\n2024年4月起新西兰引入了硬性英语要求（ANZSCO Level 4~5 需雅思 4.0）及最短 3 年从业经验或对口学历证明，最长连续停留期被严格限制为 3~5 年（Max Continuous Stay），到期后必须离境出境 12 个月冷却期，除非中途成功转入 SMC 永居！",
      "fatalTraps": [
        "倒计时时钟（Maximum Continuous Stay）：AEWV 拥有连续工签上限，若在限期内未转出绿卡，将面临无法续签被动离境。",
        "雇主绑定（Employer Bond）：工签上明确印有特定雇主名称，一旦被辞退或企业经营不善，仅有 60 天宽限期寻找新认证雇主交 Job Change。",
        "ANZSCO 4-5 级降级风险：部分基础服务业、餐饮后厨和仓储工种目前中位数薪资门槛极严且无法走常规 SMC 6 分制。"
      ],
      "idealFor": "已拿到新西兰合规优质雇主正式 Offer，且明确将此作为 1~2 年内转 SMC 6分制或绿名单过渡的实干型技术骨干。",
      "discouragedFor": "误信黑中介“买工签包移民”、自身专业无法衔接任何技术移民通道的盲目出海者。",
      "officialLawQuote": "INZ Operational Manual WA4.1: \"AEWV requires an approved Job Check confirming the employment terms meet the median wage threshold and standard labor market testing requirements.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 NZ 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Accredited Employer Work Visa 法定适用岗位",
            "englishName": "Eligible Roles for AEWV",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 NZ 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "nz_pswv",
    "countryCode": "NZ",
    "category": "study",
    "code": "PSWV",
    "name": "Post-study Work Visa",
    "chineseName": "新西兰毕业生工作签证 (PSWV)",
    "summary": "完成新西兰 Level 7+ 学位课程毕业后自动获批的开放式工签，硕士/博士直接享有 3 年开放工签，配偶同步享全职开放工签。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "NZD $1,670",
      "cnyEstimate": "约 ¥7,350",
      "amount": 1670,
      "currency": "NZD"
    },
    "effectivePeriod": "2022.09 - 至今 (绿名单与硕博分流版)",
    "estimatedProcessingTime": "4 - 6 周",
    "officialSourceUrl": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/post-study-work-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "开放工签无薪资门槛，自由受雇，配偶享全职开放工签",
    "tags": [
      "毕业生工签",
      "硕士3年开放工签",
      "配偶陪读工签",
      "子女免费读书"
    ],
    "isActive": true,
    "sortOrder": 4,
    "advisorVerdict": {
      "highlightQuote": "新西兰硕士直接送 3 年无限制全职开放工签，配偶享有全职开放工签，孩子读公立中小学免学费——西方英语国中当下极具性价比的留学跳板。",
      "summary": "在新西兰完成至少 30 周全日制 NZQF Level 9 硕士课程，毕业即可无条件获发 3 年全职开放工签（Post-study Work Visa）。开放工签意味着你可以为新西兰任何合法雇主工作，无需做劳动力市场测试，也没有最低薪资绑定限制。\n更具杀伤力的是其家庭附带权益：主申就读硕士期间及毕业持有 PSWV 期间，合法配偶享有全职配偶工签（Partner of a Worker Work Visa），学龄子女可享受与本地公民同等的免费公立基础教育。只要在 3 年 PSWV 期内找到一份时薪达 NZD $35/h 的对口工作做满 1 年，即可无缝申请 SMC 6 分制绿卡！",
      "fatalTraps": [
        "一生一次机会（Once-in-a-lifetime）：PSWV 在新西兰全生命周期原则上只能申请一次，一旦用完无法再通过重读相同层级学位二次获发。",
        "低层级学历工签限制：读 Level 7 学士后文凭 (GD) 仅限绿名单对口专业才有 PSWV，盲目就读非紧缺 GD 将无法获得毕业工签。",
        "3年找工窗口期：若在 3 年内未能将时薪提升至中位数（$35/h+），工签到期后将无路可走。"
      ],
      "idealFor": "国内 25~45 岁追求高性价比家庭出海、希望带配偶孩子同步落地、利用 1~1.5 年硕士作为跳板稳拿英联邦绿卡的中产技术中坚。",
      "discouragedFor": "预算极度紧张（无法承担 15~25 万人民币学费与生活费）、或完全无法在毕业后克服英语面试找工的人群。",
      "officialLawQuote": "INZ Operational Manual WD3.1: \"A Post-study work visa may be granted to students who have completed an acceptable qualification in NZ at NZQF Level 9 for up to 3 years.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 NZ 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Post-study Work Visa 法定适用岗位",
            "englishName": "Eligible Roles for PSWV",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 NZ 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "nz_whv",
    "countryCode": "NZ",
    "category": "study",
    "code": "WHV",
    "name": "China Working Holiday Visa",
    "chineseName": "新西兰打工度假签证 (China Scheme)",
    "summary": "每年面向中国青年发放 1000 个名额，允许在纽停留 12 个月进行打工、旅游与短期学习，低成本肉身出海与身份转换跳板。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "ageLimit": 35,
    "officialFee": {
      "local": "NZD $420",
      "cnyEstimate": "约 ¥1,850",
      "amount": 420,
      "currency": "NZD"
    },
    "effectivePeriod": "2008.10 - 至今 (每年1000个专属名额)",
    "estimatedProcessingTime": "2 - 4 周",
    "officialSourceUrl": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/china-working-holiday-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "新西兰法定最低时薪 NZD $23.15/h 起，合法纳税",
    "tags": [
      "低成本赴纽",
      "抢名额",
      "转学签工签跳板"
    ],
    "isActive": true,
    "sortOrder": 5,
    "advisorVerdict": {
      "highlightQuote": "每年 1000 个名额的年轻一代入场券，抢到就是赚到；但别当成旅游，把它当成现场找本地雇主、攻关工签或学签的 12 个月实战阵地。",
      "summary": "新西兰对中国大陆护照持有者每年发放 1,000 个打工度假签证（Working Holiday Visa）名额。申请人需在 18~35 周岁之间，具备高中以上学历与基础英语水平（雅思 5.5 / PTE 42）。\n持有 WHV 可以在新西兰合法打工、学习短期课程（最多 6 个月）以及深度体验当地生活。许多技术人才、厨师、汽修技工或 IT 从业者利用这 12 个月的当地合法身份，直接在本地面试企业，成功完成从 WHV 到 AEWV 工签或绿名单的逆风翻盘！",
      "fatalTraps": [
        "同雇主工作时长限制：在新西兰为同一雇主工作一般不得超过 3 个月（从事农场季节性采摘等特定延期除外）。",
        "抢名额秒空：每年开放日由于上百万人抢千个名额，需提前做好公证与网络准备，警惕黄牛脚本诈骗。",
        "温水煮青蛙：若只沉迷于农场换宿和打零工，12 个月一晃而过无法衔接长期合法签证，只能遗憾回国。"
      ],
      "idealFor": "18~35 周岁、英语良好、有一定积蓄和冒险精神、希望肉身先行出海寻找职业突围机会的青年群体。",
      "discouragedFor": "年龄超过 35 岁、有严重慢性疾病、或期望直接拿到长期永居的家庭主申。",
      "officialLawQuote": "INZ Operational Manual WI2.1: \"China Working Holiday Scheme allows young citizens of China aged 18 to 35 to stay in NZ for up to 12 months for working and holidaying purposes.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 NZ 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "China Working Holiday Visa 法定适用岗位",
            "englishName": "Eligible Roles for WHV",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 NZ 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "nz_investor",
    "countryCode": "NZ",
    "category": "investor",
    "code": "Active Investor Plus",
    "name": "Active Investor Plus Visa",
    "chineseName": "新西兰积极投资者加分居留签证",
    "summary": "面向高净值人群的直接居留签证，投资 500 万至 1500 万纽币于新西兰直投企业、私募基金或上市公司，3-4 年直接获得永久回头签。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "NZD $7,900",
      "cnyEstimate": "约 ¥34,800",
      "amount": 7900,
      "currency": "NZD"
    },
    "effectivePeriod": "2022.09 - 至今 (现行投资法案)",
    "estimatedProcessingTime": "4 - 8 个月",
    "officialSourceUrl": "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/active-investor-plus-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "无本地工资要求，资金合法来源解释与投资合规证明",
    "tags": [
      "大额投资",
      "商业移民",
      "高净值专享",
      "永久回头签"
    ],
    "isActive": true,
    "sortOrder": 6,
    "advisorVerdict": {
      "highlightQuote": "最低投资 500 万~1500 万纽币（折合人民币约 2200 万~6500 万起步）。家里真有几栋楼需要跨国避险的富豪专享，普通工薪技术流请直接右转看 6分制，别在此浪费生命。",
      "summary": "Active Investor Plus (积极投资者加分居留签证) 是新西兰取代旧版一二类投资移民的现行法案。该法案极度偏爱直接投资（Direct Investment）——如果投资新西兰本土创新企业或风投基金，权重为 3 倍，仅需出资 NZD $500 万；若投资上市股票或合规基金，权重为 1 倍，需实打实注资 NZD $1500 万。\n申请人享有 3 年内累计居住仅 117 天（直接投资）或 438 天的超宽松居住条件，资金维持 4 年后一步到位换发全家永久回头签。",
      "fatalTraps": [
        "资金穿透溯源（Source of Wealth）：移民局反洗钱审核极度严苛，所有投资资金必须拥有无可挑剔的合法完税凭证与完整审计追踪链。",
        "排他性被动资产：严禁将资金投入住宅房地产买卖或现有成熟商业收租物业。",
        "汇率与商业风险：直接投资新西兰初创企业享有高估值折算，但也需承担创业项目破产的商业本金损失风险。"
      ],
      "idealFor": "高净值家族办公室掌门人、跨境企业家、需要配置南半球安全资产与永久回头签身份的超富裕阶层。",
      "discouragedFor": "普通中产阶层、流动资金低于 2500 万人民币、无法提供完整合法完税审计报告的申请人。",
      "officialLawQuote": "INZ Operational Manual BJ1.1: \"Active Investor Plus category aims to attract high-value, active direct investment into innovative New Zealand businesses.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 NZ 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Active Investor Plus Visa 法定适用岗位",
            "englishName": "Eligible Roles for Active Investor Plus",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 NZ 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "au_189",
    "countryCode": "AU",
    "category": "pr",
    "code": "189",
    "name": "Skilled Independent Visa (Subclass 189)",
    "chineseName": "澳大利亚 189 独立技术移民永居签证",
    "summary": "澳洲技术移民纯打分通道，无需州担保和雇主绑定，凭个人在年龄、英语、学历、工作经验等打分择优受邀直接发 PR。",
    "thresholdScore": 65,
    "maxScorePossible": 140,
    "invitationMechanism": "points_ranked",
    "eoiRequired": true,
    "jobOfferMandatory": false,
    "ageLimit": 45,
    "officialFee": {
      "local": "AUD $4,640",
      "cnyEstimate": "约 ¥22,000",
      "amount": 4640,
      "currency": "AUD"
    },
    "effectivePeriod": "2012.07 - 至今 (按轮次择优邀请)",
    "estimatedProcessingTime": "3 - 9 个月",
    "officialSourceUrl": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "无最低薪资强制要求，凭 Points Test 打分高低受邀",
    "tags": [
      "独立技术",
      "无需雇主",
      "打分制PR",
      "一步到位绿卡"
    ],
    "isActive": true,
    "sortOrder": 7,
    "advisorVerdict": {
      "highlightQuote": "文商科与泛 IT 已经卷成 95~100 分的修罗场。如果没有 CCL 翻译加分、偏远地区加分和 PTE 4个79（8炸），别指望裸分获邀。建议理智转战 190/491 州担。",
      "summary": "澳洲 189 独立技术移民是全澳含金量最高、最自由的 PR 签证——获批后无需绑定特定雇主，无任何居住地域限制，在悉尼、墨尔本、布里斯班自由定居。\n但也正因如此，189 采取“择优高分邀请制（Points-Ranked）”。除医疗护理、幼教和特定紧缺技工可在 65~75 分获邀外，热门会计、金融、软件工程及通用工程等职业，获邀底线常年被刷到 90~100 分。申请人必须叠满：年龄满分(30分) + 硕士(15分) + PTE 8炸(20分) + 澳洲2年学习(5分) + NAATI翻译(5分) + PY职业年(5分) + 单身/配偶带加分(10分)。",
      "fatalTraps": [
        "名额潮汐波动：联邦每年配额大幅调整，非紧缺专业可能连续两三年零邀请。",
        "45岁悬崖：一旦年满 45 周岁，系统 EOI 资格直接归零作废，丧失全部独立技术移民资格。",
        "职业评估有效期：ACS/EA/VETASSESS 职业评估及 PTE 语言成绩有效期分别为 2~3 年，长时间等待排期易面临材料过期重考。"
      ],
      "idealFor": "医疗护理、幼教专业毕业生，或在 33 岁以内、英语能轻松考到 PTE 4个79、且在工程/IT 领域能拿到 95 分以上的单身高精尖学霸。",
      "discouragedFor": "英语无法考出 PTE 79、年龄超过 38 岁、专业属于市场营销/普通文商科的普通申请者。",
      "officialLawQuote": "Migration Regulations 1994 - Subclass 189: \"Points-tested stream requires the applicant to score not less than the score specified in the invitation letter under Section 65 of the Act.\""
    },
    "prerequisites": {
      "ageLimit": "收到获邀信 (ITA) 时年龄严格在 45 周岁以下",
      "languageBenchmark": "雅思 G 类 4 个 6 / PTE 4 个 50 (Competent English，建议 4 个 8 冲 20分加分)",
      "employerAccreditation": "独立技术类免雇主担保，获批后享有全澳无限制定居与工作权",
      "healthAndCharacter": "满足澳洲移民法 4005/4007 健康条款与 501 品格审查 (无犯罪公证)"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 计算机与数字软件研发 (ACS 评估)",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "软件开发与应用程序员",
            "englishName": "Developer Programmer / Software Engineer",
            "code": "ANZSCO 261312 / 261313",
            "qualificationReq": "ACS (Australian Computer Society) 官方技能评估函 + 本科/硕士 IT 学位",
            "wageReq": "按打分高低择优抽选 (建议 EOI 85分+，含年龄/语言/学历)",
            "highlightTag": "189 独立技术直邀"
          },
          {
            "name": "ICT 系统架构师与分析师",
            "englishName": "ICT Systems Analyst / Analyst Programmer",
            "code": "ANZSCO 261112 / 261311",
            "qualificationReq": "ACS 官方技能评估通过函",
            "wageReq": "按 EOI 评分池择优抽选",
            "highlightTag": "189 独立技术直邀"
          },
          {
            "name": "计算机网络与系统工程师",
            "englishName": "Computer Network and Systems Engineer",
            "code": "ANZSCO 263111",
            "qualificationReq": "ACS 官方技能评估通过函",
            "wageReq": "按 EOI 评分池择优抽选",
            "highlightTag": "189 独立技术直邀"
          }
        ]
      },
      {
        "categoryName": "🩺 注册医疗与临床护理 (ANMAC 评估)",
        "categoryIcon": "Stethoscope",
        "occupations": [
          {
            "name": "注册护士 (老年/急诊/社区护理)",
            "englishName": "Registered Nurse (Medical / Emergency / Aged Care)",
            "code": "ANZSCO 254499",
            "qualificationReq": "ANMAC (Australian Nursing & Midwifery Accreditation Council) 全评 + AHPRA 注册",
            "wageReq": "医护类别享有优先低分获邀特权 (65~70分即有机会获邀)",
            "highlightTag": "189 优先轮次秒邀"
          },
          {
            "name": "全科与专科医生",
            "englishName": "General Practitioner / Resident Medical Officer",
            "code": "ANZSCO 253111",
            "qualificationReq": "AMC (Australian Medical Council) 执业资格评估认证",
            "wageReq": "全澳极度紧缺，优先轮次批签",
            "highlightTag": "189 优先轮次秒邀"
          }
        ]
      },
      {
        "categoryName": "🏗️ 核心工程与建造规划 (Engineers Australia 评估)",
        "categoryIcon": "HardHat",
        "occupations": [
          {
            "name": "土木与结构工程师",
            "englishName": "Civil Engineer / Structural Engineer",
            "code": "ANZSCO 233211",
            "qualificationReq": "EA (Engineers Australia) 华盛顿协议或 CDR 职业能力报告评估通过函",
            "wageReq": "工程大类常态化抽选",
            "highlightTag": "189 独立技术直邀"
          },
          {
            "name": "电气与自动化工程师",
            "englishName": "Electrical Engineer",
            "code": "ANZSCO 233311",
            "qualificationReq": "EA 官方职业技能评估通过函",
            "wageReq": "工程大类常态化抽选",
            "highlightTag": "189 独立技术直邀"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据澳大利亚移民法 Migration Act 1958 & Migration Regulations 1994 Subclass 189",
      "requiredEvidenceList": [
        "对应评估机构 (ACS / EA / ANMAC / VETASSESS) 出具的有效期内正规职业评估函 (Skills Assessment)",
        "雅思 (IELTS) / PTE Academic 官方成绩单 (3年有效期内)",
        "海外及澳洲境内全职纳税工作经验材料 (税单 Notice of Assessment & 工资单)",
        "澳洲内政部 SkillSelect EOI 获邀邀请信 (ITA)",
        "全家澳洲体检报告 (Bupa Medical Visa Services) 与无犯罪证明 (AFP & 中国公证)"
      ]
    }
  },
  {
    "id": "au_190",
    "countryCode": "AU",
    "category": "pr",
    "code": "190",
    "name": "Skilled Nominated Visa (Subclass 190)",
    "chineseName": "澳大利亚 190 州政府担保技术永居签证",
    "summary": "获得澳洲各州或领地政府提名自带 +5 分加分，需满足各州紧缺职业清单与定居承诺，获批即获永久居留。",
    "thresholdScore": 65,
    "maxScorePossible": 140,
    "invitationMechanism": "state_nomination",
    "eoiRequired": true,
    "jobOfferMandatory": false,
    "ageLimit": 45,
    "officialFee": {
      "local": "AUD $4,640",
      "cnyEstimate": "约 ¥22,000",
      "amount": 4640,
      "currency": "AUD"
    },
    "effectivePeriod": "2012.07 - 至今 (各州配额矩阵)",
    "estimatedProcessingTime": "6 - 12 个月",
    "officialSourceUrl": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "部分州担保要求本地 Offer 年薪 AUD $70,000+",
    "tags": [
      "州担保+5分",
      "一步到位PR",
      "各州紧缺清单",
      "2年州内定居"
    ],
    "isActive": true,
    "sortOrder": 8,
    "advisorVerdict": {
      "highlightQuote": "自带 5 分州担保加持的直接绿卡，各州政策“神仙打架”，选对州（如塔州、西澳、维州紧缺优先）往往比死磕 189 效率高数倍。",
      "summary": "190 州担保签证是各州政府根据本州产业缺口自主提名的永久居民 PR 签证。一旦获得州政府提名，系统自动为申请人加 5 分。\n获批后主申唯一法定承诺是：在获批后前 2 年内在该州居住和工作。各州政策偏好差异巨大：维州重金偏爱生物医药与硬科技；西澳狂招建筑与采矿工程师；新州更看重高薪与本地雇佣。",
      "fatalTraps": [
        "各州矩阵池内卷：如堪培拉 Matrix、昆州 QROI 等，州内自身还有一套次级打分筛选规则。",
        "居住合规审查：虽然宪法保障自由迁徙，但若无故提前离开担保州，未来入籍或申请 RRV (155) 居民返程签可能面临诚信质疑。",
        "州政策年中突变：每年 7 月新财年各州配额耗尽或重置时，部分通道可能突然关停或抬高准入门槛。"
      ],
      "idealFor": "分数在 75~85 分区间、愿意在目标州深耕 2 年、且专业属于该州战略紧缺清单的留学生与技术人才。",
      "discouragedFor": "坚决不肯离开悉尼/墨尔本中心城区、不愿意遵守 2 年州内居住承诺的求职者。",
      "officialLawQuote": "Migration Regulations 1994 - Subclass 190: \"Nominated by an Australian state or territory government agency, conferring permanent residency with a 2-year state residence commitment.\""
    },
    "prerequisites": {
      "ageLimit": "收到州政府提名邀请时年龄在 45 周岁以下",
      "languageBenchmark": "雅思 4 个 6 (PTE 50) 基础线，部分州（如新州/维州）要求雅思 4 个 7 或 8",
      "employerAccreditation": "获得各州/领地政府官方担保提名 (+5 分 EOI 额外加分)，需承诺在担保州居住至少 2 年",
      "healthAndCharacter": "满足澳洲移民法 4005/4007 健康与品格审查"
    },
    "occupationGroups": [
      {
        "categoryName": "🏛️ 州政府优先发展领域 (State Priority Sectors)",
        "categoryIcon": "Award",
        "occupations": [
          {
            "name": "IT 与数字技术全系",
            "englishName": "ICT Business Analyst / Developer Programmer",
            "code": "ANZSCO 261111 / 261312",
            "qualificationReq": "ACS 职业评估通过 + 各州紧缺清单 (State Skills List) 匹配",
            "wageReq": "获得州提名后 +5 分直接递交 190 绿卡",
            "highlightTag": "各州担保一步到位 PR"
          },
          {
            "name": "幼教与中学教师",
            "englishName": "Early Childhood / Secondary School Teacher",
            "code": "ANZSCO 241111 / 241411",
            "qualificationReq": "AITSL 教师职业评估通过 (需 4 年高教 + 雅思 7788 或 4年英文授课豁免)",
            "wageReq": "全澳各州顶级优先保送获邀",
            "highlightTag": "各州担保一步到位 PR"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据澳大利亚移民法规 Migration Regulations 1994 - Subclass 190 (Skilled Nominated)",
      "requiredEvidenceList": [
        "各州政府发出的官方州担保提名确认信 (State Nomination Approval Letter)",
        "正规技术职业评估机构评估报告 (ACS / EA / ANMAC / AITSL)",
        "雅思或 PTE 成绩单与 2 年州内居住承诺签署声明 (Commitment to State)"
      ]
    }
  },
  {
    "id": "au_491",
    "countryCode": "AU",
    "category": "pr",
    "code": "491",
    "name": "Skilled Work Regional (Provisional) Visa (Subclass 491)",
    "chineseName": "澳大利亚 491 偏远地区州担保临居转永居",
    "summary": "偏远地区州担保自带 +15 分重磅加分，5 年临居签证，在偏远地区工作居住满 3 年可申请 191 永久居留绿卡。",
    "thresholdScore": 65,
    "maxScorePossible": 140,
    "invitationMechanism": "state_nomination",
    "eoiRequired": true,
    "jobOfferMandatory": false,
    "ageLimit": 45,
    "officialFee": {
      "local": "AUD $4,640",
      "cnyEstimate": "约 ¥22,000",
      "amount": 4640,
      "currency": "AUD"
    },
    "effectivePeriod": "2019.11 - 至今 (偏远地区强力扶持)",
    "estimatedProcessingTime": "6 - 14 个月",
    "officialSourceUrl": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-work-regional-491",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "偏远地区居住工作3年，需保留纳税申报 ATO Notice",
    "tags": [
      "偏远地区+15分",
      "3年转191PR",
      "低门槛超车"
    ],
    "isActive": true,
    "sortOrder": 9,
    "advisorVerdict": {
      "highlightQuote": "多给 15 分的偏远地区准绿卡，是 45 岁以下技术人群上岸澳洲的最大政策红利通道；3年转 191 永居已取消最低收入门槛！",
      "summary": "491 偏远地区技术移民签证属于 5 年期准永居（Provisional Visa），由偏远地区州政府或偏远地区亲属担保直接加 15 分！除悉尼、墨尔本、布里斯班三大核心城区外，其余全部地区（如珀斯、阿德莱德、黄金海岸、纽卡斯尔、卧龙岗、堪培拉、塔斯马尼亚全境）均属合规偏远地区。\n持签人在偏远地区生活工作满 3 年，且有连续 3 年报税记录（Notice of Assessment），即可无缝直接转批 191 永久居民绿卡。2023年起移民局已正式取消原先 AUD $53,900 的最低年薪门槛限制，只要诚实报税即可！",
      "fatalTraps": [
        "8579 严格居住条款：在持有 491 期间，主申及全家严禁在非偏远地区买房居住或全职工作，违者签证直接取消。",
        "过桥期间无法转其他永居：持有 491 满 3 年前，法律明确禁止转申 189、190 或 820 配偶签。",
        "偏远地区就业市场：当地对专业对口白领工作岗位有限，需做好初期在非一线城市寻找过渡工作的心理准备。"
      ],
      "idealFor": "分数不足 189/190、年龄在 33~44 岁需要 15 分强力加分、愿意在珀斯/阿德莱德/黄金海岸等宜居二线城市安居乐业的技术骨干。",
      "discouragedFor": "生活完全依赖一线大都会繁华圈、无法在偏远地区连续居住 3 年的申请人。",
      "officialLawQuote": "Migration Regulations 1994 - Subclass 491: \"Regional Provisional Visa subject to Condition 8579, requiring the holder to live, work and study only in designated regional areas.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 AU 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Skilled Work Regional (Provisional) Visa (Subclass 491) 法定适用岗位",
            "englishName": "Eligible Roles for 491",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 AU 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "au_482",
    "countryCode": "AU",
    "category": "work",
    "code": "482",
    "name": "Temporary Skill Shortage Visa (Subclass 482 / Skills in Demand)",
    "chineseName": "澳大利亚 482 紧缺技能雇主担保工签",
    "summary": "受合规澳洲雇主担保，年薪达到 TSMIT $73,150 门槛，工作满 2 年可由雇主保荐 186 TRT 直转永久绿卡。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "AUD $3,115",
      "cnyEstimate": "约 ¥14,800",
      "amount": 3115,
      "currency": "AUD"
    },
    "effectivePeriod": "2018.03 - 至今 (2024.12 SID改革版)",
    "estimatedProcessingTime": "1 - 3 个月",
    "officialSourceUrl": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "法定最低年薪 TSMIT AUD $73,150/年",
    "tags": [
      "雇主工签",
      "2年转186PR",
      "TSMIT高薪门槛"
    ],
    "isActive": true,
    "sortOrder": 10,
    "advisorVerdict": {
      "highlightQuote": "雇主担保核心工签，2024年底已全面过渡至 Skills in Demand 架构。TSMIT 薪资红线卡死 AUD $73,150，工作满 2 年直通 186 永居！",
      "summary": "482 临时技能短缺工签（TSS / Skills in Demand）是澳洲企业引进海外核心人才的主要工具。澳洲已全面打通所有 482 职业转 186 永居的绿色通道——只要为合规雇主全职工作满 2 年，雇主愿意配合担保，即可直接递交 186 TRT 永居绿卡申请！\n但前提是薪资必须达到法定 TSMIT 门槛（AUD $73,150/年 起），雇主必须通过 SAF 培训征费（每人每年 $1,200~$1,800），并证明无本地澳洲人可替代。",
      "fatalTraps": [
        "TSMIT 薪资刚性：年薪低于 $73,150 的职位无法递交，且不得通过虚假加班或降低工时来规避。",
        "雇主绑定与离职倒计时：一旦被裁员或离职，持签人有 180 天时间寻找新担保雇主或离境。",
        "职业评估与2年工作经验：递交 482 必须具备至少 1~2 年对口全职工作经验。"
      ],
      "idealFor": "具有 2 年以上行业实战经验、能直接拿到澳洲合规企业正规 Job Offer 的资深工程师、IT 人才与紧缺技工。",
      "discouragedFor": "应届零工作经验毕业生、无法达到 $73,150 薪资门槛的初级辅助岗位人员。",
      "officialLawQuote": "Migration Regulations 1994 - Subclass 482: \"Employer must be an approved sponsor and salary must meet or exceed the Temporary Skilled Migration Income Threshold (TSMIT).\""
    },
    "prerequisites": {
      "ageLimit": "转 186 永居时年龄 < 45 周岁 (482 工签本身无严格年龄上限)",
      "languageBenchmark": "雅思总分 5.0 (单项不低于 4.5~5.0) 或 PTE 相应分数",
      "employerAccreditation": "雇主必须为合规 Standard Business Sponsor 且通过 Labour Market Testing 劳工测试",
      "healthAndCharacter": "购买符合 8501 条款的澳洲海外访客健康保险 (OVHC) 并通过品格背景审查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 核心紧缺技能与中高级工种 (TSMIT 刚性门槛)",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "软件与系统工程师",
            "englishName": "Software and Applications Programmer",
            "code": "ANZSCO 261399",
            "qualificationReq": "具备至少 2 年相关全职工作经验 + 相关专业大专/本科",
            "wageReq": "合同薪资必须达到法定 TSMIT 门槛 AUD $73,150/年 起",
            "highlightTag": "2年转186永居绿卡"
          },
          {
            "name": "机械工程师与机电一体化技术员",
            "englishName": "Mechanical Engineer",
            "code": "ANZSCO 233512",
            "qualificationReq": "2 年以上对口工业界全职经验",
            "wageReq": "不低于 TSMIT $73,150 + Super 养老金",
            "highlightTag": "2年转186永居绿卡"
          },
          {
            "name": "厨师与西点师 (Chefs / Cooks)",
            "englishName": "Chef",
            "code": "ANZSCO 351311",
            "qualificationReq": "持有商厨三级/四级证书或 TRA / VETASSESS 技工评估",
            "wageReq": "达到 TSMIT $73,150/年 基准",
            "highlightTag": "2年转186永居绿卡"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据澳大利亚移民法规 Migration Regulations 1994 - Subclass 482 (Temporary Skill Shortage)",
      "requiredEvidenceList": [
        "合规雇主担保提名批准信 (Nomination Approval Notice)",
        "至少 2 年全职对口工作经历证明 (含税单、社保、工资流水与雇主推荐信)",
        "符合 TSMIT $73,150 的正式全职劳动合同 (Employment Contract)",
        "海外访客医疗保险凭证 (OVHC Policy Certificate)"
      ]
    }
  },
  {
    "id": "au_485",
    "countryCode": "AU",
    "category": "study",
    "code": "485",
    "name": "Temporary Graduate Visa (Subclass 485 Post-Higher Education)",
    "chineseName": "澳大利亚 485 毕业生工作签证 (新政卡35岁)",
    "summary": "完成 2 年全日制 CRICOS 课程享有 2-4 年工作许可。2026 改革将申请年龄上限由 50 岁严卡至 35 岁，语言提升至 6.5。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "ageLimit": 35,
    "officialFee": {
      "local": "AUD $1,945",
      "cnyEstimate": "约 ¥9,200",
      "amount": 1945,
      "currency": "AUD"
    },
    "effectivePeriod": "2024.07 - 至今 (严卡35岁新政)",
    "estimatedProcessingTime": "1 - 3 个月",
    "officialSourceUrl": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-graduate-485",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "开放工签无薪资门槛，全职工作权限",
    "tags": [
      "严卡35岁",
      "本硕2-3年",
      "语言雅思6.5"
    ],
    "isActive": true,
    "sortOrder": 11,
    "advisorVerdict": {
      "highlightQuote": "澳洲留学后的关键缓冲带。2024 年新政实施后年龄上限从 50 岁骤降至 35 岁（博士仍可至 50 岁），大龄留学生务必警惕学签陷阱！",
      "summary": "485 毕业生工作签证（Temporary Graduate Visa）为在澳完成 2 年以上注册课程（CRICOS）的毕业生提供合法全职工作权限。\n2024年7月起澳洲实施了历史性重磅新政：① 申请年龄上限从 50 岁缩减至 35 岁（旨在打击大龄以假留学为目的滞留者，研究型硕士/博士除外）；② 语言要求提升至雅思 6.5（单项不低于 5.5）；③ 工签时长重新校准（学士/授课型硕士 2 年，研究型硕士/博士 3 年）。",
      "fatalTraps": [
        "35岁年龄红线：就读授课型硕士的同学如果在毕业递签时已满 36 周岁，将直接丧失 485 申请资格！",
        "两年澳洲学习要求（Australian Study Requirement）：课程注册时长必须至少 92 周且在澳实地就读至少 16 个日历月。",
        "申请时限 6 个月：必须在结课信（Completion Letter）出具之日起 6 个月内完成递交，逾期作废。"
      ],
      "idealFor": "35 周岁以下、在澳完成本科或硕士学业、计划利用 2 年工签累积本地经验考取 PTE 8 炸冲刺 190/189 的青年学生。",
      "discouragedFor": "超过 35 岁却就读普通授课型硕士、未提前规划移民通道的申请人。",
      "officialLawQuote": "Migration Amendment (Graduate Visas) Regulations 2024: \"Restricts maximum eligible age to 35 years for Post-Higher Education Work stream except for Masters (research) and Doctoral degree holders.\""
    },
    "prerequisites": {
      "ageLimit": "2024年新政实施后年龄上限严格卡在 35 周岁以下 (硕博研究型申请人除外)",
      "languageBenchmark": "雅思总分 6.5 (单项不低于 5.5) 或 PTE 总分 57 (单项不低于 43)",
      "employerAccreditation": "毕业开放工签，无需任何雇主担保或 Job Offer，享有全职自由工作权限",
      "healthAndCharacter": "完成澳洲无犯罪检查 (AFP Check) 与 OVHC 医疗保险购买"
    },
    "occupationGroups": [
      {
        "categoryName": "🎓 澳洲毕业生工作流 (Post-higher Education Stream)",
        "categoryIcon": "GraduationCap",
        "occupations": [
          {
            "name": "澳洲本科及授课型硕士毕业生",
            "englishName": "Bachelor & Coursework Master Graduates",
            "code": "Subclass 485 (Higher Education)",
            "qualificationReq": "在澳洲本土完成至少 2 个学年 (92周) CRICOS 注册课程",
            "wageReq": "无薪资门槛，自由工作受雇",
            "highlightTag": "2~3年全职开放工签"
          },
          {
            "name": "澳洲研究型硕士与博士毕业生",
            "englishName": "Master by Research & PhD Graduates",
            "code": "Subclass 485 (Research)",
            "qualificationReq": "完成澳洲研究型硕博学位 (年龄放宽至 50 周岁)",
            "wageReq": "享有最长 3~4 年留澳工作权限",
            "highlightTag": "3~4年全职开放工签"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据澳大利亚移民法规 Migration Regulations 1994 - Subclass 485 (Temporary Graduate)",
      "requiredEvidenceList": [
        "澳洲高校官方完成信 (Letter of Completion) 及官方完整成绩单",
        "澳洲联邦警察局无犯罪证明 (AFP National Police Check)",
        "雅思 6.5 / PTE 57 官方考试成绩单 (1年有效期内)",
        "符合 8501 条款的 OVHC 留学生毕业工作保险单"
      ]
    }
  },
  {
    "id": "au_858",
    "countryCode": "AU",
    "category": "pr",
    "code": "858 / NIV",
    "name": "National Innovation Visa / Global Talent Visa (Subclass 858)",
    "chineseName": "澳大利亚国家创新签证 (原全球人才 GTI)",
    "summary": "面向全球顶尖科技独角兽创始人、高引用学者与关键行业领军人物，免除打分与雇主，直接发放永久绿卡。",
    "thresholdScore": 100,
    "maxScorePossible": 100,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": true,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "AUD $4,840",
      "cnyEstimate": "约 ¥23,000",
      "amount": 4840,
      "currency": "AUD"
    },
    "effectivePeriod": "2024.11 - 至今 (取代原GTI体系)",
    "estimatedProcessingTime": "2 - 6 个月",
    "officialSourceUrl": "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/global-talent-visa-858",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "需证明有能力达到高薪门槛 AUD $175,000/年",
    "tags": [
      "顶尖人才",
      "免打分直接PR",
      "学术科研",
      "高薪领军"
    ],
    "isActive": true,
    "sortOrder": 12,
    "advisorVerdict": {
      "highlightQuote": "澳洲顶尖人才天花板项目（GTI / National Innovation Visa），免打分、无需资产审计、一步到位全家 PR，但必须在十大未来领域证明国际级影响力。",
      "summary": "858 全球人才独立移民签证（Global Talent Visa / NIV）是澳洲为了在全球争抢顶尖科学家、独角兽创始人、硬科技领军人物设立的顶级通道。\n涵盖 10 大前沿领域：资源、农业食品/农业科技、能源、健康产业、国防/先进制造/航天、循环经济、数字科技 (AI/量子/半导体)、基础设施/交通、金融服务/金融科技、教育。申请人需证明具有达到年薪 Fair Work 高收入门槛（AUD $175,000+）的能力，并获得该领域澳洲顶尖机构或专家的合规背书（Form 1000 提名）。",
      "fatalTraps": [
        "博士红线收紧：已不再是普通应届博士的大锅饭，申请人必须有高引用因子学术产出、专利落地转化或重大工业界商业化成果。",
        "提名人资格被挑战：提名人或提名机构必须在全澳该领域享有公认声誉，非业内权威背书将被视为无效。",
        "高薪证明要求：青年学者必须出具同类岗位的市场薪资调研证明其未来可达到高收入标准。"
      ],
      "idealFor": "顶级科研学者、独角兽企业高管、芯片/AI/生物医药领军技术专家及国际级竞赛获奖者。",
      "discouragedFor": "普通背景从业者、无知名学术发表或重大技术成果的技术白领。",
      "officialLawQuote": "Migration Regulations 1994 - Subclass 858: \"Requires the applicant to have an internationally recognized record of exceptional and outstanding achievement in an eligible field.\""
    },
    "prerequisites": {
      "ageLimit": "无硬性年龄上限，但 18 岁以下或 55 岁以上需证明具备为澳洲带来特别经济贡献的能力",
      "languageBenchmark": "功能性英语 (Functional English / 雅思总分 4.5 或缴付第二期语言培训费)",
      "employerAccreditation": "免除劳工测试与雇主担保，需获得全澳该领域顶尖机构或权威专家的 Form 1000 官方背书",
      "healthAndCharacter": "通过澳洲最高规格的国家安全背景核验与无犯罪审查"
    },
    "occupationGroups": [
      {
        "categoryName": "🚀 十大国家创新前沿领域 (National Innovation 10 Target Sectors)",
        "categoryIcon": "Sparkles",
        "occupations": [
          {
            "name": "数字科技、AI 与先进量子计算",
            "englishName": "DigiTech, Artificial Intelligence & Quantum Computing",
            "code": "Sector 07 (DigiTech)",
            "qualificationReq": "独角兽核心高管、高引用学者、国际开源技术核心贡献者或发明专利持有者",
            "wageReq": "需证明有能力达到 Fair Work 高收入门槛 (AUD $175,000/年+)",
            "highlightTag": "免打分全家一步到位 PR"
          },
          {
            "name": "医疗健康产业与生物制药",
            "englishName": "Health Industries & Biotechnology",
            "code": "Sector 04 (Health)",
            "qualificationReq": "国际知名临床试验带头人、高影响因子学术发表或医疗器械专利发明人",
            "wageReq": "年薪达到或具备达到 $175,000+ 潜力",
            "highlightTag": "免打分全家一步到位 PR"
          },
          {
            "name": "先进制造、航天军工与循环经济",
            "englishName": "Advanced Manufacturing & Space",
            "code": "Sector 05 (Manufacturing)",
            "qualificationReq": "高精尖工业界技术带头人与资深工程师",
            "wageReq": "年薪 $175,000+",
            "highlightTag": "免打分全家一步到位 PR"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据澳大利亚移民法规 Migration Regulations 1994 - Subclass 858 (National Innovation Visa)",
      "requiredEvidenceList": [
        "澳洲顶尖行业权威专家或国家级学术机构签署的 Form 1000 官方提名书 (Nomination for Global Talent)",
        "国际级突出成就客观凭证 (国际知名奖项、顶刊论文发表、Google Scholar 高引用、核心专利及主流媒体专访)",
        "当前收入税单或澳洲猎头薪资调研报告证明年薪具备达到 AUD $175,000/年 的能力",
        "申请人个人详尽自述与赴澳后商业/学术价值转化陈述 (Statement of Achievement)"
      ]
    }
  },
  {
    "id": "ca_ee",
    "countryCode": "CA",
    "category": "pr",
    "code": "Express Entry",
    "name": "Express Entry (Comprehensive Ranking System CRS)",
    "chineseName": "加拿大联邦快速通道 (Express Entry CRS 打分)",
    "summary": "涵盖联邦技术 FSW、经验类 CEC 与技工 FST，通过年龄、双语、学历及本地经验综合排分，定向邀请 STEM、医疗、法语大军。",
    "thresholdScore": 480,
    "maxScorePossible": 1200,
    "invitationMechanism": "points_ranked",
    "eoiRequired": true,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "CAD $1,525",
      "cnyEstimate": "约 ¥8,100",
      "amount": 1525,
      "currency": "CAD"
    },
    "effectivePeriod": "2015.01 - 至今 (定向分类邀请制)",
    "estimatedProcessingTime": "6 个月",
    "officialSourceUrl": "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "需达到 TEER 0/1/2/3 对应岗位要求",
    "tags": [
      "CRS综合打分",
      "定向低分抽选",
      "法语狂加50分",
      "枫叶卡PR"
    ],
    "isActive": true,
    "sortOrder": 13,
    "advisorVerdict": {
      "highlightQuote": "普通海外申请人裸分 480~500 已经进不了全类通用池。2024~2026 的真正破局密钥只有两条：学好法语（NCLC 7+ 直接 400 分保送）或锁定定向紧缺类（Tech/Healthcare/Trades）。",
      "summary": "加拿大联邦快速通道（Express Entry）是全球积分制移民的鼻祖，包含联邦技术移民 (FSW)、经验类 (CEC) 和技工类 (FST)。\n目前 CRS（Comprehensive Ranking System）分数通胀极其严重，通用类（All-program）抽选分数常年维持在 530~550 分的夸张高度。但加拿大移民局开辟了【定向分类抽选 (Category-based selection)】：① 法语高技能人才（法语达标直接 400~420 分获邀）；② 医疗卫生；③ STEM 科学技术工程数学；④ 熟练技工；⑤ 交通运输与农业。",
      "fatalTraps": [
        "年龄断崖扣分：30 岁起每增加一岁 CRS 扣 5 分，40 岁后每年扣 10 分，大龄申请人在常规池极其被动。",
        "工作经验 TEER 对齐：国内工作证明必须精确符合加拿大 NOC/TEER 0/1/2/3 职责描述，背调时若职责被判定不符将面临 5 年欺诈禁令。",
        "资金证明要求：FSW 类主申需按家庭人数准备约 CAD $14,000~$25,000 的不可借贷安家资金证明。"
      ],
      "idealFor": "英语 CLB 9 (8777) 且法语良好的双语人才、或国内从事医疗/STEM 研发并有 3 年以上经验的 30 岁以下青年才俊。",
      "discouragedFor": "单语言成绩仅有雅思 6 分、年龄超过 35 岁且无加拿大本地留学或工作经验的普通单向求职者。",
      "officialLawQuote": "Immigration and Refugee Protection Act (IRPA) Section 10.3: \"Ministerial Instructions governing the Express Entry system and category-based selection draws.\""
    },
    "prerequisites": {
      "ageLimit": "无严格法定上限，但 30 岁起 CRS 每年扣 5 分，40 岁后每年扣 10 分",
      "languageBenchmark": "FSW 门槛 CLB 7 (雅思 6666)，高分池需冲刺 CLB 9 (雅思 8777) 或法语 NCLC 7+",
      "employerAccreditation": "联邦技术类免 LMIA 雇主 Offer，但持有合规 LMIA Job Offer 可加 50~200 分",
      "healthAndCharacter": "通过 IRCC Panel Physician 移民体检，并提供近 10 年所有常住国无犯罪证明"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 STEM 科学、技术、工程与数学定向类",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "软件开发工程师与程序员",
            "englishName": "Software Developers and Programmers",
            "code": "NOC 21232 (TEER 1)",
            "qualificationReq": "ECA (WES) 认证的海外或加拿大计算机学士/硕士",
            "wageReq": "满足加拿大本地 Prevailing Wage 薪酬基准",
            "highlightTag": "STEM 定向低分获邀"
          },
          {
            "name": "数据科学家与数据分析师",
            "englishName": "Data Scientists",
            "code": "NOC 21211 (TEER 1)",
            "qualificationReq": "ECA 认证硕士或学士学位 + 至少 1 年连续全职经验",
            "wageReq": "满足对口薪资基准",
            "highlightTag": "STEM 定向低分获邀"
          }
        ]
      },
      {
        "categoryName": "🩺 医疗卫生与健康护理定向类",
        "categoryIcon": "Stethoscope",
        "occupations": [
          {
            "name": "注册护士与执业护士",
            "englishName": "Registered Nurses and Registered Psychiatric Nurses",
            "code": "NOC 31301 (TEER 1)",
            "qualificationReq": "加拿大省级护士行会 (如 CNO / BCCNM) 资格审查或评估",
            "wageReq": "医护类别定向超低分抽选 (430~460分获邀)",
            "highlightTag": "Healthcare 定向秒邀"
          }
        ]
      },
      {
        "categoryName": "🇫🇷 法语高技能定向类 (Bilingual Advantage)",
        "categoryIcon": "GraduationCap",
        "occupations": [
          {
            "name": "法语通用技能全职业",
            "englishName": "French-speaking Skilled Workers (All NOC TEER 0/1/2/3)",
            "code": "TEER 0/1/2/3 全职业",
            "qualificationReq": "法语 TEF Canada / TCF Canada 达到 NCLC 7+ (听说读写各 B2)",
            "wageReq": "无特殊限制，享 50 分重磅加分与 400~420 分超低分保送抽选",
            "highlightTag": "400分特快直通 PR"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据加拿大移民与难民保护法 Immigration and Refugee Protection Act (IRPA) Section 10.3",
      "requiredEvidenceList": [
        "WES (World Education Services) / ICAS 出具的官方学历认证报告 (ECA)",
        "IELTS General Training / CELPIP / TEF Canada 语言考试成绩单",
        "过去 10 年符合 NOC TEER 职责的雇主推荐信 (Reference Letter) 与纳税工资流水",
        "不可借贷的家庭定居安置资金证明 (Proof of Funds, 约 CAD $14,000 ~ $25,000)",
        "IRCC 认证医生全身体检报告与无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "ca_pnp_tech",
    "countryCode": "CA",
    "category": "pr",
    "code": "PNP Tech / Master",
    "name": "Provincial Nominee Program (BC PNP Tech & Ontario Masters)",
    "chineseName": "加拿大省提名科技与硕博通道 (BC Tech / OINP)",
    "summary": "各省针对理工紧缺 IT/工程及公立名校硕博毕业生的特快直通车，省提名获批直接获得 EE +600 分保送或直接递交联邦永居。",
    "thresholdScore": 100,
    "maxScorePossible": 200,
    "invitationMechanism": "state_nomination",
    "eoiRequired": true,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "CAD $1,475",
      "cnyEstimate": "约 ¥7,800",
      "amount": 1475,
      "currency": "CAD"
    },
    "effectivePeriod": "2017.05 - 至今 (常态化科技通道)",
    "estimatedProcessingTime": "6 - 12 个月",
    "officialSourceUrl": "https://www.welcomebc.ca/immigrate-to-b-c/bc-pnp-tech",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "符合省内同工同酬中位数",
    "tags": [
      "省提名+600分",
      "BC Tech35类紧缺",
      "安省硕博直接抽"
    ],
    "isActive": true,
    "sortOrder": 14,
    "advisorVerdict": {
      "highlightQuote": "各省对抗联邦高分堰塞湖的杀手锏。拿到 BC 省 Tech 或安省硕博通道提名直接在 EE 里怒加 600 分，下一轮保送拿枫叶卡！",
      "summary": "加拿大省提名计划（Provincial Nominee Program）是各省根据地方经济自主遴选移民的渠道。以 BC 省 Tech 通道为例，涵盖 35 个科技关键职位，只要拿到 BC 省合规雇主至少 1 年的全职 Job Offer，即可以极低抽选门槛获得省提名；\n安省 (OINP) 更有无需 Job Offer 的硕士毕业生通道与博士直通车。一旦获得省提名证书（PNP Certificate），系统自动在联邦 EE 中注入 600 分加分，保送下一轮获批全家 PR！",
      "fatalTraps": [
        "安省硕博通道抢配额：由于配额紧张，目前安省采用 EOI 打分制，对大多伦多地区 (GTA) 以外就读和高薪/STEM 专业加分权重倾斜。",
        "雇主合规与审查：BC Tech 要求雇主必须在 BC 省内实际运营且拥有至少 5 名全职本地员工。",
        "省提名绑定意向：在递交联邦审理期间必须保持在该省定居和工作的真实意向，不可中途搬迁去其他省份。"
      ],
      "idealFor": "在加拿大各省就读 STEM 硕士博士学位的毕业生，或能在 BC/安省/阿省拿到对口科技/工程 Job Offer 的海内外资深技术人员。",
      "discouragedFor": "无法获得省内合规雇主支持、且所读专业不在省紧缺目录上的普通文科毕业生。",
      "officialLawQuote": "BC PNP Skills Immigration Guide: \"Technology stream provides expedited processing for candidates with valid job offers in 35 key technology occupations.\""
    },
    "prerequisites": {
      "ageLimit": "无硬性年龄上限限制",
      "languageBenchmark": "满足 NOC 对应语言最低线 CLB 4~7 (依具体省份与职业类别判定)",
      "employerAccreditation": "必须持有 BC 省或安省合规科技企业签署的至少 1 年全职 Job Offer",
      "healthAndCharacter": "通过联邦 IRCC 阶段的全身体检与犯罪背景审查"
    },
    "occupationGroups": [
      {
        "categoryName": "🚀 BC Tech 35 类紧缺科技工种清单",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "计算机工程师与软件设计师",
            "englishName": "Computer Engineers (except software engineers)",
            "code": "NOC 21311 (TEER 1)",
            "qualificationReq": "对口工学学士 + BC 雇主 Job Offer",
            "wageReq": "达到 BC 省行业中位数薪资标准",
            "highlightTag": "省提名+600分保送EE"
          },
          {
            "name": "信息系统分析师与技术咨询师",
            "englishName": "Information Systems Specialists",
            "code": "NOC 21222 (TEER 1)",
            "qualificationReq": "计算机或信息管理本科以上学位",
            "wageReq": "每周 30+ 小时全职薪酬",
            "highlightTag": "每周定向特快抽选"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 BC Provincial Nominee Program (BC PNP) Skills Immigration Technical Guide",
      "requiredEvidenceList": [
        "BC 省合规科技雇主开具的正式聘书 (Job Offer) 与企业注册营业执照",
        "省提名申请人学历 WES ECA 认证报告与语言成绩单",
        "获得 BC 省提名后下发的省提名证书 (Nomination Certificate)"
      ]
    }
  },
  {
    "id": "ca_pgwp",
    "countryCode": "CA",
    "category": "study",
    "code": "PGWP",
    "name": "Post-Graduation Work Permit (PGWP 2026 Revision)",
    "chineseName": "加拿大毕业后工签 (PGWP 语言与专业新规)",
    "summary": "指定 DLI 高校毕业后签发最长 3 年开放工签，2026 新政强化了公立大学硕博直接发 3 年，College 课程需对口紧缺专业并考语言。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "CAD $255",
      "cnyEstimate": "约 ¥1,350",
      "amount": 255,
      "currency": "CAD"
    },
    "effectivePeriod": "2024.11 - 至今 (专业与CLB分流新政)",
    "estimatedProcessingTime": "2 - 4 个月",
    "officialSourceUrl": "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "开放工签无最低薪资限制",
    "tags": [
      "硕博3年开放工签",
      "积累CEC经验",
      "配偶工签限制"
    ],
    "isActive": true,
    "sortOrder": 15,
    "advisorVerdict": {
      "highlightQuote": "加拿大公立大学或学院读 2 年直接发 3 年全职开放工签，是绝大多数留学生积累 1 年 CEC 经验拿到枫叶卡的基石。",
      "summary": "毕业后工作签证（Post-Graduation Work Permit, PGWP）是加拿大留学生的核心价值所在。在公立大学（DLI 认可机构）完成 2 年以上全日制本硕博或文凭课程，可直接获批最长 3 年的开放工签。\n持有 PGWP 可以为任何合法雇主工作，无需做 LMIA 劳工批文。只要在 3 年内累积满 1 年加拿大本土 TEER 0/1/2/3 技能工作经验，即可解锁加拿大经验类移民 (CEC) 或省提名 (PNP) 大门！",
      "fatalTraps": [
        "私立学院陷阱：2024年起加拿大已全面叫停绝大多数公私合营（Curriculum Licensing）私校的 PGWP 资格。",
        "全日制连续就读红线：就读期间除最后一个学期外，严禁任何未经学校正式批准的 Part-time 选课或断学，否则 PGWP 直接被拒！",
        "语言新规门槛：2024年底起递交 PGWP 需额外提交语言证明（大学毕业生需 CLB 7，College 需 CLB 5）。"
      ],
      "idealFor": "计划通过 2 年留学深造作为跳板、家庭中产以上、愿意在毕业后踏实全职打拼 1~2 年拿到枫叶卡的青年学子。",
      "discouragedFor": "入读非 DLI 资质野鸡院校、学期中有旷课或擅自休学记录、英语极差无法通过毕业语言要求的学生。",
      "officialLawQuote": "IRPR Section 205(c)(ii): \"Work permit exemptions and PGWP eligibility for graduates from designated post-secondary learning institutions in Canada.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 CA 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Post-Graduation Work Permit (PGWP 2026 Revision) 法定适用岗位",
            "englishName": "Eligible Roles for PGWP",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 CA 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "ca_suv",
    "countryCode": "CA",
    "category": "investor",
    "code": "SUV",
    "name": "Start-up Visa Program",
    "chineseName": "加拿大联邦创业投资移民 (Start-up Visa)",
    "summary": "获得加拿大指定风投基金、天使投资组织或孵化器支持信（Letter of Support），最多 5 位核心创始人一步到位全家拿枫叶卡。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "CAD $2,385",
      "cnyEstimate": "约 ¥12,600",
      "amount": 2385,
      "currency": "CAD"
    },
    "effectivePeriod": "2013.04 - 至今 (严控孵化器配额版)",
    "estimatedProcessingTime": "12 - 24 个月",
    "officialSourceUrl": "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "需具备满足家庭人数要求的充裕创业与安家资金",
    "tags": [
      "创新创业",
      "一步到位PR",
      "无需解释个税",
      "支持信关键"
    ],
    "isActive": true,
    "sortOrder": 16,
    "advisorVerdict": {
      "highlightQuote": "最多 5 个合伙人组团一步到位全家拿枫叶卡。看似无需个税流水，但如果商业计划书造假或孵化器被移民局调查，全组团灭！",
      "summary": "联邦创业投资移民（Start-Up Visa Program, SUV）面向具备全球创新商业构想的创业团队。团队最多允许 5 位联合创始人共同作为主申申请全家永居。\n核心条件是获得加拿大指定机构（Designated Entities）的支持信：① 指定企业孵化器（Incubator）接收函；或 ② 天使投资集团至少 CAD $75,000 投资；或 ③ 风险投资基金至少 CAD $200,000 投资。每位联合创始人需持有企业 10%+ 股权且团队合计控股超 50%，语言要求仅需雅思 CLB 5 (5.0)。",
      "fatalTraps": [
        "关键人物连带责任：若商业计划书中的“关键人物（Essential Person）”因体检/无犯罪或背景被拒，其他所有副主申申请将一并被全盘否决！",
        "虚假孵化器暴雷：移民局对无实际业务进展的空壳项目开展深度同行评审（Peer Review），一旦判定项目缺乏真实落地，将直接以虚假陈述拒签。",
        "审理周期漫长：目前联邦 SUV 积压严重，平均审理周期可达 24~36 个月。"
      ],
      "idealFor": "具备真实海外出海业务、有核心技术专利或成熟 SaaS 商业模式、有真金白银创业意愿的创始团队与高管。",
      "discouragedFor": "花几十万找中介买“PPT 挂靠合伙人”名额、英语极差且完全不懂公司业务的纯挂靠型投资客。",
      "officialLawQuote": "IRPR Section 98.01: \"Start-up business class requirements for qualifying businesses supported by designated angel investor groups, venture capital funds or business incubators.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 CA 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Start-up Visa Program 法定适用岗位",
            "englishName": "Eligible Roles for SUV",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 CA 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "de_blue_card",
    "countryCode": "DE",
    "category": "work",
    "code": "EU Blue Card §18g AufenthG",
    "name": "EU Blue Card Germany (AufenthG §18g)",
    "chineseName": "德国欧盟蓝卡 (§18g 降门槛与IT免学历版)",
    "summary": "本科以上学历或 3 年 IT 实战经验，年薪达 €45,300 (常规) 或 €41,041 (紧缺)，交社保 21-27 个月直发德国永久居留。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "EUR €100",
      "cnyEstimate": "约 ¥780",
      "amount": 100,
      "currency": "EUR"
    },
    "effectivePeriod": "2023.11 - 至今 (新版移民法FEG)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "常规职位 €45,300/年，STEM/医疗等紧缺 €41,041/年",
    "tags": [
      "欧盟蓝卡",
      "21个月拿永居",
      "IT免本科学历",
      "全家畅行申根"
    ],
    "isActive": true,
    "sortOrder": 17,
    "advisorVerdict": {
      "highlightQuote": "2023年底新移民法全面放宽：紧缺行业年薪降至 €41,041，普通行业降至 €45,300。德语过 B1 最快 21 个月直通德国永居 (PR)！",
      "summary": "德国欧盟蓝卡（EU Blue Card §18g AufenthG）是目前欧洲大陆门槛最透明、拿永居速度最快的高技术移民项目。\n申请人只要持有认可的高校学位（中国全日制本科学位在 Anabin 数据库认作 H+ 即可），并且获得一份在德全职对口工作合同。薪资门槛：① IT、工程、数学、自然科学、医生等紧缺行业仅需 €41,041/年；② 普通行业仅需 €45,300/年。持有蓝卡并缴纳社保满 27 个月（德语过 A1）或满 21 个月（德语过 B1），即可直接申请德国永久居留（Niederlassungserlaubnis）！",
      "fatalTraps": [
        "学位与岗位不对口：外管局（Ausländerbehörde）与联邦劳工局（ZAV）严格审查学位与工作合同的相关性，专业跨度过大易被卡。",
        "外管局办事效率拖延：柏林、法兰克福等大城市外管局预约排期长达数月，需提前规划延长在德合法居留过渡。",
        "公立医保与社保缴纳中断：申请永居时会倒查每一笔社保（Rentenversicherung）流水，严禁断缴或偷税漏税。"
      ],
      "idealFor": "计算机软件、机械制造、电气自动化、新能源、应用数学等工科背景，愿意学习德语融入欧洲高福利社会的本科硕博人才。",
      "discouragedFor": "完全不愿学习德语、专业属于纯文史类、或无法在德国本地通过英语/德语面试获得合规 Offer 的求职者。",
      "officialLawQuote": "German Residence Act (AufenthG) § 18g: \"EU Blue Card is granted to qualified specialists with a recognized university degree and an employment contract meeting statutory minimum salary thresholds.\""
    },
    "prerequisites": {
      "ageLimit": "无硬性年龄上限，但 45 岁以上首次申请若年薪低于特定线需证明有足够养老保障",
      "languageBenchmark": "申请时不强制德语成绩；工作满 21 个月 (德语 B1) 或 27 个月 (德语 A1) 即可转德国永久居留 (Niederlassungserlaubnis)",
      "employerAccreditation": "持有德国本地企业签署的至少 6 个月正规全职工作合同",
      "healthAndCharacter": "购买德国公立或合规私立医疗保险 (Gesetzliche / Private Krankenversicherung) 并无刑事重罪"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 MINT 紧缺领域与高科技研发 (STEM)",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "软件开发与系统架构师",
            "englishName": "Software Developer & Systems Architect",
            "code": "ISCO-08 2512",
            "qualificationReq": "德国大学本硕学位或 Anabin H+ 认可高校对口学历，或 3 年 IT 从业经验",
            "wageReq": "紧缺领域法定最低年薪门槛 €41,041/年 (2024~2026 最新标准)",
            "highlightTag": "21个月转德国永居"
          },
          {
            "name": "网络与数据安全工程师",
            "englishName": "Information Security Analyst",
            "code": "ISCO-08 2529",
            "qualificationReq": "Anabin 认可学位或 3 年 IT 实操经验",
            "wageReq": "紧缺门槛 €41,041/年",
            "highlightTag": "21个月转德国永居"
          }
        ]
      },
      {
        "categoryName": "🏗️ 核心工业工程与自然科学",
        "categoryIcon": "HardHat",
        "occupations": [
          {
            "name": "机械制造与汽车研发工程师",
            "englishName": "Mechanical and Automotive Engineer",
            "code": "ISCO-08 2144",
            "qualificationReq": "Anabin 认证工学学位 (Diplom / Master / Bachelor)",
            "wageReq": "紧缺年薪 €41,041/年",
            "highlightTag": "21个月转德国永居"
          }
        ]
      },
      {
        "categoryName": "💼 常规全行业非紧缺领域",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "商务管理、金融与法务咨询",
            "englishName": "Business, Finance and Legal Professionals",
            "code": "ISCO-08 全专业",
            "qualificationReq": "德国认可大学本科/硕士学历",
            "wageReq": "常规非紧缺领域法定年薪门槛 €45,300/年 (2024~2026 最新标准)",
            "highlightTag": "21个月转德国永居"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据德国居留法 Aufenthaltsgesetz (AufenthG) § 18g (EU Blue Card)",
      "requiredEvidenceList": [
        "德国大学毕业证或通过 KMK Anabin 认证系统 (H+ 高校及对口专业) 打印件 / ZAB 同等学力认证",
        "德国雇主签署的正式工作合同及联邦劳工局申报表 (Erklärung zum Beschäftigungsverhältnis)",
        "符合法定最低年薪 (€41,041 紧缺 / €45,300 常规) 的薪资明细条目",
        "德国本土公立或私立医疗保险证明 (Mitgliedsbescheinigung Krankenkasse)"
      ]
    }
  },
  {
    "id": "de_ausbildung",
    "countryCode": "DE",
    "category": "study",
    "code": "Ausbildung §16a AufenthG",
    "name": "German Dual Vocational Training (Ausbildung §16a)",
    "chineseName": "德国双元制职业培训与就业移民 (§16a)",
    "summary": "免学费带薪就读护理、机电、IT 等双元制（每月津贴 €1,000~1,500），毕业获德国国家职业资格证书并直签全职合同，2 年拿德国永居。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "EUR €75",
      "cnyEstimate": "约 ¥590",
      "amount": 75,
      "currency": "EUR"
    },
    "effectivePeriod": "2020.03 - 至今 (新技术移民法扩张版)",
    "estimatedProcessingTime": "4 - 12 周",
    "officialSourceUrl": "https://www.make-it-in-germany.com/en/study-training/training-in-germany",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "培训期间月薪津贴 €1,000 - €1,500/月，毕业后按法定同工同酬",
    "tags": [
      "带薪读职校",
      "零学费月月领钱",
      "护士机电紧缺",
      "2年转德国永居"
    ],
    "isActive": true,
    "sortOrder": 18,
    "advisorVerdict": {
      "highlightQuote": "不仅免学费，德国企业每月还倒贴 €1,000~€1,400 工资，毕业 100% 留德转工签。适合吃苦耐劳的实干蓝领，养尊处优者慎选！",
      "summary": "德国双元制职业教育（Ausbildung）是德国制造业与现代服务业的立国之本。学员在 3 年期间，约 50% 时间在职业学校学习理论，50% 时间在签约德国企业带薪顶岗实操。\n涵盖专业：数控机床、机电一体化、汽车维修、西点烘焙、IT 运维、老年护理等 300+ 紧缺行当。企业不仅全额承担学费，每月还向学员发放固定实习津贴（第 1 年约 €1,000，第 3 年可达 €1,400+），毕业通过 IHK/HWK 行业工会考试后直接无缝转正式技工工签，满 2~3 年即可申请永居！",
      "fatalTraps": [
        "德语 B1/B2 硬门槛：无论是面签还是实际跟车间师傅交流，德语必须达到扎实的听读写能力，德语不过关连面签都会被拒。",
        "体力与纪律耐受力：护理或机械加工岗位要求倒班轮休、严格遵守车间安全规程，无法适应体力劳动者中途退学率极高。",
        "年龄与动机信合规：35 岁以上申请大龄双元制，德国大使馆会对其跨国学徒动机开展深度反向盘查。"
      ],
      "idealFor": "18~35 岁、高中或职高大专学历、愿意苦练德语、追求低成本稳妥拿欧洲大国永居的务实青年与蓝领技工。",
      "discouragedFor": "只想坐办公室当白领、不能接受车间倒班和体力实操、德语学习动力不足的人群。",
      "officialLawQuote": "Vocational Training Act (BBiG) & AufenthG § 16a: \"Residence permit for the purpose of company-based in-service training and subsequent pathway to permanent settlement.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 DE 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "German Dual Vocational Training (Ausbildung §16a) 法定适用岗位",
            "englishName": "Eligible Roles for Ausbildung §16a AufenthG",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 DE 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "de_chancenkarte",
    "countryCode": "DE",
    "category": "work",
    "code": "Chancenkarte §20a AufenthG",
    "name": "German Opportunity Card (Chancenkarte §20a)",
    "chineseName": "德国机会卡积分找工签证 (§20a 6分及格)",
    "summary": "2024 年 6 月正式启用的打分制找工签证。满 6 分直接获发 1 年居留赴德自由找工，允许每周 20 小时兼职与试工。",
    "thresholdScore": 6,
    "maxScorePossible": 14,
    "invitationMechanism": "points_ranked",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "ageLimit": 40,
    "officialFee": {
      "local": "EUR €75",
      "cnyEstimate": "约 ¥590",
      "amount": 75,
      "currency": "EUR"
    },
    "effectivePeriod": "2024.06 - 至今 (机会卡积分制正式落地)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://www.make-it-in-germany.com/en/visa-residence/types/opportunity-card",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "赴德前需存入限制性自保金账户约 €1,027/月",
    "tags": [
      "6分及格赴德",
      "无需预先Offer",
      "合法兼职打工",
      "转蓝卡跳板"
    ],
    "isActive": true,
    "sortOrder": 19,
    "advisorVerdict": {
      "highlightQuote": "2024年6月正式生效的德国找工作机会卡（Chancenkarte）。打分满 6 分即可获得 1 年合法赴德求职签，期间每周可合法打工 20 小时！",
      "summary": "德国机会卡（Chancenkarte §20a AufenthG）彻底颠覆了以往必须先有德国本地 Offer 才能入境的死循环。申请人只要具备认可的 2 年以上高等/职业教育学历，并在评分表中达到 6 分（语言、年龄、工作经验、德国关联、紧缺行业），即可直接拿到 1 年德国找工居留许可。\n在德期间允许每周打工 20 小时兼职（Minijob/Part-time），补贴生活开支；一旦在 1 年内找到满足蓝卡或技术工签标准的正式全职工作，原地直接换发蓝卡/工签，无需回国重新递签！",
      "fatalTraps": [
        "保证金证明要求：必须存入约 €12,324（约合 9.6 万人民币）的德国限制性账户（Sperrkonto）作为 1 年生活担保金。",
        "德语 A1 或英语 B2 底线：语言不达标者连机会卡入池资格都没有。",
        "1年找工时钟滴答：若 1 年内未能与德国雇主签订符合最低薪资标准的正式合同，机会卡原则上不可无故续签。"
      ],
      "idealFor": "国内 25~38 岁拥有 3 年以上经验的工程师、软件开发者、跨国企业员工，希望肉身赴欧面试大厂的行动派。",
      "discouragedFor": "无足够启动储备金、完全不会德语且英语无法流畅面试、缺乏自主海外投递能力的求职者。",
      "officialLawQuote": "AufenthG § 20a: \"Opportunity card for job search purposes based on a transparent points-based system for recognized professional qualifications.\""
    },
    "prerequisites": {
      "ageLimit": "无硬性年龄上限，35 岁以下享 2 分加分，35~40 岁享 1 分加分",
      "languageBenchmark": "德语达到 A2 级别 或 英语达到 B2 级别 (托福/雅思 5.5+)",
      "employerAccreditation": "申请时无需德国雇主 Job Offer，允许在德 1 年内每周打工 20 小时兼职找工",
      "healthAndCharacter": "提供德国封闭账户 (Sperrkonto) 资金证明 (约 €12,324/年) 及合规医疗保险"
    },
    "occupationGroups": [
      {
        "categoryName": "🎯 机会卡 6 分积分制构成",
        "categoryIcon": "Award",
        "occupations": [
          {
            "name": "海外受认可高校毕业生",
            "englishName": "Foreign University Degree Holder",
            "code": "Chancenkarte Criteria",
            "qualificationReq": "通过 ZAB / Anabin 认证的学士/硕士学位 (独得 4 分)",
            "wageReq": "获批 1 年自由求职居留，找到 €41,041+ 职位直接原地转蓝卡",
            "highlightTag": "6分即批1年自由居留"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据德国居留法 AufenthG § 20a / 20b (Chancenkarte 机会卡法案)",
      "requiredEvidenceList": [
        "ZAB 同等学力认证评估函 (Statement of Comparability)",
        "歌德学院德语 A2 证书 或 雅思 B2 考试成绩单",
        "德国受认可银行设立的封闭保证金账户 (Sperrkonto) 存款证明",
        "德国停留期间专属旅游/外侨医疗保险凭证 (Incoming-Versicherung)"
      ]
    }
  },
  {
    "id": "fr_talent_passport",
    "countryCode": "FR",
    "category": "work",
    "code": "Passeport Talent (CESEDA L421-9)",
    "name": "French Talent Passport (Talent - Salarié qualifié)",
    "chineseName": "法国优秀人才护照 (Passeport Talent 4年卡)",
    "summary": "拥有法国本硕学历或受雇于创新企业 (JEI)，年薪达到法定毛薪 2 倍 (€43,300+)，直接获批 4 年期居留，家属享全职工作许可。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "EUR €225",
      "cnyEstimate": "约 ¥1,760",
      "amount": 225,
      "currency": "EUR"
    },
    "effectivePeriod": "2016.11 - 至今 (2024新移民法整合版)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://france-visas.gouv.fr/en/web/france-visas/international-talents",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "年薪达到 2 倍 SMIC (约 €43,300/年)",
    "tags": [
      "4年免频繁续签",
      "配偶全职工作",
      "创新企业JEI",
      "5年转永居入籍"
    ],
    "isActive": true,
    "sortOrder": 20,
    "advisorVerdict": {
      "highlightQuote": "法国人才护照（Passeport Talent）四年一发，配偶享有全职自由工作权，满 5 年可申请法国永居或直接申请入籍！",
      "summary": "法国优秀人才护照（Passeport Talent - Salarié Qualifié / Recrue Tech）是法国为吸引全球高科技与高管人才推出的旗舰通道。\n只要持有法国硕士以上文凭（或海外同等学历），并与法国合规创新企业签订至少 3 个月以上劳动合同，年薪达到法定最低工资 1.5 倍（约 €38,000+ 起），即可直接获批最长 4 年有效期的居留卡。持卡人全家享有极高社会福利，配偶合法工作无需额外申请许可，工作满 5 年（甚至法国硕士毕业满 2 年）即可申请永居或入籍！",
      "fatalTraps": [
        "劳工局对口审核：若职位与文凭专业方向严重脱节，可能被劳工部（DREETS）裁定为不符合人才护照属性。",
        "法语生活壁垒：虽然巴黎科技圈英语普及度较高，但日常生活、政府行政部门打交道及未来申请 10 年永居必须提供至少 A2/B1 法语成绩。",
        "创新企业认定（Jeune Entreprise Innovante）：初创企业渠道要求雇主具备 JEI 官方认证资质。"
      ],
      "idealFor": "在法留学生、法企外派高管、AI 算法工程师、时尚设计与奢侈品管理高阶人才。",
      "discouragedFor": "完全排斥法语学习、非理工或非创新对口专业、无法拿到 €38,000+ 合同的初级文职人员。",
      "officialLawQuote": "Code de l’entrée et du séjour des étrangers et du droit d’asile (CESEDA) Article L421-9: \"Talent passport for qualified employees and innovative enterprise recruits with 4-year renewable status.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 FR 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "French Talent Passport (Talent - Salarié qualifié) 法定适用岗位",
            "englishName": "Eligible Roles for Passeport Talent (CESEDA L421-9)",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 FR 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "fr_rece",
    "countryCode": "FR",
    "category": "study",
    "code": "RECE (CESEDA L422-10)",
    "name": "French Job Search / Business Creation Visa (RECE)",
    "chineseName": "法国毕业求职与创业居留 (RECE 1年找工)",
    "summary": "获得法国认可硕士以上学位或 Grande École 文凭，毕业后享 12 个月居留寻找与专业对口的高薪工作或在法创立科技企业。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "EUR €75",
      "cnyEstimate": "约 ¥590",
      "amount": 75,
      "currency": "EUR"
    },
    "effectivePeriod": "2019.03 - 至今 (取代原APS体系)",
    "estimatedProcessingTime": "4 - 6 周",
    "officialSourceUrl": "https://www.service-public.fr/particuliers/vosdroits/F17319",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "找工期间可从事不超过60%年工时兼职，转工签薪资需达 1.5倍 SMIC",
    "tags": [
      "硕士毕业1年找工",
      "高商工程师红利",
      "转人才护照跳板"
    ],
    "isActive": true,
    "sortOrder": 21,
    "advisorVerdict": {
      "highlightQuote": "法国硕士毕业直接送 1 年找工作/创业签证 (RECE)，期间自由打工，找到对口工作原地直接转人才护照或受雇工签！",
      "summary": "RECE（Recherche d'emploi ou création d'entreprise）是法国政府为留住高学历国际毕业生设立的 12 个月找工创业居留卡。\n在法国完成硕士（Master）、商学院 Grande École 硕士或工程师文凭（Diplôme d'Ingénieur）的应届毕业生，在学生居留到期前递交申请，直接发放 1 年期合法居留。期间可全职工作（上限为法定工时 60%），只要找到一份月薪达 1.5 倍 SMIC（约 €2,600/月）的对口工作，即可在法国境内直接切换为人才护照！",
      "fatalTraps": [
        "不可延期：RECE 居留卡一生仅能办理一次，12 个月期满后若未找到对口工作，无法再次延期该卡。",
        "薪资红线：转工签时的合同月薪若低于 1.5 倍 SMIC，可能被降级审核劳动力市场测试并面临拒签风险。",
        "申请窗口期：必须在学生居留有效期内向省政府（Préfecture）预约递交，居留过期后将丧失申请资格。"
      ],
      "idealFor": "法国公立大学、高商 (HEC/ESSEC/EDHEC 等) 及顶级工程师学院硕士毕业生。",
      "discouragedFor": "就读非法国国家认证文凭（如某些野鸡私立校私颁证书）、或法语沟通存在严重障碍的学生。",
      "officialLawQuote": "CESEDA Article L422-10: \"Job seeker and entrepreneur temporary residence permit granted to higher education graduates holding a Master level degree.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 FR 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "French Job Search / Business Creation Visa (RECE) 法定适用岗位",
            "englishName": "Eligible Roles for RECE (CESEDA L422-10)",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 FR 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "se_work_permit",
    "countryCode": "SE",
    "category": "work",
    "code": "Swedish Work Permit",
    "name": "Swedish Work Permit (Utlänningslagen 6 kap)",
    "chineseName": "瑞典工作许可 (高薪中位数 €3,000+ 新政)",
    "summary": "由在瑞典合法注册雇主提供工会认证劳动合同，月薪达瑞典中位数 80% (SEK 34,200/月)，连续工作 4 年可申请瑞典永久居留。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "SEK 2,200",
      "cnyEstimate": "约 ¥1,520",
      "amount": 2200,
      "currency": "SEK"
    },
    "effectivePeriod": "2023.11 - 至今 (薪资中位数80%严规版)",
    "estimatedProcessingTime": "2 - 4 个月",
    "officialSourceUrl": "https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "月薪不低于 SEK 34,200/月 (瑞典薪资中位数 80%)",
    "tags": [
      "雇主工签",
      "4年转永居",
      "工会四险齐全",
      "高福利社会"
    ],
    "isActive": true,
    "sortOrder": 22,
    "advisorVerdict": {
      "highlightQuote": "北欧高福利典范，工作满 4 年即可申请瑞典永久居留 PR。但新政后月薪门槛上调至 SEK 28,480，雇主必须依法投保四险！",
      "summary": "瑞典工作许可（Arbetstillstånd）是进入北欧科技高薪社会的经典通道。瑞典目前大幅提升了工签准入门槛，要求月薪必须达到瑞典中位数薪资的 80%（目前为 SEK 28,480 / 约合人民币 19,500 元/月），且雇主必须为员工购买齐备的养老、医疗、人寿及工伤四大工会标准商业保险。\n在 7 年内累计持有工签工作满 48 个月（4 年），且在递交永居申请时拥有持续稳定的长期雇佣合同，即可一步到位获批瑞典永久居留权！",
      "fatalTraps": [
        "工会四险少买一个月直接驱逐（Kompetensutvisning）：瑞典移民局对雇主合规极其死板，哪怕雇主历史上少缴几百克朗养老金，都有可能导致续签永居被直接驳回遣返！",
        "劳动力市场公开公示（Platsbanken）：职位必须在瑞典和欧盟劳工局官网公开招聘至少 10 天，雇主未合规留痕的 Offer 无效。",
        "永居新增自足要求：申请永居时不仅审查工作年限，还要求能够长期证明维持家庭财务自足。"
      ],
      "idealFor": "爱立信、沃尔沃、Spotify 等北欧大厂工程师、IT 开发者、生物制药研究员及资深工业技术专才。",
      "discouragedFor": "从事餐饮零工、低薪基础劳务、或雇主无法提供正规工会标准四险的非正规中介挂靠人员。",
      "officialLawQuote": "Swedish Aliens Act (Utlänningslagen 2005:716) Chapter 6: \"Work permit conditions and requirements for permanent residence after four years of certified employment.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 SE 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Swedish Work Permit (Utlänningslagen 6 kap) 法定适用岗位",
            "englishName": "Eligible Roles for Swedish Work Permit",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 SE 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "se_job_seeker",
    "countryCode": "SE",
    "category": "work",
    "code": "Swedish Job Seeker Permit",
    "name": "Swedish Residence Permit for Job Seeking (Advanced Degree)",
    "chineseName": "瑞典高学历找工居留 (9个月找工/创业)",
    "summary": "持有经认证的硕士或博士学位，提供生活保障资金与全额商业医疗保险，可获发最长 9 个月居留在瑞典寻找高技能工作。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "SEK 2,200",
      "cnyEstimate": "约 ¥1,520",
      "amount": 2200,
      "currency": "SEK"
    },
    "effectivePeriod": "2022.06 - 至今 (高级学位人才专属)",
    "estimatedProcessingTime": "2 - 3 个月",
    "officialSourceUrl": "https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden/Look-for-work-or-start-a-business.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "找工期间需具备每月至少 SEK 13,000 的自备资金证明",
    "tags": [
      "硕博找工",
      "9个月合法逗留",
      "转高薪工签",
      "北欧创新中心"
    ],
    "isActive": true,
    "sortOrder": 23,
    "advisorVerdict": {
      "highlightQuote": "瑞典硕士/博士毕业直接发放 12 个月找工居留，只要期间找到合规工作，立即在瑞典境内无缝转工签！",
      "summary": "在瑞典完成至少 2 个学期（全日制）高等教育并取得学士、硕士或博士学位的国际留学生，可以在毕业前申请最长 12 个月的毕业求职居留许可（Uppehållstillstånd för att söka arbete）。\n持卡人可以在瑞典全境寻找全职工作或考察商业创业机会。期间无需雇主赞助即可合法居留，一旦获得符合工签门槛（SEK 28,480+）的正式 Job Offer，即可在瑞典境内无缝递交工签申请，工作满 4 年拿永居！",
      "fatalTraps": [
        "资金证明审核极严：必须证明在 12 个月内有足够的个人银行存款（每月约 SEK 9,450，全年约合 8 万人民币储备金）。",
        "全面健康保险要求：必须持有覆盖全年在瑞典的综合医疗健康保险（Comprehensive Healthcare Insurance）。",
        "不可再次续签：找工居留满 1 年后若未成功签订劳动合同，必须离境离开申根区。"
      ],
      "idealFor": "KTH 皇家理工、查尔姆斯理工、隆德大学、乌普萨拉大学等瑞典名校本硕博毕业生。",
      "discouragedFor": "银行存款不足、未购买合规商业医疗险、或专业缺乏北欧本地市场需求的应届生。",
      "officialLawQuote": "Swedish Migration Agency Chapter 5 Section 10: \"Residence permit for completed higher education studies to seek employment or explore business opportunities for up to 12 months.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 SE 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Swedish Residence Permit for Job Seeking (Advanced Degree) 法定适用岗位",
            "englishName": "Eligible Roles for Swedish Job Seeker Permit",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 SE 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "dk_positive_list",
    "countryCode": "DK",
    "category": "work",
    "code": "Positive List Scheme",
    "name": "Danish Positive List for Highly Educated / Skilled",
    "chineseName": "丹麦紧缺清单高技能工作计划 (Positive List)",
    "summary": "受聘于丹麦紧缺职业清单（IT、工程、医疗、生命科学等），薪资符合丹麦行业集体谈判协议标准，极速批复全家工作居留。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "DKK 6,290",
      "cnyEstimate": "约 ¥6,600",
      "amount": 6290,
      "currency": "DKK"
    },
    "effectivePeriod": "2023.04 - 至今 (半年更新动态清单)",
    "estimatedProcessingTime": "1 个月",
    "officialSourceUrl": "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Work/Positive-Lists",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "符合丹麦行业集体协议同工同酬标准",
    "tags": [
      "紧缺职业清单",
      "高技能免市场测试",
      "全家极速居留",
      "4-8年转永居"
    ],
    "isActive": true,
    "sortOrder": 24,
    "advisorVerdict": {
      "highlightQuote": "只要你的职业在丹麦 Positive List 清单上且拿到对口 Offer，直接批复 4 年工签，工作满 4~8 年即可申请丹麦永久居留！",
      "summary": "丹麦紧缺职业清单计划（Positive List for Higher Education & Skilled Work）是丹麦官方吸引特定高技能人才的快速通道。清单每半年动态更新一次，涵盖计算机软件工程师、土木机械工程师、医生护士、精算师、自然科学家等百余个专业。\n申请人只要持有对口高等教育文凭，并拿到丹麦雇主的正式聘用合同（薪资符合丹麦工会劳资协议标准），即可极速获批最长 4 年有效期的工作许可，一人获批配偶孩子同步随行！",
      "fatalTraps": [
        "清单半年度动态剔除：若你的职业在下半年从 Positive List 移出，后续续签必须切换至普通高薪通道。",
        "丹麦语永居考核硬核：丹麦永居（Permanent Residence）是全欧要求最高的国家之一，必须通过 Prøve i Dansk 2 或 3 语言考试且全职工作满 3.5~4 年。",
        "薪资发放账号限制：必须通过开立在丹麦本土银行的 NemKonto 银行账户发放合法净工资。"
      ],
      "idealFor": "IT 开发者、风能/新能源工程师、生物制药（诺和诺德周边生态）科学家及拥有对口工科学历的专才。",
      "discouragedFor": "非清单目录内专业、完全无法适应高难度丹麦语学习、期望短期快速躺平永居的人群。",
      "officialLawQuote": "Danish Aliens Act Section 9a(2)(1): \"Residence and work permit under the Positive List scheme for occupations experiencing a qualified labor shortage in Denmark.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 DK 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Danish Positive List for Highly Educated / Skilled 法定适用岗位",
            "englishName": "Eligible Roles for Positive List Scheme",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 DK 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "dk_pay_limit",
    "countryCode": "DK",
    "category": "work",
    "code": "Pay Limit Scheme",
    "name": "Danish Pay Limit Scheme (Supplementary DKK 393k+)",
    "chineseName": "丹麦高薪计划 (Pay Limit Scheme €5.2万欧)",
    "summary": "不限职业类别与学历专业，只要丹麦雇主提供的全职合同年薪达到 DKK 393,000+ (约合人民币 41 万)，直接极速批复工签。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "DKK 6,290",
      "cnyEstimate": "约 ¥6,600",
      "amount": 6290,
      "currency": "DKK"
    },
    "effectivePeriod": "2023.04 - 至今 (增设低门槛补充高薪通道)",
    "estimatedProcessingTime": "1 个月 (极速审理)",
    "officialSourceUrl": "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Work/Pay-limit-scheme",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "年薪至少 DKK 393,000/年 (补充通道) 或 DKK 487,000/年 (标准通道)",
    "tags": [
      "高薪直批",
      "不限专业背景",
      "1个月极速批复",
      "配偶自由打工"
    ],
    "isActive": true,
    "sortOrder": 25,
    "advisorVerdict": {
      "highlightQuote": "丹麦高薪霸王通道（年薪超 DKK 487,000 / 约合 51 万人民币）：不限专业、不限学历背景、免劳动力市场测试，直批 4 年工签！",
      "summary": "丹麦高薪计划（Pay Limit Scheme / Supplementary Pay Limit）是丹麦为全球高端白领设立的最简单粗暴的通道。它完全不设任何行业或专业限制——不管你是学文科、商科还是艺术，只要丹麦雇主愿意为你开出不低于法定门槛的年薪（目前高薪线为 DKK 487,000/年，约合人民币 51 万元起）：\n无需经过任何劳动力市场测试，丹麦移民局一般在 1 个月内极速核发 4 年工作许可，配偶享有全职合法打工权限！",
      "fatalTraps": [
        "薪资刚性不可含糊：不包括非固定奖金、股票期权或雇主代缴的补充养老金，基本底薪必须实打实达标。",
        "严查丹麦本土账户流水：工资必须按月打入丹麦本土 NemKonto 银行账户，任何现金或海外账户返款均构成违法。",
        "雇主合规要求：雇主在过去 3 个月内不得在丹麦劳工法庭有重大欠薪或劳工争议处罚记录。"
      ],
      "idealFor": "跨国大厂中高管、金融量化交易员、资深软件架构师、海归高薪专业人士。",
      "discouragedFor": "合同年薪未达 50 万人民币基准线、或雇主试图通过虚构加班费凑数的申请人。",
      "officialLawQuote": "Danish Aliens Act Section 9a(2)(2): \"Pay Limit Scheme for foreign nationals who have been offered a job with an annual pay exceeding the statutory threshold amount.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 DK 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Danish Pay Limit Scheme (Supplementary DKK 393k+) 法定适用岗位",
            "englishName": "Eligible Roles for Pay Limit Scheme",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 DK 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "dk_establishment",
    "countryCode": "DK",
    "category": "study",
    "code": "Establishment Card",
    "name": "Danish Establishment Card (Post-Graduation)",
    "chineseName": "丹麦毕业定居创业居留卡 (Establishment Card)",
    "summary": "在丹麦完成受认可的硕士或博士学位，毕业后直接申请最长 2-3 年的定居卡，享有完全自由的找工与创业权限。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "DKK 3,450",
      "cnyEstimate": "约 ¥3,600",
      "amount": 3450,
      "currency": "DKK"
    },
    "effectivePeriod": "2023.04 - 至今 (延长至3年开放居留)",
    "estimatedProcessingTime": "1 - 2 个月",
    "officialSourceUrl": "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Work/Establishment-card",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "找工期间无薪资门槛，自由受雇与创业",
    "tags": [
      "硕士毕业定居",
      "最长3年自由工签",
      "零雇主绑定"
    ],
    "isActive": true,
    "sortOrder": 26,
    "advisorVerdict": {
      "highlightQuote": "丹麦硕士/博士毕业直接拿到 2 年找工开拓卡（Establishment Card），无需雇主绑定，可自由找工或自主创业！",
      "summary": "在丹麦完成受认可的硕士（Master）或博士（PhD）学位的国际毕业生，毕业后可直接申请为期 2 年的 Establishment Card（创业与找工居留许可）。\n该卡赋予持有人极大的自由度：无需事先获得任何工作聘用，无需雇主担保；持有期间可以全职受雇于任何丹麦企业，也可以注册成立自己的丹麦公司（CVR）自主创业。2 年期内只要转入高薪或紧缺通道，即可无缝接轨永久居留轨道！",
      "fatalTraps": [
        "毕业时限 6 个月：必须在正式通过学位答辩拿到毕业证书之日起 6 个月内递交申请，逾期作废。",
        "自足生活资金要求：需证明个人银行账户有足够启动资金（单人约 DKK 90,000，约合 9.5 万人民币）。",
        "2年上限不可延长：2 年到期后必须成功切换为正式工作许可或自雇居留，无法继续以学生或找工名义停留。"
      ],
      "idealFor": "哥本哈根大学、丹麦科技大学 (DTU)、奥胡斯大学、哥本哈根商学院 (CBS) 的应届硕士与博士毕业生。",
      "discouragedFor": "毕业超过 6 个月未递交、或银行账户存款无法提供合规出资证明的留学生。",
      "officialLawQuote": "Executive Order on Foreigners Section 24: \"Establishment card scheme for foreign nationals who have completed a Danish Master’s or PhD degree.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 DK 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Danish Establishment Card (Post-Graduation) 法定适用岗位",
            "englishName": "Eligible Roles for Establishment Card",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 DK 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "fi_specialist",
    "countryCode": "FI",
    "category": "work",
    "code": "Specialist Permit",
    "name": "Finnish Residence Permit for Specialists (Fast-Track 14 Days)",
    "chineseName": "芬兰专家级高技术工作居留 (14天极速通道)",
    "summary": "持有高等学历的高技能专家、IT 工程师、管理人才，月薪达 €3,638+，享有芬兰 14 天极速审批（Fast Track）与全家定居。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "EUR €380",
      "cnyEstimate": "约 ¥2,980",
      "amount": 380,
      "currency": "EUR"
    },
    "effectivePeriod": "2022.06 - 至今 (14天全国极速快线)",
    "estimatedProcessingTime": "14 天 (Fast-Track)",
    "officialSourceUrl": "https://migri.fi/en/specialist",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "月薪不低于 EUR €3,638/月 (税前总薪资)",
    "tags": [
      "14天极速获批",
      "IT专家最爱",
      "配偶全职工作",
      "4年转芬兰永居"
    ],
    "isActive": true,
    "sortOrder": 27,
    "advisorVerdict": {
      "highlightQuote": "全球最幸福国家专才绿卡通：月薪仅需 €3,638+ 极速 2 周下签！连续居留满 4 年即可申请芬兰永久居留 (P 签)。",
      "summary": "芬兰专家居留许可（Specialist Residence Permit）是北欧审理时效最快的高技能签证之一。芬兰移民局（Migri）提供 14 天加急极速通道（Fast Track），申请人全家甚至可在 2 周内同步获批居留卡！\n核心要求：具备高等教育学历，持有芬兰雇主开具的专家级全职聘用合同，月薪税前不低于 €3,638（约合人民币 2.8 万元/月）。持有 A 类连续居留卡满 4 年（每年在芬兰居住满半年），且通过基础语言考试或满足生计条件，即可申请芬兰永久居留 PR！",
      "fatalTraps": [
        "A类居留连续性：必须确保居留卡为 A-permit（连续居留），若中途因雇主断缴或离开芬兰过久转为 B-permit，4年计时清零。",
        "高额税率心理预期：芬兰采用累进税制，€4,000+ 月薪实际个税与社保综合扣除率约 30%~38%。",
        "漫长冬季耐受度：芬兰高纬度地区冬季日照极短，需做好应对气候与社交孤独感的心理准备。"
      ],
      "idealFor": "诺基亚、通力电梯、游戏开发 (Supercell/Rovio 生态) 工程师、清洁能源与林业生化科研人才。",
      "discouragedFor": "无法忍受极寒极夜气候、期望低税率短期暴富、月薪无法达到 €3,638 合规线的求职者。",
      "officialLawQuote": "Finnish Aliens Act Section 77: \"Residence permit for specialists requiring higher education and earning above the average specialist wage benchmark.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 FI 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Finnish Residence Permit for Specialists (Fast-Track 14 Days) 法定适用岗位",
            "englishName": "Eligible Roles for Specialist Permit",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 FI 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "fi_post_study",
    "countryCode": "FI",
    "category": "study",
    "code": "Post-study Permit",
    "name": "Finnish Residence Permit for Graduates (2 Years)",
    "chineseName": "芬兰毕业生找工与创业居留 (2年开放签)",
    "summary": "在芬兰完成高等教育学位或科研项目，毕业后可申请长达 2 年的开放式找工与创业居留，可分段在 5 年内使用。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "EUR €380",
      "cnyEstimate": "约 ¥2,980",
      "amount": 380,
      "currency": "EUR"
    },
    "effectivePeriod": "2022.04 - 至今 (学签直接发A签且找工签扩至2年)",
    "estimatedProcessingTime": "1 - 2 个月",
    "officialSourceUrl": "https://migri.fi/en/residence-permit-to-look-for-work",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "需具备至少 €6,720/年的基础生活保障资金证明",
    "tags": [
      "2年找工居留",
      "学签直发A类连续签",
      "极速冲刺4年永居"
    ],
    "isActive": true,
    "sortOrder": 28,
    "advisorVerdict": {
      "highlightQuote": "芬兰硕士/博士毕业直接送长达 2 年的超长找工居留许可，可分段拆开使用，欧洲极其慷慨的留学生缓冲政策！",
      "summary": "在芬兰完成大学或应用科技大学（AMK）本硕博学位的毕业生，毕业后可申请长达 2 年（最长可拆分为多段）的毕业求职创业居留卡（Extended Permit to Look for Work or Start a Business）。\n在持卡 2 年期间，毕业生拥有完全不受限制的合法工作权限，可自由从事全职、兼职或自主创业。一旦在 2 年内找到月薪 €3,638+ 的专家岗位或普通技术岗位，原地切换为 A 类连续工签，直接计入 4 年永居移民监！",
      "fatalTraps": [
        "申请截止时间：必须在毕业后最长 5 年内递交申请（如果在毕业后离开芬兰，5年内仍有资格申请回芬找工）。",
        "生活费证明（Income Requirement）：需证明每月至少拥有 €1,000~€1,210 的银行存款流水。",
        "A类与B类居留折算：就读本科/硕士期间的学生签证（B签）在折算永居时间时减半计算（2年B签折算1年），只有转为 A 签后才全额计时。"
      ],
      "idealFor": "阿尔托大学、赫尔辛基大学、奥卢大学等芬兰高校毕业生，希望深入北欧产业生态并扎根定居的学子。",
      "discouragedFor": "无足够储备金支撑 2 年生活、或毕业后完全没有主动寻找芬兰本地实习/全职工作的消极求学者。",
      "officialLawQuote": "Finnish Aliens Act Section 54: \"Extended residence permit after completed studies in Finland for up to two years to seek employment or engage in business.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 FI 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Finnish Residence Permit for Graduates (2 Years) 法定适用岗位",
            "englishName": "Eligible Roles for Post-study Permit",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 FI 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "uk_skilled_worker",
    "countryCode": "GB",
    "category": "work",
    "code": "Skilled Worker",
    "name": "UK Skilled Worker Visa (2024 £38.7k Threshold)",
    "chineseName": "英国技术工人工作签证 (2024新政 £38,700 门槛)",
    "summary": "受合规英国内政部持牌雇主担保，年薪达 £38,700 门槛（或紧缺列表折扣），5 年合规连续纳税可申请英国永居 ILR。",
    "thresholdScore": 70,
    "maxScorePossible": 70,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "GBP £719 ~ £1,420",
      "cnyEstimate": "约 ¥6,600 ~ ¥13,000",
      "amount": 719,
      "currency": "GBP"
    },
    "effectivePeriod": "2024.04 - 至今 (£38,700高门槛大修版)",
    "estimatedProcessingTime": "3 - 8 周",
    "officialSourceUrl": "https://www.gov.uk/skilled-worker-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "通用年薪底线 £38,700/年 (或各行业 Going Rate 孰高)",
    "tags": [
      "雇主担保CoS",
      "5年转ILR永居",
      "年薪£38.7k门槛",
      "工签核心通道"
    ],
    "isActive": true,
    "sortOrder": 29,
    "advisorVerdict": {
      "highlightQuote": "2024年4月起薪资门槛从 £26,200 暴涨至 £38,700（约合 36 万人民币）。雇主一听要赞助工签基本直接默拒，文商科应届生慎入！",
      "summary": "英国技术工人签证（Skilled Worker Visa）是工作移民英国的主流路径。该签证采用 70 分积分制（工作聘用 20分 + 适当技能等级 20分 + 英语 B1 10分 + 薪资达标 20分）。\n自 2024 年内政部实施大紧缩政策后，最低薪资门槛从原本的 £26,200 剧烈上调至 £38,700/年（或该职业 SOC Code 对应的 Going Rate 中位数中较高者！）。雇主必须持有内政部颁发的合规赞助牌照（Sponsor Licence）并签发 CoS 担保函。工作满 5 年可申请英国永居（ILR, Indefinite Leave to Remain）。",
      "fatalTraps": [
        "£38,700 薪资高墙：中小型企业或文科初级岗位根本无法开出此等薪水，导致赞助意愿降至冰点。",
        "IHS 医疗附加费暴涨：每年每人必须缴纳 £1,035 的 IHS 费用，加上昂贵的签证费，5 年单人官方规费超 8 万人民币！",
        "离职 60 天倒计时（Curtailment）：一旦被雇主裁员或赞助牌照被吊销，内政部将下发 Curtailment Letter，必须在 60 天内找到新 Sponsor 或离境。"
      ],
      "idealFor": "伦敦金融城投行量化、顶尖律所、剑桥/牛津周边生物医药研发、以及 NHS 医生护士（医疗类享专属低薪门槛豁免）。",
      "discouragedFor": "普通泛商科或文科应届生、无法获得 £38,700+ 高薪 Offer、无雇主愿意承担赞助成本的求职者。",
      "officialLawQuote": "Immigration Rules Appendix Skilled Worker: \"Applicant must meet 70 points threshold with minimum general salary requirement of £38,700 or the going rate for the SOC code.\""
    },
    "prerequisites": {
      "ageLimit": "年满 18 周岁，无严格法定年龄上限",
      "languageBenchmark": "英语达到 CEFR B1 水平 (相当于雅思 UKVI 4.0 或拥有全英文授课本硕 ECCTIS 认证)",
      "employerAccreditation": "必须持有持有合规 Sponsor Licence 的英国雇主颁发的有效担保证书 (CoS, Certificate of Sponsorship)",
      "healthAndCharacter": "缴纳每年 £1,035 的 NHS 移民健康附加费 (IHS)，并通过肺结核 (TB) 筛查与无犯罪背景调查"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 科技研发与工程专业",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "IT 软件工程师与系统架构师",
            "englishName": "Programmers and Software Development Professionals",
            "code": "SOC 2020 2134",
            "qualificationReq": "英国或海外认可学士学位 (ECCTIS 认证) + 雇主 CoS 担保",
            "wageReq": "法定一般薪资门槛 £38,700/年 或 职位 Going Rate (取两者较高者)",
            "highlightTag": "5年转英国永居 ILR"
          },
          {
            "name": "网络安全与信息技术专家",
            "englishName": "Cyber Security Professionals",
            "code": "SOC 2020 2135",
            "qualificationReq": "本科以上学历 + CoS 担保证书",
            "wageReq": "年薪 £38,700/年",
            "highlightTag": "5年转英国永居 ILR"
          }
        ]
      },
      {
        "categoryName": "🩺 医疗健康与社会护理 (Health and Care Visa)",
        "categoryIcon": "Stethoscope",
        "occupations": [
          {
            "name": "注册护士与助产士",
            "englishName": "Nurses",
            "code": "SOC 2020 2231",
            "qualificationReq": "英国护理和助产士理事会 (NMC) 注册 + NHS 或合规机构担保",
            "wageReq": "享薪资优惠与全额免除 NHS IHS 附加费 (每年省 £1,035/人)",
            "highlightTag": "免IHS附加费 / 5年永居"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据英国移民规则 Home Office Immigration Rules Appendix Skilled Worker",
      "requiredEvidenceList": [
        "英国合规雇主颁发的官方担保证书编号 (CoS / Certificate of Sponsorship Reference)",
        "SELT 官方英语考试成绩单 (IELTS for UKVI B1) 或 ECCTIS 英文授课学位认证信",
        "指定诊所出具的肺结核检测阴性报告 (TB Test Certificate)",
        "特定涉密敏感学科的 ATAS 学术技术批准证书 (如适用)"
      ]
    }
  },
  {
    "id": "uk_graduate_visa",
    "countryCode": "GB",
    "category": "study",
    "code": "Graduate Visa (PSW)",
    "name": "UK Graduate Visa (2-3 Year Post-Study Work)",
    "chineseName": "英国毕业生工作签证 (Graduate Visa / PSW)",
    "summary": "在英完成受认可高等学位，本科/硕士直接获发 2 年全职开放工签，博士享有 3 年工签，无需雇主担保，自由工作与创业。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "GBP £822 + IHS",
      "cnyEstimate": "约 ¥7,600 + ¥19,000/年",
      "amount": 822,
      "currency": "GBP"
    },
    "effectivePeriod": "2021.07 - 至今 (MAC审查保留现行政策)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://www.gov.uk/graduate-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "开放工签无薪资门槛，自由受雇，不可直接计入5年ILR",
    "tags": [
      "本硕2年开放工签",
      "博士3年工签",
      "免雇主担保",
      "过渡转工签利器"
    ],
    "isActive": true,
    "sortOrder": 30,
    "advisorVerdict": {
      "highlightQuote": "英国本科/硕士直接发 2 年（博士 3 年）无限制开放工签，不可续签！别拿来摆烂旅游，必须争分夺秒在 2 年内敲定工签 Sponsor。",
      "summary": "毕业生签证（Graduate Route Visa）为在英国合规高等院校顺利毕业的留学生提供 2 年（本科/硕士）或 3 年（博士）的无限制全职工作权限。\n无需雇主赞助，无需 Job Offer，没有任何最低薪资限制。持签人可以在英国从事任何工作（包括全职、兼职、自由职业自雇），是广大留学生利用本地全职实习积累工作经验、说服雇主在 2 年到期后为你办理 Skilled Worker 赞助的核心战略跳板！",
      "fatalTraps": [
        "一生仅能申请一次（Non-renewable）：不可在英国延期，哪怕再次攻读另一个同级别学位也无法二次获发。",
        "无法直接计入 5 年永居（Not a settlement route）：Graduate Route 的 2 年不计入 Skilled Worker 的 5 年转永居时间，只能计入 10 年长居 (10-Year Long Residence)。",
        "高昂签证与 IHS 成本：2 年签证费 (£822) + 2年 IHS (£2,070) 合计近 3 万元人民币，下签即开始扣除时间。"
      ],
      "idealFor": "英国 G5、红砖大学本硕博毕业生，计划在伦敦等一线市场积累 1~2 年国际大厂实战背景的青年学子。",
      "discouragedFor": "无明确职业规划、只打算在英国打零工代购度日、无法在 2 年后拿到 £38,700 赞助的盲目留学者。",
      "officialLawQuote": "Immigration Rules Appendix Graduate: \"A 2-year unsponsored work route for international students who have successfully completed an eligible course at a higher education provider.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 GB 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "UK Graduate Visa (2-3 Year Post-Study Work) 法定适用岗位",
            "englishName": "Eligible Roles for Graduate Visa (PSW)",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 GB 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "uk_hpi",
    "countryCode": "GB",
    "category": "work",
    "code": "HPI Visa",
    "name": "High Potential Individual (HPI) Visa",
    "chineseName": "英国高潜力人才签证 (全球Top 50名校直发)",
    "summary": "近 5 年内毕业于全球 Top 50 顶尖大学（含清华、北大等），无需英国内部雇主 Job Offer，直接发放 2-3 年全职工作签证。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "GBP £822 + Ecctis",
      "cnyEstimate": "约 ¥7,600 + ¥2,500",
      "amount": 822,
      "currency": "GBP"
    },
    "effectivePeriod": "2022.05 - 至今 (每年全球名校列表更新)",
    "estimatedProcessingTime": "3 - 8 周",
    "officialSourceUrl": "https://www.gov.uk/high-potential-individual-visa",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "自由工作无薪资门槛限制",
    "tags": [
      "全球Top 50名校",
      "免Job Offer直接赴英",
      "本硕2年/博士3年"
    ],
    "isActive": true,
    "sortOrder": 31,
    "advisorVerdict": {
      "highlightQuote": "面向全球非英国 Top 50 名校毕业生的抢人签证（清北复交浙中科大等入列）。没在英国留过学也能直接白嫖 2 年全职赴英工签！",
      "summary": "高潜力人才签证（High Potential Individual, HPI）是英国为了在全球争抢顶级学术头脑设立的极速抢人签证。\n只要你在过去 5 年内毕业于英国官方认可的全球顶尖名校名单（Global Universities List，涵盖哈佛、MIT、斯坦福、剑桥、清华、北大、浙大、复旦、上海交大、新加坡国立、南洋理工等非英国本土 Top 50 院校），不论你身在何处、无需 Job Offer、无需英国留学经历，即可直接获批 2 年（硕士）或 3 年（博士）的英国全职开放工作签证！",
      "fatalTraps": [
        "Ecctis 学历认证红线：递签前必须通过英国官方 Ecctis 进行名校学位真伪与英国对等性认证。",
        "毕业年份卡死：必须是在过去 5 个日历年之内毕业，超期一天都会被系统直接驳回。",
        "不计入 5 年永居：与 Graduate 签证相同，不能直接计入 5 年技术移民永居通道，需在英国境内转换为 Skilled Worker。"
      ],
      "idealFor": "毕业于清北复交浙、NUS/NTU、美加 Top 30 名校的青年才俊，希望免留学成本直接肉身进驻伦敦国际就业市场。",
      "discouragedFor": "非官方 Top 50 名单院校毕业生、毕业已超过 5 年的资深职场人。",
      "officialLawQuote": "Immigration Rules Appendix High Potential Individual: \"Points-based route for individuals who have graduated from an eligible overseas university listed on the Global Universities List.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 GB 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "High Potential Individual (HPI) Visa 法定适用岗位",
            "englishName": "Eligible Roles for HPI Visa",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 GB 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "uk_global_talent",
    "countryCode": "GB",
    "category": "pr",
    "code": "Global Talent",
    "name": "UK Global Talent Visa (Tech Nation / Royal Society)",
    "chineseName": "英国全球人才签证 (Tech Nation / 皇家学会背书)",
    "summary": "数字科技、科学研究、艺术文化领域领军或潜力人才，获得指定官方机构背书，免除雇主绑定，3 年极速拿到英国永居 ILR。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "GBP £716 + 背书费",
      "cnyEstimate": "约 ¥6,600 + ¥4,800",
      "amount": 716,
      "currency": "GBP"
    },
    "effectivePeriod": "2020.02 - 至今 (顶尖人才极速永居通道)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://www.gov.uk/global-talent",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "无强制薪资要求，凭行业重大贡献与背书信",
    "tags": [
      "3年极速转永居",
      "免雇主免最低薪资",
      "科技独角兽领军",
      "顶尖科研学者"
    ],
    "isActive": true,
    "sortOrder": 32,
    "advisorVerdict": {
      "highlightQuote": "英国顶级人才天花板：免雇主赞助、免最低薪资门槛、自由自雇换工作，顶尖人才最快 3 年一步到位拿英国永居 (ILR)！",
      "summary": "全球人才签证（Global Talent Visa）是目前英国最自由、地位最尊贵的移民通道。申请人必须通过英国官方指定六大背书机构（Endorsing Bodies，如 Royal Society 皇家学会、Royal Academy of Engineering 皇家工程院、British Academy、Tech Nation 数字科技）的权威学术或行业背书。\n分为【杰出领袖 (Exceptional Talent)】与【潜力新星 (Exceptional Promise)】两档。持卡人享有绝对自由：无需雇主赞助，可自由全职就职、创办公司、从事咨询，杰出领袖类工作满 3 年（潜力新星满 5 年）即可直接申请英国永久居留 ILR！",
      "fatalTraps": [
        "背书材料要求极高：必须出具行业顶级权威专家的独立推荐信（Reference Letters）、重大商业或开源项目代码、知名学术专利引用与媒体深度专访。",
        "背书机构名额严苛：虽然无总配额上限，但 Tech Nation 等机构对材料真实性与开创性贡献的拒签率长期维持在 50%+。"
      ],
      "idealFor": "硬核开源项目核心贡献者、独角兽创始成员、高引用科研学者、国际知名设计师或数字科技领域顶尖技术专家。",
      "discouragedFor": "普通 IT 程序员、无任何行业开创性产出或领导力证明的常规业务白领。",
      "officialLawQuote": "Immigration Rules Appendix Global Talent: \"Unsponsored route for individuals with exceptional talent or promise in the fields of science, engineering, humanities, medicine, digital technology or arts.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 GB 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "UK Global Talent Visa (Tech Nation / Royal Society) 法定适用岗位",
            "englishName": "Eligible Roles for Global Talent",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 GB 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "ie_csep",
    "countryCode": "IE",
    "category": "work",
    "code": "Critical Skills Employment Permit",
    "name": "Irish Critical Skills Employment Permit (CSEP)",
    "chineseName": "爱尔兰关键技能工作许可 (CSEP 2年直转Stamp 4永居)",
    "summary": "紧缺职业年薪 €38,000+ 或非紧缺高薪 €64,000+，全职工作满 2 年直接换发 Stamp 4 自由永居卡，配偶享有完全自由合法工作权。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "EUR €1,000",
      "cnyEstimate": "约 ¥7,800",
      "amount": 1000,
      "currency": "EUR"
    },
    "effectivePeriod": "2024.01 - 至今 (关键技能最新薪资大纲)",
    "estimatedProcessingTime": "6 - 10 周",
    "officialSourceUrl": "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "紧缺职业清单职位 €38,000/年 (2025起€44,000)，其他职位 €64,000/年",
    "tags": [
      "2年换Stamp 4永居",
      "欧盟唯一纯英语国",
      "硅谷欧洲总部聚集",
      "配偶合法工作"
    ],
    "isActive": true,
    "sortOrder": 33,
    "advisorVerdict": {
      "highlightQuote": "欧洲硅谷高性价比之王：年薪 €38,000+，全职工作满 2 年直接免工签转 Stamp 4 永居大卡，满 5 年可免语言免试入籍爱尔兰（享英欧双重跳板）！",
      "summary": "爱尔兰关键技能工作许可（Critical Skills Employment Permit, CSEP）是整个欧洲大陆最具竞争力的永居跳板之一。都柏林汇聚了 Google、Meta、Apple、Pfizer 等上千家跨国巨头的欧洲总部。\n申请人只要获得爱尔兰合规企业开出的 2 年劳动合同，且岗位在关键技能清单上（年薪 €38,000+），或非清单普通职业年薪达 €64,000+，无需做劳动力市场测试即可获批。持有 CSEP 并在爱尔兰合规工作纳税满 21~24 个月，即可免除任何雇主工签直接换发 Stamp 4 永久居留签证！累积居住满 5 年可直接申请爱尔兰护照，畅行欧盟 27 国 + 英国自由定居（CTA 共同旅游区协议）！",
      "fatalTraps": [
        "年薪中位数调价：2024 年起 CSEP 薪资门槛已由 €32,000 上调至 €38,000，2025 年将进一步上调至 €40,000+。",
        "都柏林住房危机（Housing Crisis）：爱尔兰目前租房极其紧俏，房租高昂，落地前必须提前解决租房与 PPSN 税号办理。",
        "50:50 员工国籍比例规则：雇佣你的爱尔兰企业内部，欧洲经济区（EEA）员工比例必须占 50% 以上，否则雇主无法申请 CSEP 许可。"
      ],
      "idealFor": "软件架构师、云计算与大数据工程师、生物制药工艺师、医疗器械专家及希望以英语大国跳板通吃英欧双绿卡的家庭。",
      "discouragedFor": "无法拿到爱尔兰当地合法 Offer、或无法适应都柏林高昂租房生活成本的求职者。",
      "officialLawQuote": "Employment Permits Act 2024: \"Critical Skills Employment Permit allows holders to apply for Stamp 4 permanent residence permissions after 2 years of certified employment.\""
    },
    "prerequisites": {
      "ageLimit": "无硬性年龄上限限制",
      "languageBenchmark": "无硬性托福雅思强制要求，由爱尔兰雇主在招聘面试中核验商务沟通能力",
      "employerAccreditation": "爱尔兰企业必须保持 50:50 员工国籍配比 (至少 50% 员工为爱尔兰/欧盟公民)",
      "healthAndCharacter": "购买合规私人医疗保险并提供无犯罪记录公证书"
    },
    "occupationGroups": [
      {
        "categoryName": "🎯 关键技能职业清单 (Critical Skills List)",
        "categoryIcon": "Award",
        "occupations": [
          {
            "name": "软件开发专家与系统架构师",
            "englishName": "Software Engineers and System Architects",
            "code": "SOC 2136",
            "qualificationReq": "受认可本科或硕士学位 + 2 年对口全职劳动合同",
            "wageReq": "清单内紧缺职位最低年薪 €38,000/年 起 (非紧缺大类需 €64,000/年)",
            "highlightTag": "21个月直接转Stamp 4永居"
          },
          {
            "name": "ICT 项目经理与数据工程专家",
            "englishName": "Data Engineers & ICT Project Managers",
            "code": "SOC 2135",
            "qualificationReq": "计算机对口学士/硕士学位",
            "wageReq": "最低年薪 €38,000/年",
            "highlightTag": "21个月直接转Stamp 4永居"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据爱尔兰企业、贸易与就业部 DETE Employment Permits Act (Critical Skills Employment Permit)",
      "requiredEvidenceList": [
        "DETE 官方核发的 CSEP 关键技能工作许可证批准信 (Employment Permit Grant)",
        "爱尔兰雇主全职聘用合同 (年薪明确标注不低于 €38,000 或 €64,000)",
        "爱尔兰移民局 (ISD) 居留登记卡 (IRP / Stamp 1) 与私人医疗保单"
      ]
    }
  },
  {
    "id": "ie_stamp1g",
    "countryCode": "IE",
    "category": "study",
    "code": "Stamp 1G (Third Level Graduate Scheme)",
    "name": "Irish Third Level Graduate Scheme (Stamp 1G)",
    "chineseName": "爱尔兰毕业生求职工作签证 (Stamp 1G 硕士2年)",
    "summary": "爱尔兰大学本科毕业获 1 年、硕士/博士毕业直接获 2 年 Stamp 1G 全职工作许可，无需雇主担保，在此期间对接企业转 CSEP 工签。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "EUR €300",
      "cnyEstimate": "约 ¥2,350",
      "amount": 300,
      "currency": "EUR"
    },
    "effectivePeriod": "2017.05 - 至今 (硕士2年全职开放许可)",
    "estimatedProcessingTime": "4 - 6 周",
    "officialSourceUrl": "https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/third-level-graduate-programme/",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "每周可合法全职工作 40 小时，无薪资门槛要求",
    "tags": [
      "硕士2年全职开放工签",
      "硅谷大厂欧洲总部跳板",
      "转CSEP关键桥梁"
    ],
    "isActive": true,
    "sortOrder": 34,
    "advisorVerdict": {
      "highlightQuote": "爱尔兰硕士毕业直接发 2 年（本科 1 年）全职工作签证，是进入都柏林跨国科技与医药大厂的必经通道！",
      "summary": "第三级毕业生计划（Third Level Graduate Scheme / Stamp 1G）为在爱尔兰获得受认可的高等学位的国际留学生提供全职开放工签。本科毕业生发放 1 年，硕士及博士毕业生直接发放最长 2 年（按 1+1 模式发放）。\n在持有 Stamp 1G 的 2 年期间，毕业生每周可合法全职工作 40 小时，无需任何雇主提前赞助。只要在这 2 年内找到一家愿意提供年薪 €38,000+ 对口合同的雇主，原地申请换发 CSEP 工签，再工作 2 年即可稳拿 Stamp 4 绿卡！",
      "fatalTraps": [
        "2年上限不可再续：Stamp 1G 期满 24 个月后无法延期，若未成功切换为 CSEP 或普通工签，必须离境。",
        "学生与1G时间不计入入籍：在爱尔兰就读（Stamp 2）和持有 Stamp 1G 找工期间不计入 5 年入籍的可计算居住期（Reckonable Residence），转为 Stamp 4 后才开始正式计算！"
      ],
      "idealFor": "都柏林圣三一学院 (TCD)、都柏林大学 (UCD)、高威大学等高校计算机、药学、金融科技硕士毕业生。",
      "discouragedFor": "指望毕业后在爱尔兰长期打零工混日子、不积极投递正规大厂技术岗位的毕业生。",
      "officialLawQuote": "Irish Department of Justice Immigration Service Delivery: \"Third Level Graduate Programme (Stamp 1G) enables non-EEA graduates to work full-time for up to 24 months.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 IE 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Irish Third Level Graduate Scheme (Stamp 1G) 法定适用岗位",
            "englishName": "Eligible Roles for Stamp 1G (Third Level Graduate Scheme)",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 IE 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "jp_hsp",
    "countryCode": "JP",
    "category": "pr",
    "code": "高度専門職 (HSP i/ii)",
    "name": "Japan Highly Skilled Professional (HSP Points Visa)",
    "chineseName": "日本高度人才专门职积分签证 (70/80分 1~3年永住)",
    "summary": "在学历、年收入、工作年限、日语能力等打分达 70 分 3 年转永住，达到 80 分仅需 1 年极速直拿日本永久居留权。",
    "thresholdScore": 70,
    "maxScorePossible": 140,
    "invitationMechanism": "points_ranked",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "JPY ¥4,000",
      "cnyEstimate": "约 ¥190",
      "amount": 4000,
      "currency": "JPY"
    },
    "effectivePeriod": "2012.05 - 至今 (2023特别高度人才J-Skip强化版)",
    "estimatedProcessingTime": "1 - 2 个月",
    "officialSourceUrl": "https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00016.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "技术/业务类必须满足保底年收 ¥300万日元 (依年龄阶梯加分)",
    "tags": [
      "80分1年拿永住",
      "70分3年永住",
      "带父母与保姆",
      "5年居留卡"
    ],
    "isActive": true,
    "sortOrder": 35,
    "advisorVerdict": {
      "highlightQuote": "打分满 80 分工作仅需 1 年（满 70 分需 3 年）即可申请日本永久住者（永住 PR）！全宇宙最快绿卡通道，但别低估日企高压与读空气文化。",
      "summary": "日本高度人才积分制（高度专门职，Highly Skilled Professional）是日本吸引高学历高收入外国精英的核心利器。积分表涵盖学历（硕博加分）、工作年限、年收入（核心权重）、年龄以及日语能力（N1 加 15 分，N2 加 10 分，名校毕业加 10 分）。\n积分达到 70 分者，工作 3 年即可申请永住；积分达到 80 分者，在日工作仅需 1 年即可直接递交永住申请！此外高度专门职享有专属特权：允许携带父母赴日帮助抚育 7 岁以下幼儿（年收入需达 800 万日元），允许聘请外籍家政保姆！",
      "fatalTraps": [
        "年收入与契约刚性：积分表中的年收入必须是单一签约日企的确定性报酬，且申请时与实际报税收入必须完全吻合。",
        "永住严查社保年金连缴记录：自 2024 年起日本入管局与国税厅联网，只要历史上有一笔国民健康保险或年金存在迟缴（哪怕晚交一天），永住直接一票否决！",
        "汇率与生活购买力：日元近年大幅贬值，按日元领薪在当地生活舒适，但折算美金/人民币储蓄资产需有心理预期。"
      ],
      "idealFor": "东京大学/京都大学等名校海归、国内双一流硕士+日语 N1、跨国企业在日架构师及年薪 800 万日元以上的高薪骨干。",
      "discouragedFor": "完全不会日语且无法在日企长期稳定工作、或个人税收与社保有逾期迟缴历史的申请人。",
      "officialLawQuote": "Immigration Control and Refugee Recognition Act Ordinance: \"Points-based preferential immigration treatment for highly skilled foreign professionals allowing permanent residency after 1 to 3 years.\""
    },
    "prerequisites": {
      "ageLimit": "无硬性年龄上限，30 岁以下享 15 分加分，30~34 岁享 10 分加分",
      "languageBenchmark": "日语 N1 证书享 15 分加分，N2 证书享 10 分加分",
      "employerAccreditation": "必须持有日本合规企业/科研机构聘用合同，且年收入达到法定基准",
      "healthAndCharacter": "无日本入管法规定的退去强制事由，品行端正"
    },
    "occupationGroups": [
      {
        "categoryName": "🇯🇵 高度专门职 1号 (80分1年永住特权)",
        "categoryIcon": "Award",
        "occupations": [
          {
            "name": "高度专门·技术活动 (IT研发/工程)",
            "englishName": "Advanced Specialized / Technical Activities (HSP 1b)",
            "code": "入管法別表第一の二 (高度専門職1号ロ)",
            "qualificationReq": "硕士 20分 + 日语 N1 15分 + 顶尖大学 10分 + 年轻加分直接凑满 80 分",
            "wageReq": "年收入需达 400 万~1000 万日元 (享受积分加成)",
            "highlightTag": "满80分仅需1年申请永住"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据日本出入国在留管理厅《出入国管理及び難民認定法》高度人材ポイント制",
      "requiredEvidenceList": [
        "高度人材ポイント計算表 (积分测算自评表及各加分项完整证明文件)",
        "国内外大学本硕博毕业证书及成绩证明书",
        "日本语能力试验 (JLPT) N1/N2 合格结果通知书",
        "日本企业雇佣契约书 (包含预定年收明细表) 及企业法定决算报告"
      ]
    }
  },
  {
    "id": "jp_work",
    "countryCode": "JP",
    "category": "work",
    "code": "技術・人文知識・国際業務",
    "name": "Japan Engineer / Specialist in Humanities / International Services",
    "chineseName": "日本技人国常规工作签证 (技术·人文知识·国际业务)",
    "summary": "白领核心就劳签证：大专本科以上学历或 10 年从业经验，受聘于日本企业从事软件研发、商务翻译、财务营销等，连续工作 5 年归化入籍或 10 年永住。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "JPY ¥4,000",
      "cnyEstimate": "约 ¥190",
      "amount": 4000,
      "currency": "JPY"
    },
    "effectivePeriod": "1990.06 - 至今 (日本主流就劳资格)",
    "estimatedProcessingTime": "1 - 3 个月",
    "officialSourceUrl": "https://www.moj.go.jp/isa/applications/status/gijinkoku.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "薪资待遇不得低于同等岗位日本本土员工报酬 (同工同酬)",
    "tags": [
      "白领主流工签",
      "IT研发赴日",
      "5年入籍10年永住",
      "可携家属"
    ],
    "isActive": true,
    "sortOrder": 36,
    "advisorVerdict": {
      "highlightQuote": "最常见的日本白领工作签证（技·人·国），大专以上学历即可申请，在日工作生活满 5 年可申请归化入籍，满 10 年转永住！",
      "summary": "技术·人文知识·国际业务签证（简称“技人国”）是海外人才赴日工作的基石工签。涵盖软件开发、机械工程、跨境贸易、市场营销、翻译教学等几乎所有白领办公岗位。\n申请人需持有全日制大专或本科学历（专业对口），并拿到日本合规企业的正式雇佣契约（薪资不得低于同等资历日本国民标准，通常月薪 22 万~35 万日元起）。连续在日合法纳税生活满 5 年（且工作满 3 年）可直接申请日本国籍归化；连续满 10 年（且工作满 5 年）可申请永住！",
      "fatalTraps": [
        "专业与岗位对口度审查：大专文凭对口要求极严，文科大专从事 IT 编程极易被判定为专业不对口而拒签。",
        "派遣与皮包公司陷阱：警惕以“包下签”为诱饵的华人空壳劳务派遣公司，一旦公司经营异常续签将全面被卡。",
        "年金脱退清算损失：若中途回国申请年金脱退，之前累积的居住与社保年限全部归零。"
      ],
      "idealFor": "理工科与日语专业毕业生、具备 3 年以上 IT 研发实操经验、热爱日本社会秩序与生活环境的求职者。",
      "discouragedFor": "无大专以上学历、日语完全无法进行基本日常沟通、期望短期 1~2 年迅速拿绿卡的人群。",
      "officialLawQuote": "Immigration Control Act Appended Table I(2): \"Engineer/Specialist in Humanities/International Services status for foreign nationals engaged in services requiring specialized knowledge or skills.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 JP 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Japan Engineer / Specialist in Humanities / International Services 法定适用岗位",
            "englishName": "Eligible Roles for 技術・人文知識・国際業務",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 JP 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "jp_ssw",
    "countryCode": "JP",
    "category": "work",
    "code": "特定技能 1号/2号 (SSW)",
    "name": "Japan Specified Skilled Worker (SSW (i) / (ii))",
    "chineseName": "日本特定技能 1号/2号 蓝领紧缺技能签证",
    "summary": "面向介护、餐饮、制造、建筑等 12 大紧缺行业，通过技能与日语 N4 考试赴日工作。特定技能 2 号无停留上限，可携家属并申请日本永住。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "JPY ¥4,000",
      "cnyEstimate": "约 ¥190",
      "amount": 4000,
      "currency": "JPY"
    },
    "effectivePeriod": "2019.04 - 至今 (2024特定技能2号全面扩容)",
    "estimatedProcessingTime": "1 - 3 个月",
    "officialSourceUrl": "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "享受法定最低薪资与同工同酬保障，强制缴纳厚生年金与健康保险",
    "tags": [
      "蓝领紧缺技能",
      "特定技能2号可带家属",
      "12大行业扩容",
      "转永住新通道"
    ],
    "isActive": true,
    "sortOrder": 37,
    "advisorVerdict": {
      "highlightQuote": "日本蓝领特定技能（SSW 1号/2号）。特定技能 2 号已全面取消 5 年年限限制，允许带家属并可无限续签申请永住！",
      "summary": "特定技能制度（Specified Skilled Worker, 特定技能）是日本为应对建筑、造船、农业、餐饮、护理、航空等 14 大基础行业劳动力枯竭推出的革命性蓝领工签。\nSSW 1 号要求具备基础日语（N4 或 JFT-Basic）及行业技能考核，最长可在日工作 5 年；而一旦通过现场严苛的技术考核晋升至【特定技能 2 号】（熟练技工），将彻底取消居留上限，享有与常规白领相同的家属随行权（配偶与子女签证），并直接计入 10 年永住申请轨道！",
      "fatalTraps": [
        "1号转2号考试合格率：特定技能 2 号实操考试难度极高，部分行业年均通过率不足 20%。",
        "中介中途抽成与剥削：务必通过中日两国官方备案的正规注册支援机构（登録支援機関）对接，切忌私下借高利贷支付中介费。",
        "1号期间不可带家属：在特定技能 1 号的 5 年内，法律明确禁止配偶和子女随行居住。"
      ],
      "idealFor": "中专、职高、技校毕业生，有一定日语基础，愿意在机械制造、造船、餐饮料理、现代农业一线踏实打拼的务实青年。",
      "discouragedFor": "不愿从事一线体力或车间实操劳动、不愿学习日语的申请人。",
      "officialLawQuote": "Immigration Control Act Appended Table I(2) Section 2: \"Specified Skilled Worker (ii) status allowing unlimited renewals and family reunification for proficient skilled workers.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 JP 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Japan Specified Skilled Worker (SSW (i) / (ii)) 法定适用岗位",
            "englishName": "Eligible Roles for 特定技能 1号/2号 (SSW)",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 JP 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "jp_designated_activities",
    "countryCode": "JP",
    "category": "study",
    "code": "特定活動 (就職活動)",
    "name": "Japan Designated Activities for Job Hunting (留学生找工签)",
    "chineseName": "日本留学生毕业求职特定活动签证 (最长1年找工)",
    "summary": "日本大学/专门学校毕业未拿到 Offer 者，由学校推荐获发 6 个月特定活动居留，可续签一次最长 1 年，期间可每周兼职 28 小时继续找工作。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "JPY ¥4,000",
      "cnyEstimate": "约 ¥190",
      "amount": 4000,
      "currency": "JPY"
    },
    "effectivePeriod": "2004.04 - 至今 (日本留学生毕业找工缓冲期)",
    "estimatedProcessingTime": "2 - 4 周",
    "officialSourceUrl": "https://www.moj.go.jp/isa/applications/status/designatedactivities14.html",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "需取得就读大学的正式推荐信与求职活动记录",
    "tags": [
      "留学生找工缓冲",
      "最长1年特定活动",
      "可兼职28小时/周",
      "转技人国跳板"
    ],
    "isActive": true,
    "sortOrder": 38,
    "advisorVerdict": {
      "highlightQuote": "日本留学生毕业找工专属特定活动签证，发放 6 个月并可续签一次（最长 1 年），期间允许每周合法打工 28 小时！",
      "summary": "在日高等院校（大学、大学院、短期大学、正规专门学校）顺利毕业的留学生，如果在毕业前未能拿到正式内定（Job Offer），可以在毕业前申请为期 6 个月的【特定活动（継続就職活動）】找工居留。\n经学校出具推荐信后可向入管局申请续签一次，最长可在日找工停留整整 1 年！在此期间持资格外活动许可每周依然可打工 28 小时维持生计，确保留学生拥有充裕的时间参与日本秋招与春招！",
      "fatalTraps": [
        "必须在校方推荐期内递交：一旦失去学校官方推荐函（推薦状），入管局将直接拒绝下发特定活动。",
        "专门学校专业限制：专门学校毕业生（取得专门士）找工范围受到极其严格的专业对口限制。",
        "打工超时红线（28小时）：若打工超时被税局查出，后续即使拿到名企内定也无法成功变更为工作签证。"
      ],
      "idealFor": "日本大学或大学院应届毕业生，由于就活节奏未在毕业前拿到满意内定、需要额外半年到一年时间冲刺大厂的学子。",
      "discouragedFor": "在校出勤率低于 80%、学校拒绝出具推荐信、或打算利用找工签长期全职打黑工的学生。",
      "officialLawQuote": "Ministry of Justice Public Notice on Designated Activities No. 9: \"Designated activities for graduates from Japanese universities to continue job searching for up to 1 year.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 JP 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Japan Designated Activities for Job Hunting (留学生找工签) 法定适用岗位",
            "englishName": "Eligible Roles for 特定活動 (就職活動)",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 JP 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "sg_ep",
    "countryCode": "SG",
    "category": "work",
    "code": "Employment Pass (COMPASS)",
    "name": "Singapore Employment Pass (COMPASS Points Framework)",
    "chineseName": "新加坡 EP 高级就业准证 (COMPASS 互补积分制)",
    "summary": "月薪达 SGD $5,600+ (金融业 $6,200+)，并在薪资、学历、雇主多元化、本地人支持四大维度通过 COMPASS 打分满 40 分获批。",
    "thresholdScore": 40,
    "maxScorePossible": 60,
    "invitationMechanism": "points_ranked",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "SGD $330",
      "cnyEstimate": "约 ¥1,780",
      "amount": 330,
      "currency": "SGD"
    },
    "effectivePeriod": "2023.09 - 至今 (COMPASS积分制正式实施)",
    "estimatedProcessingTime": "1 - 3 周",
    "officialSourceUrl": "https://www.mom.gov.sg/passes-and-permits/employment-pass",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "起步月薪 SGD $5,600/月 (40岁以上最高至 $10,700/月)",
    "tags": [
      "COMPASS打分40分",
      "白领高管准证",
      "月薪$5.6k起",
      "转PR必经通道"
    ],
    "isActive": true,
    "sortOrder": 39,
    "advisorVerdict": {
      "highlightQuote": "2023年9月起全面实施 COMPASS 积分制（四项基础指标累计必须达 40 分），最低月薪门槛卡死 SGD $5,600（金融业 $6,200+）！",
      "summary": "新加坡就业准证（Employment Pass, EP）是跨国企业外派高管与专业人士的核心签证。自 2023 年 9 月起全面推行 COMPASS 积分框架（Complementarity Assessment Framework）：\n申请人不仅月薪必须达到最低法定基准（一般行业 SGD $5,600/月，金融行业 SGD $6,200/月，年龄越大门槛越高），还必须在四项基础指标（C1 薪资水平、C2 学历资质、C3 雇主员工国籍多元化、C4 雇主对本地就业支持率）以及两大加分项中累计达到 40 分及格线！",
      "fatalTraps": [
        "企业国籍配额多元化杀伤力（C3）：如果一家公司内部中国大陆籍员工比例已超过 25%，该企业在该维度得分为 0 分，申请人必须依靠个人高薪或名校学历强行补足 40 分！",
        "PR 审批黑盒：持有 EP 虽然合法生活，但新加坡永居 (PR) 是全亚洲最严格的黑盒审批（受种族比例 CMIO、年龄、家庭与国家融入综合考量），绝无“住满几年必给 PR”的法案保障。",
        "家属准证 (DP) 门槛：主申月薪必须达到 SGD $6,000 以上方可为配偶和子女申请家属准证。"
      ],
      "idealFor": "全球顶尖科技大厂程序员、亚太区高管、金融基金经理、以及毕业于新加坡国大/南大或全球 Top 100 名校的高素质精英。",
      "discouragedFor": "学历非名校、受雇于单一族裔占比过高的小微企业、或月薪低于 $5,600 的普通白领。",
      "officialLawQuote": "Singapore Ministry of Manpower (MOM) COMPASS Framework: \"Candidates must pass the 40-point threshold under the Complementarity Assessment Framework alongside qualifying salary.\""
    },
    "prerequisites": {
      "ageLimit": "年满 21 周岁，COMPASS 评估体系考量候选人资历与市场竞争力",
      "languageBenchmark": "无硬性托福雅思要求，通过海外/本地学历背景与全英文商务面试核验",
      "employerAccreditation": "必须由在新加坡合规注册运营的企业作为赞助人发起申请",
      "healthAndCharacter": "通过 MOM 指定诊所全身体检 (HIV、肺结核筛查等) 并无不良涉案记录"
    },
    "occupationGroups": [
      {
        "categoryName": "💻 数字经济与科技紧缺职业清单 (MOM SOL +20分)",
        "categoryIcon": "Laptop",
        "occupations": [
          {
            "name": "人工智能工程师与数据科学家",
            "englishName": "AI Engineer & Data Scientist",
            "code": "SSOC 25121",
            "qualificationReq": "新加坡 MOM 认可顶级大学 (Top Tier) 本科/硕士学位",
            "wageReq": "最低月薪 SGD $5,600/月 (金融业 $6,200/月，随年龄递增)",
            "highlightTag": "COMPASS 紧缺 +20分"
          },
          {
            "name": "网络安全架构师与渗透专家",
            "englishName": "Cybersecurity Architect",
            "code": "SSOC 25291",
            "qualificationReq": "MOM 认证学位证书",
            "wageReq": "最低月薪 SGD $5,600/月",
            "highlightTag": "COMPASS 紧缺 +20分"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据新加坡人力部 Ministry of Manpower (MOM) Employment of Foreign Manpower Act & COMPASS Framework",
      "requiredEvidenceList": [
        "MOM 官方指定第三方背景调查机构 (如 Dataflow / Sterling / Veremark) 出具的学历背景验证报告",
        "新加坡企业聘用合同 (含工作职责、薪资结构及岗位代码 SSOC)",
        "MOM 线上 COMPASS 40分评估达标记录表 (C1薪资、C2学历、C3多元化、C4本地化)"
      ]
    }
  },
  {
    "id": "sg_spass",
    "countryCode": "SG",
    "category": "work",
    "code": "S Pass",
    "name": "Singapore S Pass (Mid-Level Skilled Staff)",
    "chineseName": "新加坡 S Pass 中级技术准证 (配额与劳工税机制)",
    "summary": "面向中级技术人员与专业技师，月薪达 SGD $3,150+ (金融业 $3,650+)，受雇主行业外劳配额（Quota）与月缴人头税（Levy）管控。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "SGD $175",
      "cnyEstimate": "约 ¥950",
      "amount": 175,
      "currency": "SGD"
    },
    "effectivePeriod": "2023.09 - 至今 (2025年薪资阶梯持续上调)",
    "estimatedProcessingTime": "1 - 3 周",
    "officialSourceUrl": "https://www.mom.gov.sg/passes-and-permits/s-pass",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "法定最低月薪 SGD $3,150/月 (随年龄递增至最高 $4,650/月)",
    "tags": [
      "中级技术准证",
      "受雇主配额限制",
      "月薪$6,000可带配偶",
      "可申请新加坡PR"
    ],
    "isActive": true,
    "sortOrder": 40,
    "advisorVerdict": {
      "highlightQuote": "中级技术准证 S Pass，受雇主严格的外劳配额（Quota）和每月每人 SGD $550~$650 高额人头税（Levy）限制，月薪门槛上调至 SGD $3,150+！",
      "summary": "S Pass 是新加坡面向中等技术水平专业人员的工签通道。申请人需具备大专或本科学历以及对口行业经验，月薪门槛目前为 SGD $3,150（金融业 $3,650 起，随年龄递增）。\n与 EP 不同的是，S Pass 受企业内部严格的外劳配额限制（服务业 S Pass 比例上限仅为 10%，制造业为 15%），且雇主每月必须为每位 S Pass 员工向政府缴纳 SGD $550~$650 的高额人头税，因此企业只有在极其缺人时才会动用 S Pass 名额！",
      "fatalTraps": [
        "外劳配额一旦耗尽立即拒签：若公司本地员工离职导致比例失衡，S Pass 续签将直接被 MOM 系统自动驳回。",
        "带家属门槛极高：S Pass 持有人月薪必须达到 SGD $6,000+ 才能为配偶孩子申请家属准证，绝大多数 S Pass 员工无法带家属。",
        "PR 获批概率极低：S Pass 递交新加坡 PR 的整体通过率远低于 EP 高端技术人群。"
      ],
      "idealFor": "工程技术员、数控技工、专科护理、特色餐饮主厨及在新加坡本地完成理工学院 (Polytechnic) 学历的青年技术人员。",
      "discouragedFor": "期望带全家定居、或希望在 1~2 年内快速拿到新加坡 PR 绿卡的白领家庭。",
      "officialLawQuote": "Employment of Foreign Manpower Act: \"S Pass quota and tiered monthly foreign worker levy regulations governing mid-level skilled personnel.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 SG 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Singapore S Pass (Mid-Level Skilled Staff) 法定适用岗位",
            "englishName": "Eligible Roles for S Pass",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 SG 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "sg_one_pass",
    "countryCode": "SG",
    "category": "pr",
    "code": "ONE Pass",
    "name": "Singapore Overseas Networks & Expertise Pass (ONE Pass)",
    "chineseName": "新加坡顶级专才准证 (ONE Pass 5年免绑雇主)",
    "summary": "面向全球顶尖商业、科技、文化体育领军人物，月薪达 SGD $30,000+ 或在知名企业取得卓越成就，发放 5 年期自由工作居留，可同时创办并受雇于多家公司。",
    "thresholdScore": 100,
    "maxScorePossible": 100,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "SGD $480",
      "cnyEstimate": "约 ¥2,600",
      "amount": 480,
      "currency": "SGD"
    },
    "effectivePeriod": "2023.01 - 至今 (新加坡顶级专才通道)",
    "estimatedProcessingTime": "4 - 8 周",
    "officialSourceUrl": "https://www.mom.gov.sg/passes-and-permits/overseas-networks-expertise-pass",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "过去1年或受雇薪资需达到月薪 SGD $30,000/月 (或在科技/商业有杰出成就)",
    "tags": [
      "5年顶级准证",
      "月薪3万新币",
      "免雇主绑定",
      "全家同行"
    ],
    "isActive": true,
    "sortOrder": 41,
    "advisorVerdict": {
      "highlightQuote": "顶级专才准证 ONE Pass：固定月薪必须达到 SGD $30,000（约合 16 万人民币/月），5 年超级居留卡，配偶直接持 LOC 在新合法创业打工！",
      "summary": "顶级专才准证（Overseas Networks & Expertise Pass, ONE Pass）是新加坡面向全球顶尖 1% 领军商业领袖、科技泰斗与文化体育巨星设立的终极通行证。\n申请人需证明在过去 1 年内固定月薪达到 SGD $30,000 以上（或在新加坡雇主处将获得此薪资），或在艺术、体育、学术研究领域取得举世公认的非凡成就。获得 5 年期居留许可，完全免除 COMPASS 评估与外劳配额限制，允许同时在新加坡创办、运营和受雇于多家不同企业！",
      "fatalTraps": [
        "薪资穿透纳税真实性：MOM 与新加坡国内税务局（IRAS）深度联网核查每一笔税单，严查虚假流水与挂靠。",
        "续签严格年审：每 5 年续签时必须证明过去 5 年在新加坡创造了实质性商业价值或持续保持高薪。"
      ],
      "idealFor": "独角兽企业创始人、亚太区跨国 CEO、顶级对冲基金合伙人、世界级科研领军院士。",
      "discouragedFor": "流动资产或年薪未达 200 万人民币级别的普通中产群体。",
      "officialLawQuote": "MOM ONE Pass Directives 2023: \"5-year personalized pass for top talent in business, arts, culture, sports, science and technology with a monthly benchmark of SGD $30,000.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 SG 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Singapore Overseas Networks & Expertise Pass (ONE Pass) 法定适用岗位",
            "englishName": "Eligible Roles for ONE Pass",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 SG 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "us_eb2_niw",
    "countryCode": "US",
    "category": "pr",
    "code": "EB-2 NIW",
    "name": "National Interest Waiver (EB-2 NIW Green Card)",
    "chineseName": "美国 EB-2 NIW 国家利益豁免绿卡",
    "summary": "理工高学历出海大杀器：硕士以上学历免除劳工证 PERM 与雇主担保，直接由申请人向 USCIS 提交申请永久绿卡。",
    "thresholdScore": 100,
    "maxScorePossible": 100,
    "invitationMechanism": "threshold_pass",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "USD $715",
      "cnyEstimate": "约 ¥5,150",
      "amount": 715,
      "currency": "USD"
    },
    "effectivePeriod": "2016.12 - 至今 (Matter of Dhanasar先例标准)",
    "estimatedProcessingTime": "45 天加急 + 排期",
    "officialSourceUrl": "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "无强制雇主薪资要求，凭学术实质贡献与国家利益论证",
    "tags": [
      "免雇主担保",
      "理工硕博",
      "免除PERM",
      "直接绿卡"
    ],
    "isActive": true,
    "sortOrder": 42,
    "advisorVerdict": {
      "highlightQuote": "理工科硕士/博士的最佳破局卡：无需美国雇主赞助、无需劳工证 PERM，凭借个人学术成果或行业重大影响力直接一步到位全家拿美国绿卡！",
      "summary": "国家利益豁免移民（EB-2 National Interest Waiver, NIW）是美国职业移民第二优先下的特殊王牌通道。基于 Matter of Dhanasar 三重司法先例判定准则：① 申请人从事的事业具有实质性价值（Substantial Merit）和国家级重要性（National Importance）；② 申请人处于推进该事业的良好地位；③ 豁免工作聘用和劳工证符合美国国家利益。\n拥有 STEM 硕士或博士学位，且在芯片、AI、先进材料、生物医药、新能源等关键领域有论文发表、专利授权或重大工程落地的申请人，无需美国雇主，即可自行在海内外递交 I-140 申请！",
      "fatalTraps": [
        "中国大陆出生地排期（Priority Date）：目前大陆出生申请人 EB-2 排期约 4~5 年，需做好长期排期规划（期间可利用 NIW 锁死 PD 日期）。",
        "国家重要性主观自由裁量：移民官重点审查成果是否能推广至全美行业，仅有企业内部贡献而无全行业外溢效应极易被发 RFE 补件。",
        "排期期间身份维持：若人在美国境内，必须依靠 F-1/H-1B/O-1 等合法非移民身份合法维持至排期排到递交 I-485。"
      ],
      "idealFor": "STEM 领域硕博毕业生、大学科研人员、医药研发工程师、拥有多项行业发明专利的资深技术专家。",
      "discouragedFor": "纯文科背景、无任何论文/专利/媒体报道等客观第三方证据、无法接受 4 年以上排期的急迫出海者。",
      "officialLawQuote": "INA Section 203(b)(2)(B)(i) & Matter of Dhanasar (26 I&N Dec. 884): \"Exemption from the requirement of a job offer and labor certification in the national interest of the United States.\""
    },
    "prerequisites": {
      "ageLimit": "无年龄上限限制",
      "languageBenchmark": "无硬性英语成绩门槛，通过学术发表与同行推荐信印证学术沟通能力",
      "employerAccreditation": "免除劳工证 (PERM) 与美国雇主担保 (Self-Petition 独立自主申请)",
      "healthAndCharacter": "无传染性疾病，通过美国移民局 USCIS 与领事馆 DS-260 背景调查"
    },
    "occupationGroups": [
      {
        "categoryName": "🔬 理工科硬科技、生物医药与前沿科研 (STEM NIW)",
        "categoryIcon": "Microscope",
        "occupations": [
          {
            "name": "人工智能与计算机科学家",
            "englishName": "Computer and Information Research Scientist",
            "code": "SOC 15-1221",
            "qualificationReq": "具有高等学位 (Advanced Degree / 硕士或博士学位，或学士学位 + 5 年渐进性专业经验)",
            "wageReq": "无雇主薪资绑定，需证明科研成果具有实质性价值与国家级重要性 (Substantial Merit & National Importance)",
            "highlightTag": "免雇主全家直通绿卡"
          },
          {
            "name": "生物医药研发与癌症科研学者",
            "englishName": "Biochemist and Biophysicist",
            "code": "SOC 19-1021",
            "qualificationReq": "博士或硕士学位，具备国际期刊论文发表与同行评审 (Peer Review) 经验",
            "wageReq": "免雇主担保",
            "highlightTag": "免雇主全家直通绿卡"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据美国移民与国籍法 INA § 203(b)(2)(B)(i) & Matter of Dhanasar (26 I&N Dec. 884) 先例判决",
      "requiredEvidenceList": [
        "美国高等学位证书或海外同等学历评估证书 (Foreign Credential Evaluation)",
        "学术论文发表列表、Google Scholar 引用记录、国际专利证书及媒体报道",
        "5~8 封来自国际权威独立专家与行业领袖的官方背书推荐信 (Expert Recommendation Letters)",
        "详尽的赴美赴任计划书 (Personal Statement & Proposed Endeavor Plan)"
      ]
    }
  },
  {
    "id": "us_o1a",
    "countryCode": "US",
    "category": "work",
    "code": "O-1A Visa",
    "name": "O-1A Visa: Individuals with Extraordinary Ability in Sciences",
    "chineseName": "美国 O-1A 杰出人才工作签证 (免抽签工签)",
    "summary": "科学、教育、商业或体育领域的杰出人才签证，无名额配额限制、无抽签风险，获批即可享有 3 年工作许可并可无限期续签。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "USD $1,055",
      "cnyEstimate": "约 ¥7,600",
      "amount": 1055,
      "currency": "USD"
    },
    "effectivePeriod": "1990.11 - 至今 (STEM审理指南2022强化)",
    "estimatedProcessingTime": "15 天加急",
    "officialSourceUrl": "https://www.uscis.gov/working-in-the-united-states/temporary-workers/o-1-visa-individuals-with-extraordinary-ability-or-achievement",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "需达到行业专业水平薪资",
    "tags": [
      "免H-1B抽签",
      "无配额限制",
      "理工专家底牌",
      "15天加急批复"
    ],
    "isActive": true,
    "sortOrder": 43,
    "advisorVerdict": {
      "highlightQuote": "美国杰出人才工作签证（O-1A），免抽签、无排期、无名额上限，是 STEM 博士与独角兽高管留美免抽 H-1B 的绝地反击武器！",
      "summary": "O-1A 非移民杰出人才工作签证面向在科学、教育、商业或体育领域具有杰出能力的顶尖个人。\n只要满足 8 项标准中的至少 3 项（重大奖项、专业协会会员、同行评审、原创重大贡献、学术论文、关键领导角色、高薪酬），雇主或合规 Agent 即可在加急 15 天内极速递交获批。持有 O-1A 可以无限期延期，并为后续直接递交 EB-1A 杰出人才绿卡提供完美的证据链沉淀！",
      "fatalTraps": [
        "雇主赞助或代理绑定：虽然无需抽签，但仍需有美国雇主或合规 Agent 签署聘用协议。",
        "非双重意图（Non-immigrant Intent）：O-1 虽有一定灵活性，但递交 I-140/I-485 绿卡期间出入境仍需谨慎规划。",
        "配偶无法合法工作（O-3 限制）：O-3 配偶签证无法在美国合法全职工作。"
      ],
      "idealFor": "顶级高校毕业的理工科博士、知名科技企业技术领头人、在顶级期刊有独立发表的科研学者。",
      "discouragedFor": "普通本科应届生、无任何论文专利发表或重大行业奖项的常规求职者。",
      "officialLawQuote": "INA Section 101(a)(15)(O)(i): \"Extraordinary ability in the sciences, arts, education, business, or athletics which has been demonstrated by sustained national or international acclaim.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 US 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "O-1A Visa: Individuals with Extraordinary Ability in Sciences 法定适用岗位",
            "englishName": "Eligible Roles for O-1A Visa",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 US 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "us_stem_opt",
    "countryCode": "US",
    "category": "study",
    "code": "STEM OPT",
    "name": "F-1 STEM OPT 24-Month Extension",
    "chineseName": "美国 STEM 专业 3 年 OPT 工作许可延期",
    "summary": "STEM 领域本硕博毕业生享有 12+24 个月全职工作许可，提供多达 3-4 次 H-1B 抽签机会与 NIW 绿卡准备期。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "USD $470",
      "cnyEstimate": "约 ¥3,380",
      "amount": 470,
      "currency": "USD"
    },
    "effectivePeriod": "2016.05 - 至今 (总计36个月工作许可)",
    "estimatedProcessingTime": "2 - 3 个月",
    "officialSourceUrl": "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-extension-for-stem-students-stem-opt",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "必须在 E-Verify 合规雇主处受聘",
    "tags": [
      "STEM 3年工签",
      "多次H-1B抽签",
      "过渡NIW利器"
    ],
    "isActive": true,
    "sortOrder": 44,
    "advisorVerdict": {
      "highlightQuote": "STEM 专业毕业生专属核武器：12 个月初始 OPT + 24 个月延期 = 整整 3 年在美合法全职工作与 3 次 H-1B 抽签机会！",
      "summary": "STEM OPT 延期（F-1 STEM Optional Practical Training Extension）是美国为了挽留全球理工科高精尖人才设立的重磅福利。就读于指定 STEM 专业（科学、技术、工程、数学）名单内的 F-1 国际学生，在完成 12 个月常规 OPT 后，可直接申请延长 24 个月，合计享有 36 个月全职工作权限！\n雇主只需加入美国国土安全部 E-Verify 系统并制定 I-983 培训计划。3 年时间意味着你拥有整整 3 次参与每年 3 月 H-1B 乐透抽签的机会，极大拉升了留美上岸概率！",
      "fatalTraps": [
        "E-Verify 雇主刚性绑定：24 个月延期阶段，雇主必须是联邦 E-Verify 注册企业，未注册的小公司无法办理延期。",
        "失业天数累计上限：36 个月期间累计失业天数（Unemployment Days）不得超过 150 天，超期将直接导致 SEVIS 身份失效被驱逐。",
        "严禁自由职业与非直雇派遣：STEM OPT 严禁纯自由职业自雇或无监督的第三方中介派遣挂靠。"
      ],
      "idealFor": "就读计算机、电子电气、数据科学、生物统计、机械制造等 STEM 专业的留美本科、硕士及博士学子。",
      "discouragedFor": "非 STEM 文商科（仅有 1 年 OPT 且仅有 1 次抽签机会）、或雇主拒绝加入 E-Verify 的求职者。",
      "officialLawQuote": "8 CFR § 214.2(f)(10)(ii)(C): \"24-month extension of post-completion OPT for STEM degree holders employed by an E-Verify employer.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 US 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "F-1 STEM OPT 24-Month Extension 法定适用岗位",
            "englishName": "Eligible Roles for STEM OPT",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 US 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  },
  {
    "id": "nl_zoekjaar",
    "countryCode": "NL",
    "category": "work",
    "code": "Zoekjaar",
    "name": "Netherlands Orientation Year Visa (Zoekjaar)",
    "chineseName": "荷兰搜寻年找工签证 (Zoekjaar / Top 200名校直发)",
    "summary": "世界 Top 200 大学毕业生 3 年内均可申请 1 年无条件找工签，找到工作转高技术移民享薪资减免优惠（仅需 €2,865/月）。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "first_come_first_served",
    "eoiRequired": false,
    "jobOfferMandatory": false,
    "officialFee": {
      "local": "EUR €228",
      "cnyEstimate": "约 ¥1,780",
      "amount": 228,
      "currency": "EUR"
    },
    "effectivePeriod": "2016.03 - 至今 (Top 200全球高校适用)",
    "estimatedProcessingTime": "2 - 4 周",
    "officialSourceUrl": "https://ind.nl/en/residence-permits/work/orientation-year-highly-educated-persons",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "找工期间无薪资门槛，转工签享优惠薪资 €2,865/月",
    "tags": [
      "世界Top200名校",
      "1年无条件找工",
      "转高技术移民降薪资门槛"
    ],
    "isActive": true,
    "sortOrder": 45,
    "advisorVerdict": {
      "highlightQuote": "全球 Top 200 大学毕业生专属“求职年”签证（Zoekjaar）：国内名校或海外名校毕业 3 年内均可申请，白嫖 1 年自由留荷找工！",
      "summary": "荷兰硕博求职年签证（Zoekjaar / Orientation Year）是欧洲最具开放度的抢人政策之一。不仅面向荷兰本土高校毕业生，只要你在过去 3 年内毕业于全球三大世界大学排名（QS / THE / ARWU）任意两个榜单中排名前 200 的海外高校（包含清华、北大、浙大、复旦、上海交大、中科大、港大、港中文、新加坡国立等以及欧美名校），且英语成绩达雅思 6.0：\n无需任何 Job Offer，即可直接获发 1 年期荷兰自由居留！在 1 年期间享有完全自由的打工与创业权限；期间只要找到一份月薪达 €2,865（享受毕业生终身优惠线）的工作，即可原地切换为高技术移民工签！",
      "fatalTraps": [
        "3年毕业时限窗口：必须在毕业证签署之日起 3 年之内递交，超期丧失资格。",
        "一生一个学位一次机会：每个完成的学位层级（硕士或博士）仅能申请一次 Zoekjaar。",
        "1年期满无宽限期：1 年到期若未成功转入 Kennismigrant 或其他有效合法居留，必须离境。"
      ],
      "idealFor": "全球 Top 200 大学硕士博士毕业生，渴望以极低成本直接登陆西欧顶级高福利英语职场开拓未来的青年才俊。",
      "discouragedFor": "毕业已超过 3 年、非 Top 200 高校毕业、或无法在 1 年内自理海外生活开支的申请人。",
      "officialLawQuote": "Dutch Aliens Employment Act Implementation Decree Section 2.1: \"Orientation year residence permit for highly educated persons graduated within the past 3 years from designated top universities.\""
    },
    "prerequisites": {
      "ageLimit": "无年龄上限限制",
      "languageBenchmark": "雅思 6.0 / 托福 80 (海外 Top 200 高校申请人需提供)",
      "employerAccreditation": "申请时无需任何荷兰雇主 Job Offer，直接获发 1 年自由工作居留",
      "healthAndCharacter": "无犯罪前科声明 (Antecedents Certificate) 并完成肺结核 TB 筛查 (如适用)"
    },
    "occupationGroups": [
      {
        "categoryName": "🎓 全球 Top 200 高校各专业英才",
        "categoryIcon": "GraduationCap",
        "occupations": [
          {
            "name": "高教毕业生自由求职通道",
            "englishName": "Highly Educated Migrant (All Disciplines)",
            "code": "IND Code 34",
            "qualificationReq": "过去 3 年内毕业于 QS/THE/ARWU 世界排名前 200 高校或荷兰本土大学硕士/博士",
            "wageReq": "找工期内可自由打工；转工签时享受优惠薪资线 €2,865/月 (常规需 €4,071+)",
            "highlightTag": "1年自由居留转工签"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据荷兰外侨就业法 Aliens Employment Act Implementation Decree Section 2.1 (Zoekjaar)",
      "requiredEvidenceList": [
        "全球三大大学排名 (QS / THE / ARWU) Top 200 高校官方硕士或博士学位证书",
        "Nuffic (荷兰国际化教育评估机构) 官方学历认证评估函",
        "官方语言考试成绩单 (IELTS 6.0 / TOEFL 80)",
        "荷兰移民归化局 (IND) 申请表格与近 3 个月银行资金证明"
      ]
    }
  },
  {
    "id": "nl_kennismigrant",
    "countryCode": "NL",
    "category": "work",
    "code": "Kennismigrant",
    "name": "Highly Skilled Migrant Visa (Kennismigrant)",
    "chineseName": "荷兰高技术移民工作许可 (IND 认证雇主)",
    "summary": "受 IND 认可雇主聘用，30岁以上月薪 €5,420，30岁以下 €3,972，连续纳税满 5 年并通过融入考试可直接申请荷兰永久居留或入籍。",
    "thresholdScore": 0,
    "maxScorePossible": 0,
    "invitationMechanism": "employer_sponsored",
    "eoiRequired": false,
    "jobOfferMandatory": true,
    "officialFee": {
      "local": "EUR €380",
      "cnyEstimate": "约 ¥2,980",
      "amount": 380,
      "currency": "EUR"
    },
    "effectivePeriod": "2004.10 - 至今 (2026最新高薪门槛)",
    "estimatedProcessingTime": "2 - 4 周",
    "officialSourceUrl": "https://ind.nl/en/residence-permits/work/highly-skilled-migrant",
    "lastVerifiedDate": "2026-08",
    "wageRequirementNote": "30岁以上 €5,420/月，30岁以下 €3,972/月 (Zoekjaar减免至 €2,865/月)",
    "tags": [
      "高技术工签",
      "5年永居入籍",
      "英语普及超90%",
      "ASML总部"
    ],
    "isActive": true,
    "sortOrder": 46,
    "advisorVerdict": {
      "highlightQuote": "欧洲最高效高技术移民：免劳工市场测试，2周极速批复！连续在荷工作生活满 5 年即可申请荷兰永居或欧盟长居（需过基本融入考）。",
      "summary": "荷兰高技术移民签证（Kennismigrant / Highly Skilled Migrant）是欧洲最成熟、最受跨国企业欢迎的技术工签通道。荷兰阿姆斯特丹与埃因霍温（ASML 所在地）拥有顶级的英语职场环境。\n核心要求：雇主必须是经过荷兰移民局（IND）官方认证的合规保荐机构（Recognized Sponsor），薪资达到法定标准（30岁以上约 €5,456/月，30岁以下约 €4,002/月，找工年毕业生享 €2,865/月优惠门槛）。工作满 5 年通过荷兰 Civic Integration 融入考试，即可申请荷兰永久居留或入籍！",
      "fatalTraps": [
        "30岁薪资台阶骤升：年满 30 岁后工签续签薪资门槛从 €4,002 跃升至 €5,456/月（年薪近 50 万人民币），需确保雇主薪资涨幅跟上法定标准。",
        "离职 3 个月搜寻期（Search Period）：在荷期间若被解约，持签人仅有 3 个月时间寻找新 IND 认证雇主，否则居留卡失效。",
        "融入考试（Inburgering）：申请永居需考核基础荷兰语听说读写（A2 级），虽难度适中但需提前备考。"
      ],
      "idealFor": "半导体光刻机研发（ASML 生态）、SaaS 软件开发、跨国欧洲总部财务法务、以及在荷留学生。",
      "discouragedFor": "无法受雇于 IND 认证资质雇主、薪资未达法定最低标准、或完全排斥学习基础荷兰语的人群。",
      "officialLawQuote": "Dutch Aliens Act (Vreemdelingenwet 2000) Chapter 3: \"Residence permit for highly skilled migrants employed by a recognized sponsor meeting statutory salary thresholds.\""
    },
    "prerequisites": {
      "ageLimit": "依据各国法案规定 (通常 18~35 周岁或无上限限制)",
      "languageBenchmark": "满足官方基本语言要求 (如雅思 6.0 / 日语 N2 / 德语 B1 或特定豁免)",
      "employerAccreditation": "持有正规合法雇主聘书或开放工签免雇主绑定",
      "healthAndCharacter": "无重大犯罪记录公证书并完成入境健康筛查"
    },
    "occupationGroups": [
      {
        "categoryName": "💼 NL 通用紧缺与对口专业通道",
        "categoryIcon": "Briefcase",
        "occupations": [
          {
            "name": "Highly Skilled Migrant Visa (Kennismigrant) 法定适用岗位",
            "englishName": "Eligible Roles for Kennismigrant",
            "code": "STATUTORY",
            "qualificationReq": "具备受认可专科/本科/硕士学历或对口行会执业资质",
            "wageReq": "达到移民局与劳工部法定最低薪资或行业基准",
            "highlightTag": "官方合规通道"
          }
        ]
      }
    ],
    "legalEvidence": {
      "operationalManualBasis": "依据 NL 官方移民法案与劳工居留条例 (Immigration & Aliens Employment Act)",
      "requiredEvidenceList": [
        "官方学历学位公证书与成绩单",
        "有效护照全本彩色扫描件",
        "合规雇佣合同或毕业完成信 (Completion Letter)",
        "无犯罪记录公证书 (Police Clearance Certificate)"
      ]
    }
  }
];
