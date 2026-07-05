#!/usr/bin/env python3
"""Add internal-links mount, CSS and JS to production HTML pages."""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

MOUNT = """
      <section class="section section--muted internal-links-mount" data-internal-links aria-label="Связанные материалы"></section>
"""

CSS_LINK = '    <link rel="stylesheet" href="/css/internal-links.css" />\n'
SCRIPT_LINK = '    <script src="/js/internal-links.js" defer></script>\n'

SKIP_PARTS = {"privacy"}


def patch_file(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    if any(part in SKIP_PARTS for part in path.parts):
        return False

    text = path.read_text(encoding="utf-8")
    changed = False

    if "data-internal-links" not in text:
        if "</main>" not in text:
            print(f"skip (no </main>): {rel}")
            return False
        text = text.replace("</main>", f"{MOUNT}    </main>", 1)
        changed = True

    if "/css/internal-links.css" not in text:
        if "/css/pages-articles.css" in text:
            text = text.replace(
                '    <link rel="stylesheet" href="/css/pages-articles.css" />\n',
                '    <link rel="stylesheet" href="/css/pages-articles.css" />\n' + CSS_LINK,
                1,
            )
        elif '    <link rel="stylesheet" href="/css/pages.css" />\n' in text:
            text = text.replace(
                '    <link rel="stylesheet" href="/css/pages.css" />\n',
                '    <link rel="stylesheet" href="/css/pages.css" />\n' + CSS_LINK,
                1,
            )
        else:
            print(f"skip (no pages.css): {rel}")
            return False
        changed = True

    if "/js/internal-links.js" not in text:
        if '    <script src="/js/bootstrap.js" defer></script>\n' in text:
            text = text.replace(
                '    <script src="/js/bootstrap.js" defer></script>\n',
                SCRIPT_LINK + '    <script src="/js/bootstrap.js" defer></script>\n',
                1,
            )
            changed = True

    if changed:
        path.write_text(text, encoding="utf-8")
        print(f"patched: {rel}")
    return changed


def main() -> int:
    targets = [
        ROOT / "index.html",
        *sorted((ROOT / "products").rglob("index.html")),
        ROOT / "pricing/index.html",
        ROOT / "technology/index.html",
        ROOT / "compliance-152fz/index.html",
        ROOT / "how-it-works/index.html",
        ROOT / "scenarios/index.html",
        ROOT / "faq/index.html",
        ROOT / "articles/index.html",
        *sorted((ROOT / "articles").glob("*/index.html")),
        ROOT / "contacts/index.html",
    ]

    count = 0
    for path in targets:
        if path.exists() and patch_file(path):
            count += 1

    print(f"done: {count} files updated")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
