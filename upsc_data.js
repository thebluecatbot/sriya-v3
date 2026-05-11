// upsc_data.js — INFOTAINMENT ATLAS DATA
// covers prelims + GS1 + GS2 + GS3 + GS4 + essay + interview
// via shows, podcasts, YouTube channels, books & games

const INFOTAINMENT_DATA = [

  // ── DAILY CURRENT AFFAIRS ────────────────────────────────
  {
    id: "current-affairs",
    title: "📰 Daily Current Affairs Routine",
    body: [
      "Build a sustainable daily habit around quality sources — not quantity. 30–45 mins of good reading beats 3 hours of scattered browsing. The goal is to connect current events to your static syllabus.",
    ],
    sub: [
      {
        title: "Morning: News Essentials",
        items: [
          "⭐ Indian Express Explained [link] — best single source for prelims + mains context",
          "⭐ The Hindu editorial page [link] — editorial + op-ed daily for GS2, essays",
          "🎯 PIB Press Releases [link] — government schemes, policy, official data (sneaky prelims goldmine)",
          "🎯 PRS India [link] — Parliament bills, committee reports, legislative tracker",
          "🔥 Economic & Political Weekly [link] — long-form analysis for serious mains depth",
        ]
      },
      {
        title: "Podcast: Commute-friendly",
        items: [
          "⭐ All Things Policy [Spotify] — Indian policy explained simply, 20-30 min episodes",
          "⭐ The Core Report [Spotify] — business + economy, very UPSC-relevant",
          "🎯 Grand Tamasha [Spotify] — politics, elections, governance deep dives",
          "🎯 Ideas of India [link] — economic policy, development, liberalisation debates",
          "🔥 Anticipating the Unintended [link] — policy analysis, long form, GS2+GS3",
        ]
      },
      {
        title: "Quick Digestible Formats",
        items: [
          "⭐ Finshots Daily [link] — economy + business in 5 minutes, excellent for GS3",
          "🎯 Inshorts [link] — 60-word news summaries, good for quick scan of the day",
        ]
      }
    ]
  },

  // ── INDIAN HISTORY & CULTURE ─────────────────────────────
  {
    id: "history-culture",
    title: "🏛️ Indian History & Culture (GS1)",
    body: [
      "History is best absorbed through stories, not timelines. Start with audio-visual content to build a mental scaffold, then fill in with NCERT and standard texts. Culture questions in UPSC reward depth and connections.",
    ],
    sub: [
      {
        title: "Ancient & Medieval India",
        items: [
          "⭐ Bharat Ek Khoj [YT] — Nehru's 'Discovery of India' dramatised by Shyam Benegal — stunning and GS1 gold",
          "⭐ Anirudh Kanisetti [YT] — South Indian history, medieval India, Deccan sultanates — very detailed",
          "🎯 Extra History [YT] — global civilisations with Indian parallels, great for context",
          "🎯 History of India Podcast [link] — chronological, audio, covers ancient to medieval",
          "🔥 Echoes of India [Spotify] — deep dives into Indian cultural history",
        ]
      },
      {
        title: "Modern Indian History",
        items: [
          "⭐ Chanakya [YT] — Doordarshan's 1991 serial on Chandragupta and Chanakya, unexpectedly rich",
          "⭐ Kings and Generals [YT] — Mughal wars, Maratha conflicts, colonial battles with great maps",
          "🎯 Revolutions [link] — covers American, French, Haitian, European revolutions (global context for GS1)",
          "🎯 Hardcore History [link] — immersive long-form history episodes, great for mental models",
          "🔥 Lallantop [YT] — Hindi explainers on Indian history, culture, politics — surprisingly detailed",
        ]
      },
      {
        title: "Art, Architecture & Culture",
        items: [
          "⭐ Yojana [link] — government magazine with culture, heritage, schemes — direct UPSC use",
          "🎯 Kurukshetra [link] — rural development and schemes, GS2 + GS3 overlaps",
          "🎯 Crash Course World History [YT] — fast-paced global history for context and comparisons",
        ]
      }
    ]
  },

  // ── INDIAN POLITY & GOVERNANCE ───────────────────────────
  {
    id: "polity-governance",
    title: "⚖️ Indian Polity & Governance (GS2)",
    body: [
      "Polity is the most rewarding GS paper — every news story connects back to constitutional provisions or governance structures. Link current events to M Laxmikanth chapters religiously.",
    ],
    sub: [
      {
        title: "Constitution & Institutions",
        items: [
          "⭐ Harvard Justice [YT] — Michael Sandel's Justice lectures: constitutional morality, rights theory, directly useful for GS4 and essay",
          "⭐ PRS India [link] — bill tracking, committee reports, Parliament functioning — live polity study",
          "🎯 Grand Tamasha [Spotify] — federalism, elections, governance discussed with experts",
          "🎯 Dhruv Rathee [YT] — constitutional issues explained accessibly (cross-check facts)",
          "🔥 Frontline [link] — investigative, long-form political analysis for advanced mains",
        ]
      },
      {
        title: "Governance & Social Justice",
        items: [
          "⭐ All Things Policy [Spotify] — welfare schemes, health policy, education — GS2 bread and butter",
          "🎯 The Print [YT] — governance debates, expert panels, policy critique",
          "🎯 StudyIQ IAS [YT] — structured polity + governance content mapped to syllabus",
          "🔥 The Caravan [link] — investigative journalism on governance, institutional failures",
        ]
      },
      {
        title: "International Relations",
        items: [
          "⭐ CaspianReport [YT] — geopolitics done beautifully: China, Russia, Middle East, South Asia",
          "⭐ PolyMatter [YT] — China, Taiwan, global power dynamics explained visually",
          "🎯 Think School [YT] — India's foreign policy, trade explained through business lens",
          "🎯 Wendover Productions [YT] — logistics, geography, global systems — GS2+GS3 overlap",
          "🔥 Seen & Unseen [Spotify] — Amit Varma's podcast: IR, liberalism, economy, long-form",
        ]
      }
    ]
  },

  // ── INDIAN ECONOMY ───────────────────────────────────────
  {
    id: "economy",
    title: "📈 Indian Economy (GS3)",
    body: [
      "Economy questions are high-yield in both prelims and mains. Build intuition through quality digestible content, then anchor with Budget, Economic Survey and RBI data. Finshots is your best friend here.",
    ],
    sub: [
      {
        title: "Economy Fundamentals",
        items: [
          "⭐ Finshots Daily [link] — economy + finance in 5 minutes daily. Do not skip.",
          "⭐ The Core Report [Spotify] — business news with policy depth, Monday to Friday",
          "⭐ Crash Course Economics [YT] — macro + micro foundations, 15-min episodes, excellent base",
          "🎯 Paisa Vaisa [Spotify] — personal finance to macroeconomics, accessible Hindi+English",
          "🎯 Planet Money [link] — NPR economy storytelling, great for essay examples from global context",
        ]
      },
      {
        title: "Budget & Government Data",
        items: [
          "⭐ Economic Survey [link] — read Vol 2 (Statistical Appendix) + key chapters before prelims",
          "🎯 Mrunal Patel [YT] — economy for UPSC, budget sessions, very structured",
          "🎯 StudyIQ IAS [YT] — economy + budget analysis content",
          "🔥 Ideas of India [link] — serious policy + development economics with Indian academics",
        ]
      },
      {
        title: "Agriculture, Industry & Infrastructure",
        items: [
          "🎯 Think School [YT] — business case studies with policy angles (PLI, Make in India, EV etc.)",
          "🎯 Kurukshetra [link] — rural economy, agriculture, villages — GS3 + GS1 overlap",
          "🔥 Anticipating the Unintended [link] — economic policy debates, reform critiques",
        ]
      }
    ]
  },

  // ── ENVIRONMENT & GEOGRAPHY ──────────────────────────────
  {
    id: "environment",
    title: "🌍 Environment, Ecology & Geography (GS1 + GS3)",
    body: [
      "Environment is a high-stakes topic — appears in prelims, GS3, and increasingly GS1. Climate change, biodiversity, and disaster management all overlap with current affairs heavily.",
    ],
    sub: [
      {
        title: "Science Communication & Climate",
        items: [
          "⭐ Kurzgesagt – In a Nutshell [YT] — climate, biodiversity, energy — stunning visuals, fact-dense",
          "⭐ Veritasium [YT] — science + physics + environment — great for S&T paper too",
          "🎯 Real Life Lore [YT] — geography, rivers, countries, borders — direct GS1 use",
          "🎯 Wendover Productions [YT] — airports, shipping, climate logistics, energy systems",
          "🔥 3Blue1Brown [YT] — mathematics behind climate models, AI, statistics — for advanced S&T",
        ]
      },
      {
        title: "Indian Geography & Disaster Management",
        items: [
          "⭐ Drishti IAS [YT] — geography + environment topics mapped to syllabus",
          "🎯 StudyIQ IAS [YT] — environment + ecology sessions, good for fact revision",
          "🎯 PIB Press Releases [link] — MoEFCC notifications, CPCB data, environmental clearances",
        ]
      }
    ]
  },

  // ── SCIENCE & TECHNOLOGY ─────────────────────────────────
  {
    id: "science-tech",
    title: "🔬 Science & Technology (GS3)",
    body: [
      "S&T questions test awareness more than depth. Stay current through quality science communication channels. ISRO, biotechnology, AI, cybersecurity, and defence tech are recurring UPSC themes.",
    ],
    sub: [
      {
        title: "General Science Communication",
        items: [
          "⭐ Kurzgesagt – In a Nutshell [YT] — space, biotech, AI, nuclear — extremely good",
          "⭐ Veritasium [YT] — physics, innovation, technology explained deeply",
          "🎯 3Blue1Brown [YT] — AI/ML foundations, neural networks — essential for current S&T",
          "🎯 Brilliant.org [link] — interactive STEM learning, builds intuition for complex concepts",
          "🔥 Lex Fridman [YT] — AI, physics, space, long-form with top scientists (selective episodes)",
        ]
      },
      {
        title: "India-specific S&T",
        items: [
          "⭐ PIB Press Releases [link] — ISRO launches, DST announcements, DRDO — direct answer material",
          "🎯 Think School [YT] — India's tech policy, semiconductor, EV ecosystem",
          "🎯 Finshots Daily [link] — tech policy, startup ecosystem, digital economy",
          "🔥 Anticipating the Unintended [link] — data governance, AI regulation, tech policy critique",
        ]
      }
    ]
  },

  // ── INTERNAL SECURITY ────────────────────────────────────
  {
    id: "internal-security",
    title: "🛡️ Internal Security (GS3)",
    body: [
      "Internal security covers terrorism, LWE, insurgency, cybersecurity, border management, and organised crime. Best studied through current affairs + standard texts.",
    ],
    sub: [
      {
        title: "Sources & Channels",
        items: [
          "⭐ The Hindu editorial page [link] — security analysis, J&K, NE, LWE coverage",
          "⭐ Frontline [link] — investigative pieces on security, police, defence",
          "🎯 CaspianReport [YT] — geopolitics that bleeds into India's border security",
          "🎯 The Print [YT] — security + defence + strategic affairs, expert interviews",
          "🔥 Hardcore History [link] — war strategy, military history — builds conceptual depth",
        ]
      }
    ]
  },

  // ── ETHICS, INTEGRITY & APTITUDE ────────────────────────
  {
    id: "ethics",
    title: "🧭 Ethics, Integrity & Aptitude (GS4)",
    body: [
      "GS4 is the most personal paper — it tests your values, not just knowledge. The best preparation is reading philosophy, case studies, and thinkers. Sandel's Justice is essential viewing.",
    ],
    sub: [
      {
        title: "Philosophy & Ethics Foundations",
        items: [
          "⭐ Harvard Justice [YT] — Michael Sandel: utilitarianism, Kant, Rawls, communitarianism. Watch all 12 episodes.",
          "⭐ Philosophy Bites [link] — 15-min philosophy interviews: trolley problem, justice, rights, virtue",
          "🎯 Aeon [link] — long-form philosophy essays, ethics of technology, moral philosophy",
          "🎯 Seen & Unseen [Spotify] — liberalism, pluralism, values — Amit Varma's best episodes",
          "🔥 Dwarkesh Patel [YT] — long conversations with thinkers on governance, ethics, AI",
        ]
      },
      {
        title: "Indian Ethical Thought",
        items: [
          "⭐ Bharat Ek Khoj [YT] — Indian philosophy, ethics, civilisational values embedded in drama",
          "🎯 Anirudh Kanisetti [YT] — medieval Indian thought, Bhakti, Sufi traditions",
          "🎯 Lallantop [YT] — social issues, caste, gender — ground-level perspective for case studies",
        ]
      },
      {
        title: "Emotional Intelligence & Leadership",
        items: [
          "⭐ Drishti IAS Mock Interviews [YT] — watch UPSC mock interviews for GS4 framing",
          "🎯 Vikas Divyakirti [YT] — essay lectures, ethical dimensions of governance",
        ]
      }
    ]
  },

  // ── ESSAY ────────────────────────────────────────────────
  {
    id: "essay",
    title: "✍️ Essay Paper",
    body: [
      "Essay is won through quality of thinking, not volume of content. Read widely, note quotable lines, build your worldview. The best essays connect the personal, the national, and the universal.",
    ],
    sub: [
      {
        title: "Reading for Essay Ideas",
        items: [
          "⭐ Aeon [link] — philosophy, science, culture essays — quotable, idea-rich",
          "⭐ LongReads [link] — long-form journalism from global outlets, builds writing sense",
          "⭐ The Hindu editorial page [link] — Indian essayists, editorial voices worth imitating",
          "🎯 Seminar Magazine [link] — academic essays on Indian themes — niche but excellent",
          "🎯 Anticipating the Unintended [link] — economics + society essay-style writing",
          "🔥 Economic & Political Weekly [link] — academic writing on India — high difficulty, high reward",
        ]
      },
      {
        title: "Essay Structure & Practice",
        items: [
          "⭐ Vikas Divyakirti [YT] — Drishti IAS essay lectures, approach, structure",
          "🎯 ForumIAS [YT] — essay writing guidance, model answers",
          "🎯 Khan Academy [link] — writing skills, argument structure, grammar",
        ]
      },
      {
        title: "Idea Banks from Infotainment",
        items: [
          "🎯 Kurzgesagt – In a Nutshell [YT] — global challenges: climate, AI, future — great essay examples",
          "🎯 Real Life Lore [YT] — geography, borders, geopolitics — concrete data for essays",
          "🔥 Lex Fridman [YT] — long conversations that surface essay-worthy ideas on consciousness, civilisation",
        ]
      }
    ]
  },

  // ── INTERVIEW ────────────────────────────────────────────
  {
    id: "interview",
    title: "🎙️ Personality Test / Interview",
    body: [
      "The UPSC interview tests your personality, not your knowledge. Read widely, have opinions, be honest about your DAF. Watch mock interviews and real toppers to understand tone, attitude, and depth expected.",
    ],
    sub: [
      {
        title: "Current Affairs for Interview",
        items: [
          "⭐ The Hindu editorial page [link] — form opinions on editorials, practice articulating them",
          "⭐ Indian Express Explained [link] — stay current on all major issues",
          "🎯 The Print [YT] — watch debates: form your own view before listening to panellists",
          "🎯 Seen & Unseen [Spotify] — develops articulate liberal worldview, great interview prep",
        ]
      },
      {
        title: "Mock Interviews & Toppers",
        items: [
          "⭐ Drishti IAS Mock Interviews [YT] — high quality mock panels, watch 10+ before your interview",
          "⭐ ForumIAS [YT] — topper interviews, strategy sessions",
          "🎯 StudyIQ IAS [YT] — interview guidance, DAF-based questions",
          "🎯 Vikas Divyakirti [YT] — personality development, how to present yourself",
        ]
      },
      {
        title: "Expanding Your Worldview",
        items: [
          "⭐ Dwarkesh Patel [YT] — long conversations with world-class thinkers — develop intellectual curiosity",
          "🎯 Lex Fridman [YT] — science, AI, philosophy — broadens perspective for board questions",
          "🎯 In Our Time [link] — BBC Radio 4: history, philosophy, science — 45-min intellectual episodes",
          "🔥 Puliyabaazi [Spotify] — Hindi podcast on Indian policy, great for Hindi medium background",
        ]
      }
    ]
  },

  // ── PRELIMS BOOSTER ─────────────────────────────────────
  {
    id: "prelims",
    title: "🎯 Prelims: Factual Booster",
    body: [
      "Prelims needs targeted factual retention. Use infotainment to make dry facts stick — watching a video about a scheme is 10x more memorable than reading a list. Combine with Anki for spaced repetition.",
    ],
    sub: [
      {
        title: "Rapid Revision Sources",
        items: [
          "⭐ PIB Press Releases [link] — read daily: government schemes, data, facts appear directly in prelims",
          "⭐ PRS India [link] — bills and acts, constitutional amendments — direct prelims source",
          "⭐ Anki [link] — spaced repetition flashcards: make cards from your notes and current affairs",
          "🎯 Finshots Daily [link] — economy facts, RBI, budget data — prelims-friendly format",
          "🎯 Khan Academy [link] — science, environment, geography basics — fill knowledge gaps",
        ]
      },
      {
        title: "Video: Facts that Stick",
        items: [
          "⭐ Crash Course World History [YT] — global history fast — great for Art and Culture comparisons",
          "⭐ Crash Course Economics [YT] — economic concepts that appear in prelims GS questions",
          "🎯 Real Life Lore [YT] — geography facts, country comparisons — very prelims-relevant",
          "🎯 Oversimplified [YT] — wars, revolutions, modern history — memorables for prelims",
          "🔥 Extra History [YT] — civilisations, timelines — builds mental map for art and culture",
        ]
      }
    ]
  },

];

