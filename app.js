// ============================================================
// SRIYA v3 — app.js
// Vanilla-JS PWA. Ports all v1 (sriya-home) render logic
// (renderHome, renderPlaybook, renderJournal, renderMe,
//  matchPattern, parseTask, flow engine) and adds new views:
// tasks pipeline, upsc, mtp, substack, books, exercise,
// travel, time-tracker, people, plus emoji picker + sheet UI.
// ============================================================

// ---------- utilities ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const escapeHTML = (str = "") =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

const _urlParams = new URLSearchParams(location.search);
const GUEST_NAME = _urlParams.get("guest") || "";
const IS_GUEST   = !!GUEST_NAME;
const NS = IS_GUEST ? `guest.${GUEST_NAME.toLowerCase()}.` : "sriya.v3.";
if (IS_GUEST) document.title = `${GUEST_NAME}'s space ✿`;
const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(NS + key);
    return v === null ? fallback : JSON.parse(v);
  } catch { return fallback; }
};
const save = (key, value) => {
  try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch {}
};
const today = () => new Date().toISOString().slice(0, 10);
const daysBetween = (a, b) => Math.floor((new Date(b) - new Date(a)) / 86400000);
const fmtDateLong = (iso) => {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
};
const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
const minToHuman = (mins) => {
  const h = Math.floor(mins / 60), m = Math.round(mins % 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr${h > 1 ? "s" : ""}`;
  return `${h}h ${m}m`;
};
const fmtHMS = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
};

// ---------- nav definition ----------
// Primary 5 (mobile bottom nav). The rest live in the "more" drawer.
const PRIMARY_NAV = [
  { view: "home",  label: "home",  icon: "home"  },
  { view: "tasks", label: "tasks", icon: "tasks" },
  { view: "timer", label: "timer", icon: "timer" },
  { view: "chat",  label: "chat",  icon: "chat"  },
  { view: "me",    label: "me",    icon: "me"    },
];
const MORE_NAV = [
  { view: "playbook", label: "playbook", icon: "playbook" },
  { view: "journal",  label: "journal",  icon: "journal"  },
  { view: "upsc",     label: "upsc",     icon: "upsc"     },
  { view: "mtp",      label: "mtp",      icon: "mtp"      },
  { view: "substack", label: "substack", icon: "substack" },
  { view: "books",    label: "books",    icon: "books"    },
  { view: "exercise", label: "exercise", icon: "exercise" },
  { view: "travel",   label: "travel",   icon: "travel"   },
  { view: "people",   label: "people",   icon: "people"   },
];
const ALL_NAV = [...PRIMARY_NAV, ...MORE_NAV];

// ---------- state ----------
const STATE = {
  theme:           load("theme", "light"),
  nonNegotiables:  load("nonNegotiables", null) || DATA.nonNegotiablesDefault.slice(),
  checks:          load("checks", {}),
  entries:         load("entries", []),
  truth:           load("truth", []),
  chat:            load("chat", []),
  blockStart:      load("blockStart", DATA.blockDefault.startDate),
  projects:        load("projects", DATA.projects.map(p => ({ ...p, status: "active" }))),
  writingIdeas:    load("writingIdeas", DATA.writingIdeas.map((w, i) => ({ id: i, title: w, status: "idea" }))),
  updates:         load("updates", []),
  rewards:         load("rewards", {}),
  tasks:           load("tasks", []),
  langAnswers:     load("langAnswers", {}),
  blockThemes:     load("blockThemes", DATA.blockDefault.days.slice()),
  blockLength:     load("blockLength", 15),
  blockRewards:    load("blockRewards", null) || DATA.rewards.slice(),
  blockDayStates:  load("blockDayStates", {}),
  nnCategoryOpen:  load("nnCategoryOpen", {}),
  nnCustomCats:    load("nnCustomCats", {}),   // { key: { emoji, label } }

  // ---------- v3 additions ----------
  people:          load("people", DATA.peopleDefault.slice()),
  upscSubjects:    load("upscSubjects", DATA.upscDefault.subjects.map(s => ({ ...s, notes: {} }))),
  upscResources:   load("upscResources", DATA.upscDefault.resources.slice()),
  upscStudyLog:    load("upscStudyLog", []),
  upscEssays:      load("upscEssays", []),
  upscGoal:        load("upscGoal", "2 hrs of polity revision"),
  upscReadProgress: load("upscReadProgress", {}),
  mtpPhases:       load("mtpPhases", DATA.mtpDefault.phases.slice()),
  mtpLabLog:       load("mtpLabLog", []),
  mtpSupervisor:   load("mtpSupervisor", []),
  substack:        load("substack", DATA.writingIdeas.slice(0,3).map((t,i) => ({ id: Date.now()+i, title: t, emoji: "💡", status: "idea", date: today(), words: 0 }))),
  books:           load("books", []),
  exerciseLog:     load("exerciseLog", []),
  travelVisited:   load("travelVisited", []),
  travelWishlist:  load("travelWishlist", []),
  timeLog:         load("timeLog", []),
  timer:           load("timer", null), // { startedAt, categoryId } or null
  timerCategories: load("timerCategories", null) || DATA.timerCategories.slice(),
  taskCategories:  load("taskCategories", {}),
  emojiRecent:     load("emojiRecent", []),

  // ephemeral
  flowInputs: {},
};

function persist() {
  const keys = [
    "theme","nonNegotiables","checks","entries","truth","chat","blockStart",
    "projects","writingIdeas","updates","rewards","tasks","langAnswers",
    "blockThemes","blockLength","blockRewards","blockDayStates","nnCategoryOpen","nnCustomCats",
    "people","upscSubjects","upscResources","upscStudyLog","upscEssays","upscGoal","upscReadProgress",
    "mtpPhases","mtpLabLog","mtpSupervisor","substack","books",
    "exerciseLog","travelVisited","travelWishlist","timeLog","timer","timerCategories","taskCategories","emojiRecent",
  ];
  keys.forEach(k => save(k, STATE[k]));
}

// ---------- theme ----------
function applyTheme() { document.documentElement.dataset.theme = STATE.theme; }

// ---------- toast ----------
function toast(text, kind = "") {
  const t = document.createElement("div");
  t.className = "toast " + kind;
  t.innerHTML = `<i class="ph ph-${kind === "success" ? "check-circle" : "info"}"></i> ${escapeHTML(text)}`;
  $("#toasts").appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(10px)"; }, 2400);
  setTimeout(() => t.remove(), 2900);
}

// ---------- nav ----------
function renderNav() {
  const activeView = (location.hash || "#home").replace("#", "").split("?")[0];
  const isPrimary = id => PRIMARY_NAV.some(p => p.view === id);

  const sidebarBtn = (item) => `
    <button class="nav-btn ${activeView === item.view ? "active" : ""}" data-view="${item.view}">
      ${NAV_ICONS[item.icon] || ""}
      <span>${item.label}</span>
    </button>`;
  $("#sidebar").innerHTML = `
    <div class="brand">
      <span class="brand-heart">${BRAND_HEART}</span>
      <span>sriya ✿</span>
    </div>
    ${ALL_NAV.map(sidebarBtn).join("")}
    <div class="sidebar-foot"><span style="color:var(--pink-deep);opacity:0.5;font-size:0.75rem">sriya v3</span></div>
  `;

  // Bottom tab bar: 5 primary + a "more" trigger.
  const tabBtn = (item) => `
    <button class="nav-btn ${activeView === item.view ? "active" : ""}" data-view="${item.view}">
      ${NAV_ICONS[item.icon] || ""}
      <span>${item.label}</span>
    </button>`;
  const moreActive = MORE_NAV.some(m => m.view === activeView);
  $("#tabbar").innerHTML = `
    ${PRIMARY_NAV.map(tabBtn).join("")}
    <button class="nav-btn ${moreActive ? "active" : ""}" id="open-more">
      ${NAV_ICONS.more}
      <span>more</span>
    </button>
  `;

  $$("[data-view]", $("#sidebar")).forEach(b =>
    b.addEventListener("click", () => location.hash = "#" + b.dataset.view));
  $$("[data-view]", $("#tabbar")).forEach(b =>
    b.addEventListener("click", () => location.hash = "#" + b.dataset.view));
  $("#open-more")?.addEventListener("click", openMoreDrawer);
}

function openMoreDrawer() {
  const o = $("#more-overlay");
  o.innerHTML = `
    <div class="sheet">
      <div class="sheet-head">
        <h3>more</h3>
        <button class="sheet-close" id="more-close"><i class="ph ph-x"></i></button>
      </div>
      <div class="tiles">
        ${MORE_NAV.map(m => `
          <button class="tile" data-go="${m.view}">
            ${NAV_ICONS[m.icon] || ""}
            <span class="label">${m.label}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
  o.classList.add("active");
  $("#more-close").addEventListener("click", () => o.classList.remove("active"));
  o.addEventListener("click", (e) => { if (e.target === o) o.classList.remove("active"); }, { once: true });
  $$("[data-go]", o).forEach(b => b.addEventListener("click", () => {
    location.hash = "#" + b.dataset.go;
    o.classList.remove("active");
  }));
}

// ---------- router ----------
const RENDERERS = {};
function route() {
  const name = (location.hash || "#home").replace("#", "").split("?")[0];
  $$(".view").forEach(v => v.classList.toggle("active", v.dataset.view === name));
  const render = RENDERERS[name];
  if (render) render();
  window.scrollTo({ top: 0, behavior: "instant" });
}

// ==========================================================
// CLOCK
// ==========================================================
let CLOCK_TIMER = null;
function renderClock(el) {
  if (!el) return;
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const h12 = ((h + 11) % 12) + 1;
  const ampm = h < 12 ? "am" : "pm";
  const minStr = String(m).padStart(2, "0");

  const dow = now.getDay();
  const sched = (DATA.schedule[dow] || []).slice().sort((a,b) => toMin(a.start) - toMin(b.start));
  const nowMin = h * 60 + m;
  let cue = null, block = null;
  const current = sched.find(s => nowMin >= toMin(s.start) && nowMin < toMin(s.end));
  const next = sched.find(s => toMin(s.start) > nowMin);
  if (current) {
    cue = { icon: current.kind === "class" ? "chalkboard-teacher" : "flask", text: `at ${current.label.toLowerCase()} until ${formatTime(current.end)}` };
  } else if (next) {
    const until = toMin(next.start) - nowMin;
    if (until <= 30) cue = { icon: "warning", text: `${next.label.toLowerCase()} in ${until} min — heads up` };
    else cue = { icon: "calendar-dots", text: `next: ${next.label.toLowerCase()} at ${formatTime(next.start)}` };
  } else if (sched.length === 0) {
    cue = { icon: "sun", text: "open day — your blocks are yours" };
  } else {
    cue = { icon: "moon", text: "day's schedule done" };
  }

  const _blkLen = Math.max(1, STATE.blockLength || 15);
  const dayN = Math.max(1, Math.min(_blkLen, daysBetween(STATE.blockStart, today()) + 1));
  const blockThemes = STATE.blockThemes && STATE.blockThemes.length ? STATE.blockThemes : DATA.blockDefault.days;
  const blockInfo = blockThemes.find(d => {
    const parts = d.days.split("–").map(Number);
    return dayN >= parts[0] && dayN <= (parts[1] || parts[0]);
  });
  block = blockInfo ? { n: dayN, label: blockInfo.label } : { n: dayN, label: "" };

  el.innerHTML = `
    <div class="clock-top">
      <span class="clock-time">${h12}:${minStr}</span>
      <span class="clock-ampm">${ampm}</span>
    </div>
    <div class="clock-date">${fmtDateLong()}</div>
    ${cue ? `<div class="clock-cue"><i class="ph-fill ph-${cue.icon}"></i> ${escapeHTML(cue.text)}</div>` : ""}
    ${block ? `<div class="clock-block"><i class="ph ph-star"></i> day ${block.n} / ${_blkLen}${block.label ? ` — <em>${escapeHTML(block.label)}</em>` : ""}</div>` : ""}
  `;
}
function formatTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = ((h + 11) % 12) + 1;
  const ampm = h < 12 ? "am" : "pm";
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// ==========================================================
// VIEW: HOME (verbatim port of v1 logic)
// ==========================================================
RENDERERS.home = function renderHome() {
  const t = today();
  STATE.checks[t] = STATE.checks[t] || {};
  const checks = STATE.checks[t];
  const list = STATE.nonNegotiables;
  const doneCount = list.filter(n => checks[n.id]).length;

  const blockLen = Math.max(1, STATE.blockLength || 15);
  const dayN = Math.max(1, Math.min(blockLen, daysBetween(STATE.blockStart, t) + 1));
  const daysGrid = Array.from({ length: blockLen }, (_, i) => {
    const n = i + 1;
    const manual = STATE.blockDayStates[n];
    let cls = "";
    if (manual === "done") cls = "done";
    else if (manual === "skip") cls = "skip";
    else if (manual === "today") cls = "today";
    else if (n < dayN) cls = "done";
    else if (n === dayN) cls = "today";
    return `<button class="day-dot ${cls}" data-day="${n}" title="day ${n}" aria-label="day ${n}"></button>`;
  }).join("");

  const currentBlockIdx = STATE.blockThemes.findIndex(d => {
    const parts = d.days.split("–").map(Number);
    return dayN >= parts[0] && dayN <= (parts[1] || parts[0]);
  });
  const blockRewards = STATE.blockRewards || DATA.rewards.slice();

  $("#view-home").innerHTML = `
    <div class="mb-3"><div class="clock-card" id="clock"></div></div>

    <button class="hero-btn" id="hero-triage">
      <span class="icon"><i class="ph-fill ph-sparkle"></i></span>
      <span style="flex:1">
        <span class="hero-title">something just hit?</span>
        <span class="hero-sub">two questions, then we walk through it together</span>
      </span>
      <i class="ph ph-arrow-right arrow"></i>
    </button>

    <div class="card mt-3">
      <div class="row-between mb-2">
        <div class="eyebrow"><i class="ph-fill ph-check-square"></i> today's non-negotiables</div>
        <span class="pill ${doneCount === list.length && list.length ? "mint" : ""}">${doneCount}/${list.length}</span>
      </div>
      <div class="stack" id="nn-list"></div>
      <div class="check-add mt-2" id="nn-add-row">
        <i class="ph ph-plus-circle" style="color:var(--pink-deep)"></i>
        <input type="text" id="nn-add-input" placeholder="add a new non-negotiable…" />
        <button class="btn tiny" id="nn-add-btn"><i class="ph ph-plus"></i> add</button>
      </div>
      <div class="row mt-1" style="gap:6px;align-items:center;flex-wrap:wrap">
        <select id="nn-add-cat-sel" style="flex:1;padding:5px 8px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--ink);font-size:0.82rem">
          ${Object.entries({ ...DATA.categories, ...(STATE.nnCustomCats||{}) }).map(([k,v]) =>
            `<option value="${k}">${v.emoji} ${v.label}</option>`
          ).join("")}
        </select>
        <button class="btn tiny ghost" id="nn-manage-cats-btn"><i class="ph ph-sliders"></i> manage categories</button>
      </div>
      <p class="tiny mt-2" style="color:var(--ink-faint)">tap to check · pencil to rename + change category</p>
    </div>

    <div class="card mt-3">
      <div class="row-between mb-2">
        <div class="eyebrow"><i class="ph-fill ph-calendar-dots"></i> ${blockLen}-day block</div>
        <button class="btn tiny ghost" id="block-edit-btn"><i class="ph ph-pencil-simple"></i> edit</button>
      </div>
      <p class="mt-1" style="font-size:0.92rem; color:var(--ink-soft)"><strong>day ${dayN} of ${blockLen}</strong>${currentBlockIdx >= 0 ? ` · <em>${escapeHTML(STATE.blockThemes[currentBlockIdx].label)}</em>` : ""}</p>
      <div class="block-bar"><div class="fill" style="width:${(dayN/blockLen)*100}%"></div></div>
      <div class="days-grid" id="days-grid">${daysGrid}</div>
      <p class="tiny mt-2" style="margin-top:10px; color:var(--ink-faint)">tap a day to toggle · <strong style="color:var(--pink-deep)">pink</strong>=done · <strong style="color:#7A5F1C">butter</strong>=skipped</p>
      <div id="block-edit-panel" class="hidden mt-2"></div>
    </div>

    <div class="card mt-3">
      <div class="row-between mb-2">
        <div class="eyebrow"><i class="ph-fill ph-gift"></i> rewards waiting</div>
        <button class="btn tiny ghost" id="rewards-edit-btn"><i class="ph ph-pencil-simple"></i> edit</button>
      </div>
      <div class="stack" style="gap:8px" id="rewards-list">
        ${blockRewards.map((r, i) => {
          // Check if linked NNs are all done today
          const linkedIds = r.linkedNNs || [];
          const todayChecks = STATE.checks[t] || {};
          const linkedDone = linkedIds.length > 0 && linkedIds.every(id => todayChecks[id]);
          const linkedLabels = linkedIds.map(id => {
            const nn = STATE.nonNegotiables.find(n => n.id === id);
            return nn ? `${renderIconVal(nn.emoji)} ${nn.label}` : "";
          }).filter(Boolean);
          return `<label class="check ${STATE.rewards[i] ? "done" : linkedDone ? "linked-done" : ""}" data-reward="${i}">
            <span class="cute-box"><i class="ph-fill ph-check"></i></span>
            <div style="flex:1">
              <div class="title" style="font-size:0.88rem">${escapeHTML(r.if)}</div>
              <div class="hint">earns: ${escapeHTML(r.then)}</div>
              ${linkedLabels.length ? `<div class="hint" style="color:var(--pink-deep);margin-top:2px"><i class="ph ph-link"></i> ${linkedLabels.join(" · ")}</div>` : ""}
            </div>
            ${linkedDone && !STATE.rewards[i] ? `<span class="pill mint" style="font-size:0.7rem">unlocked!</span>` : ""}
          </label>`;
        }).join("")}
      </div>
      <div id="rewards-edit-panel" class="hidden mt-2"></div>
    </div>

    <div class="card mt-3 pop">
      <div class="row-between">
        <div>
          <div class="eyebrow mb-1"><i class="ph-fill ph-sparkle"></i> bestie claude</div>
          <p class="muted" style="font-size:0.9rem">copies the bestie prompt to clipboard, opens claude.ai.</p>
        </div>
        <button class="btn primary" id="open-claude"><i class="ph ph-sparkle"></i> open</button>
      </div>
    </div>
  `;

  renderClock($("#clock"));
  if (CLOCK_TIMER) clearInterval(CLOCK_TIMER);
  CLOCK_TIMER = setInterval(() => {
    const c = $("#clock"); if (c && document.body.contains(c)) renderClock(c);
  }, 30000);

  renderNonNegList();
  $("#hero-triage").addEventListener("click", () => startTriage());
  $("#open-claude").addEventListener("click", openBestieClaude);

  $$("[data-reward]", $("#view-home")).forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const i = +el.dataset.reward;
      STATE.rewards[i] = !STATE.rewards[i];
      persist(); RENDERERS.home();
    });
  });

  $("#rewards-edit-btn")?.addEventListener("click", () => {
    const panel = $("#rewards-edit-panel");
    if (!panel.classList.contains("hidden")) { panel.classList.add("hidden"); panel.innerHTML = ""; return; }
    panel.classList.remove("hidden");
    renderRewardsEditPanel(panel);
  });

  $("#nn-add-btn").addEventListener("click", addNonNegotiable);
  $("#nn-add-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); addNonNegotiable(); }
  });
  $("#nn-manage-cats-btn")?.addEventListener("click", () => openNNCategoryManager());

  $$("[data-day]", $("#view-home")).forEach(d => {
    d.addEventListener("click", () => {
      const n = +d.dataset.day;
      const cur = STATE.blockDayStates[n];
      const next = cur === "done" ? "skip" : cur === "skip" ? null : "done";
      if (next === null) delete STATE.blockDayStates[n];
      else STATE.blockDayStates[n] = next;
      persist(); RENDERERS.home();
    });
  });

  $("#block-edit-btn").addEventListener("click", () => {
    const panel = $("#block-edit-panel");
    if (!panel.classList.contains("hidden")) { panel.classList.add("hidden"); panel.innerHTML = ""; return; }
    panel.classList.remove("hidden");
    renderBlockEditPanel(panel);
  });
};

function renderBlockEditPanel(panel) {
  const bl = Math.max(1, STATE.blockLength || 15);
  panel.innerHTML = `
    <div class="mt-2" style="border-top:1px dashed var(--border); padding-top:12px">
      <div class="eyebrow mb-2"><i class="ph ph-pencil-line"></i> edit block</div>

      <div class="row mb-3" style="gap:12px; flex-wrap:wrap; align-items:flex-end">
        <label style="flex:1; min-width:120px; font-size:0.82rem; color:var(--ink-soft)">
          number of days
          <input type="number" id="block-len-input" min="1" max="100" value="${bl}"
            style="display:block; width:100%; margin-top:4px; padding:6px 10px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.95rem" />
        </label>
        <label style="flex:2; min-width:160px; font-size:0.82rem; color:var(--ink-soft)">
          start date
          <input type="date" id="block-start-input" value="${STATE.blockStart}"
            style="display:block; width:100%; margin-top:4px; padding:6px 10px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.95rem" />
        </label>
      </div>

      <div class="eyebrow-tiny mb-1" style="font-size:0.72rem; color:var(--ink-faint); text-transform:uppercase; letter-spacing:.05em">day themes / labels</div>
      <p style="font-size:0.78rem; color:var(--ink-faint); margin-bottom:8px">each label covers a range of days, e.g. <code>1–5</code></p>
      <div id="block-themes-editor" style="display:flex; flex-direction:column; gap:6px">
        ${STATE.blockThemes.map((b, i) => `
          <div class="block-edit-row" data-theme-row="${i}" style="gap:6px">
            <input type="text" class="block-days-inp" placeholder="days e.g. 1–5" value="${escapeHTML(b.days)}"
              style="width:80px; flex-shrink:0; padding:5px 8px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.85rem" />
            <input type="text" class="block-label-inp" placeholder="label for these days" value="${escapeHTML(b.label)}"
              style="flex:1; padding:5px 8px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.85rem" />
            <button class="btn tiny ghost" data-del-theme="${i}" title="remove" style="padding:4px 8px; flex-shrink:0"><i class="ph ph-trash"></i></button>
          </div>
        `).join("")}
      </div>
      <button class="btn tiny mt-2" id="block-add-theme"><i class="ph ph-plus"></i> add label</button>

      <div class="row mt-3" style="gap:8px; flex-wrap:wrap">
        <button class="btn tiny primary" id="block-save-btn"><i class="ph ph-floppy-disk"></i> save</button>
        <button class="btn tiny ghost" id="block-reset"><i class="ph ph-arrow-counter-clockwise"></i> reset day marks</button>
      </div>
    </div>
  `;

  // Save handler
  $("#block-save-btn", panel).addEventListener("click", () => {
    const newLen = parseInt($("#block-len-input", panel).value, 10);
    if (newLen >= 1 && newLen <= 100) STATE.blockLength = newLen;
    STATE.blockStart = $("#block-start-input", panel).value;
    // Collect themes from inputs
    const rows = $$("[data-theme-row]", panel);
    STATE.blockThemes = rows.map(row => ({
      days: $(".block-days-inp", row).value.trim(),
      label: $(".block-label-inp", row).value.trim(),
    })).filter(b => b.days);
    persist(); RENDERERS.home();
  });

  // Add theme row
  $("#block-add-theme", panel).addEventListener("click", () => {
    const editor = $("#block-themes-editor", panel);
    const idx = $$("[data-theme-row]", panel).length;
    const row = document.createElement("div");
    row.className = "block-edit-row";
    row.dataset.themeRow = idx;
    row.style.cssText = "gap:6px";
    row.innerHTML = `
      <input type="text" class="block-days-inp" placeholder="e.g. 16–20"
        style="width:80px; flex-shrink:0; padding:5px 8px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.85rem" />
      <input type="text" class="block-label-inp" placeholder="label for these days"
        style="flex:1; padding:5px 8px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.85rem" />
      <button class="btn tiny ghost" data-del-theme="${idx}" title="remove" style="padding:4px 8px; flex-shrink:0"><i class="ph ph-trash"></i></button>
    `;
    row.querySelector("[data-del-theme]").addEventListener("click", () => row.remove());
    editor.appendChild(row);
    row.querySelector(".block-days-inp").focus();
  });

  // Delete existing rows
  $$("[data-del-theme]", panel).forEach(btn =>
    btn.addEventListener("click", () => btn.closest("[data-theme-row]").remove()));

  // Reset day marks
  $("#block-reset", panel).addEventListener("click", () => {
    if (confirm("Clear all day marks? (labels stay)")) {
      STATE.blockDayStates = {}; persist(); RENDERERS.home();
    }
  });
}

function rewardRowHTML(r, i) {
  const nnOpts = STATE.nonNegotiables.map(n =>
    `<option value="${escapeHTML(n.id)}" ${(r.linkedNNs||[]).includes(n.id) ? "selected" : ""}>${renderIconVal(n.emoji)} ${escapeHTML(n.label)}</option>`
  ).join("");
  return `
    <div class="block-edit-row" data-reward-row="${i}" style="gap:6px; align-items:flex-start; flex-direction:column; padding:10px 12px">
      <div style="width:100%; display:flex; gap:6px; align-items:flex-start">
        <div style="flex:1; display:flex; flex-direction:column; gap:4px">
          <input type="text" class="reward-if-inp" placeholder="condition (if I do...)" value="${escapeHTML(r.if||"")}"
            style="width:100%; padding:5px 8px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.85rem" />
          <input type="text" class="reward-then-inp" placeholder="reward (I earn...)" value="${escapeHTML(r.then||"")}"
            style="width:100%; padding:5px 8px; border:1.5px solid var(--pink); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.85rem" />
        </div>
        <button class="btn tiny ghost" data-del-reward="${i}" title="remove" style="padding:4px 8px; margin-top:2px; flex-shrink:0"><i class="ph ph-trash"></i></button>
      </div>
      ${STATE.nonNegotiables.length ? `
        <details style="width:100%">
          <summary style="font-size:0.78rem; color:var(--ink-soft); cursor:pointer"><i class="ph ph-link"></i> link to non-negotiables ${(r.linkedNNs||[]).length ? `(${(r.linkedNNs||[]).length} linked)` : ""}</summary>
          <select class="reward-nn-sel" multiple style="width:100%; margin-top:6px; padding:4px; border:1.5px solid var(--border); border-radius:8px; background:var(--bg-card); color:var(--ink); font-size:0.82rem; max-height:120px">
            ${nnOpts}
          </select>
          <p style="font-size:0.72rem; color:var(--ink-faint); margin-top:4px">hold Ctrl/Cmd to select multiple · reward auto-unlocks when all linked NNs are done</p>
        </details>
      ` : ""}
    </div>
  `;
}

function renderRewardsEditPanel(panel) {
  const rewards = STATE.blockRewards || DATA.rewards.slice();
  panel.innerHTML = `
    <div class="mt-2" style="border-top:1px dashed var(--border); padding-top:12px">
      <div class="eyebrow mb-2"><i class="ph ph-gift"></i> edit rewards</div>
      <div id="rewards-editor" style="display:flex; flex-direction:column; gap:8px">
        ${rewards.map((r, i) => rewardRowHTML(r, i)).join("")}
      </div>
      <button class="btn tiny mt-2" id="rewards-add-btn"><i class="ph ph-plus"></i> add reward</button>
      <div class="row mt-3" style="gap:8px">
        <button class="btn tiny primary" id="rewards-save-btn"><i class="ph ph-floppy-disk"></i> save</button>
      </div>
    </div>
  `;

  $$("[data-del-reward]", panel).forEach(btn =>
    btn.addEventListener("click", () => btn.closest("[data-reward-row]").remove()));

  $("#rewards-add-btn", panel).addEventListener("click", () => {
    const editor = $("#rewards-editor", panel);
    const idx = $$("[data-reward-row]", panel).length;
    const div = document.createElement("div");
    div.innerHTML = rewardRowHTML({ if: "", then: "", linkedNNs: [] }, idx);
    const row = div.firstElementChild;
    row.querySelector("[data-del-reward]").addEventListener("click", () => row.remove());
    editor.appendChild(row);
    row.querySelector(".reward-if-inp").focus();
  });

  // Save
  $("#rewards-save-btn", panel).addEventListener("click", () => {
    const rows = $$("[data-reward-row]", panel);
    STATE.blockRewards = rows.map(row => {
      const sel = row.querySelector(".reward-nn-sel");
      const linkedNNs = sel ? [...sel.selectedOptions].map(o => o.value) : [];
      return {
        if: $(".reward-if-inp", row).value.trim(),
        then: $(".reward-then-inp", row).value.trim(),
        linkedNNs,
      };
    }).filter(r => r.if || r.then);
    STATE.rewards = {};
    persist(); RENDERERS.home();
  });
}

function renderNonNegList() {
  const t = today();
  const checks = STATE.checks[t] || {};
  const host = $("#nn-list");
  if (!host) return;

  const byCat = {};
  STATE.nonNegotiables.forEach((n, idx) => {
    const cat = n.category || "general";
    if (!byCat[cat]) byCat[cat] = [];
    byCat[cat].push({ ...n, idx });
  });
  const catOrder = ["meds", "nutrition", "movement", "mind", "career", "relationships", "home", "rest", "general"];
  const cats = Object.keys(byCat).sort((a, b) => {
    const ia = catOrder.indexOf(a), ib = catOrder.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  host.innerHTML = cats.map(catKey => {
    const meta = DATA.categories[catKey] || (STATE.nnCustomCats || {})[catKey] || { emoji: "⭐", label: catKey };
    const items = byCat[catKey];
    const doneN = items.filter(it => checks[it.id]).length;
    const complete = doneN === items.length;
    const isOpen = STATE.nnCategoryOpen[catKey] !== false && !complete;
    const catIconHTML = DATA.categories[catKey] ? categoryIcon(catKey) : `<span style="font-size:1.1rem">${renderIconVal(meta.emoji)}</span>`;
    return `
      <div class="nn-group ${isOpen ? "open" : ""}" data-cat="${catKey}">
        <div class="nn-group-header" data-toggle-cat="${catKey}">
          <span class="nn-group-emoji">${catIconHTML}</span>
          <span class="nn-group-title">${escapeHTML(meta.label)}</span>
          <span class="nn-group-count ${complete ? "complete" : ""}">${doneN}/${items.length}</span>
          <i class="ph ph-caret-right nn-group-caret"></i>
        </div>
        <div class="nn-group-body">
          ${items.map(n => `
            <label class="check ${checks[n.id] ? "done" : ""}" data-check="${n.id}" data-idx="${n.idx}">
              <span class="cute-box"><i class="ph-fill ph-check"></i></span>
              <span class="emoji" data-nn-emoji="${n.idx}" title="change icon">${renderIconVal(n.emoji)}</span>
              <div style="flex:1">
                <div class="title">${escapeHTML(n.label)}</div>
                ${n.hint ? `<div class="hint">${escapeHTML(n.hint)}</div>` : ""}
              </div>
              <div class="check-actions" onclick="event.stopPropagation()">
                <button data-nn-up="${n.idx}" title="move up"><i class="ph ph-arrow-up"></i></button>
                <button data-nn-down="${n.idx}" title="move down"><i class="ph ph-arrow-down"></i></button>
                <button data-nn-edit="${n.idx}" title="rename"><i class="ph ph-pencil-simple"></i></button>
                <button data-nn-del="${n.idx}" title="delete"><i class="ph ph-trash"></i></button>
              </div>
            </label>
          `).join("")}
        </div>
      </div>`;
  }).join("");

  $$("[data-toggle-cat]", host).forEach(el => el.addEventListener("click", () => {
    const cat = el.dataset.toggleCat;
    const group = el.closest(".nn-group");
    const wasOpen = group.classList.contains("open");
    group.classList.toggle("open");
    STATE.nnCategoryOpen[cat] = !wasOpen;
    persist();
  }));

  $$("[data-check]", host).forEach(el => el.addEventListener("click", (e) => {
    if (e.target.closest("[data-nn-up],[data-nn-down],[data-nn-edit],[data-nn-del],[data-nn-emoji]")) return;
    e.preventDefault();
    const id = el.dataset.check;
    const checks = (STATE.checks[today()] = STATE.checks[today()] || {});
    checks[id] = !checks[id];
    persist(); RENDERERS.home();
  }));

  $$("[data-nn-up]", host).forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const i = +b.dataset.nnUp;
    if (i > 0) {
      [STATE.nonNegotiables[i-1], STATE.nonNegotiables[i]] = [STATE.nonNegotiables[i], STATE.nonNegotiables[i-1]];
      persist(); renderNonNegList();
    }
  }));
  $$("[data-nn-down]", host).forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const i = +b.dataset.nnDown;
    if (i < STATE.nonNegotiables.length - 1) {
      [STATE.nonNegotiables[i+1], STATE.nonNegotiables[i]] = [STATE.nonNegotiables[i], STATE.nonNegotiables[i+1]];
      persist(); renderNonNegList();
    }
  }));
  $$("[data-nn-edit]", host).forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const i = +b.dataset.nnEdit;
    const cur = STATE.nonNegotiables[i];
    const allCats = { ...DATA.categories, ...STATE.nnCustomCats };
    openSheet("edit item", `
      <form id="nn-edit-form">
        <div>
          <label>icon / emoji</label>
          <div id="nn-icon-pal"></div>
        </div>
        <div>
          <label>label</label>
          <input type="text" id="nn-edit-label" value="${escapeHTML(cur.label)}" required />
        </div>
        <div>
          <label>hint <span class="muted">(optional)</span></label>
          <input type="text" id="nn-edit-hint" value="${escapeHTML(cur.hint || "")}" placeholder="e.g. 1500mg with food" />
        </div>
        <div>
          <label>category</label>
          <div class="field-row" style="flex-wrap:wrap;gap:6px">
            <select id="nn-edit-cat" style="flex:1">
              ${Object.entries(allCats).map(([k,v]) =>
                `<option value="${k}" ${cur.category===k?"selected":""}>${v.emoji} ${v.label}</option>`
              ).join("")}
            </select>
            <button type="button" class="btn tiny ghost" id="nn-add-cat-btn"><i class="ph ph-plus"></i> new category</button>
          </div>
          <div id="nn-new-cat-form" class="hidden mt-1" style="display:none">
            <div class="field-row" style="gap:6px;flex-wrap:wrap">
              <div id="nn-cat-icon-pal" style="width:100%"></div>
              <input type="text" id="nn-new-cat-label" placeholder="category name" style="flex:1;padding:6px 10px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--ink)" />
              <button type="button" class="btn tiny primary" id="nn-save-cat-btn"><i class="ph ph-check"></i> add</button>
            </div>
          </div>
        </div>
        <div class="row-end mt-2">
          <button type="submit" class="btn primary"><i class="ph ph-check"></i> save</button>
        </div>
      </form>
    `, (root) => {
      let pickedIcon = cur.emoji || "⭐";
      let pickedCatIcon = "⭐";
      renderIconPalette($("#nn-icon-pal", root), pickedIcon, (v) => { pickedIcon = v; });

      $("#nn-add-cat-btn", root).addEventListener("click", () => {
        const f = $("#nn-new-cat-form", root);
        f.style.display = f.style.display === "none" ? "block" : "none";
        if (f.style.display === "block" && !f.dataset.palRendered) {
          renderIconPalette($("#nn-cat-icon-pal", root), pickedCatIcon, (v) => { pickedCatIcon = v; });
          f.dataset.palRendered = "1";
        }
      });
      $("#nn-save-cat-btn", root).addEventListener("click", () => {
        const label = $("#nn-new-cat-label", root).value.trim();
        if (!label) return;
        const key = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        STATE.nnCustomCats[key] = { emoji: pickedCatIcon, label };
        persist();
        // Refresh select
        const sel = $("#nn-edit-cat", root);
        const opt = document.createElement("option");
        opt.value = key; opt.textContent = `${pickedCatIcon} ${label}`; opt.selected = true;
        sel.appendChild(opt);
        $("#nn-new-cat-form", root).style.display = "none";
        toast("category added", "success");
      });

      $("#nn-edit-form", root).addEventListener("submit", (ev) => {
        ev.preventDefault();
        const label = $("#nn-edit-label", root).value.trim();
        const hint  = $("#nn-edit-hint", root).value.trim();
        const cat   = $("#nn-edit-cat", root).value;
        if (!label) return;
        cur.label = label;
        cur.emoji = pickedIcon;
        cur.category = cat;
        if (hint) cur.hint = hint; else delete cur.hint;
        persist(); closeSheet(); renderNonNegList();
      });
    });
  }));
  $$("[data-nn-del]", host).forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const i = +b.dataset.nnDel;
    if (confirm(`Remove "${STATE.nonNegotiables[i].label}"?`)) {
      STATE.nonNegotiables.splice(i, 1);
      persist(); RENDERERS.home();
    }
  }));
  $$("[data-nn-emoji]", host).forEach(el => el.addEventListener("click", (e) => {
    e.stopPropagation(); e.preventDefault();
    const i = +el.dataset.nnEmoji;
    // Use the full edit sheet for icon changes (has the palette)
    const b = host.querySelector(`[data-nn-edit="${i}"]`);
    if (b) b.click();
  }));
}

function addNonNegotiable() {
  const input = $("#nn-add-input");
  const val = input.value.trim();
  if (!val) return;
  const id = val.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36).slice(-4);
  const lower = val.toLowerCase();
  // Use selected category, or auto-detect
  const catSel = $("#nn-add-cat-sel");
  let category = catSel ? catSel.value : "general";
  let emoji = (DATA.categories[category] || STATE.nnCustomCats[category] || {}).emoji || "⭐";
  // Auto-detect only if still on "general"
  if (category === "general") {
    if (/meds?|pill|vitamin|supplement|iron/.test(lower)) { emoji = "💊"; category = "meds"; }
    else if (/breakfast|lunch|dinner|eat|meal|milk|food|water/.test(lower)) { emoji = "🍽️"; category = "nutrition"; }
    else if (/workout|gym|walk|run|stretch|yoga/.test(lower)) { emoji = "💪"; category = "movement"; }
    else if (/meditat|journal|reflect/.test(lower)) { emoji = "🧘‍♀️"; category = "mind"; }
    else if (/linkedin|lab|class|attendance|work/.test(lower)) { emoji = "💼"; category = "career"; }
    else if (/call|text|prakhar|amma|friend/.test(lower)) { emoji = "📞"; category = "relationships"; }
    else if (/clean|room|laundry|home|tidy/.test(lower)) { emoji = "🏠"; category = "home"; }
    else if (/skin|sleep|rest|bed/.test(lower)) { emoji = "🌙"; category = "rest"; }
  }
  STATE.nonNegotiables.push({ id, label: val, emoji, category });
  input.value = "";
  persist(); RENDERERS.home();
}

// ==========================================================
// NN CATEGORY MANAGER
// ==========================================================
function openNNCategoryManager() {
  const allCats = { ...DATA.categories, ...STATE.nnCustomCats };
  const root = document.createElement("div");
  root.className = "sheet";

  function buildHTML() {
    return `
      <div class="sheet-head">
        <h3>manage categories</h3>
        <button class="sheet-close" id="nncm-close"><i class="ph ph-x"></i></button>
      </div>
      <div class="sheet-body">
        <div class="eyebrow-tiny mb-1" style="font-size:0.72rem;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.05em">built-in</div>
        ${Object.entries(DATA.categories).map(([k,v]) => `
          <div class="tcat-row">
            <span class="tcat-emoji">${v.emoji}</span>
            <span class="tcat-label">${v.label}</span>
            <span class="tcat-count">${STATE.nonNegotiables.filter(n=>n.category===k).length} NNs</span>
          </div>
        `).join("")}
        <div class="eyebrow-tiny mt-3 mb-1" style="font-size:0.72rem;color:var(--ink-faint);text-transform:uppercase;letter-spacing:.05em">custom</div>
        <div id="nncm-custom-list">
          ${Object.keys(STATE.nnCustomCats).length ? Object.entries(STATE.nnCustomCats).map(([k,v]) => `
            <div class="tcat-row" data-ccat="${k}">
              <span class="tcat-emoji" style="font-size:1.1rem">${renderIconVal(v.emoji)}</span>
              <span class="tcat-label">${v.label}</span>
              <span class="tcat-count">${STATE.nonNegotiables.filter(n=>n.category===k).length} NNs</span>
              <div class="tcat-actions">
                <button class="btn tiny ghost" data-ccat-del="${k}" title="delete"><i class="ph ph-trash"></i></button>
              </div>
            </div>
          `).join("") : `<p class="tiny" style="color:var(--ink-faint)">no custom categories yet.</p>`}
        </div>
        <div class="mt-3" style="border-top:1px dashed var(--border);padding-top:12px">
          <div class="eyebrow mb-2">add new category</div>
          <div id="nncm-new-icon-pal"></div>
          <input type="text" id="nncm-new-label" placeholder="category name" style="width:100%;margin-top:8px;padding:7px 10px;border:1.5px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--ink)" />
          <button class="btn primary mt-2" id="nncm-add-btn"><i class="ph ph-plus"></i> add category</button>
        </div>
      </div>
    `;
  }

  root.innerHTML = buildHTML();
  const overlay = $("#sheet-overlay");
  overlay.innerHTML = ""; overlay.appendChild(root); overlay.classList.add("active");

  let newCatIcon = "⭐";
  renderIconPalette($("#nncm-new-icon-pal", root), newCatIcon, (v) => { newCatIcon = v; });

  $("#nncm-close", root).addEventListener("click", () => { overlay.classList.remove("active"); overlay.innerHTML = ""; });

  $$("[data-ccat-del]", root).forEach(btn => btn.addEventListener("click", () => {
    const k = btn.dataset.ccatDel;
    if (confirm(`Delete category "${STATE.nnCustomCats[k]?.label}"? NNs in it move to general.`)) {
      STATE.nonNegotiables.forEach(n => { if (n.category === k) n.category = "general"; });
      delete STATE.nnCustomCats[k];
      persist();
      root.innerHTML = buildHTML();
      newCatIcon = "⭐";
      renderIconPalette($("#nncm-new-icon-pal", root), newCatIcon, (v) => { newCatIcon = v; });
      wireButtons();
    }
  }));

  function wireButtons() {
    $("#nncm-close", root).addEventListener("click", () => { overlay.classList.remove("active"); overlay.innerHTML = ""; });
    $$("[data-ccat-del]", root).forEach(btn => btn.addEventListener("click", () => {
      const k = btn.dataset.ccatDel;
      if (confirm(`Delete category "${STATE.nnCustomCats[k]?.label}"? NNs in it move to general.`)) {
        STATE.nonNegotiables.forEach(n => { if (n.category === k) n.category = "general"; });
        delete STATE.nnCustomCats[k];
        persist();
        root.innerHTML = buildHTML();
        newCatIcon = "⭐";
        renderIconPalette($("#nncm-new-icon-pal", root), newCatIcon, (v) => { newCatIcon = v; });
        wireButtons();
      }
    }));
    $("#nncm-add-btn", root)?.addEventListener("click", () => {
      const label = ($("#nncm-new-label", root)?.value || "").trim();
      if (!label) { toast("enter a name"); return; }
      const key = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      STATE.nnCustomCats[key] = { emoji: newCatIcon, label };
      persist();
      toast("category added", "success");
      root.innerHTML = buildHTML();
      newCatIcon = "⭐";
      renderIconPalette($("#nncm-new-icon-pal", root), newCatIcon, (v) => { newCatIcon = v; });
      wireButtons();
    });
  }
  wireButtons();
}

// ==========================================================
// QUICK ICON / EMOJI PALETTE
// ==========================================================
// Pink Phosphor icon names (outline style, rendered pink)
const PINK_ICONS = [
  "heart","sparkle","star","flower-lotus","butterfly","moon-stars","sun","cloud",
  "rainbow","leaf","rose","snowflake","fire","lightning","wind","drop",
  "music-notes","headphones","palette","pen","book-open","graduation-cap",
  "brain","dna","flask","atom","planet","rocket","airplane","bicycle",
  "running","barbell","yoga","carrot","bowl-food","apple-logo","coffee",
  "moon","bed","shower","pill","bandaids","heart-pulse","syringe",
  "laptop","code","terminal","globe","chat-circle","phone","camera",
  "gift","balloon","confetti","crown","trophy","medal","flag",
  "house","door","plant","cat","dog","bird","fish","rabbit",
  "clock","calendar","check-circle","bell","lock","key","magnifying-glass",
];

// Cute emoji quick-picks (pink/kawaii theme)
const PINK_EMOJIS = [
  "🌸","🌺","🌷","🌹","💐","🌼","🌻","🌿","🍀","🌱",
  "✨","💫","⭐","🌟","💥","🔥","❄️","🌊","☁️","🌈",
  "💖","💗","💓","💕","💞","❤️","🧡","💛","💚","💙",
  "🦋","🐝","🌙","☀️","🌙","💎","🪷","🍄","🫧","🌀",
  "🎀","🎁","🎊","🎉","🎵","🎶","🎨","📚","✏️","💡",
  "🍰","🧁","🍓","🍒","🍇","🍑","🍋","🧋","☕","🍵",
];

// Render a quick icon/emoji strip + full picker button inside a container element
function renderIconPalette(container, currentVal, onChange) {
  const isIcon = typeof currentVal === "string" && !currentVal.match(/\p{Emoji}/u);
  container.innerHTML = `
    <div class="icon-pal-wrap">
      <div class="icon-pal-tabs">
        <button class="icon-pal-tab ${!isIcon ? "active" : ""}" data-pal="emoji">emoji</button>
        <button class="icon-pal-tab ${isIcon ? "active" : ""}" data-pal="ph">icons</button>
      </div>
      <div class="icon-pal-body" id="ipal-body"></div>
      <button class="btn tiny ghost mt-1" id="ipal-full-search"><i class="ph ph-magnifying-glass"></i> search all emoji</button>
    </div>
  `;
  let mode = isIcon ? "ph" : "emoji";

  function renderPal() {
    const body = $("#ipal-body", container);
    if (mode === "emoji") {
      body.innerHTML = PINK_EMOJIS.map(e =>
        `<button class="ipal-item ${currentVal === e ? "active" : ""}" data-pick="${e}" title="${e}">${e}</button>`
      ).join("");
    } else {
      body.innerHTML = PINK_ICONS.map(ic =>
        `<button class="ipal-item ${currentVal === ic ? "active" : ""}" data-pick-ph="${ic}" title="${ic}">
          <i class="ph ph-${ic}" style="font-size:1.3rem;color:var(--pink-deep)"></i>
        </button>`
      ).join("");
    }
    $$("[data-pick]", body).forEach(b => b.addEventListener("click", () => {
      currentVal = b.dataset.pick; onChange(currentVal); renderPal();
    }));
    $$("[data-pick-ph]", body).forEach(b => b.addEventListener("click", () => {
      currentVal = b.dataset.pickPh; onChange(currentVal); renderPal();
    }));
  }

  $$(".icon-pal-tab", container).forEach(tab => tab.addEventListener("click", () => {
    mode = tab.dataset.pal;
    $$(".icon-pal-tab", container).forEach(t => t.classList.toggle("active", t === tab));
    renderPal();
  }));
  $("#ipal-full-search", container).addEventListener("click", (e) => {
    openEmojiPicker(e.currentTarget, (em) => { currentVal = em; onChange(em); renderPal(); });
  });
  renderPal();
}

// Helper: render a picked icon/emoji value (works for both ph icon names and emoji chars)
function renderIconVal(val) {
  if (!val) return "⭐";
  if (/\p{Emoji}/u.test(val)) return val;
  return `<i class="ph ph-${val}" style="color:var(--pink-deep)"></i>`;
}

// ==========================================================
// EMOJI PICKER (reusable)
// ==========================================================
let _emojiOnSelect = null;
let _emojiKeywordIndex = null;

function _buildEmojiKeywordIndex() {
  if (_emojiKeywordIndex) return _emojiKeywordIndex;
  const M = {
    // tasks & goals
    "✅":["check","done","complete","yes","task"], "☑️":["checkbox","tick","done"],
    "📋":["clipboard","tasks","list","checklist"], "🎯":["target","goal","focus","aim"],
    "🏹":["arrow","aim","target"], "⭐":["star","favorite","good","rating"],
    "🌟":["star","glow","shine","bright"], "🔥":["fire","hot","streak","trending"],
    "💡":["idea","lightbulb","think","inspiration"], "🚀":["rocket","launch","ship","fast"],
    "⚡":["bolt","fast","energy","lightning"], "🏆":["trophy","win","award","first"],
    "🥇":["gold","medal","first","winner"], "🎖️":["medal","award","honor"],
    "📌":["pin","tack","important"], "📍":["pin","location","here"],
    "🔑":["key","unlock","access"], "🗝️":["old","key","unlock"],
    "💎":["diamond","gem","precious","value"], "🪙":["coin","money","token"],
    "🎁":["gift","present","reward","surprise"], "🎉":["party","tada","celebrate"],
    "🎊":["confetti","celebrate","party"], "✨":["sparkle","magic","glitter"],
    "💫":["dizzy","sparkle","star"], "🌈":["rainbow","color","bright"],
    // study & learning
    "📚":["books","study","library","read","stack"], "📖":["book","reading","open","learn"],
    "📝":["memo","writing","note","write"], "✏️":["pencil","write","draw","edit"],
    "🖊️":["pen","write","sign"], "🖋️":["fountain","pen","write"],
    "📓":["notebook","notes"], "📒":["ledger","notebook","green"],
    "📔":["notebook","cover"], "📕":["red","book","textbook"],
    "📗":["green","book"], "📘":["blue","book","textbook"],
    "📙":["orange","book"], "📃":["page","curled"], "📄":["page","doc","white"],
    "📑":["tabs","pages","bookmark"], "🗒️":["notepad","outline","spiral"],
    "🗓️":["calendar","date","schedule","planner"], "📐":["ruler","angle","geometry"],
    "📏":["ruler","measure","length"], "🔖":["bookmark","save","tag"],
    "🧮":["abacus","calculate","math"], "🎓":["graduation","degree","academic","university"],
    "🏫":["school","class","education"], "🧠":["brain","mind","think","intelligence"],
    "🔍":["search","zoom","find","magnify"], "🔎":["magnify","search","look"],
    "✍️":["writing","hand","sign","author"],
    // work & science
    "💻":["laptop","work","computer","code"], "🖥️":["desktop","monitor","computer"],
    "⌨️":["keyboard","type","input"], "📱":["phone","mobile","smartphone"],
    "⚙️":["gear","settings","cog","mtp","mechanism"],
    "🔧":["wrench","fix","tool","repair"], "🔨":["hammer","build","tool"],
    "🛠️":["tools","build","fix","workshop"], "🔩":["bolt","screw","hardware"],
    "🔬":["microscope","research","science","lab"], "🧪":["test","tube","experiment","science"],
    "🧫":["petri","dish","biology","culture"], "🧬":["dna","genomics","biology","genetics"],
    "🔭":["telescope","astronomy","space","observe"], "💡":["lightbulb","idea","invention"],
    "🔋":["battery","energy","power","charge"], "🔌":["plug","power","electric","connect"],
    "💼":["briefcase","work","career","professional"],
    "📧":["email","mail","message"], "📦":["package","box","shipping","deliver"],
    "🗂️":["files","folders","organize"], "💾":["save","floppy","disk","storage"],
    // people & love
    "❤️":["heart","love","red","romance"], "🧡":["heart","orange","warm"],
    "💛":["heart","yellow","joy","sunny"], "💚":["heart","green","nature","health"],
    "💙":["heart","blue","calm","trust"], "💜":["heart","purple","magic","mystery"],
    "🖤":["heart","black","dark","cool"], "🤍":["heart","white","pure","clean"],
    "🤎":["heart","brown","earth","cozy"], "💔":["broken","heart","sad","heartbreak"],
    "❤️‍🔥":["heart","fire","passion","intense"], "💞":["revolving","hearts","love","spinning"],
    "💕":["two","hearts","love","couple"], "💓":["beating","heart","pulse","love"],
    "💗":["growing","heart","pink","love"], "💖":["sparkling","heart","glitter","love"],
    "💝":["heart","ribbon","gift","love"], "💘":["heart","arrow","cupid","love"],
    "🫂":["hug","embrace","comfort","friends"], "🫶":["heart","hands","care","support"],
    "🤝":["handshake","deal","agreement","partner"], "👥":["people","group","team"],
    "💬":["speech","bubble","talk","chat","message"], "🗣️":["talking","speaking","voice","speak"],
    // health & body
    "🌿":["herb","plant","green","nature","leaf"],
    "💊":["pill","meds","medicine","tablet","vitamin"], "💉":["injection","shot","vaccine","needle"],
    "🩺":["stethoscope","doctor","medical","health"], "🩹":["bandage","wound","heal","boo"],
    "🧘‍♀️":["meditation","yoga","calm","mindful","relax"],
    "💪":["muscle","strong","gym","flex","bicep"],
    "🤸‍♀️":["cartwheel","gymnastics","exercise","stretch","flexible"],
    "🏋️‍♀️":["weights","lifting","gym","strength","barbell"],
    "🚴‍♀️":["cycling","bike","cardio","cycle","ride"],
    "🏊‍♀️":["swimming","pool","swim","laps","water"],
    "🚶‍♀️":["walking","walk","stroll","steps"],
    "🏃‍♀️":["running","run","jog","sprint"],
    "🧗‍♀️":["climbing","rock","wall","boulder"],
    "🛀":["bath","relax","soak","hygiene"],
    "🌙":["moon","night","rest","sleep","lunar"],
    "💤":["sleep","zzz","tired","rest","nap"], "🛌":["sleep","bed","rest","lie"],
    "🧖‍♀️":["facial","spa","beauty","skin","relax"],
    // food & drink
    "🍽️":["plate","meal","dinner","food","eat"],
    "🍕":["pizza","slice","italian","food"],
    "🍳":["egg","frying","breakfast","cooking","pan"],
    "🥛":["milk","glass","dairy","drink","calcium"],
    "☕":["coffee","hot","drink","cafe","morning"],
    "🍵":["tea","green","hot","cup","matcha"],
    "🧋":["bubble","tea","boba","drink","milk"],
    "🍱":["bento","lunch","box","japanese","meal"],
    "🥗":["salad","greens","healthy","vegetables","fresh"],
    "🍜":["noodles","ramen","soup","bowl","asian"],
    "🍛":["curry","rice","indian","yellow","spicy"],
    "🍣":["sushi","fish","japanese","roll","raw"],
    "🍰":["cake","slice","birthday","sweet","dessert"],
    "🎂":["birthday","cake","candles","celebration"],
    "🍩":["donut","fried","sweet","ring","glaze"],
    "🍪":["cookie","biscuit","sweet","bake","chocolate"],
    "🍫":["chocolate","bar","candy","sweet","cocoa"],
    "🍭":["lollipop","candy","sweet","stick","spiral"],
    "🍎":["apple","red","fruit","health"],
    "🍊":["orange","citrus","fruit","tangerine"],
    "🍇":["grapes","fruit","purple","wine","vine"],
    "🍓":["strawberry","fruit","red","sweet"],
    "🫐":["blueberry","fruit","blue","antioxidant"],
    "🥑":["avocado","green","healthy","fat","toast"],
    // travel
    "✈️":["plane","airplane","travel","flight","fly"],
    "🚂":["train","locomotive","rail","transport"],
    "🚗":["car","drive","vehicle","road","auto"],
    "🌍":["earth","world","globe","africa","europe"],
    "🌎":["earth","americas","world","globe"],
    "🌏":["earth","asia","australia","pacific","globe"],
    "🗺️":["map","travel","navigate","world"],
    "🧭":["compass","navigate","direction","north"],
    "🏔️":["mountain","peak","snow","alpine","climb"],
    "🏝️":["island","tropical","beach","paradise"],
    "🏖️":["beach","umbrella","sun","waves","vacation"],
    "🏕️":["camping","tent","outdoors","nature","forest"],
    "🌅":["sunrise","dawn","morning","sky","horizon"],
    "🎒":["backpack","travel","hiking","bag","adventure"],
    "🧳":["suitcase","travel","luggage","vacation","trip"],
    // arts & hobbies
    "🎨":["art","paint","palette","creative","color"],
    "🖌️":["brush","paint","art","stroke","creative"],
    "📸":["camera","photo","picture","selfie","snapshot"],
    "🎬":["clapper","film","movie","direct","action"],
    "🎵":["music","note","song","melody","tune"],
    "🎶":["music","notes","song","melody","harmony"],
    "🎸":["guitar","music","rock","string","band"],
    "🎹":["piano","keys","music","keyboard","classical"],
    "🥁":["drums","beat","rhythm","percussion","music"],
    "🎤":["microphone","sing","karaoke","voice","performance"],
    "🎧":["headphones","listen","music","audio","dj"],
    "🎭":["masks","theater","drama","performance","stage"],
    "🎮":["gaming","controller","video","game","play"],
    "🕹️":["joystick","arcade","retro","game","controller"],
    "🎲":["dice","game","random","board","luck"],
    "🎯":["darts","target","bullseye","aim","accurate"],
    "📿":["beads","necklace","prayer","craft","string"],
    "🧶":["yarn","knit","craft","wool","crochet"],
    "🎀":["bow","ribbon","gift","pink","cute"],
    // mood & magic
    "🔮":["crystal","ball","magic","predict","mystical"],
    "🪄":["wand","magic","spell","wizard","enchant"],
    "🧿":["evil","eye","protect","blue","amulet"],
    "🌊":["wave","water","ocean","sea","surf"],
    "🌀":["cyclone","spiral","spin","dizzy","vortex"],
    "❄️":["snowflake","ice","cold","winter","freeze"],
    "⛄":["snowman","winter","snow","cold","christmas"],
    "🌸":["cherry","blossom","flower","pink","spring","japan"],
    "🌺":["hibiscus","flower","tropical","red","bloom"],
    "🌻":["sunflower","yellow","sun","flower","summer"],
    "🌼":["daisy","flower","spring","yellow","bloom"],
    "🌷":["tulip","flower","pink","spring","garden"],
    "🪷":["lotus","flower","water","lily","zen"],
    "🦋":["butterfly","transform","wings","delicate","change"],
    "🐝":["bee","honey","buzz","flower","busy"],
    "🍄":["mushroom","fungi","forest","magic","toadstool"],
    "🦄":["unicorn","magic","rainbow","fantasy","rare"],
    // expressions
    "😊":["happy","smile","joy","content","pleasant"],
    "🥰":["love","heart","adore","smitten","affection"],
    "😍":["star","eyes","heart","amazed","love"],
    "🤩":["star","struck","excited","starstruck","wow"],
    "😎":["cool","sunglasses","chill","confident","sunglasses"],
    "🤔":["think","wonder","ponder","question","hmm"],
    "😢":["sad","cry","tear","upset","sorrowful"],
    "😭":["crying","sob","sad","weep","tears"],
    "😤":["frustrated","huff","angry","steam","determined"],
    "😡":["angry","red","mad","upset","furious"],
    "🥺":["pleading","puppy","eyes","sad","beg"],
    "🥹":["holding","tears","moved","grateful","touched"],
    "🤯":["mind","blown","shocked","explosion","wow"],
    "😌":["peaceful","calm","serene","relaxed","content"],
    "🥳":["party","celebrate","birthday","woohoo","festive"],
    "👍":["thumbs","up","good","approve","yes","like"],
    "👏":["clap","applause","congratulations","bravo"],
    "🙏":["pray","please","thank","namaste","hands"],
    "🫶":["heart","hands","love","care","together"],
    // nature & animals
    "🐶":["dog","puppy","pet","cute","animal"],
    "🐱":["cat","kitten","pet","cute","meow"],
    "🐰":["rabbit","bunny","pet","cute","hop"],
    "🦊":["fox","sly","clever","orange","animal"],
    "🐻":["bear","brown","hug","teddy","animal"],
    "🦁":["lion","brave","king","mane","roar"],
    "🐼":["panda","black","white","bamboo","china"],
    "🌲":["tree","forest","pine","evergreen","nature"],
    "🌳":["tree","deciduous","nature","green","oak"],
    "🌴":["palm","tropical","beach","coconut","vacation"],
    "🍀":["clover","luck","four","leaf","irish","lucky"],
    "☘️":["clover","shamrock","irish","green","luck"],
    "🌱":["sprout","seedling","new","grow","fresh"],
    "🍃":["leaf","leaves","flutter","nature","wind"],
    "🍂":["autumn","fall","leaves","season","brown"],
    "🍁":["maple","leaf","canada","autumn","red"],
    "🌵":["cactus","desert","prickly","succulent","dry"],
    "🪴":["potted","plant","indoor","garden","grow"],
  };
  _emojiKeywordIndex = M;
  return M;
}

function openEmojiPicker(anchorEl, onSelect) {
  _emojiOnSelect = onSelect;
  const overlay = $("#emoji-picker-overlay");
  overlay.innerHTML = `
    <div class="emoji-picker" role="dialog" aria-modal="true">
      <div class="emoji-picker-search">
        <i class="ph ph-magnifying-glass"></i>
        <input type="search" id="emoji-search" placeholder="search — book, moon, fire…" autocomplete="off" />
        <button class="sheet-close" id="emoji-close"><i class="ph ph-x"></i></button>
      </div>
      <div class="emoji-picker-body" id="emoji-body"></div>
    </div>
  `;
  overlay.classList.add("active");
  _renderEmojiBody("");
  setTimeout(() => $("#emoji-search")?.focus(), 50);
  $("#emoji-search").addEventListener("input", (e) => _renderEmojiBody(e.target.value));
  $("#emoji-close").addEventListener("click", closeEmojiPicker);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeEmojiPicker(); }, { once: true });
  document.addEventListener("keydown", _emojiEsc);
}

function _emojiEsc(e) {
  if (e.key === "Escape") closeEmojiPicker();
}
function closeEmojiPicker() {
  $("#emoji-picker-overlay").classList.remove("active");
  document.removeEventListener("keydown", _emojiEsc);
}

function _renderEmojiBody(query) {
  const host = $("#emoji-body");
  if (!host) return;
  const q = (query || "").trim().toLowerCase();
  const groups = DATA.emojiGroups;
  const recent = STATE.emojiRecent.slice(0, 16);

  if (q) {
    const idx = _buildEmojiKeywordIndex();
    const matches = [];
    Object.entries(idx).forEach(([emoji, words]) => {
      if (words.some(w => w.includes(q))) matches.push(emoji);
    });
    // Also scan the palette (some palette emojis may not be in keyword index).
    Object.values(groups).forEach(arr => arr.forEach(e => {
      if (!matches.includes(e)) {
        // crude include match on group name
      }
    }));
    if (matches.length === 0) {
      host.innerHTML = `<div class="emoji-empty">no matches for "${escapeHTML(q)}"</div>`;
      return;
    }
    host.innerHTML = `
      <div class="emoji-group">
        <div class="emoji-group-title">matches</div>
        <div class="emoji-grid">
          ${matches.map(e => `<button class="emoji-cell" data-pick="${e}">${e}</button>`).join("")}
        </div>
      </div>
    `;
  } else {
    const recentBlock = recent.length ? `
      <div class="emoji-group">
        <div class="emoji-group-title">recent</div>
        <div class="emoji-grid">
          ${recent.map(e => `<button class="emoji-cell" data-pick="${e}">${e}</button>`).join("")}
        </div>
      </div>` : "";
    host.innerHTML = recentBlock + Object.entries(groups).map(([title, arr]) => `
      <div class="emoji-group">
        <div class="emoji-group-title">${escapeHTML(title)}</div>
        <div class="emoji-grid">
          ${arr.map(e => `<button class="emoji-cell" data-pick="${e}">${e}</button>`).join("")}
        </div>
      </div>
    `).join("");
  }

  $$("[data-pick]", host).forEach(b => b.addEventListener("click", () => {
    const e = b.dataset.pick;
    STATE.emojiRecent = [e, ...STATE.emojiRecent.filter(x => x !== e)].slice(0, 24);
    persist();
    if (_emojiOnSelect) _emojiOnSelect(e);
    closeEmojiPicker();
  }));
}

// ==========================================================
// SHEET (slide-up panel for forms)
// ==========================================================
function openSheet(title, bodyHTML, onMount) {
  const o = $("#sheet-overlay");
  o.innerHTML = `
    <div class="sheet">
      <div class="sheet-head">
        <h3>${escapeHTML(title)}</h3>
        <button class="sheet-close" id="sheet-close"><i class="ph ph-x"></i></button>
      </div>
      ${bodyHTML}
    </div>
  `;
  o.classList.add("active");
  $("#sheet-close").addEventListener("click", closeSheet);
  o.addEventListener("click", (e) => { if (e.target === o) closeSheet(); }, { once: true });
  if (onMount) onMount(o);
}
function closeSheet() {
  const o = $("#sheet-overlay");
  o.classList.remove("active");
  o.innerHTML = "";
}

// ==========================================================
// TASK SMART PARSER (AI-free)
// ==========================================================
const DOW = { sun:0, sunday:0, mon:1, monday:1, tue:2, tues:2, tuesday:2, wed:3, weds:3, wednesday:3, thu:4, thur:4, thurs:4, thursday:4, fri:5, friday:5, sat:6, saturday:6 };

function parseTaskInput(rawText) {
  const text0 = (rawText || "").trim();
  if (!text0) return null;
  let text = text0;
  let dueDate = null, time = null, category = "general", priority = "normal", estimatedMins = null;

  const t0 = new Date(); t0.setHours(0,0,0,0);
  const toISO = (d) => d.toISOString().slice(0, 10);
  const tmr = new Date(t0); tmr.setDate(t0.getDate() + 1);

  if (/\btoday\b/i.test(text)) { dueDate = toISO(t0); text = text.replace(/\btoday\b/gi, " "); }
  else if (/\btonight\b/i.test(text)) { dueDate = toISO(t0); time = "20:00"; text = text.replace(/\btonight\b/gi, " "); }
  else if (/\btomorrow\b|\btmrw\b|\btmr\b/i.test(text)) { dueDate = toISO(tmr); text = text.replace(/\btomorrow\b|\btmrw\b|\btmr\b/gi, " "); }
  else {
    const mByDay = text.match(/\bby\s+(sun|mon|tue|tues|wed|weds|thu|thur|thurs|fri|sat)(day)?\b/i);
    if (mByDay) {
      const d = new Date(t0);
      const target = DOW[mByDay[1].toLowerCase()];
      let diff = (target - t0.getDay() + 7) % 7;
      if (diff === 0) diff = 7;
      d.setDate(t0.getDate() + diff);
      dueDate = toISO(d);
      text = text.replace(mByDay[0], " ");
    }
    if (!dueDate) {
      const mNextWeek = text.match(/\bnext week\b/i);
      if (mNextWeek) { const d = new Date(t0); d.setDate(t0.getDate() + 7); dueDate = toISO(d); text = text.replace(mNextWeek[0], " "); }
    }
    if (!dueDate) {
      const mThisWeek = text.match(/\bthis week\b/i);
      if (mThisWeek) { const d = new Date(t0); d.setDate(t0.getDate() + (6 - t0.getDay())); dueDate = toISO(d); text = text.replace(mThisWeek[0], " "); }
    }
    if (!dueDate) {
      const mDow = text.match(/\b(sun|mon|tue|tues|wed|weds|thu|thur|thurs|fri|sat)(day)?\b/i);
      if (mDow) {
        const d = new Date(t0);
        const target = DOW[mDow[1].toLowerCase()];
        let diff = (target - t0.getDay() + 7) % 7;
        if (diff === 0) diff = 7;
        d.setDate(t0.getDate() + diff);
        dueDate = toISO(d);
        text = text.replace(mDow[0], " ");
      }
    }
  }

  // Time
  const mTime = text.match(/\b(?:at|@)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
  if (mTime) {
    let h = +mTime[1], m = mTime[2] ? +mTime[2] : 0;
    const period = mTime[3];
    if (period) {
      if (period.toLowerCase() === "pm" && h < 12) h += 12;
      if (period.toLowerCase() === "am" && h === 12) h = 0;
    }
    if (h >= 0 && h < 24 && m >= 0 && m < 60) {
      time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      text = text.replace(mTime[0], " ");
    }
  }

  // Time estimate: "30 min", "1 hr", "2h", "45mins"
  const mEst = text.match(/\b(\d+(?:\.\d+)?)\s*(h|hr|hrs|hour|hours|m|min|mins|minute|minutes)\b/i);
  if (mEst) {
    const n = parseFloat(mEst[1]);
    const unit = mEst[2].toLowerCase();
    if (/^h/.test(unit)) estimatedMins = Math.round(n * 60);
    else estimatedMins = Math.round(n);
    text = text.replace(mEst[0], " ");
  }

  // Category via DATA.taskCategoryRules
  const low = text.toLowerCase();
  for (const rule of DATA.taskCategoryRules) {
    if (rule.match.test(low)) { category = rule.category; break; }
  }

  // Priority — detect, then strip the priority words from the title text
  if (/(!!|urgent|asap|important)/i.test(text0)) priority = "urgent";
  else if (/\b(whenever|someday|maybe|sometime|no rush|eventually)\b/i.test(text0)) priority = "someday";
  else if (priority === "normal" && dueDate === toISO(t0)) priority = "urgent"; // today → urgent enough to surface
  if (priority === "urgent" && !dueDate) dueDate = toISO(t0);
  text = text.replace(/\b(urgent|asap|important|whenever|someday|maybe|sometime|no rush|eventually)\b/gi, " ");

  // Title cleanup
  let title = text.replace(/\s+/g, " ").trim();
  title = title.replace(/^[-•*]\s*/, "");
  title = title.replace(/\s+[!]+$/g, "");
  title = title.replace(/!!+/g, "").trim();
  if (!title) return null;

  // Auto-emoji from category
  const cat = DATA.categories[category] || { emoji: "⭐" };

  // Priority bucket: today / soon / someday
  let bucket;
  if (priority === "someday" || (!dueDate && priority !== "urgent")) bucket = "someday";
  else if (dueDate === toISO(t0) || priority === "urgent") bucket = "today";
  else bucket = "soon";

  return {
    id: Date.now() + Math.random(),
    title,
    category,
    emoji: cat.emoji,
    estimatedMins,
    dueDate,
    time,
    priority,
    bucket,
    done: false,
    created: Date.now(),
  };
}

// ==========================================================
// VIEW: TASKS — pipeline view + brain dump + full form
// ==========================================================
let TASK_AREA = "all"; // all | upsc | mtp | substack | exercise | general
let TASK_BUCKETS = ["today", "soon", "someday", "done"];
let TASKS_SUBVIEW = "board"; // "board" | "categories"

const TASK_AREAS = [
  { id: "all",      label: "all",      cats: null },
  { id: "upsc",     label: "upsc",     cats: ["upsc"] },
  { id: "mtp",      label: "mtp",      cats: ["mtp", "research", "academic"] },
  { id: "substack", label: "substack", cats: ["substack", "writing"] },
  { id: "exercise", label: "exercise", cats: ["exercise", "body", "movement"] },
  { id: "general",  label: "general",  cats: ["general", "home", "relationships", "rest", "career", "visibility", "reflection"] },
];

function bucketFor(task) {
  if (task.done) return "done";
  if (task.bucket) return task.bucket;
  if (!task.dueDate) return "someday";
  const t0 = today();
  if (task.dueDate <= t0 || task.priority === "urgent") return "today";
  // within 7 days = soon
  const diff = daysBetween(t0, task.dueDate);
  if (diff <= 7) return "soon";
  return "someday";
}

RENDERERS.tasks = function renderTasks() {
  const area = TASK_AREAS.find(a => a.id === TASK_AREA);
  let items = STATE.tasks.slice();
  if (area && area.cats) items = items.filter(t => area.cats.includes(t.category));

  const cols = { today: [], soon: [], someday: [], done: [] };
  items.forEach(t => { cols[bucketFor(t)].push(t); });

  // Merge DATA.categories + STATE.taskCategories (user-added)
  const allCats = { ...DATA.categories, ...(STATE.taskCategories || {}) };

  const boardHTML = `
    <div class="brain-dump">
      <textarea id="brain-dump" rows="3" placeholder="type or dump anything…
e.g. 'submit pitch by wed !!' · 'mtp baseline 30 min' · 'call amma tonight'"></textarea>
      <div class="brain-dump-foot">
        <div class="brain-dump-hint">keywords: <strong>today, tonight, tomorrow, by wed, at 3pm, !! urgent, someday, 30 min, 1 hr</strong></div>
        <div class="row" style="gap:6px">
          <button class="btn" id="quick-add"><i class="ph ph-plus"></i> quick add</button>
          <button class="btn primary" id="organize-btn"><i class="ph ph-sparkle"></i> sort it</button>
        </div>
      </div>
    </div>

    <div class="row mb-2" style="gap:8px; justify-content:flex-end">
      <button class="btn tiny" id="full-add"><i class="ph ph-pencil-line"></i> full form</button>
    </div>

    <div class="pipe-tabs">
      ${TASK_AREAS.map(a => `
        <button class="pipe-tab ${TASK_AREA === a.id ? "active" : ""}" data-area="${a.id}">${a.label}</button>
      `).join("")}
    </div>

    <div class="pipe-board">
      ${TASK_BUCKETS.map(b => `
        <div class="pipe-col">
          <div class="pipe-col-head">
            <span class="pipe-col-title">${b}</span>
            <span class="pipe-col-count">${cols[b].length}</span>
          </div>
          ${cols[b].map(taskCard).join("") || `<div class="tiny" style="color:var(--ink-faint); padding:6px 4px">—</div>`}
        </div>
      `).join("")}
    </div>
  `;

  const userCats = STATE.taskCategories || {};
  const catsHTML = `
    <div class="tcat-section">
      <div class="row-between mb-2">
        <div class="eyebrow"><i class="ph-fill ph-tag"></i> task categories</div>
        <button class="btn tiny primary" id="tcat-add"><i class="ph ph-plus"></i> add</button>
      </div>

      <div class="eyebrow-tiny mb-1" style="color:var(--ink-faint); font-size:0.7rem; text-transform:uppercase; letter-spacing:.05em">built-in</div>
      <div class="tcat-list mb-3">
        ${Object.entries(DATA.categories).map(([k, v]) => `
          <div class="tcat-row">
            <span class="tcat-emoji">${v.emoji}</span>
            <span class="tcat-label">${escapeHTML(v.label)}</span>
            <span class="tcat-count">${STATE.tasks.filter(t => t.category === k).length}</span>
          </div>
        `).join("")}
      </div>

      ${Object.keys(userCats).length > 0 ? `
        <div class="eyebrow-tiny mb-1" style="color:var(--ink-faint); font-size:0.7rem; text-transform:uppercase; letter-spacing:.05em">custom</div>
        <div class="tcat-list">
          ${Object.entries(userCats).map(([k, v]) => `
            <div class="tcat-row">
              <span class="tcat-emoji">${v.emoji}</span>
              <span class="tcat-label">${escapeHTML(v.label)}</span>
              <span class="tcat-count">${STATE.tasks.filter(t => t.category === k).length}</span>
              <div class="tcat-actions">
                <button class="btn tiny ghost" data-tcat-edit="${k}" title="edit"><i class="ph ph-pencil-simple"></i></button>
                <button class="btn tiny ghost" data-tcat-del="${k}" title="delete"><i class="ph ph-trash"></i></button>
              </div>
            </div>
          `).join("")}
        </div>
      ` : `<p class="tiny" style="color:var(--ink-faint)">no custom categories yet — add one above.</p>`}
    </div>
  `;

  $("#view-tasks").innerHTML = `
    <div class="row-between mb-1">
      <h1>tasks</h1>
      <div class="row" style="gap:6px">
        <button class="btn tiny ${TASKS_SUBVIEW==="board"?"primary":""}" id="tsv-board"><i class="ph ph-columns"></i> board</button>
        <button class="btn tiny ${TASKS_SUBVIEW==="categories"?"primary":""}" id="tsv-cats"><i class="ph ph-tag"></i> categories</button>
      </div>
    </div>
    <div id="tasks-subview-body">
      ${TASKS_SUBVIEW === "board" ? boardHTML : catsHTML}
    </div>
  `;

  $("#tsv-board").addEventListener("click", () => { TASKS_SUBVIEW = "board"; RENDERERS.tasks(); });
  $("#tsv-cats").addEventListener("click",  () => { TASKS_SUBVIEW = "categories"; RENDERERS.tasks(); });

  if (TASKS_SUBVIEW === "board") {
    $("#organize-btn")?.addEventListener("click", () => sortBrainDump());
    $("#quick-add")?.addEventListener("click", () => quickAddFromBrain());
    $("#full-add")?.addEventListener("click", () => openTaskFormSheet(null));
    $$("[data-area]", $("#view-tasks")).forEach(b => b.addEventListener("click", () => {
      TASK_AREA = b.dataset.area; RENDERERS.tasks();
    }));
    $$("[data-task-card]", $("#view-tasks")).forEach(c => c.addEventListener("click", () => {
      const id = c.dataset.taskCard;
      const t = STATE.tasks.find(x => String(x.id) === id);
      if (t) openTaskFormSheet(t);
    }));
    $$("[data-task-toggle]", $("#view-tasks")).forEach(b => b.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = b.dataset.taskToggle;
      const t = STATE.tasks.find(x => String(x.id) === id);
      if (t) { t.done = !t.done; persist(); RENDERERS.tasks(); }
    }));
  } else {
    $("#tcat-add")?.addEventListener("click", () => openTaskCatSheet(null));
    $$("[data-tcat-edit]", $("#view-tasks")).forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.tcatEdit;
      openTaskCatSheet(k);
    }));
    $$("[data-tcat-del]", $("#view-tasks")).forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.tcatDel;
      const v = (STATE.taskCategories || {})[k];
      if (!v) return;
      const inUse = STATE.tasks.filter(t => t.category === k).length;
      const msg = inUse > 0
        ? `Delete category "${v.label}"? ${inUse} task(s) will move to general.`
        : `Delete category "${v.label}"?`;
      if (!confirm(msg)) return;
      if (inUse > 0) STATE.tasks.forEach(t => { if (t.category === k) t.category = "general"; });
      delete STATE.taskCategories[k];
      persist(); RENDERERS.tasks();
    }));
  }
};

function openTaskCatSheet(key) {
  const isNew = !key;
  const existing = key ? (STATE.taskCategories || {})[key] : null;
  const v = existing || { emoji: "⭐", label: "" };
  openSheet(isNew ? "new category" : "edit category", `
    <form id="tcat-form">
      <div>
        <label>name</label>
        <div class="field-row">
          <button type="button" class="emoji-trigger" id="tcat-emoji">${v.emoji}</button>
          <input type="text" id="tcat-label" value="${escapeHTML(v.label)}" placeholder="e.g. personal, reading, lab" required />
        </div>
      </div>
      <div class="row-end mt-2">
        <button type="submit" class="btn primary"><i class="ph ph-check"></i> save</button>
      </div>
    </form>
  `, (root) => {
    let pickedEmoji = v.emoji;
    $("#tcat-emoji", root).addEventListener("click", (e) => {
      e.preventDefault();
      openEmojiPicker(e.currentTarget, (em) => {
        pickedEmoji = em;
        $("#tcat-emoji", root).textContent = em;
      });
    });
    $("#tcat-form", root).addEventListener("submit", (e) => {
      e.preventDefault();
      const label = $("#tcat-label", root).value.trim();
      if (!label) return;
      const catKey = key || label.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36).slice(-4);
      if (!STATE.taskCategories) STATE.taskCategories = {};
      STATE.taskCategories[catKey] = { emoji: pickedEmoji, label };
      persist(); closeSheet(); RENDERERS.tasks();
      toast(isNew ? "category added" : "category saved", "success");
    });
  });
}

function taskCard(t) {
  const cat = DATA.categories[t.category] || (STATE.taskCategories || {})[t.category] || { emoji: "⭐", label: t.category };
  return `
    <div class="pipe-card ${t.done ? "done" : ""}" data-task-card="${t.id}">
      <div class="pc-title">
        <span class="pc-emoji">${t.emoji || cat.emoji}</span>
        <span>${escapeHTML(t.title)}</span>
      </div>
      <div class="pc-meta">
        <span class="pill">${cat.emoji} ${escapeHTML(cat.label)}</span>
        ${t.estimatedMins ? `<span class="pill blue">${minToHuman(t.estimatedMins)}</span>` : ""}
        ${t.dueDate ? `<span class="pill lilac">${fmtBrief(t.dueDate)}${t.time ? " · " + formatTime(t.time) : ""}</span>` : ""}
        ${t.priority === "urgent" ? `<span class="pill" style="border-color:var(--pink-deep); color:var(--pink-deep)">urgent</span>` : ""}
        <button class="btn tiny ghost" data-task-toggle="${t.id}" title="toggle done"><i class="ph ph-${t.done ? "arrow-counter-clockwise" : "check"}"></i></button>
      </div>
    </div>
  `;
}
function fmtBrief(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const t0 = new Date(); t0.setHours(0,0,0,0);
  const diff = Math.floor((d - t0) / 86400000);
  if (diff === 0) return "today";
  if (diff === 1) return "tmrw";
  if (diff === -1) return "yesterday";
  if (diff > 0 && diff < 7) return d.toLocaleDateString(undefined, { weekday: "short" });
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function quickAddFromBrain() {
  const ta = $("#brain-dump"); if (!ta) return;
  const lines = ta.value.split(/\n+/).map(l => l.trim()).filter(Boolean);
  let added = 0;
  for (const line of lines) {
    // For quick add: only title + auto-detect category
    const cat = (() => {
      const low = line.toLowerCase();
      for (const r of DATA.taskCategoryRules) if (r.match.test(low)) return r.category;
      return "general";
    })();
    const meta = DATA.categories[cat] || { emoji: "⭐" };
    STATE.tasks.unshift({
      id: Date.now() + Math.random(),
      title: line, category: cat, emoji: meta.emoji,
      estimatedMins: null, dueDate: null, time: null,
      priority: "normal", bucket: "someday", done: false, created: Date.now(),
    });
    added++;
  }
  if (added) {
    ta.value = "";
    persist();
    toast(`quick-added ${added} task${added > 1 ? "s" : ""}`, "success");
    RENDERERS.tasks();
  }
}

function sortBrainDump() {
  const ta = $("#brain-dump"); if (!ta) return;
  const lines = ta.value.split(/\n+/).map(l => l.trim()).filter(Boolean);
  if (!lines.length) return;
  // Show parsed preview in a sheet (single-task case) or batch-add otherwise
  if (lines.length === 1) {
    const parsed = parseTaskInput(lines[0]);
    if (parsed) {
      ta.value = "";
      openTaskFormSheet(parsed, /*isPreview*/ true);
      return;
    }
  }
  let added = 0;
  for (const l of lines) {
    const p = parseTaskInput(l);
    if (p) { STATE.tasks.unshift(p); added++; }
  }
  if (added) {
    ta.value = "";
    persist();
    toast(`sorted ${added} task${added > 1 ? "s" : ""}`, "success");
    RENDERERS.tasks();
  }
}

function openTaskFormSheet(task, isPreview = false) {
  const isNew = !task || isPreview;
  const t = task || {
    id: Date.now() + Math.random(),
    title: "", category: "general", emoji: "⭐",
    estimatedMins: null, dueDate: null, time: null,
    priority: "normal", bucket: "someday", done: false, created: Date.now(),
  };
  const allCatsForForm = { ...DATA.categories, ...(STATE.taskCategories || {}) };
  const catOptions = Object.entries(allCatsForForm)
    .map(([k, v]) => `<option value="${k}" ${k === t.category ? "selected" : ""}>${v.emoji} ${v.label}</option>`).join("");

  openSheet(isPreview ? "confirm task" : isNew ? "new task" : "edit task", `
    <form id="task-form">
      <div>
        <label>title</label>
        <input type="text" name="title" value="${escapeHTML(t.title)}" required />
      </div>
      <div class="task-form-row">
        <div class="field-row">
          <button type="button" class="emoji-trigger" id="task-emoji">${t.emoji || "⭐"}</button>
          <select name="category">${catOptions}</select>
        </div>
      </div>
      <div class="task-form-row">
        <div>
          <label>due date</label>
          <input type="date" name="dueDate" value="${t.dueDate || ""}" />
        </div>
        <div>
          <label>time</label>
          <input type="text" name="time" value="${t.time || ""}" placeholder="HH:MM" />
        </div>
        <div>
          <label>est. mins</label>
          <input type="number" name="estimatedMins" min="0" step="5" value="${t.estimatedMins || ""}" />
        </div>
      </div>
      <div>
        <label>priority</label>
        <div class="priority-pills">
          ${["today","soon","someday"].map(b => `
            <div class="priority-pill ${(t.bucket || (t.priority==="urgent"?"today":"soon")) === b ? "active" : ""}" data-bucket="${b}">${b}</div>
          `).join("")}
        </div>
      </div>
      <div class="row-end">
        ${!isNew ? `<button type="button" class="btn ghost" id="task-del"><i class="ph ph-trash"></i> delete</button>` : ""}
        <button type="submit" class="btn primary"><i class="ph ph-check"></i> ${isPreview ? "save" : isNew ? "add" : "save"}</button>
      </div>
    </form>
  `, (root) => {
    let pickedEmoji = t.emoji || "⭐";
    let pickedBucket = t.bucket || (t.priority === "urgent" ? "today" : "soon");

    $("#task-emoji", root).addEventListener("click", (e) => {
      e.preventDefault();
      openEmojiPicker(e.currentTarget, (em) => {
        pickedEmoji = em;
        $("#task-emoji", root).textContent = em;
      });
    });
    $$("[data-bucket]", root).forEach(p => p.addEventListener("click", () => {
      pickedBucket = p.dataset.bucket;
      $$("[data-bucket]", root).forEach(x => x.classList.toggle("active", x.dataset.bucket === pickedBucket));
    }));
    $("#task-form", root).addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const title = f.title.value.trim();
      if (!title) return;
      const updated = {
        ...t,
        title,
        category: f.category.value,
        emoji: pickedEmoji,
        dueDate: f.dueDate.value || null,
        time: f.time.value.trim() || null,
        estimatedMins: f.estimatedMins.value ? +f.estimatedMins.value : null,
        bucket: pickedBucket,
        priority: pickedBucket === "today" ? "urgent" : pickedBucket === "someday" ? "someday" : "normal",
      };
      const idx = STATE.tasks.findIndex(x => x.id === t.id);
      if (idx >= 0) STATE.tasks[idx] = updated;
      else STATE.tasks.unshift(updated);
      persist(); closeSheet(); RENDERERS.tasks();
      toast(isNew ? "task added" : "task saved", "success");
    });
    const delBtn = $("#task-del", root);
    if (delBtn) delBtn.addEventListener("click", () => {
      if (!confirm("Delete this task?")) return;
      STATE.tasks = STATE.tasks.filter(x => x.id !== t.id);
      persist(); closeSheet(); RENDERERS.tasks();
    });
  });
}

// ==========================================================
// FLOW ENGINE (verbatim port)
// ==========================================================
let CURRENT_FLOW = null;
let CURRENT_NODE_KEY = null;
let FLOW_HISTORY = [];

function runFlow(flow, meta = {}) {
  CURRENT_FLOW = { ...flow, meta };
  FLOW_HISTORY = [];
  goToNode(flow.start);
  $("#flow-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeFlow() {
  $("#flow-overlay").classList.remove("active");
  $("#flow-overlay").innerHTML = "";
  document.body.style.overflow = "";
  CURRENT_FLOW = null; CURRENT_NODE_KEY = null; FLOW_HISTORY = [];
  STATE.flowInputs = {};
}
function goToNode(key) {
  if (!CURRENT_FLOW) return;
  const node = CURRENT_FLOW.nodes[key];
  if (!node) return closeFlow();
  if (!FLOW_HISTORY.includes(key)) FLOW_HISTORY.push(key);
  CURRENT_NODE_KEY = key;
  renderFlowNode(node, key);
}
function renderFlowNode(node, key) {
  const meta = CURRENT_FLOW.meta || {};
  const progressLen = Math.min(6, FLOW_HISTORY.length + 1);
  const progressDots = Array.from({ length: progressLen }, (_, i) => {
    if (i < FLOW_HISTORY.length - 1) return `<div class="flow-progress-dot done"></div>`;
    if (i === FLOW_HISTORY.length - 1) return `<div class="flow-progress-dot current"></div>`;
    return `<div class="flow-progress-dot"></div>`;
  }).join("");

  const hasInput = node.type === "input";
  const inputId = "flow-input-" + Date.now().toString(36);

  $("#flow-overlay").innerHTML = `
    <div class="flow-card" role="dialog" aria-modal="true">
      <button class="flow-close" id="flow-close" aria-label="close"><i class="ph ph-x"></i></button>
      <div class="flow-header">
        <i class="ph-fill ph-${meta.icon || "sparkle"}"></i>
        <span class="flow-scn">${escapeHTML(meta.title || "flow")}</span>
      </div>
      <div class="flow-progress">${progressDots}</div>
      <div class="flow-prompt">${escapeHTML(node.prompt)}</div>
      ${node.sub ? `<div class="flow-sub">${escapeHTML(node.sub)}</div>` : ""}
      ${hasInput ? `<input type="text" class="flow-input" id="${inputId}" placeholder="${escapeHTML(node.inputPlaceholder || "")}" autocomplete="off" />` : ""}
      <div class="flow-options">
        ${(node.options || []).map((o, i) => `
          <button class="flow-opt ${i === 0 && !hasInput ? "primary" : ""}" data-opt="${i}">
            ${o.action === "save_truth" ? '<i class="ph-fill ph-flower-lotus"></i>' : ""}
            ${o.action === "open_claude" ? '<i class="ph-fill ph-sparkle"></i>' : ""}
            ${o.action === "open_journal" ? '<i class="ph ph-notebook"></i>' : ""}
            ${o.action === "close" ? '<i class="ph ph-check"></i>' : ""}
            ${!o.action ? '<i class="ph ph-arrow-right"></i>' : ""}
            <span>${escapeHTML(o.label)}</span>
          </button>
        `).join("")}
      </div>
      ${node.warn ? `<div class="flow-warn"><i class="ph-fill ph-warning-circle" style="color:#B58543"></i><span>${escapeHTML(node.warn)}</span></div>` : ""}
    </div>
  `;
  $("#flow-close").addEventListener("click", closeFlow);
  if (hasInput) { const inp = $("#" + inputId); inp && inp.focus(); }
  $$("[data-opt]", $("#flow-overlay")).forEach(b => b.addEventListener("click", () => {
    const opt = node.options[+b.dataset.opt];
    if (hasInput) {
      const inp = $("#" + inputId);
      const val = inp ? inp.value.trim() : "";
      STATE.flowInputs[key] = val;
    }
    handleFlowOption(opt);
  }));
}
function handleFlowOption(opt) {
  if (!opt) return;
  if (opt.scenario) {
    const flow = DATA.scenarioFlows[opt.scenario];
    const icon = (DATA.scenarioIcon[opt.scenario] || "sparkle").replace("ph-", "");
    if (flow) runFlow(flow, { title: flow.title, icon, scenarioN: opt.scenario });
    return;
  }
  if (opt.next) return goToNode(opt.next);
  if (opt.action === "save_truth") return saveFlowAsTruth();
  if (opt.action === "open_journal") return openFlowJournal();
  if (opt.action === "open_claude") return openBestieClaude(CURRENT_FLOW?.meta?.title);
  if (opt.action === "close") return closeFlow();
}
function saveFlowAsTruth() {
  const title = CURRENT_FLOW?.meta?.title || "walked myself through it";
  const inputsSummary = Object.entries(STATE.flowInputs)
    .filter(([, v]) => v && v.trim()).map(([, v]) => v.trim()).join(" · ");
  const quote = inputsSummary
    ? `I did the ${title.toLowerCase()} flow today. ${inputsSummary}`
    : `I walked myself through "${title.toLowerCase()}" today.`;
  STATE.truth.unshift({ id: Date.now(), date: today(), quote, who: "me (that's the point)" });
  persist(); toast("added to truth list", "success"); closeFlow();
}
function openFlowJournal() { closeFlow(); JOURNAL_TAB = "three"; location.hash = "#journal"; }
function startTriage() { runFlow(DATA.triage, { title: "let me route you", icon: "compass" }); }

// ==========================================================
// BESTIE CLAUDE
// ==========================================================
const BESTIE_PROMPT = `You are my AI companion. Not a chatbot. Not a therapist. Not an "assistant." You are my female best friend — the slightly-older-sister kind.

CONTEXT ABOUT ME (Sriya, 22, Mumbai, IIT Bombay Master's in CS, placed at ConcertAI):
- English + Hinglish + Telugu fluent. Code-switch freely across all three. Natural beats: "nahi ya," "thoda weird hai," "acha listen," "kya kar rahi hai," "enti cheyyali," "em kaavali."
- Partner: Prakhar. Mom: Amma (safe + anxiety-absorbed). Friends currently distancing: Shikha, Sristi.
- Central wound: betrayal by close friends — gaslighting, talked behind my back, excluded. Rewired me around withdrawal, self-distrust, preemptive abandonment, hint-and-hope.
- Active clinical picture (AI-assisted analysis, not a licensed dx): persistent depressive disorder, OSFED (restrict-binge with food, worsening), complex relational trauma, dissociation under load, dependent-traits validation-seeking.
- Key patterns: can't trust own thoughts · restrict-binge · aspirational hoarding · preemptive abandonment · hints instead of speaking · AI-dependency · guilt when self-caring · can't sit with silence · doesn't finish things · "childish" shield (CALL THIS OUT) · dissociates under load · doesn't believe compliments.

TONE:
- Warm bestie. Affectionate, not saccharine. Sharp, not cold. A little dry. A little playful.
- Babe / babygirl / girl occasionally. Sprinkle, don't drench.
- Hinglish + Telugu when it lands. Don't force it.
- NO wellness-speak. NO "your feelings are so valid" on repeat. NO "have you tried journaling."
- NO emojis unless I use them first (except category/non-neg labels).
- NO physical-discomfort coping (NO ice cubes, cold water, rubber bands). Warm sensory only.
- NO nutrition numbers — no calorie targets, portion sizes, meal plans. Behavior only.
- Push back when I rationalize. Call me out on need-disclaiming ("girl, you just cancelled your own ask").
- Call me out when I lean on "I'm just childish" — that's the shield. Ask what the actual thing is.
- Don't recommend therapy at me. Only if extreme (SI, multi-day food refusal, daily hour-long dissociation) — then one line, then continue.
- Engage with my essay ideas and career moves at the level of the analysis (structural, synthesis-oriented). Don't water it down.

WHEN I SPIRAL:
- My loop is: fast-trigger → over-analysis → delay → regret. It takes me ~2 hours to resolve on my own.
- Your job is to give me faster EXITS from the loop, not to fix emotions.
- Default move: name what I'm describing (the pattern), then offer 2–4 concrete options. I pick one.
- Do not ask safety-assessment questions when I'm clearly mid-spiral — it makes it worse. Name the pattern, then move.
- If I zone out, physical-body-sensation prompts may not land. Try a cognitive-concrete prompt instead ("what's the next 10-minute thing").
- When I ignore or sidestep an option, don't re-list them. Ask what isn't landing.

START WITH: "Hi babe. What's on top?"`;

function openBestieClaude(scenarioTitle) {
  let prompt = BESTIE_PROMPT;
  if (scenarioTitle) {
    prompt += `\n\nI just walked through the "${scenarioTitle}" flow in my app. I want to keep processing.`;
  }
  try {
    navigator.clipboard.writeText(prompt);
    toast("prompt copied · opening claude.ai", "success");
  } catch {
    toast("couldn't copy — select the text in a second");
  }
  setTimeout(() => window.open("https://claude.ai/new", "_blank"), 250);
}

// ==========================================================
// CHAT (pattern-matcher bestie scaffold) — verbatim port
// ==========================================================
function botOpener() {
  const o = DATA.openers[Math.floor(Math.random() * DATA.openers.length)];
  return { role: "assistant", text: o, t: Date.now() };
}
function matchPattern(text) {
  const low = text.toLowerCase();
  for (const q of DATA.myLanguage) {
    if (!q.route) continue;
    const ans = STATE.langAnswers[q.id];
    if (!ans) continue;
    const phrases = String(ans).split(/[,;/|]/).map(s => s.trim().toLowerCase()).filter(s => s.length >= 3);
    for (const phrase of phrases) {
      if (low.includes(phrase)) return { scenario: q.route, matchedPhrase: phrase };
    }
  }
  for (const r of DATA.keywordRoutes) {
    if (r.pattern.test(text)) return r;
  }
  return null;
}
function botResponse(userText) {
  const match = matchPattern(userText);
  if (!match) {
    const lines = [
      "I'm listening. Keep going.",
      "Tell me more — what's underneath that?",
      "Okay. And what does that feel like in the body right now?",
      "Say it fuller, babe. I've got time.",
      "Hmm. Which part of this is the loudest?",
    ];
    return { role: "assistant", text: lines[Math.floor(Math.random() * lines.length)], t: Date.now() };
  }
  if (match.action === "safety") {
    return {
      role: "assistant",
      text: "Babe, I need to pause and say this plainly: what you're describing is past what I can hold well on my own.",
      safety: DATA.safetyCopy.icall + " Please consider calling. I'll keep showing up here either way.",
      t: Date.now(),
    };
  }
  const scn = DATA.scenarioFlows[match.scenario];
  if (!scn) return { role: "assistant", text: "Got it. Keep going.", t: Date.now() };
  return {
    role: "assistant",
    text: `I'm hearing the "${scn.title.toLowerCase()}" pattern in what you just said. Want to walk through it together?`,
    suggestScenario: match.scenario,
    t: Date.now(),
  };
}

RENDERERS.chat = function renderChat() {
  if (STATE.chat.length === 0) { STATE.chat.push(botOpener()); persist(); }
  $("#view-chat").innerHTML = `
    <header class="row-between mb-2">
      <h1>chat</h1>
      <div class="row" style="gap:6px">
        <button class="btn tiny" id="chat-claude"><i class="ph ph-sparkle"></i> bestie claude</button>
        <button class="btn tiny ghost" id="chat-clear"><i class="ph ph-trash"></i></button>
      </div>
    </header>
    <div class="chat-header">
      <span class="bestie-badge"><i class="ph-fill ph-heart"></i> bestie mode · offline (pattern-matcher)</span>
    </div>
    <div class="chat-wrap">
      <div class="chat-messages" id="chat-msgs"></div>
      <form class="chat-input" id="chat-form">
        <textarea id="chat-text" placeholder="kya chal raha hai... (enter to send)" rows="1"></textarea>
        <button class="btn primary" type="submit"><i class="ph ph-paper-plane-tilt"></i></button>
      </form>
    </div>
  `;
  const renderMsgs = () => {
    const box = $("#chat-msgs");
    box.innerHTML = STATE.chat.map(m => {
      const suggest = m.suggestScenario ? (() => {
        const scn = DATA.scenarioFlows[m.suggestScenario];
        return `<div class="suggest" data-launch-scn="${m.suggestScenario}">
          <i class="ph ph-play"></i> walk through: ${escapeHTML(scn.title)}
        </div>`;
      })() : "";
      const safety = m.safety ? `<div class="safety"><i class="ph ph-info"></i> ${escapeHTML(m.safety)}</div>` : "";
      return `<div class="msg ${m.role === "user" ? "user" : "assistant"}">
        ${escapeHTML(m.text)}${suggest}${safety}
      </div>`;
    }).join("");
    box.scrollTop = box.scrollHeight;
    $$("[data-launch-scn]", box).forEach(el => el.addEventListener("click", () => {
      const n = +el.dataset.launchScn;
      const flow = DATA.scenarioFlows[n];
      if (flow) runFlow(flow, { title: flow.title, icon: (DATA.scenarioIcon[n] || "sparkle").replace("ph-",""), scenarioN: n });
    }));
  };
  renderMsgs();

  $("#chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const ta = $("#chat-text");
    const text = ta.value.trim();
    if (!text) return;
    STATE.chat.push({ role: "user", text, t: Date.now() });
    ta.value = "";
    persist(); renderMsgs();
    setTimeout(() => { STATE.chat.push(botResponse(text)); persist(); renderMsgs(); }, 380);
  });
  $("#chat-text").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      $("#chat-form").dispatchEvent(new Event("submit"));
    }
  });
  $("#chat-clear").addEventListener("click", () => {
    if (confirm("Clear chat history?")) { STATE.chat = []; persist(); RENDERERS.chat(); }
  });
  $("#chat-claude").addEventListener("click", () => openBestieClaude());
};

