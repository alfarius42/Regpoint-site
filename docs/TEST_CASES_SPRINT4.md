# Sprint 4 — Спецификация: Privacy, cookie, shared JS (RU)

> Связано: `docs/SPRINTS.md` §4, `prototype/src/app/App.tsx` (`PrivacyPage`, `CookieBanner`), `docs/LEGAL_ENTITY.md`, `MARKETING_SITE_SPEC.md` §4.6, §7.14, `docs/SITE_MAP.md`.

**Цель спринта:** ~65% production-ready — legal-страница `/privacy/` live; cookie-flow завершён (Метрика только после consent); общие JS-модули и head-pattern унифицированы.

**DoD:** `/privacy/` открывается (не 404); footer/checkbox/form ссылки работают; cookie banner на всех публичных RU-страницах; e2e `privacy-cookies.spec.js` green; `sitemap.xml` включает `/privacy/`.

---

## 1. Scope

### 1.1 В scope

| Артефакт | Файл / модуль | Прототип / Figma | Приоритет |
|----------|---------------|------------------|-----------|
| `/privacy/` | `privacy/index.html` | `PrivacyPage` | **P0** |
| Cookie banner (global) | HTML на всех страницах + `css/components.css` | `CookieBanner` | **P0** |
| Cookie consent logic | `js/cookies.js` | `acceptCookie()` + localStorage | P0 |
| Metrika deferred | `js/analytics.js` + `js/config.js` | §4.6 | P0 |
| SEO helper | `js/seo.js` | optional JSON-LD per `data-page` | P1 |
| Head meta template | `docs/HTML_HEAD_TEMPLATE.md` | copy из `gen-sprint3-pages.py` | P1 |
| Sitemap | `sitemap.xml` | — | P0 |
| E2E | `tests/e2e/privacy-cookies.spec.js` | — | P0 |

### 1.2 Вне scope Sprint 4

- `/articles/` — Sprint 5
- EN `/en/privacy/` — Sprint 6
- Jivo prod embed на `#demo` — Sprint 7
- OG PNG для privacy — Sprint 8
- Email оператора в privacy (ожидается Q3) — placeholder → ссылка на `/contacts/`
- Адрес ИП на privacy — по мере поступления карточки

---

## 2. Страницы и референсы для pixel-perfect

### 2.1 Новая страница (нужен реф)

| # | URL | Файл | Что сверять | Viewports |
|---|-----|------|-------------|-----------|
| **1** | `/privacy/` | `privacy/index.html` | Hero (H1 + дата), 8 секций, таблица cookie (§6), header/footer | **375 / 768 / 1280** |

**Figma:** отдельный фрейм «Политика конфиденциальности» (если есть) или layout-tier как у FAQ/compliance: `max-w-4xl` (~896px), hero с border-bottom, секции с `border-top` между блоками.

**Прототип:** `PrivacyPage` в `App.tsx` — структура и spacing; **тексты править** по `docs/LEGAL_ENTITY.md` (см. §3).

### 2.2 Глобальный UI (нужен реф overlay, не отдельная страница)

| # | Артефакт | Где смотреть | Что сверять | Viewports |
|---|----------|--------------|-------------|-----------|
| **2** | **Cookie banner** | Любая страница, `localStorage` без consent | Фон `#243954`, текст white/80, ссылка на privacy, кнопки «Принять» + «Только необходимые», sticky bottom | **375 / 1280** |
| **3** | **Cookie table** | `/privacy/` §6 | 4 колонки, header `#e1eff2`, border `#b3b3b3`, mobile scroll | **375 / 1280** |

> **Gap production vs прототип/Figma:** сейчас banner светлый (`--color-bg`), одна кнопка «Принять». В Sprint 4 — привести к `CookieBanner` из прототипа (navy, две кнопки), **без упоминания GA4** в тексте.

### 2.3 Touchpoints (реф опционально — мелкий polish)

