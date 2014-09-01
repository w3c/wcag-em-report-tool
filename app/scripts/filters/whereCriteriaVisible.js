'use strict'; 

/**
 * For an array of principles or guidelines, remove those where from which the
 * test functions returns a falsy value
 */
angular.module('wcagReporter')
.filter('whereCriteriaVisible', function() {

    // Filter the principle based on if it has criteria the test passes
    function testPrinciple(principles, test) {
        return principles.filter(function (p) {
            return testGuideline(p.guidelines, test).length !== 0;
        });
    }

    // Filter the guideline based on if it has criteria the test passes
    function testGuideline(guidelines, test) {
        return guidelines.filter(function (g) {
            var res = testCriteria(g.criteria, test);
            return res;
        });
    }

    // For any list of criteria, check if the test says any passes
    function testCriteria(criteria, test) {
        return criteria.reduce(function (val, c) {
            return val || (!!test(c.uri));
        }, false);
    }

    return function(arr, test) {
        if (!angular.isArray(arr) || arr.length === 0) {
            return arr;

        } else if (angular.isDefined(arr[0].guidelines)) {
            return testPrinciple(arr, test);

        } else if (angular.isDefined(arr[0].criteria)) {
            return testGuideline(arr, test);
        }

    };

});