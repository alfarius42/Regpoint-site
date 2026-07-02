# SPRINTS — roadmap до 100% production-ready

Связано: `docs/PRODUCTION_READINESS.md`, `docs/SITE_MAP.md`, `docs/CONTENT_SOURCES.md`.

**Канон контента:** Figma + `prototype/src/app/App.tsx` (тексты и изображения).

---

## Summary

| Sprint | Фокус | Готовность после | Статус |
|--------|-------|------------------|--------|
| 0 | Docs, CI, skeleton | ~15% | 🟡 logo/favicon baseline; email — позже |
| 1 | Chrome: header, footer, home | ~20% | ✅ |
| 2 | Products + pricing | ~40% | ⬜ |
| 3 | Content pages + contacts | ~55% | ⬜ |
| 4 | Privacy, legal, shared JS | ~65% | ⬜ |
| 5 | Articles + SEO | ~80% | ⬜ |
| 6 | EN + i18n | ~88% | ⬜ |
| 7 | Integrations prod | ~93% | ⬜ |
| 8 | Media Figma + OG | ~97% | ⬜ |
| 9 | QA, deploy main, FTP | **100%** | ⬜ |

---

## Sprint 0 — Документация и фундамент

**DoD:** репо готов к разработке из Cursor; CI green.

- [x] Git `develop` / `main`, push GitHub
- [x] Правила: Figma MCP, prototype, responsive, MPA без сборки
- [x] `docs/ARCHITECTURE.md`, `CONTENT_SOURCES.md`, `SITE_MAP.md`, `PRODUCTION_READINESS.md`
- [x] CI Playwright + responsive
- [x] Skeleton `index.html`, css/js
- [x] Ответы Q10 (Masterhost zip), Q12 baseline logo/favicon
- [ ] Commit/push обновлённой документации и ассетов

---

## Sprint 1 — Global chrome + главная (RU)

**Источник:** `Header`, `Footer`, `HomePage`, `ContactModal` в `App.tsx` + Figma.

### 1.1 Design tokens & shared CSS
- [ ] `css/tokens.css` — сверка с Figma
- [ ] `css/components.css` — `.btn`, `.section`, `.modal`, `.site-header`, `.site-footer`
- [ ] Ubuntu woff2 self-host (если в Figma не system-only)

### 1.2 Header
- [ ] Sticky navy header, logo «Рег.Поинт»
- [ ] Desktop nav xl≥1280: Продукты (dropdown 4), Цены, Технологии, 152-ФЗ, Как работает, Сценарии, FAQ, Статьи, Контакты
- [ ] CTA «Связаться» + «Запросить КП / Demo»
- [ ] Mobile drawer + burger
- [ ] Переключатель RU/EN (cookie `lang`, ссылки `/en/`)

### 1.3 Footer
- [ ] CTA band «Готовы обсудить ваш сценарий?»
- [ ] 4 колонки links (прототип `Footer`)
- [ ] Copyright © 2026

### 1.4 Home `/`
- [ ] Hero + H1 + 2 CTA (тексты из `HomePage`)
- [ ] Hero image → `img/hero.webp` (Figma export)
- [ ] Trust 3 col
- [ ] «Не SaaS — коробка» + bullets
- [ ] 4 product cards
- [ ] 152-ФЗ teaser
- [ ] «Как начать» 3 steps
- [ ] Mini FAQ (4 вопроса)
- [ ] Articles teaser (3 карточки)
- [ ] Footer CTA duplicate

### 1.5 Contact modal
- [ ] `js/contact.js` — modal HTML в `index.html` или partial pattern
- [ ] Stub Jivo → `jivo_api.open()` when configured

### 1.6 Tests
- [ ] `tests/e2e/home.spec.js` — расширить под полную главную
- [ ] `tests/e2e/header-footer.spec.js` — nav, drawer, footer links
- [ ] Responsive gate 375/768/1280

