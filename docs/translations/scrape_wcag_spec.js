// https://medialab.github.io/artoo/
const artoo = {};
/**
 * WCAG2.0
 */
let wcag_20 = artoo.scrape('.principle', function getPrinciples($) {
  const principle = $(this);
  const principleText = principle.text();
  const parent = principle.parent();
  const guidelines = parent.find('.guideline');
  const [title, description] = principleText
    .split(principleText.match(/[-–]/)[0])
    .map((str) => cleanWhitespace(str));

  function cleanWhitespace(str) {
    return str.replace(/\s{2,}/g, ' ').trim();
  }

  return {
    num: principleText.replace(/\D/g, ''),
    title,
    description,
    guidelines: guidelines
      .map(function getGuidelines() {
        const guideline = $(this);
        const guidelineText = guideline.find('h3').text();
        const parent = guideline.parent();
        const succescriteria = parent.find('.sc');
        const [title, description] = guidelineText
          .split(':')
          .map((str) => cleanWhitespace(str));

        return {
          num: guidelineText.match(/\d\.\d/g)[0],
          title,
          description,
          succescriteria: succescriteria
            .map(function getCriteria() {
              const sc = $(this);
              const scHandle = sc.find('.sctxt > .sc-handle').text();
              const scText = sc.find('.sctxt').text();
              const scDetails = sc.find('li');
              const title = cleanWhitespace(scHandle.replace(/[\d.:]/g, ''));
              const description = cleanWhitespace(scText.replace(scHandle, ''));

              return {
                id: sc.attr('id'),
                num: scHandle.match(/\d\.\d\.\d/g)[0],
                title,
                description,
                details: scDetails
                  .map(function getDetails() {
                    return cleanWhitespace($(this).text());
                  })
                  .get()
                  .reduce((result, detail, index) => {
                    const num = 1 + index;
                    const [title, description] = detail
                      .split(':')
                      .map((str) => str.trim());

                    result[num] = {
                      title: description ? title : null,
                      description: description ? description : detail
                    };

                    return result;
                  }, {})
              };
            })
            .get()
        };
      })
      .get()
  };
});
let wcag20_P = {};
let wcag20_G = {};
let wcag20_SC = {};
wcag_20.forEach((principle) => {
  const { num, title, description } = principle;
  wcag20_P[num] = { TITLE: title, DESCRIPTION: description };

  principle.guidelines.forEach((guideline) => {
    const { num, title, description } = guideline;
    wcag20_G[num] = { TITLE: title, DESCRIPTION: description };

    guideline.succescriteria.forEach((criterion) => {
      const { num, title, description, details } = criterion;
      wcag20_SC[num] = {
        TITLE: title,
        DESCRIPTION: description,
        DETAILS: details
      };
    });
  });
});
let WCAG20_TRANSLATED = {
  PRINCIPLE: wcag20_P,
  GUIDELINE: wcag20_G,
  SUCCESS_CRITERION: wcag20_SC
};
artoo.saveJson(WCAG20_TRANSLATED, 'WCAG20.json');

let WCAG_COMMON = {};
let WCAG_P = {};
let WCAG_G = {};
let WCAG_SC = {};
let WCAG2X = artoo.scrape('.principle', function getPrinciples($) {
  const principle = $(this);
  const guidelines = principle.find('.guideline');

  function getTitle(str) {
    const regexp = /(\d(\.\d*)+)(( +[a-zA-Z-–_,()]+)+)/;
    const matches = str.match(regexp);

    console.log(matches);

    return matches[3].trim() || '';
  }

  function cleanWhitespace(str) {
    return str.replace(/\s{2,}/g, ' ').trim();
  }

  return {
    num: principle.find('> h2 > .secno').text().replace(/\D/g, ''),
    title: getTitle(principle.find('> h2').text()),
    description: cleanWhitespace(principle.find('> p').text()),
    guidelines: guidelines
      .map(function getGuidelines() {
        const guideline = $(this);
        const succescriteria = guideline.find('.sc');

        return {
          num: guideline
            .find('> h3 > .secno')
            .text()
            .match(/\d\.\d/)[0],
          title: getTitle(guideline.find('> h3').text()),
          description: cleanWhitespace(guideline.find('> p').text()),
          succescriteria: succescriteria
            .map(function getCriteria(index) {
              const sc = $(this);
              const [level, description] = sc
                .find('> p')
                .map(function () {
                  return cleanWhitespace($(this).text());
                })
                .get();

              if (index === 0) {
                WCAG_COMMON.CONFORMANCE_LEVEL = level.match(
                  /(?<=\()\w+(?=\s)/g
                )[0];
              }

              const scDetails = sc
                .find('> dl, > ul')
                .map(function () {
                  const detail = $(this);
                  const nodeName = detail.prop('nodeName');

                  function getListItems($list) {
                    return $list
                      .find('> li')
                      .map(function () {
                        return {
                          description: cleanWhitespace($(this).text())
                        };
                      })
                      .get();
                  }

                  function getDefinitions($list) {
                    const terms = $list
                      .find('> dt')
                      .map(function () {
                        return cleanWhitespace($(this).text());
                      })
                      .get();

                    const definitions = $list
                      .find('> dd')
                      .map(function () {
                        return cleanWhitespace($(this).text());
                      })
                      .get();

                    return terms.map((term, index) => {
                      return {
                        title: term,
                        description: definitions[index]
                      };
                    });
                  }

                  switch (nodeName) {
                  case 'UL':
                    return getListItems(detail);

                  case 'DL':
                    return getDefinitions(detail);

                  default:
                    return {};
                  }
                })
                .get()
                .reduce((result, detail, index) => {
                  const num = 1 + index;
                  const { title, description } = detail;

                  result[num] = {
                    DESCRIPTION: description
                  };

                  if (title) {
                    result[num].TITLE = title;
                  }

                  return result;
                }, {});

              return {
                id: sc.attr('id'),
                num: sc
                  .find('.secno')
                  .text()
                  .match(/\d(\.\d){2}/g)[0],
                title: getTitle(sc.find('> h4').text()),
                description,
                details: scDetails
              };
            })
            .get()
        };
      })
      .get()
  };
});

WCAG2X.forEach((principle) => {
  const { num, title, description } = principle;
  WCAG_P[num] = { TITLE: title, DESCRIPTION: description };

  principle.guidelines.forEach((guideline) => {
    const { num, title, description } = guideline;
    WCAG_G[num] = { TITLE: title, DESCRIPTION: description };

    guideline.succescriteria.forEach((criterion) => {
      const { num, title, description, details } = criterion;
      WCAG_SC[num] = {
        TITLE: title,
        DESCRIPTION: description,
        DETAILS: details
      };
    });
  });
});

let WCAG2X_TRANSLATED = {
  COMMON: WCAG_COMMON,
  PRINCIPLE: WCAG_P,
  GUIDELINE: WCAG_G,
  SUCCESS_CRITERION: WCAG_SC
};
artoo.saveJson(WCAG2X_TRANSLATED, 'WCAG2X.json');

// SC DATA WCAG20
WCAG20_DATA = artoo.scrape('.sc', {
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
artoo.saveJson(WCAG20_DATA, 'WCAG20.json');

// NEW SC DATA
WCAG2X_DATA = artoo
  .scrape('.sc.new, .sc.changed', {
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
  })
  .reduce((result, sc) => {
    const { num, conformanceLevel } = sc;
    result[num] = {
      num,
      conformanceLevel
    };

    return result;
  }, {});
artoo.saveJson(WCAG2X_DATA, 'WCAG2X_DATA.json');

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
    num: function ($) {
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
