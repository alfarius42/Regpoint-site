# Источники контента — тексты и изображения

> **Правило проекта:** Figma и `prototype/` — **источники правды** по текстам и изображениям для production.  
> ESC-Promo docs и старая `MARKETING_SITE_SPEC.md` — вторичны при расхождении с прототипом/Figma.

---

## Приоритет (единый канон)

| # | Источник | Тексты | Изображения | Поведение / UX |
|---|----------|--------|-------------|----------------|
| 1 | **[Figma — Регпоинтинг](https://www.figma.com/design/mV4djwXG8q7KnkaTq9rRAy/)** | Если финальный copy в макете | **Канон** — экспорт в `img/` | Layout, spacing, pixel-perfect |
| 2 | **`prototype/src/app/App.tsx`** | **Канон** для RU (и EN где есть) | Placeholder URL → заменить экспортом из Figma | **Канон** модалок, форм, nav |
| 3 | **`MARKETING_SITE_SPEC.md`** | Дополняет / исторический канон | OG-структура, рекомендации | SEO, интеграции, legal |
| 4 | **ESC-Promo** (`PRODUCT_LINE`, `BUSINESS_MODEL`) | Цены, имена модулей | Tokens продукта | — |

### Алгоритм для агента

1. Взять текст/структуру блока из **`App.tsx`** (константы, JSX copy, `PAGE_TITLES`, `META_DESC`, `ARTICLES`).
2. Сверить визуал и финальные формулировки с **Figma MCP** (`get_design_context`, `get_screenshot`).
3. При расхождении Figma vs прототип — **Figma побеждает** по визуалу; по смыслу — если Figma пусто, прототип.
4. Перенести в MPA HTML **без** копирования React/Tailwind.
5. Изображения: экспорт из Figma → `img/`; до экспорта — временно URL из прототипа (см. `docs/MEDIA_ASSETS.md`).

---

## Карта текстов по страницам

Источник строк: `prototype/src/app/App.tsx` + `PAGE_TITLES` + `META_DESC`.

| URL | Компонент прототипа | Title (RU) | Production HTML |
|-----|---------------------|------------|-----------------|
| `/` | `HomePage` | § PAGE_TITLES.home | `index.html` — skeleton |
| `/products/` | `ProductsPage` | products | ✅ |
| `/products/reg-point/` | `ProductPage` | reg-point | ✅ |
| `/products/promo-point/` | `ProductPage` | promo-point | ✅ |
| `/products/promo-pro/` | `ProductPage` | promo-pro | ✅ |
| `/products/ticket-point/` | `ProductPage` | ticket-point | ✅ |
| `/pricing/` | `PricingPage` | pricing | ✅ |
| `/technology/` | `TechnologyPage` | technology | ⏳ |
| `/compliance-152fz/` | `CompliancePage` | compliance | ⏳ |
| `/how-it-works/` | `HowItWorksPage` | how-it-works | ⏳ |
| `/scenarios/` | `ScenariosPage` | scenarios | ⏳ |
| `/faq/` | `FaqPage` | faq | ⏳ |
| `/articles/` | `ArticlesPage` | articles | ⏳ |
| `/articles/:slug/` | `ArticleDetailPage` | ARTICLES[] | ⏳ (10 статей) |
| `/contacts/` | `ContactsPage` | contacts | ⏳ |
| `/privacy/` | `PrivacyPage` | privacy | ⏳ |
| `/en/` … | `HomeEN`, `PricingEN`, `ENPageStub` | PAGE_TITLES.en | ⏳ |

Meta description для каждой страницы — объект `META_DESC` в `App.tsx` (строки ~2691–2707).

---

## Статьи (полный контент в прототипе)

Массив `ARTICLES` в `App.tsx` — **10 статей с полным текстом** (lead, sections, faq, cta, productRef):

| slug | Статус контента |
|------|-----------------|
| `self-hosted-vs-saas` | ✅ полный |
| `152fz-checklist` | ✅ полный |
| `cost-of-registration` | ✅ полный |
| `qr-check-in` | ✅ полный |
| `import-participants` | ✅ полный |
| `promo-fns` | ✅ полный |
| `ocr-fallback` | ✅ полный |
| `docker-vps` | ✅ полный |
| `consent-pd` | ✅ полный |
| `tickets-yukassa` | ✅ полный |

Production: markdown или HTML-фрагменты в `articles/<slug>/index.html` — текст **копировать из прототипа**, не из §9.3 старой спеки.

---

## EN-версии

| Страница | Прототип |
|----------|----------|
| Home | `HomeEN` — частичный перевод |
| Pricing | `PricingEN` — частичный перевод |
| Остальные | `ENPageStub` — заглушка «English version is being prepared» |

Решение по scope EN — см. `docs/OPEN_QUESTIONS.md`.

---

## Shared UI copy (глобально)

| Элемент | Источник | Текст |
|---------|----------|-------|
| Contact modal | `ContactModal` | «Написать в поддержку», Jivo, Telegram, offline 4ч |
| Demo form | `DemoModal`, `ContactsPage` | Поля §4.4 спеки = прототип |
| Footer CTA | `Footer` | «Готовы обсудить ваш сценарий?» |
| Cookie banner | `App` root | consent + privacy link |
| Nav | `NAV.ru` / `NAV.en` | все пункты меню |

---

## Что обновлять при изменении copy

1. Сначала Figma / прототип (если меняется канон)
2. Production HTML
3. `MARKETING_SITE_SPEC.md` §7–§9 — синхронизация
4. `i18n/ru.json`, `i18n/en.json` — при введении i18n
5. E2E-тесты — если меняются видимые строки
