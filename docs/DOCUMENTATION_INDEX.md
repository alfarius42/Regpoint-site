# Полный индекс документации — Regpoint-site

Обновлять при добавлении новых документов.

---

## Корень проекта

- **README.md** — описание и быстрый старт.
- **MARKETING_SITE_SPEC.md** — **главный источник знаний** (тексты, SEO, интеграции, карта сайта).
- **CURSOR_CONTEXT.md** — лёгкий индекс для AI (начинать с него).
- **AGENTS.md** — инструкции для AI-агента.
- **.cursor/rules/** — правила Cursor (стек, git, адаптивность, PR).

---

## Актуальная документация (`docs/`)

- **DOCUMENTATION_INDEX.md** (этот файл) — полный индекс.
- **BRANCHES.md** — `develop` / `main`, FTP, `dist/`, zip.
- **PR_WORKFLOW.md** — правила PR, CI gates, responsive checklist.
- **SPRINTS.md** — roadmap и статус спринтов.
- **INTEGRATIONS.md** — Jivo, Яндекс.Метрика, Telegram.
- **MEDIA.md** — медиа, OG, favicon.

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
