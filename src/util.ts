/** Escapes text for HTML content and attribute values. */
export function esc(s: string | number | null | undefined): string {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/** Per-game CSS variables that the .g-scope rules turn into the accent family. */
export function gameVars(c: { a: string; b: string; ink: string }): string {
  return `--ga:${c.a};--gb:${c.b};--gink:${c.ink}`;
}

let n = 0;
export const uid = () => `u${++n}`;
