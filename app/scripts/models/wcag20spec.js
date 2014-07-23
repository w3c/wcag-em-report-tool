'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter')
.factory('wcag20spec', function(wcag20specData) {
    var guidelines, criteria,
        criteriaObj = {};
    
    function concatProps(prop) {
        return function (a, b) {
            if (!angular.isArray(a)) {
                a = a[prop];
            }
            return a.concat(b[prop]);
        };
    }

    // Concat all guidelines arrays of each principle
    guidelines = wcag20specData.reduce(concatProps('guidelines'));
    
    // Concat all criteria arrays of each guideline
    criteria   = guidelines.reduce(concatProps('criteria'));

    // Make an object of the criteria array with uri as keys
    criteria.forEach(function (criterion) {
        criteriaObj[criterion.uri] = criterion;
    });

    return {
        getGuidelines: function () {
            return guidelines;
        },
        getCriteria: function () {
            return criteria;
        },
        getCriterion: function (uri) {
            return criteriaObj[uri];
        },
        getPrinciples: function () {
            return wcag20specData;
        }
    };
});
