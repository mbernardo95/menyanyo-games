/* UI copy. Spanish runs ~30% longer: layouts wrap, never truncate. */
import type { Lang, Tag } from './games';

const es = {
  h1: 'Menyanyo Games', skip: 'Saltar a los juegos', homeAria: 'Menyanyo Games, inicio',
  langAria: 'Idioma', toLight: 'Cambiar a tema claro', toDark: 'Cambiar a tema oscuro',
  featured: 'Destacado', play: 'Jugar', download: 'Descargar', soon: 'Próximamente', details: 'Ver más',
  prev: 'Juego anterior', next: 'Juego siguiente', goTo: 'Ir a', of: 'de',
  libTitle: 'Juegos',
  count: (n: number) => `${n} juegos`,
  filterAria: 'Filtrar juegos', empty: 'Ningún juego con este filtro.',
  filters: { all: 'Todos', party: 'Fiesta', strategy: 'Estrategia', multiplayer: 'Multijugador', mobile: 'Móvil', web: 'Web' } as Record<'all' | Tag, string>,
  kPlayers: 'Jugadores', kPlatform: 'Plataforma', kStatus: 'Estado', live: 'Disponible', dev: 'En desarrollo',
  top: 'Volver arriba',
  back: 'Volver', closeAria: 'Cerrar (Esc)', gallery: 'Galería', trailer: 'Tráiler', shot: 'Captura', placeholder: 'Provisional',
  detailsAria: (x: string) => `Ver más sobre ${x}`, playAria: (x: string) => `Jugar a ${x} (se abre en una pestaña nueva)`,
  downloadAria: (x: string) => `Descargar ${x} para Android (se abre en una pestaña nueva)`
};

export type Copy = typeof es;

const en: Copy = {
  h1: 'Menyanyo Games', skip: 'Skip to the games', homeAria: 'Menyanyo Games, home',
  langAria: 'Language', toLight: 'Switch to light theme', toDark: 'Switch to dark theme',
  featured: 'Featured', play: 'Play', download: 'Download', soon: 'Coming soon', details: 'See more',
  prev: 'Previous game', next: 'Next game', goTo: 'Go to', of: 'of',
  libTitle: 'Games',
  count: (n) => `${n} games`,
  filterAria: 'Filter games', empty: 'No games with this filter.',
  filters: { all: 'All', party: 'Party', strategy: 'Strategy', multiplayer: 'Multiplayer', mobile: 'Mobile', web: 'Web' },
  kPlayers: 'Players', kPlatform: 'Platform', kStatus: 'Status', live: 'Live', dev: 'In development',
  top: 'Back to top',
  back: 'Back', closeAria: 'Close (Esc)', gallery: 'Gallery', trailer: 'Trailer', shot: 'Shot', placeholder: 'Placeholder',
  detailsAria: (x) => `See more about ${x}`, playAria: (x) => `Play ${x} (opens in a new tab)`,
  downloadAria: (x) => `Download ${x} for Android (opens in a new tab)`
};

export const T: Record<Lang, Copy> = { es, en };
