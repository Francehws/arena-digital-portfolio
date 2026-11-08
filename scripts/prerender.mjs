import { createServer, loadEnv } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const server = await createServer({
  mode: 'production',
  server: { middlewareMode: true },
  appType: 'custom',
});
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const { projects } = await server.ssrLoadModule('/src/projects.ts');
  const { isPublicHttpsUrl } = await server.ssrLoadModule(
    '/src/publication.ts',
  );
  const base = server.config.base;
  if (env.PUBLISH_BUILD === '1') {
    if (!env.SITE_URL || !isPublicHttpsUrl(env.SITE_URL))
      throw new Error('Pubblicazione bloccata: SITE_URL non configurato.');
    for (const project of projects) {
      if (project.demoUrl && !isPublicHttpsUrl(project.demoUrl))
        throw new Error(
          `Pubblicazione bloccata: ${project.name} punta a un ambiente locale o di prova.`,
        );
    }
  }
  let site = null;
  if (env.SITE_URL) {
    site = new URL(env.SITE_URL);
    if (
      site.protocol !== 'https:' ||
      site.username ||
      site.password ||
      site.search ||
      site.hash
    )
      throw new Error(
        'SITE_URL richiede un URL HTTPS reale senza credenziali, query o hash.',
      );
    if (!site.pathname.endsWith('/')) site.pathname += '/';
    if (site.pathname !== base)
      throw new Error('Il percorso SITE_URL deve corrispondere a BASE_PATH.');
  }
  const template = await readFile('dist/index.html', 'utf8');
  const routes = [
    {
      path: '/',
      title: 'Arena Digital | Software, AI e automazioni',
      description:
        'Progetti software su misura, assistenti AI e automazioni. Le schede descrivono i progetti; le demo interattive sono temporaneamente sospese.',
    },
    ...projects.flatMap((p) => [
      {
        path: `/projects/${p.id}`,
        title: `${p.name} | Arena Digital`,
        description: p.summary,
      },
      {
        path: `/projects/${p.id}/demo`,
        title: p.demoUrl
          ? `Prova ${p.name} | Arena Digital`
          : `Stato demo: ${p.name} | Arena Digital`,
        description: p.demoUrl
          ? `Demo del progetto originale: ${p.summary} Ambiente isolato con dati fittizi.`
          : `${p.summary} Scheda informativa; la demo interattiva non è pubblicata.`,
      },
    ]),
    {
      path: '/privacy',
      title: 'Privacy della demo | Arena Digital',
      description:
        'Informazioni sul trattamento dei dati nelle simulazioni di Arena Digital.',
    },
    {
      path: '/404',
      title: 'Pagina non trovata | Arena Digital',
      description: 'Il percorso richiesto non è disponibile.',
    },
  ];
  const escape = (s) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c],
    );
  for (const route of routes) {
    const url = site
      ? new URL(
          route.path.replace(/^\//, '') + (route.path === '/' ? '' : '/'),
          site,
        ).href
      : '';
    const indexable =
      site && !route.path.endsWith('/demo') && route.path !== '/404';
    const tags = `<meta name="robots" content="${indexable ? 'index, follow' : 'noindex, follow'}"/><meta property="og:type" content="website"/><meta property="og:locale" content="it_IT"/><meta property="og:title" content="${escape(route.title)}"/><meta property="og:description" content="${escape(route.description)}"/>${url ? `<link rel="canonical" href="${escape(url)}"/><meta property="og:url" content="${escape(url)}"/><meta property="og:image" content="${escape(new URL('assets/og.png', site).href)}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/>` : ''}`;
    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`)
      .replace(
        /<meta name="description"[^>]*>/,
        `<meta name="description" content="${escape(route.description)}"/>`,
      )
      .replace('</head>', `${tags}</head>`)
      .replace(
        '<div id="root"></div>',
        () =>
          `<div id="root">${renderToString(createElement(App, { path: route.path }))}</div>`,
      );
    const out =
      route.path === '/404'
        ? 'dist/404.html'
        : path.join('dist', route.path, 'index.html');
    await mkdir(path.dirname(out), { recursive: true });
    await writeFile(out, html);
  }
  await writeFile('dist/.nojekyll', '');
  await writeFile(
    'dist/robots.txt',
    site
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', site).href}\n`
      : 'User-agent: *\nDisallow: /\n',
  );
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${
      site
        ? routes
            .filter((r) => r.path !== '/404' && !r.path.endsWith('/demo'))
            .map(
              (r) =>
                `<url><loc>${escape(new URL(r.path.replace(/^\//, '') + (r.path === '/' ? '' : '/'), site).href)}</loc></url>`,
            )
            .join('')
        : ''
    }</urlset>`,
  );
  console.log(
    `${routes.length} pagine HTML generate. ${site ? 'URL pubblico configurato.' : 'Anteprima locale: indicizzazione disattivata, nessun URL pubblico inventato.'}`,
  );
} finally {
  await server.close();
}