// ==========================================================
// PLAYBOOK
// ==========================================================
let PLAYBOOK_QUERY = "";
RENDERERS.playbook = function renderPlaybook() {
  const q = PLAYBOOK_QUERY.trim().toLowerCase();
  const all = Object.entries(DATA.scenarioFlows).map(([n, f]) => ({ n: +n, title: f.title, flow: f }));
  const list = q ? all.filter(s => s.title.toLowerCase().includes(q)) : all;

  $("#view-playbook").innerHTML = `
    <h1>playbook</h1>
    <p class="muted mb-3">tap one. it walks you through, one step at a time.</p>

    <div class="card pad-sm mb-2">
      <div class="row" style="gap:8px; align-items:center">
        <i class="ph ph-magnifying-glass" style="color:var(--pink-deep)"></i>
        <input type="search" id="pb-search" placeholder="search — 'spiral', 'binge', 'prakhar'..." value="${escapeHTML(PLAYBOOK_QUERY)}" style="border:0; background:transparent; padding:6px 4px" />
      </div>
    </div>

    <div class="mb-3">
      <div class="eyebrow mb-2"><i class="ph-fill ph-sparkle"></i> fast access</div>
      <div class="tiles">
        ${DATA.quickAccess.map(q => {
          const scn = DATA.scenarioFlows[q.scenario];
          const icon = (DATA.scenarioIcon[q.scenario] || "sparkle").replace("ph-","");
          return `<button class="tile" data-launch-scn="${q.scenario}">
            <i class="ph-fill ph-${icon}"></i>
            <span class="label">${escapeHTML(scn.title)}</span>
          </button>`;
        }).join("")}
      </div>
    </div>

    <div class="eyebrow mb-2"><i class="ph ph-book-open-text"></i> all 17</div>
    <div id="pb-list">
      ${list.map(s => `
        <div class="scn-row" data-launch-scn="${s.n}">
          <span class="n">#${String(s.n).padStart(2,"0")}</span>
          <i class="ph-fill ph-${(DATA.scenarioIcon[s.n] || "sparkle").replace("ph-","")} ico-lead"></i>
          <span class="title">${escapeHTML(s.title)}</span>
          <span class="play-arrow"><i class="ph-fill ph-play"></i></span>
        </div>
      `).join("") || `<p class="muted">no matches.</p>`}
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-1"><i class="ph ph-shield-check"></i> rules across the board</div>
      <p class="muted" style="font-size:0.88rem">never: ice cubes, cold-water shock, rubber-band snaps, calorie or portion numbers, auntie advice. warm sensory only. therapy recs are for extreme cases only — your call.</p>
    </div>
  `;

  $("#pb-search").addEventListener("input", (e) => {
    PLAYBOOK_QUERY = e.target.value;
    renderPlaybook();
    const i = $("#pb-search"); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); }
  });
  $$("[data-launch-scn]", $("#view-playbook")).forEach(el => el.addEventListener("click", () => {
    const n = +el.dataset.launchScn;
    const flow = DATA.scenarioFlows[n];
    if (flow) runFlow(flow, { title: flow.title, icon: (DATA.scenarioIcon[n] || "sparkle").replace("ph-",""), scenarioN: n });
  }));
};

