# Рег.Поинт — маркетинговый сайт



Статический маркетинговый сайт коробочной платформы **Рег.Поинт** (Reg.Point). Продуктовая техбаза — [ESC-Promo](https://github.com/alfarius42/ESC-Promo).



## О проекте



- **Архитектура:** **MPA без сборки** — vanilla HTML + CSS + JS в корне репо; правите файлы → сразу на сервер / в браузер. **Нет** Vite/Webpack/npm для сайта.

- **Интеграции:** Jivo (чат + форма КП/Демо), Telegram (опц.), Яндекс.Метрика.

- **Figma:** [Регпоинтинг](https://www.figma.com/design/mV4djwXG8q7KnkaTq9rRAy/) — канон визуала.

- **Прототип:** `prototype/` — React+Vite **только для сверки UX**; код в production не переносится.



Подробнее: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).



## Быстрый старт (PowerShell)



**Production-сайт** (из корня, без сборки):



```powershell

cd C:\Regpoint-site

npx --yes serve .

```



**Прототип** (отдельно, с npm):



```powershell

cd C:\Regpoint-site\prototype

npm install

npm run dev

```



> В PowerShell 5.x не работает `&&` — используйте `;` или отдельные команды. См. [docs/LOCAL_DEV.md](docs/LOCAL_DEV.md).



## Источники и документы



| Документ | Назначение |

|----------|------------|

| [MARKETING_SITE_SPEC.md](MARKETING_SITE_SPEC.md) | Тексты, SEO, интеграции, карта сайта |

| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | MPA без сборки, интеграции |

| [docs/LOCAL_DEV.md](docs/LOCAL_DEV.md) | Команды Windows / PowerShell |

| [docs/SPRINTS.md](docs/SPRINTS.md) | Roadmap |

| [CURSOR_CONTEXT.md](CURSOR_CONTEXT.md) | Индекс для AI |



## Ветки и деплой



- **`develop`** — разработка (полный репо).

- **`main`** — production-only для FTP.

- **Деплой:** залить статику с `main` (`index.html`, `css/`, `js/`, …) **без сборки**.

- **Опционально:** `python scripts/build-prod.py` → `dist/` + zip (минификация перед релизом).



## Автотесты



```powershell

cd C:\Regpoint-site\tests

npm install

npx playwright install chromium

npm test

```



## Структура



```text

index.html  css/  js/  img/  i18n/     ← production MPA (без npm)

products/  pricing/  contacts/  …

prototype/                              ← React-прототип (npm + Vite)

tests/                                  ← Playwright (только CI)

docs/  MARKETING_SITE_SPEC.md

```



## Конфигурация



`js/config.js` — Jivo, Telegram, Яндекс.Метрика, навигация.


