(function () {
  'use strict';

  function init() {
    if (window.SiteFilter && window.SiteFilter.bootPage) {
      window.SiteFilter.bootPage('articles');
    }
  }

  window.SiteArticles = { init: init };
})();
