# Sprint 3 — Спецификация: Контентные страницы + контакты (RU)

> Связано: `docs/SPRINTS.md` §3, `prototype/src/app/App.tsx` (`TechnologyPage`, `CompliancePage`, `HowItWorksPage`, `ScenariosPage`, `FaqPage`, `ContactsPage`), `docs/SITE_MAP.md`, `MARKETING_SITE_SPEC.md` §7.8–7.13.

**Цель спринта:** ~55% production-ready — все информационные RU-страницы (кроме articles/privacy/en) открываются с полным контентом из прототипа; header/footer links на «Технологии», «152-ФЗ», «Как работает», «Сценарии», «FAQ», «Контакты» больше не ведут на 404.

**DoD:** 6 новых HTML-страниц + CSS + JS + обновлённый `sitemap.xml` + e2e smoke; `/contacts/#demo` — layout и stub-форма (Jivo embed — Sprint 7).

---

## 1. Scope

| URL | Файл | Прототип | Приоритет |
|-----|------|----------|-----------|
| `/technology/` | `technology/index.html` | `TechnologyPage` | P0 |
| `/compliance-152fz/` | `compliance-152fz/index.html` | `CompliancePage` | P0 |
| `/how-it-works/` | `how-it-works/index.html` | `HowItWorksPage` | P0 |
| `/scenarios/` | `scenarios/index.html` | `ScenariosPage` | P0 |
| `/faq/` | `faq/index.html` | `FaqPage` | P0 |
| `/contacts/` | `contacts/index.html` | `ContactsPage` | P0 |
| `/contacts/#demo` | якорь `#demo` на contacts | `ContactsPage` id="demo" | P0 |

**Вне scope Sprint 3:**

- `/articles/` и slug-страницы — Sprint 5
- `/privacy/` — Sprint 4
- EN `/en/…` — Sprint 6
- Jivo embed формы на `#demo` (prod) — Sprint 7; в Sprint 3 — HTML-форма stub как в прототипе
- Figma export медиа / OG PNG — Sprint 8
- JSON-LD `FAQPage` на `/faq/` — желательно в Sprint 3 (см. §2.2); полный SEO baseline — Sprint 5

---

## 2. Общие требования (все 6 страниц)

### 2.1 Chrome

- Дублировать header / drawer / footer / contact modal / cookie banner из `products/index.html` (Sprint 1–2 шаблон).
- Абсолютные пути `/css/…`, `/js/…`, `/img/…`.
- Скрипты: `config`, `jivo`, `header`, `lang`, `contact`, `analytics`, `cookies`, `bootstrap` (+ page-specific).
- `body[data-page]`: `technology`, `compliance`, `how-it-works`, `scenarios`, `faq`, `contacts`.
- На странице contacts: `aria-current="page"` или визуальный active-state на nav-link «Контакты» (если уже есть pattern — переиспользовать).

### 2.2 SEO (из `PAGE_TITLES.ru` / `META_DESC`)

| page | `<title>` | meta description (канон из прототипа) |
|------|-----------|-------------------------------------|
| technology | Технологии Рег.Поинт — Docker, REST API, модульный монолит | Node.js, React, MySQL 8, Docker-compose. Модульный монолит с REST API. Развёртывание на Linux VPS. Без vendor lock-in SaaS. |
| compliance | 152-ФЗ в Рег.Поинт — персональные данные на вашем сервере | Шифрование ПД, audit log, согласия per-event, запрос удаления, self-hosted. Как Рег.Поинт помогает соблюдать 152-ФЗ на мероприятиях. |
| how-it-works | Как работает Рег.Поинт — от лицензии до первого check-in | Лицензия → Docker на VPS → настройка мероприятия → публичная регистрация → check-in. Пошаговая схема коробочного внедрения. |
| scenarios | Сценарии использования Рег.Поинт — конференции, промо, билеты | Как event-агентства и организаторы используют модули Рег.Поинт: конференции, BTL-акции, промо с чеками, продажа билетов. |
| faq | FAQ — частые вопросы о Рег.Поинт | Ответы: SaaS или коробка, где данные, цены, модули, 152-ФЗ, обновления, поддержка. |
| contacts | Контакты Рег.Поинт — демо, КП, поддержка | Запросите коммерческое предложение или демо. Чат поддержки. Рег.Поинт — коробочная платформа для мероприятий. |

- `canonical`: `https://reg-point.ru/…` (без hash для contacts)
- OG: `og:title`, `og:description`, `og:url`, `og:locale` ru_RU, `og:type` website
- `/faq/`: JSON-LD `FAQPage` — 8 вопросов из прототипа (дословно Q/A)
- Остальные страницы: schema опционально; Organization не дублировать на каждой

