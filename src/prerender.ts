/* Build-time only (loaded by the prerender plugin in vite.config.ts, never shipped):
   the Spanish page as static HTML, plus JSON-LD, so crawlers see the games without running JS. */
import { GAMES, STUDIO } from './games';
import { T } from './i18n';
import { page } from './page';

const SITE = 'https://menyanyo-games.es/';

export function appHtml(): string {
  const featured = GAMES.filter((g) => g.featured && g.status === 'live');
  const list = featured.length ? featured : GAMES.slice(0, 1);
  return page({ t: T.es, lang: 'es' }, 'dark', 'all', list);
}

export function jsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${SITE}#org`, name: 'Menyanyo Games', url: SITE,
        logo: `${SITE}favicon.svg`, sameAs: [STUDIO.github, STUDIO.linkedin]
      },
      { '@type': 'WebSite', '@id': `${SITE}#site`, name: 'Menyanyo Games', url: SITE, inLanguage: 'es', publisher: { '@id': `${SITE}#org` } },
      {
        '@type': 'ItemList', name: 'Juegos de Menyanyo Games',
        itemListElement: GAMES.map((g, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'VideoGame', name: g.title, description: g.desc.es, genre: g.genre.es,
            gamePlatform: g.platform.es, ...(g.cover ? { image: SITE + g.cover } : {}),
            ...(g.url ? { url: g.url } : {}), publisher: { '@id': `${SITE}#org` },
            offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' }
          }
        }))
      }
    ]
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
