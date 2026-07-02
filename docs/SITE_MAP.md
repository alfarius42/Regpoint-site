# Карта сайта — MPA production

> Тексты и meta — из `prototype/src/app/App.tsx`. URL — чистые пути (Apache `DirectoryIndex`).

---

## RU (default)

| URL | Файл production | Прототип | Sprint |
|-----|-----------------|----------|--------|
| `/` | `index.html` | HomePage | 1 |
| `/products/` | `products/index.html` | ProductsPage | 2 |
| `/products/reg-point/` | `products/reg-point/index.html` | ProductPage | 2 |
| `/products/promo-point/` | `products/promo-point/index.html` | ProductPage | 2 |
| `/products/promo-pro/` | `products/promo-pro/index.html` | ProductPage | 2 |
| `/products/ticket-point/` | `products/ticket-point/index.html` | ProductPage | 2 |
| `/pricing/` | `pricing/index.html` | PricingPage | 2 |
| `/technology/` | `technology/index.html` | TechnologyPage | 3 |
| `/compliance-152fz/` | `compliance-152fz/index.html` | CompliancePage | 3 |
| `/how-it-works/` | `how-it-works/index.html` | HowItWorksPage | 3 |
| `/scenarios/` | `scenarios/index.html` | ScenariosPage | 3 |
| `/faq/` | `faq/index.html` | FaqPage | 3 |
| `/articles/` | `articles/index.html` | ArticlesPage | 5 |
| `/articles/{slug}/` | `articles/{slug}/index.html` | ArticleDetailPage | 5 |
| `/contacts/` | `contacts/index.html` | ContactsPage | 3 |
| `/contacts/#demo` | якорь формы Jivo | ContactsPage | 3 |
| `/privacy/` | `privacy/index.html` | PrivacyPage | 4 |
| `/404.html` | `404.html` | — | 1 |

### Slug статей

`self-hosted-vs-saas` · `152fz-checklist` · `cost-of-registration` · `qr-check-in` · `import-participants` · `promo-fns` · `ocr-fallback` · `docker-vps` · `consent-pd` · `tickets-yukassa`

---

## EN

| URL | Прототип | Sprint |
|-----|----------|--------|
| `/en/` | HomeEN | 6 |
| `/en/pricing/` | PricingEN | 6 |
| `/en/products/` … | ENPageStub | 6+ (по решению) |

---

## Shared includes (MPA)

Каждая страница подключает:

```html
<link> css/fonts … pages
<script> config, header, contact, analytics, cookies, bootstrap
```

Header/footer — дублирование HTML (как Abrikos) или генерация скриптом позже; **не** SSI на v1 unless хостинг поддерживает.

---

## SEO per page

Из прототипа (`App.tsx` useEffect):

- `document.title` → `<title>` в HTML
- `META_DESC` → `<meta name="description">`
- OG: `og:title`, `og:description`, `og:image` → `/og/{page}.png`
- Canonical: `https://reg.point/…` (домен — уточнить)
- Schema: SoftwareApplication (home), FAQPage (faq, pricing FAQ), Article (статьи), Product (pricing)

---

## Internal linking (из прототипа)

- Home → products cards, compliance, articles teaser, FAQ teaser
- Product pages → upsell links, related articles (`PRODUCT_ARTICLES`)
- Pricing → sticky CTA bar (`PricingStickyBar`)
- All pages → footer CTA, header demo/contact
