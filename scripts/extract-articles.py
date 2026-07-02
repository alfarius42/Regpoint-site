#!/usr/bin/env python3
"""Extract ARTICLES data from prototype App.tsx → articles-data.json."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
src = (ROOT / "prototype/src/app/App.tsx").read_text(encoding="utf-8")

list_start = src.index("const allArticles = [", src.index("function ArticlesPage"))
list_end = src.index("];", list_start) + 2
list_block = src[list_start:list_end]

listing = []
for m in re.finditer(
    r'slug: "([^"]+)", title: "([^"]+)", tag: "([^"]+)", date: "([^"]+)", time: "([^"]+)"',
    list_block,
):
    listing.append(
        {
            "slug": m.group(1),
            "title": m.group(2),
            "tag": m.group(3),
            "date": m.group(4),
            "time": m.group(5),
        }
    )

# Parse full ARTICLES blocks manually via regex for each slug
articles_start = src.index("const ARTICLES: Array<{")
articles_end = src.index("function ArticleDetailPage", articles_start)
articles_block = src[articles_start:articles_end]

slug_chunks = re.split(r'\n  \{\n    slug: "', articles_block)[1:]
full = []

for chunk in slug_chunks:
    slug_m = re.match(r'([^"]+)"', chunk)
    if not slug_m:
        continue
    slug = slug_m.group(1)
    rest = chunk[slug_m.end() :]

    def field(name):
        m = re.search(rf'{name}: "((?:[^"\\]|\\.)*)"', rest)
        return m.group(1) if m else ""

    title = field("title")
    tag = field("tag")
    date = field("date")
    time = field("time")
    lead = field("lead")
    cta = field("cta")

    sections = []
    for sm in re.finditer(r'\{ h: "((?:[^"\\]|\\.)*)", body: "((?:[^"\\]|\\.)*)" \}', rest):
        sections.append({"h": sm.group(1), "body": sm.group(2)})

    faq = []
    for fm in re.finditer(r'\{ q: "((?:[^"\\]|\\.)*)", a: "((?:[^"\\]|\\.)*)" \}', rest):
        faq.append({"q": fm.group(1), "a": fm.group(2)})

    product_ref = None
    pr = re.search(
        r'productRef: \{ page: "([^"]+)", name: "([^"]+)", price: "([^"]+)" \}',
        rest,
    )
    if pr:
        product_ref = {
            "page": pr.group(1),
            "name": pr.group(2),
            "price": pr.group(3),
        }

    full.append(
        {
            "slug": slug,
            "title": title,
            "tag": tag,
            "date": date,
            "time": time,
            "lead": lead,
            "sections": sections,
            "faq": faq,
            "cta": cta,
            "productRef": product_ref,
        }
    )

out = {"listing": listing, "articles": full}
out_path = ROOT / "scripts/articles-data.json"
out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Wrote {out_path} — {len(listing)} listing, {len(full)} full articles")
