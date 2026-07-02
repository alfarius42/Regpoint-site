#!/usr/bin/env python3
"""Generate PNG/ICO favicons from brand mark (prototype tokens #243954)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "img"

PRIMARY = (36, 57, 84)
ACCENT = (225, 239, 242)
WHITE = (255, 255, 255)


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    )
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def draw_mark(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = max(2, size // 8)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=PRIMARY)

    dot_r = max(2, size // 9)
    draw.ellipse(
        (
            size * 0.62 - dot_r,
            size * 0.22 - dot_r,
            size * 0.62 + dot_r,
            size * 0.22 + dot_r,
        ),
        fill=ACCENT,
    )

    font = load_font(max(8, size // 2))
    text = "R"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(
        ((size - tw) / 2 - size * 0.04, (size - th) / 2 - size * 0.02),
        text,
        font=font,
        fill=WHITE,
    )
    return img


def save_png(path: Path, size: int) -> None:
    draw_mark(size).save(path, format="PNG", optimize=True)
    print(f"  {path.name} ({size}x{size})")


def save_ico(path: Path) -> None:
    sizes = [16, 32, 48]
    images = [draw_mark(s) for s in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )
    print(f"  {path.name}")


def main() -> int:
    IMG.mkdir(parents=True, exist_ok=True)
    print("Generating favicons…")
    save_png(IMG / "favicon-16.png", 16)
    save_png(IMG / "favicon-32.png", 32)
    save_png(IMG / "apple-touch-icon.png", 180)
    save_ico(IMG / "favicon.ico")
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
