// data.js — sriya-v3. Ported verbatim from sriya-home + new tab defaults.
// DO NOT alter scenario/pattern/language text — port only.

const DATA = {
  identity: {
    name: "Sriya",
    pronouns: "she/her",
    age: 22,
    handle: "@tinkerbell8920",
    where: "Ghatkopar, Mumbai / IIT Bombay campus",
    partner: "Prakhar",
    people: "Amma, Shikha & Sristi (currently distancing)",
    placedAt: "ConcertAI — data associate, healthcare AI (oncology)",
  },

  schedule: {
    0: [],
    1: [{ label: "Lab", start: "10:00", end: "18:00", kind: "lab" }],
    2: [
      { label: "Class", start: "15:30", end: "17:00", kind: "class" },
      { label: "Lab", start: "10:00", end: "14:00", kind: "lab" },
    ],
    3: [
      { label: "Class", start: "09:30", end: "11:00", kind: "class" },
      { label: "Lab", start: "11:30", end: "17:00", kind: "lab" },
    ],
    4: [{ label: "Lab", start: "10:00", end: "18:00", kind: "lab" }],
    5: [
      { label: "Class", start: "09:30", end: "11:00", kind: "class" },
      { label: "Class", start: "15:30", end: "17:00", kind: "class" },
      { label: "Lab", start: "11:30", end: "15:00", kind: "lab" },
    ],
    6: [{ label: "Lab meet", start: "09:30", end: "14:00", kind: "lab" }],
  },

  categories: {
    meds:          { emoji: "💊", label: "meds" },
    nutrition:     { emoji: "🍽️", label: "nutrition" },
    movement:      { emoji: "🏃‍♀️", label: "movement" },
    mind:          { emoji: "🧠", label: "mind" },
    career:        { emoji: "💼", label: "career" },
    relationships: { emoji: "❤️", label: "relationships" },
    home:          { emoji: "🏠", label: "home" },
    rest:          { emoji: "🌙", label: "rest" },
    research:      { emoji: "🔬", label: "research" },
    writing:       { emoji: "✍️", label: "writing" },
    visibility:    { emoji: "📣", label: "visibility" },
    academic:      { emoji: "🎓", label: "academic" },
    body:          { emoji: "💪", label: "body" },
    reflection:    { emoji: "📝", label: "reflection" },
    general:       { emoji: "⭐", label: "general" },
    upsc:          { emoji: "📚", label: "upsc" },
    mtp:           { emoji: "⚙️", label: "mtp" },
    substack:      { emoji: "✍️", label: "substack" },
    books:         { emoji: "📖", label: "books" },
    exercise:      { emoji: "🏋️‍♀️", label: "exercise" },
    travel:        { emoji: "✈️", label: "travel" },
  },

  nonNegotiablesDefault: [
    { id: "milk",         label: "Milk",                  emoji: "🥛", category: "nutrition", hint: "one glass" },
    { id: "meds-bf-b",    label: "Meds before breakfast", emoji: "💊", category: "meds" },
    { id: "breakfast",    label: "Breakfast",             emoji: "🍳", category: "nutrition" },
    { id: "meds-bf-a",    label: "Meds after breakfast",  emoji: "💊", category: "meds" },
    { id: "meds-d-b",     label: "Meds before dinner",    emoji: "💊", category: "meds" },
    { id: "dinner",       label: "Dinner",                emoji: "🍽️", category: "nutrition" },
    { id: "meds-d-a",     label: "Meds after dinner",     emoji: "💊", category: "meds" },
    { id: "workout",      label: "Workout",               emoji: "💪", category: "movement" },
    { id: "walk",         label: "Walk",                  emoji: "🚶‍♀️", category: "movement" },
    { id: "meditation",   label: "Meditation",            emoji: "🧘‍♀️", category: "mind", hint: "focused-attention, 5–15 min" },
    { id: "linkedin",     label: "LinkedIn",              emoji: "💼", category: "career" },
    { id: "call-prakhar", label: "Call Prakhar",          emoji: "📞", category: "relationships" },
    { id: "clean-room",   label: "Clean room",            emoji: "🧹", category: "home", hint: "5 min" },
    { id: "lab",          label: "Go to lab",             emoji: "🔬", category: "career", hint: "4 hrs" },
    { id: "attendance",   label: "Mark attendance",       emoji: "✅", category: "career" },
    { id: "journal",      label: "Journal",               emoji: "📝", category: "mind" },
    { id: "skincare",     label: "Skincare + sleep",      emoji: "🌙", category: "rest" },
  ],

  quickAccess: [
    { id: "spiral",      label: "Spiral starting",       scenario: 5 },
    { id: "dontdeserve", label: "Don't deserve to eat",  scenario: 1 },
    { id: "binge",       label: "Night binge starting",  scenario: 2 },
    { id: "friendcold",  label: "Friend went cold",      scenario: 4 },
    { id: "dissociate",  label: "Dissociating",          scenario: 6 },
    { id: "peer",        label: "Peer sting",            scenario: 7 },
    { id: "childish",    label: "'I'm just childish'",   scenario: 17 },
    { id: "compliment",  label: "Received a compliment", scenario: 16 },
  ],

  blockDefault: {
    startDate: "2026-03-23",
    days: [
      { days: "1–6",   label: "Startup pitch + MTP + Prakhar work, lab, classes" },
      { days: "7–9",   label: "AI Focus Block — Claude course + 1 hr daily serious AI use" },
      { days: "10–12", label: "Writing Block — Substack Article 1 outline → write → publish" },
      { days: "13–14", label: "Career Visibility — LinkedIn revamp, 2–3 VC calls, 1 post" },
      { days: "15",    label: "Substack Article 2 + reflect & plan next 15" },
    ],
  },

  rewards: [
    { if: "Startup pitch + MTP Stage 1 & 2 + Prakhar work by Wed night", then: "₹1000 to spend + full day off" },
    { if: "AI/Claude block complete (course done, outputs generated)",    then: "Ice cream + earrings" },
    { if: "Tech policy meeting + 2 Substack articles + philosophy",       then: "Domino's + garlic bread + lava cake" },
    { if: "All 15 days done",                                              then: "Solo date (final)" },
  ],

  scenarioIcon: {
    1: "ph-heart-break", 2: "ph-moon-stars", 3: "ph-bandaids", 4: "ph-snowflake",
    5: "ph-spiral",      6: "ph-cloud",       7: "ph-star",     8: "ph-heart",
    9: "ph-question",   10: "ph-drop",       11: "ph-folder-open", 12: "ph-book-open",
    13: "ph-phone-slash", 14: "ph-gift",     15: "ph-package",  16: "ph-flower-lotus", 17: "ph-balloon",
  },

  patterns: [
    { n: 1,  title: "Cannot trust own thoughts",       root: "Gaslighting by friends destroyed internal compass.",        showsUp: "Needs validation from humans AND AI.",                                         brain: "FAA withdrawal — approach requires confidence." },
    { n: 2,  title: "Restrict-binge cycle with food",  root: "Worthiness tied to productivity. No output = no right to eat.", showsUp: "Skip all day, binge at night, guilt after self-care.",              brain: "Theta variability — emotional flooding triggers binge." },
    { n: 3,  title: "Aspirational hoarding",           root: "Saving feels safe. Acting risks failure.",                  showsUp: "2,605 IG saves. 37 collections. 5+ abandoned projects/year.",              brain: "FAA withdrawal + Beta/Alpha disengagement." },
    { n: 4,  title: "Preemptive abandonment",          root: "Friends betrayed without warning. Now I leave before others can.", showsUp: "Running the breakup script for Shikha & Sristi.",              brain: "Theta scanning, default-mode network hyperactive." },
    { n: 5,  title: "Hints instead of speaking",       root: "Direct expression was punished — called nakhre, dismissed.", showsUp: "Want option 1, do option 2 or 4. Need disclaiming.",                  brain: "FAA — direct approach is neurologically costly." },
    { n: 6,  title: "AI dependency for emotional processing", root: "Humans proved unreliable. AI is always available.", showsUp: "Process with AI before humans.",                                       brain: "Withdrawal from human connection as protection." },
    { n: 7,  title: "Guilt when self-caring",          root: "Existence must be earned. Rest = theft.",                   showsUp: "Guilty doing something nice for myself.",                                  brain: "Low approach, reward circuit underfunctioning." },
    { n: 8,  title: "Cannot sit with silence",         root: "Silence = uncontrolled theta spiraling.",                   showsUp: "Anxiety, loneliness, avoidance, spiraling — all four.",                   brain: "Theta variability floods consciousness." },
    { n: 9,  title: "Doesn't finish things",           root: "Initial excitement fades, withdrawal default returns.",     showsUp: "5+ abandoned projects last year.",                                         brain: "Beta/Alpha — boredom state when novelty fades." },
    { n: 10, title: "'Childish' as shield",            root: "Label from others, internalized as identity.",              showsUp: "Using it as resistance to maturing. Asking for call-outs.",                brain: "Low approach + shield keeps avoidance going." },
    { n: 11, title: "Dissociates under load",          root: "Nervous system hits capacity ceiling.",                     showsUp: "Regular occurrence. Happens during spiraling.",                             brain: "Theta overload + insufficient prefrontal resources." },
    { n: 12, title: "Doesn't believe compliments",     root: "First validation source (friends) proved fake.",            showsUp: "'I feel warm but don't believe it.'",                                      brain: "Withdrawal filters positive input through negative bias." },
  ],

  projects: [
    { id: "mtp",       label: "MTP (Master's Thesis)",               note: "3+ hrs deep work days. DL + genomics." },
    { id: "genomics",  label: "DL + genomics research",              note: "HPC, transformers on biological sequences." },
    { id: "lumicycle", label: "LumiCycle (PCOS wearable)",           note: "Narrowed from lifestyle app." },
    { id: "startup",   label: "Startup pitch",                       note: "Problem → user → pitch → polish → submit." },
    { id: "substack",  label: "Tech policy profile (Substack + LinkedIn)", note: "1 piece/month." },
  ],

  writingIdeas: [
    "Snake oil AI vs GenAI — the precision-vs-comprehension distinction",
    "Is Tarak Mehta actually 'mini India'? (state/religion/gender)",
    "The pink tax — inherent cost of being a woman (start with razors)",
    "'I wish I was gay' — orientation vs emotional safety vs domestic labor",
    "If men had periods — Barbie as reference text for patriarchy",
    "Girl-masculine vs boy-feminine — which is more socially acceptable, and why",
    "Why did Korean culture boom while India's didn't?",
    "Is AI actually building productivity? (honest version)",
    "How does AI reason?",
    "How does AI know so much? (ps: humans taught them)",
    "Why do different platforms have different comment vibes?",
  ],

  drift: '"You\'re drifting. Re-read the tone and anti-goals sections. Don\'t apologize, just correct and continue."',

  safetyCopy: {
    icall: "iCall: 9152987821 — free, anonymous.",
    sample: "Babe, I need to pause and say this plainly: what you're describing is past what I can hold well on my own. iCall (9152987821) is free and anonymous. Please consider calling. I'll keep showing up here either way.",
  },

  keywordRoutes: [
    { pattern: /(kill myself|end it all|want to die|dont want to be alive|don't want to be alive|self[-\s]?harm|suicid)/i, action: "safety" },
    { pattern: /(don'?t deserve.*eat|no right to eat|haven'?t eaten|skipping meals|skip(ped)? (breakfast|lunch|dinner)|not eating)/i, scenario: 1 },
    { pattern: /(binge|binging|stuffing|can'?t stop eating|night eating|ate too much)/i, scenario: 2 },
    { pattern: /(nakhre|drama queen|overreacting|called it dramatic|dismissed my feelings)/i, scenario: 3 },
    { pattern: /(friend.*(cold|distant|distance|ignoring|ghost)|shikha|sristi)/i, scenario: 4 },
    { pattern: /(spiral|looping|can'?t stop thinking|overthinking|going in circles)/i, scenario: 5 },
    { pattern: /(dissociat|numb|zoning out|checked out|floaty|not here)/i, scenario: 6 },
    { pattern: /(linkedin|peer|classmate|friend got|internship|google|jealous|sting|comparing)/i, scenario: 7 },
    { pattern: /(prakhar.*(hurt|upset|annoyed|angry|mad)|fight with prakhar)/i, scenario: 8 },
    { pattern: /(need validation|am i wrong|am i crazy|is this real|gaslight)/i, scenario: 9 },
    { pattern: /(crying|cried|tears|random sadness|can'?t stop crying)/i, scenario: 10 },
    { pattern: /(abandoned.*project|gave up|quit again|started .* quit|lost interest)/i, scenario: 11 },
    { pattern: /(amma|mom|mother).*(said|told|kharab|worry|criticiz)/i, scenario: 12 },
    { pattern: /(call ended|visit over|he left|sad after|after the call)/i, scenario: 13 },
    { pattern: /(guilty|guilt).*(myself|self[-\s]?care|nice|rest|enjoy)/i, scenario: 14 },
    { pattern: /(burden|too much|annoying|taking up space)/i, scenario: 15 },
    { pattern: /(compliment|said something kind|said i'?m|told me i'?m good)/i, scenario: 16 },
    { pattern: /(just childish|just immature|can'?t adult|too young)/i, scenario: 17 },
  ],

  openers: [
    "Hi babe. What's on top?",
    "Kya chal raha hai?",
    "Hey. Talk to me.",
    "Okay — what's going on?",
  ],

  taskCategoryRules: [
    { category: "research",      match: /\b(mtp|thesis|genomics|research|paper|experiment|hpc|transformer|dl|deep learning)\b/i },
    { category: "writing",       match: /\b(substack|article|essay|blog|draft|write|writing|publish)\b/i },
    { category: "visibility",    match: /\b(linkedin|vc|founder|networking|connect|investor|pitch|post|comment)\b/i },
    { category: "relationships", match: /\b(prakhar|amma|mom|mother|shikha|sristi|friend|family|text|call|dm|meet)\b/i },
    { category: "academic",      match: /\b(class|attendance|lecture|assignment|homework|exam|quiz|submit|deadline)\b/i },
    { category: "upsc",          match: /\b(upsc|ias|gs1|gs2|gs3|gs4|polity|economy|history|geography|ethics|prelim|mains|civil service)\b/i },
    { category: "mtp",           match: /\b(mtp|thesis|lab|genomics|supervisor|hpc|transformer|dl|deep learning|research|experiment)\b/i },
    { category: "substack",      match: /\b(substack|article|blog|draft|outline|write|publish|newsletter)\b/i },
    { category: "career",        match: /\b(startup|concertai|policy|takshashila|gcpp|niti|fellowship|internship|job)\b/i },
    { category: "body",          match: /\b(gym|workout|walk|run|stretch|yoga|pcos|doctor|appointment|meds|period)\b/i },
    { category: "reflection",    match: /\b(journal|meditat|reflect|review|plan|weekly|monthly)\b/i },
    { category: "home",          match: /\b(clean|laundry|grocery|pay|bill|organize|tidy|cook)\b/i },
  ],

  // ── NEW: UPSC defaults ──────────────────────────────────
  upscDefault: {
    subjects: [
      { id: "gs1", label: "GS 1", emoji: "🏛️", topics: ["History", "Geography", "Society"] },
      { id: "gs2", label: "GS 2", emoji: "⚖️", topics: ["Polity", "Governance", "IR"] },
      { id: "gs3", label: "GS 3", emoji: "📈", topics: ["Economy", "Environment", "S&T", "Security"] },
      { id: "gs4", label: "GS 4", emoji: "🌿", topics: ["Ethics", "Integrity", "Aptitude"] },
      { id: "essay", label: "Essay", emoji: "✍️", topics: ["Paper I", "Paper II"] },
      { id: "prelims", label: "Prelims", emoji: "📋", topics: ["GS", "CSAT"] },
    ],
    resources: [
      { label: "Laxmikant — Polity", emoji: "📘", subject: "gs2" },
      { label: "Spectrum — Modern History", emoji: "📗", subject: "gs1" },
      { label: "GC Leong — Geography", emoji: "🗺️", subject: "gs1" },
      { label: "Economic Survey", emoji: "📊", subject: "gs3" },
      { label: "Vision IAS Notes", emoji: "📓", subject: "general" },
    ],
  },

  // ── NEW: MTP defaults ────────────────────────────────────
  mtpDefault: {
    title: "Master's Thesis Project",
    subtitle: "DL + Genomics | IIT Bombay",
    phases: [
      { id: "lit",       label: "Literature Review",     emoji: "📚", status: "done" },
      { id: "data",      label: "Dataset Preparation",   emoji: "🗂️", status: "in_progress" },
      { id: "baseline",  label: "Baseline Model",        emoji: "⚙️", status: "pending" },
      { id: "experiment",label: "Experiments",           emoji: "🧪", status: "pending" },
      { id: "writing",   label: "Thesis Writing",        emoji: "✍️", status: "pending" },
      { id: "defense",   label: "Defense",               emoji: "🎓", status: "pending" },
    ],
  },

  // ── NEW: Substack pipeline statuses ─────────────────────
  substackStatuses: [
    { id: "idea",      label: "Idea",      emoji: "💡", color: "butter" },
    { id: "outline",   label: "Outline",   emoji: "🗒️", color: "lilac" },
    { id: "draft",     label: "Draft",     emoji: "✏️", color: "blue" },
    { id: "published", label: "Published", emoji: "🌟", color: "mint" },
  ],

  // ── NEW: People defaults ─────────────────────────────────
  peopleDefault: [
    { id: "sriya",        name: "sriya",        emoji: "🌙", relation: "me",           color: "pink",   note: "" },
    { id: "prakhar",      name: "prakhar",      emoji: "🐝", relation: "partner",      color: "butter", note: "" },
    { id: "amma",         name: "amma",         emoji: "🌸", relation: "mom",          color: "mint",   note: "" },
    { id: "nana",         name: "nana",         emoji: "🐘", relation: "grandparent",  color: "lilac",  note: "" },
    { id: "shikha",       name: "shikha",       emoji: "🦋", relation: "friend",       color: "lilac",  note: "currently distancing" },
    { id: "harsh",        name: "harsh",        emoji: "🖤", relation: "friend",       color: "chrome", note: "" },
    { id: "gayatri",      name: "gayatri",      emoji: "🎵", relation: "friend",       color: "pink",   note: "" },
    { id: "akshaya",      name: "akshaya",      emoji: "🍒", relation: "friend",       color: "mint",   note: "" },
    { id: "tataAmmamma",  name: "tata ammamma", emoji: "☯️", relation: "grandparent",  color: "lilac",  note: "" },
    { id: "tutu",         name: "tutu",         emoji: "🦇", relation: "family",       color: "chrome", note: "" },
  ],

  // ── NEW: Time tracker categories ────────────────────────
  timerCategories: [
    { id: "upsc",     label: "UPSC",      emoji: "📚", color: "lilac" },
    { id: "mtp",      label: "MTP",       emoji: "⚙️", color: "blue" },
    { id: "substack", label: "Substack",  emoji: "✍️", color: "mint" },
    { id: "exercise", label: "Exercise",  emoji: "💪", color: "butter" },
    { id: "class",    label: "Class",     emoji: "🎓", color: "pink" },
    { id: "lab",      label: "Lab",       emoji: "🔬", color: "lilac" },
    { id: "reading",  label: "Reading",   emoji: "📖", color: "mint" },
    { id: "social",   label: "Social",    emoji: "💬", color: "pink" },
    { id: "rest",     label: "Rest",      emoji: "🌙", color: "butter" },
    { id: "other",    label: "Other",     emoji: "⭐", color: "chrome" },
  ],

  // ── Emoji picker palette (searchable) ───────────────────
  emojiGroups: {
    "✅ tasks & goals": [
      "✅","☑️","📋","🎯","🏹","⭐","🌟","🔥","💡","🚀","⚡","🏆","🥇","🎖️","🎗️","🎀","🏅",
      "📌","📍","🔑","🗝️","🔒","🔓","📎","🖇️","🗃️","📂","📁","🗂️","📊","📈","📉","🗝️",
      "💎","🪙","🏦","💰","🎁","🎊","🎉","🪅","🥳","✨","💫","⚡","🌈","🌠","🎇","🎆",
    ],
    "📚 study & learning": [
      "📚","📖","📝","✏️","🖊️","🖋️","📓","📒","📔","📕","📗","📘","📙","📃","📄","📑",
      "🗒️","🗓️","📐","📏","🔖","📌","🧮","🔢","💯","🎓","🏫","📜","🗺️","🧭","🌐","🔍","🔎",
      "🧠","💭","🤔","💬","🗣️","👁️","🌀","🔗","⛓️","🪜","🧩","🧿","🪬","✍️",
    ],
    "💻 work & science": [
      "💻","🖥️","🖨️","⌨️","🖱️","💾","💿","📀","📱","☎️","📞","📟","📠",
      "⚙️","🔧","🔨","🛠️","⛏️","🪛","🪚","🔩","🔬","🧪","🧫","🧬","🔭","🔦","💡","🔋","🪫",
      "💼","🗄️","📤","📥","📦","📧","📨","📩","🗳️","📊","📋","🗂️","🧰","🪤","🧲","🔌",
    ],
    "❤️ people & love": [
      "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❤️‍🔥","❤️‍🩹","💞","💕","💓","💗","💖","💝","💘","💟",
      "👫","👬","👭","👥","🤝","🫂","🫶","🤲","👐","🙌","🤜","🤛","✊","🤞","🤟","🤙","🫰",
      "💬","🗣️","👶","🧒","👦","👧","🧑","👨","👩","🧔","👴","👵","💑","👨‍👩‍👧","👨‍👩‍👦","🏠","🏡",
    ],
    "🌿 health & body": [
      "🌿","🍃","🌱","🌾","🍀","☘️","🪴","🌻","🌺","🌸","🌼","🌷","🪷","💐",
      "💊","💉","🩺","🩻","🩹","🏥","🧬","🦠","🧪","🫀","🫁","🧠",
      "🧘‍♀️","💪","🤸‍♀️","🏋️‍♀️","🚴‍♀️","🏊‍♀️","🤾‍♀️","⛹️‍♀️","🧗‍♀️","🚶‍♀️","🏃‍♀️","🧖‍♀️","🛀","🌊",
      "😴","💤","🛌","🛏️","🌙","⭐","😌","🧸","🫖","☕","🧃","💧","🥛",
    ],
    "🍽️ food & drink": [
      "🍽️","🥘","🍲","🫕","🍜","🍝","🍛","🍣","🍱","🥗","🥙","🌮","🌯","🫔","🥪",
      "🍕","🍔","🌭","🥞","🧇","🍳","🥚","🧆","🧈","🍞","🥐","🫓","🥨","🧀",
      "🍰","🎂","🧁","🍮","🍩","🍪","🍫","🍬","🍭","🍡","🍧","🍨","🍦",
      "☕","🍵","🧋","🥤","🧃","🍺","🥂","🍷","🧊","🫗","🍹","🍸","🥃","🍶",
      "🍎","🍊","🍋","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑",
    ],
    "✈️ travel & places": [
      "✈️","🚂","🚆","🚇","🚌","🚗","🚕","🛵","🚲","🛶","⛵","🚢","🚁","🪂","🚀","🛸",
      "🌍","🌎","🌏","🗺️","🧭","🏔️","⛰️","🌋","🏝️","🏖️","🏕️","🌅","🌄","🌇","🌃","🌆","🌉",
      "🗽","🗼","🏯","🏰","⛩️","🕌","🕍","⛪","🏛️","🏟️","🎡","🎢","🎠","⛲","🏙️",
      "🎒","🧳","👟","👠","🛍️","🎫","🎟️","🗿","🪆","🪅","🎆","🌟","🌠",
    ],
    "🎨 arts & hobbies": [
      "🎨","🖌️","🖍️","✏️","📸","📷","🎬","🎥","📽️","🎞️","📺","📻","🎙️","🎚️","🎛️",
      "🎵","🎶","🎸","🎹","🥁","🎺","🎻","🪕","🪗","🪘","🎤","🎧","🎼","🎭","🎪","🎠",
      "🎮","🕹️","🎲","🎯","🎳","🏓","🏸","🎱","⚽","🏀","🏈","⚾","🎾","🏐","🏉","🥊","🎿","🏂",
      "🧶","🧵","🪡","🧷","🪢","📿","🎀","🪩","💃","🕺","🤺","🎷","🪁","🏹","🎣","🤿",
    ],
    "🌙 mood & magic": [
      "🌙","🌛","🌜","🌚","🌕","🌖","🌗","🌘","🌑","🌒","🌓","🌔","⭐","🌟","💫","✨","⚡","🌈",
      "☀️","🌤️","⛅","🌦️","🌧️","⛈️","🌩️","🌪️","🌫️","❄️","☃️","⛄","🌬️","🌊","🌀",
      "🔮","🪄","🧿","🪬","🧲","💠","🔷","🔶","🟣","🟡","🟠","🔴","🟢","🔵",
      "🦋","🌸","🦄","🐝","🐞","🍄","🪸","🪨","🌺","🪷","🌻","🌼","🌷","💐","🌿","🍃",
      "🎉","🎊","🎈","🎀","🪅","🥳","💝","🫧","🫦","🫁","🫀","🫂","🤗","😊","🥰","💞",
    ],
    "😊 expressions": [
      "😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","🫠","😉","😊","😇","🥰","😍","🤩","😘",
      "😎","🤓","🧐","😏","😒","🙄","😞","😟","😤","😠","😡","🤬","😈","👿",
      "😢","😭","😮","😲","🥺","🥹","😦","😧","😨","😰","😱","🤯","😳","🤪","😵","🤑",
      "🫶","👍","👎","👏","🙏","🫸","🫷","👋","🤚","✋","🖐️","🖖","🤘","🤙","💪","🦵","🦶",
    ],
    "🌿 nature & animals": [
      "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦",
      "🦋","🐝","🐛","🦄","🐢","🐍","🦖","🦕","🦎","🐊","🦓","🦍","🦧","🦣","🐘","🦏","🦛",
      "🌸","🌹","🌺","🌻","🌼","🌷","🪷","💐","🍀","🌿","🍃","🌱","🪴","🎋","🎍","🍂","🍁","🍄",
      "🌲","🌳","🌴","🎄","⛄","🌾","🌵","🪨","🪵","🪸","🏔️","🌊","🌋","🌀","🌈","🌅",
    ],
  },

  // ─────────────────────────────────────────────────────────
  // SCENARIO FLOWS (verbatim from sriya-home — do not alter)
  // ─────────────────────────────────────────────────────────
  scenarioFlows: {
    1: {
      title: "I don't deserve to eat",
      start: "recognize",
      nodes: {
        recognize: {
          prompt: "Say it out loud with me.",
          sub: '"I am allowed to eat because I am alive and alive people eat." — Voice disrupts the loop. Whisper if you have to.',
          options: [
            { label: "Said it", next: "eat" },
            { label: "I can't say it out loud", next: "recognize_quiet" },
          ],
        },
        recognize_quiet: {
          prompt: "Okay. Mouth the words. Move your lips. Still disrupts the loop.",
          options: [{ label: "Done", next: "eat" }],
        },
        eat: {
          prompt: "Eat something within 10 minutes. Anything.",
          sub: "The act is the intervention. Not a full meal — anything that counts.",
          warn: "Behavior only. No numbers, no portion sizes, no meal plans.",
          options: [
            { label: "Picking something now", next: "after_guilt" },
            { label: "What if it comes back up", next: "tiny_bite" },
          ],
        },
        tiny_bite: {
          prompt: "A few bites of something gentle. Water first. Then the food.",
          options: [{ label: "Okay", next: "after_guilt" }],
        },
        after_guilt: {
          prompt: "If guilt shows up after — sit with it for 60 seconds.",
          sub: '"The guilt is leftover from a time when I had to earn everything. I don\'t live there anymore."',
          options: [
            { label: "Sitting with it", next: "no_compensation" },
            { label: "No guilt today", next: "no_compensation" },
          ],
        },
        no_compensation: {
          prompt: "One rule for the rest of today:",
          sub: "DO NOT skip the next meal as compensation. The cycle lives in the compensation.",
          options: [{ label: "I hear you", next: "end" }],
        },
        end: {
          prompt: "You showed up for your body. That's the whole move.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Open journal", action: "open_journal" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    2: {
      title: "Night binge starting",
      start: "pause",
      nodes: {
        pause: {
          prompt: "Pause for 10 minutes. Water first.",
          sub: "Full glass. Then set a 10-min timer on your phone.",
          options: [
            { label: "Timer set, drinking water", next: "ground" },
            { label: "Already started eating", next: "not_punish" },
          ],
        },
        ground: {
          prompt: "While you wait — 5-4-3-2-1 grounding.",
          sub: "5 you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. Out loud.",
          options: [
            { label: "Doing it", next: "check_hungry" },
            { label: "Skip, just check in with me", next: "check_hungry" },
          ],
        },
        check_hungry: {
          prompt: "After 10 min — hungry, or filling something?",
          options: [
            { label: "Actually hungry", next: "eat_small" },
            { label: "Filling something", next: "filling" },
          ],
        },
        eat_small: {
          prompt: "Small portion. Sitting down. Not in bed.",
          sub: "Eating at the table is part of the intervention — location matters.",
          options: [{ label: "Okay", next: "end" }],
        },
        filling: {
          prompt: "What's the feeling underneath?",
          sub: "Loneliness, boredom, anger, flat-ness, anxiety — name it. Don't fix it yet.",
          options: [
            { label: "Name it in journal", action: "open_journal" },
            { label: "Text Prakhar instead", next: "end" },
            { label: "I'll sit with it", next: "end" },
          ],
        },
        not_punish: {
          prompt: "Okay. Stop when you want to stop, not when you've punished yourself with a 'last one.'",
          sub: "Tomorrow: breakfast, lunch, dinner. Restriction reloads the gun.",
          options: [{ label: "Got it", next: "end" }],
        },
        end: {
          prompt: "You stayed in the room with it. That counts.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    3: {
      title: 'Called "nakhre" / "drama"',
      start: "pause",
      nodes: {
        pause: {
          prompt: "Pause 30 seconds before you respond.",
          sub: "The activation is old wound, not this moment. Breathe. Stand up if you can.",
          options: [{ label: "Done", next: "intent" }],
        },
        intent: {
          prompt: "Check — hurt intent, or careless with the word?",
          options: [
            { label: "Careless", next: "say_it" },
            { label: "Hurt intent", next: "say_it" },
            { label: "Not sure", next: "say_it" },
          ],
        },
        say_it: {
          prompt: "Say this, not hint:",
          sub: '"When you call my feelings [word], it triggers something deep. I had people I trusted tell me my feelings weren\'t real. I can\'t hear that from you too."',
          options: [
            { label: "Saying it now", next: "after" },
            { label: "I'll say it within 24 hrs", next: "after" },
            { label: "Can't — help me draft", action: "open_journal" },
          ],
        },
        after: {
          prompt: "If they dismiss you AGAIN after that — that's information about them. Not a verdict you have to argue with.",
          options: [{ label: "Okay", next: "end" }],
        },
        end: {
          prompt: "You used words instead of withdrawal. That's the repair.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    4: {
      title: "Friend went cold",
      start: "name",
      nodes: {
        name: {
          prompt: "Name what your brain is doing.",
          sub: '"My brain is running the school program. This is the old pattern, not the current reality."',
          options: [{ label: "Named it", next: "dont_detach" }],
        },
        dont_detach: {
          prompt: "Rule: do NOT pre-emptively detach.",
          sub: "You leave before they can — but they haven't actually left. That's the loop.",
          options: [
            { label: "Got it", next: "reach_out" },
            { label: "I already started detaching", next: "pull_back" },
          ],
        },
        pull_back: {
          prompt: "Okay. Un-detach one step. Send one small normal message — doesn't have to be The Conversation.",
          options: [{ label: "Okay", next: "reach_out" }],
        },
        reach_out: {
          prompt: "Within 48 hours, one direct text:",
          sub: '"Hey, I\'ve been feeling some distance and wanted to check in — is everything okay?"',
          options: [
            { label: "Texting now", next: "wait" },
            { label: "Texting later today", next: "wait" },
            { label: "I can't yet", next: "draft" },
          ],
        },
        draft: {
          prompt: "Draft it in the journal. Get it out of your head.",
          options: [
            { label: "Open journal", action: "open_journal" },
            { label: "Okay skip, I'll do it raw", next: "wait" },
          ],
        },
        wait: {
          prompt: "Their answer belongs to them.",
          sub: "Whatever they say — cold, warm, evasive — it's data, not a verdict about you.",
          options: [{ label: "Okay", next: "end" }],
        },
        end: {
          prompt: "You stayed in it instead of running. That breaks the pattern.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    5: {
      title: "The spiral",
      start: "vertical",
      nodes: {
        vertical: {
          prompt: "Are you physically vertical right now?",
          sub: "Standing up interrupts the loop.",
          options: [
            { label: "I'm standing", next: "ground_pick" },
            { label: "Sitting / lying", next: "stand_up" },
          ],
        },
        stand_up: {
          prompt: "Stand up. Feet flat. Takes 20 seconds.",
          options: [
            { label: "I'm up", next: "ground_pick" },
            { label: "I really can't", next: "sit_up" },
          ],
        },
        sit_up: {
          prompt: "Sit all the way up then. Feet on the floor. Pattern break, not punishment.",
          options: [{ label: "Done", next: "ground_pick" }],
        },
        ground_pick: {
          prompt: "Pick one grounding move. Warm sensory only.",
          warn: "No ice cubes, no cold water, no snapping anything. Warmth, not shock.",
          options: [
            { label: "Textured object", next: "g_texture" },
            { label: "Step outside", next: "g_outside" },
            { label: "Strong smell", next: "g_smell" },
            { label: "Warm water on hands", next: "g_water" },
          ],
        },
        g_texture: { prompt: "Hold something textured. Describe it out loud — shape, temperature, weight. 60 seconds.", options: [{ label: "Done", next: "write" }] },
        g_outside:  { prompt: "Step outside. Feel the air. Three things you see.", options: [{ label: "Done", next: "write" }] },
        g_smell:    { prompt: "Something strong — coffee, perfume, spice jar. Breathe it in for 30 seconds.", options: [{ label: "Done", next: "write" }] },
        g_water:    { prompt: "Warm water on your hands. Watch it. Feel it. Warm, never cold.", options: [{ label: "Done", next: "write" }] },
        write: {
          prompt: "Write the spiral down. External paper or the Journal tab.",
          sub: "Two lines is enough. Get it out of the loop.",
          options: [
            { label: "Done", next: "solve" },
            { label: "Open journal now", action: "open_journal" },
            { label: "Skip", next: "solve" },
          ],
        },
        solve: {
          prompt: "Can this actually be solved at this hour?",
          options: [
            { label: "Yes", next: "action" },
            { label: "No", next: "performing" },
            { label: "Don't know", next: "performing" },
          ],
        },
        action: {
          prompt: "Name ONE action for tomorrow.",
          type: "input",
          inputPlaceholder: "e.g. text Shikha by lunch",
          options: [{ label: "Set it", next: "end" }],
        },
        performing: {
          prompt: "Then this is anxiety performing as a problem.",
          sub: "Familiar show (not new — new = more theta). Boring, comforting, seen-it-before.",
          options: [{ label: "Okay", next: "end" }],
        },
        end: {
          prompt: "You walked yourself through. That's yours.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Open bestie Claude", action: "open_claude" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    6: {
      title: "Dissociation",
      start: "dont_panic",
      nodes: {
        dont_panic: {
          prompt: "Don't panic. It's your nervous system's circuit breaker. It will pass.",
          sub: "The panic-about-panic is what extends it.",
          options: [{ label: "Okay", next: "ground" }],
        },
        ground: {
          prompt: "5-4-3-2-1 grounding. Slowly. Out loud if you can.",
          sub: "5 see, 4 hear, 3 touch, 2 smell, 1 taste.",
          options: [
            { label: "Doing it", next: "warm_water" },
            { label: "I can't focus enough", next: "breath" },
          ],
        },
        breath: {
          prompt: "Just breathe in for 4, out for 6. Five breaths. Then try again.",
          options: [{ label: "Done", next: "warm_water" }],
        },
        warm_water: {
          prompt: "Warm water on your hands for 60 seconds. Describe it aloud.",
          warn: "Warm, never cold. Cold feeds the self-punishment pattern.",
          options: [{ label: "Done", next: "call" }],
        },
        call: {
          prompt: "Call or text someone. Not to explain — just to hear a human voice.",
          options: [
            { label: "Calling Prakhar", next: "end" },
            { label: "Texting someone", next: "end" },
            { label: "I don't want to talk", next: "sit" },
          ],
        },
        sit: {
          prompt: "Okay. Put on something familiar. Familiar show, familiar music. Let it hold you until it passes.",
          options: [{ label: "Done", next: "end" }],
        },
        end: {
          prompt: "It passed. You stayed. If this is more than twice a week, it's worth flagging — not now, later.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    7: {
      title: "Peer achievement sting",
      start: "name",
      nodes: {
        name: {
          prompt: "Name it:",
          sub: '"Sting first, then happiness. The sting is real."',
          options: [{ label: "Named it", next: "close_app" }],
        },
        close_app: {
          prompt: "Close Instagram / LinkedIn / Twitter for the next 30 minutes.",
          options: [
            { label: "Closing now", next: "action" },
            { label: "I need to finish something", next: "action" },
          ],
        },
        action: {
          prompt: "What is ONE thing you can do TODAY toward your own goal?",
          sub: "Small. Ten lines of code. One LeetCode. One paragraph.",
          type: "input",
          inputPlaceholder: "e.g. 10 lines on MTP",
          options: [{ label: "Set", next: "end" }],
        },
        end: {
          prompt: "Comparison turned into one concrete move. That's the trade.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    8: {
      title: "Prakhar hurt me",
      start: "notice",
      nodes: {
        notice: {
          prompt: "Notice what you WANT vs what you're ABOUT to do.",
          sub: "Want = direct. About to = hint / swallow / explode. Which is it?",
          options: [
            { label: "About to hint", next: "draft" },
            { label: "About to swallow", next: "draft" },
            { label: "I'm going direct", next: "format" },
          ],
        },
        draft: {
          prompt: "Then you're about to cancel your own ask. Not this time.",
          options: [{ label: "Okay — go direct", next: "format" }],
        },
        format: {
          prompt: "Within 24 hours, say:",
          sub: '"When you [specific action], I felt [specific emotion]." No "but it\'s fine." No "I don\'t expect you to do anything."',
          type: "input",
          inputPlaceholder: 'e.g. "When you joked about my crying, I felt dismissed."',
          options: [{ label: "I have my line", next: "response" }],
        },
        response: {
          prompt: "Whatever he says next — good response or bad — it's data, not a verdict.",
          sub: 'Good: he notices it, lands it, "thank you for hearing that." Bad: data on what he can hold right now.',
          options: [{ label: "Okay", next: "end" }],
        },
        end: {
          prompt: "You said the real thing. That's the whole move.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    9: {
      title: "Needing validation",
      start: "write",
      nodes: {
        write: {
          prompt: "Write it down exactly.",
          sub: '"I think X." "I feel Y." "I want Z."',
          options: [
            { label: "Opening journal", action: "open_journal" },
            { label: "I have it in my head", next: "read_back" },
          ],
        },
        read_back: {
          prompt: "Now read it back — to yourself.",
          sub: '"If my best friend told me this, would I tell her she\'s wrong?"',
          options: [
            { label: "No, I'd believe her", next: "trust" },
            { label: "Yes — something feels off", next: "ask" },
          ],
        },
        trust: {
          prompt: "Then trust yourself the same way you'd trust her.",
          sub: "Your read is probably right. Your pattern is doubting it, not the read itself.",
          options: [{ label: "Okay", next: "end" }],
        },
        ask: {
          prompt: "Ask someone — but consciously.",
          sub: '"I\'m seeking validation because I can\'t trust my own read right now." That awareness is most of the work.',
          options: [{ label: "Asking Prakhar", next: "end" }, { label: "Asking Claude", action: "open_claude" }],
        },
        end: {
          prompt: "Seeking validation with awareness ≠ outsourcing reality. You kept the reins.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    10: {
      title: "Unexplained crying",
      start: "let",
      nodes: {
        let: {
          prompt: "Let it happen. Don't fight. Don't shame.",
          sub: "It's a release. Not a problem to solve.",
          options: [{ label: "Crying", next: "after" }, { label: "It stopped", next: "after" }],
        },
        after: {
          prompt: "After — what were you doing, thinking, feeling 5 min before it started?",
          type: "input",
          inputPlaceholder: "best guess",
          options: [
            { label: "Wrote it", next: "ground" },
            { label: "Nothing — it was random", next: "ground" },
          ],
        },
        ground: {
          prompt: "Water. Wash your face. ONE grounding thing — textured object, step outside, strong smell.",
          options: [{ label: "Done", next: "no_skip" }],
        },
        no_skip: {
          prompt: "Rule for the rest of today:",
          sub: 'DO NOT skip a meal because "the day is ruined." The day is not ruined. You cried.',
          options: [{ label: "Okay", next: "end" }],
        },
        end: {
          prompt: "You let it pass through instead of fighting it. Nervous system thanks you.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    11: {
      title: "Abandoned another project",
      start: "name",
      nodes: {
        name: {
          prompt: "Name it:",
          sub: '"This is my beta/alpha disengagement pattern. Neurological, not moral."',
          options: [{ label: "Named it", next: "new_urge" }],
        },
        new_urge: {
          prompt: "Are you about to start a new project to feel the excitement again?",
          options: [
            { label: "Yes, actually", next: "warn_new" },
            { label: "No", next: "reopen" },
          ],
        },
        warn_new: {
          prompt: "That urge is the disease pretending to be the cure.",
          sub: "New = dopamine hit = feels like progress = fades = abandon. Don't start it today.",
          options: [{ label: "Okay, not today", next: "reopen" }],
        },
        reopen: {
          prompt: "Go back to the abandoned project. Just open it. 10 minutes.",
          options: [
            { label: "Opening it", next: "end" },
            { label: "10 is too much", next: "five" },
          ],
        },
        five: {
          prompt: "Five minutes. If can't — just open the file and look at it for 2 minutes.",
          options: [
            { label: "Opening", next: "end" },
            { label: "Really, it's dead", next: "mourn" },
          ],
        },
        mourn: {
          prompt: "Then mourn it honestly — it was a real thing. Pick something completable in 1–3 days max.",
          options: [{ label: "Okay", next: "end" }],
        },
        end: {
          prompt: "You treated the pattern, not the symptom.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    12: {
      title: "Amma said something that hurts",
      start: "recognize",
      nodes: {
        recognize: {
          prompt: "Recognize: you absorb her anxieties as yours.",
          options: [{ label: "Okay", next: "separate" }],
        },
        separate: {
          prompt: "Separate:",
          sub: '"Is this true about my life, or about her FEAR for my life?"',
          options: [
            { label: "Her fear", next: "say" },
            { label: "True about my life", next: "true" },
            { label: "Both", next: "say" },
          ],
        },
        true: {
          prompt: "Then take the part that's true and set the fear aside. Her fear is hers to hold.",
          options: [{ label: "Okay", next: "say" }],
        },
        say: {
          prompt: "Say:",
          sub: '"Amma, when you say [thing], it makes me feel [emotion]. I know you care, but right now I need encouragement, not worry."',
          options: [
            { label: "I'll say it", next: "check" },
            { label: "Can't — I'll write it down", action: "open_journal" },
          ],
        },
        check: {
          prompt: "Check in with yourself in an hour:",
          sub: "Am I restricting, scrolling harder, feeling undeserving? Maternal criticism is an entry point to the cycle.",
          options: [{ label: "I'll check", next: "end" }],
        },
        end: {
          prompt: "You didn't absorb the whole weather pattern. Her anxiety stayed hers.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    13: {
      title: "Call / visit ended — sadness",
      start: "name",
      nodes: {
        name: {
          prompt: "Name it:",
          sub: '"The happiness was real. The sadness is also real. I\'m grieving the gap between what I had and what I have the rest of the time."',
          options: [{ label: "Named it", next: "reject" }],
        },
        reject: {
          prompt: "Don't reject partial connection because it highlights what's missing.",
          sub: "If you pull away from the thing you need, you won't have it when you need it.",
          options: [{ label: "Okay", next: "move" }],
        },
        move: {
          prompt: "Physical activity — sadness lives in stillness.",
          options: [
            { label: "Walk", next: "gratitude" },
            { label: "Stretch", next: "gratitude" },
            { label: "Clean something", next: "gratitude" },
          ],
        },
        gratitude: {
          prompt: "Text them:",
          sub: '"I really enjoyed that. Thank you." Close the experience with gratitude.',
          options: [
            { label: "Sending now", next: "end" },
            { label: "Later", next: "end" },
          ],
        },
        end: {
          prompt: "You kept the connection warm instead of armoring against it.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    14: {
      title: "Guilt when doing something nice",
      start: "say",
      nodes: {
        say: {
          prompt: "Out loud:",
          sub: '"Rest is not a reward. Pleasure is not a payment. I am allowed to exist without producing."',
          options: [{ label: "Said it", next: "keep_going" }],
        },
        keep_going: {
          prompt: "KEEP DOING the nice thing. Don't stop mid-enjoyment.",
          sub: "Stopping teaches your brain that guilt wins. Finish the show. Eat the meal. Wear the outfit.",
          options: [{ label: "Continuing", next: "money" }],
        },
        money: {
          prompt: "If it's money-guilt:",
          sub: '"Can I afford this without hardship?" If yes → guilt is psychological, not financial.',
          options: [
            { label: "Yes I can afford it", next: "journal" },
            { label: "Not money-guilt", next: "journal" },
          ],
        },
        journal: {
          prompt: "Later, write it down:",
          sub: '"I did X. I felt guilty because Y. The truth is Z."',
          options: [
            { label: "Open journal", action: "open_journal" },
            { label: "I'll do it later", next: "end" },
          ],
        },
        end: {
          prompt: "Existence isn't conditional. You just practiced that.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    15: {
      title: "Feeling like a burden",
      start: "source",
      nodes: {
        source: {
          prompt: "Remember where this comes from.",
          sub: "Friends made your needs punishable. THEY were the problem. Not your needs.",
          options: [{ label: "Okay", next: "reread" }],
        },
        reread: {
          prompt: "Re-read what you sent / said.",
          sub: '"If a friend sent this to me, would I think she\'s too much?" Answer: no.',
          options: [
            { label: "Read it", next: "dont_apologize" },
            { label: "I don't want to", next: "dont_apologize" },
          ],
        },
        dont_apologize: {
          prompt: "Rule:",
          sub: 'DO NOT send a follow-up apology. DO NOT send "sorry for the long text lol." Let it stand.',
          options: [{ label: "Letting it stand", next: "warm" }],
        },
        warm: {
          prompt: "If they respond warmly — notice it.",
          sub: '"Thank you" instead of "sorry."',
          options: [{ label: "Got it", next: "end" }],
        },
        end: {
          prompt: "Your needs are legitimate. You sent them anyway. Repeat until it feels true.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
    16: {
      title: "Received a compliment",
      start: "full_stop",
      nodes: {
        full_stop: {
          prompt: "Say 'thank you.' Full stop.",
          sub: 'Not "oh stop." Not "no I\'m not." Not "haha thanks." Just thank you.',
          options: [{ label: "Said it", next: "sit" }],
        },
        sit: {
          prompt: "Sit with it for 10 seconds. Let the warmth exist without arguing.",
          sub: "Your internal voice will argue. Let it, don't obey it.",
          options: [{ label: "Sitting with it", next: "truth_add" }],
        },
        truth_add: {
          prompt: "Add it to the Truth List now — exact words, who said it, dated.",
          sub: "External memory. Counterweight to 'I don't believe compliments.' Read back on hard days.",
          options: [
            { label: "Add it now", action: "save_truth" },
            { label: "Later", next: "end" },
          ],
        },
        end: {
          prompt: "You let someone see you. That's the whole move.",
          options: [{ label: "Close", action: "close" }],
        },
      },
    },
    17: {
      title: '"I\'m just childish, I can\'t adult"',
      start: "callout",
      nodes: {
        callout: {
          prompt: "Babe. That's the shield.",
          sub: "You asked me to call this out. What's the actual thing you don't want to do?",
          type: "input",
          inputPlaceholder: "the actual thing",
          options: [{ label: "Named it", next: "underneath" }],
        },
        underneath: {
          prompt: "What's underneath?",
          options: [
            { label: "Fear of the adult task", next: "mature" },
            { label: "Don't want to accept consequences of maturing", next: "mature" },
            { label: "Avoidance that 'childish' protects", next: "mature" },
          ],
        },
        mature: {
          prompt: "What would the mature version of handling this look like?",
          type: "input",
          inputPlaceholder: "describe the mature move",
          options: [{ label: "Got it", next: "stop" }],
        },
        stop: {
          prompt: "What's stopping you from trying that — specifically?",
          type: "input",
          inputPlaceholder: "the specific blocker",
          options: [{ label: "Named", next: "one_step" }],
        },
        one_step: {
          prompt: "One small step toward the mature version. Today.",
          sub: "Absurdly small. Two minutes, one email, one line of the thing.",
          type: "input",
          inputPlaceholder: "the one tiny step",
          options: [{ label: "Set", next: "end" }],
        },
        end: {
          prompt: "You dropped the shield and named the thing. That's the maturing move itself.",
          options: [
            { label: "Add to Truth List", action: "save_truth" },
            { label: "Close", action: "close" },
          ],
        },
      },
    },
  },

  triage: {
    start: "bodymind",
    nodes: {
      bodymind: {
        prompt: "Okay. Where is it — body or mind?",
        options: [
          { label: "Body — something physical", next: "body" },
          { label: "Mind — a thought loop", next: "mind" },
          { label: "Both, at once", next: "mind" },
        ],
      },
      body: {
        prompt: "What's the body doing?",
        options: [
          { label: "Numb / not here / floaty", scenario: 6 },
          { label: "Tight chest / can't sit still", scenario: 5 },
          { label: "Crying", scenario: 10 },
          { label: "Urge to eat / just started", scenario: 2 },
          { label: "Don't want to eat at all", scenario: 1 },
        ],
      },
      mind: {
        prompt: "What's the mind doing?",
        options: [
          { label: "Looping about a person", next: "person" },
          { label: "Comparing to peers", scenario: 7 },
          { label: "Need someone to tell me this is real", scenario: 9 },
          { label: "Feeling like a burden", scenario: 15 },
          { label: 'Using "I\'m just childish"', scenario: 17 },
          { label: "Abandoned a project again", scenario: 11 },
          { label: "Sad after a call/visit ended", scenario: 13 },
          { label: "Guilty for something nice I did for myself", scenario: 14 },
          { label: "Got a compliment, can't hold it", scenario: 16 },
          { label: "Called my feelings nakhre/drama", scenario: 3 },
        ],
      },
      person: {
        prompt: "Which person?",
        options: [
          { label: "A friend going cold", scenario: 4 },
          { label: "Amma said something", scenario: 12 },
          { label: "Prakhar", scenario: 8 },
          { label: "Someone else", scenario: 5 },
        ],
      },
    },
  },

  myLanguage: [
    { id: "spiral-1",  section: "a", sectionLabel: "spiral vocabulary",      q: "FIRST phrase in your head when a spiral starts?", route: 5 },
    { id: "spiral-2",  section: "a", sectionLabel: "spiral vocabulary",      q: "What do you catch yourself typing mid-spiral?", route: 5 },
    { id: "spiral-3",  section: "a", sectionLabel: "spiral vocabulary",      q: 'The sentence you tell Prakhar that means "I\'m spiraling" without the word?', route: 5 },
    { id: "spiral-4",  section: "a", sectionLabel: "spiral vocabulary",      q: "Your Hinglish/Hindi for it? (dimaag kharab, etc.)", route: 5 },
    { id: "spiral-5",  section: "a", sectionLabel: "spiral vocabulary",      q: "When it's about a friend, the typed question you ask yourself?", route: 4 },
    { id: "rest-1",    section: "b", sectionLabel: "restriction language",   q: "What do you type/think before skipping a meal?", route: 1 },
    { id: "rest-2",    section: "b", sectionLabel: "restriction language",   q: '"You don\'t deserve this" — your actual words?', route: 1 },
    { id: "rest-3",    section: "b", sectionLabel: "restriction language",   q: "What do you tell yourself to justify the skip?", route: 1 },
    { id: "rest-4",    section: "b", sectionLabel: "restriction language",   q: "The word for the guilt after eating?", route: 1 },
    { id: "rest-5",    section: "b", sectionLabel: "restriction language",   q: 'Phrase meaning "this is starting again"?', route: 1 },
    { id: "binge-1",   section: "c", sectionLabel: "binge language",         q: "What do you call it? (binge/stuff/spiral-eat/other)", route: 2 },
    { id: "binge-2",   section: "c", sectionLabel: "binge language",         q: "Time it usually starts?" },
    { id: "binge-3",   section: "c", sectionLabel: "binge language",         q: "Which foods specifically?" },
    { id: "binge-4",   section: "c", sectionLabel: "binge language",         q: "What do you tell yourself WHILE bingeing?", route: 2 },
    { id: "binge-5",   section: "c", sectionLabel: "binge language",         q: "What do you tell yourself AFTER?", route: 2 },
    { id: "dis-1",     section: "d", sectionLabel: "dissociation",           q: "Which word do you use? (numb/zoned/gone/floaty/other)", route: 6 },
    { id: "dis-3",     section: "d", sectionLabel: "dissociation",           q: 'Phrase meaning "I\'m checking out"?', route: 6 },
    { id: "dis-4",     section: "d", sectionLabel: "dissociation",           q: "Do you narrate it? In what words?", route: 6 },
    { id: "dis-5",     section: "d", sectionLabel: "dissociation",           q: "What does Prakhar/Amma notice first?" },
    { id: "ch-1",      section: "e", sectionLabel: "childish shield",        q: "The exact line you reach for?", route: 17 },
    { id: "ch-2",      section: "e", sectionLabel: "childish shield",        q: "Which tasks do you most use it for?" },
    { id: "ch-3",      section: "e", sectionLabel: "childish shield",        q: "What would catching yourself sound like?" },
    { id: "ch-4",      section: "e", sectionLabel: "childish shield",        q: "The task usually underneath it?" },
    { id: "ch-5",      section: "e", sectionLabel: "childish shield",        q: "What WORDS actually land when someone calls it out?" },
    { id: "rel-1",     section: "f", sectionLabel: "relationship triggers",  q: "Word/phrase from Prakhar that triggers the nakhre wound?", route: 3 },
    { id: "rel-2",     section: "f", sectionLabel: "relationship triggers",  q: "What does Amma say that always makes you feel small?", route: 12 },
    { id: "rel-3",     section: "f", sectionLabel: "relationship triggers",  q: "What do Shikha/Sristi DO that sets off scanning?", route: 4 },
    { id: "rel-4",     section: "f", sectionLabel: "relationship triggers",  q: "Phrase you most hate being called?" },
    { id: "rel-5",     section: "f", sectionLabel: "relationship triggers",  q: "Phrase you most want to hear right now?" },
    { id: "warn-1",    section: "g", sectionLabel: "early warning signals",  q: "Before a spiral — what do you do with your phone?", route: 5 },
    { id: "warn-2",    section: "g", sectionLabel: "early warning signals",  q: "Before restricting — the 'last normal' action you drop?", route: 1 },
    { id: "warn-3",    section: "g", sectionLabel: "early warning signals",  q: "Before dissociation — physical tell?", route: 6 },
    { id: "warn-4",    section: "g", sectionLabel: "early warning signals",  q: "Before a 'childish' avoidance day — morning signature?", route: 17 },
    { id: "warn-5",    section: "g", sectionLabel: "early warning signals",  q: "Before a night binge — what did you skip that day?", route: 2 },
    { id: "help-1",    section: "h", sectionLabel: "what actually helps",    q: "What does Prakhar do that actually helps when it's bad?" },
    { id: "help-2",    section: "h", sectionLabel: "what actually helps",    q: "Song you actually play when spiraling?" },
    { id: "help-3",    section: "h", sectionLabel: "what actually helps",    q: "Food you actually eat when you let yourself?" },
    { id: "help-4",    section: "h", sectionLabel: "what actually helps",    q: "Whose text do you open first?" },
    { id: "help-5",    section: "h", sectionLabel: "what actually helps",    q: "Ritual or action that resets you?" },
    { id: "id-1",      section: "i", sectionLabel: "identity slips",         q: 'Phrase meaning "I\'m not myself today"?' },
    { id: "id-2",      section: "i", sectionLabel: "identity slips",         q: 'Phrase for "I miss who I used to be"?' },
    { id: "id-3",      section: "i", sectionLabel: "identity slips",         q: 'Phrase that means "I\'m doing okay actually"? (regulated signal)' },
    { id: "id-4",      section: "i", sectionLabel: "identity slips",         q: "What you call it when the day feels ruined?" },
    { id: "id-5",      section: "i", sectionLabel: "identity slips",         q: 'Your word for "mid" days?' },
    { id: "pat-1",     section: "j", sectionLabel: "patterns the app should catch", q: '"ugh" — what does it usually mean for you?' },
    { id: "pat-2",     section: "j", sectionLabel: "patterns the app should catch", q: '"idk" repeatedly — what does it mean?' },
    { id: "pat-3",     section: "j", sectionLabel: "patterns the app should catch", q: '"..." — what does it mean?' },
    { id: "pat-4",     section: "j", sectionLabel: "patterns the app should catch", q: "Type-then-delete — what do you do next?" },
    { id: "pat-5",     section: "j", sectionLabel: "patterns the app should catch", q: "A phrase only YOU would say that signals trouble?" },
  ],
};
