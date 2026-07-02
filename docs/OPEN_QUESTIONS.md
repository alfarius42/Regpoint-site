# Открытые вопросы — блокеры production

| # | Вопрос | Статус | Ответ |
|---|--------|--------|-------|
| Q1 | **Production-домен** | ✅ | **`https://reg-point.ru`** |
| Q2 | **Оператор ПД / юрлицо** | ✅ | **ИП Мельникова Ксения Антоновна**, ИНН 644917769371, ОГРНИП 325508100578539. Реквизиты — `docs/LEGAL_ENTITY.md` |
| Q3 | **Email privacy / контакты** | ⏳ | **Создаст позже** — placeholder в `js/config.js` → `privacyEmail` |
| Q4 | **Jivo widget ID** | ✅ | **`COp1zDxNwg`** — `js/jivo.js` |
| Q5 | **Яндекс.Метрика ID** | ✅ | **`110315704`** — `js/analytics.js` |
| Q6 | **Telegram** | ✅ | **[@ZaharMishiev](https://t.me/ZaharMishiev)** |
| Q7 | **Google Analytics 4** | ✅ | **Нет** |
| Q8 | **EN scope v1** | ✅ | **Полный перевод всех страниц RU** → `/en/…` |
| Q9 | **Изображения контента** | 🟡 | Hero/статьи — **экспорт из Figma**; Unsplash не в production |
| Q10 | **Деплой Masterhost** | ✅ | **Вручную:** `regpoint-site.zip` через панель → распаковать в корень. См. `docs/DEPLOY_MASTERHOST.md` |
| Q11 | **Тикет.Поинт** | 🟡 | «В разработке» как в прототипе |
| Q12 | **Favicon / logo** | 🟡 | **Базовый набор в `img/`** по прототипу (#243954, «Р·П»); заменить экспортом Figma при сверке |

---

## Осталось от заказчика

1. **Email** для privacy (Q3) — когда будет, обновить `privacyEmail` в config
2. **Аккаунт Masterhost** — создать и первый деплой по `DEPLOY_MASTERHOST.md`
3. **Figma export** — финальный logo/hero/OG (замена baseline в `img/`)