// ─────────────────────────────────────────────────────────────
// KNOWLEDGE ATLAS — 12 recurring cross-paper themes
// each theme appears in multiple GS papers, optionals & essays
// ─────────────────────────────────────────────────────────────

const KNOWLEDGE_ATLAS = [

  {
    id: "state-society",
    title: "State & Society: Power, Rights & Institutions",
    secs: [
      {
        title: "GS2 — Polity & Governance",
        bullets: [
          "Separation of powers and constitutional morality",
          "Fundamental Rights vs Directive Principles tensions",
          "Judicial activism and the basic structure doctrine",
          "Electoral reforms: NOTA, simultaneous elections, EVM debates",
          "Federalism: cooperative vs competitive vs asymmetric",
          "Decentralisation: 73rd/74th amendments and Panchayati Raj",
        ]
      },
      {
        title: "Essay & Ethics angles",
        bullets: [
          "Is a strong state compatible with individual freedom?",
          "Democracy vs technocracy in policymaking",
          "Civil society's role in holding power accountable",
          "Constitutional ethics vs political pragmatism",
        ]
      },
      {
        title: "Prelims facts",
        bullets: [
          "Articles 356, 360, 352 — Emergency provisions",
          "Schedule 7 — Union, State and Concurrent Lists",
          "Election Commission: composition and powers",
          "CAG, UPSC, Finance Commission — constitutional bodies",
        ]
      }
    ]
  },

  {
    id: "development-welfare",
    title: "Development, Poverty & Social Justice",
    secs: [
      {
        title: "GS2 — Welfare & Social Justice",
        bullets: [
          "Poverty measurement: Tendulkar, Rangarajan, Multidimensional Poverty Index",
          "MGNREGA: impact, corruption, reform debates",
          "PM Awas Yojana, Jal Jeevan Mission — flagship schemes",
          "Education: NEP 2020 — key features and criticism",
          "Health: Ayushman Bharat, NHP, mental health policy",
          "Social justice: reservation debates, creamy layer, OBC commissions",
        ]
      },
      {
        title: "GS3 — Economic Development",
        bullets: [
          "Inclusive growth vs trickle-down economics",
          "Direct Benefit Transfer and financial inclusion",
          "Urban-rural income gap and migration patterns",
          "Self-Help Groups and microfinance ecosystem",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Development as freedom — Amartya Sen's capability approach",
          "Welfare vs workfare: which helps more?",
          "Can India achieve SDGs without addressing inequality?",
        ]
      }
    ]
  },

  {
    id: "economy-growth",
    title: "Economic Growth, Trade & Finance",
    secs: [
      {
        title: "GS3 — Indian Economy",
        bullets: [
          "GDP growth drivers: consumption, investment, exports, government spend",
          "Fiscal policy: FRBM targets, fiscal deficit, revenue vs capital expenditure",
          "Monetary policy: RBI tools, inflation targeting, repo rate",
          "GST: structure, composition scheme, inverted duty, revenue sharing",
          "Trade: export diversification, PLI schemes, FTAs (UAE, Australia, UK)",
          "Banking: NPA crisis, IBC, NARCL, bank consolidation",
        ]
      },
      {
        title: "GS2 — International Economic IR",
        bullets: [
          "WTO: TRIPS, agriculture subsidies, dispute settlement",
          "IMF and World Bank: India's role and conditionalities",
          "BRICS, SCO, G20: India's economic diplomacy",
          "China+1 strategy: India's manufacturing opportunity",
        ]
      },
      {
        title: "Prelims facts",
        bullets: [
          "Base year of GDP calculation (2011-12)",
          "SEBI, IRDAI, PFRDA — financial sector regulators",
          "CRR, SLR, MSF, Bank Rate definitions",
          "RBI's monetary policy committee composition",
        ]
      }
    ]
  },

  {
    id: "environment-sustainability",
    title: "Environment, Climate & Sustainability",
    secs: [
      {
        title: "GS3 — Environment & Ecology",
        bullets: [
          "Climate change: IPCC reports, Paris Agreement NDCs, COP summits",
          "Biodiversity: CBD, Nagoya Protocol, Kunming-Montreal framework",
          "Forest governance: Forest Rights Act, compensatory afforestation",
          "Pollution: National Clean Air Programme, river rejuvenation plans",
          "Disaster management: NDMA, Sendai Framework, heat action plans",
          "Renewable energy: solar, wind, green hydrogen targets",
        ]
      },
      {
        title: "GS1 — Physical Geography",
        bullets: [
          "Monsoon mechanisms: El Nino, La Nina, IOD effects on India",
          "Himalayan glaciers and river systems",
          "Coastal ecosystems: mangroves, coral reefs, wetlands",
          "Tectonic activity and earthquake zones in India",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Climate justice: whose responsibility is decarbonisation?",
          "Development vs environment: false binary or real tension?",
          "Common but differentiated responsibilities in global climate action",
        ]
      }
    ]
  },

  {
    id: "technology-society",
    title: "Technology, Innovation & Society",
    secs: [
      {
        title: "GS3 — Science & Technology",
        bullets: [
          "AI and machine learning: India's AI mission, regulation debates",
          "Space: ISRO milestones (Chandrayaan-3, Aditya L1), IN-SPACe, private sector",
          "Biotechnology: genome sequencing, gene editing, biosafety",
          "Cybersecurity: CERT-In, data protection laws, cyber warfare",
          "Semiconductor policy: India Semiconductor Mission",
          "5G and digital infrastructure: BharatNet, digital public goods",
        ]
      },
      {
        title: "GS2 — Governance & Tech",
        bullets: [
          "Digital India: Aadhaar ecosystem, e-governance, DigiLocker",
          "Data protection: DPDP Act 2023 — key provisions",
          "Social media regulation and free speech",
          "Algorithmic bias and ethical AI governance",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Technology as the new divide: digital colonialism",
          "AI: existential threat or greatest human achievement?",
          "Privacy vs surveillance: where should the state draw the line?",
        ]
      }
    ]
  },

  {
    id: "india-world",
    title: "India & the World: Foreign Policy & IR",
    secs: [
      {
        title: "GS2 — International Relations",
        bullets: [
          "Neighbourhood first policy: Pakistan, China, Nepal, Bangladesh, Sri Lanka",
          "India-US relations: defence, tech, immigration, trade",
          "India-Russia: strategic autonomy vs Western pressure",
          "Multi-alignment: Quad, I2U2, SCO, BRICS simultaneously",
          "India in multilaterals: UNSC reform bid, WTO, G20 presidency",
          "Soft power: yoga, diaspora, cultural diplomacy",
        ]
      },
      {
        title: "GS3 — Border Security & Internal overlap",
        bullets: [
          "China border: LAC, Galwan, ARUNPRADESH disputes",
          "Pakistan: cross-border terrorism, water disputes (Indus Waters Treaty)",
          "Myanmar: free movement regime suspension, border fencing",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Is strategic autonomy sustainable in a polarised world?",
          "India's rise: opportunity or responsibility?",
          "The Global South: solidarity or mere rhetoric?",
        ]
      }
    ]
  },

  {
    id: "agriculture-rural",
    title: "Agriculture, Rural Economy & Food Security",
    secs: [
      {
        title: "GS3 — Agriculture",
        bullets: [
          "MSP debate: legal guarantee pros and cons",
          "Farm laws 2020: what they proposed, why repealed",
          "PM-KISAN, Fasal Bima Yojana — direct support schemes",
          "Natural farming: zero budget, soil health cards",
          "Food processing: PM-FME scheme, value chain gaps",
          "Water: micro-irrigation, PMKSY, groundwater depletion",
        ]
      },
      {
        title: "GS2 — Rural Governance",
        bullets: [
          "Panchayati Raj: devolution gaps, 29 subjects rarely transferred",
          "MGNREGA: social audit, wage payment delays, reform agenda",
          "Women in rural governance: SHGs, female sarpanches",
        ]
      },
      {
        title: "Prelims facts",
        bullets: [
          "Green Revolution: HYV seeds, Punjab-Haryana belt",
          "Second Green Revolution: eastern India focus",
          "Operation Flood: dairy revolution by Verghese Kurien",
          "APMC: mandi system and reform debates",
        ]
      }
    ]
  },

  {
    id: "security-justice",
    title: "Security, Law & Criminal Justice",
    secs: [
      {
        title: "GS3 — Internal Security",
        bullets: [
          "Left Wing Extremism: affected districts, SAMADHAN doctrine",
          "North-East insurgency: armed groups, peace accords",
          "Terrorism: UAPA, NIA, financing networks",
          "Organised crime: hawala, narco-terrorism, FICN",
          "Cybercrime: ransomware, social engineering, cryptocurrency",
          "Border management: smart fencing, SSB, coastal security",
        ]
      },
      {
        title: "GS2 — Criminal Justice Reform",
        bullets: [
          "Bharatiya Nyaya Sanhita (BNS) replacing IPC — key changes",
          "Prison reforms: undertrial population, Legal Aid",
          "Police reforms: Prakash Singh judgment compliance",
          "Fast track courts and pendency crisis",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Security vs civil liberties: where is the balance?",
          "Can a state be just if its prisons are unjust?",
        ]
      }
    ]
  },

  {
    id: "gender-marginalized",
    title: "Gender, Marginalised Communities & Identity",
    secs: [
      {
        title: "GS1 — Indian Society",
        bullets: [
          "Caste: constitutional provisions, untouchability, manual scavenging",
          "Tribes: PESA Act, Forest Rights Act, displacement issues",
          "Gender: sex ratio, female labour force participation, gender pay gap",
          "Communalism: secularism debates, minority rights",
          "Regionalism: linguistic reorganisation, regional parties",
          "Globalisation and cultural homogenisation",
        ]
      },
      {
        title: "GS2 — Social Justice Schemes",
        bullets: [
          "SC/ST (PoA) Act — prevention of atrocities",
          "Beti Bachao Beti Padhao, POSHAN 2.0",
          "LGBTQ+: Section 377 repeal, marriage equality debate",
          "Disability: RPwD Act 2016, accessibility norms",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Reservation: means of correction or perpetuation of identity politics?",
          "Is secularism dead in India?",
          "Feminism in the age of social media",
        ]
      }
    ]
  },

  {
    id: "ethics-integrity",
    title: "Ethics, Values & Public Service",
    secs: [
      {
        title: "GS4 — Ethics Core Concepts",
        bullets: [
          "Foundational values: integrity, impartiality, objectivity, dedication",
          "Ethical theories: consequentialism, deontology, virtue ethics, care ethics",
          "Attitude and aptitude: components, formation, influence on behaviour",
          "Emotional intelligence: self-awareness, empathy, regulation",
          "Moral philosophy: Kant's categorical imperative, Mill's utilitarianism",
          "Indian ethics: Dharma, Nishkama Karma, Gandhi, Ambedkar",
        ]
      },
      {
        title: "GS4 — Applied Ethics",
        bullets: [
          "Probity in governance: transparency, accountability, citizen charter",
          "Whistleblowing: legal protection, moral duty",
          "Conflict of interest and nepotism",
          "Corporate governance: CSR ethics",
          "Case studies: dilemma resolution framework",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Can a corrupt society produce honest officials?",
          "Ethics without religion: is it possible?",
          "The banality of evil: how ordinary people do extraordinary harm",
        ]
      }
    ]
  },

  {
    id: "urbanization-infra",
    title: "Urbanisation, Infrastructure & Smart Cities",
    secs: [
      {
        title: "GS3 — Infrastructure",
        bullets: [
          "Smart Cities Mission: 100 cities, ICT-led governance",
          "PM Gati Shakti: multimodal logistics, PM NLP",
          "National Infrastructure Pipeline: funding gaps, PPP",
          "Urban housing: PMAY-Urban, slum rehabilitation",
          "Urban transport: metro rail expansion, EV transition",
          "Waste management: SBM-Urban 2.0, wet/dry segregation",
        ]
      },
      {
        title: "GS1 — Human Geography",
        bullets: [
          "Urbanisation trends: India 36% urban, projected 50% by 2050",
          "Urban heat islands: causes and mitigation",
          "Migration: push-pull factors, circular migration",
          "Megacities: Mumbai, Delhi challenges — sprawl, water, air",
        ]
      },
      {
        title: "GS2 — Urban Governance",
        bullets: [
          "74th Amendment: elected ULBs, ward committees",
          "Municipal finance: own source revenue gaps",
          "AMRUT 2.0: water, sanitation in cities under 1 million",
        ]
      }
    ]
  },

  {
    id: "history-freedom",
    title: "Indian Freedom Struggle & Constitutional History",
    secs: [
      {
        title: "GS1 — Modern History",
        bullets: [
          "1857 revolt: causes, nature, consequences",
          "Indian National Congress: moderates, extremists, Garam Dal",
          "Gandhi's movements: NCM, CDM, Quit India — comparison",
          "Subhash Chandra Bose and INA: alternate history debate",
          "Partition: causes, communal politics, human cost",
          "Constituent Assembly debates: Ambedkar, Nehru, Patel roles",
        ]
      },
      {
        title: "GS2 — Constitutional history overlap",
        bullets: [
          "Government of India Act 1919, 1935 — precursors to Constitution",
          "Cabinet Mission Plan and its rejection",
          "Major constitutional amendments: 42nd, 44th, 86th, 101st",
          "Emergency 1975-77: lessons for democracy",
        ]
      },
      {
        title: "Essay angles",
        bullets: [
          "Was India's partition inevitable?",
          "Nehru vs Patel: competing visions of India",
          "The unfinished business of the independence movement",
          "Ambedkar's Constitution: promise vs reality 75 years on",
        ]
      }
    ]
  },

];

