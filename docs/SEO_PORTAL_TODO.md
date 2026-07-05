# SEO-портал — backlog задач (cap 100)

> **Источник:** `docs/SEO_PORTAL_ROADMAP.md` (v2, 2026-07-05)  
> **Cap:** **100 URL** · **52 scenarios** · **keyword-first** · **от existing**

Статусы: ⬜ · 🟡 · ✅

---

## Правило публикации

```
1. primaryKeyword уникален в pages.json
2. Title → H1 → FAQ пишутся ПОД keyword (не наоборот)
3. Lead и H2 — problem-first: проблема → решение → повторяемость (docs/MESSAGING.md)
4. Новый URL только если existing hub не владеет keyword
5. Cap 100 — жёсткий; 101+ только из §Backlog после review
```

---

## Sprint 10 — Реестр + keyword audit existing (28)

### 10.1 `content/pages.json`
- [x] Схема v2: `hub`, `relatedHubs`, `primaryKeyword`, `intent`, `role` — `content/SCHEMA.md`
- [x] Заполнить **28 existing** с hub/tags/primaryKeyword
- [ ] Матрица cannibalization: existing vs planned scenarios (roadmap §2.1)

### 10.1b Internal links
- [x] `js/internal-links.js` — hub children + conditional children + tag siblings

### 10.2 Existing keyword-first refresh (приоритетные 10)
- [ ] `/` — **сервис регистрации мероприятий**
- [ ] `/products/reg-point/` — **платформа регистрации участников**
- [ ] `/products/promo-pro/` — **промоакция с чеками**
- [ ] `/scenarios/` — **сценарии регистрации мероприятий**
- [ ] `/technology/` — **коробочная платформа мероприятий**
- [ ] `/how-it-works/` — **self hosted регистрация**
- [ ] `/compliance-152fz/` — **152-ФЗ мероприятие**
- [ ] `/pricing/` — **стоимость регистрации на мероприятие**
- [ ] `/articles/qr-check-in/` — **qr check in конференция** (information)
- [ ] `/articles/promo-fns/` — **проверка чека фнс промоакция** (information)

### 10.3 Existing keyword-first refresh (остальные 18)
- [ ] `/products/` · `/products/promo-point/` · `/products/ticket-point/`
- [ ] `/contacts/` · `/faq/` · `/privacy/` · `/privacy/marketing-consent/`
- [ ] `/articles/` hub + 10 remaining articles (tags + links to future scenarios)

### 10.4 Инфраструктура
- [x] `js/internal-links.js` — hub/child/conditional + tags
- [ ] `js/breadcrumbs.js` + BreadcrumbList schema
- [ ] `docs/templates/SOLUTION_PAGE.md` — канон Solution (§1–14)
- [ ] `docs/templates/scenario-page.html` — HTML-скелет по SOLUTION_PAGE.md
- [ ] Обновить `docs/HTML_HEAD_TEMPLATE.md` — scenario Title/Description формулы
- [ ] e2e: internal-links на 2 stub `/scenarios/test/`

### 10.5 DoD Sprint 10
- [ ] 28 URLs в pages.json с unique primaryKeyword
- [ ] Top-10 existing — обновлённые Title/H1/Description

---

## Sprint 11 — Hub `/scenarios/` + прототип → child links

### 11.1 Расширить `/scenarios/` (URL не менять)
- [ ] H1/Title под **сценарии регистрации мероприятий**
- [ ] 5 карточек прототипа → ссылки на P0 scenario slugs (stub OK)
- [ ] Фильтр по модулю (из прототипа)
- [ ] Блок «Популярные сценарии» — P0 keywords
- [ ] Auto internal-links: products, articles, pricing

### 11.2 DoD Sprint 11
- [ ] `/scenarios/` — keyword-first hub готов к приёмке child pages

---

## Sprint 12 — Scenarios P0 (12) → 40 URL total

