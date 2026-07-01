# Интеграции маркетингового сайта

Канон: `MARKETING_SITE_SPEC.md` §4. Детали подключения — здесь.

---

## Jivo — чат и форма «КП / Демо»

| Параметр | Значение |
|----------|----------|
| Vendor | [jivo.ru](https://www.jivo.ru) (РФ, 152-ФЗ) |
| Script | `<script src="//code.jivosite.com/widget/XXXXX" async></script>` |
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

## Telegram (опционально)

- Ссылка `t.me/…` в модалке и footer
- Config: `js/config.js` → `telegramUrl`
- Не обрабатывает ПД на сайте — внешний мессенджер

---

## Яндекс.Метрика

| Параметр | Значение |
|----------|----------|
| Config | `js/config.js` → `yandexMetrikaId` |
| Consent | `metrikaRequiresConsent: true` — загрузка после cookie-баннера |
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
