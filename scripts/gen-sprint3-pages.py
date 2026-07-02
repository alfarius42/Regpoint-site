#!/usr/bin/env python3
"""Generator for Sprint 3 content pages from products/index.html chrome."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
template = (ROOT / "products/index.html").read_text(encoding="utf-8")

main_start = template.index("<main>")
main_end = template.index("</main>")
footer_start = template.index('<footer class="site-footer">')
script_start = template.rindex('<script src="/js/config.js">')

CHROME_HEAD = template[template.index("<header"):main_start]
CHROME_TAIL = template[footer_start:script_start]

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


def build_page(path: str, meta: dict, body_page: str, main: str, extra_scripts: str = "") -> None:
    schema_block = ""
    if meta.get("schema"):
        schema_block = f'\n    <script type="application/ld+json">{json.dumps(meta["schema"], ensure_ascii=False)}</script>'

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


TECH_MAIN = """    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <p class="section-label">Архитектура</p>
          <h1 class="page-hero__title font-heading">Технологии и архитектура</h1>
          <p class="page-hero__lead"><strong>Рег.Поинт</strong> — модульный монолит: одно deployable-приложение (SPA + API), доменные модули изолированы, контракт — HTTP REST.</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="card-grid card-grid--2 card-grid--4 tech-card-grid">
            <article class="tech-card">
              <img class="tech-card__icon" src="/img/icons/trust-server.svg" width="22" height="22" alt="" />
              <h2 class="tech-card__title font-heading">Инфраструктура</h2>
              <ul class="tech-card__list">
                <li>Docker-compose на Linux VPS (2+ GB RAM)</li>
                <li>MySQL 8 — данные на сервере клиента</li>
                <li>HTTPS, runbook деплоя</li>
              </ul>
            </article>
            <article class="tech-card">
              <img class="tech-card__icon" src="/img/icons/trust-package.svg" width="22" height="22" alt="" />
              <h2 class="tech-card__title font-heading">Backend</h2>
              <ul class="tech-card__list">
                <li>Node.js 20, Express 4</li>
                <li>REST API (/api/…), публичные /api/public/*</li>
                <li>AES-256-GCM для ПД, audit log</li>
              </ul>
            </article>
            <article class="tech-card">
              <img class="tech-card__icon" src="/img/icons/trust-shield.svg" width="22" height="22" alt="" />
              <h2 class="tech-card__title font-heading">Frontend</h2>
              <ul class="tech-card__list">
                <li>React 18, TypeScript, Vite</li>
                <li>Публичные страницы регистрации</li>
                <li>SSR-ready static</li>
              </ul>
            </article>
            <article class="tech-card">
              <img class="tech-card__icon" src="/img/icons/trust-server.svg" width="22" height="22" alt="" />
              <h2 class="tech-card__title font-heading">Интеграции</h2>
              <ul class="tech-card__list">
                <li>API ФНС kkt-online (Промо.Про)</li>
                <li>ЮKassa (Тикет.Поинт)</li>
                <li>OCR Tesseract.js (fallback)</li>
              </ul>
            </article>
          </div>
          <div class="client-benefits">
            <div class="client-benefits__head">
              <h2 class="client-benefits__title font-heading">Что это значит для вас как заказчика</h2>
            </div>
            <div class="client-benefits__grid">
              <div class="client-benefits__col">
                <h3 class="client-benefits__name font-heading">Без vendor lock-in</h3>
                <p class="client-benefits__text">Docker-образ разворачивается на любом Linux VPS — у вашего хостера в РФ или на корпоративной инфраструктуре. Нет привязки к облаку конкретного вендора. Смена сервера — перевыпуск лицензии (15 000 ₽).</p>
              </div>
              <div class="client-benefits__col">
                <h3 class="client-benefits__name font-heading">Данные остаются у вас</h3>
                <p class="client-benefits__text">MySQL 8 хранит базу участников физически на вашем сервере. Рег.Поинт не имеет доступа к вашим данным после деплоя — нет «звонка домой», нет синхронизации в облако вендора.</p>
              </div>
              <div class="client-benefits__col">
                <h3 class="client-benefits__name font-heading">Стандартный стек — нет чёрных ящиков</h3>
                <p class="client-benefits__text">Node.js + MySQL + Docker — технологии, которые ваш DevOps уже знает. Runbook для деплоя прилагается к лицензии. REST API задокументирован — интеграции с вашей CRM через стандартные HTTP-запросы.</p>
              </div>
            </div>
          </div>
          <div class="tech-vps-grid">
            <div class="vps-spec">
              <h2 class="vps-spec__title font-heading">Минимальные требования к VPS</h2>
              <ul class="vps-spec__list">
                <li><span class="vps-spec__param">ОС</span><span>Ubuntu 22.04 LTS или Debian 12</span></li>
                <li><span class="vps-spec__param">CPU</span><span>2 vCPU (4 vCPU рекомендуется)</span></li>
                <li><span class="vps-spec__param">RAM</span><span>2 GB (4 GB для Промо.Про с OCR)</span></li>
                <li><span class="vps-spec__param">Диск</span><span>20 GB SSD (50 GB для production)</span></li>
                <li><span class="vps-spec__param">Сеть</span><span>Статический IP или домен с A-записью</span></li>
                <li><span class="vps-spec__param">HTTPS</span><span>Let's Encrypt — настраивается в runbook</span></li>
              </ul>
              <p class="vps-spec__foot">Хостеры РФ: Selectel, Timeweb Cloud, Beget VPS, МТС Cloud, Яндекс Cloud</p>
            </div>
            <div class="tech-vps-side">
              <div class="turnkey-card">
                <h3 class="turnkey-card__title font-heading">Нет своего DevOps?</h3>
                <p class="turnkey-card__text">Услуга «Turnkey» — развернём Рег.Поинт на вашем VPS, настроим HTTPS, проведём smoke-test. Всё, что нужно — предоставить SSH-доступ.</p>
                <div class="turnkey-card__price font-heading">45 000 ₽</div>
                <p class="turnkey-card__note">Turnkey-внедрение под ключ</p>
              </div>
              <a class="btn btn--primary btn--block" href="/contacts/#demo" data-action="demo">Запросить технические требования (PDF) →</a>
            </div>
          </div>
          <div class="api-block">
            <h2 class="api-block__title font-heading">REST API для интеграций</h2>
            <p class="api-block__text">Публичные endpoints <code class="api-block__code">/api/public/*</code> позволяют интегрировать Рег.Поинт с вашей CRM, сайтом или мобильным приложением. Кастомные интеграции — отдельный SKU внедрения.</p>
            <div class="api-tags">
              <span class="api-tag">Bitrix24</span>
              <span class="api-tag">amoCRM</span>
              <span class="api-tag">1С</span>
              <span class="api-tag">Telegram Bot</span>
              <span class="api-tag">Email / SMS</span>
              <span class="api-tag">Webhook</span>
            </div>
          </div>
        </div>
      </section>
    </main>"""

COMPLIANCE_MAIN = """    <main>
      <section class="page-hero page-hero--navy">
        <div class="container">
          <p class="section-label section-label--light">Правовое</p>
          <h1 class="page-hero__title font-heading page-hero__title--on-dark">Персональные данные на мероприятиях и <span class="page-hero__title-accent">152-ФЗ</span></h1>
          <p class="page-hero__lead page-hero__lead--on-dark">Регистрация участников — обработка ПД. Рег.Поинт проектируется с compliance-by-design: не как дополнительный тариф, а как базовая функция каждого модуля.</p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="card-grid card-grid--2 content-intro-grid">
            <div class="content-intro">
              <p class="section-label">Фундамент</p>
              <h2 class="content-intro__title font-heading">Self-hosted — фундамент compliance</h2>
              <p class="content-intro__text">Когда база на VPS заказчика, вы определяете: где физически хранятся данные, кто администратор, как устроены бэкапы и доступ. Это принципиально иной уровень контроля, чем SaaS с мультиарендностью.</p>
            </div>
            <div class="content-intro">
              <p class="section-label">Договор</p>
              <h2 class="content-intro__title font-heading">Соглашение об обработке ПД на мероприятие</h2>
              <p class="content-intro__text">Организатор указывает оператора ПД, цели обработки, ссылки на политику — для каждого event. Система не подставляет «общую» политику vendor'а.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="pricing-block-head">
            <p class="section-label">В каждом модуле</p>
            <h2 class="pricing-block__title font-heading">Что входит в compliance-стек</h2>
          </div>
          <div class="table-scroll">
            <table class="pricing-table pricing-table--compliance">
              <caption class="visually-hidden">Функции compliance в Рег.Поинт</caption>
              <thead>
                <tr>
                  <th>Функция</th>
                  <th>Описание</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Шифрование</td><td>AES-256-GCM для чувствительных полей</td></tr>
                <tr><td>Audit log</td><td>Журнал доступа к ПД (access_logs)</td></tr>
                <tr><td>Согласие</td><td>Текст согласия на каждое мероприятие — ручной ввод оператора</td></tr>
                <tr><td>Удаление</td><td>Публичный запрос участника на удаление ПД</td></tr>
                <tr><td>Роли</td><td>Маскирование ПД для manager</td></tr>
                <tr><td>Retention</td><td>Настраиваемый срок хранения</td></tr>
              </tbody>
            </table>
          </div>
          <div class="section-cta">
            <a class="btn btn--primary" href="/contacts/#demo" data-action="demo">Обсудить compliance для вашей отрасли</a>
          </div>
        </div>
      </section>
    </main>"""

HOW_MAIN = """    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <p class="section-label">Процесс</p>
          <h1 class="page-hero__title font-heading">Как это работает</h1>
          <p class="page-hero__lead">От лицензии до первого check-in — пошаговая схема коробочного внедрения</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container container--narrow">
          <ol class="steps-list">
            <li class="step-card">
              <span class="step-card__num font-heading" aria-hidden="true">01</span>
              <div class="step-card__body">
                <h2 class="step-card__title font-heading">Выбор модулей</h2>
                <p class="step-card__desc">По задаче: регистрация, промо, чеки, билеты</p>
              </div>
            </li>
            <li class="step-card">
              <span class="step-card__num font-heading" aria-hidden="true">02</span>
              <div class="step-card__body">
                <h2 class="step-card__title font-heading">Лицензия</h2>
                <p class="step-card__desc">Код активации + license.json — активация в кабинете director</p>
              </div>
            </li>
            <li class="step-card">
              <span class="step-card__num font-heading" aria-hidden="true">03</span>
              <div class="step-card__body">
                <h2 class="step-card__title font-heading">Развёртывание</h2>
                <p class="step-card__desc">Docker-compose на VPS (ваш DevOps или наше внедрение)</p>
              </div>
            </li>
            <li class="step-card">
              <span class="step-card__num font-heading" aria-hidden="true">04</span>
              <div class="step-card__body">
                <h2 class="step-card__title font-heading">Мероприятие</h2>
                <p class="step-card__desc">Создание, compliance-блок, брендинг</p>
              </div>
            </li>
            <li class="step-card">
              <span class="step-card__num font-heading" aria-hidden="true">05</span>
              <div class="step-card__body">
                <h2 class="step-card__title font-heading">Регистрация</h2>
                <p class="step-card__desc">Публичная ссылка /event/:id — участники регистрируются онлайн</p>
              </div>
            </li>
            <li class="step-card">
              <span class="step-card__num font-heading" aria-hidden="true">06</span>
              <div class="step-card__body">
                <h2 class="step-card__title font-heading">Check-in / отчёты</h2>
                <p class="step-card__desc">QR на площадке, экспорт CSV, attendance report</p>
              </div>
            </li>
          </ol>
          <div class="section-cta">
            <a class="btn btn--primary" href="/contacts/#demo" data-action="demo">Запросить демо</a>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="pricing-block-head">
            <p class="section-label">Сравнение</p>
            <h2 class="pricing-block__title font-heading">Self-hosted vs SaaS — в чём разница</h2>
            <p class="section__subtitle">Почему коробка, а не облачная подписка, важна для B2B и regulated-отраслей.</p>
          </div>
          <div class="table-scroll">
            <table class="compare-table">
              <caption class="visually-hidden">Сравнение Self-hosted и SaaS</caption>
              <thead>
                <tr>
                  <th>Параметр</th>
                  <th class="compare-table__self">Рег.Поинт (Self-hosted)</th>
                  <th>Типичный SaaS-регистратор</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Где хранятся данные участников</td><td class="compare-table__self">На VPS заказчика — физически</td><td>На серверах SaaS-провайдера (multi-tenant)</td></tr>
                <tr><td>Оператор ПД по 152-ФЗ</td><td class="compare-table__self">Заказчик / агентство</td><td>SaaS-компания (третья сторона)</td></tr>
                <tr><td>Доступ провайдера к данным</td><td class="compare-table__self">Нет — закрытый инстанс</td><td>Есть — администраторы SaaS имеют доступ</td></tr>
                <tr><td>Соответствие требованиям банков / pharma</td><td class="compare-table__self">✓ Локализация ПД на инфраструктуре клиента</td><td>✗ Данные за пределами корп. периметра</td></tr>
                <tr><td>Установка на сервер заказчика</td><td class="compare-table__self">✓ Docker-compose, runbook</td><td>✗ Невозможно — SaaS архитектура</td></tr>
                <tr><td>Стоимость в долгосрочной перспективе</td><td class="compare-table__self">Разовая лицензия + подписка с 2-го года</td><td>Ежемесячные платежи / % от участников бессрочно</td></tr>
                <tr><td>Обновления и контроль версий</td><td class="compare-table__self">По расписанию команды заказчика</td><td>Автоматически (без возможности заморозить)</td></tr>
                <tr><td>Offline-режим на площадке</td><td class="compare-table__self">✓ Check-in без интернета</td><td>Зависит от провайдера, чаще нет</td></tr>
                <tr><td>Брендинг и кастомизация</td><td class="compare-table__self">Полная (белый лейбл — SKU)</td><td>Ограниченная шаблонами SaaS</td></tr>
                <tr><td>White-label для перепродажи</td><td class="compare-table__self">✓ Апгрейд SKU</td><td>✗ Обычно запрещено ToS</td></tr>
              </tbody>
            </table>
          </div>
          <div class="section-cta section-cta--row">
            <a class="btn btn--primary" href="/contacts/#demo" data-action="demo">Запросить КП / Демо →</a>
            <a class="btn btn--outline" href="/technology/">Технологии подробнее</a>
          </div>
        </div>
      </section>
    </main>"""

SCENARIOS = [
    {
        "title": "Деловая конференция 500+",
        "module": "Рег.Поинт",
        "module_id": "reg-point",
        "tag": "B2B · корпоратив · форум",
        "details": [
            "Публичная страница регистрации с брендингом",
            "Импорт VIP-списка из Excel заказчика",
            "QR check-in на 2–4 входах одновременно",
            "Offline-режим при нестабильном WiFi на площадке",
            "Отчёт attendance + экспорт CSV для заказчика",
        ],
        "compliance": "152-ФЗ per-event — критично для банков и госкорпораций",
    },
    {
        "title": "BTL-акция в торговой сети",
        "module": "Промо.Поинт",
        "module_id": "promo-point",
        "tag": "BTL · промо · sampling",
        "details": [
            "Кастомные поля: размер, вкус, предпочтение продукта",
            "Брендинг страницы под акцию сети",
            "Ограничение регистраций по региону / городу",
            "Выгрузка базы участников в CRM агентства",
            "152-ФЗ: согласие на получение промо-рассылок",
        ],
        "compliance": "Данные на сервере агентства — не у ретейлера и не у SaaS-провайдера",
    },
    {
        "title": "«Приз за чек» — акция с верификацией",
        "module": "Промо.Про",
        "module_id": "promo-pro",
        "tag": "promo · ФНС · антифрод",
        "details": [
            "Проверка чека через API ФНС (kkt-online)",
            "OCR fallback при недоступности ФНС",
            "Белый список ИНН партнёров акции",
            "Один телефон — N регистраций за период",
            "Ручная модерация спорных чеков директором",
        ],
        "compliance": "Полный audit trail для отчётности перед заказчиком акции",
    },
    {
        "title": "Платный воркшоп / мастер-класс",
        "module": "Тикет.Поинт",
        "module_id": "ticket-point",
        "tag": "билеты · ЮKassa · платёж",
        "details": [
            "Несколько категорий: стандарт / VIP / онлайн",
            "Оплата через ЮKassa заказчика (деньги — клиенту)",
            "Автоматическая отправка билета на email",
            "QR check-in на входе — тот же, что в Рег.Поинт",
            "Отчёт по продажам и возвратам",
        ],
        "compliance": "Модуль в разработке — запишитесь на уведомление о релизе",
    },
    {
        "title": "Pharma / banking event",
        "module": "Рег.Поинт",
        "module_id": "reg-point",
        "tag": "regulated · 152-ФЗ · enterprise",
        "details": [
            "Данные на корпоративном VPS заказчика",
            "Соглашение об обработке ПД с указанием DPO",
            "Роли: director видит всё, manager — только имя + статус",
            "Шифрование AES-256-GCM + audit log",
            "Настраиваемый срок хранения (нет фиксированного retention)",
        ],
        "compliance": "Один DPA — с Рег.Поинт, без цепочки SaaS-провайдеров",
    },
]

MATRIX_ROWS = [
    ("Регистрация участников онлайн", [True, True, True, False]),
    ("QR check-in на входе", [True, False, True, True]),
    ("Промо-форма с кастом-полями", [False, True, True, False]),
    ("Проверка чека ФНС", [False, False, True, False]),
    ("Продажа билетов + оплата", [False, False, False, True]),
    ("Self-hosted, 152-ФЗ из коробки", [True, True, True, True]),
]


def scenario_cards_html() -> str:
    parts = []
    for s in SCENARIOS:
        details = "".join(f"<li>{d}</li>" for d in s["details"])
        parts.append(f"""            <article class="scenario-card" data-module="{s['module']}">
              <div class="scenario-card__grid">
                <div class="scenario-card__col scenario-card__col--title">
                  <p class="scenario-card__tag">{s['tag']}</p>
                  <h2 class="scenario-card__title font-heading">{s['title']}</h2>
                  <a class="scenario-card__module" href="/products/{s['module_id']}/">{s['module']} →</a>
                </div>
                <div class="scenario-card__col">
                  <p class="scenario-card__label">Что даёт</p>
                  <ul class="check-list check-list--scenario">{details}</ul>
                </div>
                <div class="scenario-card__col scenario-card__col--compliance">
                  <p class="scenario-card__label">152-ФЗ / Контроль</p>
                  <p class="scenario-card__compliance">{s['compliance']}</p>
                </div>
              </div>
            </article>""")
    return "\n".join(parts)


def matrix_rows_html() -> str:
    rows = []
    for task, vals in MATRIX_ROWS:
        cells = "".join(
            '<td><span class="feature-matrix__check" aria-label="Да">✓</span></td>'
            if v else '<td><span class="feature-matrix__dash">—</span></td>'
            for v in vals
        )
        rows.append(f"                <tr><td>{task}</td>{cells}</tr>")
    return "\n".join(rows)


SCENARIOS_MAIN = f"""    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <p class="section-label">Применение</p>
          <h1 class="page-hero__title font-heading">Сценарии использования</h1>
          <p class="page-hero__lead">Как event-агентства и организаторы используют модули Рег.Поинт</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="filter-chips" role="group" aria-label="Фильтр по модулю">
            <button type="button" class="filter-chip is-active" data-filter="all">Все сценарии</button>
            <button type="button" class="filter-chip" data-filter="Рег.Поинт">Рег.Поинт</button>
            <button type="button" class="filter-chip" data-filter="Промо.Поинт">Промо.Поинт</button>
            <button type="button" class="filter-chip" data-filter="Промо.Про">Промо.Про</button>
            <button type="button" class="filter-chip" data-filter="Тикет.Поинт">Тикет.Поинт</button>
          </div>
          <div class="scenario-list" id="scenario-list">
{scenario_cards_html()}
          </div>
          <p class="scenario-empty" id="scenario-empty" hidden>Нет сценариев для выбранного модуля. <button type="button" class="scenario-empty__reset" data-filter="all">Показать все</button></p>
          <div class="module-matrix-wrap">
            <div class="module-matrix-wrap__head">
              <h2 class="module-matrix-wrap__title font-heading">Быстрый выбор модуля по задаче</h2>
            </div>
            <div class="table-scroll">
              <table class="module-matrix">
                <caption class="visually-hidden">Матрица выбора модуля по задаче</caption>
                <thead>
                  <tr>
                    <th>Задача</th>
                    <th>Рег.Поинт</th>
                    <th>Промо.Поинт</th>
                    <th>Промо.Про</th>
                    <th>Тикет.Поинт</th>
                  </tr>
                </thead>
                <tbody>
{matrix_rows_html()}
                </tbody>
              </table>
            </div>
          </div>
          <div class="section-cta">
            <a class="btn btn--primary" href="/contacts/#demo" data-action="demo">Обсудить ваш сценарий →</a>
          </div>
        </div>
      </section>
    </main>"""

FAQS = [
    ("Рег.Поинт — это SaaS?", "Нет. Это коробочная лицензия: приложение разворачивается на VPS клиента через Docker. Данные хранятся в MySQL на сервере заказчика."),
    ("Чем отличается от Eventbrite / Timepad / SaaS-регистраторов?", "Те — multi-tenant SaaS: база участников на стороне провайдера. Рег.Поинт — single-tenant на инфраструктуре клиента. Персональные данные не покидают ваш сервер."),
    ("Какие модули нужны для конференции?", "Обычно достаточно Рег.Поинт: онлайн-запись + check-in. Если нужны платные билеты — добавьте Тикет.Поинт."),
    ("Как обстоят дела с 152-ФЗ?", "Compliance-стек в каждом модуле без доплат. Шифрование AES-256-GCM, audit log, согласия per-event, маскирование для менеджеров, запрос удаления ПД участником."),
    ("Нужен ли отдельный сервер?", "Linux VPS от 2 GB RAM, Docker. Требования — в документации / по запросу. Turnkey внедрение — опциональная услуга от 45 000 ₽."),
    ("Как проходят обновления?", "Подписка со 2-го года; патчи безопасности и новые версии Docker-образов. 1-й год включён в лицензию."),
    ("Можно ли интегрировать с нашей CRM?", "REST API; кастомные интеграции — SKU внедрения (Bitrix, amo и др. от 80 000 ₽)."),
    ("Где хранятся данные с формы на этом сайте?", "Заявки и переписка обрабатываются через Jivo (ООО «Живой Сайт», РФ) согласно Политике конфиденциальности."),
]


def faq_items_html() -> str:
    parts = []
    for i, (q, a) in enumerate(FAQS):
        parts.append(f"""            <div class="accordion__item">
              <button type="button" class="accordion__trigger" aria-expanded="false" id="faq-trigger-{i}" aria-controls="faq-panel-{i}">
                <span>{q}</span>
                <span class="accordion__icon" aria-hidden="true">▾</span>
              </button>
              <div class="accordion__panel" id="faq-panel-{i}" role="region" aria-labelledby="faq-trigger-{i}">{a}</div>
            </div>""")
    return "\n".join(parts)


FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
        for q, a in FAQS
    ],
}

FAQ_MAIN = f"""    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <h1 class="page-hero__title font-heading">Частые вопросы</h1>
          <p class="page-hero__lead">Ответы: SaaS или коробка, где данные, цены, модули, 152-ФЗ, обновления, поддержка.</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container container--faq">
          <div class="accordion accordion--faq">
{faq_items_html()}
          </div>
        </div>
      </section>
    </main>"""

CONTACTS_MAIN = """    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <h1 class="page-hero__title font-heading">Контакты</h1>
          <p class="page-hero__lead">Запросите коммерческое предложение или демо. Чат поддержки. Email.</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="contacts-layout">
            <div class="contacts-main">
              <div class="contacts-form-wrap" id="demo">
                <div class="contacts-form__head">
                  <h2 class="contacts-form__title font-heading">Запросить КП / Демо</h2>
                  <p class="contacts-form__sub">Ответим в течение 1–2 рабочих дней</p>
                </div>
                <p class="contacts-form__stub"><strong>Prototype stub.</strong> В продакшне — embed Jivo Contact Form (§4.2 спеки). Данные через Jivo (РФ, 152-ФЗ).</p>
                <div class="contacts-form__success" id="contacts-success" hidden>
                  <p class="contacts-form__success-title font-heading">Заявка отправлена</p>
                  <p class="contacts-form__success-text">Свяжемся с вами в течение 1–2 рабочих дней.</p>
                </div>
                <form class="contacts-form" id="contacts-form">
                  <div class="contacts-form__row">
                    <div class="contacts-form__field">
                      <label class="contacts-form__label" for="cf-name">Имя *</label>
                      <input class="contacts-form__input" type="text" id="cf-name" name="name" required autocomplete="name" />
                    </div>
                    <div class="contacts-form__field">
                      <label class="contacts-form__label" for="cf-company">Компания *</label>
                      <input class="contacts-form__input" type="text" id="cf-company" name="company" required autocomplete="organization" />
                    </div>
                  </div>
                  <div class="contacts-form__row">
                    <div class="contacts-form__field">
                      <label class="contacts-form__label" for="cf-email">Email *</label>
                      <input class="contacts-form__input" type="email" id="cf-email" name="email" required autocomplete="email" />
                    </div>
                    <div class="contacts-form__field">
                      <label class="contacts-form__label" for="cf-phone">Телефон</label>
                      <input class="contacts-form__input" type="tel" id="cf-phone" name="phone" autocomplete="tel" />
                    </div>
                  </div>
                  <div class="contacts-form__field">
                    <label class="contacts-form__label" for="cf-module">Интересующий модуль *</label>
                    <select class="contacts-form__input contacts-form__select" id="cf-module" name="module" required>
                      <option value="">Выберите модуль...</option>
                      <option>Рег.Поинт</option>
                      <option>Промо.Поинт</option>
                      <option>Промо.Про</option>
                      <option>Тикет.Поинт</option>
                      <option>Не знаю</option>
                    </select>
                  </div>
                  <div class="contacts-form__field">
                    <label class="contacts-form__label" for="cf-comment">Комментарий</label>
                    <textarea class="contacts-form__input contacts-form__textarea" id="cf-comment" name="comment" rows="4" placeholder="Опишите вашу задачу..."></textarea>
                  </div>
                  <div class="contacts-form__consent">
                    <input type="checkbox" id="cf-consent" name="consent" required />
                    <label for="cf-consent">Согласен с <a href="/privacy/">обработкой персональных данных</a> согласно Политике конфиденциальности *</label>
                  </div>
                  <button type="submit" class="btn btn--primary btn--block contacts-form__submit">Отправить заявку</button>
                </form>
              </div>
            </div>
            <aside class="contacts-sidebar">
              <div class="contacts-sidebar__card">
                <h3 class="contacts-sidebar__title font-heading">Связаться напрямую</h3>
                <button type="button" class="btn btn--primary btn--block" data-action="contact">Открыть чат</button>
                <p class="contacts-sidebar__note">Jivo · онлайн-чат · Telegram</p>
              </div>
              <div class="contacts-sidebar__info">
                <div class="contacts-sidebar__info-item">
                  <p class="contacts-sidebar__info-title font-heading">Время ответа</p>
                  <p class="contacts-sidebar__info-text">Рабочие дни: до 2 часов<br />Вне рабочих часов: до 4 часов (следующий рабочий день)</p>
                </div>
                <div class="contacts-sidebar__info-item">
                  <p class="contacts-sidebar__info-title font-heading">Данные формы</p>
                  <p class="contacts-sidebar__info-text">Обрабатываются через Jivo (ООО «Живой Сайт», РФ, 152-ФЗ)</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section class="section section--muted contacts-support">
        <div class="container">
          <div class="card-grid card-grid--2 contacts-support-grid">
            <div class="contacts-support-card">
              <p class="section-label">Для существующих клиентов</p>
              <h3 class="contacts-support-card__title font-heading">Техническая поддержка</h3>
              <p class="contacts-support-card__text">Если у вас уже есть лицензия Рег.Поинт и вам нужна помощь с инстансом, обновлением или настройкой — обратитесь в чат с указанием вашего лицензионного ID.</p>
              <ul class="check-list">
                <li>Базовая поддержка — включена в 1-й год</li>
                <li>Расширенный SLA — от 59 000 ₽/год</li>
                <li>Приоритетная линия — от 39 000 ₽/год</li>
              </ul>
              <button type="button" class="btn btn--outline btn--block" data-action="contact">Написать в поддержку</button>
            </div>
            <div class="contacts-support-card">
              <p class="section-label">Для новых клиентов</p>
              <h3 class="contacts-support-card__title font-heading">Предпродажные вопросы</h3>
              <p class="contacts-support-card__text">Если вы рассматриваете Рег.Поинт для вашего проекта и хотите обсудить модули, ценообразование или провести демо — заполните форму выше или напишите в чат.</p>
              <ul class="check-list">
                <li>Демо под ваш сценарий — бесплатно</li>
                <li>КП в течение 1–2 рабочих дней</li>
                <li>Пилот / тестовый период — по запросу</li>
              </ul>
              <button type="button" class="btn btn--primary btn--block" id="scroll-to-demo">Заполнить форму выше →</button>
            </div>
          </div>
        </div>
      </section>
    </main>"""

PAGES = [
    ("technology/index.html", "technology", TECH_MAIN, {
        "title": "Технологии Рег.Поинт — Docker, REST API, модульный монолит",
        "desc": "Node.js, React, MySQL 8, Docker-compose. Модульный монолит с REST API. Развёртывание на Linux VPS. Без vendor lock-in SaaS.",
        "canonical": "https://reg-point.ru/technology/",
        "og_title": "Технологии Рег.Поинт — Docker, REST API, модульный монолит",
    }, ""),
    ("compliance-152fz/index.html", "compliance", COMPLIANCE_MAIN, {
        "title": "152-ФЗ в Рег.Поинт — персональные данные на вашем сервере",
        "desc": "Шифрование ПД, audit log, согласия per-event, запрос удаления, self-hosted. Как Рег.Поинт помогает соблюдать 152-ФЗ на мероприятиях.",
        "canonical": "https://reg-point.ru/compliance-152fz/",
        "og_title": "152-ФЗ в Рег.Поинт — персональные данные на вашем сервере",
    }, ""),
    ("how-it-works/index.html", "how-it-works", HOW_MAIN, {
        "title": "Как работает Рег.Поинт — от лицензии до первого check-in",
        "desc": "Лицензия → Docker на VPS → настройка мероприятия → публичная регистрация → check-in. Пошаговая схема коробочного внедрения.",
        "canonical": "https://reg-point.ru/how-it-works/",
        "og_title": "Как работает Рег.Поинт — от лицензии до первого check-in",
    }, ""),
    ("scenarios/index.html", "scenarios", SCENARIOS_MAIN, {
        "title": "Сценарии использования Рег.Поинт — конференции, промо, билеты",
        "desc": "Как event-агентства и организаторы используют модули Рег.Поинт: конференции, BTL-акции, промо с чеками, продажа билетов.",
        "canonical": "https://reg-point.ru/scenarios/",
        "og_title": "Сценарии использования Рег.Поинт — конференции, промо, билеты",
    }, '\n    <script src="/js/scenarios.js" defer></script>'),
    ("faq/index.html", "faq", FAQ_MAIN, {
        "title": "FAQ — частые вопросы о Рег.Поинт",
        "desc": "Ответы: SaaS или коробка, где данные, цены, модули, 152-ФЗ, обновления, поддержка.",
        "canonical": "https://reg-point.ru/faq/",
        "og_title": "FAQ — частые вопросы о Рег.Поинт",
        "schema": FAQ_SCHEMA,
    }, '\n    <script src="/js/faq.js" defer></script>'),
    ("contacts/index.html", "contacts", CONTACTS_MAIN, {
        "title": "Контакты Рег.Поинт — демо, КП, поддержка",
        "desc": "Запросите коммерческое предложение или демо. Чат поддержки. Рег.Поинт — коробочная платформа для мероприятий.",
        "canonical": "https://reg-point.ru/contacts/",
        "og_title": "Контакты Рег.Поинт — демо, КП, поддержка",
    }, '\n    <script src="/js/contacts.js" defer></script>'),
]


if __name__ == "__main__":
    for path, body_page, main, meta, scripts in PAGES:
        build_page(path, meta, body_page, main, scripts)
