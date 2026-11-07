throw new Error(
  'Pacchetto grafico precedente superato: rigenerare dai progetti ORIGINALI solo dopo verifica dei contenuti e dei diritti. Nessuna vecchia simulazione viene riutilizzata automaticamente.',
);
import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const pack = JSON.parse(
  await readFile('marketing-assets/content.json', 'utf8'),
);
for (const dir of [
  'instagram',
  'facebook',
  'linkedin',
  'stories',
  'reels',
  'launch',
  'projects',
])
  await mkdir(`marketing-assets/${dir}`, { recursive: true });
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
const assets = {};
for (const id of [
  'ristorazione',
  'assistente-appuntamenti',
  'catalogo-auto',
  'garden-shop',
])
  assets[id] =
    `data:image/png;base64,${(await readFile(`public/assets/${id}.png`)).toString('base64')}`;
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
const manifest = [];
async function render(record, { folder, width, height, id = record.id }) {
  const project = record.projectPath?.split('/')[2] || 'ristorazione';
  const wide = width > height;
  const tall = height > 1600;
  const html = `<!doctype html><html lang="it"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:${width}px;height:${height}px;background:#080c18;color:#f4f6ff;font-family:'Avenir Next','Segoe UI',sans-serif;padding:${wide ? '56px 65px' : tall ? '150px 76px 180px' : '74px 68px'};display:flex;flex-direction:column;overflow:hidden}header{font-size:${wide ? '24' : '30'}px;letter-spacing:.18em;display:flex;align-items:center;gap:16px}header b{font-weight:750}header i{color:#8ba4ff;font-size:1.4em;font-style:normal}main{flex:1;display:${wide ? 'grid' : 'flex'};grid-template-columns:1fr 1fr;flex-direction:column;gap:${wide ? '38' : '40'}px;align-items:${wide ? 'center' : 'stretch'};justify-content:center;min-height:0;padding-top:${wide ? '25' : '40'}px}.copy{flex-shrink:0}h1{font-size:${wide ? '50' : tall ? '95' : '78'}px;letter-spacing:-.045em;line-height:1.08;margin:0 0 27px;font-weight:670;overflow-wrap:break-word}p{font-size:${wide ? '24' : tall ? '35' : '28'}px;line-height:1.45;color:#becce7;margin:0}.screen{border:1px solid #5d73a1;border-radius:18px;overflow:hidden;background:#11182a;box-shadow:0 25px 80px #0004;height:${wide ? '320' : tall ? '700' : '440'}px;flex-shrink:0;position:relative}.screen img{width:100%;height:100%;object-fit:cover;object-position:top}footer{display:flex;justify-content:space-between;align-items:end;gap:25px;font-size:${wide ? '18' : '24'}px;border-top:1px solid #334669;padding-top:24px;margin-top:30px}.cta{font-size:${wide ? '20' : '29'}px;color:#c7d5ff}.note{font-size:${wide ? '14' : '20'}px;color:#abb9d3;max-width:${wide ? '360' : '470'}px;text-align:right;line-height:1.4}</style><body><header><b>ARENA</b><i>/</i>DIGITAL</header><main><div class="copy"><h1>${escape(record.graphicTitle)}</h1><p>${escape(record.graphicSubtitle)}</p></div><div class="screen"><img alt="Screenshot autentico della simulazione" src="${assets[project] || assets.ristorazione}"></div></main><footer><div class="cta">Esplora la demo interattiva</div><div class="note">Dati inventati.<br>Nessun invio o pagamento reale.</div></footer></body></html>`;
  await page.setViewportSize({ width, height });
  await page.setContent(html, { waitUntil: 'load' });
  const clipped = await page
    .locator('h1,p,header,footer,.screen')
    .evaluateAll((es) =>
      es.some((e) => {
        const r = e.getBoundingClientRect();
        return (
          r.left < 0 ||
          r.top < 0 ||
          r.right > innerWidth ||
          r.bottom > innerHeight
        );
      }),
    );
  if (clipped) throw new Error(`Contenuto fuori tela: ${id}`);
  const file = `marketing-assets/${folder}/${id.toLowerCase()}.png`;
  await page.screenshot({ path: file, animations: 'disabled' });
  const bytes = await readFile(file);
  manifest.push({
    id,
    file,
    width,
    height,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    sourceScreenshot: `public/assets/${project}.png`,
    status: 'bozza_locale_senza_url_pubblico',
  });
  return file;
}
try {
  for (const record of pack.contents) {
    if (record.id.startsWith('IGFB')) {
      const file = await render(record, {
        folder: 'instagram',
        width: 1080,
        height: 1350,
      });
      const fb = `marketing-assets/facebook/${record.id.toLowerCase()}.png`;
      await copyFile(file, fb);
      manifest.push({ ...manifest.at(-1), file: fb, id: `${record.id}-FB` });
    } else if (record.id.startsWith('ST-'))
      await render(record, { folder: 'stories', width: 1080, height: 1920 });
    else if (record.id.startsWith('LI-'))
      await render(record, { folder: 'linkedin', width: 1200, height: 627 });
    else if (record.id.startsWith('PR-'))
      await render(record, { folder: 'projects', width: 1080, height: 1350 });
    else if (record.id.startsWith('RE-'))
      await render(record, { folder: 'reels', width: 1080, height: 1920 });
  }
  const launch = {
    id: 'lancio-portfolio',
    graphicTitle: 'Il software si capisce provandolo.',
    graphicSubtitle: 'Quattro percorsi. Un portfolio da esplorare.',
    projectPath: '/projects/ristorazione/demo/',
  };
  await render(launch, { folder: 'launch', width: 1080, height: 1350 });
  await render(
    { ...launch, id: 'lancio-story' },
    { folder: 'launch', width: 1080, height: 1920 },
  );
  const cover = `<!doctype html><html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;width:1584px;height:396px;background:#080c18;color:#f4f6ff;font-family:'Avenir Next',sans-serif;display:flex;justify-content:space-between;align-items:center;padding:70px 100px}h1{font-size:48px;letter-spacing:.15em}span{color:#8ba4ff}p{font-size:30px;line-height:1.5;color:#b9c7e5;border-left:1px solid #536b9e;padding-left:60px}</style><h1>ARENA <span>/</span> DIGITAL</h1><p>Software su misura.<br>AI e automazioni.<br>Demo da esplorare.</p></html>`;
  await page.setViewportSize({ width: 1584, height: 396 });
  await page.setContent(cover);
  const coverFile = 'marketing-assets/linkedin/copertina-profilo.png';
  await page.screenshot({ path: coverFile });
  manifest.push({
    id: 'linkedin-cover',
    file: coverFile,
    width: 1584,
    height: 396,
    status: 'bozza_locale',
  });
  await writeFile(
    'marketing-assets/manifest.json',
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        method:
          'HTML/CSS e screenshot Chromium; immagini dalle demo locali verificate',
        publicUrl: null,
        readyToPublish: false,
        assets: manifest,
      },
      null,
      2,
    ),
  );
  const items = manifest
    .map(
      (a) =>
        `<article><img loading="lazy" src="${escape(path.relative('marketing-assets', a.file))}" alt="${escape(a.id)}"><p>${escape(a.id)} · ${a.width} × ${a.height}</p></article>`,
    )
    .join('');
  await writeFile(
    'marketing-assets/index.html',
    `<!doctype html><html lang="it"><meta charset="utf-8"><title>Arena Digital — bozze creative</title><style>body{background:#080c18;color:#f4f6ff;font-family:system-ui;padding:35px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:25px}img{width:100%;max-height:480px;object-fit:contain}article{background:#11182a;padding:16px;border-radius:12px}p{color:#b6c4dd}</style><h1>Materiali di lancio — bozze locali</h1><p>Screenshot delle simulazioni con dati inventati. Prima della diffusione: approvazione, URL verificato e recapiti.</p><main>${items}</main></html>`,
  );
  console.log(
    `${manifest.length} PNG generati e verificati nelle dimensioni richieste.`,
  );
} finally {
  await browser.close();
}
