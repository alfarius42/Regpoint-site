(function () {
  'use strict';

  var initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    if (!window.SiteFilter || !window.SiteFilter.init) return;

    window.SiteFilter.init({
      key: 'articles',
      itemSelector: '.article-card--listing',
      itemAttr: 'data-tag',
      emptySelector: '#articles-empty',
      listSelector: '#articles-grid',
      resetSelector: '.articles-empty__reset',
    });
  }

  window.SiteArticles = { init: init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
