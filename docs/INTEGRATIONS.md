# Интеграции маркетингового сайта

Канон: `MARKETING_SITE_SPEC.md` §4. Детали подключения — здесь.

---

## Jivo — чат и форма «КП / Демо»

| Параметр | Значение |
|----------|----------|
| Vendor | [jivo.ru](https://www.jivo.ru) (РФ, 152-ФЗ) |
| Widget ID | **`COp1zDxNwg`** |
| Script | `<script src="//code.jivo.ru/widget/COp1zDxNwg" async></script>` — только фронт |
| Загрузка | `js/jivo.js` читает `config.jivoWidgetId`, inject в `<body>` |
| Онлайн-чат | `window.jivo_api.open()` |
| Форма demo | Embed на `/contacts#demo` |
| Config | `js/config.js` → `jivoWidgetId` |

### Умная кнопка «Связаться»

```
[Связаться] → модалка:
  [💬 Онлайн-чат]  → jivo_api.open()
  [✈️ Telegram]    → config.telegramUrl (опц.)
  [Запросить КП / Демо] → /contacts#demo
```

Реализация: `js/contact.js`

---

## Telegram

- Ссылка **[@ZaharMishiev](https://t.me/ZaharMishiev)** — личный аккаунт; посетители пишут напрямую
- Config: `js/config.js` → `telegramUrl`, `telegramHandle`
- Модалка «Связаться», footer, `/contacts/`
- Не обрабатывает ПД на сайте — внешний мессенджер

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
- `contact_open` — умная кнопка «Связаться»
- `jivo_chat` — открытие чата
- `lang_switch` — смена RU/EN

---

## Что не подключаем в v1

- EmailJS (US) — только dev/staging stub
- Cloudflare Workers / serverless
- Google Analytics 4 — опционально позже (cookie-баннер)

---

## Privacy

- Упоминание Jivo как обработчика ПД — `/privacy`
- Cookie-баннер до аналитики
