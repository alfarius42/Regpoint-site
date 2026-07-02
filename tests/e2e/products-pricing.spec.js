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

  test('ticket-point notify CTA opens Jivo', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('jivo-pd-consent', '1');
      window.__jivoOpenCount = 0;
      window.jivo_api = { open: () => { window.__jivoOpenCount += 1; } };
    });
    await page.goto('/products/ticket-point/');
    await page.getByRole('button', { name: 'Уведомить в чате' }).click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
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

  test('pricing page has demo CTA that opens Jivo', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('jivo-pd-consent', '1');
      window.__jivoOpenCount = 0;
      window.jivo_api = { open: () => { window.__jivoOpenCount += 1; } };
    });
    await page.goto('/pricing/');
    await page.locator('[data-action="jivo"]').first().click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
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

  test('products overview matches reference layout hooks', async ({ page }) => {
    await page.goto('/products/');
    await expect(page.locator('.page-hero--products')).toBeVisible();
    await expect(page.locator('.products-module-grid .module-card')).toHaveCount(4);
    await expect(page.locator('.products-cta__btn')).toBeVisible();
  });

  test('product detail page matches reference layout hooks', async ({ page }) => {
    await page.goto('/products/reg-point/');
    await expect(page.locator('.page-hero--product-detail')).toBeVisible();
    await expect(page.locator('.product-detail__title')).toHaveText('Рег.Поинт');
    await expect(page.locator('.product-sidebar .btn--outline')).toBeVisible();
    await expect(page.locator('.article-card--product-ref')).toHaveCount(3);
    await expect(page.locator('.article-card--product-ref .article-card__read')).toHaveCount(0);
  });

  test('products grid is 1/2/4 columns by breakpoint', async ({ page }) => {
    await page.goto('/products/');
    const grid = page.locator('.products-module-grid');

    await page.setViewportSize({ width: 375, height: 812 });
    const cols375 = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols375.split(' ').length).toBe(1);

    await page.setViewportSize({ width: 768, height: 900 });
    const cols768 = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols768.split(' ').length).toBe(2);

    await page.setViewportSize({ width: 1280, height: 900 });
    const cols1280 = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols1280.split(' ').length).toBe(4);
  });

  test('pricing page matches reference layout hooks', async ({ page }) => {
    await page.goto('/pricing/');
    await expect(page.locator('.page-hero--pricing')).toBeVisible();
    await expect(page.locator('.pricing-table--license')).toBeVisible();
    await expect(page.locator('.pricing-block-cta__btn')).toBeVisible();
    await expect(page.locator('.pricing-block-head')).toHaveCount(6);
  });

  test('pricing dev grid is 1/2/3 columns by breakpoint', async ({ page }) => {
    await page.goto('/pricing/');
    const grid = page.locator('.pricing-dev-grid');

    await page.setViewportSize({ width: 375, height: 812 });
    const cols375 = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols375.split(' ').length).toBe(1);

    await page.setViewportSize({ width: 768, height: 900 });
    const cols768 = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols768.split(' ').length).toBe(2);

    await page.setViewportSize({ width: 1280, height: 900 });
    const cols1280 = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    expect(cols1280.split(' ').length).toBe(3);
  });
});
