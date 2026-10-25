import { icon } from './icons';
import type { Ctx } from './shared';
import { esc } from '../util';

export function topBar(ctx: Ctx, theme: 'dark' | 'light'): string {
  const { t, lang } = ctx;
  const langBtn = (l: 'es' | 'en') =>
    `<button type="button" class="seg-btn" data-lang="${l}" data-key="lang-${l}" lang="${l}" aria-pressed="${lang === l}">${l.toUpperCase()}</button>`;
  return `<header class="bar">
    <div class="wrap bar-inner">
      <a class="logo" href="#top" aria-label="${esc(t.homeAria)}">${icon.logo}<span class="wordmark">MENYANYO <span class="studio">GAMES</span></span></a>
      <div class="bar-tools">
        <div class="seg" role="group" aria-label="${esc(t.langAria)}">${langBtn('es')}${langBtn('en')}</div>
        <button type="button" class="icon-btn ghost" data-theme-toggle data-key="theme" aria-label="${esc(theme === 'dark' ? t.toLight : t.toDark)}">${theme === 'dark' ? icon.sun : icon.moon}</button>
      </div>
    </div>
  </header>`;
}
