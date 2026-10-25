import { STUDIO } from '../games';
import { icon } from './icons';
import type { Ctx } from './shared';
import { esc } from '../util';

export function footer({ t }: Ctx): string {
  const mail = STUDIO.email
    ? `<a class="foot-link ghost" href="mailto:${esc(STUDIO.email)}">${icon.mail}${esc(STUDIO.email)}</a>`
    : '';
  return `<footer class="foot">
    <div class="wrap foot-inner">
      <span class="wordmark wordmark-lg">MENYANYO <span class="studio">GAMES</span></span>
      <div class="foot-links"><a class="foot-link ghost" href="${esc(STUDIO.github)}" target="_blank" rel="noopener noreferrer">${icon.code}GitHub</a>${mail}</div>
      <div class="foot-row"><span class="foot-copy">© 2026 Menyanyo Games</span><a class="nav-link foot-top" href="#top">↑ ${esc(t.top)}</a></div>
    </div>
  </footer>`;
}
