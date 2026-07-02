#!/usr/bin/env python3
"""Sprint 4: privacy page + cookie banner patch across all RU pages."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
template = (ROOT / "faq/index.html").read_text(encoding="utf-8")

main_start = template.index("<main>")
main_end = template.index("</main>")
footer_start = template.index('<footer class="site-footer">')
script_start = template.rindex('<script src="/js/config.js">')

CHROME_HEAD = template[template.index("<header"):main_start]
CHROME_TAIL = template[footer_start:script_start]
_cookie_idx = CHROME_TAIL.find('<div class="cookie-banner"')
if _cookie_idx != -1:
    CHROME_TAIL = CHROME_TAIL[:_cookie_idx].rstrip() + "\n"

SCRIPTS_BASE = """    <script src="/js/config.js"></script>
    <script src="/js/jivo.js"></script>
    <script src="/js/header.js" defer></script>
    <script src="/js/lang.js" defer></script>
    <script src="/js/contact.js" defer></script>"""

SCRIPTS_END = """
    <script src="/js/analytics.js" defer></script>
    <script src="/js/cookies.js" defer></script>
    <script src="/js/seo.js" defer></script>
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

COOKIE_BANNER = """    <div class="cookie-banner" id="cookie-banner" hidden>
      <div class="container cookie-banner__inner">
        <p class="cookie-banner__text">
          Мы используем cookie для аналитики (Яндекс.Метрика). Данные обрабатываются согласно
          <a href="/privacy/">Политике конфиденциальности</a>.
          Заявки обрабатываются через Jivo (РФ, 152-ФЗ).
        </p>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn--white btn--cookie" id="cookie-accept">Принять</button>
          <button type="button" class="btn btn--outline-on-dark btn--cookie" id="cookie-essential">Только необходимые</button>
        </div>
      </div>
    </div>"""

PRIVACY_MAIN = """    <main>
      <section class="page-hero page-hero--privacy">
        <div class="container container--narrow">
          <h1 class="page-hero__title font-heading">Политика конфиденциальности</h1>
          <p class="page-hero__updated">Последнее обновление: январь 2026</p>
        </div>
      </section>
      <section class="section privacy-body">
        <div class="container container--narrow">
          <div class="privacy-sections">
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">1. Оператор сайта</h2>
              <p class="privacy-section__text">Настоящая политика определяет порядок обработки персональных данных на сайте reg-point.ru. Оператор персональных данных — индивидуальный предприниматель Мельникова Ксения Антоновна (ИНН&nbsp;644917769371, ОГРНИП&nbsp;325508100578539), самостоятельно определяющая цели обработки персональных данных, состав персональных данных, подлежащих обработке, а также действия (операции), совершаемые с персональными данными.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">2. Какие данные и для каких целей обрабатываются</h2>
              <p class="privacy-section__text">Оператор обрабатывает только персональные данные, соответствующие заявленным целям обработки и не являющиеся избыточными по отношению к таким целям. На сайте могут обрабатываться имя, адрес электронной почты, номер телефона, наименование компании, сведения об интересующем модуле, содержание обращения, а также технические данные, связанные с использованием cookie и посещением сайта. Цели обработки включают обработку запросов на коммерческое предложение или демонстрацию продукта, ведение переписки и поддержки через Jivo, рассмотрение обращений субъектов персональных данных, а также аналитику использования сайта с применением Яндекс.Метрики после получения согласия субъекта персональных данных.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">3. Правовые основания и способы обработки</h2>
              <p class="privacy-section__text">Обработка персональных данных осуществляется на законной и справедливой основе в соответствии со статьями&nbsp;5, 6 и 9 Федерального закона №152-ФЗ. Основным правовым основанием обработки является согласие субъекта персональных данных, а также необходимость обработки в связи с обращением субъекта персональных данных за коммерческим предложением, демонстрацией продукта или консультацией. Оператор вправе осуществлять сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), использование, предоставление в пределах заявленных целей, блокирование и уничтожение персональных данных с использованием средств автоматизации либо без использования таких средств.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">4. Сроки обработки, уточнение и уничтожение данных</h2>
              <p class="privacy-section__text">Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки, если иной срок хранения не установлен федеральным законом, договором либо иным предусмотренным законом основанием. При достижении целей обработки либо при отзыве согласия субъектом персональных данных оператор прекращает обработку и уничтожает персональные данные либо обеспечивает их уничтожение в срок, не превышающий 30&nbsp;дней, если иное не предусмотрено законодательством Российской Федерации. В случае подтверждения факта неполноты, неточности или неактуальности персональных данных оператор вносит необходимые изменения в сроки, установленные законом.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">5. Поручение обработки и меры защиты</h2>
              <p class="privacy-section__text">Чат и формы сайта обслуживаются сервисом Jivo (ООО «Живой Сайт», Российская Федерация), который осуществляет обработку персональных данных по поручению оператора в пределах установленных целей обработки. Яндекс.Метрика применяется только после получения согласия пользователя на использование аналитических cookie. Оператор и лица, осуществляющие обработку персональных данных по поручению оператора, обязаны соблюдать конфиденциальность персональных данных и принимать необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">6. Cookie и аналитика</h2>
              <p class="privacy-section__text">Сайт использует cookie, необходимые для корректной работы сайта, сохранения пользовательских настроек, функционирования Jivo и осуществления аналитики. Аналитические cookie Яндекс.Метрики активируются только после получения согласия пользователя посредством cookie-баннера. Пользователь вправе предоставить согласие на использование аналитических cookie либо оставить только необходимые cookie, обеспечивающие функционирование сайта.</p>
              <div class="table-scroll privacy-table-wrap">
                <table class="pricing-table pricing-table--compliance privacy-table">
                  <caption class="visually-hidden">Типы cookie на сайте Рег.Поинт</caption>
                  <thead>
                    <tr>
                      <th>Тип</th>
                      <th>Назначение</th>
                      <th>Срок</th>
                      <th>Отключить</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Необходимые</td>
                      <td>Работа сайта, сессия, lang-cookie</td>
                      <td>Сессия</td>
                      <td>Нельзя — критичны для работы</td>
                    </tr>
                    <tr>
                      <td>Аналитические</td>
                      <td>Яндекс.Метрика — подсчёт посещений, вебвизор</td>
                      <td>1 год</td>
                      <td>Через баннер cookie</td>
                    </tr>
                    <tr>
                      <td>Функциональные</td>
                      <td>Jivo — онлайн-чат, сохранение диалога</td>
                      <td>1 год</td>
                      <td>Через баннер cookie</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">7. Права субъекта ПД</h2>
              <p class="privacy-section__text">Субъект персональных данных вправе получать информацию, касающуюся обработки его персональных данных, требовать уточнения, блокирования или уничтожения персональных данных, если такие данные являются неполными, устаревшими, неточными, незаконно полученными либо не являются необходимыми для заявленной цели обработки, а также отозвать согласие на обработку персональных данных. Для отзыва согласия, направления требования об удалении, блокировании или уточнении персональных данных необходимо обратиться в онлайн-чат Jivo на сайте. Оператор вправе запросить сведения, необходимые для идентификации заявителя и подтверждения факта обработки его персональных данных.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">8. Обращения и обжалование</h2>
              <p class="privacy-section__text">По вопросам обработки персональных данных, отзыва согласия и реализации прав субъекта персональных данных следует обращаться в онлайн-чат Jivo на сайте. Обращения рассматриваются оператором в сроки, установленные Федеральным законом №152-ФЗ. В случае, если субъект персональных данных полагает, что обработка его персональных данных осуществляется с нарушением требований законодательства Российской Федерации, он вправе обратиться в уполномоченный орган по защите прав субъектов персональных данных либо в суд.</p>
            </article>
          </div>
        </div>
      </section>
    </main>"""

