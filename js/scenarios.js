(function () {
  'use strict';

  function init() {
    if (window.SiteFilter && window.SiteFilter.bootPage) {
      window.SiteFilter.bootPage('scenarios');
    }
  }

  window.SiteScenarios = { init: init };
})();
