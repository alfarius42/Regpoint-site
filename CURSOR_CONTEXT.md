# Cursor Context — индекс ключевых документов

> **Цель:** быстрая навигация без загрузки всех файлов.  
> **Использование:** начать с этого файла; подгружать документы только по необходимости.  
> **Если не нашли:** искать в `docs/DOCUMENTATION_INDEX.md`.

---

## Быстрый старт

### При начале работы

1. **`MARKETING_SITE_SPEC.md`** — канон: тексты RU/EN, Jivo, SEO, карта сайта, цены.
2. **Figma** — [Регпоинтинг](https://www.figma.com/design/mV4djwXG8q7KnkaTq9rRAy/) — визуал, MCP, pixel-perfect.
3. **`.cursor/rules/`** — правила (адаптивность, Figma, prototype).
4. **`AGENTS.md`**, **`js/config.js`**.

### Продуктовый контекст (ESC-Promo, отдельный репо)

Маркетинговый сайт продаёт коробку из монолита ESC-Promo. Канон модулей и цен — там:

| Документ (ESC-Promo) | Связь с сайтом |
|----------------------|----------------|
| `docs/active/PRODUCT_LINE.md` | Имена модулей RU/EN, slug URL |
| `docs/active/BUSINESS_MODEL.md` | Цены для `/pricing` |
| `docs/active/UI_DESIGN_SYSTEM.md` | CSS-тokens, шрифты |
| `docs/active/BOX_PRODUCT_SPEC.md` | `/technology`, `/how-it-works` |

---

## Категории

### Спецификация и контент

- **`MARKETING_SITE_SPEC.md`** — SEO, интеграции, legal framework.
- **`docs/CONTENT_SOURCES.md`** — **канон текстов/изображений:** Figma + прототип.
- **`docs/SITE_MAP.md`** — MPA URL и статус.
- **`docs/PRODUCTION_READINESS.md`** — DoD 100%.
- **`docs/BREAKPOINTS.md`** — **канон 375 / 768 / 1280**, fluid между уровнями.
- **`docs/OPEN_QUESTIONS.md`** — блокеры (email, FTP).
- **`docs/LOCAL_DEV.md`** — PowerShell команды.
- **`docs/LEGAL_ENTITY.md`** — ИП, реквизиты, Jivo/Telegram.

### Процесс и Git

- **`docs/BRANCHES.md`** — `develop` / `main`, FTP, `dist/`, zip.
- **`docs/PR_WORKFLOW.md`** — правила PR, CI, responsive gate.
- **`docs/SPRINTS.md`** — roadmap и статус спринтов.

### Дизайн и архитектура

- **`docs/ARCHITECTURE.md`** — MPA без сборки (HTML/CSS/JS).
- **Figma** — [Регпоинтинг](https://www.figma.com/design/mV4djwXG8q7KnkaTq9rRAy/).

- **Figma** — [Регпоинтинг](https://www.figma.com/design/mV4djwXG8q7KnkaTq9rRAy/) (`fileKey`: `mV4djwXG8q7KnkaTq9rRAy`). Правило: `.cursor/rules/figma-design.mdc`.
- **`prototype/`** — React-прототип: бизнес-логика, поведение, вёрстка-референс. Правило: `.cursor/rules/prototype-source.mdc`.
- **`prototype/guidelines/HANDOFF.md`** — маршруты MPA, breakpoints, UX-потоки.
- **`prototype/src/app/App.tsx`** — все экраны и интерактив (не копировать код).

### CI и качество

- **`.github/workflows/ci.yml`** — Playwright e2e + responsive + build dist.
- **`tests/`** — e2e; viewport 375 / 768 / 1280 обязательны.

---

## Логика поиска

1. Открыть `CURSOR_CONTEXT.md` → найти категорию → подгрузить документ.
2. Если не нашли — `docs/DOCUMENTATION_INDEX.md`.
3. Семантический поиск в Cursor или `MARKETING_SITE_SPEC.md`.

---

## Связанные репозитории

- **Regpoint-site** (этот репо) — маркетинговый сайт, статика HTML/CSS/JS.
- **ESC-Promo** — продуктовый монолит (React + Node + MySQL).
