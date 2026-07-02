import { test, expect } from '@playwright/test';

test.describe('Articles — Sprint 5', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('cookie-consent', 'accepted');
    });
  });

  test('listing page has hero, 12 cards and tag filters', async ({ page }) => {
    await page.goto('/articles/');
    await expect(page.getByRole('heading', { level: 1, name: 'Статьи' })).toBeVisible();
    await expect(page.locator('.article-card--listing')).toHaveCount(12);
    await expect(page.locator('.filter-chip')).toHaveCount(7);
  });

  test('tag filter hides non-matching cards', async ({ page }) => {
    await page.goto('/articles/');
    await page.locator('.filter-chip[data-filter="152-ФЗ"]').click();
    await expect(page.locator('.article-card--listing:visible')).toHaveCount(2);
    await page.locator('.filter-chip[data-filter="all"]').click();
    await expect(page.locator('.article-card--listing:visible')).toHaveCount(12);
  });

  test('article detail page loads with FAQ and CTA', async ({ page }) => {
    await page.goto('/articles/152fz-checklist/');
    await expect(page.getByRole('heading', { level: 1, name: /152-ФЗ на мероприятии/ })).toBeVisible();
    await expect(page.locator('.article-cover__img')).toBeVisible();
    await expect(page.locator('.article-faq__item')).toHaveCount(2);
    await expect(page.locator('.article-cta').getByRole('button', { name: /Запросить КП/ })).toBeVisible();
    await expect(page.locator('.article-related-card')).toHaveCount(2);
  });

  test('article links from home teaser work', async ({ page }) => {
    await page.goto('/');
    const teaserCard = page.locator('.section--muted .article-card').first();
    await expect(teaserCard).toBeVisible();
    await teaserCard.click();
    await expect(page).toHaveURL(/\/articles\/.+\//);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('product ref block links to product page', async ({ page }) => {
    await page.goto('/articles/self-hosted-vs-saas/');
    await page.locator('.article-product-ref__btn').click();
    await expect(page).toHaveURL(/\/products\/reg-point\//);
  });

  test('articles grid layout: 1 col mobile, 2 tablet, 3 desktop', async ({ page }) => {
    const cards = () => page.locator('.article-card--listing');

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/articles/');
    const m0 = await cards().nth(0).boundingBox();
    const m1 = await cards().nth(1).boundingBox();
    expect(m0).toBeTruthy();
    expect(m1).toBeTruthy();
    expect(m1.y).toBeGreaterThan(m0.y);

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/articles/');
    const t0 = await cards().nth(0).boundingBox();
    const t1 = await cards().nth(1).boundingBox();
    const t2 = await cards().nth(2).boundingBox();
    expect(Math.abs(t1.y - t0.y)).toBeLessThan(8);
    expect(t2.y).toBeGreaterThan(t0.y);

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/articles/');
    const d0 = await cards().nth(0).boundingBox();
    const d2 = await cards().nth(2).boundingBox();
    expect(Math.abs(d2.y - d0.y)).toBeLessThan(8);
  });
});
