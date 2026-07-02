## Summary

<!-- Что и зачем. Ссылка на MARKETING_SITE_SPEC.md § если менялись тексты/маршруты -->

## Test plan

- [ ] `cd tests; npm test` — Playwright e2e
- [ ] Responsive: 375 / 768 / 1280 px — без horizontal scroll
- [ ] Сверка с `MARKETING_SITE_SPEC.md` (или спека обновлена в PR)
- [ ] Нет кода из `prototype/` (TSX/Tailwind) в production

## Design checklist (обязательно при правках HTML/CSS)

- [ ] Figma MCP: `get_design_context` + `get_screenshot` для затронутых фреймов
- [ ] Pixel-perfect сверка (допуск ±2px на fluid)
- [ ] Прототип: поведение/UX сверено с `prototype/src/app/App.tsx`
- [ ] Header: burger `<1280px`, inline nav `≥1280px`
- [ ] Touch targets ≥ 44px
- [ ] Модалки: max-height 92vh, scroll на маленьких экранах
- [ ] Таблицы pricing (если затронуты): stack или scroll на mobile

## Integrations (если затронуты)

- [ ] Jivo — только placeholder в `js/config.js`, без секретов в git
- [ ] Яндекс.Метрика — после cookie consent

## Release (только PR develop → main)

- [ ] `python scripts/build-prod.py`
- [ ] `dist/` + `regpoint-site.zip` проверены
