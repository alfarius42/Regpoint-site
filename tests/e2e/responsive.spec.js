import { test, expect } from '@playwright/test';

/** Canonical QA viewports — docs/BREAKPOINTS.md */
const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
];

const SPRINT3_PAGES = [
  { path: '/technology/', h1: 'Технологии и архитектура' },
  { path: '/compliance-152fz/', h1: '152-ФЗ' },
  { path: '/how-it-works/', h1: 'Как это работает' },
  { path: '/scenarios/', h1: 'Сценарии использования' },
  { path: '/faq/', h1: 'Частые вопросы' },
  { path: '/contacts/', h1: 'Контакты' },
  { path: '/privacy/', h1: 'Политика конфиденциальности' },
  { path: '/articles/', h1: 'Статьи' },
  { path: '/articles/152fz-checklist/', h1: '152-ФЗ на мероприятии' },
];

test.describe('Responsive layout — mandatory gate', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow on home @ ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });
      expect(overflow, 'horizontal scroll detected').toBe(false);

      await expect(page.locator('main h1')).toBeVisible();
    });
  }

  test('mobile shows burger, desktop shows inline nav', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('#btn-menu')).toBeVisible();
    await expect(page.locator('.site-header__nav')).toBeHidden();

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await expect(page.locator('#btn-menu')).toBeHidden();
    await expect(page.locator('.site-header__nav')).toBeVisible();
  });

  test('footer stacks on mobile, grid on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const footer = page.locator('.site-footer__grid');
    await expect(footer).toBeVisible();
    const mobileBox = await footer.boundingBox();
    expect(mobileBox).toBeTruthy();

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const cols = page.locator('.site-footer__grid > .site-footer__col');
    await expect(cols).toHaveCount(4);
  });

  test('tablet uses 2-column product grid, desktop uses 4', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(4);

    const first = cards.first();
    const third = cards.nth(2);
    const box1 = await first.boundingBox();
    const box3 = await third.boundingBox();
    expect(box1).toBeTruthy();
    expect(box3).toBeTruthy();
    expect(box3.y).toBeGreaterThan(box1.y);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const box1Desktop = await page.locator('.product-card').first().boundingBox();
    const box4Desktop = await page.locator('.product-card').nth(3).boundingBox();
    expect(box1Desktop).toBeTruthy();
    expect(box4Desktop).toBeTruthy();
    expect(Math.abs(box4Desktop.y - box1Desktop.y)).toBeLessThan(8);
  });

  test('hero media hidden below desktop, trust bar 3-col from tablet', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.locator('.hero__media')).toBeHidden();

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('.hero__media')).toBeHidden();

    const trustItems = page.locator('.trust-grid__item');
    const t0 = await trustItems.nth(0).boundingBox();
    const t1 = await trustItems.nth(1).boundingBox();
    expect(t0).toBeTruthy();
    expect(t1).toBeTruthy();
    expect(Math.abs(t1.y - t0.y)).toBeLessThan(8);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await expect(page.locator('.hero__media')).toBeVisible();
  });

  for (const pg of SPRINT3_PAGES) {
    for (const vp of VIEWPORTS) {
      test(`no horizontal overflow on ${pg.path} @ ${vp.name} (${vp.width}px)`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(pg.path);

        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
        });
        expect(overflow, `horizontal scroll on ${pg.path}`).toBe(false);
        await expect(page.locator('main h1')).toContainText(pg.h1);
      });
    }
  }

  test('scenarios card layout tiers: stack → 2-col+compliance → 3-col', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/scenarios/');
    const cols = page.locator('.scenario-card').first().locator('.scenario-card__col');
    const c0 = await cols.nth(0).boundingBox();
    const c1 = await cols.nth(1).boundingBox();
    expect(c0).toBeTruthy();
    expect(c1).toBeTruthy();
    expect(c1.y).toBeGreaterThan(c0.y);

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/scenarios/');
    const t0 = await cols.nth(0).boundingBox();
    const t1 = await cols.nth(1).boundingBox();
    const t2 = await cols.nth(2).boundingBox();
    expect(t0).toBeTruthy();
    expect(t1).toBeTruthy();
    expect(t2).toBeTruthy();
    expect(Math.abs(t1.y - t0.y)).toBeLessThan(8);
    expect(t2.y).toBeGreaterThan(t0.y);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/scenarios/');
    const d0 = await cols.nth(0).boundingBox();
    const d1 = await cols.nth(1).boundingBox();
    const d2 = await cols.nth(2).boundingBox();
    expect(d0).toBeTruthy();
    expect(d1).toBeTruthy();
    expect(d2).toBeTruthy();
    expect(Math.abs(d1.y - d0.y)).toBeLessThan(8);
    expect(Math.abs(d2.y - d0.y)).toBeLessThan(8);
  });

  test('contacts layout: stack below desktop, sidebar beside jivo block at 1280', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/contacts/');
    const jivo = page.locator('.contacts-jivo-wrap');
    const sidebar = page.locator('.contacts-sidebar');
    const fBox = await jivo.boundingBox();
    const sBox = await sidebar.boundingBox();
    expect(fBox).toBeTruthy();
    expect(sBox).toBeTruthy();
    expect(sBox.y).toBeGreaterThan(fBox.y);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/contacts/');
    const fDesk = await jivo.boundingBox();
    const sDesk = await sidebar.boundingBox();
    expect(fDesk).toBeTruthy();
    expect(sDesk).toBeTruthy();
    expect(Math.abs(sDesk.y - fDesk.y)).toBeLessThan(8);
  });

  test('tech cards grid: 1 col mobile, 2 tablet, 4 desktop', async ({ page }) => {
    const cards = () => page.locator('.tech-card');

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/technology/');
    let b0 = await cards().nth(0).boundingBox();
    let b1 = await cards().nth(1).boundingBox();
    expect(b1.y).toBeGreaterThan(b0.y);

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/technology/');
    b0 = await cards().nth(0).boundingBox();
    b1 = await cards().nth(1).boundingBox();
    const b2 = await cards().nth(2).boundingBox();
    expect(Math.abs(b1.y - b0.y)).toBeLessThan(8);
    expect(b2.y).toBeGreaterThan(b0.y);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/technology/');
    b0 = await cards().nth(0).boundingBox();
    const b3 = await cards().nth(3).boundingBox();
    expect(Math.abs(b3.y - b0.y)).toBeLessThan(8);
  });
});
