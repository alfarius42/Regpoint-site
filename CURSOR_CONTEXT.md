# Cursor Context — индекс ключевых документов

> **Цель:** быстрая навигация без загрузки всех файлов.  
> **Использование:** начать с этого файла; подгружать документы только по необходимости.  
> **Если не нашли:** искать в `docs/DOCUMENTATION_INDEX.md`.

---

## Быстрый старт

### При начале работы

1. **`MARKETING_SITE_SPEC.md`** — канон: тексты RU/EN, Jivo, SEO, карта сайта, цены.
2. **`.cursor/rules/`** — правила проекта (в т.ч. **обязательная адаптивная вёрстка**).
3. **`AGENTS.md`** — инструкции для AI-агента.
4. **`js/config.js`** — placeholder ID интеграций, навигация, бренд.

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

- **`MARKETING_SITE_SPEC.md`** — **главный источник знаний**; обновлять при каждом изменении текстов, интеграций, SEO.
- **`docs/INTEGRATIONS.md`** — Jivo (`jivo_api.open()`), Яндекс.Метрика, Telegram.
- **`docs/MEDIA.md`** — медиа-ассеты, OG-изображения.

### Процесс и Git

- **`docs/BRANCHES.md`** — `develop` / `main`, FTP, `dist/`, zip.
- **`docs/PR_WORKFLOW.md`** — правила PR, CI, responsive gate.
- **`docs/SPRINTS.md`** — roadmap и статус спринтов.

### Визуальный референс

- **`prototype/guidelines/HANDOFF.md`** — ТЗ прототипа, breakpoints, компоненты.
- **`prototype/src/app/App.tsx`** — все страницы SPA-прототипа (не копировать в production).

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
