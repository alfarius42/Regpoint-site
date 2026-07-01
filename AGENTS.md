# Рег.Поинт Site — инструкции для AI-агента

## Проект

Маркетинговый сайт **Рег.Поинт** (Reg.Point) — коробочная платформа для регистрации на мероприятия, промоакций, проверки чеков и билетов. Production — **vanilla HTML/CSS/JS** в корне репозитория. Продуктовый монолит — `C:\ESC-Promo` (отдельный репо).

## Перед работой

1. Прочитать **`MARKETING_SITE_SPEC.md`** — главный источник текстов, маршрутов, интеграций.
2. При задачах по UI/UX — `prototype/guidelines/HANDOFF.md` и `prototype/src/app/App.tsx` (**не копировать код**, см. `.cursor/rules/prototype-reference.mdc`).
3. Константы и placeholder-ID — в `js/config.js`.
4. **Адаптивная вёрстка обязательна** — см. `.cursor/rules/responsive-layout.mdc`.

## Репозиторий

- GitHub: https://github.com/alfarius42/Regpoint-site
- **develop** — разработка (полный репо)
- **main** — production-only
- Подробнее: `docs/BRANCHES.md`, `docs/PR_WORKFLOW.md`
- Коммит и push — **только по запросу** пользователя

## Локальный просмотр

```bash
npx --yes serve .
```

Для корректной проверки URL нужен HTTP-сервер (не `file://`).

## Прототип (опционально)

```bash
cd prototype && npm i && npm run dev
```

Только для визуальной сверки; production не зависит от npm.

## CI перед merge

На ветке `develop` перед PR:

```bash
cd tests && npm i && npx playwright install chromium && npm test
python scripts/build-prod.py   # при изменениях production-файлов
```

## Чеклист перед деплоем

`MARKETING_SITE_SPEC.md` §10 + `docs/SPRINTS.md` + responsive-тесты на 375 / 768 / 1280 px.
