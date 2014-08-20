'use strict';
angular.module('wcagReporter')
.directive('pageResults', function(directivePlugin) {

	return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
            criterion: '=value',
            opt: '=options'
        },
        link: function (scope) {
            scope.getSinglePageAsserts = function () {
                if (scope.opt.editable) {
                    scope.criterion.setCaseForEachPage();
                }
                scope.getSinglePageAsserts = scope.criterion.getSinglePageAsserts;
                return scope.getSinglePageAsserts();
            };
        },
        templateUrl: 'views/directives/criterion/pageResults.html'
	});
});