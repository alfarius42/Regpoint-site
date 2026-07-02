import { test, expect } from '@playwright/test';

async function mockJivo(page) {
  await page.addInitScript(() => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.__jivoOpenCount = 0;
    window.jivo_api = {
      open: () => {
        window.__jivoOpenCount += 1;
      },
    };
  });
}

test.describe('Home — Sprint 1', () => {
  test.beforeEach(async ({ page }) => {
    await mockJivo(page);
    await page.goto('/');
  });

  test('hero, label and primary CTA render', async ({ page }) => {
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toContainText('вашем');
    await expect(page.getByText('Self-hosted · Docker · 152-ФЗ')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Запросить КП / Демо' }).first()).toBeVisible();
  });

  test('trust block has three items with Figma icons', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    const items = page.locator('.trust-grid__item');
    await expect(items).toHaveCount(3);
    await expect(page.locator('.trust-grid__icon img')).toHaveCount(3);
    await expect(page.locator('.trust-grid__icon img').first()).toHaveAttribute('src', /trust-server\.svg/);
  });

  test('product cards section shows four modules', async ({ page }) => {
    await expect(page.locator('.product-card')).toHaveCount(4);
    await expect(page.getByRole('heading', { name: 'Рег.Поинт', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Тикет.Поинт' })).toBeVisible();
  });

  test('152-FZ teaser and steps sections render', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /152-ФЗ — в каждом модуле/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Три шага до первого мероприятия' })).toBeVisible();
    await expect(page.locator('.step-item')).toHaveCount(3);
  });

  test('mini FAQ shows four questions', async ({ page }) => {
    await expect(page.locator('.faq-grid__item')).toHaveCount(4);
    await expect(page.getByText('Это SaaS?')).toBeVisible();
  });

  test('articles teaser shows three cards', async ({ page }) => {
    await expect(page.locator('.article-card')).toHaveCount(3);
    await expect(page.getByRole('link', { name: /Self-hosted vs SaaS/ })).toBeVisible();
  });

  test('header demo button opens Jivo chat', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.getByRole('button', { name: 'Запросить КП / Демо' }).first().click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
  });

  test('chat fab opens Jivo chat', async ({ page }) => {
    await page.locator('#chat-fab').click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
  });

  test('hero image visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.locator('.hero__media img')).toBeVisible();
    await expect(page.locator('.hero__media-stat')).toHaveCount(3);
  });

  test('audience section has six cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Кому подходит Рег.Поинт' })).toBeVisible();
    await expect(page.locator('.audience-card')).toHaveCount(6);
  });
});
