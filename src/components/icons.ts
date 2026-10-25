/* Inline icons from the design. All decorative (aria-hidden). */
const s = (w: number, body: string, extra = 'stroke-linejoin="round"') =>
  `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ${extra} aria-hidden="true">${body}</svg>`;

export const icon = {
  logo: `<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" class="logo-mark"><rect x="1" y="1" width="28" height="28" rx="7" fill="none" stroke="var(--studio)" stroke-width="2"></rect><path d="M8 21V9h3v3h2v3h4v-3h2V9h3v12h-3v-6h-2v3h-4v-3h-2v6z" fill="var(--studio)"></path></svg>`,
  sun: s(20, '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>', ''),
  moon: s(20, '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>'),
  play: (w: number) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"></path></svg>`,
  prev: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg>`,
  next: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"></path></svg>`,
  arrowRight: s(16, '<path d="M5 12h14M13 6l6 6-6 6"></path>'),
  arrowLeft: s(18, '<path d="M19 12H5M12 19l-7-7 7-7"></path>'),
  close: s(20, '<path d="M18 6L6 18M6 6l12 12"></path>', ''),
  linkedin: s(18, '<rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"></path>'),
  code: s(18, '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"></path>'),
  mail: s(18, '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path>')
};
