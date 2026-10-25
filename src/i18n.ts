/* UI copy. Spanish runs ~30% longer: layouts wrap, never truncate. */
import type { Lang, Tag } from './games';

const es = {
  h1: 'Menyanyo Games', docTitle: 'Menyanyo Games · Juegos gratis para jugar con amigos', skip: 'Saltar a los juegos', homeAria: 'Menyanyo Games, inicio',
  langAria: 'Idioma', toLight: 'Cambiar a tema claro', toDark: 'Cambiar a tema oscuro',
  featured: 'Destacado', play: 'Jugar', download: 'Descargar para Android', soon: 'Próximamente', details: 'Ver más',
  prev: 'Juego anterior', next: 'Juego siguiente', goTo: 'Ir a', of: 'de',
  libTitle: 'Juegos',
  count: (n: number) => `${n} juegos`,
  filterAria: 'Filtrar juegos', empty: 'Ningún juego con este filtro.',
  filters: { all: 'Todos', party: 'Fiesta', strategy: 'Estrategia', multiplayer: 'Multijugador', mobile: 'Móvil', web: 'Web' } as Record<'all' | Tag, string>,
  kPlayers: 'Jugadores', kPlatform: 'Plataforma', kStatus: 'Estado', kPrice: 'Precio', free: 'Gratis', live: 'Ya disponible', dev: 'En desarrollo',
  top: 'Volver arriba', coffee: 'Invítame a un café', coffeeAria: 'Invítame a un café (se abre en una pestaña nueva)',
  back: 'Volver', closeAria: 'Cerrar (Esc)', gallery: 'Galería', trailer: 'Tráiler', shot: 'Captura', placeholder: 'Provisional',
  detailsAria: (x: string) => `Ver más sobre ${x}`, playAria: (x: string) => `Jugar a ${x} (se abre en una pestaña nueva)`,
  downloadAria: (x: string) => `Descargar ${x} para Android (se abre en una pestaña nueva)`
};

export type Copy = typeof es;

const en: Copy = {
  h1: 'Menyanyo Games', docTitle: 'Menyanyo Games · Free games to play with friends', skip: 'Skip to the games', homeAria: 'Menyanyo Games, home',
  langAria: 'Language', toLight: 'Switch to light theme', toDark: 'Switch to dark theme',
  featured: 'Featured', play: 'Play', download: 'Download for Android', soon: 'Coming soon', details: 'More info',
  prev: 'Previous game', next: 'Next game', goTo: 'Go to', of: 'of',
  libTitle: 'Games',
  count: (n) => `${n} games`,
  filterAria: 'Filter games', empty: 'No games with this filter.',
  filters: { all: 'All', party: 'Party', strategy: 'Strategy', multiplayer: 'Multiplayer', mobile: 'Mobile', web: 'Web' },
  kPlayers: 'Players', kPlatform: 'Platform', kStatus: 'Status', kPrice: 'Price', free: 'Free', live: 'Out now', dev: 'In development',
  top: 'Back to top', coffee: 'Buy me a coffee', coffeeAria: 'Buy me a coffee (opens in a new tab)',
  back: 'Back', closeAria: 'Close (Esc)', gallery: 'Gallery', trailer: 'Trailer', shot: 'Shot', placeholder: 'Placeholder',
  detailsAria: (x) => `See more about ${x}`, playAria: (x) => `Play ${x} (opens in a new tab)`,
  downloadAria: (x) => `Download ${x} for Android (opens in a new tab)`
};

export const T: Record<Lang, Copy> = { es, en };
