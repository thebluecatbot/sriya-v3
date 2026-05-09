// icons.js — sriya-v3
// BRAND_HEART + ph() helper + NAV_ICONS + CATEGORY_ICONS + PERSON_SVGS

// ---------- BRAND HEART ----------
const BRAND_HEART = `<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
  <path d="M16 27.5C16 27.5 4.5 20 4.5 12C4.5 8 7.5 5 11 5C13 5 14.8 6 16 7.8C17.2 6 19 5 21 5C24.5 5 27.5 8 27.5 12C27.5 20 16 27.5 16 27.5Z" />
  <circle cx="11" cy="10.5" r="1.8" fill="white" opacity="0.5"/>
</svg>`;

const PIXEL_SPARKLE = BRAND_HEART;
function brandHeart() { return `<span class="brand-heart">${BRAND_HEART}</span>`; }

// Phosphor icon helper
function ph(name, variant = "regular") {
  const prefix = variant === "regular" ? "ph" : "ph-" + variant;
  return `<i class="${prefix} ph-${name}"></i>`;
}

// ---------- NAV ICONS ----------
const _strokeWrap = (body, w = 24) =>
  `<svg class="nav-ico" viewBox="0 0 ${w} ${w}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const NAV_ICONS = {
  home: _strokeWrap(`
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-4v-5H8v5H4a1 1 0 0 1-1-1z"/>
  `),
  tasks: _strokeWrap(`
    <path d="M9 6h11M9 12h11M9 18h11"/>
    <polyline points="4 6 5 7.2 7 5"/>
    <polyline points="4 12 5 13.2 7 11"/>
    <polyline points="4 18 5 19.2 7 17"/>
  `),
  chat: _strokeWrap(`
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  `),
  playbook: _strokeWrap(`
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  `),
  journal: _strokeWrap(`
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  `),
  me: _strokeWrap(`
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  `),
  timer: _strokeWrap(`
    <circle cx="12" cy="13" r="7"/>
    <polyline points="12 10 12 13 14 15"/>
    <path d="M9.5 2.5h5"/>
    <path d="M18.5 5.5l1 1"/>
  `),
  // Books — three stacked books with spines
  books: _strokeWrap(`
    <path d="M4 19V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v13"/>
    <path d="M4 19h6M4 6h6"/>
    <path d="M10 8l4-2v13l-4 2V8z"/>
    <path d="M14 6l5 1.5v11L14 21V6z"/>
  `),
  // UPSC — torch / flame of knowledge
  upsc: _strokeWrap(`
    <path d="M12 2c-2 3-4 5-4 8a4 4 0 0 0 8 0c0-3-2-5-4-8z"/>
    <path d="M12 10c-1 1.5-2 2.5-2 4a2 2 0 0 0 4 0c0-1.5-1-2.5-2-4z" fill="currentColor" stroke="none" opacity="0.4"/>
    <line x1="12" y1="14" x2="12" y2="22"/>
    <path d="M8 22h8"/>
  `),
  // MTP — flask + star (lab research + achievement)
  mtp: _strokeWrap(`
    <path d="M9 2h6M10 2v5l-4 8a3 3 0 0 0 2.7 4.5h6.6A3 3 0 0 0 18 15l-4-8V2"/>
    <circle cx="9.5" cy="15" r="0.9" fill="currentColor" stroke="none"/>
    <circle cx="13" cy="17" r="0.7" fill="currentColor" stroke="none"/>
    <circle cx="11" cy="18.5" r="0.5" fill="currentColor" stroke="none"/>
    <path d="M16 4l.5-1.5L18 2l-1.5-.5L16 0l-.5 1.5L14 2l1.5.5z" fill="currentColor" stroke="none"/>
  `),
  // Substack — stack of layered papers / newsletter
  substack: _strokeWrap(`
    <rect x="4" y="4" width="16" height="3" rx="1"/>
    <rect x="4" y="9" width="16" height="3" rx="1"/>
    <path d="M4 14h16v1l-8 5-8-5v-1z"/>
  `),
  // Exercise — barbell / dumbbell
  exercise: _strokeWrap(`
    <line x1="6" y1="12" x2="18" y2="12"/>
    <path d="M4 9v6M20 9v6"/>
    <path d="M2 10v4M22 10v4"/>
  `),
  // Travel — airplane
  travel: _strokeWrap(`
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  `),
  // People — two figures
  people: _strokeWrap(`
    <circle cx="9" cy="7" r="3"/>
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    <path d="M21 21v-2a4 4 0 0 0-3-3.85"/>
  `),
  more: _strokeWrap(`
    <circle cx="5"  cy="12" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>
    <circle cx="19" cy="12" r="1.3" fill="currentColor" stroke="none"/>
  `),
};

// ---------- CATEGORY ICONS (inline SVG for home non-neg headers & timer) ----------
// These match the nav icon style — used in renderNonNegList, timer, etc.
const _catWrap = (body) =>
  `<svg class="cat-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