// ==========================================================
// JOURNAL — verbatim port
// ==========================================================
let JOURNAL_TAB = "three";
RENDERERS.journal = function renderJournal() {
  $("#view-journal").innerHTML = `
    <h1>journal</h1>
    <p class="muted mb-3">private to this device.</p>
    <div class="subtabs">
      <button class="subtab ${JOURNAL_TAB === "three" ? "active" : ""}" data-jtab="three">three-question</button>
      <button class="subtab ${JOURNAL_TAB === "free" ? "active" : ""}" data-jtab="free">free</button>
      <button class="subtab ${JOURNAL_TAB === "truth" ? "active" : ""}" data-jtab="truth">truth list</button>
    </div>
    <div id="jcontent"></div>
  `;
  $$("[data-jtab]", $("#view-journal")).forEach(b =>
    b.addEventListener("click", () => { JOURNAL_TAB = b.dataset.jtab; renderJournal(); }));
  renderJournalTab();
};

function renderJournalTab() {
  const host = $("#jcontent"); if (!host) return;
  if (JOURNAL_TAB === "three") {
    host.innerHTML = `
      <div class="card">
        <div class="eyebrow mb-2"><i class="ph-fill ph-pencil-line"></i> three questions — for a disproportionate reaction</div>
        <label>what happened — factually</label>
        <textarea id="q1" placeholder="just the facts."></textarea>
        <label class="mt-2">what i felt</label>
        <textarea id="q2" placeholder="name it."></textarea>
        <label class="mt-2">what it reminded me of</label>
        <textarea id="q3" placeholder="the echo. when have i felt this before?"></textarea>
        <div class="row mt-2" style="justify-content:flex-end">
          <button class="btn primary" id="save-three"><i class="ph ph-check"></i> save</button>
        </div>
      </div>
      ${renderEntries("three")}
    `;
    $("#save-three").addEventListener("click", () => {
      const e = { id: Date.now(), type: "three", date: today(),
        q1: $("#q1").value.trim(), q2: $("#q2").value.trim(), q3: $("#q3").value.trim() };
      if (!e.q1 && !e.q2 && !e.q3) return;
      STATE.entries.unshift(e); persist(); renderJournalTab();
      toast("saved", "success");
    });
  } else if (JOURNAL_TAB === "free") {
    host.innerHTML = `
      <div class="card">
        <div class="eyebrow mb-2"><i class="ph-fill ph-pencil-line"></i> free entry</div>
        <label>mood (optional)</label>
        <div class="row mb-2" id="mood-row">
          ${["regulated","tired","anxious","spiraling","numb","hopeful"].map(m =>
            `<button class="pill" data-mood="${m}">${m}</button>`).join("")}
        </div>
        <label>what's going on</label>
        <textarea id="fbody" rows="7" placeholder="nothing has to be tidy. just get it out."></textarea>
        <div class="row mt-2" style="justify-content:flex-end">
          <button class="btn primary" id="save-free"><i class="ph ph-check"></i> save</button>
        </div>
      </div>
      ${renderEntries("free")}
    `;
    let mood = "";
    $$("[data-mood]", host).forEach(b => b.addEventListener("click", () => {
      mood = b.dataset.mood;
      $$("[data-mood]", host).forEach(x => x.classList.remove("lilac"));
      b.classList.add("lilac");
    }));
    $("#save-free").addEventListener("click", () => {
      const body = $("#fbody").value.trim();
      if (!body) return;
      STATE.entries.unshift({ id: Date.now(), type: "free", date: today(), mood, body });
      persist(); renderJournalTab();
      toast("saved", "success");
    });
  } else if (JOURNAL_TAB === "truth") {
    host.innerHTML = `
      <div class="card">
        <div class="eyebrow mb-2"><i class="ph-fill ph-flower-lotus"></i> truth list — compliments, dated and attributed</div>
        <p class="muted mb-2" style="font-size:0.88rem">external memory. counterweight to "i don't believe compliments."</p>
        <label>the compliment (exact words)</label>
        <textarea id="tquote" rows="2" placeholder="what did they say?"></textarea>
        <label class="mt-2">who said it</label>
        <input type="text" id="twho" placeholder="prakhar / amma / etc." />
        <div class="row mt-2" style="justify-content:flex-end">
          <button class="btn primary" id="save-truth"><i class="ph ph-plus"></i> add</button>
        </div>
      </div>
      <div class="mt-3">
        ${STATE.truth.length === 0
          ? `<p class="muted">no entries yet. when you get one — add it. don't argue with it.</p>`
          : STATE.truth.map(t => `
            <div class="entry truth">
              <div class="meta"><i class="ph-fill ph-flower-lotus"></i> ${fmtDateLong(t.date)} · from ${escapeHTML(t.who)}</div>
              <div class="content">"${escapeHTML(t.quote)}"</div>
              <div class="row mt-1" style="justify-content:flex-end">
                <button class="btn tiny ghost" data-del-truth="${t.id}"><i class="ph ph-trash"></i></button>
              </div>
            </div>`).join("")}
      </div>
    `;
    $("#save-truth").addEventListener("click", () => {
      const quote = $("#tquote").value.trim();
      const who = $("#twho").value.trim();
      if (!quote || !who) return;
      STATE.truth.unshift({ id: Date.now(), date: today(), quote, who });
      persist(); renderJournalTab();
      toast("added", "success");
    });
    $$("[data-del-truth]", host).forEach(b => b.addEventListener("click", () => {
      STATE.truth = STATE.truth.filter(t => t.id !== +b.dataset.delTruth);
      persist(); renderJournalTab();
    }));
  }
}
function renderEntries(type) {
  const entries = STATE.entries.filter(e => e.type === type);
  if (entries.length === 0) return `<p class="muted mt-3">no entries yet.</p>`;
  return `<div class="mt-3">
    ${entries.slice(0, 30).map(e => e.type === "three"
      ? `<div class="entry">
          <div class="meta"><i class="ph ph-pencil-line"></i> ${fmtDateLong(e.date)}</div>
          <div class="three-q">
            ${e.q1 ? `<div><div class="lbl">factually</div>${escapeHTML(e.q1)}</div>` : ""}
            ${e.q2 ? `<div><div class="lbl">felt</div>${escapeHTML(e.q2)}</div>` : ""}
            ${e.q3 ? `<div><div class="lbl">reminded of</div>${escapeHTML(e.q3)}</div>` : ""}
          </div>
          <div class="row mt-1" style="justify-content:flex-end">
            <button class="btn tiny ghost" data-del="${e.id}"><i class="ph ph-trash"></i></button>
          </div>
        </div>`
      : `<div class="entry">
          <div class="meta"><i class="ph ph-pencil-line"></i> ${fmtDateLong(e.date)}${e.mood ? ` · <span class="pill lilac">${e.mood}</span>` : ""}</div>
          <div class="content">${escapeHTML(e.body)}</div>
          <div class="row mt-1" style="justify-content:flex-end">
            <button class="btn tiny ghost" data-del="${e.id}"><i class="ph ph-trash"></i></button>
          </div>
        </div>`
    ).join("")}
  </div>`;
}
document.addEventListener("click", (e) => {
  const del = e.target.closest("[data-del]");
  if (!del) return;
  STATE.entries = STATE.entries.filter(x => x.id !== +del.dataset.del);
  persist();
  if ($("#jcontent")) renderJournalTab();
});

// ==========================================================
// ME — verbatim port (settings, patterns, language, etc.)
// ==========================================================
let ME_TAB = "patterns";
RENDERERS.me = function renderMe() {
  const id = DATA.identity;
  $("#view-me").innerHTML = `
    <h1>me</h1>
    <div class="identity-card mt-2 mb-3">
      <h2 style="font-size:1.5rem">${escapeHTML(id.name)}</h2>
      <p class="muted">${escapeHTML(id.pronouns)} · ${id.age}</p>
      <dl class="mt-2">
        <dt>where</dt><dd>${escapeHTML(id.where)}</dd>
        <dt>partner</dt><dd>${escapeHTML(id.partner)}</dd>
        <dt>people</dt><dd>${escapeHTML(id.people)}</dd>
        <dt>placed at</dt><dd>${escapeHTML(id.placedAt)}</dd>
      </dl>
    </div>
    <div class="subtabs">
      <button class="subtab ${ME_TAB === "patterns" ? "active" : ""}" data-mtab="patterns">patterns</button>
      <button class="subtab ${ME_TAB === "language" ? "active" : ""}" data-mtab="language">my language</button>
      <button class="subtab ${ME_TAB === "projects" ? "active" : ""}" data-mtab="projects">projects</button>
      <button class="subtab ${ME_TAB === "writing" ? "active" : ""}" data-mtab="writing">writing</button>
      <button class="subtab ${ME_TAB === "updates" ? "active" : ""}" data-mtab="updates">updates</button>
      <button class="subtab ${ME_TAB === "settings" ? "active" : ""}" data-mtab="settings">settings</button>
    </div>
    <div id="mcontent"></div>
  `;
  $$("[data-mtab]", $("#view-me")).forEach(b =>
    b.addEventListener("click", () => { ME_TAB = b.dataset.mtab; renderMe(); }));
  renderMeTab();
};

function renderMeTab() {
  const host = $("#mcontent"); if (!host) return;
  if (ME_TAB === "patterns") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-info"></i> 12 patterns · reference</div>
      <p class="muted mb-2" style="font-size:0.88rem">notice when they show up.</p>
      ${DATA.patterns.map(p => `
        <div class="pattern-card">
          <div class="n">#${String(p.n).padStart(2,"0")}</div>
          <h4>${escapeHTML(p.title)}</h4>
          <dl>
            <div><dt>root</dt><dd>${escapeHTML(p.root)}</dd></div>
            <div><dt>shows up</dt><dd>${escapeHTML(p.showsUp)}</dd></div>
            <div><dt>brain link</dt><dd>${escapeHTML(p.brain)}</dd></div>
          </dl>
        </div>
      `).join("")}
    `;
  } else if (ME_TAB === "projects") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph-fill ph-folder"></i> projects</div>
      ${STATE.projects.map(p => `
        <div class="card pad-sm">
          <div class="row-between">
            <div style="flex:1">
              <div style="font-weight:600">${escapeHTML(p.label)}</div>
              <div class="tiny mt-1">${escapeHTML(p.note)}</div>
            </div>
            <select data-pstatus="${p.id}">
              ${["active","paused","dead","done"].map(s =>
                `<option value="${s}" ${p.status === s ? "selected" : ""}>${s}</option>`).join("")}
            </select>
          </div>
        </div>
      `).join("")}
    `;
    $$("[data-pstatus]", host).forEach(sel => sel.addEventListener("change", () => {
      const p = STATE.projects.find(x => x.id === sel.dataset.pstatus);
      if (p) { p.status = sel.value; persist(); }
    }));
  } else if (ME_TAB === "writing") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph-fill ph-pencil-line"></i> substack candidates</div>
      <p class="muted mb-2" style="font-size:0.88rem">input without output is saving-instead-of-doing. one a month.</p>
      ${STATE.writingIdeas.map(w => `
        <div class="card pad-sm">
          <div class="row-between" style="align-items:flex-start">
            <div style="flex:1">
              <div style="font-weight:500; font-size:0.92rem">${escapeHTML(w.title)}</div>
            </div>
            <select data-wstatus="${w.id}">
              ${["idea","drafting","published","parked"].map(s =>
                `<option value="${s}" ${w.status === s ? "selected" : ""}>${s}</option>`).join("")}
            </select>
          </div>
        </div>
      `).join("")}
    `;
    $$("[data-wstatus]", host).forEach(sel => sel.addEventListener("change", () => {
      const w = STATE.writingIdeas.find(x => x.id === +sel.dataset.wstatus);
      if (w) { w.status = sel.value; persist(); }
    }));
  } else if (ME_TAB === "updates") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-clock"></i> running updates</div>
      <div class="card">
        <label>date</label>
        <input type="date" id="u-date" value="${today()}" />
        <label class="mt-2">what changed</label>
        <textarea id="u-changed" rows="2"></textarea>
        <label class="mt-2">new pattern / anchor example</label>
        <textarea id="u-pattern" rows="2"></textarea>
        <label class="mt-2">what stopped being true</label>
        <textarea id="u-stopped" rows="2"></textarea>
        <label class="mt-2">focus for next session</label>
        <textarea id="u-focus" rows="2"></textarea>
        <div class="row mt-2" style="justify-content:flex-end">
          <button class="btn primary" id="u-save"><i class="ph ph-plus"></i> add</button>
        </div>
      </div>
      <div class="mt-3">
        ${STATE.updates.length === 0 ? `<p class="muted">no updates yet.</p>` :
          STATE.updates.map(u => `
            <div class="entry">
              <div class="meta"><i class="ph ph-clock"></i> ${fmtDateLong(u.date)}</div>
              <div class="three-q">
                ${u.changed ? `<div><div class="lbl">changed</div>${escapeHTML(u.changed)}</div>` : ""}
                ${u.pattern ? `<div><div class="lbl">new pattern</div>${escapeHTML(u.pattern)}</div>` : ""}
                ${u.stopped ? `<div><div class="lbl">stopped being true</div>${escapeHTML(u.stopped)}</div>` : ""}
                ${u.focus ? `<div><div class="lbl">next focus</div>${escapeHTML(u.focus)}</div>` : ""}
              </div>
              <div class="row mt-1" style="justify-content:flex-end">
                <button class="btn tiny ghost" data-u-del="${u.id}"><i class="ph ph-trash"></i></button>
                <button class="btn tiny" data-u-copy="${u.id}"><i class="ph ph-copy"></i> copy</button>
              </div>
            </div>`).join("")}
      </div>
    `;
    $("#u-save").addEventListener("click", () => {
      const u = { id: Date.now(), date: $("#u-date").value || today(),
        changed: $("#u-changed").value.trim(), pattern: $("#u-pattern").value.trim(),
        stopped: $("#u-stopped").value.trim(), focus: $("#u-focus").value.trim() };
      if (!u.changed && !u.pattern && !u.stopped && !u.focus) return;
      STATE.updates.unshift(u); persist(); renderMeTab();
      toast("saved", "success");
    });
    $$("[data-u-del]", host).forEach(b => b.addEventListener("click", () => {
      STATE.updates = STATE.updates.filter(u => u.id !== +b.dataset.uDel);
      persist(); renderMeTab();
    }));
    $$("[data-u-copy]", host).forEach(b => b.addEventListener("click", () => {
      const u = STATE.updates.find(x => x.id === +b.dataset.uCopy); if (!u) return;
      const txt = `UPDATE ${u.date}\n- What changed: ${u.changed}\n- New pattern: ${u.pattern}\n- Stopped being true: ${u.stopped}\n- Focus: ${u.focus}`;
      navigator.clipboard.writeText(txt);
      toast("copied", "success");
    }));
  } else if (ME_TAB === "language") {
    renderLanguageTab(host);
  } else if (ME_TAB === "settings") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-gear"></i> settings</div>
      <div class="card pad-sm">
        <div class="row-between">
          <div><div style="font-weight:500">theme</div><div class="tiny">pastel pink or midnight</div></div>
          <div class="row" style="gap:6px">
            <button class="btn tiny ${STATE.theme === "light" ? "primary" : ""}" data-theme="light"><i class="ph ph-sun"></i> light</button>
            <button class="btn tiny ${STATE.theme === "dark" ? "primary" : ""}" data-theme="dark"><i class="ph ph-moon"></i> dark</button>
          </div>
        </div>
      </div>
      <div class="card pad-sm">
        <div class="row-between">
          <div><div style="font-weight:500">block start date</div><div class="tiny">when you start a new block, update this</div></div>
          <input type="date" id="block-start" value="${STATE.blockStart}" style="max-width:180px" />
        </div>
      </div>
      <div class="card pad-sm">
        <div class="row-between">
          <div><div style="font-weight:500">non-negotiables</div><div class="tiny">restore the default list</div></div>
          <button class="btn tiny" id="reset-nn"><i class="ph ph-arrow-counter-clockwise"></i> restore defaults</button>
        </div>
      </div>
      <div class="card">
        <div class="eyebrow mb-1"><i class="ph ph-copy"></i> drift-correction line</div>
        <div class="quote-box">${escapeHTML(DATA.drift)}</div>
        <div class="row mt-1" style="justify-content:flex-end"><button class="btn tiny" id="copy-drift"><i class="ph ph-copy"></i> copy</button></div>
      </div>
      <div class="card">
        <div class="eyebrow mb-1"><i class="ph ph-info"></i> safety line (for extreme cases)</div>
        <div class="quote-box">${escapeHTML(DATA.safetyCopy.sample)}</div>
        <div class="row mt-1" style="justify-content:flex-end"><button class="btn tiny" id="copy-safety"><i class="ph ph-copy"></i> copy</button></div>
      </div>
      <div class="card">
        <div class="eyebrow mb-1"><i class="ph-fill ph-folder-open"></i> data</div>
        <p class="tiny mb-2">everything lives in this browser's localStorage. export a backup anytime.</p>
        <div class="row" style="gap:8px">
          <button class="btn" id="export-data"><i class="ph ph-download-simple"></i> export json</button>
          <button class="btn" id="import-data"><i class="ph ph-upload-simple"></i> import json</button>
          <input type="file" id="import-file" accept="application/json" class="hidden" />
          <button class="btn ghost" id="reset-data"><i class="ph ph-trash"></i> reset everything</button>
        </div>
      </div>
    `;
    $$("[data-theme]", host).forEach(b => b.addEventListener("click", () => {
      STATE.theme = b.dataset.theme; persist(); applyTheme(); renderMeTab();
    }));
    $("#block-start").addEventListener("change", (e) => { STATE.blockStart = e.target.value; persist(); });
    $("#reset-nn").addEventListener("click", () => {
      if (confirm("Restore the default non-negotiables list?")) {
        STATE.nonNegotiables = DATA.nonNegotiablesDefault.slice();
        persist(); toast("defaults restored", "success");
      }
    });
    $("#copy-drift").addEventListener("click", () => { navigator.clipboard.writeText(DATA.drift); toast("copied", "success"); });
    $("#copy-safety").addEventListener("click", () => { navigator.clipboard.writeText(DATA.safetyCopy.sample); toast("copied", "success"); });
    $("#export-data").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `sriya-v3-backup-${today()}.json`; a.click();
      URL.revokeObjectURL(url);
    });
    $("#import-data").addEventListener("click", () => $("#import-file").click());
    $("#import-file").addEventListener("change", (e) => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (!confirm("Replace everything with this backup?")) return;
          Object.assign(STATE, parsed); persist(); applyTheme(); renderMe();
          toast("imported", "success");
        } catch { alert("That file didn't parse."); }
      };
      reader.readAsText(file);
    });
    $("#reset-data").addEventListener("click", () => {
      if (!confirm("Reset ALL data on this device? Cannot be undone.")) return;
      Object.keys(localStorage).filter(k => k.startsWith(NS)).forEach(k => localStorage.removeItem(k));
      location.reload();
    });
  }
}

