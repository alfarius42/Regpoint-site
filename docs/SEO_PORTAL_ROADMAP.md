# SEO-портал Reg.Point — roadmap и ТЗ

> **Статус:** принято, scope v2 (2026-07-05).  
> **Cap ближней перспективы:** **100 URL** в sitemap. Всё сверх — backlog.  
> **Связано:** `MARKETING_SITE_SPEC.md` §14, `docs/SEO_PORTAL_TODO.md`, `docs/SITE_MAP.md`.

---

## 1. Цель (v2)

Превратить сайт в **keyword-first SEO-портал сценариев** — без раздувания до 300+ страниц на старте.

| Приоритет | Что |
|-----------|-----|
| **#1 Keyword-first** | У каждой из 100 URL — один unique primary keyword; без keyword страница не публикуется |
| **#2 Сценарии** | Главный прирост — `/scenarios/{slug}/` (коммерческий intent) |
| **#3 От существующего** | 28 URL не трогаем; усиливаем SEO-copy и перелинковку; новые — только где hub не закрывает keyword |
| **#4 Cap 100** | 28 existing + 72 new = 100. Дальше — только backlog |

| Задача | KPI |
|--------|-----|
| Органический трафик | Impressions/clicks по 4 кластерам в GSC |
| Покрытие intent | Отдельный scenario landing на P0/P1 запрос |
| Инженерный тон | Сценарии ссылаются на `/technology/`, `/how-it-works/`, статьи |
| Перелинковка | `content/pages.json` + `js/internal-links.js` |

**Backlog (101+):** оставшиеся features, knowledge, persona-дубли, EN, industry verticals, 300+ scale — `docs/SEO_PORTAL_TODO.md` §Backlog.

---

## 2. Стратегия «от существующего»

### 2.1 Не создавать новую страницу, если keyword уже закрыт

| Primary keyword | Владелец (existing) | Новая страница? |
|-----------------|---------------------|-----------------|
| self hosted / on premise | `/how-it-works/` | ❌ усилить copy |
| 152-ФЗ | `/compliance-152fz/` | ❌ |
| docker мероприятие vps | `/articles/docker-vps/` | ❌ |
| QR check-in конференция | `/articles/qr-check-in/` | ⚠️ commercial intent → `/scenarios/check-in/` |
| проверка чека ФНС промо | `/articles/promo-fns/` | ⚠️ commercial → `/scenarios/receipt-verification/` |
| OCR чеков | `/articles/ocr-fallback/` | ❌ |
| импорт участников excel | `/articles/import-participants/` | ❌ |
| как выбрать регистрацию saas | `/articles/self-hosted-vs-saas/` | ❌ |
| платформа регистрации | `/products/reg-point/` | ❌ |
| промоакция с чеками | `/products/promo-pro/` | ⚠️ commercial → `/scenarios/promo/` |
| стоимость регистрации | `/articles/cost-of-registration/` + `/pricing/` | ❌ |

**Правило:** статья = information intent; scenario = commercial intent. Не дублировать primary keyword.

### 2.2 Роль existing hub-страниц

| URL | Роль | Кластер |
|-----|------|---------|
| `/` | Бренд + «сервис регистрации мероприятий» | Регистрация |
| `/scenarios/` | **Hub сценариев** (URL не менять) | Все |
| `/products/reg-point/` | Product hub | Регистрация |
| `/products/promo-point/`, `/promo-pro/` | Product hub | Промо |
| `/products/ticket-point/` | Product hub | Билеты |
| `/technology/` | Tech hub | Технологии |
| `/how-it-works/` | Self-hosted / deployment hub | Технологии |
| `/compliance-152fz/` | 152-ФЗ hub | Технологии |
| `/scenarios/` (контент) | 5 карточек из прототипа → ссылки на child | — |
| `/articles/*` (12) | Information intent + перелинковка на scenarios | Все |
| `/faq/`, `/pricing/`, `/contacts/` | Конверсия | Все |

### 2.3 Прототип → scenario child

