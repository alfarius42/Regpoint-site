(function () {
  'use strict';

  var KEY = 'cookie-consent';

  function qs(sel) {
    return document.querySelector(sel);
  }

  function accept() {
    localStorage.setItem(KEY, 'accepted');
    var banner = qs('#cookie-banner');
    if (banner) banner.hidden = true;
    if (window.SiteAnalytics) window.SiteAnalytics.loadMetrika();
  }

  function initCookies() {
    var banner = qs('#cookie-banner');
    if (!banner) return;
    if (localStorage.getItem(KEY) === 'accepted') {
      banner.hidden = true;
      if (window.SiteAnalytics) window.SiteAnalytics.loadMetrika();
      return;
    }
    banner.hidden = false;
    var btn = qs('#cookie-accept');
    if (btn) btn.addEventListener('click', accept);
  }

  window.SiteCookies = { init: initCookies };
})();
