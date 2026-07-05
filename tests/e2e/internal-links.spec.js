import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const PAGES_JSON = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '..', 'content', 'pages.json'), 'utf8')
);

const LIVE_PAGES = PAGES_JSON.pages.filter((p) => p.status !== 'planned' && p.type !== 'legal');

const HUB_PAGES = [
  '/technology/',
  '/compliance-152fz/',
  '/how-it-works/',
  '/scenarios/',
  '/faq/',
  '/articles/',
  '/products/',
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 900 },
];

async function waitForInternalLinks(page) {
  await page.waitForFunction(
    () => {
      const mount = document.querySelector('[data-internal-links]');
      return !!(mount && mount.querySelector('.internal-links'));
    },
    { timeout: 15000 }
  );
}

test.describe('Internal links — existing pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  test('pages.json is served and lists live pages', async ({ request }) => {
    const res = await request.get('/content/pages.json');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.pages.length).toBeGreaterThanOrEqual(26);
    expect(data.pages.some((p) => p.url === '/technology/')).toBeTruthy();
  });

  test('hub pages render internal-links block after registry load', async ({ page }) => {
    for (const url of HUB_PAGES) {
      await page.goto(url);
      await waitForInternalLinks(page);
      await expect(page.locator('[data-internal-links] .internal-links')).toBeVisible();
      await expect(page.locator('[data-internal-links] .internal-links-card').first()).toBeVisible();
    }
  });

  test('technology cross-links compliance and conversion anchors', async ({ page }) => {
    await page.goto('/technology/');
    await waitForInternalLinks(page);

    const block = page.locator('[data-internal-links]');
    await expect(block.locator('a.internal-links-card[href="/compliance-152fz/"]')).toBeVisible();
    await expect(block.locator('a.internal-links-card[href="/pricing/"]')).toBeVisible();
    await expect(block.locator('a.internal-links-card[href="/contacts/"]')).toBeVisible();
    expect(await block.locator('.internal-links-card').count()).toBeGreaterThanOrEqual(4);
  });

  test('compliance cross-links technology hub', async ({ page }) => {
    await page.goto('/compliance-152fz/');
    await waitForInternalLinks(page);

    const block = page.locator('[data-internal-links]');
    await expect(block.locator('a.internal-links-card[href="/technology/"]')).toBeVisible();
    await expect(block.getByRole('heading', { level: 2, name: 'Связанные разделы' })).toBeVisible();
  });

  test('products hub lists child modules in internal links', async ({ page }) => {
    await page.goto('/products/');
    await waitForInternalLinks(page);

    const block = page.locator('[data-internal-links]');
    await expect(block.getByRole('heading', { level: 2, name: 'Модули', exact: true })).toBeVisible();
    await expect(block.locator('a.internal-links-card[href="/products/reg-point/"]').first()).toBeVisible();
    await expect(block.locator('a.internal-links-card[href="/products/promo-pro/"]').first()).toBeVisible();
  });

  test('product page keeps static articles and adds hub links', async ({ page }) => {
    await page.goto('/products/reg-point/');
    await waitForInternalLinks(page);

    await expect(page.locator('.section--product-articles .article-card')).toHaveCount(3);
    expect(await page.locator('[data-internal-links] .internal-links-card').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('[data-internal-links] a[href="/articles/"]')).toBeVisible();
  });

  test('home internal links avoid duplicate article cards', async ({ page }) => {
    await page.goto('/');
    await waitForInternalLinks(page);

    await expect(page.locator('section.section--muted:has(h2:text-is("Последние статьи")) .article-card')).toHaveCount(3);
    await expect(
      page.locator('[data-internal-links] a.internal-links-card[href*="/articles/"]:not([href="/articles/"])')
    ).toHaveCount(0);
    await expect(page.locator('[data-internal-links] .internal-links')).toBeVisible();
  });

  test('articles hub keeps internal links without duplicate full listing', async ({ page }) => {
    await page.goto('/articles/');
    await waitForInternalLinks(page);

    await expect(page.locator('#articles-grid .article-card--listing')).toHaveCount(13);
    await expect(page.locator('[data-internal-links] .internal-links')).toBeVisible();
    await expect(page.locator('[data-internal-links] .internal-links__title:text-is("Статьи")')).toHaveCount(0);
    await expect(
      page.locator('[data-internal-links] a.internal-links-card[href*="/articles/"]:not([href="/articles/"])')
    ).toHaveCount(0);
    await expect(page.locator('[data-internal-links] a.internal-links-card[href="/pricing/"]')).toBeVisible();
  });

  test('article detail refreshes related cards from tag registry', async ({ page }) => {
    await page.goto('/articles/152fz-checklist/');
    await waitForInternalLinks(page);

    const related = page.locator('.article-related__grid .article-related-card');
    await expect(related).toHaveCount(2);

    const hrefs = await related.evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute('href'))
    );
    expect(hrefs.every((h) => h && !h.includes('152fz-checklist'))).toBeTruthy();
    expect(new Set(hrefs).size).toBe(2);
  });

  test('article related link navigates to another article', async ({ page }) => {
    await page.goto('/articles/docker-vps/');
    await waitForInternalLinks(page);

    const firstRelated = page.locator('.article-related-card').first();
    const href = await firstRelated.getAttribute('href');
    expect(href).toMatch(/^\/articles\/.+\/$/);
    await firstRelated.click();
    await expect(page).toHaveURL(href);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('privacy pages have no internal-links mount', async ({ page }) => {
    for (const url of ['/privacy/', '/privacy/marketing-consent/']) {
      await page.goto(url);
      await expect(page.locator('[data-internal-links]')).toHaveCount(0);
    }
  });

  test('internal-links section sits inside main before footer', async ({ page }) => {
    await page.goto('/technology/');
    await waitForInternalLinks(page);

    const order = await page.evaluate(() => {
      const main = document.querySelector('main');
      const mount = document.querySelector('[data-internal-links]');
      const footer = document.querySelector('.site-footer');
      if (!main || !mount || !footer) return null;
      return {
        mountInMain: main.contains(mount),
        mountBeforeFooter: mount.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING,
        hasMutedSection: mount.classList.contains('section--muted'),
      };
    });

    expect(order.mountInMain).toBeTruthy();
    expect(order.mountBeforeFooter).toBeTruthy();
    expect(order.hasMutedSection).toBeTruthy();
  });

  test('internal-links cards match component styles', async ({ page }) => {
    await page.goto('/faq/');
    await waitForInternalLinks(page);

    const card = page.locator('[data-internal-links] .internal-links-card').first();
    await expect(card.locator('.internal-links-card__title.font-heading')).toBeVisible();

    const borderWidth = await card.evaluate((el) => getComputedStyle(el).borderTopWidth);
    expect(borderWidth).not.toBe('0px');
  });

  for (const vp of VIEWPORTS) {
    test(`no horizontal overflow with internal-links @ ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const url of ['/technology/', '/compliance-152fz/', '/products/reg-point/', '/articles/qr-check-in/']) {
        await page.goto(url);
        await waitForInternalLinks(page);

        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
        });
        expect(overflow, `horizontal scroll on ${url}`).toBe(false);
        await expect(page.locator('[data-internal-links] .internal-links')).toBeVisible();
      }
    });
  }

  test('internal-links grid: stack mobile, 3-col desktop for article group', async ({ page }) => {
    await page.goto('/technology/');
    await waitForInternalLinks(page);

    const cards = () => page.locator('[data-internal-links] .internal-links__grid--3 .internal-links-card');

    await page.setViewportSize({ width: 375, height: 812 });
    const m0 = await cards().nth(0).boundingBox();
    const m1 = await cards().nth(1).boundingBox();
    expect(m0).toBeTruthy();
    expect(m1).toBeTruthy();
    expect(m1.y).toBeGreaterThan(m0.y);

    await page.setViewportSize({ width: 1280, height: 900 });
    const d0 = await cards().nth(0).boundingBox();
    const d2 = await cards().nth(2).boundingBox();
    expect(Math.abs(d2.y - d0.y)).toBeLessThan(8);
  });

  test('every live content page with mount resolves at least two internal links', async ({ page }) => {
    test.setTimeout(120000);
    const urls = LIVE_PAGES.filter((p) => p.type !== 'legal').map((p) => p.url);

    for (const url of urls) {
      await page.goto(url);
      await waitForInternalLinks(page);
      const count = await page.locator('[data-internal-links] .internal-links-card').count();
      expect(count, url).toBeGreaterThanOrEqual(2);
    }
  });
});
