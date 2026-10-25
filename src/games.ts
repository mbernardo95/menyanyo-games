/* The one list the page is built from: the hero (featured + live), the library, the filters
   and the detail overlay all read from here. Add a game = add one entry.
   Art lives in public/games/<id>/: `cover` 16:9, `coverTall` 9:16 for the mobile hero,
   `trailer` a muted mp4, `shots` up to 3 gallery images. Without a cover the page shows
   the placeholder art in components/cover.ts. */

export type Lang = 'es' | 'en';
export type Tag = 'party' | 'strategy' | 'multiplayer' | 'mobile' | 'web';
type Copy = Record<Lang, string>;

export interface Game {
  id: string;
  title: string;
  status: 'live' | 'dev';
  action: 'play' | 'download' | 'soon';
  url: string | null;
  urlLabel: string | null;
  featured: boolean;
  tags: Tag[];
  /** a = main accent (dark theme), b = secondary, ink = AA-safe accent for the light theme */
  colors: { a: string; b: string; ink: string };
  cover: string | null;
  coverTall?: string | null;
  trailer: string | null;
  /** Optional gallery screenshots (16:9) for the overlay; without them the gallery shows crops of the cover. */
  shots?: string[];
  /** Optional credit line, e.g. a collaboration. */
  credit?: Copy;
  genre: Copy;
  hook: Copy;
  desc: Copy;
  players: Copy;
  platform: Copy;
  alt: Copy;
}