// ─────────────────────────────────────────────────────────────
// INTER-CONNECTEDNESS DATA — GS paper specific topic maps
// ─────────────────────────────────────────────────────────────

const IC_GS2 = [
  {
    title: "Indian Constitution & Polity",
    items: [
      "Fundamental Rights (Art 12-35) — connects to GS4 rights-based ethics",
      "DPSP (Art 36-51) — connects to GS3 welfare schemes, GS4 public service",
      "Basic Structure doctrine — Kesavananda Bharati — judicial independence",
      "Article 356: President's Rule — federalism debates in GS2",
      "Emergency provisions (352, 356, 360) — historical: 1975 Emergency",
      "Parliamentary procedures: zero hour, question hour, private member bills",
    ]
  },
  {
    title: "Governance & Transparency",
    items: [
      "RTI Act 2005 — connects to GS4 accountability, essay on transparency",
      "Lokpal and Lokayukta — anti-corruption, links GS4 integrity",
      "Whistleblower Protection Act — GS4 case studies",
      "E-governance: MCA21, GSTN, DigiLocker — connects GS3 digital economy",
      "Citizen's Charter — service delivery, connects GS4 public service",
      "Lateral entry in civil services — merit vs seniority debate",
    ]
  },
  {
    title: "Social Justice & Welfare",
    items: [
      "Reservation policy — SC/ST/OBC — connects GS1 caste, GS4 discrimination ethics",
      "Child labour laws — connects GS3 labour, GS1 social change",
      "POCSO Act — child rights, connects GS1 vulnerable sections",
      "Maternity Benefit Act — connects GS3 women's labour force participation",
      "Mental Healthcare Act 2017 — connects GS3 health sector",
    ]
  },
  {
    title: "International Relations",
    items: [
      "SAARC vs BIMSTEC — India's neighbourhood strategy",
      "India-China: border dispute, trade dependency paradox",
      "India-US: 2+2 dialogue, CAATSA waiver, tech decoupling",
      "SCO: India-Pakistan within same multilateral",
      "UNSC reforms: P5 veto, India's case for permanent seat",
      "Non-alignment to strategic autonomy: India's IR evolution",
    ]
  },
];

