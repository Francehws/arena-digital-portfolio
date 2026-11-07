import { spawnSync } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdir, cp, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
const root = path.resolve('output/basepath');
function build(base) {
  const r = spawnSync('npm', ['run', 'build'], {
    env: { ...process.env, BASE_PATH: base, SITE_URL: '' },
    encoding: 'utf8',
  });
  if (r.status !== 0) throw new Error(r.stdout + r.stderr);
}
let server;
let browser;
try {
  build('/preview-test/');
  await mkdir(root, { recursive: true });
  await cp('dist', path.join(root, 'preview-test'), { recursive: true });
  server = createServer(async (req, res) => {
    try {
      let p = path.resolve(
        root,
        '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
      );
      if (!p.startsWith(root + path.sep)) throw new Error('path');
      if ((await stat(p)).isDirectory()) p = path.join(p, 'index.html');
      const types = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
      };
      res.setHeader(
        'Content-Type',
        types[path.extname(p)] || 'application/octet-stream',
      );
      res.end(await readFile(p));
    } catch {
      res.statusCode = 404;
      res.end('404');
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()}: ${r.url()}`);
  });
  await page.goto(`${origin}/preview-test/`);
  await page
    .locator('.project-row')
    .filter({ hasText: 'Tavqi' })
    .getByRole('link', { name: 'Scopri il progetto', exact: true })
    .click();
  if (!page.url().includes('/preview-test/projects/tavqi/'))
    throw new Error('Routing base path errato');
  await page.getByRole('link', { name: 'Tutti i progetti' }).click();
  await page
    .getByRole('button', { name: 'Intelligenza artificiale', exact: true })
    .click();
  if ((await page.locator('.project-row').count()) !== 1)
    throw new Error('Filtro progetto originale non applicato');
  const html = await readFile(
    path.join(root, 'preview-test/projects/tavqi/index.html'),
    'utf8',
  );
  if (!html.includes('Tavqi') || !html.includes('noindex'))
    throw new Error('Prerender assente');
  if (errors.length) throw new Error(errors.join('\n'));
  await writeFile(
    'reports/basepath-test.json',
    JSON.stringify(
      {
        base: '/preview-test/',
        result: 'passed',
        checks: [
          'navigazione diretta',
          'link da home',
          'hydration',
          'filtro dei progetti originali',
          'asset senza404',
          'HTML contenuto indicizzabile',
          'noindex senza URL definitivo',
        ],
        publicUrlConfigured: false,
      },
      null,
      2,
    ),
  );
  console.log('Base path: verifiche superate.');
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  build('/');
  console.log('Build locale alla radice ripristinata.');
}