| # | URL | Элемент | Зачем |
|---|-----|---------|-------|
| 4 | `/contacts/` | Checkbox «Согласен с обработкой ПД» + ссылка `/privacy/` | Ссылка перестаёт вести на 404 |
| 5 | Любая страница | Footer → «Правовое» → «Политика конфиденциальности» | Проверка active/hover |
| 6 | `/` (или любая) | Contact modal | Без изменений в Sprint 4, если реф `pop-ups` уже есть |

### 2.4 Страницы без pixel-perfect (только проверить banner + scripts)

Cookie banner и скрипты должны быть **идентичны** на всех RU-страницах. Отдельный PP-реф не нужен — smoke на 2–3 страницах достаточно.

| URL | Файл | Cookie banner сейчас |
|-----|------|----------------------|
| `/` | `index.html` | ✅ |
| `/products/` | `products/index.html` | ✅ |
| `/products/reg-point/` | `products/reg-point/index.html` | ✅ |
| `/products/promo-point/` | `products/promo-point/index.html` | ✅ |
| `/products/promo-pro/` | `products/promo-pro/index.html` | ✅ |
| `/products/ticket-point/` | `products/ticket-point/index.html` | ✅ |
| `/pricing/` | `pricing/index.html` | ✅ |
| `/technology/` | `technology/index.html` | ✅ |
| `/compliance-152fz/` | `compliance-152fz/index.html` | ✅ |
| `/how-it-works/` | `how-it-works/index.html` | ✅ |
| `/scenarios/` | `scenarios/index.html` | ✅ |
| `/faq/` | `faq/index.html` | ✅ |
| `/contacts/` | `contacts/index.html` | ✅ |
| `/privacy/` | `privacy/index.html` | ⬜ создать |
| `/404.html` | `404.html` | ⬜ **добавить** (минимальный chrome или только banner — решить при реализации) |

**Итого для рефов от заказчика:** минимум **2 артефакта** — **`/privacy/` (×3 viewport)** и **cookie banner overlay (×2 viewport)**. Опционально: `/contacts/` checkbox, footer link.

---

## 3. Контент `/privacy/` — канон vs прототип

Источник структуры: `PrivacyPage` (`App.tsx`). Источник фактов: `docs/LEGAL_ENTITY.md`. Figma — визуал.

### 3.1 SEO

| Поле | Значение |
|------|----------|
| `<title>` | Политика конфиденциальности \| Рег.Поинт |
| meta description | Политика обработки персональных данных сайта Рег.Поинт. Оператор, цели, Jivo, cookie, права субъекта. |
| canonical | `https://reg-point.ru/privacy/` |
| `body[data-page]` | `privacy` |
| JSON-LD | `WebPage` (inline или через `js/seo.js`) — опционально |

### 3.2 Hero

- **H1:** Политика конфиденциальности
- **Подзаголовок:** Последнее обновление: январь 2026

Layout: `.page-hero` + `.container--narrow` (max-width 48rem / 896px), border-bottom как в прототипе.

### 3.3 Секции (8 блоков)

| § | Заголовок | Текст production (отличия от прототипа) |
|---|-----------|----------------------------------------|
| 1 | Оператор сайта | ИП **Мельникова Ксения Антоновна**, ИНН **644917769371**, ОГРНИП **325508100578539**. Сайт **reg-point.ru**. *(прототип: ООО «Рег.Поинт» — заменить)* |
| 2 | Цели обработки персональных данных | Заявки КП/демо, чат/поддержка, аналитика (**Яндекс.Метрика**, счётчик **110315704**). *(убрать GA4)* |
| 3 | Правовые основания | Согласие субъекта ПД, ст. 6 ч. 1 п. 1 152-ФЗ — **как в прототипе** |
| 4 | Сроки хранения | 3 года / до отзыва; Jivo — по политике Jivo — **как в прототипе** |
| 5 | Jivo как обработчик ПД | ООО «Живой Сайт», РФ, серверы в РФ, DPA — **как в прототипе** |
| 6 | Cookie и аналитика | Cookie + **только Яндекс.Метрика**; баннер при первом визите. *(убрать GA4)* + **таблица ниже** |
| 7 | Права субъекта ПД | Доступ, исправление, удаление, отзыв — запрос через **<a href="/contacts/">Контакты</a>** |
| 8 | Контакт ответственного | Email ⬜ когда будет (`SITE_CONFIG.privacyEmail`); interim: форма на `/contacts/` или Jivo-чат |