| Карточка на `/scenarios/` | Scenario URL | Primary keyword |
|---------------------------|--------------|-----------------|
| Деловая конференция 500+ | `/scenarios/conference-registration/` | регистрация на конференцию |
| BTL-акция в торговой сети | `/scenarios/fmcg-promo/` | промоакция FMCG |
| «Приз за чек» | `/scenarios/receipt-verification/` | проверка чеков ФНС |
| Платный воркшоп | `/scenarios/ticketed-event/` | продажа билетов на мероприятие |
| Pharma / banking event | `/scenarios/enterprise-compliance/` | регистрация мероприятия 152-ФЗ |

---

## 3. Бюджет 100 URL

| Слой | Кол-во | Действие |
|------|--------|----------|
| **Existing** | **28** | Keyword-first refresh (Title, H1, FAQ, tags) |
| **Scenarios** `/scenarios/{slug}/` | **52** | Новые commercial landings |
| **Technology** child | **8** | Только gaps (не дублировать `/how-it-works/`, `/compliance-152fz/`) |
| **Features** `/features/{slug}/` | **8** | hub + 7; поддержка scenarios |
| **Cases** `/cases/{slug}/` | **4** | hub + 3 demo |
| **Итого** | **100** | |

> **Нет в cap 100:** `/knowledge/*` (новый раздел), `/solutions/*` (используем `/scenarios/`), 26+ features, 10+ technology child, persona-дубли — backlog.

---

## 4. Принципы

1. Existing **не удаляется**, URL **не меняется**.
2. **Keyword-first:** primary keyword → Title → H1 → FAQ → body.
3. **Сценарии first:** 52 из 72 новых URL — `/scenarios/`.
4. **Не плодить:** article и scenario — разные intent, один primary keyword.
5. Перелинковка через **tags** в `pages.json`.
6. Cap **100** — жёсткий; новая страница = выбытие из backlog или замена lowest-priority.

---

## 5. SEO-кластеры → scenario map (cap 100)

### 5.1 Регистрация мероприятий (22 scenarios)

**Hub:** `/`, `/products/reg-point/`, `/scenarios/`

| # | Slug | Primary keyword | Wave |
|---|------|-----------------|------|
| 1 | `event-registration` | регистрация участников мероприятия | P0 |
| 2 | `conference-registration` | регистрация на конференцию | P0 |
| 3 | `exhibition-registration` | регистрация выставки | P0 |
| 4 | `corporate-events` | регистрация корпоративного мероприятия | P0 |
| 5 | `forum-registration` | регистрация на форум | P1 |
| 6 | `seminar-registration` | регистрация участников семинара | P1 |
| 7 | `training-registration` | регистрация сотрудников на обучение | P1 |
| 8 | `webinar-registration` | регистрация на вебинар | P1 |
| 9 | `guest-registration` | регистрация гостей | P1 |
| 10 | `online-registration` | онлайн регистрация участников | P1 |
| 11 | `visitor-registration` | система регистрации посетителей | P2 |
| 12 | `event-agency` | ПО для event агентства | P1 |
| 13 | `hr-events` | регистрация сотрудников на мероприятие | P1 |
| 14 | `marketing-events` | регистрация маркетинговых мероприятий | P2 |
| 15 | `enterprise-compliance` | регистрация мероприятия 152-ФЗ | P1 |
| 16 | `conference-500-plus` | регистрация конференции 500 человек | P2 |
| 17 | `multi-site-checkin` | регистрация на нескольких входах | P2 |
| 18 | `vip-import` | регистрация VIP участников | P2 |
| 19 | `attendance-report` | учёт участников мероприятия | P2 |
| 20 | `registration-form` | форма регистрации на мероприятие | P2 |
| 21 | `registration-page` | страница регистрации мероприятия | P2 |
| 22 | `registration-service` | сервис регистрации мероприятий | P2 |

### 5.2 QR Check-in (8 scenarios)

