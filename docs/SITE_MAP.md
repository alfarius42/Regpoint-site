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

---

## Phase 2 — SEO-портал (cap 100)

> **v2:** keyword-first · сценарии · от existing · `docs/SEO_PORTAL_ROADMAP.md`

### Hub (existing, не менять URL)

| URL | Роль |
|-----|------|
| `/scenarios/` | **Hub сценариев** — каталог 52 child |
| `/technology/` | Tech hub → 8 child |
| `/articles/` | Information intent (12 статей) |

### Scenarios — `/scenarios/{slug}/` (52 new)

**P0 (Sprint 12):** `event-registration` · `conference-registration` · `exhibition-registration` · `corporate-events` · `check-in` · `qr-accreditation` · `promo` · `receipt-verification` · `fmcg-promo` · `enterprise-compliance` · `event-agency` · `self-hosted-events`

**P1 (Sprint 13):** `forum-registration` · `seminar-registration` · `training-registration` · `webinar-registration` · `guest-registration` · `online-registration` · `hr-events` · `entrance-control` · `onsite-registration` · `receipt-upload` · `promo-automation` · `buy-and-win` · `promo-agency` · `ticketed-event` · `white-label-registration` (+ 3 смежных)

**P2 (Sprint 14):** остальные 22 slug — см. roadmap §5

> **Не создавать** `/solutions/*` — дубль `/scenarios/`

### Technology child (8) — Sprint 15

`self-hosted` · `docker` · `api` · `deployment` · `security` · `import` · `ocr` · `fns`

### Features (8) — Sprint 15

hub + `forms` · `check-in` · `qr` · `ocr` · `fns` · `anti-fraud` · `reports`

### Cases (4) — Sprint 16

hub + `conference-self-hosted` · `promo-fns-retail` · `corporate-hr-event`

### Бюджет

| | URL |
|---|-----|
| Existing | 28 |
| Scenarios new | 52 |
| Tech + Features + Cases | 20 |
| **Total** | **100** |

### Backlog (101+)

`/knowledge/*` · оставшиеся features/technology · EN · 300+ scale — `docs/SEO_PORTAL_TODO.md` §Backlog

### Реестр

```
content/pages.json    — primaryKeyword, tags[], intent
js/internal-links.js  — автоперелинковка
```
