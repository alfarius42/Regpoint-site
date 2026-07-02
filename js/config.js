/**
 * Конфигурация маркетингового сайта Рег.Поинт.
 * @see MARKETING_SITE_SPEC.md, docs/INTEGRATIONS.md
 */
window.SITE_CONFIG = {
  siteName: 'Рег.Поинт',
  siteNameEn: 'Reg.Point',
  siteUrl: 'https://reg-point.ru',

  brand: {
    taglineRu: 'Регистрация на мероприятия на вашем сервере',
    taglineEn: 'Event registration on your own server',
  },

  /** Jivo widget — пустая строка = не подключать script */
  jivoWidgetId: 'COp1zDxNwg',

  /** Telegram — личный аккаунт */
  telegramUrl: 'https://t.me/ZaharMishiev',
  telegramHandle: '@ZaharMishiev',

  /** Яндекс.Метрика — пустая строка = не инициализировать */
  yandexMetrikaId: '110315704',
  metrikaRequiresConsent: true,

  nav: [
    { label: 'Продукты', href: '/products/', children: [
      { label: 'Все модули — обзор', href: '/products/' },
      { label: 'Рег.Поинт', href: '/products/reg-point/' },
      { label: 'Промо.Поинт', href: '/products/promo-point/' },
      { label: 'Промо.Про', href: '/products/promo-pro/' },
      { label: 'Тикет.Поинт', href: '/products/ticket-point/' },
    ]},
    { label: 'Цены', href: '/pricing/' },
    { label: 'Технологии', href: '/technology/' },
    { label: '152-ФЗ', href: '/compliance-152fz/' },
    { label: 'Как работает', href: '/how-it-works/' },
    { label: 'Сценарии', href: '/scenarios/' },
    { label: 'FAQ', href: '/faq/' },
    { label: 'Статьи', href: '/articles/' },
    { label: 'Контакты', href: '/contacts/' },
  ],

  demoUrl: '/contacts/#demo',

  /** Email оператора для privacy — заполнить когда будет создан */
  privacyEmail: '',
};
