# Sprint 2 — Спецификация: Продукты и pricing (RU)

> Связано: `docs/SPRINTS.md` §2, `prototype/src/app/App.tsx` (`ProductsPage`, `ProductPage`, `PricingPage`, `PricingStickyBar`), `docs/SITE_MAP.md`.

**Цель спринта:** ~40% production-ready — все URL продуктов и `/pricing/` открываются с полным контентом из прототипа, internal links работают, responsive 375/768/1280.

**DoD:** 6 новых HTML-страниц + CSS + JS + e2e; footer/header links больше не ведут на 404 для product/pricing URL.

---

## 1. Scope

| URL | Файл | Прототип | Приоритет |
|-----|------|----------|-----------|
| `/products/` | `products/index.html` | `ProductsPage` | P0 |
| `/products/reg-point/` | `products/reg-point/index.html` | `ProductPage id="reg-point"` | P0 |
| `/products/promo-point/` | `products/promo-point/index.html` | `ProductPage id="promo-point"` | P0 |
| `/products/promo-pro/` | `products/promo-pro/index.html` | `ProductPage id="promo-pro"` | P0 |
| `/products/ticket-point/` | `products/ticket-point/index.html` | `ProductPage id="ticket-point"` | P0 |
| `/pricing/` | `pricing/index.html` | `PricingPage` | P0 |

**Вне scope Sprint 2:** статьи (контент — Sprint 5), `/contacts/#demo` форма Jivo (Sprint 3/7), EN-страницы (Sprint 6), Figma export медиа (Sprint 8).

---

## 2. Общие требования (все 6 страниц)

### 2.1 Chrome

- Дублировать header / drawer / footer / contact modal / cookie banner из `index.html` (Sprint 1 шаблон).
- Абсолютные пути `/css/…`, `/js/…`, `/img/…`.
- Скрипты: `config`, `jivo`, `header`, `lang`, `contact`, `analytics`, `cookies`, `bootstrap` (+ page-specific).
- `body[data-page]`: `products`, `reg-point`, `promo-point`, `promo-pro`, `ticket-point`, `pricing`.

### 2.2 SEO (из `PAGE_TITLES.ru` / `META_DESC`)

| page | `<title>` | meta description (сокращённо) |
|------|-----------|-------------------------------|
| products | Модули Рег.Поинт — регистрация, промо, чеки ФНС, билеты | Линейка модулей… |
| reg-point | Рег.Поинт — регистрация и check-in… | Онлайн-запись… от 100 000 ₽ |
| promo-point | Промо.Поинт — регистрация в промоакции… | Промо-формы… от 80 000 ₽ |
| promo-pro | Промо.Про — промоакции с проверкой чека ФНС… | Полный стек… 180 000 ₽ |
| ticket-point | Тикет.Поинт — продажа билетов… | Add-on… Self-hosted |
| pricing | Цены Рег.Поинт 2026… | Прозрачный прайс… |

- `canonical`: `https://reg-point.ru/…`
- OG: `og:title`, `og:description`, `og:url`, `og:locale` ru_RU
- Product pages: JSON-LD `Product` + `Offer` (цены из прототипа §6.3)
- Pricing: JSON-LD `FAQPage` (5 вопросов из pricing FAQ)

### 2.3 Responsive (`.cursor/rules/responsive-layout.mdc`)

- Mobile-first CSS в `css/pages.css`
- Таблицы matrix/pricing: `<768px` — `overflow-x: auto` + `caption`/visually-hidden label **или** card stack
- Touch targets ≥ 44px на CTA и accordion triggers
- Нет horizontal scroll на 375px (кроме intentional table scroll containers)
- Product sidebar: sticky только `≥768px`

### 2.4 CTA wiring

| Элемент | Действие |
|---------|----------|
| «Запросить КП / Демо» | `href="/contacts/#demo"` + `data-action="demo"` |
| «Запросить консультацию» / «Запросить КП» | то же |
| «Связаться» | `data-action="contact"` → modal |
| «Связаться (Jivo)» | `data-action="contact"` |

---

## 3. `/products/` — ProductsPage

### 3.1 Hero (white, border-bottom)

- Label: «Линейка продуктов»
- H1: «Модули платформы **Рег.Поинт**» (accent span)
- Lead: «Одна кодовая база — четыре лицензируемых модуля…»

### 3.2 Module cards (4 col xl, 2 col md, 1 col mobile)

Каждая карточка `.module-card`:

| Модуль | Цена | Features (check-list) | Upsell badge |
|--------|------|----------------------|--------------|
| Рег.Поинт | от 100 000 ₽ | 6 пунктов из прототипа | — |
| Промо.Поинт | от 80 000 ₽ | 4 пункта | «Нужна проверка чеков → Промо.Про» |
| Промо.Про | 180 000 ₽ | 5 пунктов | — |
| Тикет.Поинт | +80 000 ₽ (add-on) | 4 пункта | «Требует Рег.Поинт · В разработке» |

- Footer card: кнопка «Подробнее» → `/products/{slug}/`

### 3.3 Feature matrix

Таблица 10 строк × 5 cols (возможность + 4 модуля). Check icon / em-dash. Container `.table-scroll` на mobile.

### 3.4 Bottom CTA

- «Не знаете, какой модуль выбрать?»
- Button «Запросить консультацию» → demo

---

## 4. Product pages (×4)

### 4.1 Layout

- Breadcrumb: «← Все продукты» → `/products/`
- Grid: 2/3 content + 1/3 sticky price box (`≥768px`)
- Price box: цена, priceNote, 2 CTA, 3 trust bullets

### 4.2 Контент по модулям (из `ProductPage` data)

