# Идеология текстов Reg.Point

> **Статус:** принято, v3 (2026-07-05).  
> **Структура funnel:** ниже · **Голос и стиль:** [`docs/CONTENT_VOICE.md`](CONTENT_VOICE.md) · **Solution:** [`docs/templates/SOLUTION_PAGE.md`](templates/SOLUTION_PAGE.md)

---

## 1. Два слоя требований к текстам

| Слой | Документ | Что решает |
|------|----------|------------|
| **Структура** | `MESSAGING.md`, `SOLUTION_PAGE.md` | Problem → Solution → … · SEO · hub → child |
| **Голос** | **`CONTENT_VOICE.md`** | Инженерный тон · опыт · нюансы · компромиссы · editorial links |

**Оба обязательны.** Keyword в H1 без инженерного lead — не публикуем.

### 1.1 Главный принцип структуры

**Продаём не технологии — решаем проблему.** Tech — блок §4, не первый экран.

### 1.2 Главный принцип голоса

**«Эти люди сами строили такие системы.»** Не SEO-простыня, не ChatGPT, не маркетинговый лендинг.

---

## 2. Solution Page — канон (раздел «Решения»)

> **Полный шаблон:** [`docs/templates/SOLUTION_PAGE.md`](templates/SOLUTION_PAGE.md)  
> **URL:** `/scenarios/{slug}/` · в навигации — **«Решения»**

**7 смысловых блоков + перелинковка + FAQ + CTA:**

| § | Блок | Аудитория |
|---|------|-----------|
| 1 | Проблема | Менеджер |
| 2 | Решение (сценарий процесса) | Менеджер |
| 3 | Возможности платформы | PM |
| 4 | Technology | ИТ |
| 5 | Проектный эффект (до/после) | PM |
| 6 | Повторяемость | PM / agency |
| 7 | Организационный эффект | CEO |

Одна страница закрывает цепочку: **Менеджер → PM → ИТ → CEO**.

---

## 3. Где ещё применяется (матрица шаблонов)

| Тип страницы | URL | Шаблон | Какие блоки Solution Page |
|--------------|-----|--------|---------------------------|
| **Solution** | `/scenarios/{slug}/` | **SOLUTION_PAGE.md — полный** | §1–14 все |
| **Product hub** | `/products/reg-point/` и др. | Product-led | §1 проблема модуля · §2 решение · §3 возможности · §4 tech (кратко) · §7 организационный (кратко) · links → scenarios |
| **Product index** | `/products/` | Hub | Обзор модулей · children · без §5–7 |
| **Home** | `/` | Hero + trust | §1 проблема (hero) · §2 решение (кратко) · ссылки на top scenarios · **не** полный funnel |
| **Scenarios hub** | `/scenarios/` | Catalog | Карточки = §1 одной строкой · filter · children list |
| **Case** | `/cases/{slug}/` | Case | §1 задача · §5 проектный эффект · §6 повторяемость · §3 что использовали |
| **Article** | `/articles/{slug}/` | Information | §1 проблема/вопрос · варианты решения · **не** §3–4–7 sales · CTA → scenario |
| **Feature** | `/features/{slug}/` | Capability | §3 только (что делает · где в сценарии) · link → parent scenario |
| **Technology child** | `/technology/{slug}/` | Technical | §4 только · link → scenarios + compliance |
| **Compliance** | `/compliance-152fz/` | Legal hub | §1 legal риск · §4 152-ФЗ · links → scenarios enterprise |
| **How it works** | `/how-it-works/` | Deployment hub | §4 self-hosted · §6 повторяемость · links |
| **Pricing** | `/pricing/` | Conversion | §7 организационный (TCO) · §6 для agency · CTA |
| **FAQ** | `/faq/` | Support | Q&A по рискам · links → scenarios |

**Правило:** полный 14-блоковый funnel — **только Solution** (`/scenarios/*`). Остальные **отсылают** на Solution, не дублируют funnel.

---

## 4. Каталог проблем (§1)

| Код | Проблема |
|-----|----------|
| `pd-compliance` | 152-ФЗ, данные «непонятно где» |
| `manager-hours` | Трудочасы менеджеров, Excel |
| `promo-staff` | Больше промоутеров на площадке |
| `fraud` | Фрод, дубли чеков |
| `duplicate-data` | Дубли в списках |
| `queue-chaos` | Очереди на регистрации |
| `saas-risk` | SaaS, DPA-цепочка |
| `no-repeat` | Каждый раз процесс с нуля |
| `agency-dependency` | Зависимость от агентства |
| `opaque-costs` | Непрозрачные расходы |

Поле `problems[]` в `pages.json`.

---

## 5. SEO + Solution Page

| Элемент | Правило |
|---------|---------|
| Title, H1 | primary keyword |
| §1 Lead | Проблема (не продукт) |
| H2 §2–7 | Secondary keywords + дуга решения |
| FAQ | Риски и процесс |

---

## 6. Product page (сокращённый funnel)

1. **Проблема модуля** — какую боль закрывает Reg.Point / Promo.Pro / …  
2. **Решение** — типовой процесс на этом модуле  
3. **Возможности** — ключевые features модуля  
4. **Technology** — 3–4 пункта + link `/technology/`  
5. **Ссылки на Solution pages** — `relatedHubs` children  
6. CTA  

---

## 7. Article (information — не sales funnel)

1. Проблема / вопрос (H1)  
2. Почему возникает  
3. Способы решения (Forms, SaaS, коробка…)  
4. Критерии выбора  
5. Мягко: автоматизация + compliance  
6. CTA → **Solution page**, не дублировать §3–7  

**Важно для compliance-тем:** editorial-ссылки из статей и scenario-блоков про согласия, ПД и legal mistakes ведут на **`/articles/consent-pd/`**, а не на `/privacy/`.  
`/privacy/` и `/privacy/marketing-consent/` остаются только для системных/legal UI-ссылок.

---

## 8. Анти-patterns

**Структура:**
- ❌ §3 Возможности на первом экране  
- ❌ §4 Technology в lead  
- ❌ §5 «преимущества» вместо до/после  
- ❌ Feature list без §2 «сценария процесса»  

**Голос:** см. `docs/CONTENT_VOICE.md` — «в современном мире», keyword stuffing, определения вместо опыта.

---

## 9. Чеклист

**Solution Page:** `docs/templates/SOLUTION_PAGE.md` §Чеклист.  
**Голос и editorial links:** `docs/CONTENT_VOICE.md` §Чеклист.

**Любая страница:**
```
[ ] Lead = проблема (структура)
[ ] Тон = инженер с опытом (CONTENT_VOICE)
[ ] ≥1 нюанс или фраза заказчика
[ ] 1–3 контентные <a> в абзацах с контекстом
[ ] Editorial-ссылки про ПД/согласия ведут на /articles/consent-pd/
[ ] primaryKeyword в Title/H1, без stuffing
[ ] Tech после бизнес-блоков
```

---

## 10. Связанные документы

| Документ | Назначение |
|----------|------------|
| **`docs/CONTENT_VOICE.md`** | **Голос, стиль, editorial links** |
| `docs/templates/SOLUTION_PAGE.md` | Канон 14 блоков |
| `docs/SEO_PORTAL_ROADMAP.md` §8 | SEO + hub |
| `content/SCHEMA.md` | `pageTemplate`, `problems[]` |
| `docs/SEO_PORTAL_TODO.md` | Copy checklist |
