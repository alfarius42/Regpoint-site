(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};
  var widgetId = (cfg.jivoWidgetId || '').trim();

  if (!widgetId) return;

  var script = document.createElement('script');
  script.src = '//code.jivo.ru/widget/' + widgetId;
  script.async = true;
  document.body.appendChild(script);
})();