### 3.4 Таблица cookie (после §6)

| Тип | Назначение | Срок | Отключить |
|-----|------------|------|-----------|
| Необходимые | Работа сайта, сессия, lang-cookie | Сессия | Нельзя — критичны для работы |
| Аналитические | Яндекс.Метрика — посещения, вебвизор | 1 год | Через баннер cookie |
| ~~Аналитические~~ | ~~Google Analytics 4~~ | — | **Строку удалить** |
| Функциональные | Jivo — чат, сохранение диалога | 1 год | Через баннер cookie |

Разметка: `.table-scroll` + `.pricing-table` (reuse compliance table styles) или новый `.privacy-table`.

---

## 4. Cookie banner — поведение и визуал

### 4.1 HTML (target, из прототипа)

```html
<div class="cookie-banner" id="cookie-banner" hidden>
  <div class="container cookie-banner__inner">
    <p class="cookie-banner__text">
      Мы используем cookie для аналитики (Яндекс.Метрика).
      Данные обрабатываются согласно
      <a href="/privacy/">Политике конфиденциальности</a>.
      Заявки обрабатываются через Jivo (РФ, 152-ФЗ).
    </p>
    <div class="cookie-banner__actions">
      <button type="button" class="btn btn--white" id="cookie-accept">Принять</button>
      <button type="button" class="btn btn--outline-on-dark" id="cookie-essential">Только необходимые</button>
    </div>
  </div>
</div>
```

### 4.2 CSS (Figma / прототип)

| Token | Значение |
|-------|----------|
| Background | `#243954` (`--color-primary`) |
| Text | white / 80% opacity |
| Link | `#e1eff2` (`--color-accent`), underline |
| Border top | white 15% |
| z-index | ≥ 400 (поверх sticky bar pricing) |
| Layout mobile | column, gap 16px |
| Layout ≥768px | row, space-between, align center |

### 4.3 JS (`js/cookies.js`)

| Событие | Действие |
|---------|----------|
| Первый визит (нет `localStorage.cookie-consent`) | Показать banner |
| «Принять» | `localStorage = accepted` → hide banner → `SiteAnalytics.loadMetrika()` |
| «Только необходимые» | `localStorage = essential` → hide banner → **не** грузить Метрику |
| Повторный визит `accepted` | Banner hidden, Metrika load on init |
| Повторный визит `essential` | Banner hidden, Metrika **не** грузить |

Ключ: `cookie-consent` = `accepted` | `essential`.

### 4.4 Metrika (`js/analytics.js`)

- ID: `110315704` из `js/config.js`
- `metrikaRequiresConsent: true` — не вызывать `ym()` до consent
- CI/e2e: pre-set `localStorage` или mock (как в Sprint 1–3 tests)

---

## 5. Shared modules

### 5.1 `js/seo.js` (P1)

- `window.SiteSeo.init()` из `bootstrap.js`
- Если на странице **нет** inline `application/ld+json` — inject по `body[data-page]`:
  - `privacy` → `WebPage`
  - (остальные типы — Sprint 5+)
- Не дублировать schema, если script уже в `<head>`

### 5.2 Head meta pattern

Документ `docs/HTML_HEAD_TEMPLATE.md`:

- charset, viewport, title, description, canonical
- OG quartet + favicon block + CSS chain
- optional JSON-LD block
- Шаблон из `scripts/gen-sprint3-pages.py` → `build_page()`

Опционально: `scripts/gen-sprint4-privacy.py` по тому же паттерну.

