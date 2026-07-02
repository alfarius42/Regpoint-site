(function () {
  'use strict';

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
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
    closeProductsMenu();
  }

  function openProductsMenu() {
    var menu = qs('#nav-products-menu');
    var toggle = qs('#nav-products-toggle');
    if (!menu || !toggle) return;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeProductsMenu() {
    var menu = qs('#nav-products-menu');
    var toggle = qs('#nav-products-toggle');
    if (!menu || !toggle) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  function initProductsDropdown() {
    var wrap = qs('#nav-products');
    var toggle = qs('#nav-products-toggle');
    var menu = qs('#nav-products-menu');
    if (!wrap || !toggle || !menu) return;

    wrap.addEventListener('mouseenter', openProductsMenu);
    wrap.addEventListener('mouseleave', closeProductsMenu);

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (menu.hidden) openProductsMenu();
      else closeProductsMenu();
    });

    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeProductsMenu();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openProductsMenu();
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeProductsMenu();
    });
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
      qsa('a', drawer).forEach(function (a) {
        a.addEventListener('click', closeDrawer);
      });
    }
    initProductsDropdown();
  }

  window.SiteHeader = {
    init: initHeader,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
  };
})();
