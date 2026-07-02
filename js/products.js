(function () {
  'use strict';

  function initNotifyForm() {
    var form = document.querySelector('.notify-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.notify-form__input');
      if (input && !input.value.trim()) return;

      form.hidden = true;
      var success = document.querySelector('.notify-form__success');
      if (success) success.hidden = false;

      if (window.jivo_api && typeof window.jivo_api.open === 'function') {
        window.jivo_api.open();
      }
    });
  }

  function init() {
    initNotifyForm();
  }

  window.SiteProducts = { init: init };
})();
