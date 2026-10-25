import type { Game } from '../games';
import { cover } from './cover';
import { icon } from './icons';
import { statChips, type Ctx } from './shared';
import { esc } from '../util';

/* The frame stays mounted for the whole visit so the drift and parallax can transition;
   only the art, the slide and the dots are swapped. */
export function heroFrame({ t }: Ctx): string {
  const corners = ['tl', 'tr', 'bl', 'br'].map((c) => `<span class="hud ${c}" aria-hidden="true"></span>`).join('');
  return `<section id="featured" class="wrap hero-sec" aria-roledescription="carousel" aria-label="${esc(t.featured)}">
    <div class="hero">
      <div class="hero-drift"><div class="hero-parallax"><div class="hero-art"></div></div></div>
      <div class="hero-scrim" aria-hidden="true"></div>
      <div class="hero-ph"></div>
      ${corners}
      <div class="hero-slide" role="group" aria-roledescription="slide"></div>
      <div class="hero-controls">
        <button type="button" class="round-btn glass" data-hero="prev" data-key="hero-prev" aria-label="${esc(t.prev)}">${icon.prev}</button>
        <div class="dots"></div>
        <button type="button" class="round-btn glass" data-hero="next" data-key="hero-next" aria-label="${esc(t.next)}">${icon.next}</button>
      </div>
    </div>
  </section>`;
}

/* The art sits in the drift/parallax layers; its "placeholder" tag sits outside them, on the frame. */
export function heroArt(g: Game, { lang }: Ctx): string {
  return cover(g, lang, { tall: true });
}

export function heroTag(g: Game, { t }: Ctx): string {
  if (g.cover) return '';
  return `<span class="cover-tag" aria-hidden="true"><span class="only-desk">${esc(t.placeholder)} · 16:9</span><span class="only-mob">${esc(t.placeholder)} · 9:16</span></span>`;
}

export function heroSlide(g: Game, i: number, n: number, ctx: Ctx): string {
  const { t, lang } = ctx;
  const pad = (x: number) => String(x).padStart(2, '0');
  const play = g.url
    ? `<a class="btn-hero btn-press" href="${esc(g.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t.playAria(g.title))}">${icon.play(22)}${esc(t.play)}</a>`
    : '';
  return `<div class="hero-meta"><span class="hero-tag">${esc(t.featured)}</span><span class="hero-count">${pad(i + 1)} / ${pad(n)}</span></div>
    <h2 class="hero-title">${esc(g.title)}</h2>
    <p class="hero-hook">${esc(g.hook[lang])}</p>
    <div class="chip-row">${statChips(g, ctx, 'hero-chip')}</div>
    <div class="hero-cta">
      <div class="btn-row">${play}<button type="button" class="btn-glass glass" data-open="${g.id}" data-key="hero-details" aria-label="${esc(t.detailsAria(g.title))}">${esc(t.details)}</button></div>
    </div>`;
}

export function heroDots(list: Game[], idx: number, { t }: Ctx): string {
  return list.map((g, i) => `<button type="button" class="dot-btn" data-hero="${i}" data-key="hero-dot-${i}" aria-label="${esc(`${t.goTo} ${g.title}`)}" aria-current="${i === idx}"><span aria-hidden="true" style="--dot:${g.colors.a}"></span></button>`).join('');
}
