import { test, expect } from '@playwright/test';

test.describe('Home — Sprint 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
    await page.goto('/');
  });

  test('hero, label and primary CTA render', async ({ page }) => {
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('main h1')).toContainText('вашем');
    await expect(page.getByText('Self-hosted · Docker · 152-ФЗ')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Запросить КП / Демо' }).first()).toBeVisible();
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

  test('contact modal opens and shows demo option', async ({ page }) => {
    await page.getByRole('button', { name: 'Связаться' }).first().click();
    await expect(page.locator('#contact-modal')).toBeVisible();
    await expect(page.locator('#contact-modal')).toContainText('Онлайн-чат');
    await expect(page.locator('#contact-modal')).toContainText('Запросить КП / Демо');
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
