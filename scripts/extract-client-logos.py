"""Extract ESC logo from brandbook PDF and prepare client logos for homepage."""
from __future__ import annotations

import shutil
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "img" / "clients"
OUT_DIR.mkdir(parents=True, exist_ok=True)

PDF_PATH = Path(r"C:\Users\Захар\Downloads\ESC_брендбук.pdf")
SOURCES = {
    "rosevent": Path(r"C:\Rosevent-new\img\logo\r-monogram.webp"),
    "wm": Path(r"C:\Users\Захар\Downloads\wm_icon.png"),
    "abrikos": Path(r"C:\Abrikos\img\logo.webp"),
}

# Primary logo crop on cover page (2x render of A4 page).
ESC_CROP_BOX = (430, 320, 1280, 820)


def trim_transparent(img: Image.Image) -> Image.Image:
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img


def trim_light_background(img: Image.Image, threshold: int = 245) -> Image.Image:
    """Crop near-white margins from raster logo exports."""
    rgb = img.convert("RGB")
    data = rgb.load()
    width, height = rgb.size

    left, top = width, height
    right, bottom = 0, 0
    found = False

    for y in range(height):
        for x in range(width):
            r, g, b = data[x, y]
            if r < threshold or g < threshold or b < threshold:
                left = min(left, x)
                top = min(top, y)
                right = max(right, x)
                bottom = max(bottom, y)
                found = True

    if not found:
        return img

    padding = 6
    return img.crop(
        (
            max(left - padding, 0),
            max(top - padding, 0),
            min(right + padding + 1, width),
            min(bottom + padding + 1, height),
        )
    )


def save_webp(src: Path | Image.Image, dest: Path, max_height: int = 56) -> None:
    if isinstance(src, Path):
        img = Image.open(src)
    else:
        img = src

    img = trim_transparent(trim_light_background(img.convert("RGBA")))
    w, h = img.size
    if h > max_height:
        ratio = max_height / h
        img = img.resize((max(1, int(w * ratio)), max_height), Image.Resampling.LANCZOS)

    img.save(dest, "WEBP", quality=90, method=6)
    print(f"Saved {dest} ({img.size[0]}x{img.size[1]})")


def extract_esc_logo() -> None:
    doc = fitz.open(PDF_PATH)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()

    cropped = trim_light_background(img.crop(ESC_CROP_BOX))
    save_webp(cropped, OUT_DIR / "esc-agency.webp", max_height=48)


def copy_sources() -> None:
    mapping = {
        "rosevent": ("rosevent.webp", 56),
        "wm": ("wm.webp", 40),
        "abrikos": ("abrikos.webp", 56),
    }
    for key, (filename, max_h) in mapping.items():
        src = SOURCES[key]
        if not src.exists():
            raise SystemExit(f"Missing source file: {src}")
        dest = OUT_DIR / filename
        if src.suffix.lower() == ".webp" and max_h >= 56:
            shutil.copy2(src, dest)
            print(f"Copied {src} -> {dest}")
        else:
            save_webp(src, dest, max_height=max_h)


if __name__ == "__main__":
    extract_esc_logo()
    copy_sources()
    print("Done.")
