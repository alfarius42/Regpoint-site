#!/usr/bin/env python3
"""Production build: dist/ + regpoint-site.zip (minified)."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    script = ROOT / "scripts" / "build-dev.py"
    result = subprocess.run(
        [sys.executable, str(script), "--prod"],
        cwd=ROOT,
        check=False,
    )
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
