import { test, expect } from '@playwright/test';

test.describe('SEO infrastructure', () => {
  test('robots.txt allows indexing and references sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Allow:\s*\//);
    expect(body).toContain('Sitemap: https://reg-point.ru/sitemap.xml');
    expect(body).toContain('Host: https://reg-point.ru');
  });

  test('sitemap.xml lists key pages with lastmod', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<loc>https://reg-point.ru/</loc>');
    expect(body).toContain('<loc>https://reg-point.ru/pricing/</loc>');
    expect(body).toContain('<loc>https://reg-point.ru/articles/152fz-checklist/</loc>');
    expect(body).toContain('<lastmod>');
  });

  test('home has single H1 and OG image', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main h1')).toHaveCount(1);
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveCount(1);
    await expect(ogImage).toHaveAttribute('content', /reg-point\.ru/);
  });

  test('404 is noindex', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});
