import { test, expect } from '@playwright/test';

test.describe('Products & Pricing — Sprint 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  test('products overview has hero and four module cards', async ({ page }) => {
    await page.goto('/products/');
    await expect(page.getByRole('heading', { level: 1, name: /Модули платформы/ })).toBeVisible();
    await expect(page.locator('.module-card')).toHaveCount(4);
  });

  test('products page shows feature matrix', async ({ page }) => {
    await page.goto('/products/');
    const matrix = page.locator('.feature-matrix tbody tr');
    await expect(matrix).toHaveCount(10);
  });

  test('product detail page loads from overview link', async ({ page }) => {
    await page.goto('/products/');
    await page.locator('.module-card').first().getByRole('link', { name: 'Подробнее' }).click();
    await expect(page).toHaveURL(/\/products\/reg-point\//);
    await expect(page.getByRole('heading', { level: 1, name: 'Рег.Поинт' })).toBeVisible();
  });

  test('reg-point upsell links to promo-pro', async ({ page }) => {
    await page.goto('/products/reg-point/');
    await page.locator('.product-upsell-row__link', { hasText: 'Промо.Про' }).click();
    await expect(page).toHaveURL(/\/products\/promo-pro\//);
  });

  test('product page shows three related articles', async ({ page }) => {
    await page.goto('/products/promo-pro/');
    await expect(page.locator('.article-card')).toHaveCount(3);
  });

  test('ticket-point notify form shows success on submit', async ({ page }) => {
    await page.goto('/products/ticket-point/');
    await page.locator('.notify-form__input').fill('test@example.com');
    await page.locator('.notify-form').evaluate((form) => form.requestSubmit());
    await expect(page.locator('.notify-form__success')).toBeVisible();
  });

  test('pricing page has title and license table', async ({ page }) => {
    await page.goto('/pricing/');
    await expect(page.getByRole('heading', { level: 1, name: /Цены и лицензии/ })).toBeVisible();
    await expect(page.getByText('100 000 ₽').first()).toBeVisible();
    await expect(page.getByText('Рег.Поинт').first()).toBeVisible();
  });

  test('pricing FAQ accordion opens answer', async ({ page }) => {
    await page.goto('/pricing/');
    const trigger = page.locator('.accordion__trigger').first();
    await trigger.click();
    await expect(page.locator('.accordion__item.is-open .accordion__panel').first()).toBeVisible();
    await expect(page.locator('.accordion__item.is-open .accordion__panel').first()).toContainText('коробочная лицензия');
  });

  test('pricing page has demo CTA to contacts', async ({ page }) => {
    await page.goto('/pricing/');
    await expect(page.locator('a[href="/contacts/#demo"]').first()).toBeVisible();
  });

  test('pricing sticky bar appears after scroll', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/pricing/');
    const bar = page.locator('.pricing-sticky-bar');
    await expect(bar).not.toHaveClass(/is-visible/);
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(bar).toHaveClass(/is-visible/);
  });

  test('products and pricing have no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const url of ['/products/', '/pricing/']) {
      await page.goto(url);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(overflow).toBe(false);
    }
  });
});
