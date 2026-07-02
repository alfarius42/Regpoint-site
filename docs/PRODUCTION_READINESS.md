# Production readiness — Definition of Done

100% production-ready = сайт на **main**, залит на FTP, все пункты ниже ✅.

---

## 1. Архитектура

- [ ] MPA: все URL из `docs/SITE_MAP.md` открываются напрямую
- [ ] Без npm/сборки в корне; только HTML/CSS/JS
- [ ] `404.html`, `.htaccess`, `robots.txt`, `sitemap.xml`
- [ ] HTTPS на production-домене

---

## 2. Контент (Figma + прототип)

- [ ] Все тексты RU — из `App.tsx` / Figma (см. `docs/CONTENT_SOURCES.md`)
- [ ] 10 статей — полный текст из `ARTICLES[]`
- [ ] Meta title + description на каждой странице
- [ ] Privacy — юридически согласовано (не только stub из прототипа)
- [ ] EN: scope выполнен по решению заказчика

---

## 3. Медиа

- [ ] Unsplash заменены экспортом Figma → `img/`
- [ ] OG 1200×630 для всех страниц + статей
- [x] Favicon + logo baseline (`img/`, прототип #243954) — заменить Figma export позже
- [ ] См. `docs/MEDIA_ASSETS.md`

---

## 4. UI / UX

- [x] Header: nav, dropdown продуктов, RU/EN, CTA (прототип)
- [x] Footer: 4 col + CTA band
- [x] Contact modal → Jivo + Telegram
- [ ] Cookie banner
- [ ] Responsive 375 / 768 / 1280 — без horizontal scroll
- [ ] Pixel-perfect сверка ключевых страниц с Figma

---

## 5. Интеграции

- [ ] Jivo widget `COp1zDxNwg` + embed форма `#demo` — script на всех страницах
- [ ] `jivo_api.open()` на чат-кнопках
- [x] Telegram → @ZaharMishiev
- [x] Яндекс.Метрика **110315704** — код в `js/analytics.js`, загрузка после consent
- [ ] Цели Метрики: demo, contact, jivo, lang
- [ ] GA4 — **не используем** (убрать из privacy)

---

## 6. SEO

- [ ] `sitemap.xml` — все публичные URL
- [ ] `hreflang` ru / en
- [ ] Schema.org на home, pricing, faq, articles
- [ ] Canonical на каждой странице

---

## 7. QA

- [ ] Playwright e2e green (все страницы + responsive)
- [ ] Ручной smoke: формы, модалки, ссылки
- [ ] Lighthouse: performance, a11y, SEO — baseline зафиксирован
- [ ] Cross-browser: Chrome, Safari, Firefox (mobile + desktop)

---

## 8. Deploy

- [ ] Ветка `main` — только production files
- [ ] FTP upload проверен — **Masterhost: zip через панель** (`docs/DEPLOY_MASTERHOST.md`)
- [ ] Post-deploy: форма Jivo, чат, метрика, 404

---

## Метрика готовности

| Область | Вес |
|---------|-----|
| Страницы RU (15 + 10 статей) | 40% |
| Интеграции | 15% |
| Медиа + Figma | 15% |
| SEO | 10% |
| EN | 10% |
| QA + deploy | 10% |

Текущая оценка: **~40%** (Sprint 1: chrome + home RU; Sprint 2: products + pricing RU).
