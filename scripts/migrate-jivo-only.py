#!/usr/bin/env python3
"""Remove HTML forms/modals; all lead CTAs → Jivo chat (data-action=jivo)."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

HEADER_DEMO = '          <button type="button" class="btn btn--white btn--header-demo" data-action="jivo">'
HEADER_WITH_CONTACT = (
    '          <button type="button" class="site-header__contact-link" data-action="jivo">Связаться</button>\n'
    + HEADER_DEMO
)
CONTACTS_MAIN = """    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <h1 class="page-hero__title font-heading">Контакты</h1>
          <p class="page-hero__lead">Запросите коммерческое предложение или демо — напишите в онлайн-чат. Ответим в рабочее время.</p>
        </div>
      </section>
      <section class="section section--muted contacts-page__body">
        <div class="container">
          <div class="contacts-layout">
            <div class="contacts-main">
              <div class="contacts-jivo-wrap" id="demo">
                <div class="contacts-jivo__head">
                  <h2 class="contacts-jivo__title font-heading">Запросить КП / Демо</h2>
                  <p class="contacts-jivo__sub">Ответим в течение 1–2 рабочих дней</p>
                </div>
                <div class="contacts-jivo__body">
                  <p class="contacts-jivo__text">Опишите задачу, модули и сроки в чате — менеджер подготовит коммерческое предложение или проведёт демо.</p>
                  <button type="button" class="btn btn--primary btn--block contacts-jivo__btn" data-action="jivo">Написать в чат</button>
                  <p class="contacts-jivo__note">Переписка обрабатывается через Jivo (ООО «Живой Сайт», РФ, 152-ФЗ). Согласие на обработку ПД — при отправке сообщения в чате.</p>
                </div>
              </div>
            </div>
            <aside class="contacts-sidebar">
              <div class="contacts-sidebar__info">
                <div class="contacts-sidebar__info-item">
                  <p class="contacts-sidebar__info-title font-heading">Время ответа</p>
                  <p class="contacts-sidebar__info-text">Рабочие дни: до 2 часов<br />Вне рабочих часов: до 4 часов (следующий рабочий день)</p>
                </div>
                <div class="contacts-sidebar__info-item">
                  <p class="contacts-sidebar__info-title font-heading">152-ФЗ</p>
                  <p class="contacts-sidebar__info-text">Данные чата хранятся у обработчика Jivo на серверах в РФ. Подробнее — в <a href="/privacy/">Политике конфиденциальности</a>.</p>
                </div>
              </div>
            </aside>
          </div>
          <div class="card-grid card-grid--2 contacts-support-grid">
            <div class="contacts-support-card">
              <p class="section-label">Для существующих клиентов</p>
              <h3 class="contacts-support-card__title font-heading">Техническая поддержка</h3>
              <p class="contacts-support-card__text">Если у вас уже есть лицензия Рег.Поинт — напишите в чат с указанием лицензионного ID.</p>
              <ul class="check-list">
                <li>Базовая поддержка — включена в 1-й год</li>
                <li>Расширенный SLA — от 59 000 ₽/год</li>
                <li>Приоритетная линия — от 39 000 ₽/год</li>
              </ul>
              <button type="button" class="btn btn--outline btn--block" data-action="jivo">Написать в поддержку</button>
            </div>
            <div class="contacts-support-card">
              <p class="section-label">Для новых клиентов</p>
              <h3 class="contacts-support-card__title font-heading">Предпродажные вопросы</h3>
              <p class="contacts-support-card__text">Расскажите о проекте в чате — подберём модули, обсудим цены и демо.</p>
              <ul class="check-list">
                <li>Демо под ваш сценарий — бесплатно</li>
                <li>КП в течение 1–2 рабочих дней</li>
                <li>Пилот / тестовый период — по запросу</li>
              </ul>
              <button type="button" class="btn btn--primary btn--block" data-action="jivo">Запросить КП / Демо в чате</button>
            </div>
          </div>
        </div>
      </section>
    </main>"""

MODAL_RE = re.compile(
    r'\n\s*<div class="modal" id="contact-modal" hidden[\s\S]*?</div>\s*</div>\s*\n',
    re.MULTILINE,
)

ORPHAN_MODAL_RE = re.compile(
    r'\n\s*<div class="modal__dialog">[\s\S]*?</div>\s*</div>\s*\n',
    re.MULTILINE,
)

FOOTER_ORPHAN_RE = re.compile(
    r'(\s*</footer>)\s*</div>\s*(\n\s*<div class="cookie-banner")',
    re.MULTILINE,
)

ANCHOR_DEMO_RE = re.compile(
    r'<a(\s[^>]*?)href="/contacts/#demo"([^>]*?)>([\s\S]*?)</a>',
    re.IGNORECASE,
)


def anchor_to_button(match: re.Match) -> str:
    before, after, inner = match.group(1), match.group(2), match.group(3)
    attrs = (before + after).strip()
    attrs = re.sub(r'\s*data-action="demo"', '', attrs)
    attrs = re.sub(r'\s*data-action="contact"', '', attrs)
    cls = re.search(r'class="([^"]*)"', attrs)
    class_attr = cls.group(1) if cls else 'btn btn--primary'
    if 'btn' not in class_attr:
        class_attr = 'btn btn--primary ' + class_attr
    return f'<button type="button" class="{class_attr.strip()}" data-action="jivo">{inner.strip()}</button>'


def patch_html(path: Path) -> bool:
    text = path.read_text(encoding='utf-8')
    orig = text

    text = MODAL_RE.sub('\n', text)
    text = ORPHAN_MODAL_RE.sub('\n', text)
    text = FOOTER_ORPHAN_RE.sub(r'\1\2', text)
    text = ANCHOR_DEMO_RE.sub(anchor_to_button, text)

    text = text.replace('data-action="contact"', 'data-action="jivo"')
    text = text.replace('data-action="demo"', 'data-action="jivo"')
    text = text.replace('data-action="demo-modal"', 'data-action="jivo"')
    text = text.replace('data-action="jivo-chat"', 'data-action="jivo"')

    # Drawer CTA link without data-action
    text = re.sub(
        r'<a class="btn btn--secondary" href="/contacts/#demo">',
        '<button type="button" class="btn btn--secondary" data-action="jivo">',
        text,
    )
    text = text.replace(
        '<button type="button" class="btn btn--secondary" data-action="jivo">КП / Демо</a>',
        '<button type="button" class="btn btn--secondary" data-action="jivo">КП / Демо</button>',
    )

    text = re.sub(r'\s*<script src="/js/contacts\.js" defer></script>', '', text)

    if path.as_posix().endswith('contacts/index.html'):
        start = text.index('<main>')
        end = text.index('</main>') + len('</main>')
        text = text[:start] + CONTACTS_MAIN + text[end:]

    if 'site-header__contact-link' not in text and HEADER_DEMO in text:
        text = text.replace(HEADER_DEMO, HEADER_WITH_CONTACT, 1)

    if text != orig:
        path.write_text(text, encoding='utf-8')
        return True
    return False


def main() -> None:
    count = 0
    for html in ROOT.rglob('*.html'):
        if 'prototype' in html.parts or 'dist' in html.parts or 'tests' in html.parts:
            continue
        if patch_html(html):
            print(f'patched {html.relative_to(ROOT)}')
            count += 1
    print(f'done: {count} files')


if __name__ == '__main__':
    main()
