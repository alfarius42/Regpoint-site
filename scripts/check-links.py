#!/usr/bin/env python3
"""Check internal href links in static HTML files."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {"prototype", "node_modules", ".git", "dist", "tmp-pp-review"}


def should_skip(path: Path) -> bool:
    return any(part in SKIP_DIRS for part in path.parts)


def iter_html_files(root: Path):
    for html_path in root.rglob("*.html"):
        if should_skip(html_path):
            continue
        yield html_path


def resolve_target(html_path: Path, href: str) -> Path:
    if href.startswith("/"):
        return ROOT / href.lstrip("/")
    return (html_path.parent / href).resolve()


def is_valid_target(path: Path) -> bool:
    if path.is_file():
        return True
    if path.is_dir() and (path / "index.html").exists():
        return True
    if not path.suffix and (path / "index.html").exists():
        return True
    return False


def main() -> int:
    broken: list[tuple[str, str]] = []
    href_pattern = re.compile(r'href="([^"]+)"')
    html_comment_pattern = re.compile(r"<!--.*?-->", re.DOTALL)

    for html_path in iter_html_files(ROOT):
        text = html_path.read_text(encoding="utf-8", errors="ignore")
        # Ignore links inside commented-out templates (e.g. disabled language switcher).
        text = html_comment_pattern.sub("", text)
        for href in href_pattern.findall(text):
            href = href.strip()
            if (
                not href
                or href.startswith(("http://", "https://", "mailto:", "tel:", "#", "javascript:"))
            ):
                continue

            target = href.split("#", 1)[0].split("?", 1)[0]
            if not target:
                continue

            resolved = resolve_target(html_path, target)
            if not is_valid_target(resolved):
                broken.append((str(html_path.relative_to(ROOT)), href))

    if broken:
        print(f"BROKEN_LINKS: {len(broken)}")
        for file_path, href in broken:
            print(f"{file_path} -> {href}")
        return 1

    print("OK: no broken internal href links")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

