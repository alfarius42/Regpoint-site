(function () {
  'use strict';

  var KEY = 'cookie-consent';
  var BODY_CLASS = 'is-cookie-banner-visible';

  function qs(sel) {
    return document.querySelector(sel);
  }

  function hideBanner() {
    var banner = qs('#cookie-banner');
    if (banner) banner.hidden = true;
    document.body.classList.remove(BODY_CLASS);
  }

  function showBanner() {
    var banner = qs('#cookie-banner');
    if (!banner) return;
    banner.hidden = false;
    document.body.classList.add(BODY_CLASS);
  }

  function setConsent(value) {
    localStorage.setItem(KEY, value);
    hideBanner();
    if (value === 'accepted' && window.SiteAnalytics) {
      window.SiteAnalytics.loadMetrika();
    }
  }

  function initCookies() {
    var banner = qs('#cookie-banner');
    if (!banner) return;

    var consent = localStorage.getItem(KEY);
    if (consent === 'accepted') {
      hideBanner();
      if (window.SiteAnalytics) window.SiteAnalytics.loadMetrika();
      return;
    }
    if (consent === 'essential') {
      hideBanner();
      return;
    }

    showBanner();
    var acceptBtn = qs('#cookie-accept');
    var essentialBtn = qs('#cookie-essential');
    if (acceptBtn) acceptBtn.addEventListener('click', function () { setConsent('accepted'); });
    if (essentialBtn) essentialBtn.addEventListener('click', function () { setConsent('essential'); });
  }

  window.SiteCookies = { init: initCookies };
})();
