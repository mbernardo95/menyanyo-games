/* Cover: placeholder key art per game (inline SVG + scanlines + grain + tag).
   Swaps to the real image when `cover` is set, and mounts the trailer only while it plays. */
import type { Game } from '../games';
import type { Copy } from '../i18n';
import { esc, uid } from '../util';

const BG: Record<string, string> = {
  corrillo: 'radial-gradient(120% 90% at 75% 15%, #FF7A2E 0%, #B5176B 38%, #2A0A22 75%, #12060F 100%)',
  zvh: 'linear-gradient(100deg, #0C2A0A 0%, #12210E 46%, #2A0B0B 54%, #3A0A0A 100%)',
  pillapilla: 'radial-gradient(90% 90% at 20% 45%, #3A1F7A 0%, #121A44 50%, #070A1C 100%)',
  geomites: 'radial-gradient(100% 90% at 50% 100%, #6B3C00 0%, #1E2A2A 55%, #071514 100%)',
  supermanager: 'linear-gradient(160deg, #0E3B22 0%, #0A2A18 50%, #12100A 100%)'
};

/* Gallery "shots" of the placeholder: zoomed crops of the same art. */
export const SHOTS = ['scale(1)', 'scale(1.45) translate(-9%, 5%)', 'scale(1.6) translate(11%, -7%)', 'scale(1.3) translate(5%, 9%)'];