| id | tagline | price | notIncluded upsells |
|----|---------|-------|---------------------|
| reg-point | Регистрация и check-in… | от 100 000 ₽ | → promo-pro, ticket-point |
| promo-point | Регистрация в промоакции | от 80 000 ₽ | → promo-pro |
| promo-pro | Промоакции с проверкой чеков ФНС | 180 000 ₽ | — |
| ticket-point | Продажа билетов… | +80 000 ₽ (add-on) | status banner |

### 4.3 Ticket-point only

- Status callout: «В разработке (backlog)…»
- Section «Уведомить о релизе»: email form stub → success message (JS, без backend)
- Optional: on submit → `jivo_api.open()` if configured

### 4.4 Related articles (`PRODUCT_ARTICLES`)

| product | slugs (links to `/articles/{slug}/` — 404 OK до Sprint 5) |
|---------|-------------------------------------------------------------|
| reg-point | qr-check-in, import-participants, 152fz-checklist |
| promo-point | self-hosted-vs-saas, consent-pd, 152fz-checklist |
| promo-pro | promo-fns, ocr-fallback, cost-of-registration |
| ticket-point | tickets-yukassa, qr-check-in, cost-of-registration |

Карточки: tag + time + title (reuse `.article-card` pattern).

---

## 5. `/pricing/` — PricingPage

### 5.1 Hero

- Label: «Прозрачное ценообразование»
- H1: «Цены и лицензии **Рег.Поинт**»
- Prose + disclaimer (italic, border-left) — текст из прототипа

### 5.2 Блоки §7.7 MARKETING_SITE_SPEC

| Блок | Заголовок | Формат |
|------|-----------|--------|
| 1 | Лицензии модулей (разово) | Table 4 rows + 2 info cards + CTA |
| 2 | Апгрейды | Table 6 rows |
| 3 | Внедрение на VPS | Table 7 rows |
| 4 | Доработки | Grid 6 cards |
| 5 | Обучение + 152-ФЗ консалтинг | 2 tables side-by-side md |

Все цены — **дословно** из `App.tsx` `PricingPage`.

### 5.3 Pricing FAQ

- Accordion 5 items (прототип)
- `js/pricing.js`: toggle одного открытого, aria-expanded
- JSON-LD FAQPage в `<head>`

### 5.4 Sticky bar (`PricingStickyBar`)

- Fixed под header, показывается после scrollY > 400
- Mobile: Reg.Point price + CTA; sm+: Promo.Pro; md+: tagline
- `js/pricing.js`, class `.pricing-sticky-bar.is-visible`

### 5.5 Footer CTA band (in-page, navy)

- «Нужен расчёт под ваш сценарий?» + 2 buttons (demo + contact)

---

## 6. CSS (`css/pages.css`)

Новые BEM-блоки (mobile-first):

- `.page-hero`, `.page-hero__title`, `.page-hero__lead`, `.page-hero__disclaimer`
- `.module-card`, `.module-card__upsell`
- `.table-scroll`, `.feature-matrix`, `.pricing-table`
- `.product-layout`, `.product-sidebar`, `.product-status`, `.product-upsell-row`
- `.notify-form`, `.pricing-sticky-bar`
- `.pricing-block`, `.pricing-block__label`
- `.accordion`, `.accordion__trigger`, `.accordion__panel`
- `.pricing-cta-band`
- `@media (min-width: 768px)` — sidebar sticky, table columns
- `@media (max-width: 767px)` — pricing table card stack via `.pricing-table--stack`

---

## 7. JavaScript

| Файл | Назначение |
|------|------------|
| `js/pricing.js` | Sticky bar scroll, FAQ accordion |
| `js/products.js` | Ticket-point notify form stub |
| `js/bootstrap.js` | init `SitePricing`, `SiteProducts` |

---

## 8. E2E (`tests/e2e/products-pricing.spec.js`)

| ID | Сценарий | Ожидание |
|----|----------|----------|
| P-01 | GET `/products/` | H1 «Модули платформы», 4 module cards |
| P-02 | Matrix visible | table.feature-matrix ≥ 10 rows |
| P-03 | Product routing | links `/products/reg-point/` → 200, H1 «Рег.Поинт» |
| P-04 | Upsell link | reg-point → promo-pro link works |
| P-05 | Related articles | 3 article cards on product page |
| P-06 | Ticket notify | form submit → success message |
| PR-01 | GET `/pricing/` | H1 «Цены и лицензии» |
| PR-02 | License table | «Рег.Поинт» + «100 000 ₽» visible |
| PR-03 | FAQ accordion | click Q → answer visible |
| PR-04 | Demo CTA | `a[href="/contacts/#demo"]` on page |
| PR-05 | Sticky bar | scroll → `.pricing-sticky-bar.is-visible` |

Responsive: smoke на 375px — no body overflow-x на `/products/` и `/pricing/`.

---

## 9. Документация после закрытия

- [ ] `docs/SPRINTS.md` — Sprint 2 tasks `[x]`, статус ✅
- [ ] `docs/PRODUCTION_READINESS.md` — ~40%
- [ ] `docs/CONTENT_SOURCES.md` — products/pricing ✅

---

## 10. QA checklist (ручной)

- [ ] 375 / 768 / 1280 — все 6 URL
- [ ] Header dropdown → 4 products + overview
- [ ] Footer product links → 200
- [ ] Contact modal opens on all pages
- [ ] Pricing tables readable on mobile (scroll or stack)
- [ ] Playwright green: `cd tests; npm test`

**Commit message (when requested):** `feat(sprint-2): products overview, 4 module pages, pricing RU`