const CATEGORY_ICONS = {
  meds:          _catWrap(`<circle cx="10" cy="10" r="7"/><line x1="10" y1="7" x2="10" y2="13"/><line x1="7" y1="10" x2="13" y2="10"/>`),
  nutrition:     _catWrap(`<path d="M7 3c0 4 2 6 3 8s3 3 3 7M5 11c2-1 4-1 5 1M15 11c-2-1-4-1-5 1"/>`),
  movement:      _catWrap(`<circle cx="10" cy="4" r="2"/><path d="M10 6v5l-3 4M10 11l3 4M7 10h6"/>`),
  mind:          _catWrap(`<path d="M10 2a5 5 0 0 1 5 5c0 2-1 3.5-2.5 4.5V14H7.5v-2.5C6 10.5 5 9 5 7a5 5 0 0 1 5-5z"/><path d="M7.5 14h5M8 17h4M9 19.5h2"/>`),
  career:        _catWrap(`<rect x="3" y="8" width="14" height="10" rx="1"/><path d="M7 8V6a3 3 0 0 1 6 0v2"/><line x1="10" y1="12" x2="10" y2="14"/>`),
  relationships: _catWrap(`<path d="M10 16s-6-3.5-6-7a4 4 0 0 1 6-3.46A4 4 0 0 1 16 9c0 3.5-6 7-6 7z" fill="currentColor" opacity="0.2" stroke="currentColor"/>`),
  home:          _catWrap(`<path d="M2 9l8-6 8 6v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/><path d="M7 19v-7h6v7"/>`),
  rest:          _catWrap(`<path d="M3 10a7 7 0 0 1 7-7 7 7 0 0 0 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7z"/>`),
  general:       _catWrap(`<circle cx="10" cy="10" r="7"/><path d="M10 7v3l2 2"/>`),
  upsc:          _catWrap(`<path d="M10 2c-1.5 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-4-3-6z"/><line x1="10" y1="11" x2="10" y2="18"/><line x1="7" y1="18" x2="13" y2="18"/>`),
  mtp:           _catWrap(`<path d="M7.5 2h5M8 2v4L5 11a2.5 2.5 0 0 0 2.2 3.8h5.6A2.5 2.5 0 0 0 15 11l-3-5V2"/><circle cx="8" cy="11.5" r="0.7" fill="currentColor" stroke="none"/><circle cx="10.5" cy="13" r="0.5" fill="currentColor" stroke="none"/><path d="M14 3l.4-1.2L15.5 1.5l-1.1-.3L14 0l-.4 1.2L12.5 1.5l1.1.3z" fill="currentColor" stroke="none"/>`),
  substack:      _catWrap(`<rect x="3" y="3" width="14" height="2.5" rx="0.5"/><rect x="3" y="7.5" width="14" height="2.5" rx="0.5"/><path d="M3 12h14v1l-7 4-7-4v-1z"/>`),
  exercise:      _catWrap(`<line x1="5" y1="10" x2="15" y2="10"/><path d="M3 7.5v5M17 7.5v5"/><path d="M1 8.5v3M19 8.5v3"/>`),
  travel:        _catWrap(`<path d="M15 4.8L13.5 9l2.5-2.5C17 5.5 17.5 4 17 3.5c-.5-.5-2 0-3 1L11.5 7l-6.5-1.5-.3.4 4 3-1.5 2.5H5.5L5 12l2 1.5 1.5 2 1-.5v-2l2.5-1.5 2.5 4 .5-.2c.3-.2.4-.5.3-.9L15 10l.5.8z"/>`),
  writing:       _catWrap(`<path d="M12 3H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M12 3v5h5"/><line x1="6" y1="12" x2="14" y2="12"/><line x1="6" y1="15" x2="11" y2="15"/>`),
  research:      _catWrap(`<circle cx="9" cy="9" r="5"/><path d="m15 15 3.5 3.5"/>`),
  academic:      _catWrap(`<path d="M10 2l8 4-8 4-8-4z"/><path d="M4 8v5c0 2 2.7 4 6 4s6-2 6-4V8"/>`),
};

