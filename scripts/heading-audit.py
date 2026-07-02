#!/usr/bin/env python3
"""Heading hierarchy audit."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = {"prototype", "dist", "tests", "docs", ".cursor", "node_modules"}
TAG_RE = re.compile(r"<(h[1-6])[^>]*>", re.I)


def main() -> None:
    for p in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP for part in p.parts):
            continue
        text = p.read_text(encoding="utf-8")
        main_match = re.search(r"<main[^>]*>(.*)</main>", text, re.I | re.S)
        scope = main_match.group(1) if main_match else text
        tags = [m.group(1).lower() for m in TAG_RE.finditer(scope)]
        if not tags:
            continue
        issues = []
        h1_count = tags.count("h1")
        if h1_count != 1:
            issues.append(f"H1 count={h1_count}")
        prev = 0
        for t in tags:
            level = int(t[1])
            if prev and level > prev + 1:
                issues.append(f"skip {t} after h{prev}")
            prev = level
        if issues:
            print(f"{p.relative_to(ROOT)}: {', '.join(issues)}")
            print(f"  sequence: {' > '.join(tags[:20])}{'…' if len(tags)>20 else ''}")


if __name__ == "__main__":
    main()
