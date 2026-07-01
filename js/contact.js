(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};

  function qs(sel) {
    return document.querySelector(sel);
  }

  function openModal(id) {
    var modal = qs(id);
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    var modal = qs(id);
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function openJivo() {
    if (window.jivo_api && typeof window.jivo_api.open === 'function') {
      window.jivo_api.open();
      return true;
    }
    return false;
  }

  function initContact() {
    document.querySelectorAll('[data-action="contact"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal('#contact-modal');
      });
    });

    document.querySelectorAll('[data-action="demo"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var href = btn.getAttribute('href') || cfg.demoUrl || '/contacts/#demo';
        if (btn.tagName === 'A') return;
        e.preventDefault();
        window.location.href = href;
      });
    });

    var jivoBtn = qs('[data-action="jivo-chat"]');
    if (jivoBtn) {
      jivoBtn.addEventListener('click', function () {
        closeModal('#contact-modal');
        if (!openJivo()) {
          window.location.href = cfg.demoUrl || '/contacts/#demo';
        }
      });
    }

    var tgBtn = qs('[data-action="telegram"]');
    if (tgBtn && cfg.telegramUrl) {
      tgBtn.addEventListener('click', function () {
        closeModal('#contact-modal');
        window.open(cfg.telegramUrl, '_blank', 'noopener,noreferrer');
      });
    }

    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          closeModal('#' + modal.id);
        });
      });
      modal.addEventListener('click', function (e) {
        if (e.target === modal.querySelector('.modal__backdrop')) {
          closeModal('#' + modal.id);
        }
      });
    });
  }

  window.SiteContact = { init: initContact, openJivo: openJivo };
})();
