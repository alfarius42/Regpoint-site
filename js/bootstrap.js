(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (window.SiteHeader) window.SiteHeader.init();
    if (window.SiteContact) window.SiteContact.init();
    if (window.SiteAnalytics) window.SiteAnalytics.init();
    if (window.SiteCookies) window.SiteCookies.init();
  });
})();
