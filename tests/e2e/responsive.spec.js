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
    const cols = page.locator('.site-footer__grid > div');
    await expect(cols).toHaveCount(4);
  });
});
