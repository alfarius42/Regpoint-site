#!/usr/bin/env python3
"""Generate robots.txt, sitemap.xml; patch HTML meta for SEO."""
from __future__ import annotations

import re
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE_URL = "https://reg-point.ru"
DEFAULT_OG_IMAGE = f"{SITE_URL}/img/hero.svg"
DEFAULT_OG_ALT = "Рег.Поинт — регистрация на мероприятия на вашем сервере"
SKIP_DIRS = {"prototype", "dist", "tests", "docs", ".cursor", "node_modules", "scripts"}

# path prefix -> (priority, changefreq)
ROUTE_META: dict[str, tuple[str, str]] = {
    "/": ("1.0", "weekly"),
    "/products/": ("0.9", "monthly"),
    "/pricing/": ("0.9", "monthly"),
    "/contacts/": ("0.9", "monthly"),
    "/articles/": ("0.8", "weekly"),
    "/faq/": ("0.7", "monthly"),
    "/privacy/": ("0.5", "yearly"),
    "/privacy/marketing-consent/": ("0.3", "yearly"),
}

DEFAULT_ROUTE = ("0.8", "monthly")
PRODUCT_ROUTE = ("0.8", "monthly")
ARTICLE_ROUTE = ("0.7", "monthly")

EXCLUDE_FROM_SITEMAP = {"404.html"}


def html_pages() -> list[Path]:
    pages: list[Path] = []
    for path in sorted(ROOT.rglob("index.html")):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        pages.append(path)
    stub = ROOT / "404.html"
    if stub.exists():
        pages.append(stub)
    return pages


def url_path(page: Path) -> str:
    rel = page.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if rel == "404.html":
        return "/404.html"
    return "/" + rel.replace("index.html", "")


def route_meta(url: str) -> tuple[str, str]:
    if url in ROUTE_META:
        return ROUTE_META[url]
    if url.startswith("/products/") and url != "/products/":
        return PRODUCT_ROUTE
    if url.startswith("/articles/") and url != "/articles/":
        return ARTICLE_ROUTE
    return DEFAULT_ROUTE


def lastmod(page: Path) -> str:
    ts = page.stat().st_mtime
    return datetime.fromtimestamp(ts, tz=timezone.utc).strftime("%Y-%m-%d")


def write_robots() -> None:
    content = f"""User-agent: *
Allow: /

# Служебные и dev-пути (на production отсутствуют)
Disallow: /prototype/
Disallow: /tests/
Disallow: /docs/

Sitemap: {SITE_URL}/sitemap.xml
Host: {SITE_URL}
"""
    (ROOT / "robots.txt").write_text(content, encoding="utf-8")
    print("Wrote robots.txt")


def write_sitemap(pages: list[Path]) -> None:
    urlset = ET.Element(
        "urlset",
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9",
    )
    entries: list[tuple[str, str, str, str]] = []
    for page in pages:
        url = url_path(page)
        if page.name == "404.html" or url in EXCLUDE_FROM_SITEMAP:
            continue
        priority, changefreq = route_meta(url)
        entries.append((url, lastmod(page), changefreq, priority))

    for url, mod, changefreq, priority in sorted(entries, key=lambda x: (-float(x[3]), x[0])):
        node = ET.SubElement(urlset, "url")
        ET.SubElement(node, "loc").text = SITE_URL + (url if url != "/" else "/")
        ET.SubElement(node, "lastmod").text = mod
        ET.SubElement(node, "changefreq").text = changefreq
        ET.SubElement(node, "priority").text = priority

    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write(ROOT / "sitemap.xml", encoding="UTF-8", xml_declaration=True)
    print(f"Wrote sitemap.xml ({len(entries)} URLs)")


def extract_og_image(text: str) -> str | None:
    m = re.search(r'property="og:image"\s+content="([^"]+)"', text)
    return m.group(1) if m else None