const IC_GS3 = [
  {
    title: "Economic Development",
    items: [
      "GDP vs GNP vs GNI — measurement, why it matters",
      "Inclusive growth indicators: Gini coefficient, Human Development Index",
      "Inflation: WPI vs CPI, food vs core inflation — connects monetary policy",
      "FDI vs FPI — difference, India's sectoral caps",
      "PLI scheme — 14 sectors, objective, criticism — connects manufacturing",
      "Make in India vs Atmanirbhar Bharat — evolution of industrial policy",
    ]
  },
  {
    title: "Agriculture",
    items: [
      "MSP: C2+50% formula demand — connects farmer politics GS2",
      "Agricultural credit: KCC, NABARD, cooperative banks",
      "Land reforms: zamindari abolition, ceiling laws, land records digitisation",
      "Organic farming: Sikkim model, Paramparagat Krishi Vikas Yojana",
      "Drip irrigation: water use efficiency, PM-KUSUM solar pumps",
    ]
  },
  {
    title: "Environment & Ecology",
    items: [
      "Paris Agreement NDCs: India's 2030 targets (500 GW renewables, net zero by 2070)",
      "Wetlands: Ramsar Convention, India's Ramsar sites (75+)",
      "National Action Plan on Climate Change (NAPCC): 8 missions",
      "Green GDP: accounting for natural capital depletion",
      "EPR: Extended Producer Responsibility for plastic waste",
    ]
  },
  {
    title: "Science & Technology",
    items: [
      "ISRO: Chandrayaan-3 (soft landing), Aditya-L1 (solar mission), Gaganyaan",
      "Quantum computing: National Quantum Mission, India's roadmap",
      "5G rollout: spectrum auction, use cases, security concerns",
      "Generative AI: implications for jobs, governance, copyright",
      "Nuclear: three-stage programme, civil nuclear agreements",
    ]
  },
  {
    title: "Internal Security",
    items: [
      "LWE: Red Corridor shrinkage, development + security twin pillars",
      "UAPA: provisions, criticism from civil liberties angle — connects GS2 rights",
      "Drone policy: civilian use, border surveillance, defence",
      "Cyberattacks on critical infrastructure: power grid, banking",
      "Fake news and information warfare — domestic security dimension",
    ]
  },
];