const ART: Record<string, (u: string) => string> = {
  corrillo: () => `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<circle cx="120" cy="22" r="30" fill="#FFE6D0" opacity="0.10"></circle>
<circle cx="120" cy="22" r="15" fill="#FFE6D0" opacity="0.92"></circle>
<circle cx="115" cy="19" r="3" fill="#F5C9AE" opacity="0.7"></circle>
<ellipse cx="62" cy="62" rx="44" ry="13" fill="#FF7A2E" opacity="0.28"></ellipse>
<circle cx="62" cy="52" r="15" fill="#FFD2A8" opacity="0.18"></circle>
<circle cx="62" cy="52" r="6" fill="#FFE2C4"></circle>
<g transform="rotate(0 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FF3DA8"></rect></g>
<g transform="rotate(51.4 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FF7A2E"></rect></g>
<g transform="rotate(102.8 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FF3DA8"></rect></g>
<g transform="rotate(154.3 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FFB36B"></rect></g>
<g transform="rotate(205.7 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FF3DA8"></rect></g>
<g transform="rotate(257.1 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FF7A2E"></rect></g>
<g transform="rotate(308.6 62 52)"><rect x="58" y="21" width="8" height="14" rx="2" fill="#160A16" stroke="#FFC2E0" stroke-width="0.8"></rect><rect x="59.4" y="22.6" width="5.2" height="9.6" rx="1" fill="#FF3DA8"></rect></g>
<rect x="20" y="14" width="2" height="2" fill="#FFB36B" transform="rotate(20 21 15)"></rect>
<rect x="96" y="70" width="2" height="2" fill="#FF3DA8" transform="rotate(40 97 71)"></rect>
<rect x="140" y="56" width="2.4" height="2.4" fill="#FFE6D0" transform="rotate(10 141 57)"></rect>
<rect x="30" y="76" width="2" height="2" fill="#FF7A2E"></rect>
<rect x="104" y="40" width="1.6" height="1.6" fill="#FFE6D0"></rect>
</svg>`,
  zvh: (u) => `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<defs><pattern id="mg-zvh-grid-${u}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="0.5"></path></pattern></defs>
<rect width="160" height="90" fill="url(#mg-zvh-grid-${u})"></rect>
<g fill="#7CFF4F">
<rect x="10.5" y="20.5" width="9" height="9" opacity="0.35"></rect><rect x="20.5" y="20.5" width="9" height="9" opacity="0.6"></rect><rect x="20.5" y="30.5" width="9" height="9" opacity="0.8"></rect><rect x="30.5" y="30.5" width="9" height="9" opacity="0.5"></rect><rect x="10.5" y="40.5" width="9" height="9" opacity="0.7"></rect><rect x="30.5" y="40.5" width="9" height="9" opacity="0.9"></rect><rect x="40.5" y="50.5" width="9" height="9" opacity="0.6"></rect><rect x="20.5" y="60.5" width="9" height="9" opacity="0.4"></rect><rect x="50.5" y="30.5" width="9" height="9" opacity="0.7"></rect><rect x="60.5" y="40.5" width="9" height="9" opacity="0.85"></rect><rect x="50.5" y="60.5" width="9" height="9" opacity="0.45"></rect><rect x="30.5" y="70.5" width="9" height="9" opacity="0.3"></rect><rect x="60.5" y="20.5" width="9" height="9" opacity="0.5"></rect><rect x="70.5" y="50.5" width="9" height="9" opacity="0.7"></rect>
</g>
<g fill="#FF3B3B">
<rect x="100.5" y="10.5" width="9" height="9" opacity="0.4"></rect><rect x="110.5" y="30.5" width="9" height="9" opacity="0.8"></rect><rect x="120.5" y="20.5" width="9" height="9" opacity="0.6"></rect><rect x="130.5" y="40.5" width="9" height="9" opacity="0.9"></rect><rect x="100.5" y="50.5" width="9" height="9" opacity="0.7"></rect><rect x="110.5" y="60.5" width="9" height="9" opacity="0.5"></rect><rect x="140.5" y="30.5" width="9" height="9" opacity="0.6"></rect><rect x="120.5" y="70.5" width="9" height="9" opacity="0.35"></rect><rect x="90.5" y="40.5" width="9" height="9" opacity="0.85"></rect><rect x="130.5" y="60.5" width="9" height="9" opacity="0.5"></rect><rect x="100.5" y="30.5" width="9" height="9" opacity="0.65"></rect>
</g>
<polyline points="82,0 78,10 86,20 80,30 88,40 82,50 90,60 84,70 90,80 86,90" fill="none" stroke="#F5F3FA" stroke-opacity="0.85" stroke-width="1.2" stroke-dasharray="3 2"></polyline>
<g fill="none" stroke="#7CFF4F" stroke-width="1.6"><circle cx="36" cy="38" r="6"></circle><circle cx="30.5" cy="47" r="6"></circle><circle cx="41.5" cy="47" r="6"></circle><circle cx="36" cy="44" r="1.6" fill="#7CFF4F"></circle></g>
<g fill="none" stroke="#FF3B3B" stroke-width="1.6"><circle cx="124" cy="45" r="11"></circle><circle cx="124" cy="45" r="4"></circle><path d="M124 29v8M124 53v8M108 45h8M132 45h8"></path></g>
</svg>`,
  pillapilla: (u) => `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<defs>
<pattern id="mg-pp-grid-${u}" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0H0V8" fill="none" stroke="#9FB8FF" stroke-opacity="0.09" stroke-width="0.5"></path></pattern>
<linearGradient id="mg-pp-cone-${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#A66BFF" stop-opacity="0.75"></stop><stop offset="1" stop-color="#A66BFF" stop-opacity="0"></stop></linearGradient>
</defs>
<rect width="160" height="90" fill="url(#mg-pp-grid-${u})"></rect>
<polygon points="34,44 126,8 138,70" fill="url(#mg-pp-cone-${u})"></polygon>
<g fill="#262C58" stroke="#5563B0" stroke-width="0.6"><rect x="72" y="12" width="6" height="30"></rect><rect x="96" y="52" width="30" height="6"></rect><rect x="114" y="18" width="6" height="22"></rect><rect x="40" y="66" width="28" height="6"></rect><rect x="10" y="12" width="22" height="6"></rect></g>
<circle cx="34" cy="44" r="13" fill="#A66BFF" opacity="0.25"></circle>
<rect x="29" y="39" width="10" height="10" fill="#A66BFF" transform="rotate(45 34 44)"></rect>
<rect x="31.5" y="41.5" width="5" height="5" fill="#F0E6FF" transform="rotate(45 34 44)"></rect>
<g fill="#3D9BFF" stroke="#CFE4FF" stroke-width="0.8"><circle cx="102" cy="30" r="3"></circle><circle cx="86" cy="62" r="3"></circle><circle cx="142" cy="78" r="3"></circle><circle cx="130" cy="28" r="3"></circle><circle cx="60" cy="20" r="3"></circle></g>
<g fill="#3D9BFF" opacity="0.5"><circle cx="96" cy="34" r="1"></circle><circle cx="91" cy="37" r="1"></circle><circle cx="86" cy="40" r="1"></circle></g>
</svg>`,
  geomites: () => `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<ellipse cx="80" cy="82" rx="60" ry="9" fill="#000000" opacity="0.35"></ellipse>
<circle cx="80" cy="46" r="38" fill="#FFB547" opacity="0.10"></circle>
<polygon points="70,82 77,30 88,20 97,33 93,82" fill="#FFB547"></polygon>
<polygon points="77,30 88,20 85,82 70,82" fill="#FFD488" opacity="0.75"></polygon>
<polygon points="88,20 97,33 93,82 85,82" fill="#C97A10" opacity="0.6"></polygon>
<polygon points="50,82 57,46 66,39 73,52 68,82" fill="#2EE6C5"></polygon>
<polygon points="57,46 66,39 63,82 50,82" fill="#A8FFF0" opacity="0.6"></polygon>
<polygon points="99,82 105,56 113,49 118,62 113,82" fill="#FF5FA2"></polygon>
<polygon points="105,56 113,49 110,82 99,82" fill="#FFC2DC" opacity="0.55"></polygon>
<polygon points="38,82 42,64 48,59 51,70 49,82" fill="#6FA8FF"></polygon>
<polygon points="120,82 123,70 128,66 131,74 129,82" fill="#2EE6C5" opacity="0.8"></polygon>
<g fill="#FFF3D6"><path d="M40 24l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"></path><path d="M124 30l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8z"></path><path d="M108 14l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"></path><path d="M60 16l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z"></path></g>
</svg>`,
  supermanager: (u) => `<svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice">
<defs>
<pattern id="mg-sm-stripes-${u}" width="20" height="90" patternUnits="userSpaceOnUse"><rect width="10" height="90" fill="#FFFFFF" fill-opacity="0.045"></rect></pattern>
<linearGradient id="mg-sm-gold-${u}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#8A6A00"></stop><stop offset="1" stop-color="#FFD23F"></stop></linearGradient>
</defs>
<rect width="160" height="90" fill="url(#mg-sm-stripes-${u})"></rect>
<g fill="none" stroke="#FFFFFF" stroke-opacity="0.22" stroke-width="0.7"><rect x="6" y="6" width="148" height="78"></rect><path d="M80 6v78"></path><circle cx="80" cy="45" r="14"></circle><rect x="6" y="28" width="18" height="34"></rect><rect x="136" y="28" width="18" height="34"></rect></g>
<g fill="url(#mg-sm-gold-${u})"><rect x="16" y="64" width="8" height="16" rx="1"></rect><rect x="27" y="56" width="8" height="24" rx="1"></rect><rect x="38" y="46" width="8" height="34" rx="1"></rect><rect x="49" y="34" width="8" height="46" rx="1"></rect></g>
<circle cx="118" cy="38" r="26" fill="#FFD23F" opacity="0.12"></circle>
<polygon points="118,18 122.7,31.5 137,31.8 125.6,40.5 129.8,54.2 118,46 106.2,54.2 110.4,40.5 99,31.8 113.3,31.5" fill="#FFD23F"></polygon>
<polygon points="118,18 122.7,31.5 118,36 113.3,31.5" fill="#FFF0B3" opacity="0.7"></polygon>
<rect x="104" y="64" width="28" height="3" rx="1.5" fill="#2FBF71"></rect>
<rect x="110" y="70" width="16" height="3" rx="1.5" fill="#2FBF71" opacity="0.6"></rect>
</svg>`
};