| # | Slug | Primary keyword | Wave |
|---|------|-----------------|------|
| 23 | `check-in` | QR check-in | P0 |
| 24 | `qr-accreditation` | аккредитация участников | P0 |
| 25 | `entrance-control` | контроль доступа участников | P1 |
| 26 | `onsite-registration` | регистрация на входе | P1 |
| 27 | `qr-scanning` | сканирование QR на мероприятии | P2 |
| 28 | `offline-checkin` | check-in без интернета | P2 |
| 29 | `badge-printing` | печать бейджей участников | P2 |
| 30 | `queue-reduction` | сократить очередь на регистрации | P2 |

### 5.3 Промо (12 scenarios)

| # | Slug | Primary keyword | Wave |
|---|------|-----------------|------|
| 31 | `promo` | промоакция с чеками | P0 |
| 32 | `receipt-verification` | проверка чеков ФНС | P0 |
| 33 | `receipt-upload` | загрузка чеков | P1 |
| 34 | `promo-automation` | автоматизация промоакции | P1 |
| 35 | `buy-and-win` | механика купи и выиграй | P1 |
| 36 | `cashback-promo` | cashback акция | P2 |
| 37 | `receipt-raffle` | розыгрыш по чекам | P2 |
| 38 | `fmcg-promo` | промоакция FMCG | P1 |
| 39 | `promo-agency` | платформа промо акций | P1 |
| 40 | `btl-promo` | BTL акция регистрация | P2 |
| 41 | `anti-fraud-promo` | антифрод промоакция | P2 |
| 42 | `fns-api-promo` | проверка чека через API ФНС | P2 |

### 5.4 Смежные / билеты (10 scenarios)

| # | Slug | Primary keyword | Wave |
|---|------|-----------------|------|
| 43 | `ticketed-event` | продажа билетов на мероприятие | P1 |
| 44 | `paid-workshop` | регистрация на платный воркшоп | P2 |
| 45 | `yukassa-tickets` | продажа билетов юkassa | P2 |
| 46 | `white-label-registration` | white label регистрация | P1 |
| 47 | `self-hosted-events` | self hosted регистрация мероприятий | P1 |
| 48 | `on-premise-events` | on premise регистрация | P2 |
| 49 | `docker-deployment` | docker регистрация мероприятие | P2 |
| 50 | `api-integration` | API регистрации участников | P2 |
| 51 | `data-import-export` | импорт экспорт участников | P2 |
| 52 | `consent-pd-registration` | согласие на обработку ПД регистрация | P2 |

**Wave P0 (12 scenarios):** #1–4, #23–24, #31–32 + hub refresh — первый релиз Phase 2.

---

## 6. Technology + Features + Cases (в cap 100)

### 6.1 Technology child (8) — только gaps

| Slug | Primary keyword | Почему не existing |
|------|-----------------|-------------------|
| `self-hosted` | self hosted | Углубление beyond `/how-it-works/` |
| `docker` | docker event platform | Техн. angle ≠ статья |
| `api` | REST API | Нет owner |
| `deployment` | развертывание на сервере заказчика | Нет owner |
| `security` | безопасность персональных данных | ≠ compliance legal angle |
| `import` | импорт участников | Техн. модуль ≠ статья |
| `ocr` | OCR чеков | Техн. модуль |
| `fns` | сервис проверки чеков | Техн. интеграция |

**Backlog:** architecture, performance, backup, audit, export, 152-fz tech, …

### 6.2 Features (8)

| Slug | Primary keyword |
|------|-----------------|
| *(hub)* `/features/` | возможности платформы |
| `forms` | онлайн регистрация участников |
| `check-in` | система check-in |
| `qr` | регистрация по QR |
| `ocr` | загрузка чеков |
| `fns` | проверка чеков промо |
| `anti-fraud` | антифрод промо |
| `reports` | отчёты по мероприятию |

**Backlog:** landing-pages, badges, email, sms, operator-roles, …

### 6.3 Cases (4)

| Slug | Primary keyword |
|------|-----------------|
| *(hub)* `/cases/` | кейсы Reg.Point |
| `conference-self-hosted` | self hosted конференция кейс |
| `promo-fns-retail` | промоакция с чеками кейс |
| `corporate-hr-event` | корпоратив регистрация кейс |

