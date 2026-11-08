import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const ids = ['tavqi', 'ai-receptionist', 'noleggio-auto', 'fps-staff-manager'];
test('vetrina e schede dei quattro progetti originali, senza simulazioni sostitutive', async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const route of [
    '/',
    ...ids.flatMap((id) => [`/projects/${id}/`, `/projects/${id}/demo/`]),
    '/privacy/',
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('body')).not.toContainText('Garden shop');
    await expect(page.locator('[data-testid="restaurant-demo"]')).toHaveCount(
      0,
    );
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((i) => (i as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
    }
    for (const link of await page
      .locator('a[href]')
      .evaluateAll((es) =>
        es.map((e) => e.getAttribute('href')!).filter((h) => h.startsWith('/')),
      )) {
      expect(
        (await request.get(link.split('#')[0] || '/')).status(),
        link,
      ).toBe(200);
    }
  }
  expect(errors).toEqual([]);
});
test('categorie, menu mobile e navigazione da tastiera', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: 'Intelligenza artificiale', exact: true })
    .click();
  await expect(page.locator('.project-row')).toHaveCount(1);
  await expect(page.locator('.project-row')).toContainText('AI Receptionist');
  await page.getByRole('button', { name: 'Gestionali', exact: true }).click();
  await expect(page.locator('.project-row')).toHaveCount(3);
  await page.getByRole('button', { name: 'Tutti', exact: true }).click();
  await expect(page.locator('.project-row')).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Apri menu' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  const keyboardPage = await page.context().newPage();
  await keyboardPage.goto('/');
  await keyboardPage.keyboard.press('Tab');
  await expect(
    keyboardPage.getByRole('link', { name: 'Vai al contenuto' }),
  ).toBeFocused();
  await keyboardPage.close();
});
test('recapiti autorizzati e collegamenti alle applicazioni originali', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: 'Parliamone su WhatsApp' }),
  ).toHaveAttribute('href', 'https://wa.me/393517324068');
  await expect(
    page.getByRole('link', { name: 'Instagram', exact: true }),
  ).toHaveAttribute('href', 'https://www.instagram.com/arenafrancescovito02/');
  for (const id of ids) {
    await page.goto(`/projects/${id}/demo/`);
    await expect(
      page.getByRole('heading', { name: 'Apri il progetto originale' }),
    ).toBeVisible();
    const link = page.locator('.native-launch a.button');
    if (await link.count()) {
      const url = new URL((await link.getAttribute('href'))!);
      expect(['http:', 'https:']).toContain(url.protocol);
      expect(url.username).toBe('');
      expect(url.password).toBe('');
    } else
      await expect(page.locator('.native-launch')).toContainText(
        'temporaneamente non disponibile',
      );
  }
});
test('mobile senza overflow sulle pagine dei progetti', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', ...ids.map((id) => `/projects/${id}/demo/`)]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
  }
});
test('accessibilità automatica della vetrina e delle schede demo', async ({
  page,
}) => {
  const failures: unknown[] = [];
  for (const route of ['/', ...ids.map((id) => `/projects/${id}/demo/`)]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    if (result.violations.length)
      failures.push({
        route,
        violations: result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
  }
  expect(failures).toEqual([]);
});
