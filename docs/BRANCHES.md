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
2. PR `develop` → `main` после прохождения CI (см. `docs/PR_WORKFLOW.md`)
3. На `main`: `python scripts/build-prod.py` → `dist/` + `regpoint-site.zip`
4. Деплой на хостинг — содержимое **`dist/`** или zip по FTP

## Секреты

- Реальные ID Яндекс.Метрики, Jivo widget — только локально или в `.env` (не в git)
- В репозитории — placeholder в `js/config.js`

## FTP-деплой (будущее)

1. Checkout `main`
2. `python scripts/build-prod.py`
3. Загрузить содержимое `dist/` или `regpoint-site.zip` на shared-хостинг RU
4. Проверить HTTPS, `robots.txt`, `sitemap.xml`
