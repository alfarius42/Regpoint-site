# Рег.Поинт — маркетинговый сайт

Статический маркетинговый сайт коробочной платформы **Рег.Поинт** (Reg.Point): регистрация на мероприятия, промоакции, проверка чеков ФНС, продажа билетов. Продуктовая техбаза — репозиторий [ESC-Promo](https://github.com/alfarius42/ESC-Promo).

## О проекте

- **Production:** vanilla HTML + CSS + JS (без React и сборщиков в корне).
- **Архитектура:** MPA — отдельные HTML-страницы и обычные ссылки.
- **Прототип:** `prototype/` — React-референс из Figma Make; код оттуда в production **не копируется**.

**Статус:** Sprint 0 — документация, правила, CI, скелет сайта. Верстка страниц — в следующих спринтах.

## Источники и документы

| Документ | Назначение |
|----------|------------|
| [MARKETING_SITE_SPEC.md](MARKETING_SITE_SPEC.md) | **Главный источник знаний** — тексты, интеграции, SEO, карта сайта |
| [docs/SPRINTS.md](docs/SPRINTS.md) | Дорожная карта и чеклисты |
| [docs/BRANCHES.md](docs/BRANCHES.md) | Ветки `develop` / `main`, деплой FTP |
| [docs/INTEGRATIONS.md](docs/INTEGRATIONS.md) | Jivo, Яндекс.Метрика, Telegram |
| [CURSOR_CONTEXT.md](CURSOR_CONTEXT.md) | Лёгкий индекс для AI-агента |
| [docs/DOCUMENTATION_INDEX.md](docs/DOCUMENTATION_INDEX.md) | Полный индекс документации |

### Приоритет источников

1. `MARKETING_SITE_SPEC.md`
2. Документы `docs/` и этот README
3. Правила `.cursor/rules/` и `AGENTS.md`
4. `prototype/` и `prototype/guidelines/HANDOFF.md` — только визуальный/UX референс

## Ветки и деплой

- **`develop`** — основная ветка разработки (полный репозиторий).
- **`main`** — production-only (публичный сайт без `prototype/`, `docs/`, `.cursor/`).
- Релиз: `python scripts/build-prod.py` → `dist/` + `regpoint-site.zip` для FTP.

Подробнее: [docs/BRANCHES.md](docs/BRANCHES.md).

## Быстрый старт

```bash
# Локальный просмотр production-сайта
npx --yes serve .

# Прототип (визуальная сверка)
cd prototype && npm i && npm run dev
```

## Автотесты (Playwright)

```bash
cd tests
npm i
npx playwright install chromium
npm test
```

## Структура репозитория

```text
index.html              главная (RU)
404.html
products/  pricing/  contacts/  privacy/  en/  …
css/                    reset, tokens, layout, components, pages
js/                     config, header, contact, analytics, cookies, i18n
i18n/                   ru.json, en.json
img/
docs/                   спецификации и процесс
tests/                  Playwright e2e (+ responsive)
scripts/                build dist, sync main
prototype/              референс из Figma Make
MARKETING_SITE_SPEC.md  канон текстов и интеграций
```

## Конфигурация

Ключевые данные — в `js/config.js`:

- бренд, URL сайта, навигация;
- ID **Яндекс.Метрики** (`yandexMetrikaId`);
- **Jivo** widget ID (`jivoWidgetId`);
- **Telegram** (`telegramUrl`) — опционально.

## Полезное

- Правила агента: `.cursor/rules/`
- Инструкции для AI: [AGENTS.md](AGENTS.md)
- PR и CI: [docs/PR_WORKFLOW.md](docs/PR_WORKFLOW.md)
