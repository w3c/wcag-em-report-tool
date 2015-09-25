'use strict';
/**
 *
 */
angular.module('wcagReporter')
.factory('wcag20spec', function(wcag20specEn) {
    var guidelines, criteria,
        criteriaObj = {};

    function pluck(prop) {
        return function (a, b) {
            if (!angular.isArray(a)) {
                a = a[prop];
            }
            return a.concat(b[prop]);
        };
    }

    // Concat all guidelines arrays of each principle
    guidelines = wcag20specEn.principles
    .reduce(pluck('guidelines'), []);

    // Concat all criteria arrays of each guideline
    criteria   = guidelines.reduce(pluck('successcriteria'), []);

    // Make an object of the criteria array with uri as keys
    criteria.forEach(function (criterion) {
        criterion.id = criterion.id.replace('WCAG2:', 'wcag20:');
        criteriaObj[criterion.id] = criterion;
    });

    return {
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
            return wcag20specEn.principles;
        }
    };
});
