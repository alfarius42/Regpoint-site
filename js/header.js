(function () {
  'use strict';

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function openDrawer() {
    var drawer = qs('#site-drawer');
    var burger = qs('#btn-menu');
    if (!drawer) return;
    drawer.hidden = false;
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var drawer = qs('#site-drawer');
    var burger = qs('#btn-menu');
    if (!drawer) return;
    drawer.hidden = true;
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initHeader() {
    var burger = qs('#btn-menu');
    var drawer = qs('#site-drawer');
    if (burger) {
      burger.addEventListener('click', function () {
        if (drawer && drawer.hidden) openDrawer();
        else closeDrawer();
      });
    }
    if (drawer) {
      drawer.addEventListener('click', function (e) {
        if (e.target === drawer || e.target.matches('[data-drawer-close]')) closeDrawer();
      });
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeDrawer);
      });
    }
  }

  window.SiteHeader = { init: initHeader, openDrawer: openDrawer, closeDrawer: closeDrawer };
})();