### 5.3 Bootstrap

`js/bootstrap.js` — добавить `SiteSeo.init()` если модуль создан.

---

## 6. Chrome (privacy page)

Как Sprint 3:

- Header / drawer / footer / contact modal — из `faq/index.html` или generator
- Scripts: `config`, `jivo`, `header`, `lang`, `contact`, `analytics`, `cookies`, `bootstrap` (+ `seo` если есть)
- Абсолютные пути `/css/`, `/js/`, `/img/`

---

## 7. Responsive

| Viewport | Privacy | Cookie banner |
|----------|---------|---------------|
| **375** | Single column, table horizontal scroll in `.table-scroll`, padding 16px | Stack: text → buttons full width |
| **768** | Same, wider container padding 24px | Row layout |
| **1280** | Content max ~896px centered | Row, max-width container 80rem |

Touch targets кнопок banner ≥ 44×44px.

---

## 8. Internal links (регрессия)

| Откуда | Куда | Проверка |
|--------|------|----------|
| Footer «Политика конфиденциальности» | `/privacy/` | 200, H1 |
| Cookie banner link | `/privacy/` | 200 |
| `/contacts/` checkbox label | `/privacy/` | 200 |
| `/faq/` Q8 (Jivo) | упоминание политики | текст OK |

---

## 9. E2E — `tests/e2e/privacy-cookies.spec.js`

| ID | Сценарий | Assert |
|----|----------|--------|
| P-01 | GET `/privacy/` | H1 «Политика конфиденциальности», 8 секций h2 |
| P-02 | Privacy operator block | ИНН 644917769371, ОГРНИП 325508100578539 |
| P-03 | Privacy no GA4 | Текст страницы не содержит «Google Analytics» |
| P-04 | Privacy cookie table | 3 data rows (без GA4), 4 columns |
| P-05 | Footer link | Click → `/privacy/` |
| C-01 | First visit (clear storage) | `#cookie-banner` visible |
| C-02 | Accept | Banner hidden, `localStorage` = accepted |
| C-03 | Essential only | Banner hidden, Metrika script **not** injected (check no `mc.yandex.ru/metrika/tag.js` or mock) |
| C-04 | Return visit accepted | Banner hidden on `/` |
| C-05 | Privacy link in banner | href `/privacy/` |
| R-01 | No horizontal overflow `/privacy/` @ 375 | scrollWidth OK |

---

## 10. Definition of Done

- [ ] `privacy/index.html` — контент §3, chrome §6
- [ ] Cookie banner обновлён (визуал Figma + 2 кнопки + без GA4) на **14** HTML (13 + 404 или осознанное исключение)
- [ ] `js/cookies.js` — `essential` vs `accepted`
- [ ] `js/analytics.js` — Metrika только после `accepted`
- [ ] `sitemap.xml` — `<loc>https://reg-point.ru/privacy/</loc>`
- [ ] `docs/HTML_HEAD_TEMPLATE.md` — head pattern
- [ ] `js/seo.js` + bootstrap (P1)
- [ ] `tests/e2e/privacy-cookies.spec.js` — green
- [ ] `docs/SPRINTS.md` §4 — чеклисты `[x]`
- [ ] Pixel-perfect `/privacy/` + cookie banner — после рефов от заказчика

---

## 11. Чеклист рефов от заказчика

Положить в `Pixelperfect-referance/` (как Sprint 2–3):

| Файл (предложение) | Содержание |
|--------------------|------------|
| `privacy-375.jpg` | `/privacy/` mobile |
| `privacy-768.jpg` | `/privacy/` tablet (опционально) |
| `privacy-1280.jpg` | `/privacy/` desktop |
| `cookie-banner-375.jpg` | Banner overlay, first visit |
| `cookie-banner-1280.jpg` | Banner desktop row |
| `privacy-table-375.jpg` | §6 table scroll (опционально) |

Figma node (если есть отдельный фрейм): указать `node-id` в PR / комментарии к рефу.
