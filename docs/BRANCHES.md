# Ветки и деплой

## develop — разработка

- Основная рабочая ветка
- Полное содержимое репозитория: production-сайт, `prototype/`, `docs/`, `.cursor/`, `tests/`, `scripts/`
- Деплой dev/staging: всё из ветки, **кроме секретов** (`.env`, `.env.local`)
- На сервер не выкладывать: `node_modules/`, `prototype/node_modules/`, `prototype/dist/`, `tests/node_modules/`

## main — production

- Только публичный сайт, без dev-артефактов
- Допустимые пути (исходники или собранный `dist/` после релиза):

```text
index.html
404.html
.htaccess
robots.txt
sitemap.xml
products/
pricing/
technology/
compliance-152fz/
how-it-works/
scenarios/
faq/
articles/
contacts/
privacy/
en/
css/
js/
img/
i18n/
dist/                  ← после scripts/build-prod.py (опционально на main)
regpoint-site.zip      ← архив для FTP (генерируется скриптом)
```

- **Не должно быть:** `prototype/`, `docs/`, `.cursor/`, `AGENTS.md`, `tests/`, `scripts/`, `MARKETING_SITE_SPEC.md`, npm-зависимостей

## Поток работы

1. Коммиты разработки — в **`develop`**
2. PR `develop` → `main` после CI
3. **Деплой FTP:** статика с `main` напрямую (без сборки)
4. **Опционально:** `python scripts/build-prod.py` → `dist/` + zip перед заливкой

## Секреты

- **Jivo widget ID** — публичный, в `js/config.js` (виден в HTML страницы)
- **Яндекс.Метрика ID** — **`110315704`**, после cookie-баннера
- FTP-пароли Masterhost — **не в git** (локально или панель хостинга)

## Деплой на Masterhost

**Способ:** вручную через панель — загрузка **`regpoint-site.zip`**, распаковка в корень `reg-point.ru`.  
Подробно: **`docs/DEPLOY_MASTERHOST.md`**.

1. Checkout `main` (после PR)
2. `python scripts/build-prod.py` → `dist/` + `regpoint-site.zip`
3. Панель Masterhost → загрузить zip → распаковать
4. Проверить HTTPS, `robots.txt`, `sitemap.xml`