**Sprint 1 DoD:** главная pixel-perfect с Figma; header/footer на всех будущих страницах (шаблон).

---

## Sprint 2 — Продукты и pricing (RU)

**Источник:** `ProductsPage`, `ProductPage`, `PricingPage`, `PricingStickyBar`.

### 2.1 `/products/`
- [ ] Hero + intro
- [ ] 4 module cards + prices
- [ ] Feature matrix table (responsive: scroll/card на mobile)
- [ ] CTA «Запросить консультацию»

### 2.2 Product pages (×4)
- [ ] `/products/reg-point/` — features, notIncluded, price
- [ ] `/products/promo-point/` — upsell → Promo.Pro
- [ ] `/products/promo-pro/` — FNS/OCR stack
- [ ] `/products/ticket-point/` — status «в разработке», notify email (stub или Jivo)
- [ ] Related articles block (`PRODUCT_ARTICLES`)
- [ ] Meta title/desc из `PAGE_TITLES` / `META_DESC`

### 2.3 `/pricing/`
- [ ] Все блоки §7.7: лицензии, апгрейды, внедрение, доработки, обучение, 152-FZ консалтинг
- [ ] Disclaimer под H1
- [ ] Pricing FAQ accordion + FAQPage schema
- [ ] Sticky bar mobile (`PricingStickyBar`)
- [ ] Таблицы → mobile stack layout

### 2.4 Tests
- [ ] e2e: products routing, pricing tables visible, CTA links to `/contacts/#demo`

**Sprint 2 DoD:** все product URLs + pricing; internal links работают.

---

## Sprint 3 — Контентные страницы + контакты (RU)

**Источник:** `TechnologyPage`, `CompliancePage`, `HowItWorksPage`, `ScenariosPage`, `FaqPage`, `ContactsPage`.

- [ ] `/technology/` — infra, backend, frontend, integrations blocks
- [ ] `/compliance-152fz/` — compliance table + per-event PD
- [ ] `/how-it-works/` — 6 steps timeline
- [ ] `/scenarios/` — scenarios table
- [ ] `/faq/` — 8 accordion items (full list from `FaqPage`)
- [ ] `/contacts/` — sidebar + `#demo` block layout
- [ ] Contacts: support vs presales sections
- [ ] Duplicate header/footer on all pages
- [ ] `sitemap.xml` — добавить новые URL
- [ ] e2e smoke per page (h1 + main CTA)

**Sprint 3 DoD:** все информационные страницы RU кроме articles/privacy/en.

---

## Sprint 4 — Privacy, cookie, shared modules

- [ ] `/privacy/` — ИП Мельникова К.А., ИНН 644917769371, ОГРНИП 325508100578539; без GA4; Jivo + Метрика (когда ID)
- [ ] Карточка ИП (ОГРН, адрес, email) — по мере поступления
- [ ] Cookie banner на всех страницах
- [ ] `js/cookies.js` + `js/analytics.js` wired
- [ ] Refactor: общий блок `<head>` meta pattern (copy template)
- [ ] `js/seo.js` — optional JSON-LD inject per page type
- [ ] e2e `privacy-cookies.spec.js`

**Sprint 4 DoD:** legal page live; cookie flow complete (Metrika deferred).

---

## Sprint 5 — Статьи + SEO RU

**Источник:** `ArticlesPage`, `ARTICLES[]`, `ArticleDetailPage`.

### 5.1 Listing `/articles/`
- [ ] Tag filter UI (6 tags)
- [ ] 10 cards grid
- [ ] «скоро» badge logic (N/A — all have content in prototype)

### 5.2 Article pages (×10)
- [ ] HTML per slug with full text from `ARTICLES`
- [ ] Cover image from `img/articles/` (Figma/tag map)
- [ ] FAQ block + Article schema
- [ ] CTA footer + productRef link
- [ ] Related articles (2)

