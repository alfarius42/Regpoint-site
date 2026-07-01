import { test, expect } from '@playwright/test';

test.describe('Home — Sprint 0 skeleton', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
    await page.goto('/');
  });

  test('hero and primary CTA render', async ({ page }) => {
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toContainText('вашем');
    await expect(page.getByRole('link', { name: 'Запросить КП / Демо' }).first()).toBeVisible();
  });

  test('trust block has three columns on tablet+', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    const items = page.locator('.trust-grid__item');
    await expect(items).toHaveCount(3);
  });

  test('contact modal opens from CTA', async ({ page }) => {
    await page.getByRole('button', { name: 'Связаться' }).first().click();
    await expect(page.locator('#contact-modal')).toBeVisible();
    await expect(page.locator('#contact-modal')).toContainText('Онлайн-чат');
  });
});
