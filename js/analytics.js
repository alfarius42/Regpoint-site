(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};
  var loaded = false;

  function loadMetrika() {
    if (loaded || !cfg.yandexMetrikaId) return;
    loaded = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) return;
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(cfg.yandexMetrikaId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    });
    window.ym(cfg.yandexMetrikaId, 'hit', window.location.href);
  }

  function initAnalytics() {
    if (!cfg.metrikaRequiresConsent) loadMetrika();
  }

  window.SiteAnalytics = { loadMetrika: loadMetrika, init: initAnalytics };
})();
