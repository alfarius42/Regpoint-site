(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (window.SiteHeader) window.SiteHeader.init();
    if (window.SiteContact) window.SiteContact.init();
    if (window.SitePricing) window.SitePricing.init();
    if (window.SiteProducts) window.SiteProducts.init();
    if (window.SiteFaq) window.SiteFaq.init();
    if (window.SiteScenarios) window.SiteScenarios.init();
    if (window.SiteArticles) window.SiteArticles.init();
    if (window.SiteAnalytics) window.SiteAnalytics.init();
    if (window.SiteCookies) window.SiteCookies.init();
    if (window.SiteSeo) window.SiteSeo.init();
    if (window.SiteBreadcrumbs) window.SiteBreadcrumbs.init();
    if (window.SiteInternalLinks) window.SiteInternalLinks.init();
  });
})();
