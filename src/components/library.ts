import { GAMES, type Game, type Tag } from '../games';
import { cover } from './cover';
import { icon } from './icons';
import { actionLabel, canPlay, chips, type Ctx } from './shared';
import { esc, gameVars } from '../util';

export type Filter = 'all' | Tag;
export const FILTERS: Filter[] = ['all', 'party', 'strategy', 'multiplayer', 'mobile', 'web'];

export function library(ctx: Ctx, filter: Filter): string {
  const { t } = ctx;
  const live = GAMES.filter((g) => g.status === 'live').length;
  return `<section id="games" class="wrap sec" aria-labelledby="lib-title">
    <div class="sec-head">
      <h2 id="lib-title" class="h2">${esc(t.libTitle)}</h2>
      <p class="count">${esc(t.count(GAMES.length, live))}</p>
    </div>
    <div class="filters scroll" role="group" aria-label="${esc(t.filterAria)}">${filterChips(ctx, filter)}</div>
    <div class="grid">${grid(ctx, filter)}</div>
  </section>`;
}

export function filterChips({ t }: Ctx, filter: Filter): string {
  return FILTERS.map((f) => {
    const n = f === 'all' ? GAMES.length : GAMES.filter((g) => g.tags.includes(f)).length;
    return `<button type="button" class="filter" data-filter="${f}" data-key="filter-${f}" aria-pressed="${filter === f}">${esc(t.filters[f])}<span class="filter-n">${n}</span></button>`;
  }).join('');
}

export function grid(ctx: Ctx, filter: Filter): string {
  const list = GAMES.filter((g) => filter === 'all' || g.tags.includes(filter));
  return list.length ? list.map((g) => card(g, ctx)).join('') : `<p class="empty">${esc(ctx.t.empty)}</p>`;
}

export function card(g: Game, ctx: Ctx): string {
  const { t, lang } = ctx;
  const soon = g.action === 'soon';
  const brackets = ['tl', 'tr', 'bl', 'br'].map((c) => `<span class="brk ${c}" aria-hidden="true"></span>`).join('');
  const chipHtml = chips(g, ctx).map((c) => `<span class="chip">${c.dot ? `<span class="dot" aria-hidden="true" style="--dot:${c.dot}"></span>` : ''}<span class="sr-only">${esc(c.k)}:</span>${esc(c.v)}</span>`).join('');
  const action = canPlay(g)
    ? `<a class="btn btn-press" href="${esc(g.url!)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(t.playAria(g.title))}">${icon.play(16)}${esc(actionLabel(g, t))}</a>`
    : `<button type="button" class="btn-soon" disabled>${esc(t.soon)}</button>`;
  return `<article class="card g-scope" data-game="${g.id}" style="${gameVars(g.colors)}">
    ${brackets}
    <button type="button" class="card-cover" data-open="${g.id}" data-key="cover-${g.id}" aria-label="${esc(t.detailsAria(g.title))}">
      ${cover(g, lang, { tag: `${esc(t.placeholder)} · 16:9` })}
      ${soon ? `<span class="soon-badge" aria-hidden="true">${esc(t.soon)}</span>` : ''}
    </button>
    <div class="card-body">
      <span class="genre">${esc(g.genre[lang])}</span>
      <h3 class="card-title">${esc(g.title)}</h3>
      <p class="card-hook">${esc(g.hook[lang])}</p>
      <div class="chip-row">${chipHtml}</div>
      <div class="card-actions">${action}<button type="button" class="btn-ghost ghost" data-open="${g.id}" data-key="details-${g.id}" aria-label="${esc(t.detailsAria(g.title))}">${esc(t.details)}${icon.arrowRight}</button></div>
    </div>
  </article>`;
}
