import { createServer, defineConfig, type Plugin } from 'vite';

/* Writes the Spanish page and its JSON-LD into index.html at build time, so search engines
   and link previews get the content without running JavaScript. main.ts re-renders on load. */
function prerender(): Plugin {
  return {
    name: 'prerender',
    apply: 'build',
    async transformIndexHtml(html) {
      const server = await createServer({ configFile: false, appType: 'custom', server: { middlewareMode: true }, logLevel: 'silent' });
      try {
        const { appHtml, jsonLd } = await server.ssrLoadModule('/src/prerender.ts');
        return html
          .replace('<div id="app"></div>', `<div id="app">${appHtml()}</div>`)
          .replace('</head>', `  <script type="application/ld+json">${jsonLd()}</script>\n</head>`);
      } finally {
        await server.close();
      }
    }
  };
}

// Relative base: the build works at a domain root and under a sub-path (GitHub Pages).
export default defineConfig({ base: './', plugins: [prerender()] });
