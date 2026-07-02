# PR workflow — правила pull request и CI

## Модель веток

| Ветка | Назначение | PR |
|-------|------------|-----|
| **develop** | Ежедневная разработка | PR из feature-веток → `develop` |
| **main** | Production / FTP | PR `develop` → `main` только после QA |

Feature-ветки: `feature/<кратко>`, `fix/<кратко>`, `content/<страница>`.

## Обязательные проверки CI

Workflow: `.github/workflows/ci.yml`

| Gate | Команда локально | Когда обязателен |
|------|------------------|------------------|
| E2E | `cd tests; npm test` | Любой PR в `develop` |
| Responsive | viewport **375 / 768 / 1280** (`docs/BREAKPOINTS.md`) | Любая правка `css/`, HTML |
| Build dist (опц.) | `python scripts/build-prod.py` | PR `develop` → `main`, не для dev |

CI **не зелёный** → merge запрещён (solo workflow: агент сообщает пользователю).

## Чеклист PR (develop)

- [ ] Изменения соответствуют `MARKETING_SITE_SPEC.md` или спека обновлена в том же PR
- [ ] **Figma:** сверка через MCP + pixel-perfect (если менялся UI)
- [ ] **Адаптивная вёрстка:** viewport **375 / 768 / 1280** — `docs/BREAKPOINTS.md`, `.cursor/rules/responsive-layout.mdc`
- [ ] Нет кода из `prototype/` (TSX/Tailwind/React) в production
- [ ] `js/config.js` — только placeholders, без реальных секретов
- [ ] Playwright e2e проходит локально
- [ ] Новые страницы добавлены в `sitemap.xml` (если публичные)

## Чеклист PR (develop → main)

- [ ] Все пункты develop-чеклиста
- [ ] `python scripts/build-prod.py` — успешно, `dist/` валиден
- [ ] `regpoint-site.zip` собран
- [ ] Jivo / Метрика — финальные ID (локально или через deploy config, не в git если секретно)
- [ ] Smoke на staging URL (если есть)

## Ревью для AI-агента

1. Прочитать diff относительно `MARKETING_SITE_SPEC.md`
2. Проверить responsive: mobile-first CSS, нет горизонтального скрoll на 375px
3. Запустить `tests/` локально
4. Не merge без явного «Proceed» от пользователя (см. skill lint-ci-mandatory)

## Связанные файлы

- `.github/pull_request_template.md`
- `.github/workflows/ci.yml`
- `docs/BRANCHES.md`
