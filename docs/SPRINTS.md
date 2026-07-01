# SPRINTS — roadmap маркетингового сайта Рег.Поинт

Связан с `MARKETING_SITE_SPEC.md` и `docs/INTEGRATIONS.md`.

## Статус спринтов (summary)

| Спринт | Название | Статус |
|--------|----------|--------|
| 0 | Документация, правила, CI, скелет | **В работе** |
| 1 | Header, footer, главная, умная кнопка | Ожидает |
| 2 | Страницы продуктов + pricing | Ожидает |
| 3 | Jivo + cookie-баннер + Метрика | Ожидает |
| 4 | EN-версии + i18n | Ожидает |
| 5 | SEO, schema, sitemap, статьи (каркас) | Ожидает |
| 6 | Итоговое QA responsive + релиз main/FTP | Ожидает |

---

## Sprint 0 — Документация и подготовка

**Статус:** в работе.

- [x] Git-модель `develop` / `main`
- [x] `MARKETING_SITE_SPEC.md` — базовый канон (из ESC-Promo)
- [x] Структура docs, CURSOR_CONTEXT, AGENTS, README
- [x] Правила `.cursor/rules/` (+ обязательная адаптивность)
- [x] CI Playwright + PR template
- [x] Скелет production (index, css, js, config)
- [x] Прототип в `prototype/` + HANDOFF
- [ ] Доработка спеки по всем блокам прототипа (§13 MARKETING_SITE_SPEC)
- [ ] Аккаунт Jivo + widget ID (заказчик)
- [ ] Домен + favicon

---

## Sprint 1 — Header, footer, главная

- [ ] Sticky header navy `#243954`, переключатель RU/EN
- [ ] Mobile drawer (breakpoint `--bp-nav-desktop`: 1280px)
- [ ] Footer 4 колонки → stack на mobile
- [ ] Hero + trust + «Не SaaS» + модули + FAQ teaser
- [ ] Модалка «Связаться» → `jivo_api.open()` / Telegram
- [ ] Responsive: 375 / 768 / 1280 — без horizontal scroll

---

## Sprint 2 — Продукты и pricing

- [ ] `/products` + 4 карточки модулей
- [ ] `/products/reg-point` … `ticket-point`
- [ ] `/pricing` — таблицы из спеки §7.7
- [ ] Internal links, CTA → `/contacts#demo`

---

## Sprint 3 — Интеграции

- [ ] Jivo script + embed форма `#demo`
- [ ] Cookie-баннер → Метрика после consent
- [ ] Яндекс.Метрика goals (demo, contact, lang switch)

---

## Sprint 4 — i18n EN

- [ ] `i18n/en.json`, `/en/…` страницы
- [ ] `hreflang`, EN meta/OG

---

## Sprint 5 — SEO и статьи

- [ ] Schema.org Organization, Product, FAQPage
- [ ] `/articles` + первые 2 статьи из §9.3
- [ ] OG images 1200×630

---

## Sprint 6 — Релиз

- [ ] Полный responsive QA
- [ ] `build-prod.py` → `main` → FTP
- [ ] `/privacy` — юрист

---

## Acceptance (Sprint 0)

- [x] Репозиторий готов к работе из Cursor-чата
- [x] CI на PR в `develop`
- [ ] Первый push на GitHub `develop` + `main`
