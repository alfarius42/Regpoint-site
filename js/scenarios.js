(function () {
  'use strict';

  var initialized = false;

  function initFilter() {
    var chips = document.querySelectorAll('.filter-chip');
    var cards = document.querySelectorAll('.scenario-card');
    var empty = document.getElementById('scenario-empty');
    var list = document.getElementById('scenario-list');
    if (!chips.length || !cards.length) return;

    function applyFilter(value) {
      var visible = 0;

      cards.forEach(function (card) {
        var module = (card.getAttribute('data-module') || '').trim();
        var filterValue = (value || 'all').trim();
        var show = filterValue === 'all' || module === filterValue;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (empty && list) {
        empty.hidden = visible > 0;
        list.hidden = visible === 0;
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var value = chip.getAttribute('data-filter') || 'all';

        chips.forEach(function (c) {
          c.classList.toggle('is-active', c === chip);
        });

        applyFilter(value);
      });
    });

    document.querySelectorAll('.scenario-empty__reset').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var allChip = document.querySelector('.filter-chip[data-filter="all"]');
        if (allChip) allChip.click();
      });
    });
  }

  function init() {
    if (initialized) return;
    initialized = true;
    initFilter();
  }

  window.SiteScenarios = { init: init };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
