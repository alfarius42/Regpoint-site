(function () {
  'use strict';

  function openJivo() {
    if (window.jivo_api && typeof window.jivo_api.open === 'function') {
      window.jivo_api.open();
      return true;
    }
    return false;
  }

  function ensureChatFab() {
    if (document.querySelector('#chat-fab')) return;

    var fab = document.createElement('button');
    fab.type = 'button';
    fab.id = 'chat-fab';
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', 'Написать в чат');
    fab.setAttribute('data-action', 'jivo');
    fab.innerHTML =
      '<img class="chat-fab__icon" src="/img/icons/icon-chat.svg" width="24" height="24" alt="" />' +
      '<span class="chat-fab__label">Чат</span>';
    document.body.appendChild(fab);
  }

  function bindJivoTriggers() {
    document.querySelectorAll(
      '[data-action="jivo"], [data-action="demo"], [data-action="contact"], [data-action="chat-fab"], [data-action="jivo-chat"]'
    ).forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openJivo();
      });
    });
  }

  function initContact() {
    ensureChatFab();
    bindJivoTriggers();
  }

  window.SiteContact = { init: initContact, openJivo: openJivo };
})();
