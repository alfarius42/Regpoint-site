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
    <!-- Language module (RU/EN) disabled temporarily.
    <script src="/js/lang.js" defer></script>
    -->
    <script src="/js/contact.js" defer></script>"""

SCRIPTS_END = """
    <script src="/js/analytics.js" defer></script>
    <script src="/js/cookies.js" defer></script>
    <script src="/js/seo.js" defer></script>
    <script src="/js/breadcrumbs.js" defer></script>
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
          Обращения в чате обрабатываются через Jivo (ООО «Живой Сайт», РФ).
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
              <p class="privacy-section__text">Оператор обрабатывает только персональные данные, соответствующие заявленным целям обработки и не являющиеся избыточными по отношению к таким целям. На сайте могут обрабатываться имя, адрес электронной почты, номер телефона, наименование компании, сведения об интересующем модуле, содержание обращения, а также технические данные, связанные с использованием cookie и посещением сайта. Цели обработки включают обработку запросов на коммерческое предложение или демонстрацию продукта, ведение переписки и поддержки через Jivo, рассмотрение обращений субъектов персональных данных, а также аналитику использования сайта с применением Яндекс.Метрики после получения согласия субъекта персональных данных. Рассылка маркетинговых материалов осуществляется только при наличии отдельного предварительного согласия субъекта персональных данных (см.&nbsp;раздел&nbsp;7).</p>
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
              <h2 class="privacy-section__title font-heading">7. Маркетинговые рассылки</h2>
              <p class="privacy-section__text">Обработка персональных данных в целях продвижения товаров, работ и услуг Рег.Поинт на рынке путём осуществления прямых контактов с потенциальным потребителем с помощью средств связи (адрес электронной почты, номер телефона, мессенджеры) допускается только при условии предварительного согласия субъекта персональных данных в соответствии со&nbsp;статьёй&nbsp;15 Федерального закона №152-ФЗ.</p>
              <p class="privacy-section__text">Согласие на получение маркетинговых рассылок является отдельным от согласия на обработку персональных данных для рассмотрения обращения и предоставления коммерческого предложения или демонстрации продукта. Предоставление такого согласия не является обязательным условием для использования сайта, обращения в онлайн-чат или получения ответа на запрос.</p>
              <p class="privacy-section__text">При получении согласия субъекту персональных данных разъясняются цели обработки (информирование о продуктах и услугах Рег.Поинт, новостях платформы, приглашениях на мероприятия), перечень обрабатываемых данных (имя, адрес электронной почты, номер телефона), способы направления сообщений и порядок отзыва согласия. Согласие выражается путём установки отдельного флажка; предзаполнение флажка не допускается. Полный текст согласия опубликован на странице <a href="/privacy/marketing-consent/">Согласие на обработку персональных данных в маркетинговых целях</a>.</p>
              <p class="privacy-section__text">Оператор обязан немедленно прекратить обработку персональных данных в целях маркетинговых рассылок по требованию субъекта персональных данных. Для отзыва согласия на маркетинговые рассылки необходимо обратиться в онлайн-чат Jivo на сайте.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">8. Права субъекта ПД</h2>
              <p class="privacy-section__text">Субъект персональных данных вправе получать информацию, касающуюся обработки его персональных данных, требовать уточнения, блокирования или уничтожения персональных данных, если такие данные являются неполными, устаревшими, неточными, незаконно полученными либо не являются необходимыми для заявленной цели обработки, а также отозвать согласие на обработку персональных данных. Для отзыва согласия, направления требования об удалении, блокировании или уточнении персональных данных необходимо обратиться в онлайн-чат Jivo на сайте. Оператор вправе запросить сведения, необходимые для идентификации заявителя и подтверждения факта обработки его персональных данных.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">9. Обращения и обжалование</h2>
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

MARKETING_META = {
    "title": "Согласие на обработку ПД в маркетинговых целях | Рег.Поинт",
    "desc": "Текст согласия на получение маркетинговых рассылок сайта Рег.Поинт: цели, перечень данных, срок, отзыв согласия по 152-ФЗ.",
    "canonical": "https://reg-point.ru/privacy/marketing-consent/",
    "og_title": "Согласие на обработку ПД в маркетинговых целях | Рег.Поинт",
}

FOOTER_PRIVACY_LINE = '<li><a href="/privacy/">Политика конфиденциальности</a></li>'
FOOTER_MARKETING_LINE = (
    '<li><a href="/privacy/marketing-consent/">'
    'Согласие на маркетинговые рассылки</a></li>'
)

