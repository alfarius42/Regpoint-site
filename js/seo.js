(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};

  var SCHEMAS = {
    privacy: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Политика конфиденциальности',
      description: 'Политика обработки персональных данных сайта Рег.Поинт.',
      url: (cfg.siteUrl || 'https://reg-point.ru') + '/privacy/',
      inLanguage: 'ru-RU',
      isPartOf: {
        '@type': 'WebSite',
        name: cfg.siteName || 'Рег.Поинт',
        url: cfg.siteUrl || 'https://reg-point.ru',
      },
    },
  };

  function hasInlineSchema() {
    return !!document.querySelector('script[type="application/ld+json"]');
  }

  function injectSchema(data) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function initSeo() {
    if (hasInlineSchema()) return;
    var page = document.body && document.body.dataset.page;
    if (!page || !SCHEMAS[page]) return;
    injectSchema(SCHEMAS[page]);
  }

  window.SiteSeo = { init: initSeo };
})();
