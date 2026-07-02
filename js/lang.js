(function () {
  'use strict';

  var COOKIE_NAME = 'lang';

  function setLangCookie(lang) {
    try {
      document.cookie = COOKIE_NAME + '=' + lang + ';path=/;max-age=31536000;SameSite=Lax';
    } catch (e) {
      /* ignore */
    }
  }

  function initLang() {
    document.querySelectorAll('[data-lang]').forEach(function (link) {
      link.addEventListener('click', function () {
        var lang = link.getAttribute('data-lang');
        if (lang) setLangCookie(lang);
      });
    });
  }

  window.SiteLang = { init: initLang, setLangCookie: setLangCookie };
})();