---

## 7. Keyword-first: SEO-требования

| Элемент | Правило |
|---------|---------|
| **Primary keyword** | Один на URL; unique в `pages.json`; назначается **до** написания текста |
| **Title** | `{Primary keyword} — {benefit} \| Reg.Point` · 50–60 символов |
| **Description** | Primary + CTA · 140–160 символов |
| **H1** | = primary keyword (допустима естественная вариация) |
| **H2** | Secondary / LSI из кластера §5 |
| **FAQ** | 3–5 вопросов = People Also Ask / Wordstat variants |
| **Body** | Scenario: 800–1200 слов; existing refresh: не сокращать без причины |
| **Schema** | FAQPage (scenario), SoftwareApplication, BreadcrumbList, Article (статьи) |
| **Canonical** | `https://reg-point.ru/…/` |

### 7.1 Existing 28 — keyword refresh (обязательно в Sprint 10–11)

Каждая existing-страница: audit primary keyword → обновить Title/H1/Description → tags в `pages.json` → блок «Сценарии» / internal-links.

---

## 8. Solution Page — шаблон «Решения»

> **Канон copy:** `docs/templates/SOLUTION_PAGE.md` · **Идеология:** `docs/MESSAGING.md`  
> **URL:** `/scenarios/{slug}/` · в nav — **«Решения»**

Страница строится вокруг **процесса принятия решения**, не вокруг функций.

### 8.1 Цепочка аудиторий

**Менеджер → PM → ИТ → CEO** — одна страница, 7 блоков:

| § | Блок |
|---|------|
| 1 | Проблема (первый экран, без продукта) |
| 2 | Решение (сценарий процесса) |
| 3 | Возможности платформы → `/features/` |
| 4 | Technology → `/technology/` |
| 5 | Проектный эффект (до/после) |
| 6 | Повторяемость |
| 7 | Организационный эффект (CEO) |

Далее: перелинковка (§8–12) · FAQ · CTA.

### 8.2 SEO

- **Title / H1** — primary keyword  
- **§1** — проблема, не tech  

### 8.3 Где ещё (не полный funnel)

| Страница | Блоки Solution |
|----------|----------------|
| `/products/*` | §1–4, §7 кратко + links → scenarios |
| `/` | §1–2 hero |
| `/articles/*` | §1 + information, CTA → scenario |
| `/features/*`, `/technology/*` | §3 или §4 только |
| `/cases/*` | §5–6 + §3 |
| `/pricing/` | §6–7 + CTA |

Полный шаблон §1–14 — **только** `/scenarios/*`.

---

## 9. Hub → child: existing сохраняются, новые — дочерние

> **Схема:** `content/SCHEMA.md` · **Реестр:** `content/pages.json` · **Рендер:** `js/internal-links.js`

### 9.1 Идея

```
Existing URL (hub)          New URL (child)
─────────────────          ─────────────────
/scenarios/        ←────── /scenarios/check-in/
/products/reg-point/ ←──── (relatedHubs) + sibling link
/articles/         ←────── /articles/qr-check-in/
/technology/       ←────── /technology/docker/
```

- **URL existing не меняются** — страница остаётся hub своего раздела.
- **Child** указывает `"hub": "/scenarios/"` — попадает в блок «Сценарии» на hub автоматически.
- **Условный child** для product-hub: `"relatedHubs": ["/products/reg-point/"]` — сценарий показывается на странице модуля без смены primary hub.

### 9.2 Три типа связей

| Связь | Поле | Где видно |
|-------|------|-----------|
| **Прямой child** | `hub` | Hub-страница → блок «Сценарии / Статьи / …» |
| **Условный child** | `relatedHubs` | Product/compliance hub → «Сценарии модуля» |
| **Sibling** | `tags[]` | Любая страница → «Сценарии по теме», «Статьи по теме» |

### 9.3 Anti-cannibalization (кратко)

