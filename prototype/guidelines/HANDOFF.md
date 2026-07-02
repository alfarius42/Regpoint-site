# HANDOFF — прототип → production (vanilla HTML/CSS/JS)

> **Figma (канон визуала):** [Регпоинтинг](https://www.figma.com/design/mV4djwXG8q7KnkaTq9rRAy/) — сверка через MCP, pixel-perfect.  
> **Прототип:** источник бизнес-логики, поведения и UX; код в production **не переносится**.  
> **Канон текстов:** `../MARKETING_SITE_SPEC.md`.  
> **Production:** MPA HTML + CSS + JS; интеграции Jivo + Telegram.

---

## 1. Страницы прототипа (SPA → MPA)

| PageId (прототип) | URL production |
|-------------------|----------------|
| home | `/` |
| products | `/products/` |
| reg-point … ticket-point | `/products/reg-point/` … |
| pricing | `/pricing/` |
| technology | `/technology/` |
| compliance | `/compliance-152fz/` |
| how-it-works | `/how-it-works/` |
| scenarios | `/scenarios/` |
| faq | `/faq/` |
| articles | `/articles/` |
| contacts | `/contacts/` |
| privacy | `/privacy/` |

EN: `/en/…` — Sprint 4.

---

## 2. Design tokens

```css
--color-primary: #243954;
--color-primary-hover: #1a2d43;
--color-accent: #e1eff2;
--color-accent-blue: #314180;
--color-bg-muted: #f2f2f2;
--color-text-muted: #525252;
--color-border: #b3b3b3;
--font-heading: 'Ubuntu', ui-sans-serif, system-ui, sans-serif;
--font-body: 'Times New Roman', Times, serif;
```

---

## 3. Breakpoints (Tailwind → CSS)

| Tailwind | CSS min-width | Использование в прототипе |
|----------|---------------|---------------------------|
| sm | 640px | px-6, grid 2 col |
| md | 768px | hero subtitle, 2–3 col grids |
| lg | 1024px | hero 2 columns |
| xl | 1280px | desktop nav, hide burger |

**Обязательно** воспроизвести поведение на всех breakpoints — см. `.cursor/rules/responsive-layout.mdc`.

---

## 4. Header

- Sticky, фон `#243954`, текст white
- Logo + brand «Рег.Поинт»
- Nav: Продукты (dropdown 4 модуля), Цены, Технологии, 152-ФЗ, Как работает, Сценарии, FAQ, Статьи, Контакты
- CTA: «Связаться» (secondary), «Запросить КП / Демо» (primary accent)
- `<xl`: burger → full-screen drawer

---

## 5. Footer

- CTA band: «Готовы обсудить ваш сценарий?»
- 4 колонки links + legal
- Copyright, privacy link

---

## 6. UX-потоки (не stub в production)

### ContactModal

- «Онлайн-чат» → `jivo_api.open()` (не alert)
- «Telegram» → `config.telegramUrl`
- «Запросить КП / Демо» → `/contacts#demo`

### Demo form

- Production: **Jivo embed** на `#demo`, не локальная форма
- Поля: см. MARKETING_SITE_SPEC §4.4

---

## 7. Главная — блоки (порядок)

1. Hero (H1 + 2 CTA + decorative card desktop)
2. Trust 3 col
3. «Не SaaS — коробка»
4. Модули 4 cards
5. 152-ФЗ teaser
6. «Как начать» 3 steps
7. FAQ 4 items
8. Footer CTA

---

## 8. Компоненты для CSS

- `.btn`, `.btn--primary`, `.btn--secondary`
- `.section`, `.section--muted`, `.section--accent`
- `.card`, `.card--product`
- `.site-header`, `.site-drawer`, `.modal`
- `.container` (max-w-7xl)

---

## 9. Stub vs production

| Прототип | Production |
|----------|------------|
| `alert("Jivo stub")` | `jivo_api.open()` |
| Local demo form submit | Jivo embed |
| React `useState` page | MPA HTML files |
| Tailwind classes | BEM + tokens.css |
