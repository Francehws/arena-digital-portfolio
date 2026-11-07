import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:4175';
await mkdir('public/assets', { recursive: true });
await mkdir('output/playwright', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1536, height: 1024 },
    deviceScaleFactor: 1,
  });
  await page.goto(origin, { waitUntil: 'networkidle' });
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((i) => i.decode());
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: 'output/playwright/home-native.png',
    animations: 'disabled',
  });
  await page.screenshot({
    path: 'output/playwright/home-desktop.png',
    fullPage: true,
    animations: 'disabled',
  });
  await page.locator('#contatti').screenshot({
    path: 'output/playwright/contatti.png',
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: 'public/assets/og.png',
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: 'output/playwright/home-mobile-viewport.png',
    animations: 'disabled',
  });
  await page.screenshot({
    path: 'output/playwright/home-mobile.png',
    fullPage: true,
    animations: 'disabled',
  });
  console.log(
    'Screenshot della vetrina aggiornata con i progetti originali, contatti e Open Graph salvati.',
  );
} finally {
  await browser.close();
}
