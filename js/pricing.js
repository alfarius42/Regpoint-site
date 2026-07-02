(function () {
  'use strict';

  function initStickyBar() {
    var bar = document.querySelector('.pricing-sticky-bar');
    if (!bar) return;

    var threshold = 400;

    function onScroll() {
      if (window.scrollY > threshold) {
        bar.classList.add('is-visible');
      } else {
        bar.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initAccordion() {
    var root = document.querySelector('.accordion');
    if (!root) return;

    root.querySelectorAll('.accordion__item').forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      var panel = item.querySelector('.accordion__panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        root.querySelectorAll('.accordion__item.is-open').forEach(function (openItem) {
          openItem.classList.remove('is-open');
          var openTrigger = openItem.querySelector('.accordion__trigger');
          if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function init() {
    initStickyBar();
    initAccordion();
  }

  window.SitePricing = { init: init };
})();
