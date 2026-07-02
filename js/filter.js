(function () {
  'use strict';

  /**
   * Page bindings mirror prototype filter logic:
   * - /articles/  → tag filter (ArticlesPage, activeTag)
   * - /scenarios/ → module filter (ScenariosPage, activeModule)
   *
   * Legacy attrs (data-tag, data-module, data-filter) stay supported.
   */
  var PAGE_BINDINGS = {
    articles: {
      key: 'articles',
      groupSelector: '[data-filter-group="articles-tags"]',
      itemSelector: '.article-card--listing',
      itemAttr: 'data-filter-item',
      itemFallbackAttr: 'data-tag',
      listSelector: '#articles-grid',
      emptySelector: '#articles-empty',
      resetSelector: '.articles-empty__reset',
      toggle: true,
    },
    scenarios: {
      key: 'scenarios',
      groupSelector: '[data-filter-group="scenarios-modules"]',
      itemSelector: '.scenario-card',
      itemAttr: 'data-filter-item',
      itemFallbackAttr: 'data-module',
      listSelector: '#scenario-list',
      emptySelector: '#scenario-empty',
      resetSelector: '.scenario-empty__reset',
      toggle: true,
    },
    'how-it-works': {
      key: 'howItWorks',
      groupSelector: '[data-filter-group="how-it-works-tabs"]',
      itemSelector: '.how-it-works-panel',
      itemAttr: 'data-filter-item',
      itemFallbackAttr: 'data-audience',
      toggle: false,
    },
  };

  function selectAll(root, selector) {
    return root.querySelectorAll(selector);
  }

  function readAttr(node, primary, fallback) {
    var value = node.getAttribute(primary);
    if (value === null || value === undefined || value === '') {
      value = fallback ? node.getAttribute(fallback) : value;
    }
    return (value || '').trim();
  }

  function init(config) {
    var root = config.root || document;
    var key = config.key || 'default';
    var scope = config.groupSelector ? root.querySelector(config.groupSelector) : root;
    if (!scope) return false;

    var markerNode = scope === document ? document.documentElement : scope;
    var marker = 'filterInit' + key;

    if (markerNode.dataset && markerNode.dataset[marker] === '1') return true;

    var chips = selectAll(scope, config.chipSelector || '.filter-chip');
    var items = selectAll(root, config.itemSelector || '[data-filter-item]');
    if (!chips.length || !items.length) return false;

    if (markerNode.dataset) markerNode.dataset[marker] = '1';

    var empty = config.emptySelector ? root.querySelector(config.emptySelector) : null;
    var list = config.listSelector ? root.querySelector(config.listSelector) : null;
    var allValue = (config.allValue || 'all').trim();
    var chipValueAttr = config.chipValueAttr || 'data-filter-value';
    var chipValueFallbackAttr = config.chipValueFallbackAttr || 'data-filter';
    var itemAttr = config.itemAttr || 'data-filter-item';
    var itemFallbackAttr = config.itemFallbackAttr;
    var activeClass = config.activeClass || 'is-active';
    var activeFilter = allValue;

    function setActiveChip(chip) {
      chips.forEach(function (otherChip) {
        otherChip.classList.toggle(activeClass, otherChip === chip);
      });
    }

    function findAllChip() {
      return (
        scope.querySelector('.filter-chip[' + chipValueAttr + '="' + allValue + '"]') ||
        scope.querySelector('.filter-chip[' + chipValueFallbackAttr + '="' + allValue + '"]') ||
        chips[0]
      );
    }

    function applyFilter(rawValue) {
      var value = (rawValue || allValue).trim();
      activeFilter = value;
      var visible = 0;

      items.forEach(function (item) {
        var itemValue = readAttr(item, itemAttr, itemFallbackAttr);
        var show = value === allValue || itemValue === value;
        item.hidden = !show;
        if (show) visible += 1;
      });

      if (empty && list) {
        empty.hidden = visible > 0;
        list.hidden = visible === 0;
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var value = readAttr(chip, chipValueAttr, chipValueFallbackAttr) || allValue;
        var isAllChip = value === allValue;

        if (config.toggle && !isAllChip && value === activeFilter && chip.classList.contains(activeClass)) {
          var allChip = findAllChip();
          if (allChip) {
            setActiveChip(allChip);
            applyFilter(allValue);
            return;
          }
        }

        setActiveChip(chip);
        applyFilter(isAllChip ? allValue : value);
      });
    });

    if (config.resetSelector) {
      selectAll(root, config.resetSelector).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var allChip = findAllChip();
          if (allChip) allChip.click();
        });
      });
    }

    return true;
  }

  function bootPage(pageId) {
    var config = PAGE_BINDINGS[pageId];
    if (!config) return false;
    return init(config);
  }

  function bootCurrentPage() {
    var pageId = document.body && document.body.getAttribute('data-page');
    if (!pageId) return false;
    return bootPage(pageId);
  }

  window.SiteFilter = {
    init: init,
    bootPage: bootPage,
    bootCurrentPage: bootCurrentPage,
    PAGE_BINDINGS: PAGE_BINDINGS,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootCurrentPage, { once: true });
  } else {
    bootCurrentPage();
  }
})();
