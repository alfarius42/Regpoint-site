# Полный индекс документации — Regpoint-site

Обновлять при добавлении новых документов.

---

## Корень проекта

- **README.md** — описание и быстрый старт.
- **MARKETING_SITE_SPEC.md** — **главный источник знаний** (тексты, SEO, интеграции, карта сайта).
- **CURSOR_CONTEXT.md** — лёгкий индекс для AI (начинать с него).
- **AGENTS.md** — инструкции для AI-агента.
- **.cursor/rules/** — правила Cursor (MPA, Figma MCP, prototype, адаптивность, PR).

---

## Актуальная документация (`docs/`)

- **DOCUMENTATION_INDEX.md** (этот файл) — полный индекс.
- **BRANCHES.md** — `develop` / `main`, FTP, `dist/`, zip.
- **PR_WORKFLOW.md** — правила PR, CI gates, responsive checklist.
- **SPRINTS.md** — roadmap и статус спринтов.
- **TEST_CASES_SPRINT1.md**, **TEST_CASES_SPRINT2.md**, **TEST_CASES_SPRINT3.md** — спеки и тест-кейсы по спринтам.
- **ARCHITECTURE.md** — MPA без сборки.
- **CONTENT_SOURCES.md** — Figma + прототип = канон текстов и изображений.
- **SITE_MAP.md** — все URL и статус страниц.
- **PRODUCTION_READINESS.md** — Definition of Done 100%.
- **OPEN_QUESTIONS.md** — блокеры (Metrika ID, email, FTP Masterhost).
- **LEGAL_ENTITY.md** — ИП Мельникова, реквизиты, контакты.
- **DEPLOY_MASTERHOST.md** — деплой zip через панель Masterhost.
- **BREAKPOINTS.md** — **канон 375 / 768 / 1280** (адаптив + фиксация layout-tier).
- **MEDIA_ASSETS.md** — медиа, OG, favicon.
- **SEO_PORTAL_ROADMAP.md** — ТЗ SEO-портала, кластеры, keyword map, оценка.
- **SEO_PORTAL_TODO.md** — backlog Sprint 10–17, SEO copy checklist.
- **content/SCHEMA.md** — hub → child, поля `pages.json`.
- **MESSAGING.md** — матрица шаблонов, funnel, SEO.
- **CONTENT_VOICE.md** — инженерный голос, стиль, editorial links.
- **templates/SOLUTION_PAGE.md** — канон §1–14 для `/scenarios/*` (Решения).

---

## Прототип (`prototype/`)

- **guidelines/HANDOFF.md** — ТЗ для переноса UX в vanilla HTML/CSS/JS.
- **src/app/App.tsx** — SPA всех страниц (референс, не копировать).

---

## CI/CD

- **`.github/workflows/ci.yml`** — Playwright + build dist на PR/push.
- **`.github/pull_request_template.md`** — шаблон PR.
- **`tests/`** — e2e Playwright.
- **`scripts/build-prod.py`** — production `dist/` + `regpoint-site.zip`.

---

## Связанные документы ESC-Promo (вне этого репо)

Канон продукта — репозиторий ESC-Promo (`docs/active/`):

| Документ | Когда читать |
|----------|--------------|
| PRODUCT_LINE.md | Имена модулей, slug |
| BUSINESS_MODEL.md | Цены `/pricing` |
| UI_DESIGN_SYSTEM.md | Tokens, typography |
| BOX_PRODUCT_SPEC.md | `/technology` |
| MARKETING_SITE_SPEC.md | Дубликат; **канон для сайта — файл в корне Regpoint-site** |

---

## Архив

Пока пуст. Устаревшие документы — `docs/archive/` (создать при необходимости).