### 2.3 Responsive (`.cursor/rules/responsive-layout.mdc`)

- Mobile-first CSS в `css/pages.css`
- Таблицы (compliance, comparison, quick-select): `<768px` — `.table-scroll` + `overflow-x: auto`; caption или visually-hidden label
- Touch targets ≥ 44px на CTA, filter chips, accordion triggers
- Нет horizontal scroll на 375px (кроме intentional table scroll containers)
- Contacts layout: 1 col mobile → sidebar справа от `≥1280px` (grid `lg: 2/3 + 1/3` как в прототипе; tablet — stack)

### 2.4 CTA wiring

| Элемент | Действие |
|---------|----------|
| «Запросить КП / Демо», «Запросить демо», «Обсудить ваш сценарий» | `href="/contacts/#demo"` + `data-action="demo"` |
| «Запросить технические требования (PDF)» | `href="/contacts/#demo"` (PDF — offline deliverable; форма как канал запроса) |
| «Обсудить compliance…» | `href="/contacts/#demo"` |
| «Связаться», «Открыть чат», «Написать в поддержку» | `data-action="contact"` → modal |
| «Технологии подробнее» (how-it-works) | `href="/technology/"` |
| Module badge на scenarios | `href="/products/{slug}/"` |
| Ссылка на политику в checkbox формы | `href="/privacy/"` (404 OK до Sprint 4 — не блокер) |

### 2.5 Генерация HTML (опционально)

- Можно расширить `scripts/gen-sprint2-pages.py` → `gen-sprint3-pages.py` по тому же паттерну (chrome из `index.html` + `build_page()`).
- Допустима ручная вёрстка — главное: идентичный chrome и meta pattern.

---

## 3. `/technology/` — TechnologyPage

### 3.1 Hero (white, border-bottom)

- Label: «Архитектура»
- H1: «Технологии и архитектура»
- Lead: «**Рег.Поинт** — модульный монолит: одно deployable-приложение (SPA + API), доменные модули изолированы, контракт — HTTP REST.»

### 3.2 Tech stack cards (4 col @1280, 2 @768, 1 mobile)

| Карточка | Пункты |
|----------|--------|
| Инфраструктура | Docker-compose на Linux VPS (2+ GB RAM); MySQL 8 — данные на сервере клиента; HTTPS, runbook деплоя |
| Backend | Node.js 20, Express 4; REST API (`/api/…`), публичные `/api/public/*`; AES-256-GCM для ПД, audit log |
| Frontend | React 18, TypeScript, Vite; Публичные страницы регистрации; SSR-ready static |
| Интеграции | API ФНС kkt-online (Промо.Про); ЮKassa (Тикет.Поинт); OCR Tesseract.js (fallback) |

Иконки: SVG из `/img/icons/` или CSS-only (без lucide-react). Допустимы placeholder-иконки из существующего набора.

### 3.3 «Что это значит для вас как заказчика»

3 колонки @768+ (stack mobile):

| Заголовок | Текст |
|-----------|-------|
| Без vendor lock-in | Docker-образ… Смена сервера — перевыпуск лицензии (15 000 ₽). |
| Данные остаются у вас | MySQL 8… нет «звонка домой»… |
| Стандартный стек — нет чёрных ящиков | Node.js + MySQL + Docker… REST API задокументирован… |

### 3.4 VPS + Turnkey (2 col @768)

**Navy card — Минимальные требования к VPS:**

| Параметр | Значение |
|----------|----------|
| ОС | Ubuntu 22.04 LTS или Debian 12 |
| CPU | 2 vCPU (4 vCPU рекомендуется) |
| RAM | 2 GB (4 GB для Промо.Про с OCR) |
| Диск | 20 GB SSD (50 GB для production) |
| Сеть | Статический IP или домен с A-записью |
| HTTPS | Let's Encrypt — настраивается в runbook |

Footer card: «Хостеры РФ: Selectel, Timeweb Cloud, Beget VPS, МТС Cloud, Яндекс Cloud»

**Accent card — «Нет своего DevOps?»:** Turnkey 45 000 ₽ + CTA «Запросить технические требования (PDF)»

### 3.5 REST API block

- Текст про `/api/public/*`
- Tag chips: Bitrix24, amoCRM, 1С, Telegram Bot, Email / SMS, Webhook

---

## 4. `/compliance-152fz/` — CompliancePage

### 4.1 Hero (navy, light label)

