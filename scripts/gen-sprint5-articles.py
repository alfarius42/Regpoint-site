#!/usr/bin/env python3
"""Generate Sprint 5 articles listing + detail pages from articles-data.json."""
from __future__ import annotations

import html
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "scripts/articles-data.json").read_text(encoding="utf-8"))
template = (ROOT / "faq/index.html").read_text(encoding="utf-8")

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

SCRIPTS_ARTICLES = """
    <script src="/js/articles.js" defer></script>"""

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

TAG_CLASS = {
    "self-hosted": "article-card__tag--dark",
    "152-ФЗ": "article-card__tag--blue",
    "check-in": "article-card__tag--accent",
    "promo": "article-card__tag--accent",
    "билеты": "article-card__tag--muted",
    "цены": "article-card__tag--muted",
}

COVER_BY_TAG = {
    "self-hosted": "/img/articles/cover-self-hosted.jpg",
    "152-ФЗ": "/img/articles/cover-152-fz.jpg",
    "check-in": "/img/articles/cover-check-in.jpg",
    "promo": "/img/articles/cover-promo.jpg",
    "билеты": "/img/articles/cover-tickets.jpg",
    "цены": "/img/articles/cover-pricing.jpg",
}

PRODUCT_URL = {
    "reg-point": "/products/reg-point/",
    "promo-pro": "/products/promo-pro/",
    "promo-point": "/products/promo-point/",
    "ticket-point": "/products/ticket-point/",
    "pricing": "/pricing/",
    "technology": "/technology/",
    "compliance": "/compliance-152fz/",
}

MONTHS = {
    "января": "01",
    "февраля": "02",
    "марта": "03",
    "апреля": "04",
    "мая": "05",
    "июня": "06",
    "июля": "07",
    "августа": "08",
    "сентября": "09",
    "октября": "10",
    "ноября": "11",
    "декабря": "12",
}


def esc(text: str) -> str:
    return html.escape(text, quote=True)


def iso_date(ru_date: str) -> str:
    parts = ru_date.split()
    if len(parts) != 3:
        return "2026-01-01"
    day, month, year = parts
    return f"{year}-{MONTHS.get(month, '01')}-{int(day):02d}"


def tag_class(tag: str) -> str:
    return TAG_CLASS.get(tag, "article-card__tag--muted")


