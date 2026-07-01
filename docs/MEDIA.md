# MEDIA — медиа-ассеты сайта

## Статус

Placeholder. OG-изображения и favicon — Sprint 5–6.

## Структура `img/`

```text
img/
  favicon-32.png
  logo.svg / logo.webp
  og/
    home.png          1200×630
    pricing.png
    …
  products/
    reg-point.webp
    …
```

## Правила

- Production: WebP/AVIF, `loading="lazy"`, осмысленный `alt`
- Логотип RU: **Рег.Поинт**, EN: **Reg.Point**
- Цвета бренда: `#243954`, `#e1eff2` — см. `css/tokens.css`

## Шрифты

- Heading: **Ubuntu** — `css/fonts.css`
- Body: **Times New Roman** / serif — как в продукте ESC-Promo

## Прототип

Визуальные референсы блоков — `prototype/src/app/App.tsx` (не копировать assets напрямую без оптимизации).
