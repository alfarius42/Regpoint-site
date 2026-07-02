import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
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
});