const IC_GS4 = [
  {
    title: "Foundational Values in Public Service",
    items: [
      "Integrity — consistency between stated values and actual conduct",
      "Impartiality — serving all citizens equally regardless of identity",
      "Objectivity — evidence-based decisions, avoiding confirmation bias",
      "Empathy — understanding the citizen's perspective, not just the rule",
      "Dedication to public service — beyond 9-to-5, calling vs career",
      "Courage of conviction — speaking truth to power, rule-following under pressure",
    ]
  },
  {
    title: "Ethical Theories & Application",
    items: [
      "Consequentialism (Mill): judge action by outcomes — used in cost-benefit policy analysis",
      "Deontology (Kant): duty-based — 'never use people as means only' — public service ethics",
      "Virtue Ethics (Aristotle): be a good person, right action follows — character of the officer",
      "Care Ethics: relationships and context matter — sensitive administration",
      "Nishkama Karma (Gita): act without attachment to results — antidote to corruption",
      "Dharma: contextual duty — connects to situation-specific dilemmas in case studies",
    ]
  },
  {
    title: "Emotional Intelligence",
    items: [
      "Self-awareness: knowing your triggers, biases, values",
      "Self-regulation: not reacting impulsively in difficult field situations",
      "Motivation: internal compass vs external rewards",
      "Empathy: listening actively to citizens, understanding vulnerability",
      "Social skills: building coalitions for policy implementation",
    ]
  },
  {
    title: "Case Study Framework",
    items: [
      "Step 1: Identify all stakeholders and their interests",
      "Step 2: Map ethical principles at stake (rights, duties, consequences)",
      "Step 3: Consider options and their trade-offs",
      "Step 4: Choose action aligned with constitutional values + public interest",
      "Step 5: Anticipate consequences and plan mitigation",
      "Common dilemmas: political pressure vs professional duty, whistleblowing, transfers",
    ]
  },
];

