(function () {
  'use strict';

  var PD_CONSENT_KEY = 'jivo-pd-consent';
  var MARKETING_CONSENT_KEY = 'jivo-marketing-consent';
  var modalEl = null;
  var pendingJivoOpen = false;
  var jivoReady = false;

  function invokeJivoOpen() {
    if (!window.jivo_api || typeof window.jivo_api.open !== 'function') {
      return false;
    }

    var apiResult = window.jivo_api.open({ start: 'chat' });
    if (apiResult && apiResult.result === 'fail') {
      apiResult = window.jivo_api.open({ start: 'chat' });
    }

    return !apiResult || apiResult.result !== 'fail';
  }

  function flushPendingJivoOpen() {
    if (!pendingJivoOpen) return;
    if (invokeJivoOpen()) {
      pendingJivoOpen = false;
    }
  }

  function installJivoLoadCallback() {
    var previous = window.jivo_onLoadCallback;
    window.jivo_onLoadCallback = function () {
      jivoReady = true;
      if (typeof previous === 'function') previous();
      flushPendingJivoOpen();
    };
  }

  function openJivo() {
    pendingJivoOpen = true;

    if (jivoReady || (window.jivo_api && typeof window.jivo_api.open === 'function')) {
      if (invokeJivoOpen()) {
        pendingJivoOpen = false;
        return true;
      }
      return pendingJivoOpen;
    }

    if (window.SiteJivo && typeof window.SiteJivo.ensureLoaded === 'function') {
      window.SiteJivo.ensureLoaded(function () {
        flushPendingJivoOpen();
      });
    }

    return true;
  }

  function hasPdConsent() {
    try {
      return localStorage.getItem(PD_CONSENT_KEY) === '1';
    } catch (err) {
      return false;
    }
  }

  function saveConsents(marketingAccepted) {
    try {
      localStorage.setItem(PD_CONSENT_KEY, '1');
      if (marketingAccepted) {
        localStorage.setItem(MARKETING_CONSENT_KEY, '1');
      } else {
        localStorage.removeItem(MARKETING_CONSENT_KEY);
      }
    } catch (err) {
      /* ignore quota / private mode */
    }
  }

  function hideConsentModal() {
    if (!modalEl) return;
    modalEl.hidden = true;
    document.body.classList.remove('is-jivo-consent-open');
  }

  function ensureConsentModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement('div');
    modalEl.id = 'jivo-consent-modal';
    modalEl.className = 'modal';
    modalEl.hidden = true;
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-labelledby', 'jivo-consent-title');
    modalEl.innerHTML =
      '<div class="modal__backdrop" data-consent-close></div>' +
      '<div class="modal__dialog modal__dialog--wide">' +
      '<div class="modal__header">' +
      '<h2 class="modal__title font-heading" id="jivo-consent-title">Перед началом переписки</h2>' +
      '<button type="button" class="modal__close" data-consent-close aria-label="Закрыть">✕</button>' +
      '</div>' +
      '<form class="modal__body modal__body--form" id="jivo-consent-form">' +
      '<p class="demo-modal__sub">Для обращения в онлайн-чат необходимо подтвердить согласие на обработку персональных данных. Согласие на маркетинговые рассылки — по желанию.</p>' +
      '<div class="modal__consent-list">' +
      '<label class="modal__consent">' +
      '<input type="checkbox" id="jivo-consent-pd" name="pd-consent" required />' +
      '<span>Согласен с <a href="/privacy/" target="_blank" rel="noopener noreferrer">обработкой персональных данных</a> согласно Политике конфиденциальности *</span>' +
      '</label>' +
      '<label class="modal__consent">' +
      '<input type="checkbox" id="jivo-consent-marketing" name="marketing-consent" />' +
      '<span>Согласен на получение маркетинговых рассылок согласно <a href="/privacy/marketing-consent/" target="_blank" rel="noopener noreferrer">тексту согласия</a> — необязательно</span>' +
      '</label>' +
      '</div>' +
      '<button type="submit" class="btn btn--primary btn--block">Продолжить в чат</button>' +
      '<p class="modal__footer-note">Обработка персональных данных осуществляется в соответствии со&nbsp;ст.&nbsp;9 и&nbsp;15 Федерального закона №152-ФЗ. Отзыв согласия — через онлайн-чат Jivo.</p>' +
      '</form>' +
      '</div>';

    document.body.appendChild(modalEl);

    modalEl.querySelectorAll('[data-consent-close]').forEach(function (el) {
      el.addEventListener('click', hideConsentModal);
    });

    modalEl.querySelector('#jivo-consent-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var pdChecked = modalEl.querySelector('#jivo-consent-pd').checked;
      if (!pdChecked) return;

      var marketingChecked = modalEl.querySelector('#jivo-consent-marketing').checked;
      saveConsents(marketingChecked);
      hideConsentModal();
      openJivo();
    });

    return modalEl;
  }

  function showConsentModal() {
    var modal = ensureConsentModal();
    var form = modal.querySelector('#jivo-consent-form');
    var pdInput = modal.querySelector('#jivo-consent-pd');
    var marketingInput = modal.querySelector('#jivo-consent-marketing');

    form.reset();
    pdInput.checked = false;
    marketingInput.checked = false;

    modal.hidden = false;
    document.body.classList.add('is-jivo-consent-open');
    pdInput.focus();
  }

  function requestJivo() {
    if (hasPdConsent()) {
      openJivo();
      return;
    }
    showConsentModal();
  }

  function bindJivoTriggers() {
    document.querySelectorAll(
      '[data-action="jivo"], [data-action="demo"], [data-action="contact"], [data-action="jivo-chat"]'
    ).forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        requestJivo();
      });
    });
  }

  function initContact() {
    ensureConsentModal();
    bindJivoTriggers();
    if (window.jivo_api && typeof window.jivo_api.open === 'function') {
      jivoReady = true;
      flushPendingJivoOpen();
    }
  }

  installJivoLoadCallback();

  window.SiteContact = {
    init: initContact,
    openJivo: openJivo,
    requestJivo: requestJivo,
    hasPdConsent: hasPdConsent,
  };
})();
