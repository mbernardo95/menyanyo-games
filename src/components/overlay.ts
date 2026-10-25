import type { Game } from '../games';
import { cover } from './cover';
import { icon } from './icons';
import { actionLabel, canPlay, statChips, type Ctx } from './shared';
import { esc, gameVars } from '../util';

export function overlay(g: Game, shot: number, ctx: Ctx): string {
  const { t, lang } = ctx;
  const action = canPlay(g)
    ? `<a class="btn btn-lg btn-press" href="${esc(g.url!)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t.playAria(g.title))}">${icon.play(20)}${esc(actionLabel(g, t))}</a>${g.urlLabel ? `<span class="ov-url">${esc(g.urlLabel)}</span>` : ''}`
    : `<button type="button" class="btn-soon btn-lg" disabled>${esc(t.soon)}</button>`;
  return `<div class="ov" role="dialog" aria-modal="true" aria-labelledby="ov-title">
    <div class="ov-panel g-scope" style="${gameVars(g.colors)}">
      <div class="ov-media-col">
        <div class="ov-media">${media(g, shot, ctx)}</div>
        <div class="thumbs" role="group" aria-label="${esc(t.gallery)}">${thumbs(g, shot, ctx)}</div>
      </div>
      <div class="ov-info">
        <div class="ov-top">
          <button type="button" class="btn-ghost ghost" data-close>${icon.arrowLeft}${esc(t.back)}</button>
          <button type="button" class="btn-ghost ghost ov-close" data-close data-autofocus aria-label="${esc(t.closeAria)}"><span class="esc-k">ESC</span>${icon.close}</button>
        </div>
        <div class="ov-titles"><span class="genre genre-lg">${esc(g.genre[lang])}</span><h2 id="ov-title" class="ov-title">${esc(g.title)}</h2></div>
        <div class="chip-row">${statChips(g, ctx, 'stat-chip')}</div>
        <p class="ov-desc">${esc(g.desc[lang])}</p>
        <div class="ov-actions">${action}</div>
      </div>
    </div>
  </div>`;
}

const shotLabel = (i: number, { t }: Ctx) => (i === 0 ? t.trailer : `${t.shot} ${i}`);

/* Slot 0 is the cover/trailer. Slots 1–3 are the real screenshots, or zoomed crops of the cover. */
const shotImg = (g: Game, i: number) => (i > 0 ? g.shots?.[i - 1] ?? null : null);
const slots = (g: Game) => (g.shots?.length ? 1 + Math.min(g.shots.length, 3) : 4);

export function media(g: Game, shot: number, ctx: Ctx): string {
  const img = shotImg(g, shot);
  return cover(g, ctx.lang, { shot: img ? 0 : shot, img, tag: `${esc(ctx.t.placeholder)} · ${esc(shotLabel(shot, ctx))} · 16:9` });
}

export function thumbs(g: Game, shot: number, ctx: Ctx): string {
  return Array.from({ length: slots(g) }, (_, i) => i).map((i) => `<button type="button" class="thumb" data-shot="${i}" data-key="shot-${i}" aria-pressed="${i === shot}" aria-label="${esc(shotLabel(i, ctx))}">
      ${cover(g, ctx.lang, { shot: shotImg(g, i) ? 0 : i, img: shotImg(g, i) })}<span class="thumb-label" aria-hidden="true">${esc(shotLabel(i, ctx))}</span>
    </button>`).join('');
}
