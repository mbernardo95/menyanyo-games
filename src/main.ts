import './tokens.css';
import './styles.css';
import { GAMES, type Game, type Lang } from './games';
import { T } from './i18n';
import { setPlaying } from './components/cover';
import { heroArt, heroDots, heroSlide, heroTag } from './components/hero';
import { filterChips, grid, type Filter } from './components/library';
import { media, overlay, thumbs } from './components/overlay';
import type { Ctx } from './components/shared';
import { page } from './page';

type Theme = 'dark' | 'light';

const store = {
  get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
};

function initialLang(): Lang {
  const q = new URLSearchParams(location.search).get('lang');
  const pick = (v: string | null): Lang | null => (v === 'es' || v === 'en' ? v : null);
  return pick(q) ?? pick(store.get('mg-lang')) ?? ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const featured: Game[] = (() => {
  const f = GAMES.filter((g) => g.featured && g.status === 'live');
  return f.length ? f : GAMES.slice(0, 1);
})();
const byId = (id: string | null) => GAMES.find((g) => g.id === id) ?? null;

const state = {
  lang: initialLang(),
  theme: (store.get('mg-theme') === 'light' ? 'light' : 'dark') as Theme,
  filter: 'all' as Filter,
  hero: 0,
  drift: false,
  heroHold: { hover: false, focus: false },
  focusId: null as string | null,
  openId: null as string | null,
  shot: 0,
  reduced: motionQuery.matches
};

const app = document.getElementById('app')!;
const ctx = (): Ctx => ({ t: T[state.lang], lang: state.lang });
const $ = <E extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<E>(sel);

/* ---------- accent: the game in focus colours the page ---------- */
function applyAccent(): void {
  const g = byId(state.openId) ?? byId(state.focusId) ?? featured[state.hero];
  const s = document.documentElement.style;
  s.setProperty('--ga', g.colors.a);
  s.setProperty('--gb', g.colors.b);
  s.setProperty('--gink', g.colors.ink);
}

/* ---------- rendering ---------- */
/** Re-renders, then puts focus back on the control with the same data-key. */
function keepFocus(fn: () => void): void {
  const key = (document.activeElement as HTMLElement | null)?.dataset?.key;
  fn();
  if (key) $(`[data-key="${key}"]`)?.focus({ preventScroll: true });
}

function renderAll(): void {
  const c = ctx();
  document.documentElement.lang = state.lang;
  document.documentElement.dataset.theme = state.theme;
  document.title = c.t.docTitle;
  keepFocus(() => {
    app.innerHTML = page(c, state.theme, state.filter);
    renderHero(false);
  });
  bindHero();
  applyAccent();
}

let heroAnnounce = false;
function renderHero(artToo = true): void {
  const c = ctx();
  const g = featured[state.hero];
  const frame = $('.hero')!;
  frame.classList.toggle('single', featured.length < 2);
  if (artToo || !$('.hero-art')!.childElementCount) {
    $('.hero-art')!.innerHTML = heroArt(g, c);
    $('.hero-ph')!.innerHTML = heroTag(g, c);
  }
  const slide = $('.hero-slide')!;
  slide.setAttribute('aria-label', `${state.hero + 1} ${c.t.of} ${featured.length}: ${g.title}`);
  slide.setAttribute('aria-live', heroAnnounce ? 'polite' : 'off');
  keepFocus(() => {
    slide.innerHTML = heroSlide(g, state.hero, featured.length, c);
    $('.dots')!.innerHTML = heroDots(featured, state.hero, c);
  });
  if (!state.reduced) setPlaying($('.hero-art'), g, c.t, true);
  $('.hero-drift')!.style.transform = state.reduced ? 'none' : `scale(${state.drift ? 1.07 : 1.01})`;
}

function goHero(i: number, byUser: boolean): void {
  heroAnnounce = byUser;
  state.hero = ((i % featured.length) + featured.length) % featured.length;
  state.drift = !state.drift;
  renderHero();
  applyAccent();
}

function renderLibrary(): void {
  const c = ctx();
  keepFocus(() => {
    $('.filters')!.innerHTML = filterChips(c, state.filter);
    $('.grid')!.innerHTML = grid(c, state.filter);
  });
}

/* ---------- hero autoplay: 7 s, paused on hover/focus, overlay, hidden tab, reduced motion ---------- */
setInterval(() => {
  const h = state.heroHold;
  if (state.reduced || h.hover || h.focus || state.openId || document.hidden || featured.length < 2) return;
  goHero(state.hero + 1, false);
}, 7000);

/* ---------- overlay (modal dialog) ---------- */
let lastFocus: HTMLElement | null = null;

function openOverlay(id: string, push: boolean): void {
  const g = byId(id);
  if (!g) return;
  if (!state.openId) lastFocus = document.activeElement as HTMLElement | null;
  state.openId = id;
  state.shot = 0;
  $('#overlay-root')!.innerHTML = overlay(g, 0, ctx());
  app.inert = true;
  document.body.classList.add('locked');
  if (push) history.pushState({ mgOverlay: id }, '', `#game=${id}`);
  playOverlay();
  applyAccent();
  requestAnimationFrame(() => $('[data-autofocus]', $('#overlay-root')!)?.focus());
}

function closeOverlay(fromPop: boolean): void {
  if (!state.openId) return;
  state.openId = null;
  $('#overlay-root')!.innerHTML = '';
  app.inert = false;
  document.body.classList.remove('locked');
  if (!fromPop) {
    if (history.state?.mgOverlay) history.back();
    else history.replaceState(null, '', location.pathname + location.search);
  }
  applyAccent();
  if (lastFocus?.isConnected) lastFocus.focus({ preventScroll: true });
}

function playOverlay(): void {
  const g = byId(state.openId)!;
  setPlaying($('.ov-media'), g, ctx().t, state.shot === 0 && !state.reduced);
}

function pickShot(i: number): void {
  const g = byId(state.openId)!;
  state.shot = i;
  const c = ctx();
  $('.ov-media')!.innerHTML = media(g, i, c);
  keepFocus(() => { $('.thumbs')!.innerHTML = thumbs(g, i, c); });
  playOverlay();
}

function trapTab(e: KeyboardEvent): void {
  const root = $('.ov');
  if (!root) return;
  const f = Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function hashGame(): string | null {
  const m = /^#game=([\w-]+)$/.exec(location.hash);
  return m && byId(m[1]) ? m[1] : null;
}

/* ---------- events (delegated: the markup is re-rendered) ---------- */
document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('[data-open],[data-close],[data-filter],[data-lang],[data-theme-toggle],[data-hero],[data-shot],.ov');
  if (!el) return;
  const d = el.dataset;
  if (d.open) openOverlay(d.open, true);
  else if (d.close !== undefined) closeOverlay(false);
  else if (d.filter) { state.filter = d.filter as Filter; renderLibrary(); }
  else if (d.lang) { state.lang = d.lang as Lang; store.set('mg-lang', state.lang); renderAll(); }
  else if (d.themeToggle !== undefined) { state.theme = state.theme === 'dark' ? 'light' : 'dark'; store.set('mg-theme', state.theme); renderAll(); }
  else if (d.hero) goHero(d.hero === 'prev' ? state.hero - 1 : d.hero === 'next' ? state.hero + 1 : Number(d.hero), true);
  else if (d.shot) pickShot(Number(d.shot));
  else if (el.classList.contains('ov') && e.target === el) closeOverlay(false); // click on the backdrop
});