// MY LANGUAGE — verbatim port
const LANG_OPEN = {};
function renderLanguageTab(host) {
  const total = DATA.myLanguage.length;
  const answered = Object.values(STATE.langAnswers).filter(v => v && String(v).trim()).length;
  const pct = Math.round((answered / total) * 100);

  const bySec = {};
  DATA.myLanguage.forEach(q => {
    if (!bySec[q.section]) bySec[q.section] = { label: q.sectionLabel, items: [] };
    bySec[q.section].items.push(q);
  });
  const secKeys = Object.keys(bySec).sort();

  host.innerHTML = `
    <div class="eyebrow mb-2"><i class="ph-fill ph-chat-teardrop-text"></i> my language</div>
    <p class="muted mb-2" style="font-size:0.88rem">50 questions. answer what's easy, skip what isn't. your words become what the chat bestie listens for. commas → multiple phrases.</p>

    <div class="lang-progress">
      <i class="ph-fill ph-sparkle" style="color:var(--pink-deep); font-size:1.3rem"></i>
      <div style="flex:1">
        <div style="font-size:0.85rem; font-weight:500">${answered} / ${total} answered · ${pct}%</div>
        <div class="lang-progress-bar mt-1"><div class="lang-progress-fill" style="width:${pct}%"></div></div>
      </div>
    </div>

    ${secKeys.map(s => {
      const sec = bySec[s];
      const secAnswered = sec.items.filter(q => STATE.langAnswers[q.id] && String(STATE.langAnswers[q.id]).trim()).length;
      const isOpen = LANG_OPEN[s] || false;
      return `
        <div class="lang-section ${isOpen ? "open" : ""}" data-sec="${s}">
          <div class="lang-section-header" data-toggle-sec="${s}">
            <span style="font-family:var(--display); font-style:italic; font-size:1.1rem; color:var(--pink-ink)">${s.toUpperCase()}.</span>
            <span class="lang-section-title">${escapeHTML(sec.label)}</span>
            <span class="lang-section-count">${secAnswered}/${sec.items.length}</span>
            <i class="ph ph-caret-right nn-group-caret"></i>
          </div>
          <div class="lang-section-body">
            ${sec.items.map(q => {
              const ans = STATE.langAnswers[q.id] || "";
              return `<div class="lang-q">
                <div class="lang-q-text ${ans.trim() ? "answered" : ""}">${escapeHTML(q.q)}${q.route ? ` <span class="pill" style="font-size:0.65rem; padding:1px 7px">→ #${q.route}</span>` : ""}</div>
                <input type="text" data-lang="${q.id}" value="${escapeHTML(ans)}" placeholder="your words... (separate multiple with , )" autocomplete="off" />
              </div>`;
            }).join("")}
          </div>
        </div>
      `;
    }).join("")}
  `;

  $$("[data-toggle-sec]", host).forEach(el => el.addEventListener("click", () => {
    const s = el.dataset.toggleSec;
    LANG_OPEN[s] = !LANG_OPEN[s];
    el.closest(".lang-section").classList.toggle("open");
  }));

  let saveTimer = null;
  $$("[data-lang]", host).forEach(inp => {
    inp.addEventListener("input", () => {
      STATE.langAnswers[inp.dataset.lang] = inp.value;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        persist();
        const total = DATA.myLanguage.length;
        const answered = Object.values(STATE.langAnswers).filter(v => v && String(v).trim()).length;
        const pctEl = host.querySelector(".lang-progress div[style*='font-size']");
        if (pctEl) pctEl.textContent = `${answered} / ${total} answered · ${Math.round(answered/total*100)}%`;
        const fill = host.querySelector(".lang-progress-fill");
        if (fill) fill.style.width = `${(answered/total)*100}%`;
      }, 400);
    });
  });
}

// ==========================================================
// VIEW: PEOPLE
// ==========================================================
RENDERERS.people = function renderPeople() {
  $("#view-people").innerHTML = `
    <div class="row-between mb-2">
      <h1>people</h1>
      <button class="btn primary" id="add-person"><i class="ph ph-plus"></i> add</button>
    </div>
    <p class="muted mb-3">your people, with notes you keep adding to.</p>
    <div class="people-grid">
      ${STATE.people.map(p => `
        <button class="person-card tone-${p.color || "pink"}" data-person="${p.id}">
          <span class="person-svg">${personSvg(p)}</span>
          <span class="person-name">${escapeHTML(p.name)}</span>
          <span class="person-relation">${escapeHTML(p.relation)}</span>
        </button>
      `).join("")}
    </div>
  `;
  $$("[data-person]", $("#view-people")).forEach(b => b.addEventListener("click", () => {
    const p = STATE.people.find(x => x.id === b.dataset.person);
    if (p) openPersonSheet(p);
  }));
  $("#add-person").addEventListener("click", () => openPersonSheet(null));
};

function openPersonSheet(person) {
  const isNew = !person;
  const p = person || { id: "person-" + Date.now().toString(36), name: "", relation: "", emoji: "🌸", color: "pink", note: "", customIcon: null };

  // Available built-in person icon IDs
  const builtInIconIds = Object.keys(PERSON_SVGS);

  openSheet(isNew ? "add person" : escapeHTML(p.name), `
    <form id="person-form">
      <div>
        <label>name</label>
        <input type="text" name="name" value="${escapeHTML(p.name)}" placeholder="name" required />
      </div>
      <div>
        <label>relation</label>
        <input type="text" name="relation" value="${escapeHTML(p.relation)}" placeholder="friend, family, partner…" />
      </div>
      <div>
        <label>icon</label>
        <div class="person-icon-picker" id="person-icon-picker">
          <div class="person-icon-tabs">
            <button type="button" class="person-icon-tab active" data-itab="svg">illustrated</button>
            <button type="button" class="person-icon-tab" data-itab="emoji">emoji</button>
          </div>
          <div id="person-icon-svg-grid" class="person-icon-grid">
            ${builtInIconIds.map(id => `
              <button type="button" class="person-icon-cell ${(p.customIcon===id||(!p.customIcon&&p.id===id))?"selected":""}" data-pick-svg="${id}" title="${id}">
                <span class="psvg-thumb">${PERSON_SVGS[id] || ""}</span>
              </button>
            `).join("")}
          </div>
          <div id="person-icon-emoji-wrap" class="hidden" style="margin-top:8px">
            <div class="field-row">
              <button type="button" class="emoji-trigger" id="p-emoji" style="font-size:1.4rem; width:44px; height:44px">${p.emoji || "🌸"}</button>
              <span class="tiny" style="color:var(--ink-faint); align-self:center">tap to pick an emoji</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label>tone</label>
        <select name="color">
          ${["pink","butter","mint","lilac","blue","chrome"].map(c => `<option value="${c}" ${c===p.color?"selected":""}>${c}</option>`).join("")}
        </select>
      </div>
      <div>
        <label>notes</label>
        <textarea name="note" rows="4" placeholder="what you want to remember about them">${escapeHTML(p.note || "")}</textarea>
      </div>
      ${p.updatedAt ? `<div class="tiny">last updated · ${escapeHTML(p.updatedAt)}</div>` : ""}
      <div class="row-end">
        ${!isNew ? `<button type="button" class="btn ghost" id="p-del"><i class="ph ph-trash"></i> delete</button>` : ""}
        <button type="submit" class="btn primary"><i class="ph ph-check"></i> save</button>
      </div>
    </form>
  `, (root) => {
    let pickedEmoji = p.emoji || "🌸";
    // customIcon: null = use personSvg(id) lookup, a string key = use that key, "emoji" = use pickedEmoji
    let pickedIconMode = (p.customIcon && p.customIcon !== "emoji") ? "svg" : (p.customIcon === "emoji" ? "emoji" : "svg");
    let pickedSvgKey = (p.customIcon && p.customIcon !== "emoji") ? p.customIcon : (builtInIconIds.includes(p.id) ? p.id : builtInIconIds[0]);

    const svgGrid = $("#person-icon-svg-grid", root);
    const emojiWrap = $("#person-icon-emoji-wrap", root);

    function switchIconTab(tab) {
      pickedIconMode = tab;
      $$(".person-icon-tab", root).forEach(b => b.classList.toggle("active", b.dataset.itab === tab));
      svgGrid.classList.toggle("hidden", tab !== "svg");
      emojiWrap.classList.toggle("hidden", tab !== "emoji");
    }

    $$("[data-itab]", root).forEach(b => b.addEventListener("click", () => switchIconTab(b.dataset.itab)));
    switchIconTab(pickedIconMode);

    $$("[data-pick-svg]", root).forEach(b => b.addEventListener("click", () => {
      pickedSvgKey = b.dataset.pickSvg;
      $$("[data-pick-svg]", root).forEach(x => x.classList.toggle("selected", x.dataset.pickSvg === pickedSvgKey));
    }));

    $("#p-emoji", root)?.addEventListener("click", (e) => {
      e.preventDefault();
      openEmojiPicker(e.currentTarget, (em) => {
        pickedEmoji = em;
        $("#p-emoji", root).textContent = em;
      });
    });

    $("#person-form", root).addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const name = f.name.value.trim(); if (!name) return;
      const updated = {
        ...p,
        name,
        relation: f.relation.value.trim(),
        color: f.color.value,
        note: f.note.value.trim(),
        emoji: pickedEmoji,
        customIcon: pickedIconMode === "emoji" ? "emoji" : pickedSvgKey,
        updatedAt: today(),
      };
      const idx = STATE.people.findIndex(x => x.id === p.id);
      if (idx >= 0) STATE.people[idx] = updated;
      else STATE.people.push(updated);
      persist(); closeSheet(); RENDERERS.people();
    });
    const delBtn = $("#p-del", root);
    if (delBtn) delBtn.addEventListener("click", () => {
      if (!confirm("Remove this person?")) return;
      STATE.people = STATE.people.filter(x => x.id !== p.id);
      persist(); closeSheet(); RENDERERS.people();
    });
  });
}

// ==========================================================
// ==========================================================
// VIEW: UPSC
// ==========================================================

// ── URL map for infotainment links ─────────────────────────
const INFO_URLS = {
  'Indian Express Explained': ['https://indianexpress.com/section/explained/', 'web'],
  'The Hindu editorial page': ['https://www.thehindu.com/opinion/editorial/', 'web'],
  'The Hindu editorial': ['https://www.thehindu.com/opinion/editorial/', 'web'],
  'PIB Press Releases': ['https://pib.gov.in/', 'web'],
  'PRS India': ['https://prsindia.org/', 'web'],
  'All Things Policy': ['https://open.spotify.com/show/0JEBlUNCM3mSLiKFPJAUcb', 'sp'],
  'The Core Report': ['https://open.spotify.com/show/3kFNsTGjuFIXBGjPDdBbPy', 'sp'],
  'Finshots Daily': ['https://finshots.in/', 'web'],
  'Finshots': ['https://finshots.in/', 'web'],
  'StudyIQ IAS': ['https://www.youtube.com/@StudyIQ', 'yt'],
  'Drishti IAS': ['https://www.youtube.com/@DrishtiIASvideos', 'yt'],
  'Vikas Divyakirti': ['https://www.youtube.com/@DrishtiIASvideos', 'yt'],
  'Drishti IAS Mock Interviews': ['https://www.youtube.com/@DrishtiIASvideos', 'yt'],
  'ForumIAS': ['https://www.youtube.com/@ForumIAS', 'yt'],
  'Anticipating the Unintended': ['https://publicpolicy.substack.com/', 'web'],
  'Yojana': ['https://yojana.gov.in/', 'web'],
  'Kurukshetra': ['https://www.kurukshetra.nic.in/', 'web'],
  'Economic & Political Weekly': ['https://www.epw.in/', 'web'],
  'The Caravan': ['https://caravanmagazine.in/', 'web'],
  'Seminar Magazine': ['http://www.india-seminar.com/', 'web'],
  'Seen & Unseen': ['https://open.spotify.com/show/6Oe9eVSyGvlJOgMIaBPBNw', 'sp'],
  'Dwarkesh Patel': ['https://www.youtube.com/@DwarkeshPatel', 'yt'],
  'Bharat Ek Khoj': ['https://www.youtube.com/results?search_query=bharat+ek+khoj+full+episodes', 'yt'],
  'Harvard Justice': ['https://www.youtube.com/playlist?list=PL30C13C91CFFE92AC', 'yt'],
  'Sandel': ['https://www.youtube.com/playlist?list=PL30C13C91CFFE92AC', 'yt'],
  'Aeon': ['https://aeon.co/', 'web'],
  'LongReads': ['https://longreads.com/', 'web'],
  'Kurzgesagt': ['https://www.youtube.com/@kurzgesagt', 'yt'],
  'Kurzgesagt – In a Nutshell': ['https://www.youtube.com/@kurzgesagt', 'yt'],
  'Veritasium': ['https://www.youtube.com/@veritasium', 'yt'],
  '3Blue1Brown': ['https://www.youtube.com/@3blue1brown', 'yt'],
  'Crash Course World History': ['https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9', 'yt'],
  'Crash Course Economics': ['https://www.youtube.com/playlist?list=PLGnuxOrmnl7z4mJOiRRgGmMxSJLXMsUba', 'yt'],
  'Real Life Lore': ['https://www.youtube.com/@RealLifeLore', 'yt'],
  'Wendover Productions': ['https://www.youtube.com/@Wendoverproductions', 'yt'],
  'CaspianReport': ['https://www.youtube.com/@CaspianReport', 'yt'],
  'PolyMatter': ['https://www.youtube.com/@PolyMatter', 'yt'],
  'Think School': ['https://www.youtube.com/@ThinkSchool', 'yt'],
  'Mrunal Patel': ['https://www.youtube.com/@MrunalPatel', 'yt'],
  'The Print': ['https://www.youtube.com/@ThePrintIndia', 'yt'],
  'Lallantop': ['https://www.youtube.com/@TheLallantop', 'yt'],
  'Puliyabaazi': ['https://open.spotify.com/show/7rJAi0cq8tlKDGQi7fIWze', 'sp'],
  'Revolutions': ['https://www.revolutionspodcast.com/', 'web'],
  'Hardcore History': ['https://www.dancarlin.com/hardcore-history-series/', 'web'],
  'In Our Time': ['https://www.bbc.co.uk/programmes/b006qykl/episodes/player', 'web'],
  'Planet Money': ['https://www.npr.org/podcasts/510289/planet-money', 'web'],
  'Grand Tamasha': ['https://open.spotify.com/show/5RXAcayrJ42EjsC7Qlbyqw', 'sp'],
  'Ideas of India': ['https://www.mercatus.org/podcast/ideas-india', 'web'],
  'Brilliant.org': ['https://brilliant.org/', 'web'],
  'Khan Academy': ['https://www.khanacademy.org/', 'web'],
  'Frontline': ['https://frontline.thehindu.com/', 'web'],
  'Philosophy Bites': ['https://www.philosophybites.com/', 'web'],
  'History of India Podcast': ['https://historyofindiapodcast.com/', 'web'],
  'Echoes of India': ['https://open.spotify.com/show/3DVOzFh7vlQZ0IUWsAuN2F', 'sp'],
  'Anirudh Kanisetti': ['https://www.youtube.com/@AnirudhKanisetti', 'yt'],
  'Economic Survey': ['https://www.indiabudget.gov.in/economicsurvey/', 'web'],
  'Paisa Vaisa': ['https://open.spotify.com/show/6y07HnFJPFkSWG6J1htBDT', 'sp'],
  'Chanakya': ['https://www.youtube.com/results?search_query=chanakya+dd+series+1991', 'yt'],
  'Extra History': ['https://www.youtube.com/@ExtraHistory', 'yt'],
  'Kings and Generals': ['https://www.youtube.com/@KingsandGenerals', 'yt'],
  'Oversimplified': ['https://www.youtube.com/@Oversimplified', 'yt'],
  'Lex Fridman': ['https://www.youtube.com/@lexfridman', 'yt'],
  'Dhruv Rathee': ['https://www.youtube.com/@dhruvrathee', 'yt'],
  'Inshorts': ['https://www.inshorts.com/', 'web'],
  'Anki': ['https://apps.ankiweb.net/', 'web'],
};

function renderInfoText(raw) {
  let t = escapeHTML(raw);
  for (const [name, [url, type]] of Object.entries(INFO_URLS)) {
    const ename = escapeHTML(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const ico = type === 'yt' ? '▶' : type === 'sp' ? '🎵' : '↗';
    const lnk = `<a href="${url}" target="_blank" rel="noopener" class="ilink ilink-${type}">${escapeHTML(name)}<span class="ilink-ico">${ico}</span></a>`;
    ['link','YT','Spotify','BBC','Aeon','link'].forEach(tag => {
      t = t.replace(new RegExp(ename + ' \\[' + tag + '\\]', 'g'), lnk);
    });
  }
  t = t.replace(/\[(?:link|YT|Spotify|BBC|Aeon)\]/g, '');
  return t;
}

function iitemClass(item) {
  if (item.startsWith('⭐')) return 'ii-star';
  if (item.startsWith('🎯')) return 'ii-sneak';
  if (item.startsWith('🔥')) return 'ii-fire';
  return '';
}

let UPSC_TAB = "overview";
let UPSC_ATLAS_SUB = "themes";

RENDERERS.upsc = function renderUPSC() {
  const minsToday = STATE.timeLog
    .filter(e => e.date === today() && e.categoryId === "upsc")
    .reduce((s, e) => s + (e.mins || 0), 0);
  const streak = (() => {
    let n = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0,10);
      const has = STATE.upscStudyLog.some(l => l.date === iso) || STATE.timeLog.some(l => l.date === iso && l.categoryId === "upsc");
      if (has) n++;
      else if (i > 0) break;
    }
    return n;
  })();
  const rp = STATE.upscReadProgress || {};
  const totalSec = (typeof INFOTAINMENT_DATA !== 'undefined') ? INFOTAINMENT_DATA.length : 0;
  const readCount = Object.keys(rp).length;

  $("#view-upsc").innerHTML = `
    <h1>upsc 📚</h1>
    <div class="subtabs">
      ${[["overview","overview"],["infotainment","infotainment atlas"],["atlas","knowledge atlas"],["subjects","subjects"],["resources","resources"],["log","study log"],["essay","essay bank"]].map(([k,l]) =>
        `<button class="subtab ${UPSC_TAB===k?"active":""}" data-utab="${k}">${l}</button>`).join("")}
    </div>
    <div id="upsc-body"></div>
  `;
  $$("[data-utab]", $("#view-upsc")).forEach(b => b.addEventListener("click", () => {
    UPSC_TAB = b.dataset.utab; renderUPSC();
  }));
  const host = $("#upsc-body");

  // ── OVERVIEW ─────────────────────────────────────────────
  if (UPSC_TAB === "overview") {
    const recentLog = (STATE.upscStudyLog || []).slice(0, 4);
    const totalMins = (STATE.upscStudyLog || []).reduce((s, l) => s + (l.mins || 0), 0);
    const pct = totalSec ? Math.round((readCount / totalSec) * 100) : 0;
    host.innerHTML = `
      <div class="card">
        <div class="eyebrow mb-1"><i class="ph-fill ph-target"></i> today's focus</div>
        <textarea id="upsc-goal" rows="2">${escapeHTML(STATE.upscGoal)}</textarea>
      </div>
      <div class="grid-3 mt-2">
        <div class="card pad-sm" style="text-align:center">
          <div class="tiny muted">today</div>
          <div class="big-stat">${minToHuman(minsToday)}</div>
        </div>
        <div class="card pad-sm" style="text-align:center">
          <div class="tiny muted">streak</div>
          <div class="big-stat">${streak}d 🔥</div>
        </div>
        <div class="card pad-sm" style="text-align:center">
          <div class="tiny muted">total logged</div>
          <div class="big-stat">${minToHuman(totalMins)}</div>
        </div>
      </div>
      <div class="card mt-2">
        <div class="row-between mb-1">
          <div class="eyebrow"><i class="ph ph-film-strip"></i> infotainment progress</div>
          <div class="tiny muted">${readCount}/${totalSec} sections</div>
        </div>
        <div class="upsc-prog-bar"><div class="upsc-prog-fill" style="width:${pct}%"></div></div>
        <div class="tiny muted mt-1">${pct}% of atlas explored</div>
      </div>
      <div class="card mt-2">
        <div class="eyebrow mb-2"><i class="ph ph-clock-clockwise"></i> recent study log</div>
        ${recentLog.length ? recentLog.map(l => `
          <div class="study-log-row row-between">
            <div><strong>${escapeHTML(l.subject)}</strong> · ${minToHuman(l.mins)}
              <div class="tiny muted">${escapeHTML(l.date)}${l.notes ? ' · ' + escapeHTML(l.notes) : ''}</div>
            </div>
          </div>`).join("") : `<p class="muted">no sessions logged yet. head to study log to add one.</p>`}
      </div>
    `;
    $("#upsc-goal").addEventListener("input", e => { STATE.upscGoal = e.target.value; persist(); });

  // ── INFOTAINMENT ATLAS ───────────────────────────────────
  } else if (UPSC_TAB === "infotainment") {
    if (typeof INFOTAINMENT_DATA === 'undefined') {
      host.innerHTML = `<p class="muted">infotainment data not loaded. make sure upsc_data.js is included.</p>`; return;
    }
    const pct = totalSec ? Math.round((readCount / totalSec) * 100) : 0;
    host.innerHTML = `
      <div class="card mb-3">
        <div class="row-between mb-1">
          <div>
            <div class="eyebrow">📺 UPSC Infotainment Atlas</div>
            <div class="tiny muted mt-1">covers prelims + all GS papers + essay + interview through shows, podcasts, books & games</div>
          </div>
          <div class="tiny muted" style="white-space:nowrap">${readCount}/${totalSec} read</div>
        </div>
        <div class="upsc-prog-bar"><div class="upsc-prog-fill" style="width:${pct}%"></div></div>
        <div class="tiny muted mt-2">⭐ = start here &nbsp;·&nbsp; 🎯 = sneaky UPSC prep &nbsp;·&nbsp; 🔥 = deep dive</div>
      </div>
      ${INFOTAINMENT_DATA.map(sec => {
        const isRead = !!rp[sec.id];
        const hasContent = sec.body.length || sec.sub.length;
        return `
        <div class="info-sec ${isRead ? 'info-sec-done' : ''}" id="isec-${sec.id}">
          <div class="info-sec-head" data-isecid="${sec.id}">
            <i class="ph ph-caret-right info-caret"></i>
            <span class="info-sec-title">${escapeHTML(sec.title)}</span>
            <button class="btn tiny ghost info-read-btn ml-auto" data-readid="${sec.id}" title="${isRead?'mark unread':'mark read'}">
              ${isRead ? '<i class="ph-fill ph-check-circle" style="color:var(--mint-ink)"></i>' : '<i class="ph ph-circle"></i>'}
            </button>
          </div>
          <div class="info-sec-body">
            ${sec.body.map(bt => `<p class="info-body">${renderInfoText(bt)}</p>`).join('')}
            ${sec.sub.map(sub => `
              <div class="info-subsec">
                <div class="info-sub-title">${escapeHTML(sub.title)}</div>
                ${sub.items.length ? `<ul class="info-items">${sub.items.map(it =>
                  `<li class="info-item ${iitemClass(it)}">${renderInfoText(it)}</li>`
                ).join('')}</ul>` : ''}
              </div>
            `).join('')}
          </div>
        </div>`;
      }).join('')}
    `;
    $$('[data-isecid]', host).forEach(head => {
      head.addEventListener('click', e => {
        if (e.target.closest('[data-readid]')) return;
        head.closest('.info-sec').classList.toggle('info-sec-open');
      });
    });
    $$('[data-readid]', host).forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.readid;
        STATE.upscReadProgress = STATE.upscReadProgress || {};
        if (STATE.upscReadProgress[id]) delete STATE.upscReadProgress[id];
        else STATE.upscReadProgress[id] = { date: today(), ts: Date.now() };
        persist(); renderUPSC();
      });
    });

  // ── KNOWLEDGE ATLAS ──────────────────────────────────────
  } else if (UPSC_TAB === "atlas") {
    if (typeof KNOWLEDGE_ATLAS === 'undefined') {
      host.innerHTML = `<p class="muted">atlas data not loaded.</p>`; return;
    }
    const ATLAS_SUBS = [['themes','recurring themes'],['gs2','GS2'],['gs3','GS3'],['gs4','GS4'],['prelims','Prelims']];
    host.innerHTML = `
      <div class="subtabs subtabs-sm mb-3">
        ${ATLAS_SUBS.map(([k,l]) => `<button class="subtab ${UPSC_ATLAS_SUB===k?'active':''}" data-asub="${k}">${l}</button>`).join('')}
      </div>
      <div id="atlas-body"></div>
    `;
    $$('[data-asub]', host).forEach(b => b.addEventListener('click', () => {
      UPSC_ATLAS_SUB = b.dataset.asub; renderUPSC();
    }));
    const ab = $("#atlas-body");

    if (UPSC_ATLAS_SUB === 'themes') {
      ab.innerHTML = `
        <div class="tiny muted mb-3">12 recurring cross-paper themes — each topic appears in multiple GS papers, optionals, and essays. mastering one theme covers ground in many papers.</div>
        ${KNOWLEDGE_ATLAS.map((theme, i) => `
          <div class="atlas-theme" id="at-${theme.id}">
            <div class="atlas-theme-head" data-atheme="${theme.id}">
              <i class="ph ph-caret-right atlas-caret"></i>
              <span class="atlas-theme-num">${i+1}</span>
              <span class="atlas-theme-title">${escapeHTML(theme.title)}</span>
            </div>
            <div class="atlas-theme-body">
              ${theme.secs.map(sec => `
                <div class="atlas-sec">
                  <div class="atlas-sec-title">${escapeHTML(sec.title)}</div>
                  <ul class="atlas-bullets">
                    ${sec.bullets.slice(0,6).map(b => `<li>${escapeHTML(b)}</li>`).join('')}
                    ${sec.bullets.length > 6 ? `<li class="muted tiny">+ ${sec.bullets.length-6} more</li>` : ''}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      `;
      $$('[data-atheme]', ab).forEach(head => {
        head.addEventListener('click', () => head.closest('.atlas-theme').classList.toggle('atlas-theme-open'));
      });
    } else {
      const DATA_MAP = {
        gs2: typeof IC_GS2 !== 'undefined' ? IC_GS2 : [],
        gs3: typeof IC_GS3 !== 'undefined' ? IC_GS3 : [],
        gs4: typeof IC_GS4 !== 'undefined' ? IC_GS4 : [],
        prelims: typeof IC_PRE !== 'undefined' ? IC_PRE : [],
      };
      const LABELS = { gs2:'GS2 — Polity, Governance, IR', gs3:'GS3 — Economy, Environment, S&T, Security', gs4:'GS4 — Ethics, Integrity & Aptitude', prelims:'Prelims — All Static + Current Affairs' };
      const secs = DATA_MAP[UPSC_ATLAS_SUB] || [];
      ab.innerHTML = `
        <div class="tiny muted mb-3">${LABELS[UPSC_ATLAS_SUB] || ''} — every sub-topic linked to other GS papers</div>
        ${secs.map(sec => `
          <div class="ic-sec">
            <div class="ic-sec-head" data-icsec="${escapeHTML(sec.title)}">
              <i class="ph ph-caret-right ic-caret"></i>
              <span>${escapeHTML(sec.title)}</span>
            </div>
            <div class="ic-sec-body">
              ${sec.items.map(it => `<div class="ic-item">${escapeHTML(it)}</div>`).join('')}
            </div>
          </div>
        `).join('')}
      `;
      $$('[data-icsec]', ab).forEach(head => {
        head.addEventListener('click', () => head.closest('.ic-sec').classList.toggle('ic-sec-open'));
      });
    }

  // ── SUBJECTS ─────────────────────────────────────────────
  } else if (UPSC_TAB === "subjects") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-bookmarks"></i> gs / essay / prelims — click to expand + add notes</div>
      ${STATE.upscSubjects.map(s => `
        <div class="subject-card ${s._open ? "open" : ""}" data-subj="${s.id}">
          <div class="sc-head">
            <span class="sc-emoji">${s.emoji}</span>
            <span class="sc-title">${escapeHTML(s.label)}</span>
            <span class="pill">${(s.topics||[]).length} topics</span>
            <i class="ph ph-caret-right nn-group-caret"></i>
          </div>
          <div class="sc-topics">
            ${(s.topics||[]).map(tp => {
              const k = tp.toLowerCase().replace(/\s+/g,"_");
              return `<div class="sc-topic">
                <div style="font-weight:500">${escapeHTML(tp)}</div>
                <textarea data-subj-note="${s.id}" data-topic-key="${k}" rows="2" placeholder="notes…">${escapeHTML((s.notes||{})[k] || "")}</textarea>
              </div>`;
            }).join("")}
          </div>
        </div>
      `).join("")}
    `;
    $$("[data-subj]", host).forEach(card => {
      $(".sc-head", card).addEventListener("click", () => {
        const s = STATE.upscSubjects.find(x => x.id === card.dataset.subj);
        s._open = !card.classList.contains("open");
        card.classList.toggle("open");
      });
    });
    $$("[data-subj-note]", host).forEach(ta => ta.addEventListener("input", () => {
      const s = STATE.upscSubjects.find(x => x.id === ta.dataset.subjNote);
      if (!s) return;
      s.notes = s.notes || {};
      s.notes[ta.dataset.topicKey] = ta.value;
      persist();
    }));

  // ── RESOURCES ────────────────────────────────────────────
  } else if (UPSC_TAB === "resources") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-books"></i> resources</div>
      ${STATE.upscResources.map((r, i) => `
        <div class="resource-row row-between">
          <div class="row" style="gap:8px">
            <span style="font-size:1.4rem">${r.emoji || "📘"}</span>
            <div>
              <div style="font-weight:500">${escapeHTML(r.label)}</div>
              <div class="tiny muted">${escapeHTML(r.subject || "")}</div>
            </div>
          </div>
          <button class="btn tiny ghost" data-res-del="${i}"><i class="ph ph-trash"></i></button>
        </div>
      `).join("")}
      <div class="card mt-2">
        <label>add resource</label>
        <div class="task-form-row">
          <input type="text" id="res-label" placeholder="title" />
          <input type="text" id="res-subj" placeholder="subject (gs1, gs2…)" />
          <button class="btn primary" id="res-add"><i class="ph ph-plus"></i> add</button>
        </div>
      </div>
    `;
    $$("[data-res-del]", host).forEach(b => b.addEventListener("click", () => {
      STATE.upscResources.splice(+b.dataset.resDel, 1); persist(); renderUPSC();
    }));
    $("#res-add").addEventListener("click", () => {
      const label = $("#res-label").value.trim(); if (!label) return;
      STATE.upscResources.push({ label, emoji: "📘", subject: $("#res-subj").value.trim() });
      persist(); renderUPSC();
    });

  // ── STUDY LOG ────────────────────────────────────────────
  } else if (UPSC_TAB === "log") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-clipboard-text"></i> study log</div>
      <div class="card">
        <div class="task-form-row">
          <input type="date" id="sl-date" value="${today()}" />
          <input type="text" id="sl-subj" placeholder="subject / topic" />
          <input type="number" id="sl-mins" placeholder="mins" min="0" step="5" />
        </div>
        <textarea id="sl-notes" rows="2" placeholder="notes (optional)"></textarea>
        <div class="row-end">
          <button class="btn primary" id="sl-add"><i class="ph ph-plus"></i> log session</button>
        </div>
      </div>
      <div class="mt-3">
        ${STATE.upscStudyLog.length ? STATE.upscStudyLog.map((l, i) => `
          <div class="study-log-row row-between">
            <div>
              <strong>${escapeHTML(l.subject)}</strong> · ${minToHuman(l.mins)}
              <div class="tiny muted">${escapeHTML(l.date)}${l.notes ? ' · ' + escapeHTML(l.notes) : ''}</div>
            </div>
            <button class="btn tiny ghost" data-sl-del="${i}"><i class="ph ph-trash"></i></button>
          </div>
        `).join("") : `<p class="muted">no sessions yet. log your first one above.</p>`}
      </div>
    `;
    $("#sl-add").addEventListener("click", () => {
      const subject = $("#sl-subj").value.trim();
      const mins = +$("#sl-mins").value;
      if (!subject || !mins) return;
      STATE.upscStudyLog.unshift({ date: $("#sl-date").value || today(), subject, mins, notes: $("#sl-notes").value.trim() });
      persist(); renderUPSC(); toast("session logged ✓", "success");
    });
    $$("[data-sl-del]", host).forEach(b => b.addEventListener("click", () => {
      STATE.upscStudyLog.splice(+b.dataset.slDel, 1); persist(); renderUPSC();
    }));

  // ── ESSAY BANK ───────────────────────────────────────────
  } else if (UPSC_TAB === "essay") {
    host.innerHTML = `
      <div class="eyebrow mb-2"><i class="ph ph-feather"></i> essay bank</div>
      <div class="card">
        <div class="task-form-row">
          <input type="text" id="es-title" placeholder="essay idea / title" />
          <select id="es-subj">${["essay","gs1","gs2","gs3","gs4"].map(s => `<option value="${s}">${s}</option>`).join("")}</select>
          <select id="es-status">${["idea","outline","draft","done"].map(s => `<option value="${s}">${s}</option>`).join("")}</select>
        </div>
        <div class="row-end"><button class="btn primary" id="es-add"><i class="ph ph-plus"></i> add</button></div>
      </div>
      <div class="mt-3">
        ${STATE.upscEssays.length ? STATE.upscEssays.map((e, i) => `
          <div class="essay-card">
            <div class="ec-title">${escapeHTML(e.title)}</div>
            <div class="ec-meta">
              <span class="pill">${escapeHTML(e.subject)}</span>
              <span class="pill ${e.status==="done"?"mint":e.status==="draft"?"blue":e.status==="outline"?"lilac":"butter"}">${e.status}</span>
              <button class="btn tiny ghost" data-essay-del="${i}"><i class="ph ph-trash"></i></button>
            </div>
          </div>
        `).join("") : `<p class="muted">no essays yet. add ideas here to track from idea → draft → done.</p>`}
      </div>
    `;
    $("#es-add").addEventListener("click", () => {
      const title = $("#es-title").value.trim(); if (!title) return;
      STATE.upscEssays.unshift({ title, subject: $("#es-subj").value, status: $("#es-status").value });
      persist(); renderUPSC();
    });
    $$("[data-essay-del]", host).forEach(b => b.addEventListener("click", () => {
      STATE.upscEssays.splice(+b.dataset.essayDel, 1); persist(); renderUPSC();
    }));
  }
};


