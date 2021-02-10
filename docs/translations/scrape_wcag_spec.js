// https://medialab.github.io/artoo/

/**
 * WCAG2.0
 */

// SC DATA WCAG20
WCAG20 = artoo.scrape('.sc', {
  num: function getSectionNumber() {
    return $(this)
      .find('.sc-handle')
      .text()
      .match(/\d(\.\d+){2}/g)[0];
  },
  conformanceLevel: function getConformanceLevel() {
    return $(this)
      .text()
      .match(/(\(Level (A{1,3})\))/g)
      .toString()
      .replace(/[^A]/g, '');
  }
});
artoo.saveJson(WCAG20, 'WCAG20.json');

// NEW SC DATA
WCAG_UPDATE = artoo.scrape('.sc.new, .sc.changed', {
  num: function () {
    return $(this)
      .find('.secno')
      .text()
      .replace(/([^0-9\.])+/g, '')
      .trim();
  },
  conformanceLevel: function () {
    return $(this)
      .find('.conformance-level')
      .text()
      .replace(/[^A]/g, '')
      .trim();
  }
}).reduce((result, sc) => {
  const { num, conformanceLevel } = sc;
  result[num] = {
    num,
    conformanceLevel
  };

  return result;
}, {});
artoo.saveJson(WCAG_UPDATE, 'wcag_new.json');

let WCAG21_P = artoo
  .scrape('.principle', {
    num: function () {
      return $(this)
        .find('h2 > .secno')
        .text()
        .replace(/([^0-9])+/g, '')
        .trim();
    },
    ID: 'id',
    TITLE: function () {
      return $(this)
        .find('h2')
        .text()
        .replace(/[^A-Za-z\s]+/g, '')
        .trim();
    },
    DESCRIPTION: function () {
      return $(this)
        .find('h2 + p')
        .text()
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  })
  .reduce((translations, item) => {
    const { num, ...rest } = item;

    translations[num] = rest;

    return translations;
  }, {});

let WCAG21_G = artoo
  .scrape('.guideline', {
    num: function () {
      return $(this)
        .find('h3 > .secno')
        .text()
        .replace(/([^0-9\.])+/g, '')
        .trim();
    },
    ID: 'id',
    TITLE: function () {
      const $el = $(this);
      const secno = $el.find('h3 > .secno').text();

      return $el
        .find('h3')
        .text()
        .replace(secno, '')
        .replace(/[^A-Za-z\s]+/g, '')
        .trim();
    },
    DESCRIPTION: function () {
      return $(this)
        .find('h3 + p')
        .text()
        .replace(/\s{2,}/g, ' ')
        .trim();
    }
  })
  .reduce((translations, item) => {
    const { num, ...rest } = item;

    translations[num] = rest;

    return translations;
  }, {});

let WCAG21_SC = artoo
  .scrape('.sc', {
    num: function () {
      return $(this)
        .find('.secno')
        .text()
        .replace(/([^0-9\.])+/g, '')
        .trim();
    },
    ID: 'id',
    TITLE: {
      sel: 'h4',
      method: function () {
        const nonTitles = $(this)
          .find('*')
          .get()
          .map((nonTitle) => nonTitle.textContent);

        let title = $(this).text();

        nonTitles.forEach((nonTitle) => {
          title = title.replace(nonTitle, '');
        });

        return title.replace(/\s+/g, ' ').trim();
      }
    },
    DESCRIPTION: {
      sel: '.conformance-level + p',
      method: function () {
        return $(this).text().replace(/\s+/g, ' ').trim();
      }
    },
    DETAILS: function () {
      const list = $(this).find('dl');

      if (!list || list.length === 0) {
        return {};
      }

      const titles = list
        .find('dt')
        .get()
        .map((el) => el.textContent.replace(':', '').trim());

      const descriptions = list
        .find('dd')
        .get()
        .map((el) => el.textContent.replace(/\s+/g, ' ').trim());

      return titles.reduce((detailsO, title, index) => {
        detailsO[`DETAIL_${index}`] = {
          TITLE: title,
          DESCRIPTION: descriptions[index]
        };

        return detailsO;
      }, {});
    }
  })
  .reduce((translations, item) => {
    const { num, ...rest } = item;

    translations[num] = rest;

    return translations;
  }, {});

let WCAG21_TRANSLATION = {
  PRINCIPLE: WCAG21_P,
  GUIDELINE: WCAG21_G,
  SUCCESS_CRITERION: WCAG21_SC
};

artoo.saveJson(WCAG21_TRANSLATION, 'WCAG21_LANG.json');

// SC CONTENT WCAG21
