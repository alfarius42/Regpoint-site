#!/usr/bin/env python3
"""Quick SEO audit: H1 count, meta, canonical."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = {"prototype", "dist", "tests", "docs", ".cursor", "node_modules"}


def main() -> None:
    for p in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP for part in p.parts):
            continue
        text = p.read_text(encoding="utf-8")
        h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", text, re.I | re.S)
        h1_clean = [re.sub(r"<[^>]+>", "", h).strip()[:70] for h in h1s]
        title = re.search(r"<title>(.*?)</title>", text, re.I | re.S)
        desc = re.search(r'name="description"[^>]*content="([^"]*)"', text, re.I)
        canon = re.search(r'rel="canonical"[^>]*href="([^"]*)"', text, re.I)
        og_img = re.search(r'property="og:image"', text, re.I)
        ld = len(re.findall(r"application/ld\+json", text, re.I))
        rel = p.relative_to(ROOT)
        issues = []
        if len(h1s) != 1:
            issues.append(f"H1={len(h1s)}")
        if not title:
            issues.append("no-title")
        if not desc:
            issues.append("no-desc")
        if not canon:
            issues.append("no-canonical")
        if not og_img:
            issues.append("no-og-image")
        status = "OK" if not issues else ", ".join(issues)
        print(f"{rel}\t{status}\tld={ld}")
        if len(h1s) != 1:
            for i, h in enumerate(h1_clean, 1):
                print(f"  H1#{i}: {h}")


if __name__ == "__main__":
    main()
