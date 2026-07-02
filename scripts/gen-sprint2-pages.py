#!/usr/bin/env python3
"""One-time generator for Sprint 2 HTML pages from index.html chrome."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
index = (ROOT / "index.html").read_text(encoding="utf-8")

main_start = index.index("<main>")
main_end = index.index("</main>")
footer_start = index.index('<footer class="site-footer">')
script_start = index.rindex('<script src="/js/config.js">')

CHROME_HEAD = index[index.index("<header"):main_start]
CHROME_TAIL = index[footer_start:script_start]

SCRIPTS_BASE = """    <script src="/js/config.js"></script>
    <script src="/js/jivo.js"></script>
    <script src="/js/header.js" defer></script>
    <script src="/js/lang.js" defer></script>
    <script src="/js/contact.js" defer></script>"""

SCRIPTS_END = """
    <script src="/js/analytics.js" defer></script>
    <script src="/js/cookies.js" defer></script>
    <script src="/js/bootstrap.js" defer></script>
  </body>
</html>
"""

ICON_LINKS = """    <link rel="icon" href="/img/favicon.ico" sizes="any" />
    <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/img/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
    <meta name="theme-color" content="#243954" />"""

CSS_LINKS = """    <link rel="stylesheet" href="/css/fonts.css" />
    <link rel="stylesheet" href="/css/reset.css" />
    <link rel="stylesheet" href="/css/tokens.css" />
    <link rel="stylesheet" href="/css/layout.css" />
    <link rel="stylesheet" href="/css/components.css" />
    <link rel="stylesheet" href="/css/pages.css" />"""

ORG = {"@type": "Organization", "name": "Рег.Поинт", "url": "https://reg-point.ru"}


def build_page(path: str, meta: dict, body_page: str, main: str, extra_scripts: str = "") -> None:
    schema_block = ""
    if meta.get("schema"):
        schema_block = f"\n    <script type=\"application/ld+json\">{json.dumps(meta['schema'], ensure_ascii=False)}</script>"

    html = f"""<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{meta['title']}</title>
    <meta name="description" content="{meta['desc']}" />
    <link rel="canonical" href="{meta['canonical']}" />
    <meta property="og:title" content="{meta['og_title']}" />
    <meta property="og:description" content="{meta['desc']}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{meta['canonical']}" />
    <meta property="og:locale" content="ru_RU" />{schema_block}
{ICON_LINKS}
{CSS_LINKS}
  </head>
  <body data-page="{body_page}">
{CHROME_HEAD}
{main}
{CHROME_TAIL}{SCRIPTS_BASE}{extra_scripts}{SCRIPTS_END}
"""
    out = ROOT / path
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"Wrote {path}")


PRODUCTS_MAIN = """    <main>
      <section class="page-hero">
        <div class="container">
          <p class="section-label">Линейка продуктов</p>
          <h1 class="page-hero__title font-heading">Модули платформы <span class="page-hero__title-accent">Рег.Поинт</span></h1>
          <p class="page-hero__lead">Одна кодовая база — четыре лицензируемых модуля. Включайте только то, что нужно: от регистрации до билетов.</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="card-grid card-grid--2 card-grid--4">
            <article class="module-card">
              <div class="module-card__head">
                <h2 class="module-card__name">Рег.Поинт</h2>
                <div class="module-card__price">от 100 000 ₽</div>
              </div>
              <div class="module-card__body">
                <ul class="check-list">
                  <li>Публичная страница регистрации с брендингом</li>
                  <li>QR check-in и ручная отметка</li>
                  <li>Импорт CSV / Excel</li>
                  <li>Многодневный check-in, отчёт attendance</li>
                  <li>Роли director / manager</li>
                  <li>152-ФЗ compliance</li>
                </ul>
              </div>
              <div class="module-card__foot"><a class="module-card__link" href="/products/reg-point/">Подробнее</a></div>
            </article>
            <article class="module-card">
              <div class="module-card__head">
                <h2 class="module-card__name">Промо.Поинт</h2>
                <div class="module-card__price">от 80 000 ₽</div>
              </div>
              <div class="module-card__body">
                <ul class="check-list">
                  <li>Кастомные поля регистрации</li>
                  <li>Брендинг промо-страницы</li>
                  <li>Публичная регистрация promo-сценариев</li>
                  <li>152-ФЗ per-event</li>
                </ul>
                <div class="module-card__upsell">Нужна проверка чеков → Промо.Про</div>
              </div>
              <div class="module-card__foot"><a class="module-card__link" href="/products/promo-point/">Подробнее</a></div>
            </article>
            <article class="module-card">
              <div class="module-card__head">
                <h2 class="module-card__name">Промо.Про</h2>
                <div class="module-card__price">180 000 ₽</div>
              </div>
              <div class="module-card__body">
                <ul class="check-list">
                  <li>Всё из Рег.Поинт и Промо.Поинт</li>
                  <li>Проверка чека через API ФНС</li>
                  <li>OCR fallback (Tesseract.js)</li>
                  <li>QR-сканер чека, валидация ИНН</li>
                  <li>Один телефон — одна регистрация</li>
                </ul>
              </div>
              <div class="module-card__foot"><a class="module-card__link" href="/products/promo-pro/">Подробнее</a></div>
            </article>
            <article class="module-card">
              <div class="module-card__head">
                <h2 class="module-card__name">Тикет.Поинт</h2>
                <div class="module-card__price">+80 000 ₽ (add-on)</div>
              </div>
              <div class="module-card__body">
                <ul class="check-list">
                  <li>Несколько категорий билетов</li>
                  <li>Редактор шаблона билета</li>
                  <li>ЮKassa заказчика</li>
                  <li>QR для входа</li>
                </ul>
                <div class="module-card__upsell">Требует Рег.Поинт · В разработке</div>
              </div>
              <div class="module-card__foot"><a class="module-card__link" href="/products/ticket-point/">Подробнее</a></div>
            </article>
          </div>
          <div class="feature-matrix-wrap">
            <div class="feature-matrix-wrap__head">
              <h2 class="feature-matrix-wrap__title font-heading">Матрица возможностей</h2>
            </div>
            <div class="table-scroll">
              <table class="feature-matrix">
                <caption class="visually-hidden">Сравнение возможностей модулей Рег.Поинт</caption>
                <thead>
                  <tr>
                    <th>Возможность</th>
                    <th>Рег.Поинт</th>
                    <th>Промо.Поинт</th>
                    <th>Промо.Про</th>
                    <th>Тикет.Поинт</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Онлайн-регистрация</td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td></tr>
                  <tr><td>QR check-in</td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td></tr>
                  <tr><td>Импорт CSV/Excel</td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__dash">—</span></td></tr>
                  <tr><td>Кастом-поля формы</td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__dash">—</span></td></tr>
                  <tr><td>Брендинг страницы</td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td></tr>
                  <tr><td>Проверка чека ФНС</td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__dash">—</span></td></tr>
                  <tr><td>OCR fallback</td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__dash">—</span></td></tr>
                  <tr><td>Продажа билетов</td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td></tr>
                  <tr><td>ЮKassa интеграция</td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__dash">—</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td></tr>
                  <tr><td>152-ФЗ compliance</td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td><td><span class="feature-matrix__check" aria-label="Дa">✓</span></td><td><span class="feature-matrix__check" aria-label="Да">✓</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="products-cta">
            <p class="products-cta__hint">Не знаете, какой модуль выбрать?</p>
            <a class="btn btn--primary btn--lg" href="/contacts/#demo" data-action="demo">Запросить консультацию</a>
          </div>
        </div>
      </section>
    </main>"""

# Fix typo in last row
PRODUCTS_MAIN = PRODUCTS_MAIN.replace('aria-label="Дa"', 'aria-label="Да"')

ARTICLES = {
    "qr-check-in": ("QR check-in на конференции: пошаговое руководство", "check-in", "28 мая 2026 · 6 мин", "article-card__tag--blue"),
    "import-participants": ("Импорт участников из Excel и CSV без ошибок", "check-in", "1 июня 2026 · 5 мин", "article-card__tag--blue"),
    "152fz-checklist": ("152-ФЗ на мероприятии: чеклист для организатора", "152-ФЗ", "20 мая 2026 · 9 мин", "article-card__tag--blue"),
    "self-hosted-vs-saas": ("Self-hosted vs SaaS: как выбрать регистрацию на мероприятие", "self-hosted", "15 мая 2026 · 7 мин", "article-card__tag--dark"),
    "consent-pd": ("Согласие на обработку ПД: что указать на странице регистрации", "152-ФЗ", "18 июня 2026 · 10 мин", "article-card__tag--blue"),
    "promo-fns": ("Промоакция с чеком: как работает проверка ФНС", "promo", "5 июня 2026 · 8 мин", "article-card__tag--blue"),
    "ocr-fallback": ("OCR чеков в промо: когда нужен fallback", "promo", "10 июня 2026 · 6 мин", "article-card__tag--blue"),
    "cost-of-registration": ("Сколько стоит программа регистрации на мероприятие", "цены", "25 июня 2026 · 6 мин", "article-card__tag--muted"),
    "tickets-yukassa": ("Продажа билетов через ЮKassa на своём сервере", "билеты", "20 июня 2026 · 8 мин", "article-card__tag--muted"),
}

PRODUCT_ARTICLES = {
    "reg-point": ["qr-check-in", "import-participants", "152fz-checklist"],
    "promo-point": ["self-hosted-vs-saas", "consent-pd", "152fz-checklist"],
    "promo-pro": ["promo-fns", "ocr-fallback", "cost-of-registration"],
    "ticket-point": ["tickets-yukassa", "qr-check-in", "cost-of-registration"],
}

PRODUCTS_DATA = {
    "reg-point": {
        "name": "Рег.Поинт",
        "tagline": "Регистрация и check-in на мероприятия",
        "intro": "Базовый модуль для конференций, форумов, корпоративов и деловых мероприятий. Участники регистрируются онлайн — вы отмечаете прибытие по QR или из списка.",
        "price": "от 100 000 ₽",
        "priceNote": "лицензия, 1-й год поддержки включён",
        "features": [
            "Публичная страница регистрации с брендингом мероприятия",
            "Импорт участников из CSV / Excel",
            "QR check-in и ручная отметка на площадке",
            "Многодневный check-in, отчёт attendance, экспорт",
            "Роли руководитель / менеджер",
            "Полный compliance-стек 152-ФЗ",
        ],
        "notIncluded": [
            ("Промо с чеками", "/products/promo-pro/", "Промо.Про"),
            ("Продажа билетов", "/products/ticket-point/", "Тикет.Поинт"),
        ],
        "status": None,
        "title": "Рег.Поинт — регистрация и check-in на мероприятия | Self-hosted",
        "desc": "Онлайн-запись участников, QR check-in, импорт CSV/Excel, отчёты attendance. Коробка на VPS. 152-ФЗ. От 100 000 ₽.",
        "schema_price": "100000",
        "availability": "https://schema.org/InStock",
        "schema_desc": "Коробочная платформа онлайн-регистрации и QR check-in для мероприятий. Self-hosted, Docker, 152-ФЗ.",
    },
    "promo-point": {
        "name": "Промо.Поинт",
        "tagline": "Регистрация в промоакции",
        "intro": "Для BTL, розыгрышей, sampling и акций, где нужна красивая форма и гибкие поля — без проверки чеков ФНС.",
        "price": "от 80 000 ₽",
        "priceNote": "лицензия, 1-й год поддержки включён",
        "features": [
            "Кастомные поля регистрации, шаблоны полей",
            "Брендинг промо-страницы",
            "Публичная регистрация в рамках promo-сценариев",
            "152-ФЗ per-event",
        ],
        "notIncluded": [("Проверка чеков ФНС", "/products/promo-pro/", "Промо.Про")],
        "status": None,
        "title": "Промо.Поинт — регистрация в промоакции, кастом-поля | Рег.Поинт",
        "desc": "Промо-формы, брендинг акции, гибкие поля регистрации. Без ФНС. Self-hosted, 152-ФЗ. От 80 000 ₽.",
        "schema_price": "80000",
        "availability": "https://schema.org/InStock",
        "schema_desc": "Промо-формы с кастом-полями, брендинг акции. Self-hosted, 152-ФЗ.",
    },
    "promo-pro": {
        "name": "Промо.Про",
        "tagline": "Промоакции с проверкой чеков ФНС",
        "intro": "Для акций «купи — зарегистрируй чек — получи приз». Автоматическая верификация через API ФНС (kkt-online) с OCR fallback.",
        "price": "180 000 ₽",
        "priceNote": "лицензия, 1-й год поддержки включён",
        "features": [
            "Всё из Рег.Поинт и Промо.Поинт",
            "Проверка чека через API ФНС",
            "OCR fallback (Tesseract.js)",
            "QR-сканер чека, валидация ИНН, дат, суммы",
            "Правило: один телефон — одна регистрация на акцию",
        ],
        "notIncluded": [],
        "status": None,
        "title": "Промо.Про — промоакции с проверкой чека ФНС и OCR | Рег.Поинт",
        "desc": "Полный стек: мероприятия + промо + API ФНС + OCR чеков. Коробка на VPS клиента. 152-ФЗ. 180 000 ₽.",
        "schema_price": "180000",
        "availability": "https://schema.org/InStock",
        "schema_desc": "Полный стек: мероприятия + промо + API ФНС + OCR чеков. Self-hosted на VPS клиента.",
    },
    "ticket-point": {
        "name": "Тикет.Поинт",
        "tagline": "Продажа билетов на мероприятия",
        "intro": "Модуль add-on: несколько категорий билетов, редактор шаблона, оплата через магазин ЮKassa заказчика (комиссия провайдера — на стороне клиента).",
        "price": "+80 000 ₽ (add-on)",
        "priceNote": "требует активный Рег.Поинт на том же инстансе",
        "features": [
            "Несколько категорий билетов",
            "Редактор шаблона билета",
            "Оплата через ЮKassa заказчика",
            "QR для входа",
        ],
        "notIncluded": [],
        "status": "В разработке (backlog). Запишитесь на уведомление о релизе.",
        "title": "Тикет.Поинт — продажа билетов на мероприятия, ЮKassa | Рег.Поинт",
        "desc": "Кастомные шаблоны билетов, оплата через ЮKassa заказчика, QR для входа. Add-on к Рег.Поинт. Self-hosted.",
        "schema_price": "80000",
        "availability": "https://schema.org/PreOrder",
        "schema_desc": "Add-on модуль продажи билетов с интеграцией ЮKassa. Self-hosted, QR-вход.",
    },
}


def articles_block(slugs):
    cards = []
    for slug in slugs:
        title, tag, date, tag_class = ARTICLES[slug]
        cards.append(
            f"""            <a class="article-card" href="/articles/{slug}/">
              <div class="article-card__meta">
                <span class="article-card__tag {tag_class}">{tag}</span>
                <span class="article-card__date">{date}</span>
              </div>
              <h3 class="article-card__title">{title}</h3>
              <span class="article-card__read">Читать →</span>
            </a>"""
        )
    return "\n".join(cards)


def product_main(slug: str) -> str:
    d = PRODUCTS_DATA[slug]
    features = "\n".join(f"                  <li>{f}</li>" for f in d["features"])
    not_included = ""
    if d["notIncluded"]:
        rows = []
        for text, href, name in d["notIncluded"]:
            rows.append(
                f"""                  <div class="product-upsell-row">
                    <span class="product-upsell-row__text">{text}</span>
                    <a class="product-upsell-row__link" href="{href}">{name} →</a>
                  </div>"""
            )
        not_included = f"""
              <div class="product-not-included">
                <h3 class="product-not-included__title">Не входит в этот модуль</h3>
{"".join(rows)}
              </div>"""

    status = ""
    if d["status"]:
        status = f"""
              <div class="product-status"><strong>Статус:</strong> {d['status']}</div>"""

    notify = ""
    if slug == "ticket-point":
        notify = """
      <section class="section notify-section">
        <div class="container">
          <div class="notify-section__inner">
            <h2 class="product-subtitle font-heading">Уведомить о релизе</h2>
            <p class="product-intro" style="margin-bottom: 1.25rem">Тикет.Поинт в разработке. Оставьте email — пришлём уведомление при выходе и предложим beta-доступ.</p>
            <form class="notify-form" action="#" method="post">
              <input class="notify-form__input" type="email" name="email" required placeholder="your@company.ru" autocomplete="email" />
              <button class="btn btn--primary" type="submit">Уведомить меня</button>
            </form>
            <div class="notify-form__success" hidden>
              <span aria-hidden="true">✓</span>
              <span>Записано! Пришлём письмо при релизе.</span>
              <span class="notify-form__success-note">(stub — в продакшне интеграция с Jivo / email-листом)</span>
            </div>
          </div>
        </div>
      </section>"""

    return f"""    <main>
      <section class="page-hero">
        <div class="container">
          <a class="product-back" href="/products/">← Все продукты</a>
          <div class="product-layout">
            <div>
              <h1 class="page-hero__title font-heading">{d['name']}</h1>
              <p class="product-tagline">{d['tagline']}</p>
              <p class="product-intro">{d['intro']}</p>{status}
              <h2 class="product-subtitle font-heading">Возможности</h2>
              <ul class="check-list">
{features}
              </ul>{not_included}
            </div>
            <aside class="product-sidebar">
              <div class="product-sidebar__price">{d['price']}</div>
              <p class="product-sidebar__note">{d['priceNote']}</p>
              <div class="product-sidebar__actions">
                <a class="btn btn--primary" href="/contacts/#demo" data-action="demo">Запросить КП / Демо</a>
                <a class="btn btn--secondary" href="/pricing/">Все цены и апгрейды</a>
              </div>
              <div class="product-sidebar__trust">
                <div class="product-sidebar__trust-item">1-й год поддержки включён</div>
                <div class="product-sidebar__trust-item">Self-hosted на VPS клиента</div>
                <div class="product-sidebar__trust-item">152-ФЗ из коробки</div>
              </div>
            </aside>
          </div>
        </div>
      </section>{notify}
      <section class="section section--muted">
        <div class="container">
          <h2 class="product-subtitle font-heading">Статьи по теме</h2>
          <div class="card-grid card-grid--3">
{articles_block(PRODUCT_ARTICLES[slug])}
          </div>
        </div>
      </section>
    </main>"""


PRICING_MAIN = """    <main>
      <div class="pricing-sticky-bar" aria-hidden="true">
        <div class="container pricing-sticky-bar__inner">
          <div class="pricing-sticky-bar__items">
            <span class="pricing-sticky-bar__item">Рег.Поинт <strong>100 000 ₽</strong></span>
            <span class="pricing-sticky-bar__item pricing-sticky-bar__item--sm">Промо.Про <strong>180 000 ₽</strong></span>
            <span class="pricing-sticky-bar__item pricing-sticky-bar__item--md">1-й год поддержки включён · Self-hosted · 152-ФЗ</span>
          </div>
          <a class="btn btn--white" href="/contacts/#demo" data-action="demo">Запросить КП</a>
        </div>
      </div>
      <section class="page-hero">
        <div class="container">
          <p class="section-label">Прозрачное ценообразование</p>
          <h1 class="page-hero__title font-heading">Цены и лицензии <span class="page-hero__title-accent">Рег.Поинт</span></h1>
          <p class="page-hero__lead section__prose" style="margin-bottom: 1rem">Фиксированные цены на модули — без скрытых платежей SaaS. <strong>1-й год</strong> обновлений и базовой поддержки <strong>включён в лицензию</strong>. Данные на VPS клиента; <strong>152-ФЗ</strong> — во всех пакетах без доплат.</p>
          <p class="page-hero__disclaimer">Цены ориентировочные на 2026 год, не являются публичной офертой. Итоговая стоимость — в коммерческом предложении с учётом выбранных модулей и услуг.</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <p class="pricing-block__label">Блок 1</p>
          <h2 class="pricing-block__title font-heading">Лицензии модулей (разово)</h2>
          <div class="table-scroll">
            <table class="pricing-table">
              <caption class="visually-hidden">Лицензии модулей Рег.Поинт</caption>
              <thead>
                <tr>
                  <th>Модуль</th>
                  <th>Лицензия</th>
                  <th>1-й год</th>
                  <th>С 2-го года *</th>
                </tr>
              </thead>
              <tbody>
                <tr><td class="pricing-table__module">Рег.Поинт</td><td class="pricing-table__price">100 000 ₽</td><td><span class="feature-matrix__check" aria-label="Включено">✓</span></td><td>от 35 000 ₽/год</td></tr>
                <tr><td class="pricing-table__module">Промо.Поинт</td><td class="pricing-table__price">80 000 ₽</td><td><span class="feature-matrix__check" aria-label="Включено">✓</span></td><td>от 30 000 ₽/год</td></tr>
                <tr><td class="pricing-table__module">Промо.Про</td><td class="pricing-table__price">180 000 ₽</td><td><span class="feature-matrix__check" aria-label="Включено">✓</span></td><td>от 55 000 ₽/год</td></tr>
                <tr><td class="pricing-table__module">Тикет.Поинт (add-on)</td><td class="pricing-table__price">+80 000 ₽</td><td><span class="feature-matrix__check" aria-label="Включено">✓</span></td><td>от 30 000 ₽/год</td></tr>
              </tbody>
            </table>
          </div>
          <p class="pricing-footnote">* Подписка — обновления, патчи безопасности, базовая поддержка. Точная сумма зависит от даты покупки и состава модулей.</p>
          <div class="pricing-info-grid">
            <div class="pricing-info-card">
              <h3 class="pricing-info-card__title font-heading">Что входит в каждую лицензию</h3>
              <ul class="check-list">
                <li>Развёртывание на 1 инстанс / 1 юрлицо (Docker на VPS клиента)</li>
                <li>Полный compliance-стек 152-ФЗ (шифрование, audit log, согласия per-event)</li>
                <li>Активация по коду в кабинете director</li>
              </ul>
            </div>
            <div class="pricing-info-card">
              <h3 class="pricing-info-card__title font-heading">Популярные комбинации</h3>
              <div class="pricing-combo-row"><div><div class="pricing-combo-row__scenario">Конференция, check-in</div><div class="pricing-combo-row__module">Рег.Поинт</div></div><div class="pricing-combo-row__price">100 000 ₽</div></div>
              <div class="pricing-combo-row"><div><div class="pricing-combo-row__scenario">Промо без чеков</div><div class="pricing-combo-row__module">Промо.Поинт</div></div><div class="pricing-combo-row__price">80 000 ₽</div></div>
              <div class="pricing-combo-row"><div><div class="pricing-combo-row__scenario">Промо + чеки ФНС + мероприятия</div><div class="pricing-combo-row__module">Промо.Про</div></div><div class="pricing-combo-row__price">180 000 ₽</div></div>
              <div class="pricing-combo-row"><div><div class="pricing-combo-row__scenario">Билеты + регистрация</div><div class="pricing-combo-row__module">Рег.Поинт + Тикет.Поинт</div></div><div class="pricing-combo-row__price">180 000 ₽</div></div>
            </div>
          </div>
          <div class="section__cta-wrap"><a class="btn btn--primary btn--lg" href="/contacts/#demo" data-action="demo">Запросить КП / Демо →</a></div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <p class="pricing-block__label">Блок 2</p>
          <h2 class="pricing-block__title font-heading">Апгрейды — расширить уже купленный модуль</h2>
          <div class="table-scroll">
            <table class="pricing-table pricing-table--accent-head">
              <thead><tr><th>Услуга</th><th>Цена</th><th class="pricing-table__note-col">Когда нужно</th></tr></thead>
              <tbody>
                <tr><td>Рег.Поинт → Промо.Про</td><td class="pricing-table__price">+80 000 ₽</td><td class="pricing-table__note-col">Появились промо с чеками и ФНС</td></tr>
                <tr><td>Промо.Поинт → Промо.Про</td><td class="pricing-table__price">+100 000 ₽</td><td class="pricing-table__note-col">Нужен полный стек: мероприятия + ФНС/OCR</td></tr>
                <tr><td>Рег.Поинт → + Промо.Поинт</td><td class="pricing-table__price">+50 000 ₽</td><td class="pricing-table__note-col">Промо-формы без проверки чеков</td></tr>
                <tr><td>+ Тикет.Поинт</td><td class="pricing-table__price">+80 000 ₽</td><td class="pricing-table__note-col">Платные билеты на мероприятия</td></tr>
                <tr><td>Второй инстанс (филиал)</td><td class="pricing-table__price">50% от лицензии</td><td class="pricing-table__note-col">Отдельное юрлицо или площадка</td></tr>
                <tr><td>Перевыпуск лицензии (смена VPS)</td><td class="pricing-table__price">15 000 ₽</td><td class="pricing-table__note-col">Миграция на новый сервер</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <p class="pricing-block__label">Блок 3</p>
          <h2 class="pricing-block__title font-heading">Внедрение на ваш VPS</h2>
          <div class="table-scroll">
            <table class="pricing-table pricing-table--accent-head">
              <thead><tr><th>Услуга</th><th>Цена</th><th class="pricing-table__note-col">Примечание</th></tr></thead>
              <tbody>
                <tr><td>Установка Docker + базовая настройка</td><td class="pricing-table__price">от 15 000 ₽</td><td class="pricing-table__note-col">Частично включена в Рег.Поинт / Промо.Про</td></tr>
                <tr><td>Turnkey «под ключ» (VPS + Docker + smoke)</td><td class="pricing-table__price">45 000 ₽</td><td class="pricing-table__note-col">Клиент предоставляет доступ к серверу</td></tr>
                <tr><td>Настройка HTTPS (Let's Encrypt)</td><td class="pricing-table__price">12 000 ₽</td><td class="pricing-table__note-col">На домене клиента</td></tr>
                <tr><td>Бэкап MySQL + проверка restore</td><td class="pricing-table__price">18 000 ₽</td><td class="pricing-table__note-col">Cron-скрипт остаётся у клиента</td></tr>
                <tr><td>Миграция данных (CSV, Excel)</td><td class="pricing-table__price">от 25 000 ₽</td><td class="pricing-table__note-col">Зависит от объёма</td></tr>
                <tr><td>Пакет заявки в ФНС (Open API)</td><td class="pricing-table__price">от 15 000 ₽</td><td class="pricing-table__note-col">Включена в Промо.Про; токен — на каждый инстанс</td></tr>
                <tr><td>Настройка ЮKassa + webhook (Тикет.Поинт)</td><td class="pricing-table__price">от 18 000 ₽</td><td class="pricing-table__note-col">Shop_id и secret — клиента</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <p class="pricing-block__label">Блок 4</p>
          <h2 class="pricing-block__title font-heading">Доработки под ваш процесс</h2>
          <div class="pricing-dev-grid">
            <div class="pricing-dev-card"><span class="pricing-dev-card__name">Кастомное поле / валидация</span><span class="pricing-dev-card__price">от 35 000 ₽</span></div>
            <div class="pricing-dev-card"><span class="pricing-dev-card__name">Кастомный отчёт / экспорт</span><span class="pricing-dev-card__price">от 45 000 ₽</span></div>
            <div class="pricing-dev-card"><span class="pricing-dev-card__name">White-label кабинета (логотип, цвета)</span><span class="pricing-dev-card__price">от 49 000 ₽</span></div>
            <div class="pricing-dev-card"><span class="pricing-dev-card__name">Интеграция CRM (Bitrix, amo и др.)</span><span class="pricing-dev-card__price">от 80 000 ₽</span></div>
            <div class="pricing-dev-card"><span class="pricing-dev-card__name">Интеграция 1С</span><span class="pricing-dev-card__price">от 120 000 ₽</span></div>
            <div class="pricing-dev-card"><span class="pricing-dev-card__name">Email / SMS уведомления</span><span class="pricing-dev-card__price">от 60 000 ₽</span></div>
          </div>
          <p class="pricing-footnote">Scope и срок — фиксируются в приложении к договору. Почасовая разработка не продаётся.</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <p class="pricing-block__label">Блок 5</p>
          <h2 class="pricing-block__title font-heading">Обучение и расширенная поддержка</h2>
          <div class="pricing-support-grid">
            <div>
              <table class="pricing-table pricing-table--accent-head">
                <thead><tr><th>Услуга</th><th>Цена</th></tr></thead>
                <tbody>
                  <tr><td>Обучение команды (2 ч, online)</td><td class="pricing-table__price">12 000 ₽</td></tr>
                  <tr><td>Расширенное обучение (4 ч)</td><td class="pricing-table__price">22 000 ₽</td></tr>
                  <tr><td>Расширенный SLA (реакция 4 ч)</td><td class="pricing-table__price">+59 000 ₽/год</td></tr>
                  <tr><td>Приоритетная линия (телефон / Telegram)</td><td class="pricing-table__price">+39 000 ₽/год</td></tr>
                  <tr><td>Аудит compliance-настроек инстанса</td><td class="pricing-table__price">35 000 ₽</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <p class="pricing-support__title font-heading">Консалтинг по 152-ФЗ <span class="pricing-support__subtitle">(не заменяет юридическое заключение)</span></p>
              <table class="pricing-table pricing-table--accent-head">
                <thead><tr><th>Услуга</th><th>Цена</th></tr></thead>
                <tbody>
                  <tr><td>Шаблоны текстов согласий (3 типа мероприятий)</td><td class="pricing-table__price">25 000 ₽</td></tr>
                  <tr><td>Ревью блока ПД перед pharma-ивентом</td><td class="pricing-table__price">35 000 ₽</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <p class="pricing-block__label">FAQ по ценам</p>
          <h2 class="pricing-block__title font-heading">Частые вопросы о стоимости</h2>
          <div class="accordion" data-accordion>
            <div class="accordion__item">
              <button type="button" class="accordion__trigger" aria-expanded="false">Почему нет помесячной подписки как у SaaS?<span class="accordion__icon" aria-hidden="true">▾</span></button>
              <div class="accordion__panel">Рег.Поинт — коробочная лицензия: вы платите за право установки на свой сервер и владение данными. Подписка со 2-го года — только за обновления и поддержку.</div>
            </div>
            <div class="accordion__item">
              <button type="button" class="accordion__trigger" aria-expanded="false">Что входит в первый год?<span class="accordion__icon" aria-hidden="true">▾</span></button>
              <div class="accordion__panel">Лицензия + обновления + базовая поддержка + патчи безопасности.</div>
            </div>
            <div class="accordion__item">
              <button type="button" class="accordion__trigger" aria-expanded="false">Можно ли купить только апгрейд без полной лицензии?<span class="accordion__icon" aria-hidden="true">▾</span></button>
              <div class="accordion__panel">Апгрейды — только при уже активной лицензии базового модуля.</div>
            </div>
            <div class="accordion__item">
              <button type="button" class="accordion__trigger" aria-expanded="false">Сколько стоит «под ключ» для первого мероприятия?<span class="accordion__icon" aria-hidden="true">▾</span></button>
              <div class="accordion__panel">Ориентир: лицензия Рег.Поинт (100 000 ₽) + turnkey внедрение (45 000 ₽) + обучение (12 000 ₽) ≈ 157 000 ₽ — уточняется в КП.</div>
            </div>
            <div class="accordion__item">
              <button type="button" class="accordion__trigger" aria-expanded="false">Есть ли скрытая комиссия с билетов?<span class="accordion__icon" aria-hidden="true">▾</span></button>
              <div class="accordion__panel">Нет. Оплата билетов идёт через ЮKassa заказчика; комиссия эквайринга — по договору клиента с ЮKassa.</div>
            </div>
          </div>
          <div class="pricing-cta-band">
            <div class="pricing-cta-band__inner">
              <div>
                <h2 class="pricing-cta-band__title font-heading">Нужен расчёт под ваш сценарий?</h2>
                <p class="pricing-cta-band__desc">Подберём модули и услуги внедрения — пришлём КП в течение 1–2 рабочих дней.</p>
              </div>
              <div class="pricing-cta-band__actions">
                <a class="btn btn--white" href="/contacts/#demo" data-action="demo">Запросить КП / Демо</a>
                <button type="button" class="btn btn--ghost-on-dark" data-action="contact">Связаться (Jivo)</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>"""

PRICING_FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {"@type": "Question", "name": "Почему нет помесячной подписки как у SaaS?", "acceptedAnswer": {"@type": "Answer", "text": "Рег.Поинт — коробочная лицензия: вы платите за право установки на свой сервер и владение данными. Подписка со 2-го года — только за обновления и поддержку."}},
        {"@type": "Question", "name": "Что входит в первый год?", "acceptedAnswer": {"@type": "Answer", "text": "Лицензия + обновления + базовая поддержка + патчи безопасности."}},
        {"@type": "Question", "name": "Можно ли купить только апгрейд без полной лицензии?", "acceptedAnswer": {"@type": "Answer", "text": "Апгрейды — только при уже активной лицензии базового модуля."}},
        {"@type": "Question", "name": "Сколько стоит «под ключ» для первого мероприятия?", "acceptedAnswer": {"@type": "Answer", "text": "Ориентир: лицензия Рег.Поинт (100 000 ₽) + turnkey внедрение (45 000 ₽) + обучение (12 000 ₽) ≈ 157 000 ₽ — уточняется в КП."}},
        {"@type": "Question", "name": "Есть ли скрытая комиссия с билетов?", "acceptedAnswer": {"@type": "Answer", "text": "Нет. Оплата билетов идёт через ЮKassa заказчика; комиссия эквайринга — по договору клиента с ЮKassa."}},
    ],
}


def product_schema(slug: str) -> dict:
    d = PRODUCTS_DATA[slug]
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": d["name"],
        "description": d["schema_desc"],
        "brand": ORG,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "RUB",
            "price": d["schema_price"],
            "availability": d["availability"],
            "priceValidUntil": "2026-12-31",
            "seller": ORG,
        },
        "url": f"https://reg-point.ru/products/{slug}/",
    }


def main():
    build_page(
        "products/index.html",
        {
            "title": "Модули Рег.Поинт — регистрация, промо, чеки ФНС, билеты",
            "desc": "Линейка модулей для мероприятий: Рег.Поинт, Промо.Поинт, Промо.Про, Тикет.Поинт. Self-hosted, 152-ФЗ. Сравните возможности.",
            "og_title": "Модули Рег.Поинт — регистрация, промо, чеки ФНС, билеты",
            "canonical": "https://reg-point.ru/products/",
        },
        "products",
        PRODUCTS_MAIN,
        '\n    <script src="/js/products.js" defer></script>',
    )

    for slug in PRODUCTS_DATA:
        d = PRODUCTS_DATA[slug]
        extra = '\n    <script src="/js/products.js" defer></script>' if slug == "ticket-point" else ""
        build_page(
            f"products/{slug}/index.html",
            {
                "title": d["title"],
                "desc": d["desc"],
                "og_title": d["title"],
                "canonical": f"https://reg-point.ru/products/{slug}/",
                "schema": product_schema(slug),
            },
            slug,
            product_main(slug),
            extra,
        )

    build_page(
        "pricing/index.html",
        {
            "title": "Цены Рег.Поинт 2026 — лицензии, подписка, внедрение и апгрейды",
            "desc": "Прозрачный прайс: Рег.Поинт от 100 000 ₽, Промо.Про 180 000 ₽, апгрейды и внедрение Docker. 1-й год поддержки в лицензии.",
            "og_title": "Цены Рег.Поинт 2026 — лицензии, подписка, внедрение и апгрейды",
            "canonical": "https://reg-point.ru/pricing/",
            "schema": PRICING_FAQ_SCHEMA,
        },
        "pricing",
        PRICING_MAIN,
        '\n    <script src="/js/pricing.js" defer></script>',
    )


if __name__ == "__main__":
    main()