### 5.3 SEO infra
- [ ] `sitemap.xml` — all articles
- [ ] OG images `img/og/articles/{slug}.png`
- [ ] Schema: Organization (home), FAQPage, Product offers (pricing)
- [ ] `robots.txt` verify

### 5.4 Tests
- [ ] e2e: articles list, open 2 articles, internal links

**Sprint 5 DoD:** organic content live; SEO baseline complete RU.

---

## Sprint 6 — EN (полный перевод v1)

**Решение Q8:** все страницы RU → `/en/…` (не stub).

**Источник:** `NAV.en`, `PAGE_TITLES.en`, `HomeEN`, `PricingEN` + перевод всех блоков из `App.tsx`.

- [ ] Структура `/en/` mirror SITE_MAP (15 страниц + 10 статей)
- [ ] `i18n/en.json` — shared strings
- [ ] Header lang switcher RU ↔ EN
- [ ] `hreflang` + `x-default` на каждой паре страниц
- [ ] EN meta title/description (перевод `META_DESC` + `PAGE_TITLES.en` + дополнение)
- [ ] EN OG images (или shared с RU — решить при экспорте Figma)
- [ ] EN privacy — без GA4; оператор ИП Мельникова
- [ ] e2e: `/en/` home, pricing, sample product page

**Sprint 6 DoD:** каждый URL из `docs/SITE_MAP.md` имеет EN-эквивалент.

---

## Sprint 7 — Production integrations

**Blocker:** Q4, Q5, Q6, Q7 answers.

- [ ] Jivo script in all pages `<body>` — widget `COp1zDxNwg` via `js/jivo.js`
- [ ] Replace demo stub with Jivo embed on `/contacts/#demo`
- [ ] `jivo_api.open()` all chat buttons
- [x] Telegram → `https://t.me/ZaharMishiev`
- [x] Yandex Metrika init post-consent — ID **110315704**
- [ ] Metrika goals: demo, contact, jivo, lang
- [ ] GA4 — **не подключать** (Q7); убрать из privacy
- [ ] Remove all «Prototype stub» notices from HTML
- [ ] e2e: contact modal opens (mock jivo if no ID in CI)

**Sprint 7 DoD:** leads flow to Jivo in staging/prod.

---

## Sprint 8 — Media & Figma export

**Blocker:** Q9, Q12.

- [ ] Figma MCP audit all frames → export list
- [ ] Replace Unsplash → `img/*`
- [ ] OG PNG set for all pages + articles
- [ ] Favicon + logo SVG/WebP
- [ ] Optimize WebP sizes
- [ ] Update `docs/MEDIA_ASSETS.md` final paths
- [ ] Visual regression: Figma screenshot vs production

**Sprint 8 DoD:** no external placeholder images in production.

---

## Sprint 9 — QA, main, FTP release

- [ ] Full Playwright suite: all routes + responsive
- [ ] Manual test checklist `docs/PRODUCTION_READINESS.md` §7
- [ ] Lighthouse baseline documented
- [ ] Fix blockers
- [ ] PR develop → main
- [ ] Sync `main` production-only files
- [ ] FTP upload (or `build-prod.py` zip if minify wanted)
- [ ] Post-deploy smoke on production URL
- [ ] Update `docs/SPRINTS.md` — all ✅

**Sprint 9 DoD:** `docs/PRODUCTION_READINESS.md` = 100%.

---

## Backlog (post-launch)

- [ ] Google Search Console + Yandex Webmaster
- [ ] A/B на CTA (Metrika)
- [ ] Blog CMS workflow (markdown generator script)
- [ ] `js/i18n.js` runtime dictionary instead of duplicate HTML
- [ ] HTML partials / build script (only if maintainability pain)

---

## Как обновлять этот файл

При закрытии задачи — `[x]` + дата в commit message. При добавлении страницы — обновить `docs/SITE_MAP.md` и sprint section.
