(function () {
  'use strict';

  function selectAll(root, selector) {
    return root.querySelectorAll(selector);
  }

  function init(config) {
    var root = config.root || document;
    var key = config.key || 'default';
    var rootNode = root === document ? document.documentElement : root;
    var marker = 'filterInit' + key;

    if (rootNode.dataset && rootNode.dataset[marker] === '1') return false;

    var chips = selectAll(root, config.chipSelector || '.filter-chip');
    var items = selectAll(root, config.itemSelector);
    if (!chips.length || !items.length) return false;

    if (rootNode.dataset) rootNode.dataset[marker] = '1';

    var empty = config.emptySelector ? root.querySelector(config.emptySelector) : null;
    var list = config.listSelector ? root.querySelector(config.listSelector) : null;
    var allValue = (config.allValue || 'all').trim();
    var itemAttr = config.itemAttr;
    var activeClass = config.activeClass || 'is-active';

    function applyFilter(rawValue) {
      var value = (rawValue || allValue).trim();
      var visible = 0;

      items.forEach(function (item) {
        var itemValue = (item.getAttribute(itemAttr) || '').trim();
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
        var value = chip.getAttribute('data-filter') || allValue;
        chips.forEach(function (otherChip) {
          otherChip.classList.toggle(activeClass, otherChip === chip);
        });
        applyFilter(value);
      });
    });

    if (config.resetSelector) {
      selectAll(root, config.resetSelector).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var allChip = root.querySelector('.filter-chip[data-filter="' + allValue + '"]');
          if (allChip) allChip.click();
        });
      });
    }

    return true;
  }

  window.SiteFilter = {
    init: init,
  };
})();
