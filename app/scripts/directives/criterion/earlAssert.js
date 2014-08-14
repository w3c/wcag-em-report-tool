'use strict';
angular.module('wcagReporter')
.directive('earlAssert', function($filter, directivePlugin) {

	var outcomes = ['earl:untested', 'earl:passed',
                    'earl:failed', 'earl:inapplicable',
                    'earl:cantTell']
    .map(function (rdfId) {
        return {
            id: rdfId,
            name: $filter('rdfToLabel')(rdfId)
        };
    });       

    return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            // assert: '=',
            opt: '=options'
        },
        link: function (scope) {
            scope.outcomes = outcomes;
        },
        templateUrl: 'views/directives/criterion/earAssert.html'
    });
});