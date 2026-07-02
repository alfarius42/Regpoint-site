# HTML `<head>` — copy template (MPA)

Шаблон для новых страниц production. Используется в `scripts/gen-sprint3-pages.py`, `scripts/gen-sprint4-privacy.py`.

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <link rel="canonical" href="{canonical}" />
    <meta property="og:title" content="{og_title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{canonical}" />
    <meta property="og:locale" content="ru_RU" />
    <!-- optional: <script type="application/ld+json">…</script> -->
    <link rel="icon" href="/img/favicon.ico" sizes="any" />
    <link rel="icon" href="/img/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/img/favicon-32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
    <meta name="theme-color" content="#243954" />
    <link rel="stylesheet" href="/css/fonts.css" />
    <link rel="stylesheet" href="/css/reset.css" />
    <link rel="stylesheet" href="/css/tokens.css" />
    <link rel="stylesheet" href="/css/layout.css" />
    <link rel="stylesheet" href="/css/components.css" />
    <link rel="stylesheet" href="/css/pages.css" />
  </head>
  <body data-page="{page_id}">
```

## Scripts (before `</body>`)

```html
    <script src="/js/config.js"></script>
    <script src="/js/jivo.js"></script>
    <script src="/js/header.js" defer></script>
    <script src="/js/lang.js" defer></script>
    <script src="/js/contact.js" defer></script>
    <!-- page-specific: faq.js, contacts.js, … -->
    <script src="/js/analytics.js" defer></script>
    <script src="/js/cookies.js" defer></script>
    <script src="/js/seo.js" defer></script>
    <script src="/js/bootstrap.js" defer></script>
```

## Cookie banner (shared)

См. `scripts/gen-sprint4-privacy.py` → `COOKIE_BANNER`.
