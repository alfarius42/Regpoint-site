# `content/pages.json` — схема hub → child

> Реестр для автоперелинковки (`js/internal-links.js`).  
> **Existing URL не меняются** — они становятся **hub**; новые страницы — **child** через поле `hub`.

---

## Роли страницы

| `role` | Кто | Пример | URL меняется? |
|--------|-----|--------|---------------|
| `hub` | Раздел-владелец кластера | `/scenarios/`, `/technology/` | ❌ existing |
| `child` | Условный дочерний URL | `/scenarios/check-in/` | ✅ новый |
| `root` | Главная | `/` | ❌ |
| `conversion` | CTA | `/pricing/`, `/contacts/` | ❌ |

`role` можно не указывать — выводится из `type` + наличия `hub`.

---

## Поля записи

| Поле | Обяз. | Описание |
|------|-------|----------|
| `url` | ✅ | Путь с trailing slash: `/scenarios/check-in/` |
| `type` | ✅ | `home` · `hub` · `product` · `article` · `scenario` · `feature` · `tech-child` · `case` · `conversion` · `legal` |
| `pageTemplate` | опц. | `solution-full` · `product-led` · `article-info` · `feature-cap` · `tech-detail` · `case` · `hub-catalog` |
| `title` | ✅ | Для карточек перелинковки |
| `primaryKeyword` | ✅* | Один unique keyword (*hub — overview keyword) |
| `intent` | ✅ | `commercial` · `information` · `product` · `technical` · `legal` · `conversion` |
| `hub` | child | URL родительского hub — **главная привязка** |
| `relatedHubs` | опц. | Доп. hub для cross-link (продукт, статьи) |
| `tags` | ✅ | Для sibling-matching и кластеров |
| `cluster` | опц. | `registration` · `check-in` · `promo` · `technology` |
| `problems` | опц. | Коды болей для copy и matching — см. `docs/MESSAGING.md` §2.1 |
| `status` | опц. | `live` (default) · `planned` — planned не рендерится на prod |

### pageTemplate по типу

| type | pageTemplate | Документ |
|------|--------------|----------|
| `scenario` | `solution-full` | `docs/templates/SOLUTION_PAGE.md` |
| `product` | `product-led` | `docs/MESSAGING.md` §6 |
| `article` | `article-info` | `docs/MESSAGING.md` §7 |
| `feature` | `feature-cap` | MESSAGING §3 |
| `tech-child` | `tech-detail` | MESSAGING §3 |
| `case` | `case` | MESSAGING §3 |
| `hub` + `/scenarios/` | `hub-catalog` | SOLUTION_PAGE (карточки §1) |

---

## Правило hub → child

```
1. Existing hub сохраняет URL и primaryKeyword (overview, не long-tail).
2. Новая страница получает hub = URL существующего раздела.
3. Child НЕ дублирует primaryKeyword hub и siblings.
4. Hub автоматически показывает всех children (hub === текущий url).
5. Child всегда pin-ссылка на hub + siblings по tags.
```

### Карта hub (existing)

| Hub (existing) | Принимает children типа | Primary keyword hub (overview) |
|----------------|-------------------------|--------------------------------|
| `/scenarios/` | `scenario` | сценарии регистрации мероприятий |
| `/products/` | `product` | модули регистрации и промо |
| `/products/reg-point/` | `scenario`* | платформа регистрации участников |
| `/products/promo-pro/` | `scenario`* | промоакция с чеками |
| `/technology/` | `tech-child` | коробочная event-платформа |
| `/how-it-works/` | `tech-child`* | self hosted регистрация |
| `/compliance-152fz/` | `scenario`* | 152-ФЗ мероприятие |
| `/articles/` | `article` | статьи event-tech |
| `/features/` | `feature` | возможности платформы |
| `/cases/` | `case` | кейсы Reg.Point |

\* `relatedHubs` — child может ссылаться на product hub без смены основного `hub`.

---

## Пример: scenario child

```json
{
  "url": "/scenarios/conference-registration/",
  "type": "scenario",
  "pageTemplate": "solution-full",
  "intent": "commercial",
  "hub": "/scenarios/",
  "relatedHubs": ["/products/reg-point/"],
  "primaryKeyword": "регистрация на конференцию",
  "title": "Регистрация на конференцию",
  "tags": ["events", "conference", "check-in", "qr"],
  "cluster": "registration",
  "status": "planned"
}
```

## Пример: existing article (child of `/articles/`)

```json
{
  "url": "/articles/qr-check-in/",
  "type": "article",
  "intent": "information",
  "hub": "/articles/",
  "relatedHubs": ["/scenarios/"],
  "primaryKeyword": "qr check in конференция",
  "title": "QR check-in на конференции: пошаговое руководство",
  "tags": ["check-in", "qr", "events", "conference"]
}
```

---

## Anti-cannibalization

| Проверка | Действие |
|----------|----------|
| Дубликат `primaryKeyword` | ❌ не публиковать |
| Child keyword = hub keyword | ❌ сменить keyword или merge |
| Article + scenario same keyword | ❌ разные `intent` и разные primary |
| Два child одного hub, один keyword | ❌ один slug |

---

## Добавление новой child-страницы

1. Назначить unique `primaryKeyword`
2. Указать `hub` = existing раздел
3. Добавить `relatedHubs` (product/article)
4. Опубликовать HTML + sitemap
5. Hub и siblings подхватятся автоматически — **ручная правка hub HTML не нужна**