| Проверка | Правило |
|----------|---------|
| Primary keyword | Один owner в `pages.json` |
| Hub vs child | Hub = overview keyword; child = long-tail commercial |
| Article vs scenario | Разный `intent`, разный primary |
| Новый child | Только если keyword не занят existing |

Подробно: §2.1, `content/SCHEMA.md`.

### 9.4 Что рендерит `internal-links.js`

**На hub** (`/scenarios/`, `/articles/`, …):
1. Блок **children** — все `hub === текущий URL`
2. Блоки **siblings** по tags (products, articles, scenarios…)
3. **pricing** + **contacts** (pinned)

**На child** (`/scenarios/check-in/`):
1. Pin-ссылка на **parent hub** (`hub`)
2. Pin **relatedHubs** (product, articles hub)
3. Siblings по tags
4. pricing + contacts

**На product-hub** (`/products/reg-point/`):
1. Блок **условных children** — scenarios с `relatedHubs` → этот URL
2. Остальное — tag-based

### 9.5 Добавление scenario (workflow)

```
1. primaryKeyword unique?
2. hub = "/scenarios/"
3. relatedHubs = ["/products/reg-point/"]  // если нужно
4. HTML + sitemap
5. /scenarios/ и /products/reg-point/ подхватят автоматически
```

`status: "planned"` — в JSON для планирования, на prod не рендерится.

---

## 10. Перелинковка (tags + hub)

```
content/pages.json   — hub, relatedHubs, primaryKeyword, tags[], intent
js/internal-links.js — children block + tag siblings + pinned hubs
```

**Scenario child минимум:**
- parent hub (`hub`)
- 2 sibling scenarios (tags)
- relatedHub product
- 1–2 articles (information)
- `/pricing/`, `/contacts/`

**Existing article минимум:**
- hub `/articles/` (auto)
- 1–2 scenarios (`relatedHubs` или tags)
- product hub
- `/pricing/`

---

## 11. Фазы (cap 100)

| Sprint | Фокус | URL cumulative |
|--------|-------|----------------|
| **10** | `pages.json` (28 existing), internal-links, keyword audit existing | 28 refreshed |
| **11** | Keyword-first refresh existing 28 + expand `/scenarios/` hub | 28 |
| **12** | Scenarios **P0** (12 landings) | 40 |
| **13** | Scenarios **P1** (18 landings) | 58 |
| **14** | Scenarios **P2** (22 landings) | 80 |
| **15** | Technology 8 + Features 8 | 96 |
| **16** | Cases 4 + nav + sitemap 100 + QA | **100** |

**Backlog (101+):** см. `SEO_PORTAL_TODO.md` §Backlog.

---

## 12. Навигация (минимальные изменения)

- Header: **«Решения»** → `/scenarios/` (Solution pages); «Продукты» остаётся
- `/scenarios/` hub — каталог 52 child + фильтр по модулю (из прототипа)
- Footer: колонка «Сценарии» — P0 links
- **Не вводить** `/solutions/` — избегаем дубля с `/scenarios/`

---

## 13. Backlog (101+ URL) — кратко

| Раздел | Backlog |
|--------|---------|
| Scenarios | industry verticals, EN scenarios, 50+ long-tail |
| Features | badges, email, sms, landing-pages, operator-roles |
| Technology | architecture, performance, backup, audit, export, 152-fz tech |
| Knowledge | `/knowledge/*` — только если gap не закрыт article + scenario |
| Persona | отдельные URL только при unique keyword |
| Scale | `generate-page.py`, 300+ pages, hreflang EN |

---

## 14. Связанные документы

| Документ | Назначение |
|----------|------------|
| `content/SCHEMA.md` | Hub → child, поля pages.json |
| `docs/MESSAGING.md` | Problem-first copy, narrative arc |
| `docs/SEO_PORTAL_TODO.md` | Чеклист Sprint 10–16 + backlog |
| `MARKETING_SITE_SPEC.md` §14 | Краткая фиксация |
| `docs/SITE_MAP.md` | Реестр 100 URL |
| `docs/SPRINTS.md` | Sprint 10–16 |
