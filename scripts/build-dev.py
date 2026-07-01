#!/usr/bin/env python3
"""
Dev/staging build: production-файлы → dist/ (+ zip для FTP).
"""
from __future__ import annotations

import argparse
import platform
import shutil
import subprocess
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
ZIP_PATH = ROOT / "regpoint-site.zip"

COPY_PATHS = (
    "index.html",
    "404.html",
    ".htaccess",
    "robots.txt",
    "sitemap.xml",
    "products",
    "pricing",
    "technology",
    "compliance-152fz",
    "how-it-works",
    "scenarios",
    "faq",
    "articles",
    "contacts",
    "privacy",
    "en",
    "css",
    "js",
    "img",
    "i18n",
)


def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd))
    if platform.system() == "Windows" and cmd and cmd[0] == "npx":
        cmd = ["npx.cmd", *cmd[1:]]
    subprocess.run(cmd, cwd=ROOT, check=True)


def copy_production_files() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    for rel in COPY_PATHS:
        src = ROOT / rel
        dst = DIST / rel
        if not src.exists():
            continue
        if src.is_dir():
            shutil.copytree(src, dst)
        else:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)


def minify_assets() -> None:
    for folder, ext in (("css", ".css"), ("js", ".js")):
        target_dir = DIST / folder
        if not target_dir.is_dir():
            continue
        for path in sorted(target_dir.glob(f"*{ext}")):
            run(
                [
                    "npx",
                    "--yes",
                    "esbuild",
                    str(path),
                    "--minify",
                    f"--outfile={path}",
                    "--allow-overwrite",
                ]
            )


def write_zip() -> None:
    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in sorted(DIST.rglob("*")):
            if path.is_file():
                zf.write(path, path.relative_to(DIST))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--prod", action="store_true", help="Production build with minify")
    args = parser.parse_args()

    print(f"Build started {datetime.now(timezone.utc).isoformat()}")
    copy_production_files()
    if args.prod:
        minify_assets()
    write_zip()
    print(f"OK: {DIST} + {ZIP_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