- Label: «Правовое»
- H1: «Персональные данные на мероприятиях и **152-ФЗ**» (accent span)
- Lead: compliance-by-design — базовая функция каждого модуля

### 4.2 Two-column intro (white)

| Label | H2 | Текст |
|-------|-----|-------|
| Фундамент | Self-hosted — фундамент compliance | VPS заказчика, контроль бэкапов… |
| Договор | Соглашение об обработке ПД на мероприятие | Оператор, цели, политика per event… |

### 4.3 Compliance table (gray section)

Label «В каждом модуле», H2 «Что входит в compliance-стек»

| Функция | Описание |
|---------|----------|
| Шифрование | AES-256-GCM для чувствительных полей |
| Audit log | Журнал доступа к ПД (access_logs) |
| Согласие | Текст согласия на каждое мероприятие — ручной ввод оператора |
| Удаление | Публичный запрос участника на удаление ПД |
| Роли | Маскирование ПД для manager |
| Retention | Настраиваемый срок хранения |

CTA: «Обсудить compliance для вашей отрасли» → demo

---

## 5. `/how-it-works/` — HowItWorksPage

### 5.1 Hero

- Label: «Процесс»
- H1: «Как это работает»
- Lead: «От лицензии до первого check-in — пошаговая схема коробочного внедрения»

### 5.2 Timeline — 6 steps

| # | Title | Desc |
|---|-------|------|
| 01 | Выбор модулей | По задаче: регистрация, промо, чеки, билеты |
| 02 | Лицензия | Код активации + license.json — активация в кабинете director |
| 03 | Развёртывание | Docker-compose на VPS (ваш DevOps или наше внедрение) |
| 04 | Мероприятие | Создание, compliance-блок, брендинг |
| 05 | Регистрация | Публичная ссылка /event/:id — участники регистрируются онлайн |
| 06 | Check-in / отчёты | QR на площадке, экспорт CSV, attendance report |

CTA после steps: «Запросить демо»

### 5.3 Comparison table «Self-hosted vs SaaS»

3 columns: Параметр | Рег.Поинт (Self-hosted) | Типичный SaaS-регистратор

10 rows — дословно из прототипа (с ✓ / ✗ где в макете).

CTA row: «Запросить КП / Демо» + secondary «Технологии подробнее» → `/technology/`

---

## 6. `/scenarios/` — ScenariosPage

### 6.1 Hero

- Label: «Применение»
- H1: «Сценарии использования»
- Lead: «Как event-агентства и организаторы используют модули Рег.Поинт»

### 6.2 Module filter (JS)

Chips: «Все сценарии», «Рег.Поинт», «Промо.Поинт», «Промо.Про», «Тикет.Поинт»

- Toggle active chip (`.filter-chip.is-active`)
- Filter cards by `data-module` attribute
- Empty state: «Нет сценариев… Показать все»

### 6.3 Scenario cards (5 шт.)

Каждая карточка — 3 col @768: title+module | details checklist | compliance note

| title | module | moduleId | tag | compliance (кратко) |
|-------|--------|----------|-----|------------------------|
| Деловая конференция 500+ | Рег.Поинт | reg-point | B2B · корпоратив · форум | 152-ФЗ per-event… |
| BTL-акция в торговой сети | Промо.Поинт | promo-point | BTL · промо · sampling | Данные на сервере агентства… |
| «Приз за чек» — акция с верификацией | Промо.Про | promo-pro | promo · ФНС · антифрод | Полный audit trail… |
| Платный воркшоп / мастер-класс | Тикет.Поинт | ticket-point | билеты · ЮKassa · платёж | Модуль в разработке… |
| Pharma / banking event | Рег.Поинт | reg-point | regulated · 152-ФЗ · enterprise | Один DPA… |

Details lists — 5 пунктов каждый, дословно из прототипа.

Module badge → `/products/{moduleId}/`

### 6.4 Quick-select matrix

Таблица «Быстрый выбор модуля по задаче»: 6 rows × 5 cols (check / em-dash).

CTA: «Обсудить ваш сценарий»

---

## 7. `/faq/` — FaqPage

### 7.1 Hero

- H1: «Частые вопросы»
- Lead: «Ответы: SaaS или коробка, где данные, цены, модули, 152-ФЗ, обновления, поддержка.»

### 7.2 Accordion — 8 items

Переиспользовать `.accordion` из pricing (или общий `js/faq.js` с тем же API что `js/pricing.js` accordion).