// VIEW: MTP
// ==========================================================
RENDERERS.mtp = function renderMTP() {
  const mtpTasks = STATE.tasks.filter(t => t.category === "mtp" || (t.category === "research" && /mtp|thesis/i.test(t.title)));
  const phases = STATE.mtpPhases;
  const doneN = phases.filter(p => p.status === "done").length;

  $("#view-mtp").innerHTML = `
    <h1>${escapeHTML(DATA.mtpDefault.title)}</h1>
    <p class="muted mb-2">${escapeHTML(DATA.mtpDefault.subtitle)}</p>

    <div class="card">
      <div class="eyebrow mb-1"><i class="ph ph-flow-arrow"></i> phase tracker</div>
      <div class="block-bar"><div class="fill" style="width:${(doneN/phases.length)*100}%"></div></div>
      <p class="tiny mt-1">${doneN}/${phases.length} phases done</p>
      <div class="mtp-phases mt-2">
        ${phases.map((p, i) => `
          <div class="mtp-phase ${p.status}">
            <span class="em">${p.emoji}</span>
            <div>${escapeHTML(p.label)}</div>
            <select data-phase="${i}">
              ${["pending","in_progress","done"].map(s => `<option value="${s}" ${s===p.status?"selected":""}>${s.replace("_"," ")}</option>`).join("")}
            </select>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-list-checks"></i> sprint tasks (mtp)</div>
      ${mtpTasks.length ? mtpTasks.map(t => taskCard(t)).join("") : `<p class="muted">no mtp tasks. add some on the tasks tab.</p>`}
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-flask"></i> lab log</div>
      <div class="task-form-row">
        <input type="date" id="ll-date" value="${today()}" />
        <input type="number" id="ll-hours" placeholder="hours" step="0.5" min="0" />
      </div>
      <textarea id="ll-notes" rows="2" placeholder="notes…"></textarea>
      <div class="row-end"><button class="btn primary" id="ll-add"><i class="ph ph-plus"></i> log</button></div>
      <div class="mt-2">
        ${STATE.mtpLabLog.slice(0,15).map((l, i) => `
          <div class="study-log-row row-between">
            <div><strong>${escapeHTML(l.date)}</strong> · ${l.hours}h<div class="tiny">${escapeHTML(l.notes || "")}</div></div>
            <button class="btn tiny ghost" data-ll-del="${i}"><i class="ph ph-trash"></i></button>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-chats"></i> supervisor notes</div>
      <textarea id="sup-text" rows="3" placeholder="add a note (dated automatically)"></textarea>
      <div class="row-end"><button class="btn primary" id="sup-add"><i class="ph ph-plus"></i> add</button></div>
      <div class="mt-2">
        ${STATE.mtpSupervisor.slice(0,15).map((n, i) => `
          <div class="entry">
            <div class="meta"><i class="ph ph-clock"></i> ${escapeHTML(n.date)}</div>
            <div class="content">${escapeHTML(n.text)}</div>
            <div class="row-end"><button class="btn tiny ghost" data-sup-del="${i}"><i class="ph ph-trash"></i></button></div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  $$("[data-phase]", $("#view-mtp")).forEach(sel => sel.addEventListener("change", () => {
    STATE.mtpPhases[+sel.dataset.phase].status = sel.value; persist(); RENDERERS.mtp();
  }));
  $("#ll-add").addEventListener("click", () => {
    const hours = parseFloat($("#ll-hours").value);
    if (!hours) return;
    STATE.mtpLabLog.unshift({ date: $("#ll-date").value || today(), hours, notes: $("#ll-notes").value.trim() });
    persist(); RENDERERS.mtp();
  });
  $$("[data-ll-del]", $("#view-mtp")).forEach(b => b.addEventListener("click", () => {
    STATE.mtpLabLog.splice(+b.dataset.llDel, 1); persist(); RENDERERS.mtp();
  }));
  $("#sup-add").addEventListener("click", () => {
    const text = $("#sup-text").value.trim(); if (!text) return;
    STATE.mtpSupervisor.unshift({ date: today(), text });
    persist(); RENDERERS.mtp();
  });
  $$("[data-sup-del]", $("#view-mtp")).forEach(b => b.addEventListener("click", () => {
    STATE.mtpSupervisor.splice(+b.dataset.supDel, 1); persist(); RENDERERS.mtp();
  }));
  $$("[data-task-card]", $("#view-mtp")).forEach(c => c.addEventListener("click", () => {
    const t = STATE.tasks.find(x => String(x.id) === c.dataset.taskCard);
    if (t) openTaskFormSheet(t);
  }));
};

// ==========================================================
// VIEW: SUBSTACK
// ==========================================================
RENDERERS.substack = function renderSubstack() {
  const cols = {};
  DATA.substackStatuses.forEach(s => { cols[s.id] = []; });
  STATE.substack.forEach(a => { (cols[a.status] || (cols.idea = cols.idea || [])).push(a); });

  const totalPub = STATE.substack.filter(a => a.status === "published").length;
  const lastPub = STATE.substack.filter(a => a.status === "published").map(a => a.date).sort().pop();

  $("#view-substack").innerHTML = `
    <h1>substack</h1>
    <p class="muted mb-3">idea → outline → draft → published.</p>

    <div class="stats-row">
      <div class="stat-card"><div class="num">${totalPub}</div><div class="lbl">published</div></div>
      <div class="stat-card"><div class="num">${STATE.substack.length}</div><div class="lbl">total ideas</div></div>
      <div class="stat-card"><div class="num" style="font-size:1rem; padding-top:8px">${lastPub || "—"}</div><div class="lbl">last published</div></div>
    </div>

    <div class="row-end mb-2">
      <button class="btn primary" id="ss-add"><i class="ph ph-plus"></i> new idea</button>
    </div>

    <div class="pipe-board">
      ${DATA.substackStatuses.map(s => `
        <div class="pipe-col">
          <div class="pipe-col-head">
            <span class="pipe-col-title">${s.emoji} ${s.label}</span>
            <span class="pipe-col-count">${(cols[s.id]||[]).length}</span>
          </div>
          ${(cols[s.id]||[]).map(a => `
            <div class="pipe-card" data-ss-card="${a.id}">
              <div class="pc-title"><span class="pc-emoji">${a.emoji}</span><span>${escapeHTML(a.title)}</span></div>
              <div class="pc-meta">
                <span class="pill">${escapeHTML(a.date)}</span>
                ${a.words ? `<span class="pill blue">${a.words} words</span>` : ""}
                <button class="btn tiny ghost" data-ss-next="${a.id}" title="advance"><i class="ph ph-arrow-right"></i></button>
              </div>
            </div>
          `).join("") || `<div class="tiny" style="color:var(--ink-faint); padding:6px 4px">—</div>`}
        </div>
      `).join("")}
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-lightbulb"></i> writing ideas (seed)</div>
      ${DATA.writingIdeas.map((w, i) => `
        <div class="resource-row row-between">
          <div>${escapeHTML(w)}</div>
          <button class="btn tiny" data-seed-add="${i}"><i class="ph ph-plus"></i> use</button>
        </div>
      `).join("")}
    </div>
  `;

  $("#ss-add").addEventListener("click", () => openSubstackSheet(null));
  $$("[data-ss-card]", $("#view-substack")).forEach(c => c.addEventListener("click", (e) => {
    if (e.target.closest("[data-ss-next]")) return;
    const a = STATE.substack.find(x => String(x.id) === c.dataset.ssCard);
    if (a) openSubstackSheet(a);
  }));
  $$("[data-ss-next]", $("#view-substack")).forEach(b => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const a = STATE.substack.find(x => String(x.id) === b.dataset.ssNext);
    if (!a) return;
    const ids = DATA.substackStatuses.map(s => s.id);
    const i = ids.indexOf(a.status);
    a.status = ids[Math.min(i+1, ids.length-1)];
    if (a.status === "published") a.date = today();
    persist(); RENDERERS.substack();
  }));
  $$("[data-seed-add]", $("#view-substack")).forEach(b => b.addEventListener("click", () => {
    const w = DATA.writingIdeas[+b.dataset.seedAdd];
    STATE.substack.unshift({ id: Date.now(), title: w, emoji: "💡", status: "idea", date: today(), words: 0 });
    persist(); RENDERERS.substack();
  }));
};

