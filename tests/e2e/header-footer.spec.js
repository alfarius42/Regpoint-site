import { test, expect } from '@playwright/test';

test.describe('Header & Footer — Sprint 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
    await page.goto('/');
  });

  test('desktop nav shows all primary links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const nav = page.locator('.site-header__nav');
    await expect(nav.getByRole('link', { name: 'Цены' })).toBeVisible();
    await expect(nav.getByRole('link', { name: '152-ФЗ' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Как работает' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Сценарии' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Статьи' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Контакты' })).toBeVisible();
  });

  test('products dropdown opens on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.locator('#nav-products').hover();
    const menu = page.locator('#nav-products-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Промо.Про' })).toBeVisible();
  });

  test('lang switcher shows RU and EN', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const lang = page.locator('.site-header__actions .site-header__lang');
    await expect(lang.getByRole('link', { name: 'RU' })).toBeVisible();
    await expect(lang.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/');
  });

  test('desktop header uses centered nav layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const nav = page.locator('.site-header__nav');
    await expect(nav).toBeVisible();
    await expect(page.locator('.site-header__logo-text')).toHaveText('Рег.Поинт');
    await expect(page.locator('.btn--header-demo')).toHaveText('Запросить КП / Демо');
  });

  test('mobile drawer opens and contains nav links', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('#btn-menu').click();
    const drawer = page.locator('#site-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Сценарии' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Статьи' })).toBeVisible();
  });

  test('footer CTA band and four columns', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Готовы обсудить ваш сценарий?' })).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 900 });
    const cols = page.locator('.site-footer__grid > .site-footer__col');
    await expect(cols).toHaveCount(4);
    await expect(page.locator('.site-footer__links')).toHaveCount(3);
    await expect(page.getByText('© 2026 Рег.Поинт')).toBeVisible();
  });

  test('footer CTA buttons match reference labels', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const cta = page.locator('.site-footer__cta');
    await expect(cta.getByRole('link', { name: 'Запросить КП / Демо', exact: true })).toBeVisible();
    await expect(cta.getByRole('button', { name: 'Связаться' })).toBeVisible();
  });

  test('footer product links point to product pages', async ({ page }) => {
    await expect(page.locator('.site-footer a[href="/products/promo-pro/"]')).toBeVisible();
    await expect(page.locator('.site-footer a[href="/privacy/"]')).toBeVisible();
  });
});
