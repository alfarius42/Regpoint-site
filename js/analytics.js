(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};
  var loaded = false;

  function getMetrikaId() {
    var id = cfg.yandexMetrikaId;
    if (id === '' || id === null || id === undefined) return '';
    return String(id).trim();
  }

  function injectNoscript(id) {
    if (document.querySelector('[data-metrika-noscript]')) return;
    var ns = document.createElement('noscript');
    ns.setAttribute('data-metrika-noscript', 'true');
    ns.innerHTML =
      '<div><img src="https://mc.yandex.ru/watch/' + id +
      '" style="position:absolute; left:-9999px;" alt=""></div>';
    document.body.appendChild(ns);
  }

  function loadMetrika() {
    var id = getMetrikaId();
    if (loaded || !id) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];

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
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + id, 'ym');

    window.ym(id, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true,
    });

    injectNoscript(id);
  }

  function reachGoal(goal, params) {
    var id = getMetrikaId();
    if (!id || typeof window.ym !== 'function') return;
    window.ym(id, 'reachGoal', goal, params);
  }

  function initAnalytics() {
    if (!cfg.metrikaRequiresConsent) loadMetrika();
  }

  window.SiteAnalytics = {
    loadMetrika: loadMetrika,
    reachGoal: reachGoal,
    init: initAnalytics,
  };
})();