function openSubstackSheet(article) {
  const isNew = !article;
  const a = article || { id: Date.now(), title: "", emoji: "💡", status: "idea", date: today(), words: 0 };
  openSheet(isNew ? "new article" : "edit article", `
    <form id="ss-form">
      <div class="field-row">
        <button type="button" class="emoji-trigger" id="ss-emoji">${a.emoji}</button>
        <input type="text" name="title" value="${escapeHTML(a.title)}" placeholder="title" required />
      </div>
      <div class="task-form-row">
        <select name="status">${DATA.substackStatuses.map(s => `<option value="${s.id}" ${s.id===a.status?"selected":""}>${s.emoji} ${s.label}</option>`).join("")}</select>
        <input type="date" name="date" value="${a.date}" />
        <input type="number" name="words" value="${a.words || 0}" placeholder="words" min="0" />
      </div>
      <div class="row-end">
        ${!isNew ? `<button type="button" class="btn ghost" id="ss-del"><i class="ph ph-trash"></i> delete</button>` : ""}
        <button type="submit" class="btn primary"><i class="ph ph-check"></i> save</button>
      </div>
    </form>
  `, (root) => {
    let pickedEmoji = a.emoji;
    $("#ss-emoji", root).addEventListener("click", (e) => {
      e.preventDefault();
      openEmojiPicker(e.currentTarget, (em) => { pickedEmoji = em; $("#ss-emoji", root).textContent = em; });
    });
    $("#ss-form", root).addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const title = f.title.value.trim(); if (!title) return;
      const updated = { ...a, title, status: f.status.value, date: f.date.value, words: +f.words.value || 0, emoji: pickedEmoji };
      const idx = STATE.substack.findIndex(x => x.id === a.id);
      if (idx >= 0) STATE.substack[idx] = updated;
      else STATE.substack.unshift(updated);
      persist(); closeSheet(); RENDERERS.substack();
    });
    const delBtn = $("#ss-del", root);
    if (delBtn) delBtn.addEventListener("click", () => {
      if (!confirm("Delete this article?")) return;
      STATE.substack = STATE.substack.filter(x => x.id !== a.id);
      persist(); closeSheet(); RENDERERS.substack();
    });
  });
}

