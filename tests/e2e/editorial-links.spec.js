import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const EDITORIAL_JSON = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), '..', 'content', 'editorial-links.json'), 'utf8')
);

const ARTICLE_URLS = [
  '/articles/event-registration-no-queues/',
  '/articles/qr-check-in/',
  '/articles/import-participants/',
  '/articles/152fz-checklist/',
  '/articles/152fz-penalties/',
  '/articles/consent-pd/',
  '/articles/self-hosted-vs-saas/',
  '/articles/docker-vps/',
  '/articles/cost-of-registration/',
  '/articles/promo-fns/',
  '/articles/ocr-fallback/',
  '/articles/promo-receipt-automation/',
  '/articles/tickets-yukassa/',
];

const BODY_SELECTORS = [
  '.article-section__body',
  '.article-table-caption',
  '.content-intro__text',
  '.page-hero__lead',
  '.product-intro',
  '.accordion__panel',
  '.article-faq__a',
  '.step-card__desc',
  '.section__prose',
  '.hero__lead',
  '.pilot-card__text',
  '.process-reliability__text',
  '.engineering-artifacts__lead',
  '.client-benefits__text',
  '.api-block__text',
  '.how-it-works-panel__lead',
  '.how-it-works-panel__note',
  '.contacts-jivo__text',
  '.contacts-support-card__text',
  '.scenario-flow',
  '.trust-grid__desc',
  '.faq-grid__a',
  '.scenario-card__compliance',
].join(', ');

function linksFrom(pageUrl) {
  return EDITORIAL_JSON.links.filter((item) => item.from === pageUrl);
}

test.describe('Editorial content links', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  test('editorial-links.json is served', async ({ request }) => {
    const res = await request.get('/content/editorial-links.json');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.links.length).toBeGreaterThanOrEqual(50);
  });

  test('editorial registry never points to platform privacy pages', async () => {
    for (const entry of EDITORIAL_JSON.links) {
      expect(entry.to, `${entry.from} → ${entry.to}`).not.toMatch(/^\/privacy\//);
    }
  });

  test('each registry entry resolves in page body', async ({ page }) => {
    const byFrom = {};

    for (const entry of EDITORIAL_JSON.links) {
      if (!byFrom[entry.from]) byFrom[entry.from] = [];
      byFrom[entry.from].push(entry);
    }

    for (const [from, entries] of Object.entries(byFrom)) {
      await page.goto(from);

      if (from === '/faq/') {
        await page.locator('#faq-trigger-1').click();
      }

      if (from === '/how-it-works/') {
        for (const entry of entries) {
          const body = page.locator(BODY_SELECTORS);
          let link = body.locator(`a.text-link[href="${entry.to}"]`, { hasText: entry.anchor });

          if ((await link.count()) === 0 || !(await link.first().isVisible())) {
            await page.locator('.filter-chip[data-filter-value="events"]').click();
            link = body.locator(`a.text-link[href="${entry.to}"]`, { hasText: entry.anchor });
          }
          if ((await link.count()) === 0 || !(await link.first().isVisible())) {
            await page.locator('.filter-chip[data-filter-value="promo"]').click();
            link = body.locator(`a.text-link[href="${entry.to}"]`, { hasText: entry.anchor });
          }

          await expect(link.first(), `${from} → ${entry.to} (${entry.anchor})`).toBeVisible();
        }
        continue;
      }

      const body = page.locator(BODY_SELECTORS);

      for (const entry of entries) {
        const link = body.locator(`a.text-link[href="${entry.to}"]`, { hasText: entry.anchor });
        await expect(link.first(), `${from} → ${entry.to} (${entry.anchor})`).toBeVisible();
      }
    }
  });

  test('articles have at least 2 editorial links in body', async ({ page }) => {
    for (const url of ARTICLE_URLS) {
      await page.goto(url);
      const count = await page.locator('.article-section__body a.text-link').count();
      expect(count, url).toBeGreaterThanOrEqual(2);
    }
  });

  test('editorial anchors are descriptive (not generic)', async ({ page }) => {
    const bad = ['здесь', 'подробнее', 'читайте', 'перейти', 'ссылка'];

    for (const url of ARTICLE_URLS) {
      await page.goto(url);
      const anchors = await page.locator('.article-section__body a.text-link').allTextContents();
      for (const text of anchors) {
        const normalized = text.trim().toLowerCase();
        expect(bad.includes(normalized), `"${text}" on ${url}`).toBeFalsy();
        expect(normalized.length, `short anchor on ${url}`).toBeGreaterThan(3);
      }
    }
  });

  test('registration chain links are bidirectional in body', async ({ page }) => {
    await page.goto('/articles/event-registration-no-queues/');
    await expect(
      page.locator('.article-section__body a.text-link[href="/articles/qr-check-in/"]').first()
    ).toBeVisible();

    await page.goto('/articles/qr-check-in/');
    await expect(
      page.locator('.article-section__body a.text-link[href="/articles/event-registration-no-queues/"]').first()
    ).toBeVisible();
  });

  test('no horizontal overflow with editorial links at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const url of ['/articles/152fz-checklist/', '/compliance-152fz/', '/products/reg-point/']) {
      await page.goto(url);
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });
      expect(overflow, url).toBeFalsy();
    }
  });
});