| # | Q | A (сокращённо) |
|---|---|----------------|
| 1 | Рег.Поинт — это SaaS? | Нет, коробка на VPS… |
| 2 | Чем отличается от Eventbrite… | multi-tenant vs single-tenant… |
| 3 | Какие модули нужны для конференции? | Обычно Рег.Поинт… |
| 4 | Как обстоят дела с 152-ФЗ? | Compliance-стек без доплат… |
| 5 | Нужен ли отдельный сервер? | VPS 2 GB, Turnkey 45 000 ₽… |
| 6 | Как проходят обновления? | Подписка со 2-го года… |
| 7 | Можно ли интегрировать с CRM? | REST API, SKU от 80 000 ₽… |
| 8 | Где хранятся данные с формы на этом сайте? | Jivo (ООО «Живой Сайт», РФ)… |

- Один открытый item; `aria-expanded` на trigger
- JSON-LD FAQPage в `<head>`

---

## 8. `/contacts/` — ContactsPage

### 8.1 Hero

- H1: «Контакты»
- Lead: «Запросите коммерческое предложение или демо. Чат поддержки. Email.»

### 8.2 Layout (grid)

**Main column (2/3) — `#demo` block:**

- H2: «Запросить КП / Демо»
- Sub: «Ответим в течение 1–2 рабочих дней»
- **Stub notice** (как прототип): «Prototype stub. В продакшне — embed Jivo Contact Form…» — оставить до Sprint 7
- Form fields (§4.4 MARKETING_SITE_SPEC):
  - Имя*, Компания* (row)
  - Email*, Телефон (row)
  - Интересующий модуль* (select: Рег.Поинт, Промо.Поинт, Промо.Про, Тикет.Поинт, Не знаю)
  - Комментарий (textarea)
  - Checkbox согласия с ПД* → link `/privacy/`
  - Submit «Отправить заявку»
- On submit (JS stub): hide form, show success state «Заявка отправлена»

**Sidebar (1/3):**

- «Связаться напрямую» — button «Открыть чат» (`data-action="contact"`)
- Info card: время ответа (рабочие / вне часов)
- Info card: данные формы через Jivo

### 8.3 Support vs Presales (2 col @768)

**Для существующих клиентов — Техническая поддержка:**

- 3 bullet SLA items (базовая / расширенный / приоритет — цены из прототипа)
- CTA «Написать в поддержку» → contact modal

**Для новых клиентов — Предпродажные вопросы:**

- 3 bullets (демо бесплатно, КП 1–2 дня, пилот)
- CTA «Заполнить форму выше» → smooth scroll to `#demo` (`js/contacts.js`)

### 8.4 Anchor `#demo`

- `id="demo"` на блоке формы
- При загрузке `/contacts/#demo` — scroll into view (optional `js/contacts.js`)
- Все site-wide CTA `href="/contacts/#demo"` должны попадать в форму

---

## 9. CSS (`css/pages.css`)

Новые BEM-блоки (mobile-first):

- `.tech-card`, `.tech-card__icon`, `.tech-card-grid`
- `.client-benefits`, `.client-benefits__col`
- `.vps-spec`, `.vps-spec__row`, `.vps-spec--navy`
- `.turnkey-card`, `.api-tags`, `.api-tag`
- `.compliance-hero`, `.compliance-hero--navy`
- `.section-heading` (label + h2) — если ещё нет, переиспользовать `.page-hero__label` pattern
- `.steps-list`, `.step-card`, `.step-card__num`
- `.compare-table`, `.compare-table__self-col`
- `.scenario-card`, `.scenario-card__col`, `.filter-chips`, `.filter-chip`
- `.module-matrix` (quick-select table)
- `.contacts-layout`, `.contacts-sidebar`, `.contacts-form`, `.contacts-form__success`
- `.contacts-support-grid`, `.contacts-support-card`

Media queries:

- `@media (min-width: 768px)` — 2-col grids, table layout
- `@media (min-width: 1280px)` — 4-col tech cards, contacts sidebar sticky optional

---

## 10. JavaScript

| Файл | Назначение |
|------|------------|
| `js/faq.js` | FAQ accordion (можно вынести shared accordion из `pricing.js` позже; на Sprint 3 — дублировать или общий helper) |
| `js/scenarios.js` | Module filter chips |
| `js/contacts.js` | Demo form stub submit, `#demo` scroll on load, «Заполнить форму выше» |
| `js/bootstrap.js` | init `SiteFaq`, `SiteScenarios`, `SiteContacts` |

**Accordion reuse:** предпочтительно рефактор `js/pricing.js` → shared `js/accordion.js` **только если** diff минимален; иначе копия логики в `faq.js` (Sprint 4 refactor).

---

## 11. `sitemap.xml`

Добавить URL (приоритет / changefreq — как products/pricing):