export interface CoverOpts {
  /** Tag text (HTML) in the top-left corner; null hides it. Only shown on placeholder art. */
  tag?: string | null;
  shot?: number;
  /** Use the 9:16 crop on narrow screens (the hero). */
  tall?: boolean;
  /** An image to show instead of the cover (a gallery screenshot). */
  img?: string | null;
}

export function cover(g: Game, lang: 'es' | 'en', opts: CoverOpts = {}): string {
  const u = uid();
  const shot = SHOTS[Math.max(0, Math.min(3, opts.shot ?? 0))];
  const fallback = `linear-gradient(135deg, ${g.colors.a}, ${g.colors.b})`;
  const src = opts.img ?? g.cover;
  let art: string;
  if (src) {
    const img = `<img src="${esc(src)}" alt="" ${opts.tall ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" class="cover-art" style="transform:${shot}">`;
    art = opts.tall && g.coverTall && !opts.img
      ? `<picture><source media="(max-width: 759px)" srcset="${esc(g.coverTall)}">${img}</picture>`
      : img;
  } else {
    const svg = ART[g.id]?.(u) ?? '';
    art = `<div class="cover-art" aria-hidden="true" style="transform:${shot}">${svg.replace('<svg ', '<svg class="cover-svg" ')}</div>`;
  }
  const tag = !src && opts.tag ? `<span class="cover-tag" aria-hidden="true">${opts.tag}</span>` : '';
  return `<div class="cover" role="img" aria-label="${esc(g.alt[lang])}" style="background:${BG[g.id] ?? fallback}">
    ${art}
    <div class="cover-video" aria-hidden="true"></div>
    <div class="cover-scan" aria-hidden="true"></div>
    <svg class="cover-grain" aria-hidden="true"><filter id="mg-grain-${u}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"></feTurbulence></filter><rect width="100%" height="100%" filter="url(#mg-grain-${u})"></rect></svg>
    <div class="cover-vignette" aria-hidden="true"></div>
    ${tag}
  </div>`;
}

/** Starts or stops the trailer in a rendered cover. Without a trailer it shows a "▶ Trailer · Placeholder" stub. */
export function setPlaying(root: Element | null, g: Game, t: Copy, on: boolean): void {
  const slot = root?.querySelector('.cover-video');
  if (!slot) return;
  if (!on) { slot.innerHTML = ''; return; }
  if (slot.childElementCount) return;
  if (g.trailer) {
    const v = document.createElement('video');
    Object.assign(v, { src: g.trailer, muted: true, loop: true, playsInline: true, preload: 'none' });
    v.setAttribute('muted', '');
    slot.append(v);
    v.play().catch(() => {});
  } else {
    slot.innerHTML = `<span class="cover-stub" style="--dot:${g.colors.a}">▶ ${esc(t.trailer)} · ${esc(t.placeholder)}</span>`;
  }
}
