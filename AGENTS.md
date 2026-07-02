# Рег.Поинт Site — инструкции для AI-агента

## Архитектура (критично)

**MPA без сборки:** HTML + CSS + JS в корне репо. Нет `package.json`, Vite, Webpack в production. Файлы отдаются как есть; FTP — напрямую статика. npm только в `prototype/` и `tests/`.

Интеграции: **Jivo**, **Telegram**, Яндекс.Метрика — client-side в `js/`.

См. `docs/ARCHITECTURE.md`.

## Перед работой

1. `MARKETING_SITE_SPEC.md` — тексты, SEO, интеграции.
2. Figma MCP — `.cursor/rules/figma-design.mdc`.
3. `prototype/` — UX/поведение, не код — `.cursor/rules/prototype-source.mdc`.
4. `js/config.js` — ID интеграций.

## Локальный просмотр (PowerShell)

```powershell
# Production — без сборки
cd C:\Regpoint-site
npx --yes serve .

# Прототип — отдельно
cd C:\Regpoint-site\prototype
npm install
npm run dev
```

Не использовать `&&` в примерах для PowerShell 5 — только `;` или многострочно.

## CI

```powershell
cd C:\Regpoint-site\tests
npm test
```

`build-prod.py` — только опциональная упаковка релиза, не часть dev-цикла.
