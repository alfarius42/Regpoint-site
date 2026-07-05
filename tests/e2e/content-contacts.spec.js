import { test, expect } from '@playwright/test';

test.describe('Content pages & contacts — Sprint 3', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.setItem('jivo-pd-consent', '1');
      window.__jivoOpenCount = 0;
      window.__jivoLastOpenParams = null;
      window.jivo_api = {
        open: (params) => {
          window.__jivoOpenCount += 1;
          window.__jivoLastOpenParams = params || null;
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
    const table = page.locator('.pricing-table--compliance');
    await expect(table.getByRole('cell', { name: 'Локализация' })).toBeVisible();
    await expect(table.getByRole('cell', { name: /База участников и промо-данные хранятся на инфраструктуре заказчика/i })).toBeVisible();
  });

  test('C-03 compliance shows controlled export and deletion procedures', async ({ page }) => {
    await page.goto('/compliance-152fz/');
    await expect(page.getByRole('cell', { name: 'Удаление и retention' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Экспорт под контролем' })).toBeVisible();
  });

  test('C-04 compliance explains Google Forms risk and fines', async ({ page }) => {
    await page.goto('/compliance-152fz/');
    await expect(page.getByRole('heading', { name: 'Почему Google Forms опасны для ивентов и промо' })).toBeVisible();
    await expect(page.getByText('до 6 000 000 ₽')).toBeVisible();
    await expect(page.getByText('до 18 000 000 ₽')).toBeVisible();
  });

  test('H-01 how-it-works steps and tabs', async ({ page }) => {
    await page.goto('/how-it-works/');
    await expect(page.locator('main h1')).toHaveText('Как это работает');
    await expect(page.locator('.how-it-works-panel[data-filter-item="promo"] .step-card__num').first()).toHaveText('01');
    await page.locator('.filter-chip[data-filter-value="events"]').click();
    await expect(page.locator('.how-it-works-panel[data-filter-item="events"]')).toBeVisible();
    await expect(page.locator('.how-it-works-panel[data-filter-item="promo"]')).toBeHidden();
  });

  test('H-02 comparison table', async ({ page }) => {
    await page.goto('/how-it-works/');
    await expect(page.getByRole('heading', { name: 'Self-hosted vs SaaS — в чём разница' })).toBeVisible();
  });

  test('H-03 link to technology', async ({ page }) => {
    await page.goto('/how-it-works/');
    await expect(page.getByRole('link', { name: 'Технологии подробнее' })).toBeVisible();
  });

  test('S-01 scenarios list', async ({ page }) => {
    await page.goto('/scenarios/');
    await expect(page.locator('main h1')).toHaveText('Сценарии использования');
    await expect(page.locator('.scenario-card')).toHaveCount(7);
  });

  test('S-02 scenarios filter', async ({ page }) => {
    await page.goto('/scenarios/');
    await page.getByRole('button', { name: 'Промо.Про' }).click();
    const visible = page.locator('.scenario-card:visible');
    await expect(visible).toHaveCount(2);
  });

  test('S-03 scenario module link', async ({ page }) => {
    await page.goto('/scenarios/');
    await page
      .locator('.scenario-card')
      .filter({ hasText: 'Регистрация на мероприятие без очередей' })
      .locator('.scenario-card__module')
      .click();
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

  test('F-03 ten faq items', async ({ page }) => {
    await page.goto('/faq/');
    await expect(page.locator('.accordion__item')).toHaveCount(10);
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
    await expect(page.evaluate(() => window.__jivoLastOpenParams)).resolves.toEqual({ start: 'chat' });
  });

  test('CT-03 contacts page shows Telegram link', async ({ page }) => {
    await page.goto('/contacts/');
    const tg = page.locator('.contacts-sidebar__telegram');
    await expect(tg).toBeVisible();
    await expect(tg).toHaveAttribute('href', 'https://t.me/ZaharMishiev');
    await expect(tg).toContainText('@ZaharMishiev');
  });

  test('CT-03b contacts routes PD requests to Jivo chat', async ({ page }) => {
    await page.goto('/contacts/');
    await expect(page.getByText('запросы на уточнение, блокирование и удаление персональных данных')).toBeVisible();
    await expect(page.getByText('Запросы субъектов персональных данных принимаются через онлайн-чат Jivo')).toBeVisible();
  });

  test('CT-04 header demo CTA opens Jivo', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/contacts/');
    await page.locator('.btn--header-demo').click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
    await expect(page.evaluate(() => window.__jivoLastOpenParams)).resolves.toEqual({ start: 'chat' });
  });

  test('CT-04c queued Jivo open runs after widget load callback', async ({ page }) => {
    await page.addInitScript(() => {
      delete window.jivo_api;
      window.__jivoOpenCount = 0;
      window.__jivoLastOpenParams = null;
    });
    await page.goto('/contacts/');
    await page.locator('.contacts-jivo__btn').click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(0);
    await page.evaluate(() => {
      window.jivo_api = {
        open: (params) => {
          window.__jivoOpenCount += 1;
          window.__jivoLastOpenParams = params || null;
        },
      };
      if (typeof window.jivo_onLoadCallback === 'function') {
        window.jivo_onLoadCallback();
      }
    });
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
    await expect(page.evaluate(() => window.__jivoLastOpenParams)).resolves.toEqual({ start: 'chat' });
  });

  test('CT-04b contacts shows consent modal without prior PD consent', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem('jivo-pd-consent');
      localStorage.removeItem('jivo-marketing-consent');
    });
    await page.goto('/contacts/');
    await page.locator('.contacts-jivo__btn').click();
    await expect(page.locator('#jivo-consent-modal')).toBeVisible();
    await expect(page.locator('#jivo-consent-marketing')).not.toBeChecked();
    await expect(page.locator('#jivo-consent-modal a[href="/privacy/marketing-consent/"]')).toBeVisible();
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