// ---------- PERSON SVGS ----------
// Exact illustrated colorful SVGs from sriya-home-v2/public/icons/
const PERSON_SVGS = {
  sriya: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="sriya">
  <defs>
    <linearGradient id="sriyaMoon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFA8C9"/>
      <stop offset="100%" stop-color="#E6629A"/>
    </linearGradient>
  </defs>
  <circle cx="28" cy="32" r="20" fill="url(#sriyaMoon)" stroke="#8B2E5C" stroke-width="1.5"/>
  <circle cx="36" cy="28" r="17" fill="#FFF0F6" stroke="none"/>
  <path d="M 22 34 C 20 32 16 32 16 35 C 16 38 22 42 22 42 C 22 42 28 38 28 35 C 28 32 24 32 22 34 Z" fill="#F5C945" stroke="#8B2E5C" stroke-width="1"/>
  <path d="M 51 12 L 52 15 L 55 16 L 52 17 L 51 20 L 50 17 L 47 16 L 50 15 Z" fill="#F5C945" stroke="#8B2E5C" stroke-width="0.5"/>
  <path d="M 57 36 L 58 38 L 60 39 L 58 40 L 57 42 L 56 40 L 54 39 L 56 38 Z" fill="#FFA8C9" stroke="#8B2E5C" stroke-width="0.5"/>
  <path d="M 48 54 L 49 56 L 51 57 L 49 58 L 48 60 L 47 58 L 45 57 L 47 56 Z" fill="#F5C945" stroke="#8B2E5C" stroke-width="0.5"/>
  <circle cx="10" cy="12" r="1" fill="#8B2E5C"/>
  <circle cx="8" cy="52" r="1" fill="#8B2E5C"/>
  <circle cx="58" cy="22" r="0.8" fill="#E6629A"/>
</svg>`,

  prakhar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="prakhar honey bee">
  <defs>
    <clipPath id="beeBodyClip">
      <ellipse cx="32" cy="38" rx="15" ry="16"/>
    </clipPath>
  </defs>
  <ellipse cx="20" cy="24" rx="11" ry="7" fill="#FFF8E8" opacity="0.9" stroke="#5C3D10" stroke-width="1.2" transform="rotate(-18 20 24)"/>
  <ellipse cx="44" cy="24" rx="11" ry="7" fill="#FFF8E8" opacity="0.9" stroke="#5C3D10" stroke-width="1.2" transform="rotate(18 44 24)"/>
  <ellipse cx="32" cy="38" rx="15" ry="16" fill="#F5C45E" stroke="#2A1C08" stroke-width="1.5"/>
  <g clip-path="url(#beeBodyClip)" fill="#2A1C08">
    <rect x="15" y="35" width="34" height="3"/>
    <rect x="15" y="44" width="34" height="3"/>
  </g>
  <circle cx="27" cy="31" r="1.8" fill="#2A1C08"/>
  <circle cx="37" cy="31" r="1.8" fill="#2A1C08"/>
  <circle cx="27.5" cy="30.5" r="0.6" fill="#FFF"/>
  <circle cx="37.5" cy="30.5" r="0.6" fill="#FFF"/>
  <path d="M 27 33.5 Q 32 36 37 33.5" fill="none" stroke="#2A1C08" stroke-width="1.3" stroke-linecap="round"/>
  <circle cx="22" cy="34" r="1.8" fill="#FFA8C9" opacity="0.6"/>
  <circle cx="42" cy="34" r="1.8" fill="#FFA8C9" opacity="0.6"/>
  <path d="M 28 23 Q 25 17 23 14" stroke="#2A1C08" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <path d="M 36 23 Q 39 17 41 14" stroke="#2A1C08" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <circle cx="23" cy="14" r="1.4" fill="#2A1C08"/>
  <circle cx="41" cy="14" r="1.4" fill="#2A1C08"/>
  <path d="M 30 54 L 32 57 L 34 54 Z" fill="#2A1C08"/>
</svg>`,

  amma: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="amma muggu">
  <g transform="translate(32 32)">
    <polygon points="0,-30 28.5,-9.3 17.6,24.3 -17.6,24.3 -28.5,-9.3" fill="none" stroke="#063540" stroke-width="0.8" stroke-linejoin="round" opacity="0.4"/>
    <g fill="none" stroke="#063540" stroke-width="1" opacity="0.55" stroke-linecap="round">
      <path d="M-3 -28 A4.5 4.5 0 0 1 3 -28" transform="rotate(36)"/>
      <path d="M-3 -28 A4.5 4.5 0 0 1 3 -28" transform="rotate(108)"/>
      <path d="M-3 -28 A4.5 4.5 0 0 1 3 -28" transform="rotate(180)"/>
      <path d="M-3 -28 A4.5 4.5 0 0 1 3 -28" transform="rotate(252)"/>
      <path d="M-3 -28 A4.5 4.5 0 0 1 3 -28" transform="rotate(324)"/>
    </g>
    <g stroke="#063540" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">
      <path d="M0 -5 C-8 -12 -8 -22 0 -25 C8 -22 8 -12 0 -5 Z" fill="#FFA8C9"/>
      <path d="M0 -5 C-8 -12 -8 -22 0 -25 C8 -22 8 -12 0 -5 Z" fill="#D6BEE8" transform="rotate(72)"/>
      <path d="M0 -5 C-8 -12 -8 -22 0 -25 C8 -22 8 -12 0 -5 Z" fill="#FFEBB0" transform="rotate(144)"/>
      <path d="M0 -5 C-8 -12 -8 -22 0 -25 C8 -22 8 -12 0 -5 Z" fill="#CCE8D7" transform="rotate(216)"/>
      <path d="M0 -5 C-8 -12 -8 -22 0 -25 C8 -22 8 -12 0 -5 Z" fill="#FFC8B0" transform="rotate(288)"/>
    </g>
    <g fill="#168399" opacity="0.5">
      <ellipse cx="0" cy="-17" rx="2" ry="3.5"/>
      <ellipse cx="0" cy="-17" rx="2" ry="3.5" transform="rotate(72)"/>
      <ellipse cx="0" cy="-17" rx="2" ry="3.5" transform="rotate(144)"/>
      <ellipse cx="0" cy="-17" rx="2" ry="3.5" transform="rotate(216)"/>
      <ellipse cx="0" cy="-17" rx="2" ry="3.5" transform="rotate(288)"/>
    </g>
    <g fill="#063540">
      <circle cx="0" cy="-28" r="1.6" transform="rotate(36)"/>
      <circle cx="0" cy="-28" r="1.6" transform="rotate(108)"/>
      <circle cx="0" cy="-28" r="1.6" transform="rotate(180)"/>
      <circle cx="0" cy="-28" r="1.6" transform="rotate(252)"/>
      <circle cx="0" cy="-28" r="1.6" transform="rotate(324)"/>
    </g>
    <circle r="5" fill="#F5C945" stroke="#063540" stroke-width="1.2"/>
    <circle r="2" fill="#168399"/>
  </g>
</svg>`,

  nana: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="nana elephant">
  <ellipse cx="14" cy="28" rx="10" ry="13" fill="#B88D5E" stroke="#5C4022" stroke-width="1.3" transform="rotate(-12 14 28)"/>
  <ellipse cx="50" cy="28" rx="10" ry="13" fill="#B88D5E" stroke="#5C4022" stroke-width="1.3" transform="rotate(12 50 28)"/>
  <ellipse cx="14" cy="30" rx="5" ry="8" fill="#D4A574" opacity="0.5" transform="rotate(-12 14 30)"/>
  <ellipse cx="50" cy="30" rx="5" ry="8" fill="#D4A574" opacity="0.5" transform="rotate(12 50 30)"/>
  <ellipse cx="32" cy="32" rx="15" ry="17" fill="#D4A574" stroke="#5C4022" stroke-width="1.5"/>
  <ellipse cx="32" cy="24" rx="8" ry="4" fill="#FFF8E8" opacity="0.3"/>
  <path d="M 28 44 Q 28 52 30 56 Q 28 60 32 60 Q 36 58 35 54 Q 36 48 36 44 Z" fill="#D4A574" stroke="#5C4022" stroke-width="1.3" stroke-linejoin="round"/>
  <ellipse cx="30.5" cy="58" rx="0.9" ry="0.7" fill="#3A2410"/>
  <ellipse cx="33.5" cy="58" rx="0.9" ry="0.7" fill="#3A2410"/>
  <circle cx="24" cy="30" r="2.8" fill="#FFF8E8" stroke="#3A2410" stroke-width="0.8"/>
  <circle cx="40" cy="30" r="2.8" fill="#FFF8E8" stroke="#3A2410" stroke-width="0.8"/>
  <circle cx="24" cy="30.5" r="1.6" fill="#3A2410"/>
  <circle cx="40" cy="30.5" r="1.6" fill="#3A2410"/>
  <circle cx="24.5" cy="29.7" r="0.6" fill="#FFF"/>
  <circle cx="40.5" cy="29.7" r="0.6" fill="#FFF"/>
  <path d="M 19 25 Q 23 24 27 26" stroke="#5C4022" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M 37 26 Q 41 24 45 25" stroke="#5C4022" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M 27 45 L 25 50" stroke="#FFF8E8" stroke-width="2" stroke-linecap="round"/>
  <path d="M 37 45 L 39 50" stroke="#FFF8E8" stroke-width="2" stroke-linecap="round"/>
  <circle cx="20" cy="36" r="2" fill="#FFA8C9" opacity="0.5"/>
  <circle cx="44" cy="36" r="2" fill="#FFA8C9" opacity="0.5"/>
</svg>`,

  shikha: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="shikha butterfly">
  <path fill="#8A2BA8" d="M42.000156,65.000000 C28.000101,65.000000 14.500102,65.000000 1.000078,65.000000 C1.000052,43.666702 1.000052,22.333408 1.000026,1.000084 C22.333292,1.000056 43.666584,1.000056 64.999908,1.000028 C64.999939,22.333290 64.999939,43.666580 64.999969,64.999939 C57.500072,65.000000 50.000141,65.000000 42.000156,65.000000 M26.805920,56.654629 C28.080521,56.136131 29.318928,55.333591 30.638178,55.165485 C32.633026,54.911285 34.684208,55.099133 37.317604,55.099133 C42.833603,61.016766 48.754337,60.060017 53.578655,55.895702 C59.103767,51.126476 59.364670,46.166225 54.944252,39.893986 C57.192699,37.185261 60.555244,34.916958 61.128780,32.084011 C62.450844,25.553755 62.548733,18.753939 62.788857,12.050791 C62.823181,11.092679 60.823158,9.165158 59.874092,9.232345 C56.718399,9.455742 52.958324,9.497710 50.620979,11.222879 C45.410385,15.068767 40.920071,19.890528 35.393215,25.001812 C35.995689,21.665483 36.657524,18.944056 36.894833,16.186100 C36.980530,15.190166 36.047985,14.106618 35.580093,13.063051 C35.041748,13.888791 34.486996,14.704464 33.971531,15.544250 C33.686810,16.008116 33.467953,16.512415 33.113396,17.205811 C31.988779,15.493082 31.112915,14.159193 30.237053,12.825305 C29.842394,12.975633 29.447737,13.125959 29.053078,13.276286 C29.437311,17.010454 29.821545,20.744623 30.205778,24.478792 C28.501959,23.846939 27.856976,22.869911 27.001251,22.139919 C22.051779,17.917667 17.334074,13.336233 11.969652,9.719166 C8.488800,7.372131 4.025850,9.100314 3.099565,11.985293 C0.168627,21.113907 4.000051,33.368511 11.715685,39.543488 C6.855777,45.195427 6.861986,49.423595 11.262376,54.824230 C14.468160,58.758717 20.463642,61.113354 26.805920,56.654629 z"/>
  <path fill="#8D6DA0" d="M26.459763,56.810898 C20.463642,61.113354 14.468160,58.758717 11.262376,54.824230 C6.861986,49.423595 6.855777,45.195427 11.715685,39.543488 C4.000051,33.368511 0.168627,21.113907 3.099565,11.985293 C4.025850,9.100314 8.488800,7.372131 11.969652,9.719166 C17.334074,13.336233 22.051779,17.917667 27.001251,22.139919 C27.856976,22.869911 28.501959,23.846939 30.205778,24.478792 C29.821545,20.744623 29.437311,17.010454 29.053078,13.276286 C29.447737,13.125959 29.842394,12.975633 30.237053,12.825305 C31.112915,14.159193 31.988779,15.493082 33.113396,17.205811 C33.467953,16.512415 33.686810,16.008116 33.971531,15.544250 C34.486996,14.704464 35.041748,13.888791 35.580093,13.063051 C36.047985,14.106618 36.980530,15.190166 36.894833,16.186100 C36.657524,18.944056 35.995689,21.665483 35.393215,25.001812 C40.920071,19.890528 45.410385,15.068767 50.620979,11.222879 C52.958324,9.497710 56.718399,9.455742 59.874092,9.232345 C60.823158,9.165158 62.823181,11.092679 62.788857,12.050791 C62.548733,18.753939 62.450844,25.553755 61.128780,32.084011 C60.555244,34.916958 57.192699,37.185261 54.944252,39.893986 C59.364670,46.166225 59.103767,51.126476 53.578655,55.895702 C48.754337,60.060017 42.833603,61.016766 37.317604,55.099133 C34.684208,55.099133 32.633026,54.911285 30.638178,55.165485 C29.318928,55.333591 28.080521,56.136131 26.459763,56.810898 M5.152028,14.821209 C5.107695,16.300930 5.021225,17.780773 5.025552,19.260351 C5.068331,33.888489 7.479446,36.449146 21.787407,37.914757 C20.614729,38.605156 19.368122,39.196465 18.283875,40.005398 C15.539669,42.052799 10.381833,44.658470 10.669383,46.211052 C11.331684,49.787052 14.104886,53.620293 17.129662,55.837418 C18.644733,56.947948 22.963526,55.359974 25.339722,53.896900 C28.646275,51.860985 30.306419,48.814613 29.284790,44.198238 C28.385973,40.136806 30.380157,35.271069 29.024137,31.507235 C25.654001,22.152935 18.778440,15.445050 9.533919,11.578441 C8.612588,11.193086 6.747251,13.064714 5.152028,14.821209 M45.790821,36.943321 C54.563061,37.019279 58.645599,34.946545 59.627941,29.032944 C60.452911,24.066681 60.398808,18.954393 60.560925,13.259559 C57.483265,9.070488 54.281281,11.607463 51.474907,13.392992 C38.880703,21.405939 34.345249,33.166054 36.056030,47.669800 C36.808136,54.045986 44.726803,58.725857 49.552059,55.572018 C53.060051,53.279152 55.741173,50.199524 54.807583,45.691986 C53.929134,41.450710 50.460613,40.233597 46.544743,39.951561 C45.751633,39.894440 44.978218,39.563896 44.195721,39.359402 C44.437599,38.516659 44.679474,37.673916 45.790821,36.943321 M34.012451,41.642292 C34.298447,40.049747 34.838802,38.445995 34.769318,36.869114 C34.731285,36.005959 33.662746,35.188213 33.058903,34.349991 C32.409531,34.975006 31.199533,35.602230 31.201986,36.224678 C31.217627,40.192673 31.500355,44.159618 31.695139,48.126907 C32.467861,48.099838 33.240585,48.072769 34.013309,48.045700 C34.013309,46.191628 34.013309,44.337551 34.012451,41.642292 z"/>
  <path fill="#B5B5EE" d="M44.921349,36.831177 C44.679474,37.673916 44.437599,38.516659 44.195724,39.359402 C44.978218,39.563896 45.751633,39.894440 46.544743,39.951561 C50.460613,40.233597 53.929134,41.450710 54.807583,45.691986 C55.741173,50.199524 53.060051,53.279152 49.552059,55.572018 C44.726803,58.725857 36.808136,54.045986 36.056030,47.669800 C34.345249,33.166054 38.880703,21.405939 51.474907,13.392992 C54.281281,11.607463 57.483265,9.070488 60.366905,13.763067 C58.838200,17.151978 56.175499,20.171577 56.450638,22.894304 C56.991177,28.243412 53.972321,30.148893 50.396793,32.375477 C48.415192,33.609470 46.736553,35.329967 44.921349,36.831177 M44.306026,48.218315 C45.851242,48.932747 47.352211,49.868969 48.975353,50.192764 C49.343102,50.266121 50.691963,48.148140 50.576828,47.156368 C50.459221,46.143276 48.670734,44.352417 48.351036,44.499935 C46.832790,45.200512 45.566231,46.446526 44.306026,48.218315 z"/>
  <path fill="#B5B5EE" d="M5.320040,13.888844 C6.747251,13.064714 8.612588,11.193086 9.533919,11.578441 C18.778440,15.445050 25.654001,22.152935 29.024137,31.507235 C30.380157,35.271069 28.385973,40.136806 29.284790,44.198238 C30.306419,48.814613 28.646275,51.860985 25.339722,53.896900 C22.963526,55.359974 18.644733,56.947948 17.129662,55.837418 C14.104886,53.620293 11.331684,49.787052 10.669383,46.211052 C10.381833,44.658470 15.539669,42.052799 18.283875,40.005398 C19.368122,39.196465 20.614729,38.605156 21.752563,37.222046 C20.247330,35.272800 18.969353,33.437668 17.269131,32.872265 C12.830900,31.396349 10.522783,29.365953 10.370876,24.023500 C10.273537,20.600178 7.109389,17.264055 5.320040,13.888844 M19.494011,44.991779 C17.850214,45.386635 16.125237,45.612335 14.635139,46.327454 C14.356737,46.461060 14.644686,48.931629 15.354018,49.641163 C16.063385,50.350739 18.532709,50.640659 18.667608,50.360901 C19.385036,48.873055 19.611420,47.148434 19.494011,44.991779 z"/>
  <path fill="#A1A0E0" d="M5.236034,14.355026 C7.109389,17.264055 10.273537,20.600178 10.370876,24.023500 C10.522783,29.365953 12.830900,31.396349 17.269131,32.872265 C18.969353,33.437668 20.247330,35.272800 21.798401,36.863617 C7.479446,36.449146 5.068331,33.888489 5.025552,19.260351 C5.021225,17.780773 5.107695,16.300930 5.236034,14.355026 z"/>
  <path fill="#A09FDF" d="M45.356087,36.887249 C46.736553,35.329967 48.415192,33.609470 50.396793,32.375477 C53.972321,30.148893 56.991177,28.243412 56.450638,22.894304 C56.175499,20.171577 58.838200,17.151978 60.453392,14.086666 C60.398808,18.954393 60.452911,24.066681 59.627941,29.032944 C58.645599,34.946545 54.563061,37.019279 45.356087,36.887249 z"/>
  <path fill="#F7EBDC" d="M34.012878,42.062881 C34.013309,44.337551 34.013309,46.191628 34.013309,48.045700 C33.240585,48.072769 32.467861,48.099838 31.695139,48.126907 C31.500355,44.159618 31.217627,40.192673 31.201986,36.224678 C31.199533,35.602230 32.409531,34.975006 33.058903,34.349991 C33.662746,35.188213 34.731285,36.005959 34.769318,36.869114 C34.838802,38.445995 34.298447,40.049747 34.012878,42.062881 z"/>
  <path fill="#8F70A3" d="M44.258041,47.858318 C45.566231,46.446526 46.832790,45.200512 48.351036,44.499935 C48.670734,44.352417 50.459221,46.143276 50.576828,47.156368 C50.691963,48.148140 49.343102,50.266121 48.975353,50.192764 C47.352211,49.868969 45.851242,48.932747 44.258041,47.858318 z"/>
  <path fill="#8F70A3" d="M19.750908,45.248779 C19.611420,47.148434 19.385036,48.873055 18.667608,50.360901 C18.532709,50.640659 16.063385,50.350739 15.354018,49.641163 C14.644686,48.931629 14.356737,46.461060 14.635139,46.327454 C16.125237,45.612335 17.850214,45.386635 19.750908,45.248779 z"/>
</svg>`,

  harsh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="harsh tank top">
  <path d="M 22 10 L 20 22 L 16 24 L 16 56 L 48 56 L 48 24 L 44 22 L 42 10 L 38 10 L 36 22 Q 32 24 28 22 L 26 10 Z" fill="#1A1A1E" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M 20 26 L 20 54" stroke="#3A3A44" stroke-width="0.8"/>
  <path d="M 44 26 L 44 54" stroke="#3A3A44" stroke-width="0.8"/>
  <path d="M 28 22 Q 32 24 36 22" fill="none" stroke="#3A3A44" stroke-width="0.8"/>
  <path d="M 16 52 L 48 52" stroke="#3A3A44" stroke-width="0.8"/>
</svg>`,

  gayatri: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="gayatri vinyl + music">
  <circle cx="28" cy="36" r="22" fill="#1A0E14" stroke="#4A1F2E" stroke-width="1.5"/>
  <circle cx="28" cy="36" r="19" fill="none" stroke="#3A1E2C" stroke-width="0.4"/>
  <circle cx="28" cy="36" r="16" fill="none" stroke="#3A1E2C" stroke-width="0.4"/>
  <circle cx="28" cy="36" r="13" fill="none" stroke="#3A1E2C" stroke-width="0.4"/>
  <circle cx="28" cy="36" r="10" fill="none" stroke="#3A1E2C" stroke-width="0.4"/>
  <circle cx="28" cy="36" r="7" fill="#E6629A" stroke="#8B2E5C" stroke-width="1"/>
  <circle cx="28" cy="36" r="1.5" fill="#F5C945"/>
  <path d="M 18 20 Q 22 22 20 30" stroke="#5A2E44" stroke-width="1.5" fill="none" opacity="0.7"/>
  <path d="M 50 6 L 50 26" stroke="#F5C945" stroke-width="2.2" stroke-linecap="round"/>
  <ellipse cx="46" cy="26" rx="5" ry="4" fill="#F5C945" stroke="#8B2E5C" stroke-width="1" transform="rotate(-20 46 26)"/>
  <path d="M 50 6 Q 58 10 56 18" stroke="#F5C945" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <circle cx="56" cy="34" r="1" fill="#F5C945"/>
  <circle cx="52" cy="48" r="0.8" fill="#E6629A"/>
</svg>`,

  akshaya: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="akshaya cherries">
  <path d="M 32 12 Q 44 10 48 18 Q 42 22 36 20 Q 34 18 32 16 Z" fill="#5F8A6E" stroke="#2E4A3A" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M 34 15 Q 40 16 46 17" stroke="#2E4A3A" stroke-width="0.6" fill="none"/>
  <path d="M 32 14 Q 26 22 22 38" stroke="#5C4022" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 32 14 Q 38 22 42 38" stroke="#5C4022" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="22" cy="44" r="11" fill="#E6293E" stroke="#8A1628" stroke-width="1.3"/>
  <ellipse cx="18" cy="40" rx="3" ry="2" fill="#FF6A7E" opacity="0.7"/>
  <circle cx="42" cy="44" r="11" fill="#E6293E" stroke="#8A1628" stroke-width="1.3"/>
  <ellipse cx="38" cy="40" rx="3" ry="2" fill="#FF6A7E" opacity="0.7"/>
  <circle cx="52" cy="22" r="1" fill="#F5C945"/>
</svg>`,

  tataAmmamma: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-label="tata ammamma yin-yang">
  <circle cx="32" cy="32" r="28" fill="#B8D9EE"/>
  <path d="M 32 4 A 28 28 0 0 1 32 60 A 14 14 0 0 1 32 32 A 14 14 0 0 0 32 4 Z" fill="#7A5BA8"/>
  <circle cx="32" cy="46" r="4.5" fill="#F5C945" stroke="#2A1F3D" stroke-width="0.8"/>
  <circle cx="32" cy="18" r="4.5" fill="#1A1A1A"/>
  <circle cx="32" cy="32" r="28" fill="none" stroke="#2A1F3D" stroke-width="2"/>
</svg>`,

  tutu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 726 252.17"><path d="M483.92 0S481.38 24.71 466 40.11c-11.74 11.74-24.09 12.66-40.26 15.07-9.42 1.41-29.7 3.77-34.81-.79-2.37-2.11-3-21-3.22-27.62-.21-6.92-1.36-16.52-2.82-18-.75 3.06-2.49 11.53-3.09 13.61S378.49 34.3 378 36a85.13 85.13 0 0 0-30.09 0c-.46-1.67-3.17-11.48-3.77-13.56s-2.34-10.55-3.09-13.61c-1.45 1.45-2.61 11.05-2.82 18-.21 6.67-.84 25.51-3.22 27.62-5.11 4.56-25.38 2.2-34.8.79-16.16-2.47-28.51-3.39-40.21-15.13C244.57 24.71 242 0 242 0H0s69.52 22.74 97.52 68.59c16.56 27.11 14.14 58.49 9.92 74.73C170 140 221.46 140 273 158.57c69.23 24.93 83.2 76.19 90 93.6 6.77-17.41 20.75-68.67 90-93.6 51.54-18.56 103-18.59 165.56-15.25-4.21-16.24-6.63-47.62 9.93-74.73C656.43 22.74 726 0 726 0z"/></svg>`,
};

// Convenience: get person SVG. Accepts id string or full person object.
function personSvg(personOrId) {
  const genericSvg = `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="32" cy="24" r="12"/><path d="M20 38c-5 2-8 7-8 14h40c0-7-3-12-8-14"/><circle cx="27" cy="25" r="1.2" fill="currentColor"/><circle cx="37" cy="25" r="1.2" fill="currentColor"/></svg>`;
  if (typeof personOrId === "string") return PERSON_SVGS[personOrId] || genericSvg;
  const p = personOrId; if (!p) return genericSvg;
  if (p.customIcon === "emoji") return `<span class="person-emoji-icon">${p.emoji||"🌸"}</span>`;
  if (p.customIcon && p.customIcon !== p.id) return PERSON_SVGS[p.customIcon] || PERSON_SVGS[p.id] || genericSvg;
  return PERSON_SVGS[p.id] || genericSvg;
}

// Helper: get category ico