MARKETING_CONSENT_MAIN = """    <main>
      <section class="page-hero page-hero--privacy">
        <div class="container container--narrow">
          <h1 class="page-hero__title font-heading">Согласие на обработку персональных данных в маркетинговых целях</h1>
          <p class="page-hero__updated">Последнее обновление: январь 2026</p>
        </div>
      </section>
      <section class="section privacy-body">
        <div class="container container--narrow">
          <div class="privacy-sections">
            <article class="privacy-section">
              <p class="privacy-section__text">Настоящий документ определяет содержание согласия субъекта персональных данных на обработку персональных данных в целях продвижения товаров, работ и услуг оператора на рынке путём осуществления прямых контактов с помощью средств связи. Документ составлен в соответствии со&nbsp;статьями&nbsp;9 и&nbsp;15 Федерального закона от&nbsp;27.07.2006 №152-ФЗ «О персональных данных» и является отдельным от согласия на обработку персональных данных для рассмотрения обращения, предоставления коммерческого предложения или демонстрации продукта. Предоставление настоящего согласия не является обязательным.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">1. Оператор персональных данных</h2>
              <p class="privacy-section__text">Индивидуальный предприниматель Мельникова Ксения Антоновна (ИНН&nbsp;644917769371, ОГРНИП&nbsp;325508100578539), самостоятельно определяющая цели обработки персональных данных, состав персональных данных, подлежащих обработке, а также действия (операции), совершаемые с персональными данными.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">2. Цель обработки персональных данных</h2>
              <p class="privacy-section__text">Направление субъекту персональных данных информационных и маркетинговых сообщений о продуктах и услугах Рег.Поинт, новостях платформы, обновлениях функциональности, кейсах клиентов, приглашениях на мероприятия, вебинары и иные материалы рекламно-информационного характера с использованием средств связи (адрес электронной почты, номер телефона, мессенджеры).</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">3. Перечень персональных данных</h2>
              <p class="privacy-section__text">Имя, адрес электронной почты, номер телефона, наименование компании (при наличии), а также иные персональные данные, добровольно предоставленные субъектом персональных данных при обращении на сайте reg-point.ru.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">4. Действия с персональными данными</h2>
              <p class="privacy-section__text">Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, предоставление в пределах заявленной цели, блокирование и уничтожение персональных данных с использованием средств автоматизации и без использования таких средств.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">5. Срок действия согласия и порядок отзыва</h2>
              <p class="privacy-section__text">Согласие действует до достижения целей обработки либо до его отзыва субъектом персональных данных. Субъект персональных данных вправе отозвать согласие, направив требование оператору через онлайн-чат Jivo на сайте reg-point.ru. Оператор обязан немедленно прекратить обработку персональных данных в целях маркетинговых рассылок с момента получения отзыва и уничтожить соответствующие персональные данные либо обеспечить их уничтожение в срок, не превышающий 30&nbsp;дней, если иное не предусмотрено законодательством Российской Федерации.</p>
            </article>
            <article class="privacy-section">
              <h2 class="privacy-section__title font-heading">6. Порядок выражения согласия</h2>
              <p class="privacy-section__text">Согласие выражается субъектом персональных данных путём установки отдельного флажка при обращении в онлайн-чат на сайте reg-point.ru. Флажок не предзаполняется. Согласие должно быть конкретным, информированным и сознательным. Дополнительные сведения об обработке персональных данных содержатся в <a href="/privacy/">Политике конфиденциальности</a>.</p>
            </article>
          </div>
        </div>
      </section>
    </main>"""

COOKIE_PATTERN = re.compile(
    r'    <div class="cookie-banner" id="cookie-banner" hidden>.*?(?:\n    </div>\s*\n)?(?=\s*<script src="/js/config.js">)',
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


def build_marketing_consent_page() -> None:
    chrome_tail = CHROME_TAIL
    if FOOTER_MARKETING_LINE not in chrome_tail:
        chrome_tail = chrome_tail.replace(
            FOOTER_PRIVACY_LINE,
            FOOTER_PRIVACY_LINE + "\n                " + FOOTER_MARKETING_LINE,
            1,
        )
    chrome_tail = chrome_tail.replace(
        FOOTER_MARKETING_LINE,
        FOOTER_MARKETING_LINE.replace(
            'href="/privacy/marketing-consent/">',
            'href="/privacy/marketing-consent/" aria-current="page">',
        ),
        1,
    )
    html = f"""<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{MARKETING_META['title']}</title>
    <meta name="description" content="{MARKETING_META['desc']}" />
    <link rel="canonical" href="{MARKETING_META['canonical']}" />
    <meta property="og:title" content="{MARKETING_META['og_title']}" />
    <meta property="og:description" content="{MARKETING_META['desc']}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{MARKETING_META['canonical']}" />
    <meta property="og:locale" content="ru_RU" />
{ICON_LINKS}
{CSS_LINKS}
  </head>
  <body data-page="marketing-consent">
{CHROME_HEAD}
{MARKETING_CONSENT_MAIN}
{chrome_tail}{COOKIE_BANNER}

{SCRIPTS_BASE}{SCRIPTS_END}
"""
    out = ROOT / "privacy/marketing-consent/index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print(f"Wrote {out.relative_to(ROOT)}")


def patch_footer_marketing_link(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if '/privacy/marketing-consent/' in text:
        return
    updated = text.replace(
        FOOTER_PRIVACY_LINE,
        FOOTER_PRIVACY_LINE + "\n                " + FOOTER_MARKETING_LINE,
        1,
    )
    if updated != text:
        path.write_text(updated, encoding="utf-8")
        print(f"Footer link added: {path.relative_to(ROOT)}")


def build_privacy_page() -> None:
    chrome_tail = CHROME_TAIL
    if FOOTER_MARKETING_LINE not in chrome_tail:
        chrome_tail = chrome_tail.replace(
            FOOTER_PRIVACY_LINE,
            FOOTER_PRIVACY_LINE + "\n                " + FOOTER_MARKETING_LINE,
            1,
        )
    chrome_tail = chrome_tail.replace(
        FOOTER_PRIVACY_LINE,
        FOOTER_PRIVACY_LINE.replace(
            'href="/privacy/">',
            'href="/privacy/" aria-current="page">',
        ),
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
    updated = updated.replace(
        "Заявки обрабатываются через Jivo (РФ, 152-ФЗ).",
        "Обращения в чате обрабатываются через Jivo (ООО «Живой Сайт», РФ).",
    )

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
    build_marketing_consent_page()
    html_pages = list(ROOT.glob("**/*.html"))
    for page in html_pages:
        if page.name == "404.html" or "/en/" in page.as_posix():
            continue
        patch_footer_marketing_link(page)
        patch_cookie_banner(page)
