(function () {
  'use strict';

  var LIMITS = { children: 12, hub: 4, scenario: 4, product: 3, article: 3, feature: 3 };
  var SKIP_TYPES = { home: true, legal: true };
  var GROUP_ORDER = ['children', 'hub', 'scenario', 'product', 'article', 'feature', 'conversion'];

  var BLOCK_TITLES = {
    children: 'Раздел',
    hub: 'Связанные разделы',
    scenario: 'Сценарии по теме',
    product: 'Модули по теме',
    article: 'Статьи по теме',
    feature: 'Возможности',
    conversion: 'Следующий шаг',
  };

  var HUB_CHILD_TITLES = {
    '/scenarios/': 'Сценарии',
    '/articles/': 'Статьи',
    '/products/': 'Модули',
    '/technology/': 'Технологии',
    '/features/': 'Возможности',
    '/cases/': 'Кейсы',
    '/how-it-works/': 'Развёртывание',
    '/compliance-152fz/': '152-ФЗ',
  };

  var TYPE_TO_GROUP = {
    hub: 'hub',
    home: 'hub',
    product: 'product',
    article: 'article',
    scenario: 'scenario',
    feature: 'feature',
    'tech-child': 'feature',
    case: 'scenario',
    conversion: 'conversion',
  };

  var TAG_CLASS = {
    'self-hosted': 'internal-links-card__tag--dark',
    '152-ФЗ': 'internal-links-card__tag--blue',
    'check-in': 'internal-links-card__tag--accent',
    promo: 'internal-links-card__tag--accent',
    билеты: 'internal-links-card__tag--muted',
    цены: 'internal-links-card__tag--muted',
  };

  function normalizePath(path) {
    var cleaned = (path || '/').replace(/\/+$/, '') || '/';
    if (cleaned === '/') return '/';
    return cleaned + '/';
  }

  function isLive(page) {
    return page.status !== 'planned';
  }

  function findPage(pages, url) {
    var i;
    for (i = 0; i < pages.length; i += 1) {
      if (pages[i].url === url) return pages[i];
    }
    return null;
  }

  function tagScore(aTags, bTags) {
    var score = 0;
    var i;
    for (i = 0; i < aTags.length; i += 1) {
      if (bTags.indexOf(aTags[i]) !== -1) score += 1;
    }
    return score;
  }

  function groupFor(page) {
    return TYPE_TO_GROUP[page.type] || 'hub';
  }

  function hubChildren(pages, hubUrl) {
    return pages
      .filter(function (page) {
        if (!isLive(page)) return false;
        if (page.url === hubUrl) return false;
        if (SKIP_TYPES[page.type]) return false;
        return page.hub === hubUrl;
      })
      .sort(function (a, b) {
        return a.title.localeCompare(b.title, 'ru');
      });
  }

  /** Сценарии и tech-child, привязанные через relatedHubs (product / compliance hub). */
  function conditionalChildren(pages, current) {
    if (current.role !== 'hub' && current.type !== 'product') return [];

    return pages
      .filter(function (page) {
        if (!isLive(page)) return false;
        if (page.url === current.url) return false;
        if (page.hub === current.url) return false;
        if (!page.relatedHubs || page.relatedHubs.indexOf(current.url) === -1) return false;
        return page.type === 'scenario' || page.type === 'tech-child' || page.type === 'feature';
      })
      .sort(function (a, b) {
        return a.title.localeCompare(b.title, 'ru');
      });
  }

  function sectionChildren(pages, current) {
    var direct = hubChildren(pages, current.url);
    if (direct.length) return direct;
    return conditionalChildren(pages, current);
  }

  function rankPages(pages, current) {
    var ranked = [];

    pages.forEach(function (page) {
      if (page.url === current.url) return;
      if (!isLive(page)) return;
      if (SKIP_TYPES[page.type]) return;

      var score = tagScore(current.tags || [], page.tags || []);
      if (score < 1) return;

      ranked.push({
        page: page,
        score: score,
        group: groupFor(page),
      });
    });

    ranked.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.page.title.localeCompare(b.page.title, 'ru');
    });

    return ranked;
  }

  function pickByGroup(ranked, current, limits) {
    var picked = [];
    var caps = limits || LIMITS;

    GROUP_ORDER.forEach(function (group) {
      if (group === 'children') return;

      var limit = caps[group] || 2;
      var count = 0;

      ranked.forEach(function (item) {
        if (item.group !== group) return;
        if (count >= limit) return;
        if (current.hub && item.page.url === current.hub) return;
        picked.push(item);
        count += 1;
      });
    });

    return picked;
  }

  function ensureParentHub(picked, pages, current) {
    if (!current.hub) return picked;

    var hubPage = findPage(pages, current.hub);
    if (!hubPage || !isLive(hubPage)) return picked;

    var filtered = picked.filter(function (item) {
      return item.page.url !== current.hub;
    });

    filtered.unshift({ group: 'hub', page: hubPage, pinned: true });
    return filtered;
  }

  function ensureRelatedHubs(picked, pages, current) {
    var related = current.relatedHubs || [];
    var i;
    var hubPage;

    for (i = 0; i < related.length; i += 1) {
      hubPage = findPage(pages, related[i]);
      if (!hubPage || !isLive(hubPage)) continue;
      if (hubPage.url === current.url || hubPage.url === current.hub) continue;

      var exists = picked.some(function (item) {
        return item.page.url === hubPage.url;
      });
      if (exists) continue;

      picked.push({ group: 'hub', page: hubPage, pinned: true });
    }

    return picked;
  }

  function ensureConversionLinks(picked, pages, current) {
    if (current.type === 'conversion' || current.type === 'legal') return picked;

    var hasPricing = false;
    var hasContacts = false;
    var i;

    for (i = 0; i < picked.length; i += 1) {
      if (picked[i].page.url === '/pricing/') hasPricing = true;
      if (picked[i].page.url === '/contacts/') hasContacts = true;
    }

    pages.forEach(function (page) {
      if (!isLive(page)) return;
      if (page.url === '/pricing/' && !hasPricing) {
        picked.push({ group: 'conversion', page: page, pinned: true });
        hasPricing = true;
      }
      if (page.url === '/contacts/' && !hasContacts) {
        picked.push({ group: 'conversion', page: page, pinned: true });
        hasContacts = true;
      }
    });

    return picked;
  }

  function childrenBlock(pages, current) {
    var children = sectionChildren(pages, current);
    if (!children.length) return null;

    var title = HUB_CHILD_TITLES[current.url];
    if (!title && current.type === 'product') title = 'Сценарии модуля';
    if (!title) title = BLOCK_TITLES.children;

    return {
      group: 'children',
      pages: children.slice(0, LIMITS.children),
      title: title,
    };
  }

  function groupBlocks(items, hubBlock) {
    var blocks = [];
    var map = {};
    var order = [];

    if (hubBlock) {
      blocks.push(hubBlock);
    }

    items.forEach(function (item) {
      if (!map[item.group]) {
        map[item.group] = [];
        order.push(item.group);
      }
      map[item.group].push(item.page);
    });

    order.forEach(function (group) {
      blocks.push({ group: group, pages: map[group] });
    });

    return blocks;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function cardMeta(page) {
    if (page.type === 'article' && page.meta) {
      var tagClass = TAG_CLASS[page.meta.tag] || 'internal-links-card__tag--muted';
      return (
        '<p class="internal-links-card__meta">' +
        '<span class="internal-links-card__tag ' +
        tagClass +
        '">' +
        escapeHtml(page.meta.tag) +
        '</span>' +
        escapeHtml(page.meta.time) +
        '</p>'
      );
    }
    if (page.type === 'scenario') {
      return '<p class="internal-links-card__meta">сценарий</p>';
    }
    if (page.type === 'feature' || page.type === 'tech-child') {
      return '<p class="internal-links-card__meta">возможность</p>';
    }
    if (page.type === 'product') {
      return '<p class="internal-links-card__meta">модуль</p>';
    }
    if (page.type === 'conversion') {
      return '<p class="internal-links-card__meta">конверсия</p>';
    }
    return '<p class="internal-links-card__meta">раздел</p>';
  }

  function cardHtml(page) {
    return (
      '<a class="internal-links-card" href="' +
      escapeHtml(page.url) +
      '">' +
      cardMeta(page) +
      '<h3 class="internal-links-card__title font-heading">' +
      escapeHtml(page.title) +
      '</h3></a>'
    );
  }

  function renderBlocks(blocks) {
    if (!blocks.length) return '';

    var html = '<div class="internal-links">';
    blocks.forEach(function (block) {
      var title = block.title || BLOCK_TITLES[block.group] || 'Смотрите также';
      var gridClass =
        block.group === 'article' ||
        block.group === 'product' ||
        block.group === 'scenario' ||
        block.group === 'children'
          ? ' internal-links__grid--3'
          : '';

      html +=
        '<div class="internal-links__block">' +
        '<h2 class="internal-links__title font-heading">' +
        escapeHtml(title) +
        '</h2>' +
        '<div class="internal-links__grid' +
        gridClass +
        '">';

      block.pages.forEach(function (page) {
        html += cardHtml(page);
      });

      html += '</div></div>';
    });
    html += '</div>';
    return html;
  }

  function articleRelatedCardHtml(page) {
    var metaText = page.meta
      ? escapeHtml(page.meta.tag) + ' · ' + escapeHtml(page.meta.time)
      : 'статья';
    return (
      '<a class="article-related-card" href="' +
      escapeHtml(page.url) +
      '"><p class="article-related-card__meta">' +
      metaText +
      '</p><h3 class="article-related-card__title font-heading">' +
      escapeHtml(page.title) +
      '</h3></a>'
    );
  }

  function updateArticleRelated(pages, current) {
    var grid = document.querySelector('.article-related__grid');
    if (!grid) return;

    var ranked = rankPages(pages, current).filter(function (item) {
      return item.group === 'article';
    });

    var cards = ranked.slice(0, 2).map(function (item) {
      return articleRelatedCardHtml(item.page);
    });

    if (cards.length < 2) return;
    grid.innerHTML = cards.join('');
  }

  function hasStaticProductArticles() {
    return !!document.querySelector('.section--product-articles');
  }

  function shouldSkipArticleGroup(current) {
    if (hasStaticProductArticles()) return true;
    if (current.type === 'home') return true;
    return false;
  }

  function init() {
    var mount = document.querySelector('[data-internal-links]');
    if (!mount) return;

    fetch('/content/pages.json')
      .then(function (response) {
        if (!response.ok) throw new Error('pages.json');
        return response.json();
      })
      .then(function (data) {
        var pages = (data.pages || []).filter(isLive);
        var currentPath = normalizePath(window.location.pathname);
        var current = findPage(pages, currentPath);

        if (!current || current.type === 'legal') return;

        var hubBlock = null;
        if (current.role === 'hub' || current.type === 'hub' || (current.type === 'product' && current.role === 'hub')) {
          hubBlock = childrenBlock(pages, current);
        }

        var ranked = rankPages(pages, current);
        var picked = pickByGroup(ranked, current);

        if (!shouldSkipArticleGroup(current)) {
          /* articles already picked in pickByGroup */
        } else {
          picked = picked.filter(function (item) {
            return item.group !== 'article';
          });
        }

        picked = ensureParentHub(picked, pages, current);
        picked = ensureRelatedHubs(picked, pages, current);
        picked = ensureConversionLinks(picked, pages, current);

        if (hubBlock) {
          var childUrls = hubBlock.pages.map(function (page) {
            return page.url;
          });
          picked = picked.filter(function (item) {
            return childUrls.indexOf(item.page.url) === -1;
          });
        }

        var blocks = groupBlocks(picked, hubBlock);
        var html = renderBlocks(blocks);

        if (!html) {
          mount.remove();
          return;
        }

        mount.innerHTML = '<div class="container">' + html + '</div>';
        updateArticleRelated(pages, current);
      })
      .catch(function () {
        mount.remove();
      });
  }

  window.SiteInternalLinks = { init: init };
})();