const IC_PRE = [
  {
    title: "Indian Polity — High Yield Facts",
    items: [
      "President: elected by elected members of Parliament + state legislatures",
      "Rajya Sabha: 250 max (238 elected + 12 nominated), permanent house",
      "Money Bill (Art 110) vs Finance Bill — only LS votes on Money Bill",
      "Ordinance (Art 123): must be laid before Parliament on reassembly",
      "Constitutional bodies: Election Commission, CAG, UPSC, Finance Commission",
      "10th Schedule: anti-defection — Speaker/Chairman decides, SC can review",
    ]
  },
  {
    title: "Indian Economy — High Yield Facts",
    items: [
      "Base year for GDP: 2011-12 (CSO/MOSPI calculation)",
      "India's GDP composition: Services ~55%, Industry ~26%, Agriculture ~18%",
      "Inflation targeting: RBI mandated 4% ± 2% band since 2016",
      "GST council: chaired by Union Finance Minister, states have 2/3 vote weight",
      "SEBI: statutory body, regulates securities market",
      "Foreign Exchange: FEMA (not FERA) governs — civil not criminal offence",
    ]
  },
  {
    title: "Environment — High Yield Facts",
    items: [
      "Ramsar Convention: wetlands of international importance — India has 75+ sites",
      "CITES: trade in endangered species — three appendices",
      "Montreal Protocol: ozone depleting substances (NOT climate change)",
      "Kyoto Protocol: binding targets for developed countries (Annex-1)",
      "Biosphere Reserves: UNESCO designated, India has 18 (12 in UNESCO network)",
      "Tiger Reserves: 53+ in India, under Project Tiger (1973)",
    ]
  },
  {
    title: "History & Culture — High Yield Facts",
    items: [
      "INC founded 1885 by A.O. Hume, first session Bombay (Wyomesh Chandra Bonnerjee)",
      "Partition of Bengal: 1905 by Curzon, annulled 1911",
      "Non-Cooperation Movement: 1920-22, ended after Chauri Chaura",
      "Civil Disobedience: 1930, Dandi March — salt satyagraha",
      "Quit India: 1942, 'Do or Die', mass arrests, underground resistance",
      "Bhakti movement: Kabir, Tukaram, Mirabai, Chaitanya — devotional reform",
    ]
  },
  {
    title: "Science & Tech — High Yield Facts",
    items: [
      "Chandrayaan-3: landed near south pole Aug 2023, Vikram lander + Pragyan rover",
      "Aditya-L1: solar observation mission, L1 Lagrange point",
      "Nuclear: three-stage (thermal + fast breeder + thorium), DAE controls",
      "mRNA vaccines: first used at scale for COVID — Pfizer/Moderna",
      "CRISPR: gene editing tool, Nobel Prize 2020 (Doudna & Charpentier)",
      "5G spectrum: India auction 2022, 700 MHz + 3.5 GHz + 26 GHz bands",
    ]
  },
];
