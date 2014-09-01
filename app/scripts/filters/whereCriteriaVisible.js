'use strict'; 

angular.module('wcagReporter') 
.filter('whereCriteriaVisible', function() {

    function testPrinciple(principles, test) {
        return principles.reduce(function (val, principle) {
            return val || testGuideline(principle.guidelines, test);
        });
    }

    function testGuideline(guidelines, test) {
        return guidelines.reduce(function (val, guideline) {
            return val || testCriteria(guideline.criteria, test);
        });
    }

    function testCriteria(criteria, test) {
        return criteria.reduce(function (val, criterion) {
            return val || test(criterion.uri);
        });
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