export const GAMES: Game[] = [
  {
    id: 'zvh', title: 'Zombies vs Humans', status: 'live', action: 'play',
    url: 'https://zombies-vs-humans-3da9c6e58c4e.herokuapp.com/', urlLabel: 'zombies-vs-humans.herokuapp.com',
    featured: true,
    tags: ['strategy', 'multiplayer', 'web'],
    colors: { a: '#7CFF4F', b: '#FF3B3B', ink: '#2E7D17' },
    cover: 'games/zvh/cover.webp', coverTall: 'games/zvh/cover-tall.webp', trailer: 'games/zvh/trailer.mp4',
    shots: ['games/zvh/shot-1.webp', 'games/zvh/shot-2.webp', 'games/zvh/shot-3.webp'],
    genre: { es: 'Estrategia', en: 'Strategy' },
    hook: { es: 'Estrategia por rondas en un mapa del mundo: zombis contra humanos.', en: 'Round-based strategy on a world map: zombies against humans.' },
    desc: {
      es: 'Dos equipos se mueven por un mapa en cuadrícula. En cada ronda, las órdenes de todos se resuelven a la vez. Se juega contra otras personas o contra bots.',
      en: 'Two teams move across a grid map. Each round, everyone\'s orders resolve at the same time. Play against other people or against bots.'
    },
    players: { es: 'Online · bots', en: 'Online · bots' },
    platform: { es: 'Web', en: 'Web' },
    alt: { es: 'Vista aérea nocturna de una ciudad fortificada circular, con sus campos y su torre central iluminados por antorchas, mientras dos tanques y una horda de zombis de ojos rojos irrumpen por una brecha en llamas en la muralla.', en: 'Night aerial view of a circular walled city, its fields and central tower lit by torches, as two tanks and a horde of red-eyed zombies pour through a burning breach in the wall.' }
  },
  {
    id: 'corrillo', title: 'Corrillo', status: 'live', action: 'play',
    url: 'https://el-corrillo.com', urlLabel: 'el-corrillo.com',
    featured: true,
    tags: ['party', 'multiplayer', 'web', 'mobile'],
    colors: { a: '#FF3DA8', b: '#FF7A2E', ink: '#C2186F' },
    cover: 'games/corrillo/cover.webp', coverTall: 'games/corrillo/cover-tall.webp', trailer: null,
    shots: ['games/corrillo/shot-1.webp', 'games/corrillo/shot-2.webp', 'games/corrillo/shot-3.webp'],
    genre: { es: 'Juegos de fiesta', en: 'Party games' },
    hook: { es: 'Juegos de fiesta para jugar en grupo, cada uno con su móvil.', en: 'Party games for a group, each player on their own phone.' },
    desc: {
      es: 'Siete juegos en una web: El Lobo, Impostor, Team Builder, Termómetro, La Ruleta, Verdad o Mentira y El Canciller Secreto. Una persona crea la sala y las demás entran con el código.',
      en: 'Seven games on one website: El Lobo, Impostor, Team Builder, Termómetro, La Ruleta, Verdad o Mentira and El Canciller Secreto. One person creates a room and the others join with its code.'
    },
    players: { es: '3+ · misma sala', en: '3+ · same room' },
    platform: { es: 'Web · móviles', en: 'Web · phones' },
    alt: { es: 'Tres móviles sobre una mesa de fiesta con palomitas, pizza y luces, mostrando la carta secreta de "Hombre lobo", la votación con avatares y el sello "¡Vendido!" de Team Builder, con un brillo magenta y naranja.', en: 'Three phones lying on a late-night party table with popcorn, pizza and fairy lights, showing the secret "Hombre lobo" role card, the avatar vote grid and Team Builder\'s "¡Vendido!" stamp, lit in magenta and orange.' }
  },
  {
    id: 'supermanager', title: 'SuperManager', status: 'live', action: 'play',
    url: 'https://supermanager-dda56a05caff.herokuapp.com/', urlLabel: 'supermanager.herokuapp.com',
    featured: false,
    tags: ['strategy', 'multiplayer', 'web'],
    colors: { a: '#FFD23F', b: '#2FBF71', ink: '#7D6000' },
    cover: 'games/supermanager/cover.webp', coverTall: 'games/supermanager/cover-tall.webp', trailer: null,
    shots: ['games/supermanager/shot-1.webp', 'games/supermanager/shot-2.webp', 'games/supermanager/shot-3.webp'],
    genre: { es: 'Liga fantasy', en: 'Fantasy league' },
    hook: { es: 'Liga fantasy con subastas en directo.', en: 'A fantasy league with live auctions.' },
    desc: {
      es: 'Crea una liga con tus amigos, puja por jugadores y suma puntos con lo que hacen en cada partido real.',
      en: 'Create a league with your friends, bid for players and score points from what they do in each real match.'
    },
    players: { es: 'Ligas con amigos', en: 'Leagues with friends' },
    platform: { es: 'Web', en: 'Web' },
    alt: { es: 'Tres cartas de jugador en abanico sobre un campo de fútbol oscuro, con el temporizador de una subasta, la mejor puja y el ranking de la liga.', en: 'Three player cards fanned over a dark football pitch, with an auction timer, the best bid and the league ranking.' }
  },
  {
    id: 'geomites', title: 'Geomites', status: 'dev', action: 'download',
    url: 'https://drive.google.com/drive/folders/1S_ZxmBMHzhkguJIKkzc6TWYiTQ2LvSkk?usp=drive_link', urlLabel: 'APK · Android',
    featured: false,
    tags: ['strategy', 'mobile', 'multiplayer'],
    colors: { a: '#FFB547', b: '#2EE6C5', ink: '#9A5800' },
    cover: 'games/geomites/cover.webp', coverTall: 'games/geomites/cover-tall.webp', trailer: 'games/geomites/trailer.mp4',
    shots: ['games/geomites/shot-1.webp', 'games/geomites/shot-2.webp', 'games/geomites/shot-3.webp'],
    credit: { es: 'En colaboración con BISPEEL', en: 'In collaboration with BISPEEL' },
    genre: { es: 'Coleccionables', en: 'Creature collecting' },
    hook: { es: 'Colecciona criaturas y combate con ellas.', en: 'Collect creatures and battle with them.' },
    desc: {
      es: 'Juego para Android e iOS. Cada geomite tiene clase, elemento y rareza. Explora zonas y forma tu equipo para los combates automáticos.',
      en: 'A game for Android and iOS. Each geomite has a class, an element and a rarity. Explore zones and build your team for the automatic battles.'
    },
    players: { es: '1 jugador + online', en: 'Single player + online' },
    platform: { es: 'Android · iOS', en: 'Android · iOS' },
    alt: { es: 'Tres cartas de geomites en abanico sobre una cueva oscura: delante un dragón negro con marco dorado, detrás un kraken y una criatura de materia oscura, con la mascota Fluffy a la izquierda.', en: 'Three geomite cards fanned over a dark cave: a black dragon in a gold frame in front, a kraken and a dark-matter creature behind, with the mascot Fluffy on the left.' }
  },
  {
    id: 'pillapilla', title: 'Pilla-Pilla', status: 'dev', action: 'soon',
    url: null, urlLabel: null,
    featured: false,
    tags: ['multiplayer', 'strategy', 'web'],
    colors: { a: '#3D9BFF', b: '#A66BFF', ink: '#1F5FD1' },
    cover: 'games/pillapilla/cover.webp', coverTall: 'games/pillapilla/cover-tall.webp', trailer: null,
    shots: ['games/pillapilla/shot-1.webp'],
    genre: { es: 'Multijugador asimétrico', en: 'Asymmetric multiplayer' },
    hook: { es: 'Uno persigue y los demás huyen.', en: 'One player chases, the others run.' },
    desc: {
      es: 'Multijugador por turnos en un mapa con muros. El cazador solo ve lo que tiene delante. Cada personaje tiene sus propias habilidades.',
      en: 'Turn-based multiplayer on a map with walls. The catcher only sees what is in front of it. Each character has its own abilities.'
    },
    players: { es: '1 contra varios · online', en: '1 vs many · online' },
    platform: { es: 'Web · escritorio', en: 'Web · desktop' },
    alt: { es: 'Un demonio con una antorcha recorre un laberinto de piedra de noche y su luz alcanza a una guerrera, mientras otros dos personajes se esconden entre los muros.', en: 'A demon with a torch walks a stone maze at night and its light reaches a warrior, while two other characters hide among the walls.' }
  }
];

/** Footer links. A null e-mail hides the mail link. */
export const STUDIO = {
  github: 'https://github.com/mbernardo95',
  linkedin: 'https://www.linkedin.com/in/marc-bernardo-838757174/',
  email: null as string | null
};
