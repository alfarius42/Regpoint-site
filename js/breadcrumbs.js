(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};
  var siteUrl = (cfg.siteUrl || 'https://reg-point.ru').replace(/\/$/, '');

  var LABELS = {
    products: 'Продукты',
    'reg-point': 'Рег.Поинт',
    'promo-point': 'Промо.Поинт',
    'promo-pro': 'Промо.Про',
    'ticket-point': 'Тикет.Поинт',
    pricing: 'Цены',
    technology: 'Технологии',
    'compliance-152fz': '152-ФЗ',
    'how-it-works': 'Как работает',
    scenarios: 'Сценарии',
    faq: 'FAQ',
    articles: 'Статьи',
    contacts: 'Контакты',
    privacy: 'Политика конфиденциальности',
    'marketing-consent': 'Согласие на маркетинговые рассылки',
  };

  function getSegments() {
    var path = window.location.pathname.replace(/\/+$/, '');
    if (!path) return [];
    return path.split('/').filter(Boolean);
  }

  function getCurrentTitle() {
    var h1 = document.querySelector(
      '.product-detail__title, .article-header__title, main .page-hero__title'
    );
    if (h1) return h1.textContent.replace(/\s+/g, ' ').trim();
    return document.title.split('|')[0].split('—')[0].trim();
  }

  function labelForSegment(segment, isLast) {
    if (LABELS[segment]) return LABELS[segment];
    if (isLast) return getCurrentTitle();
    return segment.replace(/-/g, ' ');
  }

  function buildTrail() {
    var segments = getSegments();
    if (!segments.length) return null;

    var trail = [{ label: 'Главная', href: '/' }];
    var href = '';

    for (var i = 0; i < segments.length; i += 1) {
      href += '/' + segments[i];
      var isLast = i === segments.length - 1;
      var label = labelForSegment(segments[i], isLast);

      trail.push({
        label: label,
        href: isLast ? null : href + '/',
      });
    }

    return trail;
  }

  function renderNav(trail) {
    var nav = document.createElement('nav');
    nav.className = 'breadcrumbs';
    nav.setAttribute('aria-label', 'Хлебные крошки');

    var list = document.createElement('ol');
    list.className = 'breadcrumbs__list';

    trail.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'breadcrumbs__item';

      if (item.href) {
        var link = document.createElement('a');
        link.className = 'breadcrumbs__link';
        link.href = item.href;
        link.textContent = item.label;
        li.appendChild(link);
      } else {
        var current = document.createElement('span');
        current.className = 'breadcrumbs__current';
        current.setAttribute('aria-current', 'page');
        current.textContent = item.label;
        li.appendChild(current);
      }

      list.appendChild(li);
    });

    nav.appendChild(list);
    return nav;
  }

  function injectSchema(trail) {
    var itemListElement = trail.map(function (item, index) {
      var entry = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };
      if (item.href) {
        entry.item = siteUrl + item.href;
      }
      return entry;
    });

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemListElement,
    });
    document.head.appendChild(script);
  }

  function findMountPoint() {
    var backLink = document.querySelector('.product-back, .article-back');
    if (backLink) return { node: backLink, mode: 'replace' };

    var container = document.querySelector(
      'main .page-hero .container, main .article-header .container'
    );
    if (container) return { node: container, mode: 'prepend' };

    return null;
  }

  function init() {
    var segments = getSegments();
    if (!segments.length) return;

    var trail = buildTrail();
    if (!trail || trail.length < 2) return;

    var mount = findMountPoint();
    if (!mount) return;

    var nav = renderNav(trail);

    if (mount.mode === 'replace') {
      mount.node.replaceWith(nav);
    } else {
      mount.node.insertBefore(nav, mount.node.firstChild);
    }

    injectSchema(trail);
  }

  window.SiteBreadcrumbs = { init: init };
})();
