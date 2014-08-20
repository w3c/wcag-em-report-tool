'use strict';
angular.module('wcagReporter')
.directive('pageResults', function(directivePlugin, selectedCasesOnlyFilter) {
    
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
                scope.getSinglePageAsserts = function () {
                    if (scope.opt.editable) {
                        return selectedCasesOnlyFilter(scope.criterion.getSinglePageAsserts());
                    } else {
                        return  scope.criterion.getSinglePageAsserts().filter(function (assert) {
                            return assert.isDefined();
                        });
                    }
                };
                return scope.getSinglePageAsserts();
            };

            scope.createMacro = function (assert) {
                scope.criterion.addTestCaseAssertion({
                    result: {
                        description: assert.result.description,
                        outcome: assert.result.outcome
                    },
                    multiPage: true
                });
            };
        },
        templateUrl: 'views/directives/criterion/pageResults.html'
	});
});