META = {
    "title": "Политика конфиденциальности | Рег.Поинт",
    "desc": "Политика обработки персональных данных сайта Рег.Поинт. Оператор, цели, Jivo, cookie, права субъекта.",
    "canonical": "https://reg-point.ru/privacy/",
    "og_title": "Политика конфиденциальности | Рег.Поинт",
}

COOKIE_PATTERN = re.compile(
    r'    <div class="cookie-banner" id="cookie-banner" hidden>.*?</div>\s*\n',
    re.DOTALL,
)

SEO_SCRIPT_OLD = re.compile(
    r'(\s*<script src="/js/cookies\.js" defer></script>\s*\n)(\s*<script src="/js/bootstrap\.js" defer></script>)',
)

HTML_PAGES = [
    ROOT / "index.html",
    ROOT / "products/index.html",
    ROOT / "products/reg-point/index.html",
    ROOT / "products/promo-point/index.html",
    ROOT / "products/promo-pro/index.html",
    ROOT / "products/ticket-point/index.html",
    ROOT / "pricing/index.html",
    ROOT / "technology/index.html",
    ROOT / "compliance-152fz/index.html",
    ROOT / "how-it-works/index.html",
    ROOT / "scenarios/index.html",
    ROOT / "faq/index.html",
    ROOT / "contacts/index.html",
]


def build_privacy_page() -> None:
    chrome_tail = CHROME_TAIL.replace(
        '<li><a href="/privacy/">Политика конфиденциальности</a></li>',
        '<li><a href="/privacy/" aria-current="page">Политика конфиденциальности</a></li>',
        1,
    )
    html = f"""<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{META['title']}</title>
    <meta name="description" content="{META['desc']}" />
    <link rel="canonical" href="{META['canonical']}" />
    <meta property="og:title" content="{META['og_title']}" />
    <meta property="og:description" content="{META['desc']}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{META['canonical']}" />
    <meta property="og:locale" content="ru_RU" />
{ICON_LINKS}
{CSS_LINKS}
  </head>
  <body data-page="privacy">
{CHROME_HEAD}
{PRIVACY_MAIN}
{chrome_tail}{COOKIE_BANNER}

{SCRIPTS_BASE}{SCRIPTS_END}
"""
    out = ROOT / "privacy/index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"Wrote {out.relative_to(ROOT)}")


def patch_cookie_banner(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    updated = text

    while updated.count('id="cookie-banner"') > 1:
        first = updated.find('<div class="cookie-banner"')
        second = updated.find('<div class="cookie-banner"', first + 1)
        if second == -1:
            break
        end = updated.find('</div>', second)
        end = updated.find('</div>', end + 6)  # inner container
        end = updated.find('</div>', end + 6)  # banner root
        updated = updated[:first] + updated[end + 6:].lstrip("\n")

    if 'id="cookie-essential"' not in updated or 'btn--outline-on-dark' not in updated:
        if COOKIE_PATTERN.search(updated):
            updated = COOKIE_PATTERN.sub(COOKIE_BANNER + "\n\n", updated, count=1)

    updated = re.sub(
        r'\n    </div>\n\n(?=\s*<script src="/js/config.js">)',
        '\n\n',
        updated,
    )

    if 'src="/js/seo.js"' not in updated:
        updated = SEO_SCRIPT_OLD.sub(
            r'\1    <script src="/js/seo.js" defer></script>\n\2',
            updated,
            count=1,
        )

    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Patched {path.relative_to(ROOT)}")


if __name__ == "__main__":
    build_privacy_page()
    for page in HTML_PAGES:
        patch_cookie_banner(page)
    patch_cookie_banner(ROOT / "privacy/index.html")
