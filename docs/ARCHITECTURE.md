# Архитектура production-сайта

## MPA без сборки

Production-сайт — **чистая статика**. Редактируете файлы в корне репозитория и сразу открываете в браузере через HTTP-сервер.

| Принцип | Реализация |
|---------|------------|
| **MPA** | Каждая страница — свой `index.html` в каталоге (`/`, `/pricing/`, …) |
| **Навигация** | Обычные `<a href>`, без SPA-роутера |
| **HTML** | Разметка в `.html` файлах |
| **CSS** | Подключение `<link rel="stylesheet" href="/css/…">`, tokens в `css/tokens.css` |
| **JS** | `<script src="/js/…" defer>`, vanilla JS, без npm в корне |
| **Сборка** | **Нет.** Нет Vite, Webpack, Rollup, `npm run build` для сайта |
| **Бэкенд** | **Нет.** Только static hosting / FTP |

### Что есть в корне репозитория

```text
index.html
css/   js/   img/   i18n/
products/   pricing/   contacts/   …
```

**Нет** `package.json`, `node_modules/`, `vite.config.*` в корне — только в `prototype/` (референс) и `tests/` (CI).

### Локальный просмотр (без сборки)

```powershell
# из корня C:\Regpoint-site
npx --yes serve .
```

Или: `python -m http.server 8080` — любой статический HTTP-сервер. Не открывать через `file://`.

### Деплой на FTP

**По умолчанию:** залить на хостинг **исходные** файлы с ветки `main` (`index.html`, `css/`, `js/`, …) — **без** предварительной сборки.

**Опционально:** `python scripts/build-prod.py` — только копирование + минификация CSS/JS в `dist/` и zip; это **упаковка для релиза**, не компиляция приложения.

---

## Интеграции (client-side)

| Сервис | Назначение | Файлы |
|--------|------------|--------|
| **Jivo** | Чат `jivo_api.open()`, форма `#demo` | `js/contact.js`, `js/config.js` |
| **Telegram** | Ссылка из модалки «Связаться» | `js/config.js` → `telegramUrl` |
| **Яндекс.Метрика** | Аналитика после cookie | `js/analytics.js`, `js/cookies.js` |

---

## Что не относится к production

| Каталог | Назначение | npm / сборка |
|---------|------------|--------------|
| `prototype/` | React-прототип: UX, поведение, Figma Make | **Да** — `npm run dev` (Vite) |
| `tests/` | Playwright e2e для CI | **Да** — только для тестов |
| `scripts/` | Опциональная упаковка `dist/` | Python, не npm-сборка сайта |

---

## Сверка с правилами

- `.cursor/rules/project-overview.mdc` — архитектура MPA
- `.cursor/rules/vanilla-site.mdc` — стандарты HTML/CSS/JS
- `.cursor/rules/responsive-layout.mdc` — **375 / 768 / 1280**
- `docs/BREAKPOINTS.md` — канон breakpoints
- `MARKETING_SITE_SPEC.md` §4.1
