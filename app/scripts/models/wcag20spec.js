'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter')
.factory('wcag20spec', function(wcag20spec_en) {
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
    guidelines = wcag20spec_en.principles
    .reduce(pluck('guidelines'), []);

    // Concat all criteria arrays of each guideline
    criteria   = guidelines.reduce(pluck('successcriteria'), []);

    // Make an object of the criteria array with uri as keys
    criteria.forEach(function (criterion) {
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
            return wcag20spec_en.principles;
        }
    };
});
