import { test, expect } from '@playwright/test';

async function mockJivo(page) {
  await page.addInitScript(() => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('jivo-pd-consent', '1');
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
    await expect(page.locator('main h1')).toContainText('одной системе');
    await expect(page.getByText('152-ФЗ · QR-регистрация · Промо · Антифрод')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Посмотреть демо' }).first()).toBeVisible();
  });

  test('trust block has three items with Figma icons', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    const items = page.locator('.trust-grid__item');
    await expect(items).toHaveCount(3);
    await expect(page.locator('.trust-grid__icon img')).toHaveCount(3);
    await expect(page.locator('.trust-grid__icon img').first()).toHaveAttribute('src', /trust-shield\.svg/);
  });

  test('mode cards section shows three usage scenarios', async ({ page }) => {
    await expect(page.locator('.home-mode-card')).toHaveCount(3);
    await expect(page.getByRole('heading', { name: 'Регистрация', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Антифрод и чеки' })).toBeVisible();
  });

  test('152-FZ and solution sections render', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /152-ФЗ не «добавлен сверху»/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Один контур. Три сценария.' })).toBeVisible();
    await expect(page.locator('.home-scenario-card')).toHaveCount(3);
  });

  test('mini FAQ shows four questions', async ({ page }) => {
    await expect(page.locator('.faq-grid__item')).toHaveCount(4);
    await expect(page.getByText('Это SaaS?')).toBeVisible();
  });

  test('articles teaser shows three cards', async ({ page }) => {
    await expect(page.locator('.article-card')).toHaveCount(3);
    await expect(page.getByRole('link', { name: /Промо-акция с чеком/ })).toBeVisible();
  });

  test('header demo button opens Jivo chat', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.getByRole('button', { name: 'Запросить КП / Демо' }).first().click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
  });

  test('hero image visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.locator('.hero__media img')).toBeVisible();
    await expect(page.locator('.hero__media-stat')).toHaveCount(3);
  });

  test('problem and QR sections render', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Где обычно начинается хаос' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Регистрация там, где удобно участнику' })).toBeVisible();
    await expect(page.locator('.home-qr-flow__step')).toHaveCount(4);
  });
});