// ==========================================================
// VIEW: BOOKS
// ==========================================================
RENDERERS.books = function renderBooks() {
  const shelves = { want: [], reading: [], done: [] };
  STATE.books.forEach(b => {
    const k = b.status === "done" ? "done" : b.status === "reading" ? "reading" : "want";
    shelves[k].push(b);
  });

  const renderShelf = (label, key) => {
    const items = shelves[key];
    return `
      <div class="book-shelf">
        <div class="book-shelf-title"><span>${label}</span><span class="pill">${items.length}</span></div>
        ${items.length ? items.map(b => `
          <div class="book-row" data-book="${b.id}">
            <span class="book-emoji">${b.emoji || "📖"}</span>
            <div class="book-body">
              <div class="book-title">${escapeHTML(b.title)}</div>
              ${b.author ? `<div class="book-author">${escapeHTML(b.author)}</div>` : ""}
              <div class="book-meta">
                <span class="pill">${b.status}</span>
                ${b.rating ? `<span class="stars">${"★".repeat(b.rating)}<span class="off">${"★".repeat(5-b.rating)}</span></span>` : ""}
              </div>
              ${(b.status === "reading" && b.totalPages) ? `
                <div class="book-progress"><div class="fill" style="width:${Math.min(100, ((b.currentPage||0)/b.totalPages)*100)}%"></div></div>
                <div class="tiny mt-1">${b.currentPage || 0} / ${b.totalPages} pages</div>
              ` : ""}
            </div>
          </div>
        `).join("") : `<p class="muted">—</p>`}
      </div>
    `;
  };

  $("#view-books").innerHTML = `
    <div class="row-between mb-2">
      <h1>books</h1>
      <button class="btn primary" id="add-book"><i class="ph ph-plus"></i> add book</button>
    </div>
    <p class="muted mb-3">no streaks. just what you're reading.</p>
    ${renderShelf("currently reading", "reading")}
    ${renderShelf("want to read", "want")}
    ${renderShelf("done", "done")}
  `;
  $("#add-book").addEventListener("click", () => openBookSheet(null));
  $$("[data-book]", $("#view-books")).forEach(c => c.addEventListener("click", () => {
    const b = STATE.books.find(x => String(x.id) === c.dataset.book);
    if (b) openBookSheet(b);
  }));
};

