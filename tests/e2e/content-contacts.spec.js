import { test, expect } from '@playwright/test';

test.describe('Content pages & contacts — Sprint 3', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      window.__jivoOpenCount = 0;
      window.jivo_api = {
        open: () => {
          window.__jivoOpenCount += 1;
        },
      };
    });
  });

  test('T-01 technology page hero and cards', async ({ page }) => {
    await page.goto('/technology/');
    await expect(page.locator('main h1')).toHaveText('Технологии и архитектура');
    await expect(page.locator('.tech-card')).toHaveCount(4);
  });

  test('T-02 technology VPS block', async ({ page }) => {
    await page.goto('/technology/');
    await expect(page.getByText('Ubuntu 22.04')).toBeVisible();
  });

  test('T-03 technology demo CTA opens Jivo', async ({ page }) => {
    await page.goto('/technology/');
    await page.locator('[data-action="jivo"]').first().click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
  });

  test('C-01 compliance page hero', async ({ page }) => {
    await page.goto('/compliance-152fz/');
    await expect(page.locator('main h1')).toContainText('152-ФЗ');
  });

  test('C-02 compliance table row', async ({ page }) => {
    await page.goto('/compliance-152fz/');
    await expect(page.getByRole('cell', { name: 'Шифрование' })).toBeVisible();
    await expect(page.getByText('AES-256-GCM')).toBeVisible();
  });

  test('H-01 how-it-works steps', async ({ page }) => {
    await page.goto('/how-it-works/');
    await expect(page.locator('main h1')).toHaveText('Как это работает');
    await expect(page.locator('.step-card__num').first()).toHaveText('01');
  });

  test('H-02 comparison table', async ({ page }) => {
    await page.goto('/how-it-works/');
    await expect(page.getByText('Self-hosted vs SaaS')).toBeVisible();
  });

  test('H-03 link to technology', async ({ page }) => {
    await page.goto('/how-it-works/');
    await expect(page.getByRole('link', { name: 'Технологии подробнее' })).toBeVisible();
  });

  test('S-01 scenarios list', async ({ page }) => {
    await page.goto('/scenarios/');
    await expect(page.locator('main h1')).toHaveText('Сценарии использования');
    await expect(page.locator('.scenario-card')).toHaveCount(5);
  });

  test('S-02 scenarios filter', async ({ page }) => {
    await page.goto('/scenarios/');
    await page.getByRole('button', { name: 'Промо.Про' }).click();
    const visible = page.locator('.scenario-card:not([hidden])');
    await expect(visible).toHaveCount(1);
  });

  test('S-03 scenario module link', async ({ page }) => {
    await page.goto('/scenarios/');
    await page.locator('.scenario-card__module').first().click();
    await expect(page).toHaveURL(/\/products\/reg-point\//);
    await expect(page.locator('main h1')).toContainText('Рег.Поинт');
  });

  test('F-01 faq page', async ({ page }) => {
    await page.goto('/faq/');
    await expect(page.locator('main h1')).toHaveText('Частые вопросы');
  });

  test('F-02 faq accordion', async ({ page }) => {
    await page.goto('/faq/');
    const trigger = page.locator('.accordion__trigger').first();
    await trigger.click();
    await expect(page.locator('.accordion__item.is-open .accordion__panel').first()).toBeVisible();
  });

  test('F-03 eight faq items', async ({ page }) => {
    await page.goto('/faq/');
    await expect(page.locator('.accordion__item')).toHaveCount(8);
  });

  test('CT-01 contacts page', async ({ page }) => {
    await page.goto('/contacts/');
    await expect(page.locator('main h1')).toHaveText('Контакты');
    await expect(page.locator('#demo')).toBeVisible();
    await expect(page.locator('.contacts-jivo-wrap')).toBeVisible();
  });

  test('CT-02 contacts chat CTA opens Jivo', async ({ page }) => {
    await page.goto('/contacts/');
    await page.locator('.contacts-jivo__btn').click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
  });

  test('CT-03 contacts page shows Telegram link', async ({ page }) => {
    await page.goto('/contacts/');
    const tg = page.locator('.contacts-sidebar__telegram');
    await expect(tg).toBeVisible();
    await expect(tg).toHaveAttribute('href', 'https://t.me/ZaharMishiev');
    await expect(tg).toContainText('@ZaharMishiev');
  });

  test('CT-04 contact header link opens Jivo', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/contacts/');
    await page.locator('.site-header__contact-link').click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
  });

  test('CT-05 hash demo anchor', async ({ page }) => {
    await page.goto('/contacts/#demo');
    await expect(page.locator('#demo')).toBeVisible();
  });

  test('NAV-01 header 152-FZ link', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    await page.locator('.site-header__nav').getByRole('link', { name: '152-ФЗ' }).click();
    await expect(page).toHaveURL(/\/compliance-152fz\//);
    await expect(page.locator('main h1')).toContainText('152-ФЗ');
  });

  test('no horizontal overflow on scenarios @ 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/scenarios/');
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });
    expect(overflow).toBe(false);
  });

  test('no horizontal overflow on contacts @ 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/contacts/');
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });
    expect(overflow).toBe(false);
  });
});