document.addEventListener('keydown', (e) => {
  if (!state.openId) return;
  if (e.key === 'Escape') { e.preventDefault(); closeOverlay(false); }
  else if (e.key === 'Tab') trapTab(e);
});

window.addEventListener('popstate', () => {
  const id = hashGame();
  if (id && id !== state.openId) openOverlay(id, false);
  else if (!id && state.openId) closeOverlay(true);
});

/* Card hover/focus: lift (CSS), trailer, and the page accent switches to the game. */
const cardOf = (t: EventTarget | null) => (t instanceof Element ? t.closest<HTMLElement>('.card') : null);
app.addEventListener('mouseover', (e) => {
  const card = cardOf(e.target);
  if (!card || card.contains(e.relatedTarget as Node)) return;
  const g = byId(card.dataset.game!)!;
  state.focusId = g.id;
  applyAccent();
  if (!state.reduced) setPlaying(card, g, ctx().t, true);
});
app.addEventListener('mouseout', (e) => {
  const card = cardOf(e.target);
  if (!card || card.contains(e.relatedTarget as Node)) return;
  setPlaying(card, byId(card.dataset.game!)!, ctx().t, false);
  if (state.focusId === card.dataset.game && !card.contains(document.activeElement)) { state.focusId = null; applyAccent(); }
});
app.addEventListener('focusin', (e) => {
  const card = cardOf(e.target);
  if (card) { state.focusId = card.dataset.game!; applyAccent(); }
  if ((e.target as Element).closest('.hero')) state.heroHold.focus = true;
});
app.addEventListener('focusout', (e) => {
  const card = cardOf(e.target);
  if (card && !card.contains(e.relatedTarget as Node) && state.focusId === card.dataset.game) { state.focusId = null; applyAccent(); }
  if (!(e.relatedTarget as Element | null)?.closest?.('.hero')) state.heroHold.focus = false;
});

/* Hero: pause on hover, pointer parallax. */
function bindHero(): void {
  state.heroHold.hover = false;
  const hero = $('.hero')!;
  const layer = $('.hero-parallax')!;
  let raf = 0;
  hero.addEventListener('mouseenter', () => { state.heroHold.hover = true; });
  hero.addEventListener('mouseleave', () => { state.heroHold.hover = false; layer.style.transform = ''; });
  hero.addEventListener('mousemove', (e) => {
    if (state.reduced) return;
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { layer.style.transform = `translate3d(${(-px * 22).toFixed(1)}px, ${(-py * 14).toFixed(1)}px, 0)`; });
  });
}

motionQuery.addEventListener('change', () => { state.reduced = motionQuery.matches; renderHero(); });

/* ---------- boot ---------- */
function boot(): void {
  renderAll();
  if (!state.reduced) requestAnimationFrame(() => requestAnimationFrame(() => { state.drift = true; $('.hero-drift')!.style.transform = 'scale(1.07)'; }));
  const id = hashGame();
  if (id) openOverlay(id, false);
}
boot();