def build_page(path: str, meta: dict, body_page: str, main: str, extra_scripts: str = "") -> None:
    schema_block = ""
    schemas = meta.get("schemas") or ([meta["schema"]] if meta.get("schema") else [])
    for schema in schemas:
        schema_block += (
            f'\n    <script type="application/ld+json">'
            f'{json.dumps(schema, ensure_ascii=False)}</script>'
        )

    og_image = meta.get("og_image", "https://reg-point.ru/img/hero.svg")
    og_type = meta.get("og_type", "website")

    html_out = f"""<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{meta['title']}</title>
    <meta name="description" content="{esc(meta['desc'])}" />
    <link rel="canonical" href="{meta['canonical']}" />
    <meta property="og:title" content="{esc(meta['og_title'])}" />
    <meta property="og:description" content="{esc(meta['desc'])}" />
    <meta property="og:type" content="{og_type}" />
    <meta property="og:url" content="{meta['canonical']}" />
    <meta property="og:image" content="{og_image}" />
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
    out.write_text(html_out, encoding="utf-8")
    print(f"Wrote {path}")


def listing_card(item: dict) -> str:
    slug = item["slug"]
    tag = item["tag"]
    return f"""            <a class="article-card article-card--listing" href="/articles/{slug}/" data-tag="{esc(tag)}">
              <div class="article-card__bar" aria-hidden="true"></div>
              <div class="article-card__body">
                <div class="article-card__meta">
                  <span class="article-card__tag {tag_class(tag)}">{esc(tag)}</span>
                  <span class="article-card__date">{esc(item['date'])} · {esc(item['time'])}</span>
                </div>
                <h2 class="article-card__title">{esc(item['title'])}</h2>
                <span class="article-card__read">Читать →</span>
              </div>
            </a>"""


def build_listing() -> None:
    listing = DATA["listing"]
    tag_counts = Counter(item["tag"] for item in listing)
    tags = sorted(tag_counts.keys())

    chips = [
        f'<button type="button" class="filter-chip is-active" data-filter="all">Все ({len(listing)})</button>'
    ]
    for tag in tags:
        chips.append(
            f'<button type="button" class="filter-chip" data-filter="{esc(tag)}">{esc(tag)} ({tag_counts[tag]})</button>'
        )

    cards = "\n".join(listing_card(item) for item in listing)

    main = f"""    <main>
      <section class="page-hero page-hero--content">
        <div class="container">
          <h1 class="page-hero__title font-heading">Статьи</h1>
          <p class="page-hero__lead">Экспертиза в event-технологиях и 152-ФЗ — органический трафик по специализированным запросам</p>
        </div>
      </section>
      <section class="section section--muted">
        <div class="container">
          <div class="filter-chips" role="group" aria-label="Фильтр по тегу">
            {'\n            '.join(chips)}
          </div>
          <div class="card-grid card-grid--3" id="articles-grid">
{cards}
          </div>
          <p class="articles-empty" id="articles-empty" hidden>Нет статей по выбранному тегу. <button type="button" class="articles-empty__reset">Показать все</button></p>
        </div>
      </section>
    </main>"""

    meta = {
        "title": "Статьи — экспертиза в event-технологиях и 152-ФЗ | Рег.Поинт",
        "desc": "Экспертиза в event-технологиях и 152-ФЗ. Статьи для организаторов мероприятий и BTL-агентств.",
        "og_title": "Статьи — экспертиза в event-технологиях и 152-ФЗ | Рег.Поинт",
        "canonical": "https://reg-point.ru/articles/",
    }
    build_page("articles/index.html", meta, "articles", main, SCRIPTS_ARTICLES)


def related_cards(current_slug: str, articles: list) -> str:
    related = [a for a in articles if a["slug"] != current_slug][:2]
    blocks = []
    for art in related:
        blocks.append(
            f"""            <a class="article-related-card" href="/articles/{art['slug']}/">
              <p class="article-related-card__meta">{esc(art['tag'])} · {esc(art['time'])}</p>
              <h3 class="article-related-card__title font-heading">{esc(art['title'])}</h3>
            </a>"""
        )
    return "\n".join(blocks)


def build_detail(article: dict, all_articles: list) -> None:
    slug = article["slug"]
    cover = COVER_BY_TAG.get(article["tag"], COVER_BY_TAG["self-hosted"])
    desc = article["lead"][:155] + "…" if len(article["lead"]) > 155 else article["lead"]

    sections_html = []
    for section in article["sections"]:
        block = f"""            <section class="article-section">
              <h2 class="article-section__title font-heading">{esc(section['h'])}</h2>
              <p class="article-section__body">{esc(section['body'])}</p>"""
        if article.get("productRef") and "как помогает" in section["h"].lower():
            ref = article["productRef"]
            url = PRODUCT_URL.get(ref["page"], "/products/")
            block += f"""
              <div class="article-product-ref">
                <div class="article-product-ref__info">
                  <p class="article-product-ref__name font-heading">{esc(ref['name'])}</p>
                  <p class="article-product-ref__meta">{esc(ref['price'])} · Self-hosted · 152-ФЗ</p>
                </div>
                <a class="btn btn--primary article-product-ref__btn" href="{url}">Подробнее →</a>
              </div>"""
        block += "\n            </section>"
        sections_html.append(block)

    faq_items = []
    for item in article["faq"]:
        faq_items.append(
            f"""              <div class="article-faq__item">
                <p class="article-faq__q font-heading">{esc(item['q'])}</p>
                <p class="article-faq__a">{esc(item['a'])}</p>
              </div>"""
        )

    schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article["title"],
        "description": article["lead"],
        "datePublished": iso_date(article["date"]),
        "author": {"@type": "Organization", "name": "Рег.Поинт"},
        "publisher": {"@type": "Organization", "name": "Рег.Поинт"},
        "image": f"https://reg-point.ru{cover}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": f"https://reg-point.ru/articles/{slug}/",
        },
    }

    faq_schema = None
    if article["faq"]:
        faq_schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f["q"],
                    "acceptedAnswer": {"@type": "Answer", "text": f["a"]},
                }
                for f in article["faq"]
            ],
        }

    main = f"""    <main>
      <div class="article-cover">
        <img src="{cover}" alt="" width="1200" height="400" class="article-cover__img" />
      </div>
      <section class="article-header">
        <div class="container container--article">
          <a class="article-back" href="/articles/">← Все статьи</a>
          <div class="article-header__meta">
            <span class="article-card__tag {tag_class(article['tag'])}">{esc(article['tag'])}</span>
            <span class="article-header__date">{esc(article['date'])}</span>
            <span class="article-header__time">· {esc(article['time'])}</span>
          </div>
          <h1 class="article-header__title font-heading">{esc(article['title'])}</h1>
          <p class="article-lead">{esc(article['lead'])}</p>
        </div>
      </section>
      <section class="article-body">
        <div class="container container--article">
          <div class="article-sections">
{'\n'.join(sections_html)}
          </div>
          <div class="article-faq">
            <h2 class="article-faq__title font-heading">FAQ</h2>
            <div class="article-faq__list">
{chr(10).join(faq_items)}
            </div>
          </div>
          <div class="article-cta">
            <h2 class="article-cta__title font-heading">{esc(article['cta'])}</h2>
            <p class="article-cta__desc">Рег.Поинт — коробочная платформа. Данные на вашем сервере, 152-ФЗ из коробки.</p>
            <div class="article-cta__actions">
              <button type="button" class="btn btn--primary" data-action="demo">Запросить КП / Демо →</button>
              <a class="btn btn--secondary" href="/articles/">← Все статьи</a>
            </div>
          </div>
          <div class="article-related">
            <h2 class="article-related__title font-heading">Читайте также</h2>
            <div class="article-related__grid">
{related_cards(slug, all_articles)}
            </div>
          </div>
        </div>
      </section>
    </main>"""

    meta = {
        "title": f"{article['title']} — Рег.Поинт",
        "desc": desc,
        "og_title": f"{article['title']} — Рег.Поинт",
        "canonical": f"https://reg-point.ru/articles/{slug}/",
        "og_type": "article",
        "og_image": f"https://reg-point.ru{cover}",
        "schemas": [s for s in [schema, faq_schema] if s],
    }
    build_page(f"articles/{slug}/index.html", meta, f"article-{slug}", main)


def update_sitemap() -> None:
    sitemap_path = ROOT / "sitemap.xml"
    text = sitemap_path.read_text(encoding="utf-8")
    marker = "  <url>\n    <loc>https://reg-point.ru/privacy/"
    if marker in text:
        text = text[: text.index(marker)]

    entries = [
        """  <url>
    <loc>https://reg-point.ru/articles/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>"""
    ]
    for item in DATA["listing"]:
        entries.append(
            f"""  <url>
    <loc>https://reg-point.ru/articles/{item['slug']}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>"""
        )

    tail = """  <url>
    <loc>https://reg-point.ru/privacy/</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
"""
    sitemap_path.write_text(text + "\n".join(entries) + "\n" + tail, encoding="utf-8")
    print("Updated sitemap.xml")


def main() -> None:
    build_listing()
    articles = DATA["articles"]
    for article in articles:
        build_detail(article, articles)
    update_sitemap()
    print("Done — Sprint 5 articles generated.")


if __name__ == "__main__":
    main()
