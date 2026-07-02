# Медиа-ассеты — изображения и OG

> **Канон:** Figma → экспорт в `img/`. До экспорта — временные URL из прототипа.

---

## Структура `img/` (target)

```text
img/
  favicon.svg                 # SVG favicon (браузеры)
  favicon.ico                 # ICO 16/32/48 — scripts/generate-favicons.py
  favicon-16.png
  favicon-32.png
  apple-touch-icon.png        # 180×180
  logo-mark.svg               # иконка в header (32×32)
  logo.svg                    # полный RU, светлый фон
  logo-on-dark.svg            # полный RU, тёмный header
  logo-en.svg                 # Reg.Point
  hero.webp                   # главная — из Figma
  og/
    home.png                  # 1200×630
    products.png
    pricing.png
    …                         # по page id из прототипа
    articles/
      self-hosted-vs-saas.png
      …
  articles/
    cover-self-hosted.webp    # обложки статей
    …
```

Путь OG в прототипе: `https://reg.point/og/{page}.png` или `og/articles/{slug}.png`.

---

## Placeholder'ы в прототипе (заменить)

| ID | URL (Unsplash) | Использование | Figma frame |
|----|----------------|---------------|-------------|
| hero-home | `photo-1540575467063` | Hero главной | Export из Figma «Hero» |
| cover-self-hosted | `photo-1506399309177` | Статьи tag self-hosted | Figma / stock |
| cover-152fz | `photo-1593444285553` | tag 152-ФЗ | |
| cover-check-in | `photo-1540575467063` | tag check-in | |
| cover-promo | `photo-1587825140708` | tag promo | |
| cover-bilet | `photo-1560439514` | tag билеты | |
| cover-pricing | `photo-1531058020387` | tag цены | |

**Правило:** перед production — экспорт из Figma или лицензированный stock; Unsplash — только dev/staging.

---

## Фavicon и logo (baseline)

Создано по **прототипу** (`App.tsx`: текст «Рег.Поинт», Ubuntu bold, `#243954`, accent `#e1eff2`):

| Файл | Назначение |
|------|------------|
| `logo-mark.svg` | Mark «Р» + точка (Reg.Point) в header |
| `logo.svg` / `logo-on-dark.svg` | Полный логотип RU |
| `logo-en.svg` | Reg.Point |
| `favicon.*` | PNG/ICO/SVG — `python scripts/generate-favicons.py` |

**Перед финальным релизом:** заменить экспортом из Figma при pixel-perfect сверке.

---

## Иконки и UI

- Прототип: **lucide-react** (SVG paths) — в production: inline SVG в `js/icons.js` или SVG-спрайт `img/icons.svg`
- Чек-мarks, shield, server — те же метафоры, стиль navy `#243954`

---

## Шрифты

| Шрифт | Назначение | Production |
|-------|------------|------------|
| Ubuntu | Заголовки, кнопки, nav | `css/fonts.css` — self-host woff2 |
| Times New Roman | Body | system stack (как продукт) |

Сверка weights/sizes — Figma typography + `App.tsx` Tailwind classes → CSS.

---

## Форматы и оптимизация

- Hero / covers: **WebP**, width ≤ 1600px, quality 80–85
- OG: **PNG** 1200×630 (соцсети)
- Favicon: 32×32 PNG + ICO
- `loading="lazy"` на всех below-fold
- `alt` — из title секции или H1 (из прототипа)

---

## Чеклист медиа перед релизом

- [ ] Все Unsplash URL заменены файлами в `img/`
- [ ] OG для каждой публичной страницы + статей
- [x] Favicon baseline + logo mark в header
- [ ] Logo/hero/OG — финальный экспорт Figma
- [ ] WebP + fallback при необходимости
- [ ] `docs/MEDIA_ASSETS.md` обновлён списком финальных путей
