(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};
  var widgetId = (cfg.jivoWidgetId || '').trim();
  var scriptLoading = false;
  var scriptLoaded = false;
  var loadQueue = [];

  function flushQueue(err) {
    var queue = loadQueue.slice();
    loadQueue.length = 0;
    queue.forEach(function (cb) {
      cb(err);
    });
  }

  function ensureLoaded(callback) {
    if (!widgetId) {
      if (typeof callback === 'function') callback(new Error('Jivo widget id is empty'));
      return;
    }

    if (scriptLoaded) {
      if (typeof callback === 'function') callback(null);
      return;
    }

    if (typeof callback === 'function') {
      loadQueue.push(callback);
    }

    if (scriptLoading) {
      return;
    }

    scriptLoading = true;

    var script = document.createElement('script');
    script.src = '//code.jivo.ru/widget/' + widgetId;
    script.async = true;
    script.onload = function () {
      scriptLoaded = true;
      scriptLoading = false;
      flushQueue(null);
    };
    script.onerror = function () {
      scriptLoading = false;
      flushQueue(new Error('Failed to load Jivo script'));
    };
    document.body.appendChild(script);
  }

  window.SiteJivo = {
    ensureLoaded: ensureLoaded,
    isLoaded: function () {
      return scriptLoaded;
    },
  };
})();