```xml
<url><loc>https://reg-point.ru/technology/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://reg-point.ru/compliance-152fz/</loc>...</url>
<url><loc>https://reg-point.ru/how-it-works/</loc>...</url>
<url><loc>https://reg-point.ru/scenarios/</loc>...</url>
<url><loc>https://reg-point.ru/faq/</loc>...</url>
<url><loc>https://reg-point.ru/contacts/</loc><priority>0.9</priority></url>
```

Также добавить существующие Sprint 2 URL если ещё не в sitemap (products, pricing).

---

## 12. E2E (`tests/e2e/content-contacts.spec.js`)

| ID | Сценарий | Ожидание |
|----|----------|----------|
| T-01 | GET `/technology/` | H1 «Технологии и архитектура», 4 tech cards |
| T-02 | VPS block | «Ubuntu 22.04» visible |
| T-03 | Tech CTA | `a[href="/contacts/#demo"]` |
| C-01 | GET `/compliance-152fz/` | H1 содержит «152-ФЗ» |
| C-02 | Compliance table | row «Шифрование» + «AES-256-GCM» |
| H-01 | GET `/how-it-works/` | H1 «Как это работает», step «01» |
| H-02 | Comparison table | «Self-hosted vs SaaS» visible |
| H-03 | Link to technology | `a[href="/technology/"]` |
| S-01 | GET `/scenarios/` | H1 «Сценарии использования», ≥5 scenario cards |
| S-02 | Filter chip | click «Промо.Про» → cards filtered (count ≤ total) |
| S-03 | Module link | card link → `/products/promo-pro/` 200 |
| F-01 | GET `/faq/` | H1 «Частые вопросы» |
| F-02 | Accordion | click Q1 → answer visible |
| F-03 | 8 questions | `.accordion__item` count === 8 |
| CT-01 | GET `/contacts/` | H1 «Контакты», `#demo` exists |
| CT-02 | Form submit | fill required → success message |
| CT-03 | Contact chat btn | `[data-action="contact"]` visible |
| CT-04 | Hash demo | goto `/contacts/#demo` → `#demo` in viewport |
| NAV-01 | Header links | from `/` click «152-ФЗ» → 200, correct H1 |

**Responsive:** smoke 375px — no `overflow-x` на `/scenarios/` (filter wrap) и `/contacts/` (form stack).

Расширить `tests/e2e/responsive.spec.js` — добавить 1–2 URL из Sprint 3 в overflow gate (optional P1).

---

## 13. Figma (pixel-perfect)

Перед финальным merge — сверка через Figma MCP:

- fileKey: `mV4djwXG8q7KnkaTq9rRAy`
- Frames: Technology, 152-FZ, How it works, Scenarios, FAQ, Contacts
- Допуск ±2px на fluid; layout-tier только 768 / 1280

При расхождении прототип vs Figma — **Figma wins** (visual), **прототип wins** (тексты).

---

## 14. Документация после закрытия

- [ ] `docs/SPRINTS.md` — Sprint 3 tasks `[x]`, статус ✅, summary ~55%
- [ ] `docs/PRODUCTION_READINESS.md` — ~55%
- [ ] `docs/SITE_MAP.md` — статус Sprint 3 ✅
- [ ] `docs/CONTENT_SOURCES.md` — content pages ✅
- [ ] `sitemap.xml` — все RU URLs до Sprint 3

---

## 15. QA checklist (ручной)

- [ ] 375 / 768 / 1280 — все 6 URL
- [ ] Header nav: Technology, 152-ФЗ, How it works, Scenarios, FAQ, Contacts → 200
- [ ] Footer links на те же страницы → 200
- [ ] Contact modal opens on all 6 pages
- [ ] `/contacts/#demo` from header CTA on home/products/pricing
- [ ] Scenarios filter + matrix table readable on mobile
- [ ] FAQ accordion keyboard accessible (Enter/Space on trigger)
- [ ] Playwright green: `cd tests; npm test`

**Commit message (when requested):** `feat(sprint-3): content pages RU + contacts layout`

---

## 16. Порядок разработки (рекомендуемый)

1. **Static pages без JS:** technology, compliance, how-it-works — быстрый win, проверка chrome
2. **FAQ** — accordion + JSON-LD (переиспользовать pricing pattern)
3. **Scenarios** — самая сложная вёрстка + filter JS
4. **Contacts** — form stub + sidebar + support sections
5. **sitemap.xml** + e2e
6. **Responsive pass** 375/768/1280 на всех 6

Оценка: ~6 HTML, ~200–350 строк CSS, ~3 JS modules, ~1 e2e file.
