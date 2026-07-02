import { test, expect } from '@playwright/test';

test.describe('Privacy & cookies — Sprint 4', () => {
  test('P-01 privacy page hero and sections', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('main h1')).toHaveText('Политика конфиденциальности');
    await expect(page.locator('.privacy-section')).toHaveCount(9);
  });

  test('P-02 privacy operator details', async ({ page }) => {
    await page.goto('/privacy/');
    const main = page.locator('main');
    await expect(main.getByText('644917769371')).toBeVisible();
    await expect(main.getByText('325508100578539')).toBeVisible();
    await expect(main.getByText('Мельникова Ксения Антоновна')).toBeVisible();
  });

  test('P-03 privacy has no GA4 mention', async ({ page }) => {
    await page.goto('/privacy/');
    const text = await page.locator('main').innerText();
    expect(text.toLowerCase()).not.toContain('google analytics');
  });

  test('P-03b privacy routes withdrawal to Jivo chat', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('.privacy-section').nth(7)).toContainText('необходимо обратиться в онлайн-чат Jivo');
    await expect(page.locator('main')).not.toContainText('форму на странице Контакты');
  });

  test('P-07 privacy marketing consent section', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.getByRole('heading', { name: '7. Маркетинговые рассылки' })).toBeVisible();
    await expect(page.getByText('статьёй 15 Федерального закона №152-ФЗ')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Согласие на обработку персональных данных в маркетинговых целях' })).toHaveAttribute('href', '/privacy/marketing-consent/');
  });

  test('P-08 marketing consent page content', async ({ page }) => {
    await page.goto('/privacy/marketing-consent/');
    await expect(page.locator('main h1')).toContainText('маркетинговых целях');
    await expect(page.locator('.privacy-section')).toHaveCount(7);
    await expect(page.locator('main').getByRole('link', { name: 'Политике конфиденциальности' })).toHaveAttribute('href', '/privacy/');
    await expect(page.locator('.site-footer__links a[aria-current="page"]')).toHaveText('Согласие на маркетинговые рассылки');
  });

  test('JC-01 jivo consent modal requires PD checkbox', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.removeItem('jivo-pd-consent');
      localStorage.removeItem('jivo-marketing-consent');
      window.__jivoOpenCount = 0;
      window.jivo_api = { open: () => { window.__jivoOpenCount += 1; } };
    });
    await page.goto('/');
    await page.getByRole('button', { name: 'Запросить КП / Демо' }).first().click();
    await expect(page.locator('#jivo-consent-modal')).toBeVisible();
    await expect(page.locator('#jivo-consent-pd')).not.toBeChecked();
    await expect(page.locator('#jivo-consent-marketing')).not.toBeChecked();
    await page.locator('#jivo-consent-form button[type="submit"]').click();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(0);
  });

  test('JC-02 jivo consent modal opens chat and stores marketing opt-in', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.removeItem('jivo-pd-consent');
      localStorage.removeItem('jivo-marketing-consent');
      window.__jivoOpenCount = 0;
      window.jivo_api = { open: () => { window.__jivoOpenCount += 1; } };
    });
    await page.goto('/');
    await page.getByRole('button', { name: 'Запросить КП / Демо' }).first().click();
    await page.locator('#jivo-consent-pd').check();
    await page.locator('#jivo-consent-marketing').check();
    await page.locator('#jivo-consent-form button[type="submit"]').click();
    await expect(page.locator('#jivo-consent-modal')).toBeHidden();
    await expect(page.evaluate(() => window.__jivoOpenCount)).resolves.toBe(1);
    const stored = await page.evaluate(() => ({
      pd: localStorage.getItem('jivo-pd-consent'),
      marketing: localStorage.getItem('jivo-marketing-consent'),
    }));
    expect(stored.pd).toBe('1');
    expect(stored.marketing).toBe('1');
  });

  test('P-04 privacy cookie table rows', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('.privacy-table tbody tr')).toHaveCount(3);
    await expect(page.getByRole('cell', { name: /Яндекс\.Метрика \(ООО «Яндекс»\), счётчик № 110315704/ })).toBeVisible();
    await expect(page.getByRole('cell', { name: /Jivo \(ООО «Живой Сайт»\)/ })).toBeVisible();
  });

  test('P-05 footer privacy link works', async ({ page }) => {
    await page.goto('/');
    await page.locator('.site-footer__links').getByRole('link', { name: 'Политика конфиденциальности' }).click();
    await expect(page).toHaveURL(/\/privacy\//);
  });

  test('P-06 privacy footer active link', async ({ page }) => {
    await page.goto('/privacy/');
    await expect(page.locator('.site-footer__links a[aria-current="page"]')).toHaveText('Политика конфиденциальности');
  });

  test('C-01 cookie banner on first visit', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('cookie-consent'));
    await page.goto('/');
    await expect(page.locator('#cookie-banner')).toBeVisible();
    await expect(page.locator('#cookie-accept')).toBeVisible();
    await expect(page.locator('#cookie-essential')).toBeVisible();
    await expect(page.locator('body')).toHaveClass(/is-cookie-banner-visible/);
  });

  test('C-02 accept hides banner and stores consent', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('cookie-consent'));
    await page.goto('/');
    await page.locator('#cookie-accept').click();
    await expect(page.locator('#cookie-banner')).toBeHidden();
    await expect(page.locator('body')).not.toHaveClass(/is-cookie-banner-visible/);
    const consent = await page.evaluate(() => localStorage.getItem('cookie-consent'));
    expect(consent).toBe('accepted');
  });

  test('C-03 essential only skips metrika script', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('cookie-consent'));
    await page.goto('/');
    await page.locator('#cookie-essential').click();
    await expect(page.locator('#cookie-banner')).toBeHidden();
    const consent = await page.evaluate(() => localStorage.getItem('cookie-consent'));
    expect(consent).toBe('essential');
    const metrikaLoaded = await page.evaluate(() =>
      Array.from(document.scripts).some((s) => s.src.includes('mc.yandex.ru/metrika/tag.js'))
    );
    expect(metrikaLoaded).toBe(false);
  });

  test('C-04 return visit with accepted hides banner', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('cookie-consent', 'accepted'));
    await page.goto('/');
    await expect(page.locator('#cookie-banner')).toBeHidden();
  });

  test('C-05 banner links to privacy', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('cookie-consent'));
    await page.goto('/');
    await expect(page.locator('#cookie-banner a[href="/privacy/"]')).toBeVisible();
  });

  test('R-01 privacy no overflow @ 375 / 768 / 1280', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('cookie-consent', 'accepted'));
    for (const { width, height } of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1280, height: 900 },
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto('/privacy/');
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      );
      expect(overflow, `overflow at ${width}px`).toBe(false);
      await expect(page.locator('main h1')).toHaveText('Политика конфиденциальности');
    }
  });

  test('R-02 cookie banner stacked @ 375', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('cookie-consent'));
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const accept = page.locator('#cookie-accept');
    const essential = page.locator('#cookie-essential');
    const acceptBox = await accept.boundingBox();
    const essentialBox = await essential.boundingBox();
    expect(acceptBox).toBeTruthy();
    expect(essentialBox).toBeTruthy();
    expect(essentialBox.y).toBeGreaterThan(acceptBox.y + acceptBox.height - 4);
    expect(acceptBox.width).toBeGreaterThan(300);
  });

  test('R-03 cookie banner row @ 1280', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('cookie-consent'));
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const text = page.locator('.cookie-banner__text');
    const actions = page.locator('.cookie-banner__actions');
    const textBox = await text.boundingBox();
    const actionsBox = await actions.boundingBox();
    expect(textBox).toBeTruthy();
    expect(actionsBox).toBeTruthy();
    expect(Math.abs(actionsBox.y - textBox.y)).toBeLessThan(24);
    expect(actionsBox.x).toBeGreaterThan(textBox.x);
  });

  test('R-04 privacy content width @ 1280', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/privacy/');
    const box = await page.locator('.privacy-body .container--narrow').boundingBox();
    expect(box).toBeTruthy();
    expect(box.width).toBeGreaterThan(850);
    expect(box.width).toBeLessThan(920);
  });
});
