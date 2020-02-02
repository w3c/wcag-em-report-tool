'use strict';

/**
 *
 */
angular.module('wcagReporter')
  .provider('wcag2spec', function () {
    var specPath;
    var guidelines;
    var criteria;
    var currentSpec;
    var broadcast = angular.noop;
    var criteriaObj = {};
    var specs = {};

    function pluck (prop) {
      return function (a, b) {
        if (!angular.isArray(a)) {
          a = a[prop];
        }
        return a.concat(b[prop]);
      };
    }

    var wcag2 = {
      addSpec: function (lang, spec) {
        lang = lang.toLowerCase();
        specs[lang] = spec;
        if (!currentSpec) {
          wcag2.useLanguage(lang);
        }
      },

      loadLanguage: function (lang) {
        lang = lang.toLowerCase();
        if (typeof specPath !== 'string') {
          throw new Error('specPath must be defined first');
        }
        if (specs[lang]) {
          return wcag2.useLanguage(lang);
        }

        var path = specPath.replace('${lang}', lang.toLowerCase());
        $.getJSON(path)
          .done(function (data) {
            specs[lang] = data;
            wcag2.useLanguage(lang);
            broadcast('wcag2spec:load', lang);
          })
          .fail(console.error.bind(console));
      },

      useLanguage: function (lang) {
        lang = lang.toLowerCase();
        if (!specs[lang]) {
          throw new Error('Spec for lang ' + lang + ' not defined.');
        }
        currentSpec = specs[lang];
        // Concat all guidelines arrays of each principle
        guidelines = currentSpec.principles
          .reduce(pluck('guidelines'), []);

        // Concat all criteria arrays of each guideline
        criteria = guidelines.reduce(pluck('successcriteria'), []);

        // Make an object of the criteria array with uri as keys
        criteria.forEach(function (criterion) {
          var levels = [
            'A',
            'AA',
            'AAA'
          ];

          if (levels.indexOf(criterion.level) !== -1) {
            criterion.level = 'wai:WCAG2' + criterion.level + '-Conformance';
            criteriaObj[criterion.id] = criterion;
          }

          // Versions are 2.0 or 2.1 but need to be json-ld wich is WCAG20 and WCAG21
          if (Object.prototype.hasOwnProperty.call(criterion, 'versions')) {
            criterion.versions = criterion.versions
              .map(function (version) {
                return 'WCAG' + version.replace('.', '');
              });
          }
        });

        broadcast('wcag2spec:langChange', lang);
      },

      getGuidelines: function () {
        return guidelines;
      },
      getCriteria: function () {
        return criteria;
      },
      getCriterion: function (id) {
        return criteriaObj[id];
      },
      getPrinciples: function () {
        return currentSpec.principles;
      },
      isLoaded: function () {
        return (typeof currentSpec !== 'undefined');
      },
      onLangChange: angular.noop
    };

    this.setSpecPath = function (path) {
      specPath = path;
    };

    this.loadLanguage = wcag2.loadLanguage;

    this.$get = [
      '$rootScope',
      function ($rootScope) {
        broadcast = function (a, b, c) {
          $rootScope.$broadcast(a, b, c);
        };

        wcag2.onLangChange = function (cb) {
          $rootScope.$on('wcag2spec:langChange', cb);
        };

        return angular.extend({}, wcag2);
      }
    ];
  });
