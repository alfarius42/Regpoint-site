# Тест-кейсы — Sprint 1 (Global chrome + главная RU)

Связано: `docs/SPRINTS.md` §1, `tests/e2e/home.spec.js`, `tests/e2e/header-footer.spec.js`, `tests/e2e/responsive.spec.js`.

**Окружение:** локально `npx serve .` или Playwright CI (375 / 768 / 1280 px).

---

## 1. Header

| ID | Сценарий | Шаги | Ожидание | Автотест |
|----|----------|------|----------|----------|
| H-01 | Sticky header | Открыть `/`, прокрутить вниз | Header остаётся navy, sticky | — |
| H-02 | Desktop nav ≥1280 | Viewport 1280px | Видны: Продукты, Цены, Технологии, 152-ФЗ, Как работает, Сценарии, FAQ, Статьи, Контакты | `header-footer.spec.js` |
| H-03 | Dropdown «Продукты» | Hover или click на «Продукты» | 5 пунктов: обзор + 4 модуля | `header-footer.spec.js` |
| H-04 | CTA header | Desktop | «Связаться» + «Запросить КП / Демо» | — |
| H-05 | Lang switcher | Desktop | RU active, EN → `/en/` | `header-footer.spec.js` |
| H-06 | Burger mobile | Viewport 375px, tap ☰ | Drawer открывается, inline nav скрыт | `responsive.spec.js`, `header-footer.spec.js` |
| H-07 | Drawer close | Tap ✕ или overlay | Drawer закрывается | — |

---

## 2. Footer

| ID | Сценарий | Шаги | Ожидание | Автотест |
|----|----------|------|----------|----------|
| F-01 | CTA band | Scroll to footer | «Готовы обсудить ваш сценарий?» + 2 CTA | `header-footer.spec.js` |
| F-02 | 4 колонки desktop | Viewport 1280px | Продукты / Компания / Правовое + бренд | `header-footer.spec.js`, `responsive.spec.js` |
| F-03 | Copyright | Footer bottom | © 2026 Рег.Поинт | `header-footer.spec.js` |
| F-04 | Links valid | Click product links | href на `/products/...` (404 OK до Sprint 2) | `header-footer.spec.js` |

---

## 3. Главная `/`

| ID | Сценарий | Шаги | Ожидание | Автотест |
|----|----------|------|----------|----------|
| HOME-01 | Hero H1 | Open `/` | H1 с «вашем», 2 CTA | `home.spec.js` |
| HOME-02 | Hero image | Desktop 1280 | `.hero__media img` visible | `home.spec.js` |
| HOME-03 | Trust 3 col | Tablet 768 | 3 trust items | `home.spec.js` |
| HOME-04 | Not SaaS | Scroll | Архитектура + check-list + code panel | — |
| HOME-05 | Product cards | Scroll | 4 карточки модулей | `home.spec.js` |
| HOME-06 | 152-FZ teaser | Scroll | Dark section + 4 feature tiles | `home.spec.js` |
| HOME-07 | Steps | Scroll | 3 шага «Как начать» | `home.spec.js` |
| HOME-08 | Mini FAQ | Scroll | 4 Q&A | `home.spec.js` |
| HOME-09 | Articles teaser | Scroll | 3 article cards | `home.spec.js` |

---

## 4. Contact modal

| ID | Сценарий | Шаги | Ожидание | Автотест |
|----|----------|------|----------|----------|
| C-01 | Open modal | Click «Связаться» | Modal visible | `home.spec.js` |
| C-02 | Jivo chat | Click «Онлайн-чат» | Modal closes; jivo_api.open or redirect demo | — |
| C-03 | Telegram | Click Telegram | Opens t.me/ZaharMishiev | — |
| C-04 | Demo from modal | Click «Запросить КП / Демо» in modal | Navigate `/contacts/#demo` | — |

---

## 5. Responsive gate (mandatory)

| Viewport | Проверки | Автотест |
|----------|----------|----------|
| 375px | No horizontal scroll, burger, footer stack | `responsive.spec.js` |
| 768px | Trust 3 col, footer 2 col | `responsive.spec.js`, `home.spec.js` |
| 1280px | Full nav, hero 2 col, footer 4 col | `responsive.spec.js`, `header-footer.spec.js` |

---

## 6. PR checklist (перед merge)

- [ ] `cd tests; npm test` — green
- [ ] Ручной smoke H-07, C-02, C-03 на локальном serve
- [ ] Сверка ключевых блоков с Figma (hero, header, footer CTA)
- [ ] Обновить `docs/SPRINTS.md` — Sprint 1 tasks `[x]`

---

## Открытие PR

**Base:** `develop`  
**Title:** `feat(sprint-1): global chrome + home page RU`

**Body (шаблон):**
- Реализованы header/footer template, полная главная, contact modal
- Добавлены e2e: `home.spec.js`, `header-footer.spec.js`
- Тест-кейсы: `docs/TEST_CASES_SPRINT1.md`
- Hero: placeholder `img/hero.svg` (webp — Sprint 8)

**Test plan:** прогнать Playwright; проверить 375/768/1280 вручную по таблицам выше.