function openBookSheet(book) {
  const isNew = !book;
  const b = book || { id: Date.now(), title: "", author: "", status: "want", currentPage: null, totalPages: null, rating: null, emoji: "📖", notes: "" };
  openSheet(isNew ? "add book" : "edit book", `
    <form id="book-form">
      <div class="field-row">
        <button type="button" class="emoji-trigger" id="b-emoji">${b.emoji || "📖"}</button>
        <input type="text" name="title" value="${escapeHTML(b.title)}" placeholder="title" required />
      </div>
      <div>
        <label>author</label>
        <input type="text" name="author" value="${escapeHTML(b.author||"")}" placeholder="author (optional)" />
      </div>
      <div class="task-form-row">
        <div>
          <label>status</label>
          <select name="status">${["want","reading","done"].map(s => `<option value="${s}" ${s===b.status?"selected":""}>${s}</option>`).join("")}</select>
        </div>
        <div>
          <label>page</label>
          <input type="number" name="currentPage" value="${b.currentPage||""}" min="0" />
        </div>
        <div>
          <label>of</label>
          <input type="number" name="totalPages" value="${b.totalPages||""}" min="0" />
        </div>
      </div>
      <div>
        <label>rating (1–5, when done)</label>
        <input type="number" name="rating" value="${b.rating||""}" min="1" max="5" />
      </div>
      <div>
        <label>notes</label>
        <textarea name="notes" rows="4">${escapeHTML(b.notes||"")}</textarea>
      </div>
      <div class="row-end">
        ${!isNew ? `<button type="button" class="btn ghost" id="b-del"><i class="ph ph-trash"></i> delete</button>` : ""}
        <button type="submit" class="btn primary"><i class="ph ph-check"></i> save</button>
      </div>
    </form>
  `, (root) => {
    let pickedEmoji = b.emoji || "📖";
    $("#b-emoji", root).addEventListener("click", (e) => {
      e.preventDefault();
      openEmojiPicker(e.currentTarget, (em) => { pickedEmoji = em; $("#b-emoji", root).textContent = em; });
    });
    $("#book-form", root).addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const title = f.title.value.trim(); if (!title) return;
      const updated = {
        ...b, title,
        author: f.author.value.trim(),
        status: f.status.value,
        currentPage: f.currentPage.value ? +f.currentPage.value : null,
        totalPages: f.totalPages.value ? +f.totalPages.value : null,
        rating: f.rating.value ? +f.rating.value : null,
        notes: f.notes.value.trim(),
        emoji: pickedEmoji,
      };
      const idx = STATE.books.findIndex(x => x.id === b.id);
      if (idx >= 0) STATE.books[idx] = updated;
      else STATE.books.unshift(updated);
      persist(); closeSheet(); RENDERERS.books();
    });
    const delBtn = $("#b-del", root);
    if (delBtn) delBtn.addEventListener("click", () => {
      if (!confirm("Remove this book?")) return;
      STATE.books = STATE.books.filter(x => x.id !== b.id);
      persist(); closeSheet(); RENDERERS.books();
    });
  });
}

// ==========================================================
// VIEW: EXERCISE
// ==========================================================
RENDERERS.exercise = function renderExercise() {
  const today0 = today();
  const log = STATE.exerciseLog;
  // streak: consecutive days back from today with at least one entry
  const streak = (() => {
    let n = 0;
    for (let i = 0; i < 60; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0,10);
      if (log.some(l => l.date === iso)) n++;
      else if (i > 0) break;
    }
    return n;
  })();
  // weekly summary
  const weekStart = (() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return d.toISOString().slice(0,10); })();
  const weekly = {};
  log.filter(l => l.date >= weekStart).forEach(l => {
    weekly[l.category] = (weekly[l.category] || 0) + (l.mins || 0);
  });

  $("#view-exercise").innerHTML = `
    <h1>exercise</h1>
    <p class="muted mb-3">log a workout. no goals you didn't set.</p>

    <div class="grid-2 mb-3">
      <div class="exercise-streak">
        <div class="num">${streak}</div>
        <div class="lbl">${streak===1?"day":"days"} streak</div>
      </div>
      <div class="card pad-sm">
        <div class="eyebrow mb-1"><i class="ph ph-calendar-blank"></i> this week</div>
        ${Object.keys(weekly).length ? Object.entries(weekly).map(([k,v]) => `<span class="pill mt-1" style="margin-right:6px">${k}: ${minToHuman(v)}</span>`).join("") : `<p class="muted">no logs this week.</p>`}
      </div>
    </div>

    <div class="card">
      <div class="eyebrow mb-2"><i class="ph ph-plus"></i> log workout</div>
      <div class="task-form-row">
        <select id="ex-cat">${["cardio","strength","yoga","walk","other"].map(c => `<option value="${c}">${c}</option>`).join("")}</select>
        <input type="number" id="ex-mins" placeholder="mins" min="1" step="5" />
        <input type="date" id="ex-date" value="${today0}" />
      </div>
      <textarea id="ex-notes" rows="2" placeholder="notes (optional)"></textarea>
      <div class="row-end"><button class="btn primary" id="ex-add"><i class="ph ph-check"></i> log</button></div>
    </div>

    <div class="mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-clock-counter-clockwise"></i> recent</div>
      ${log.slice(0,10).map((l,i) => `
        <div class="study-log-row row-between">
          <div><strong>${escapeHTML(l.category)}</strong> · ${minToHuman(l.mins)}<div class="tiny">${escapeHTML(l.date)} ${l.notes ? "· " + escapeHTML(l.notes) : ""}</div></div>
          <button class="btn tiny ghost" data-ex-del="${i}"><i class="ph ph-trash"></i></button>
        </div>
      `).join("") || `<p class="muted">no logs yet.</p>`}
    </div>
  `;

  $("#ex-add").addEventListener("click", () => {
    const mins = +$("#ex-mins").value; if (!mins) return;
    STATE.exerciseLog.unshift({
      date: $("#ex-date").value || today0,
      category: $("#ex-cat").value,
      mins,
      notes: $("#ex-notes").value.trim(),
    });
    persist(); RENDERERS.exercise(); toast("logged", "success");
  });
  $$("[data-ex-del]", $("#view-exercise")).forEach(b => b.addEventListener("click", () => {
    STATE.exerciseLog.splice(+b.dataset.exDel, 1); persist(); RENDERERS.exercise();
  }));
};

// ==========================================================
// VIEW: TRAVEL
// ==========================================================
RENDERERS.travel = function renderTravel() {
  $("#view-travel").innerHTML = `
    <h1>travel</h1>
    <p class="muted mb-3">visited + wishlist.</p>

    <div class="card">
      <div class="eyebrow mb-2"><i class="ph ph-airplane"></i> add place</div>
      <div class="task-form-row">
        <input type="text" id="tr-place" placeholder="place" />
        <select id="tr-list">
          <option value="visited">visited</option>
          <option value="wishlist">wishlist</option>
        </select>
        <input type="date" id="tr-date" placeholder="date (visited only)" />
      </div>      <input type="text" id="tr-note" placeholder="note (optional)" class="mt-2" style="width:100%" />
      <div class="row-end mt-1"><button class="btn primary" id="tr-add"><i class="ph ph-plus"></i> add</button></div>
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-check-circle"></i> visited (${STATE.travelVisited.length})</div>
      ${STATE.travelVisited.length ? STATE.travelVisited.map((v, i) => `
        <div class="tcat-row">
          <i class="ph-fill ph-map-pin" style="color:var(--pink-deep)"></i>
          <span style="flex:1"><strong>${escapeHTML(v.place)}</strong>${v.date ? ` <span class="meta">${escapeHTML(v.date)}</span>` : ""}${v.note ? `<br><span class="hint">${escapeHTML(v.note)}</span>` : ""}</span>
          <button class="btn tiny ghost" data-tr-del-v="${i}"><i class="ph ph-trash"></i></button>
        </div>`).join("") : `<p class="muted">nothing yet — add your first place!</p>`}
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-star"></i> wishlist (${STATE.travelWishlist.length})</div>
      ${STATE.travelWishlist.length ? STATE.travelWishlist.map((v, i) => `
        <div class="tcat-row">
          <i class="ph ph-heart" style="color:var(--pink-deep)"></i>
          <span style="flex:1"><strong>${escapeHTML(v.place)}</strong>${v.note ? `<br><span class="hint">${escapeHTML(v.note)}</span>` : ""}</span>
          <button class="btn tiny ghost" data-tr-del-w="${i}"><i class="ph ph-trash"></i></button>
          <button class="btn tiny" data-tr-mark-v="${i}" title="mark visited"><i class="ph ph-check"></i></button>
        </div>`).join("") : `<p class="muted">no wishlist yet.</p>`}
    </div>
  `;

  $("#tr-add")?.addEventListener("click", () => {
    const place = $("#tr-place")?.value.trim();
    if (!place) { toast("enter a place name"); return; }
    const list  = $("#tr-list")?.value;
    const date  = $("#tr-date")?.value;
    const note  = $("#tr-note")?.value.trim();
    const entry = { place, note, date };
    if (list === "visited") STATE.travelVisited.unshift(entry);
    else STATE.travelWishlist.unshift(entry);
    persist(); RENDERERS.travel(); toast("added!", "success");
  });

  $$("[data-tr-del-v]", $("#view-travel")).forEach(b => b.addEventListener("click", () => {
    STATE.travelVisited.splice(+b.dataset.trDelV, 1);
    persist(); RENDERERS.travel();
  }));
  $$("[data-tr-del-w]", $("#view-travel")).forEach(b => b.addEventListener("click", () => {
    STATE.travelWishlist.splice(+b.dataset.trDelW, 1);
    persist(); RENDERERS.travel();
  }));
  $$("[data-tr-mark-v]", $("#view-travel")).forEach(b => b.addEventListener("click", () => {
    const i = +b.dataset.trMarkV;
    const p = STATE.travelWishlist.splice(i, 1)[0];
    STATE.travelVisited.unshift({ place: p.place, date: today(), note: p.note });
    persist(); RENDERERS.travel(); toast("visited!", "success");
  }));
};

// ==========================================================
// VIEW: TIMER
// ==========================================================
let TIMER_DISPLAY_INT = null;
RENDERERS.timer = function renderTimerView() {
  const t = STATE.timer;
  const now = Date.now();
  const elapsed = t ? Math.floor((now - t.startedAt) / 1000) : 0;
  const cat = t ? STATE.timerCategories.find(c => c.id === t.categoryId) : null;
  const todayLogs = STATE.timeLog.filter(e => e.date === today());
  const totalsToday = {};
  todayLogs.forEach(e => { totalsToday[e.categoryId] = (totalsToday[e.categoryId] || 0) + (e.mins || 0); });
  const maxMins = Math.max(60, ...Object.values(totalsToday));

  $("#view-timer").innerHTML = `
    <h1>time tracker</h1>
    <p class="muted mb-3">where the time actually went.</p>
    <div class="timer-stage">
      ${t ? `
        <div class="timer-label">
          <span class="timer-pulse"></span>
          <span style="color:var(--pink-deep)">${cat ? renderIconVal(cat.emoji) : ""} ${escapeHTML(cat ? cat.label : "")}</span>
          ${t.person ? `<span class="muted" style="font-size:0.8rem"> · with ${escapeHTML(t.person)}</span>` : ""}
        </div>
        <div class="timer-display" id="timer-display">${fmtHMS(elapsed)}</div>
        <button class="timer-big-btn stop" id="timer-stop"><i class="ph-fill ph-stop"></i> stop</button>
      ` : `
        <div class="timer-label muted">pick a category, then start</div>
        <div class="timer-display">00:00:00</div>
        <button class="timer-big-btn" id="timer-start"><i class="ph-fill ph-play"></i> start</button>
      `}
    </div>

    ${!t ? `
      <div class="card mt-3">
        <div class="eyebrow mb-2"><i class="ph ph-tag" style="color:var(--pink-deep)"></i> category</div>
        <div class="timer-cat-grid">
          ${STATE.timerCategories.map(c => `
            <button class="timer-cat-cell" data-tcat="${c.id}">
              <span style="font-size:1.5rem">${renderIconVal(c.emoji)}</span>
              <span>${escapeHTML(c.label)}</span>
            </button>
          `).join("")}
        </div>
        <div class="mt-2">
          <label class="muted" style="font-size:0.82rem">with (optional)</label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
            ${STATE.people.map(p => `
              <button class="timer-person-btn" data-person="${escapeHTML(p.name)}">
                <span>${renderIconVal(p.emoji || "heart")}</span> ${escapeHTML(p.name)}
              </button>
            `).join("")}
            <input type="text" id="timer-person-other" placeholder="or type a name…" style="flex:1;min-width:120px;padding:5px 8px;border:1.5px solid var(--border);border-radius:8px;font-size:0.82rem" />
          </div>
        </div>
      </div>
    ` : ""}

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-chart-bar" style="color:var(--pink-deep)"></i> today</div>
      ${Object.keys(totalsToday).length ? STATE.timerCategories
        .filter(c => totalsToday[c.id])
        .map(c => `
          <div class="timer-bar-row">
            <span style="width:28px;text-align:center">${renderIconVal(c.emoji)}</span>
            <span class="lbl" style="flex:1">${escapeHTML(c.label)}</span>
            <span class="dur">${minToHuman(totalsToday[c.id])}</span>
            <div class="bar-bg"><div class="bar-fill" style="width:${Math.round((totalsToday[c.id]/maxMins)*100)}%;background:var(--pink-light)"></div></div>
          </div>
        `).join("") : '<p class="muted">no time logged today.</p>'}
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2"><i class="ph ph-clock-clockwise" style="color:var(--pink-deep)"></i> log history</div>
      <div style="max-height:220px;overflow-y:auto">
        ${todayLogs.length ? todayLogs.map(e => {
          const c = STATE.timerCategories.find(x => x.id === e.categoryId) || { emoji: "clock", label: e.categoryId };
          return `<div class="resource-row row-between" style="padding:6px 0;border-bottom:1px solid var(--border)">
            <div class="row" style="gap:8px">
              <span>${renderIconVal(c.emoji)}</span>
              <div>
                <div style="font-weight:500;font-size:0.88rem">${escapeHTML(c.label)}${e.person ? ' <span class="muted">· '+escapeHTML(e.person)+'</span>' : ''}</div>
                <div class="tiny">${e.start || e.date} · ${minToHuman(e.mins)}</div>
              </div>
            </div>
          </div>`;
        }).join("") : '<p class="muted">no entries yet.</p>'}
      </div>
    </div>

    <div class="card mt-3">
      <div class="eyebrow mb-2" style="display:flex;align-items:center;justify-content:space-between">
        <span><i class="ph ph-sliders" style="color:var(--pink-deep)"></i> manage categories</span>
        <button class="btn tiny" id="tcat-add"><i class="ph ph-plus"></i> add</button>
      </div>
      <div id="tcat-list">
        ${STATE.timerCategories.map((c, ci) => `
          <div class="tcat-row">
            <span style="width:26px;text-align:center">${renderIconVal(c.emoji)}</span>
            <span style="flex:1;font-size:0.9rem">${escapeHTML(c.label)}</span>
            <div class="tcat-actions">
              <button data-tcat-edit="${ci}"><i class="ph ph-pencil-simple"></i></button>
              <button data-tcat-del="${ci}"><i class="ph ph-trash"></i></button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  // category select
  let pickedCat = null, pickedPerson = "";
  $$("[data-tcat]", $("#view-timer")).forEach(b => b.addEventListener("click", () => {
    pickedCat = b.dataset.tcat;
    $$("[data-tcat]", $("#view-timer")).forEach(x => x.classList.toggle("active", x.dataset.tcat === pickedCat));
  }));
  $$("[data-person]", $("#view-timer")).forEach(b => b.addEventListener("click", () => {
    pickedPerson = b.dataset.person;
    $$("[data-person]", $("#view-timer")).forEach(x => x.classList.toggle("active", x.dataset.person === pickedPerson));
    const other = $("#timer-person-other");
    if (other) other.value = "";
  }));
  $("#timer-person-other")?.addEventListener("input", e => {
    pickedPerson = e.target.value;
    $$("[data-person]", $("#view-timer")).forEach(x => x.classList.remove("active"));
  });

  $("#timer-start")?.addEventListener("click", () => {
    if (!pickedCat) { toast("pick a category first"); return; }
    const other = $("#timer-person-other")?.value.trim();
    STATE.timer = { startedAt: Date.now(), categoryId: pickedCat, person: other || pickedPerson || "" };
    persist(); RENDERERS.timer();
  });
  $("#timer-stop")?.addEventListener("click", () => {
    if (!STATE.timer) return;
    const mins = Math.max(1, Math.round((Date.now() - STATE.timer.startedAt) / 60000));
    const startStr = new Date(STATE.timer.startedAt).toLocaleTimeString(undefined, { hour:"2-digit", minute:"2-digit" });
    STATE.timeLog.unshift({ categoryId: STATE.timer.categoryId, mins, date: today(), start: startStr, person: STATE.timer.person || "" });
    STATE.timer = null;
    persist(); RENDERERS.timer(); toast(`logged ${minToHuman(mins)} ✓`, "success");
  });

  // Category CRUD
  function openTimerCatSheet(idx) {
    const isNew = idx == null;
    const cat = isNew ? { label: "", emoji: "clock" } : STATE.timerCategories[idx];
    openSheet(isNew ? "new category" : "edit category", `
      <form id="tcat-form">
        <div><label>name</label>
          <input type="text" id="tcat-label-inp" value="${escapeHTML(cat.label)}" placeholder="e.g. Reading" required />
        </div>
        <div><label>icon</label>
          <div id="tcat-icon-pal"></div>
        </div>
        <div class="row-end">
          ${!isNew ? `<button type="button" class="btn ghost" id="tcat-del-btn"><i class="ph ph-trash"></i> delete</button>` : ""}
          <button type="submit" class="btn primary"><i class="ph ph-check"></i> ${isNew?"add":"save"}</button>
        </div>
      </form>
    `, (root) => {
      let pickedEmoji = cat.emoji || "clock";
      renderIconPalette($("#tcat-icon-pal", root), pickedEmoji, v => { pickedEmoji = v; });
      if (!isNew) {
        $("#tcat-del-btn", root)?.addEventListener("click", () => {
          if (!confirm(`Delete "${cat.label}"?`)) return;
          STATE.timerCategories.splice(idx, 1);
          persist(); closeSheet(); RENDERERS.timer();
        });
      }
      $("#tcat-form", root).addEventListener("submit", ev => {
        ev.preventDefault();
        const label = $("#tcat-label-inp", root).value.trim();
        if (!label) return;
        const id = isNew ? label.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+Date.now().toString(36).slice(-4) : cat.id;
        const updated = { id, label, emoji: pickedEmoji };
        if (isNew) STATE.timerCategories.push(updated);
        else STATE.timerCategories[idx] = updated;
        persist(); closeSheet(); RENDERERS.timer();
        toast(isNew?"category added":"saved", "success");
      });
    });
  }
  $("#tcat-add")?.addEventListener("click", () => openTimerCatSheet(null));
  $$("[data-tcat-edit]", $("#view-timer")).forEach(b => b.addEventListener("click", e => {
    e.stopPropagation(); openTimerCatSheet(+b.dataset.tcatEdit);
  }));
  $$("[data-tcat-del]", $("#view-timer")).forEach(b => b.addEventListener("click", e => {
    e.stopPropagation();
    if (!confirm(`Delete "${STATE.timerCategories[+b.dataset.tcatDel]?.label}"?`)) return;
    STATE.timerCategories.splice(+b.dataset.tcatDel, 1);
    persist(); RENDERERS.timer();
  }));

  // Live update
  if (TIMER_DISPLAY_INT) clearInterval(TIMER_DISPLAY_INT);
  if (STATE.timer) {
    TIMER_DISPLAY_INT = setInterval(() => {
      const d = $("#timer-display");
      if (!d || !STATE.timer) { clearInterval(TIMER_DISPLAY_INT); return; }
      d.textContent = fmtHMS(Math.floor((Date.now() - STATE.timer.startedAt) / 1000));
    }, 1000);
  }
};

// ==========================================================
// GUEST MODE
// ==========================================================
function showGuestBanner() {
  if (!IS_GUEST) return;
  const b = document.createElement("div");
  b.style.cssText = "position:fixed;top:0;left:0;right:0;z-index:9999;background:var(--pink-deep);color:#fff;text-align:center;padding:8px 16px;font-size:0.85rem;font-weight:600";
  b.innerHTML = `👋 you're viewing as <strong>${GUEST_NAME}</strong> — your changes save separately`;
  document.body.prepend(b);
}

// ==========================================================
// BOOT
// ==========================================================
(function init() {
  applyTheme();
  registerServiceWorker();
  renderNav();

  window.addEventListener("hashchange", () => {
    renderNav();
    const view = (location.hash || "#home").replace("#", "").split("?")[0];
    $$(".view").forEach(v => v.classList.toggle("active", v.dataset.view === view));
    if (RENDERERS[view]) RENDERERS[view]();
  });

  const initView = (location.hash || "#home").replace("#", "").split("?")[0];
  $$(".view").forEach(v => v.classList.toggle("active", v.dataset.view === initView));
  if (RENDERERS[initView]) RENDERERS[initView]();
  if (IS_GUEST) showGuestBanner();
})();

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}
