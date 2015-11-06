'use strict';
/**
 *
 */
angular.module('wcagReporter')
.factory('wcag20spec', function() {
    var guidelines;
    var criteria;
    var currentSpec;
    var criteriaObj = {};
    var specs = {};

    function pluck(prop) {
        return function (a, b) {
            if (!angular.isArray(a)) {
                a = a[prop];
            }
            return a.concat(b[prop]);
        };
    }

    var wcag2 = {
        addSpec: function (lang, spec) {
            specs[lang] = spec;
            if (!currentSpec) {
                wcag2.useLanguage(lang);
            }
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
                if (['A', 'AA', 'AAA'].indexOf(criterion.level) !== -1) {
                    var level = 'wcag20:level_' + criterion.level;
                    criterion.id = criterion.id.replace('WCAG2:', 'wcag20:');
                    criterion.level = level.toLowerCase();
                    criteriaObj[criterion.id] = criterion;
                }
            });
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
        }
    };



    return wcag2;
});