def patch_html(page: Path) -> bool:
    if page.name == "404.html":
        return patch_404(page)
    text = page.read_text(encoding="utf-8")
    orig = text
    og_image = extract_og_image(text) or DEFAULT_OG_IMAGE

    if 'property="og:image"' not in text and 'property="og:locale"' in text:
        text = text.replace(
            '    <meta property="og:locale" content="ru_RU" />\n',
            '    <meta property="og:locale" content="ru_RU" />\n'
            f'    <meta property="og:image" content="{og_image}" />\n'
            f'    <meta property="og:image:alt" content="{DEFAULT_OG_ALT}" />\n',
            1,
        )

    if 'name="twitter:card"' not in text:
        insert_after = '    <meta property="og:locale" content="ru_RU" />\n'
        if insert_after in text:
            block = '    <meta name="twitter:card" content="summary_large_image" />\n'
            if 'property="og:image"' in text and block not in text:
                # after og:image:alt if present, else after og:image
                if 'og:image:alt' in text:
                    text = text.replace(
                        f'    <meta property="og:image:alt" content="{DEFAULT_OG_ALT}" />\n',
                        f'    <meta property="og:image:alt" content="{DEFAULT_OG_ALT}" />\n{block}',
                        1,
                    )
                else:
                    text = re.sub(
                        r'(    <meta property="og:image" content="[^"]+" />\n)',
                        r"\1" + block,
                        text,
                        count=1,
                    )

    if page.relative_to(ROOT).as_posix() == "index.html" and "SoftwareApplication" not in text:
        schema = """    <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"Рег.Поинт","url":"https://reg-point.ru/","inLanguage":"ru-RU","publisher":{"@type":"Organization","name":"Рег.Поинт","url":"https://reg-point.ru/"}},{"@type":"SoftwareApplication","name":"Рег.Поинт","applicationCategory":"BusinessApplication","operatingSystem":"Linux (Docker)","offers":{"@type":"Offer","price":"100000","priceCurrency":"RUB","url":"https://reg-point.ru/pricing/"},"description":"Коробочная платформа регистрации на мероприятия и промоакции. Установка на VPS клиента. 152-ФЗ.","url":"https://reg-point.ru/"}]}</script>
"""
        text = text.replace("    <link rel=\"icon\"", schema + "    <link rel=\"icon\"", 1)

    if page.relative_to(ROOT).as_posix() == "articles/index.html" and "ItemList" not in text:
        items = []
        for art in sorted((ROOT / "articles").glob("*/index.html")):
            slug = art.parent.name
            items.append(
                f'{{"@type":"ListItem","position":{len(items)+1},'
                f'"url":"{SITE_URL}/articles/{slug}/"}}'
            )
        if items:
            schema = (
                '    <script type="application/ld+json">{"@context":"https://schema.org",'
                '"@type":"ItemList","name":"Статьи Рег.Поинт","itemListElement":['
                + ",".join(items)
                + "]}</script>\n"
            )
            text = text.replace("    <link rel=\"icon\"", schema + "    <link rel=\"icon\"", 1)

    if text != orig:
        page.write_text(text, encoding="utf-8")
        return True
    return False


def patch_404(page: Path) -> bool:
    text = page.read_text(encoding="utf-8")
    if 'name="robots"' in text:
        return False
    head_insert = """    <meta name="robots" content="noindex, follow" />
    <meta
      name="description"
      content="Страница не найдена на сайте Рег.Поинт. Перейдите на главную или воспользуйтесь меню навигации."
    />
"""
    text = text.replace(
        '    <title>Страница не найдена — Рег.Поинт</title>\n',
        '    <title>Страница не найдена — Рег.Поинт</title>\n' + head_insert,
        1,
    )
    page.write_text(text, encoding="utf-8")
    return True


def patch_faq_h2() -> bool:
    path = ROOT / "faq" / "index.html"
    text = path.read_text(encoding="utf-8")
    marker = '        <div class="container container--faq">\n          <div class="accordion accordion--faq">'
    replacement = (
        '        <div class="container container--faq">\n'
        '          <h2 class="visually-hidden">Вопросы и ответы</h2>\n'
        '          <div class="accordion accordion--faq">'
    )
    if marker in text and "visually-hidden" not in text:
        path.write_text(text.replace(marker, replacement, 1), encoding="utf-8")
        return True
    return False


def main() -> int:
    pages = html_pages()
    write_robots()
    write_sitemap(pages)
    patched = 0
    for page in pages:
        if patch_html(page):
            patched += 1
            print(f"Patched {page.relative_to(ROOT)}")
    if patch_faq_h2():
        print("Patched faq/index.html (H2 section)")
    print(f"Done. Patched {patched} HTML file(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
