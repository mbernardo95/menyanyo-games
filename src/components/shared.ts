import type { Game, Lang } from '../games';
import type { Copy } from '../i18n';
import { esc } from '../util';
import { icon } from './icons';

export interface Ctx { t: Copy; lang: Lang }

export const LIVE_DOT = '#5CFF8A';
export const DEV_DOT = '#FFC24D';

export function chips(g: Game, { t, lang }: Ctx) {
  const live = g.status === 'live';
  return [
    { k: t.kPlayers, v: g.players[lang], dot: null as string | null },
    { k: t.kPlatform, v: g.platform[lang], dot: null },
    { k: t.kStatus, v: live ? t.live : t.dev, dot: live ? LIVE_DOT : DEV_DOT }
  ];
}

/** Stat chips with a visible key (hero, overlay). */
export function statChips(g: Game, ctx: Ctx, cls: string): string {
  return chips(g, ctx).map((c) => `<span class="${cls}">${c.dot ? `<span class="dot" aria-hidden="true" style="--dot:${c.dot}"></span>` : ''}<span class="chip-k">${esc(c.k)}</span><span class="chip-v">${esc(c.v)}</span></span>`).join('');
}

export const actionAria = (g: Game, t: Copy) => (g.action === 'download' ? t.downloadAria(g.title) : t.playAria(g.title));
export const actionIcon = (g: Game, w: number) => (g.action === 'download' ? icon.download(w) : icon.play(w));
export const credit = (g: Game, lang: Ctx['lang']) => (g.credit ? `<p class="credit">${esc(g.credit[lang])}</p>` : '');

export const actionLabel = (g: Game, t: Copy) => (g.action === 'play' ? t.play : g.action === 'download' ? t.download : t.soon);
export const canPlay = (g: Game) => g.action !== 'soon' && !!g.url;