### 12.1 Commercial landings (keyword-first copy каждая)
- [ ] `/scenarios/event-registration/` — **регистрация участников мероприятия**
- [ ] `/scenarios/conference-registration/` — **регистрация на конференцию**
- [ ] `/scenarios/exhibition-registration/` — **регистрация выставки**
- [ ] `/scenarios/corporate-events/` — **регистрация корпоративного мероприятия**
- [ ] `/scenarios/check-in/` — **QR check-in**
- [ ] `/scenarios/qr-accreditation/` — **аккредитация участников**
- [ ] `/scenarios/promo/` — **промоакция с чеками**
- [ ] `/scenarios/receipt-verification/` — **проверка чеков ФНС**
- [ ] `/scenarios/fmcg-promo/` — **промоакция FMCG**
- [ ] `/scenarios/enterprise-compliance/` — **регистрация мероприятия 152-ФЗ**
- [ ] `/scenarios/event-agency/` — **ПО для event агентства**
- [ ] `/scenarios/self-hosted-events/` — **self hosted регистрация мероприятий**

### 12.2 Cross-links
- [ ] `/articles/qr-check-in/` → `/scenarios/check-in/` (commercial)
- [ ] `/articles/promo-fns/` → `/scenarios/receipt-verification/`
- [ ] `/products/reg-point/` → top-3 registration scenarios
- [ ] `/products/promo-pro/` → promo scenarios

### 12.3 SEO checklist ×12
- [ ] Title · Description · H1 · FAQ schema · 800+ слов · pages.json · sitemap

### 12.4 DoD Sprint 12
- [ ] 40 URL в sitemap (28 + 12 scenarios)

---

## Sprint 13 — Scenarios P1 (18) → 58 URL

- [ ] `/scenarios/forum-registration/` — **регистрация на форум**
- [ ] `/scenarios/seminar-registration/` — **регистрация участников семинара**
- [ ] `/scenarios/training-registration/` — **регистрация сотрудников на обучение**
- [ ] `/scenarios/webinar-registration/` — **регистрация на вебинар**
- [ ] `/scenarios/guest-registration/` — **регистрация гостей**
- [ ] `/scenarios/online-registration/` — **онлайн регистрация участников**
- [ ] `/scenarios/hr-events/` — **регистрация сотрудников на мероприятие**
- [ ] `/scenarios/entrance-control/` — **контроль доступа участников**
- [ ] `/scenarios/onsite-registration/` — **регистрация на входе**
- [ ] `/scenarios/receipt-upload/` — **загрузка чеков**
- [ ] `/scenarios/promo-automation/` — **автоматизация промоакции**
- [ ] `/scenarios/buy-and-win/` — **механика купи и выиграй**
- [ ] `/scenarios/promo-agency/` — **платформа промо акций**
- [ ] `/scenarios/ticketed-event/` — **продажа билетов на мероприятие**
- [ ] `/scenarios/white-label-registration/` — **white label регистрация**
- [ ] `/scenarios/receipt-verification/` cross-link cluster complete
- [ ] SEO checklist ×18
- [ ] DoD: **58 URL**

---

## Sprint 14 — Scenarios P2 (22) → 80 URL

- [ ] `/scenarios/visitor-registration/`
- [ ] `/scenarios/marketing-events/`
- [ ] `/scenarios/conference-500-plus/`
- [ ] `/scenarios/multi-site-checkin/`
- [ ] `/scenarios/vip-import/`
- [ ] `/scenarios/attendance-report/`
- [ ] `/scenarios/registration-form/`
- [ ] `/scenarios/registration-page/`
- [ ] `/scenarios/registration-service/`
- [ ] `/scenarios/qr-scanning/`
- [ ] `/scenarios/offline-checkin/`
- [ ] `/scenarios/badge-printing/`
- [ ] `/scenarios/queue-reduction/`
- [ ] `/scenarios/cashback-promo/`
- [ ] `/scenarios/receipt-raffle/`
- [ ] `/scenarios/btl-promo/`
- [ ] `/scenarios/anti-fraud-promo/`
- [ ] `/scenarios/fns-api-promo/`
- [ ] `/scenarios/paid-workshop/`
- [ ] `/scenarios/yukassa-tickets/`
- [ ] `/scenarios/on-premise-events/`
- [ ] `/scenarios/docker-deployment/`
- [ ] `/scenarios/api-integration/`
- [ ] `/scenarios/data-import-export/`
- [ ] `/scenarios/consent-pd-registration/`
- [ ] SEO checklist ×22
- [ ] DoD: **80 URL**

---

## Sprint 15 — Technology 8 + Features 8 → 96 URL

