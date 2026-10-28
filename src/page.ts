/* The page body as one string, shared by the browser (main.ts) and the build-time prerender
   (prerender.ts), so what search engines read is the same markup visitors get. */
import type { Game } from './games';
import { footer } from './components/footer';
import { heroFrame } from './components/hero';
import { library, type Filter } from './components/library';
import type { Ctx } from './components/shared';
import { topBar } from './components/topbar';

export function page(c: Ctx, theme: 'dark' | 'light', filter: Filter, featured?: Game[]): string {
  return `<a class="skip" href="#games">${c.t.skip}</a>
      <h1 class="sr-only">${c.t.h1}</h1>
      ${topBar(c, theme)}
      <main id="main">${heroFrame(c, featured)}${library(c, filter)}</main>
      ${footer(c)}`;
}
