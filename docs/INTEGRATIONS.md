# Интеграции маркетингового сайта

Канон: `MARKETING_SITE_SPEC.md` §4. Детали подключения — здесь.

---

## Jivo — единственный канал связи

| Параметр | Значение |
|----------|----------|
| Vendor | [jivo.ru](https://www.jivo.ru) (РФ, 152-ФЗ) |
| Widget ID | **`COp1zDxNwg`** |
| Script | `<script src="//code.jivo.ru/widget/COp1zDxNwg" async></script>` — только фронт |
| Загрузка | `js/jivo.js` читает `config.jivoWidgetId`, inject в `<body>` |
| Открытие чата | `window.jivo_api.open()` |
| CTA | Все «Связаться», «Запросить КП / Демо», FAB → `data-action="jivo"` → `jivo_api.open()` |
| `/contacts#demo` | Блок с кнопкой «Написать в чат», без HTML-формы |
| Config | `js/config.js` → `jivoWidgetId` |
| Реализация | `js/contact.js` |

**Модалка выбора канала и Telegram на сайте не используются.**

---

## Яндекс.Метрика

| Параметр | Значение |
|----------|----------|
| Config | `js/config.js` → `yandexMetrikaId: '110315704'` |
| Статус | ✅ подключено |
| Consent | `metrikaRequiresConsent: true` — загрузка после cookie-баннера |
| Init | webvisor, clickmap, ecommerce `dataLayer`, trackLinks, accurateTrackBounce |
| Реализация | `js/analytics.js`, `js/cookies.js` |

### Рекомендуемые цели

- `demo_request` — клик «Запросить КП / Демо»
- `contact_open` — «Связаться»
- `jivo_chat` — открытие чата (FAB и CTA)
- `lang_switch` — смена RU/EN

---

## Что не подключаем в v1

- HTML-формы и embed Jivo Contact Form на сайте
- Выбор Telegram vs Jivo в UI
- EmailJS (US) — только dev/staging stub
- Cloudflare Workers / serverless
- Google Analytics 4 — опционально позже (cookie-баннер)

---

## Privacy

- Упоминание Jivo как обработчика ПД — `/privacy`
- Cookie-баннер до аналитики