### 15.1 Technology child
- [ ] `/technology/self-hosted/` — **self hosted**
- [ ] `/technology/docker/` — **docker event platform**
- [ ] `/technology/api/` — **REST API**
- [ ] `/technology/deployment/` — **развертывание на сервере заказчика**
- [ ] `/technology/security/` — **безопасность персональных данных**
- [ ] `/technology/import/` — **импорт участников**
- [ ] `/technology/ocr/` — **OCR чеков**
- [ ] `/technology/fns/` — **сервис проверки чеков**
- [ ] Expand `/technology/` hub — links to 8 child (не дублировать `/how-it-works/` copy)

### 15.2 Features
- [ ] `/features/index.html` — hub
- [ ] `/features/forms/` · `/features/check-in/` · `/features/qr/`
- [ ] `/features/ocr/` · `/features/fns/` · `/features/anti-fraud/` · `/features/reports/`
- [ ] Link features ↔ scenarios (tags)

### 15.3 DoD Sprint 15
- [ ] **96 URL** · no keyword overlap with scenarios/articles

---

## Sprint 16 — Cases 4 + Nav + QA → 100 URL

### 16.1 Cases
- [ ] `/cases/index.html`
- [ ] `/cases/conference-self-hosted/`
- [ ] `/cases/promo-fns-retail/`
- [ ] `/cases/corporate-hr-event/`

### 16.2 Nav
- [ ] Header: «Сценарии» prominent; dropdown P0 scenarios
- [ ] Footer: сценарии P0 + features + cases
- [ ] Mobile drawer updated

### 16.3 QA + SEO
- [ ] sitemap.xml = **100 URL** exactly
- [ ] GSC re-submit
- [ ] Playwright: all 100 routes smoke
- [ ] Cannibalization audit: 100 unique primaryKeyword
- [ ] Responsive 375/768/1280 on scenario template

### 16.4 DoD Sprint 16 — **Phase 2 complete**
- [ ] **100 URL cap reached**
- [ ] Keyword-first on every page
- [ ] Auto internal-links live

---

## SEO copy checklist (каждая страница)

> **Идеология:** `docs/MESSAGING.md` · **Solution §1–14:** `docs/templates/SOLUTION_PAGE.md`

```
[ ] primaryKeyword в pages.json — unique
[ ] pageTemplate = solution-full (для /scenarios/*)
[ ] §1 Проблема — без продукта
[ ] §2 Решение — сценарий процесса
[ ] §3 Возможности — после §2
[ ] §4 Technology — после §3
[ ] §5 До/после — не «преимущества»
[ ] §6 Повторяемость
[ ] §7 Организационный эффект (CEO)
[ ] Title/H1 = keyword
[ ] FAQ — риски, не API
[ ] CTA Jivo
[ ] hub /scenarios/ + relatedHubs
[ ] sitemap + e2e
```

---

## Сводка cap 100

| Слой | URL |
|------|-----|
| Existing (refresh) | 28 |
| Scenarios new | 52 |
| Technology child | 8 |
| Features | 8 |
| Cases | 4 |
| **Итого** | **100** |

---

## Backlog (101+) — не в ближней перспективе

### Scenarios & verticals
- [ ] Industry: pharma, banking, retail, education, sports…
- [ ] `/solutions/*` alias — **не создавать** (дубль `/scenarios/`)
- [ ] EN scenario landings
- [ ] 50+ long-tail commercial

### Features (backlog)
- [ ] landing-pages · badges · email · sms · operator-roles

### Technology (backlog)
- [ ] architecture · performance · backup · audit · export · 152-fz tech

### Knowledge (backlog)
- [ ] `/knowledge/*` — только при gap (нет article + scenario)
- [ ] google-forms-vs · yandex-forms-vs · checklist-registracii …

### Persona (backlog)
- [ ] Отдельный URL только при unique keyword ≠ scenario

### Scale (backlog)
- [ ] `scripts/generate-page.py`
- [ ] 300–500 pages
- [ ] hreflang EN full
- [ ] Auto sitemap from pages.json

---

## Как обновлять

1. Закрыли задачу → `[x]`
2. Новая страница в cap 100 → pages.json + sitemap + SITE_MAP
3. Запрос на 101+ → сначала §Backlog review + cannibalization check
