(function () {
  'use strict';

  function initAccordion() {
    var root = document.querySelector('.accordion--faq');
    if (!root) return;

    root.querySelectorAll('.accordion__item').forEach(function (item) {
      var trigger = item.querySelector('.accordion__trigger');
      if (!trigger) return;

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
    initAccordion();
  }

  window.SiteFaq = { init: init };
})();
