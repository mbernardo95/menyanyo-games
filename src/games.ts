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
    url: 'https://zombies-vs-humans.com/', urlLabel: 'zombies-vs-humans.com',
    featured: true,
    tags: ['strategy', 'multiplayer', 'web'],
    colors: { a: '#7CFF4F', b: '#FF3B3B', ink: '#2E7D17' },
    cover: 'games/zvh/cover.webp', coverTall: 'games/zvh/cover-tall.webp', trailer: 'games/zvh/trailer.mp4',
    shots: ['games/zvh/shot-1.webp', 'games/zvh/shot-2.webp', 'games/zvh/shot-3.webp'],
    genre: { es: 'Estrategia por turnos', en: 'Turn-based strategy' },
    hook: { es: 'Horda zombi o resistencia humana: elige bando y conquista el mundo.', en: 'Zombie horde or human resistance: pick a side and conquer the world.' },
    desc: {
      es: 'Levanta ciudades, forma tu ejército y conquista las del rival.',
      en: 'Build cities, raise an army and take your rivals\' cities.'
    },
    players: { es: 'Online con amigos', en: 'Online with friends' },
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
    hook: { es: '¿A qué jugáis esta noche? Cada uno con su móvil, todos al corrillo.', en: 'Game night, sorted. Everyone just grabs their phone.' },
    desc: {
      es: 'Desenmascara al lobo, pilla al impostor o ficha a tu equipo: siete juegos de faroles, piques y risas. Crea una sala, pasa el código y a jugar, sin registrarte.',
      en: 'Unmask the werewolf, catch the impostor or draft your dream team: seven games of bluffing, banter and laughs. Open a room, share the code and you\'re in, no sign-up needed.'
    },
    players: { es: '2+', en: '2+' },
    platform: { es: 'Web · móviles', en: 'Web · phones' },
    alt: { es: 'Tres móviles sobre una mesa de fiesta con palomitas, pizza y luces, mostrando la carta secreta de "Hombre lobo", la votación con avatares y el sello "¡Vendido!" de Team Builder, con un brillo magenta y naranja.', en: 'Three phones lying on a late-night party table with popcorn, pizza and fairy lights, showing the secret "Hombre lobo" role card, the avatar vote grid and Team Builder\'s "¡Vendido!" stamp, lit in magenta and orange.' }
  },
  {
    id: 'supermanager', title: 'SuperManager', status: 'live', action: 'play',
    url: 'https://supermanager-dda56a05caff.herokuapp.com/', urlLabel: 'supermanager.herokuapp.com',
    featured: false,
    tags: ['strategy', 'multiplayer', 'web', 'mobile'],
    colors: { a: '#FFD23F', b: '#2FBF71', ink: '#7D6000' },
    cover: 'games/supermanager/cover.webp', coverTall: 'games/supermanager/cover-tall.webp', trailer: null,
    shots: ['games/supermanager/shot-1.webp', 'games/supermanager/shot-2.webp', 'games/supermanager/shot-3.webp'],
    genre: { es: 'Liga fantasy', en: 'Fantasy league' },
    hook: { es: 'Puja contra tus amigos en directo y llévate la liga.', en: 'Outbid your friends live and take the league.' },
    desc: {
      es: 'Monta una liga de lo que quieras: fútbol, F1 o tu serie favorita. Pelea cada carta en subastas en directo y suma puntos con lo que pasa de verdad.',
      en: 'Start a league about anything: football, F1 or your favourite show. Fight for every card in live auctions and score from what really happens.'
    },
    players: { es: 'Con amigos · online', en: 'With friends · online' },
    platform: { es: 'Web · móviles', en: 'Web · phones' },
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
    genre: { es: 'Criaturas coleccionables', en: 'Creature collecting' },
    hook: { es: 'Hazte con las criaturas más raras y forma un equipo imbatible.', en: 'Hunt down the rarest creatures and build an unbeatable team.' },
    desc: {
      es: 'Explora cada zona en busca de nuevos geomites. Combina clases, elementos y rarezas, y lánzate a combates intensos y feroces.',
      en: 'Explore each zone in search of new geomites. Mix classes, elements and rarities, and throw yourself into fierce, intense battles.'
    },
    players: { es: 'En solitario u online', en: 'Solo or online' },
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
    genre: { es: 'Persecución asimétrica', en: 'Asymmetric chase' },
    hook: { es: 'Uno caza, los demás huyen. Que no te vea.', en: 'One hunts, the rest run. Stay out of sight.' },
    desc: {
      es: 'El cazador solo ve lo que tiene delante: usa los muros para salir de su vista. Por turnos, cada paso cuenta, y cada personaje tiene sus propias habilidades.',
      en: 'The hunter only sees what\'s in front of it: use the walls to slip out of sight. It\'s turn-based, so every move counts, and every character has abilities of its own.'
    },
    players: { es: '1 contra todos · online', en: '1 vs all · online' },
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
