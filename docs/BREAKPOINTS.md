# Breakpoints — канон проекта

> **Единственный источник правды** по адаптивности production-сайта.  
> CSS: `css/tokens.css` · QA: `tests/e2e/responsive.spec.js` · правило: `.cursor/rules/responsive-layout.mdc`

---

## Три фиксированных уровня

| Уровень | Ширина viewport | Роль |
|---------|-----------------|------|
| **Mobile** | **375 px** | Эталон мобильной вёрстки и Playwright QA |
| **Tablet** | **768 px** | Переход на tablet-layout (`min-width: 768px`) |
| **Desktop** | **1280 px** | Полный desktop-layout (`min-width: 1280px`) |

**375 / 768 / 1280** — не «случайные media query», а **зафиксированные состояния макета**, по которым сверяем Figma, прототип и приёмку.

---

## Адаптивность между breakpoints

Вёрстка **fluid** между уровнями:

- `clamp()`, `%`, `minmax()`, `flex` / `grid` — контент тянется от 320 px до 767 px, от 768 до 1279 px и т.д.
- **Не** подгонять каждый промежуточный px (390, 834, 1440) отдельным макетом.
- **Менять layout-tier** (колонки, nav, footer grid) **только** на **768** и **1280**.

Mobile-first: базовые стили = mobile; расширение через `@media (min-width: 768px)` и `@media (min-width: 1280px)`.

---

## CSS-тokens (`css/tokens.css`)

```css
--bp-mobile: 375px;    /* эталон QA / дизайн mobile, не min-width в @media */
--bp-tablet: 768px;    /* min-width: tablet+ */
--bp-desktop: 1280px;  /* min-width: desktop+ */

--bp-md: var(--bp-tablet);
--bp-xl: var(--bp-desktop);
--bp-nav-desktop: var(--bp-desktop);
```

**Production CSS:** только `@media (min-width: 768px)` и `@media (min-width: 1280px)` — legacy 640/1024 удалены.

---

## Поведение по уровням

| Область | Mobile (≤767, этalon 375) | Tablet (768–1279) | Desktop (≥1280) |
|---------|---------------------------|-------------------|-----------------|
| **Header** | Burger + drawer | Burger + drawer | Inline nav, dropdown «Продукты» |
| **Container padding** | 16px | 24px | 24px |
| **Hero** | 1 колонка, stack | subtitle/lead, частично 2 col | 2 колонки (text + media) |
| **Trust / cards** | 1 col | 2–3 col | 3–4 col |
| **Footer** | 1 col stack | 2 col | 4 col |
| **Pricing tables** | card stack или `overflow-x: auto` | table / scroll | full table |
| **Touch targets** | ≥ 44×44 px | ≥ 44×44 px | hover states |

Max content width: **80rem (1280px)** — `--container-max`.

---

## QA (обязательно перед merge)

Playwright и ручная проверка **строго** на viewport:

| Viewport | Размер | Файл |
|----------|--------|------|
| Mobile | **375 × 812** | `tests/e2e/responsive.spec.js` |
| Tablet | **768 × 1024** | то же |
| Desktop | **1280 × 900** | то же |

**Критерий:** нет horizontal scroll на `document.body` (кроме явных scroll-контейнеров таблиц).

---

## Связанные документы

- `MARKETING_SITE_SPEC.md` §1 п.11, §13.1
- `prototype/guidelines/HANDOFF.md`
- `docs/PR_WORKFLOW.md` — responsive gate в PR
- `docs/TEST_CASES_SPRINT*.md` — сценарии по viewport
