'use strict';
angular.module('wcagReporter')
  .directive('pageResults', function (directivePlugin) {
    return directivePlugin({
      restrict: 'E',
      replace: true,
      scope: {
        criterion: '=value',
        asserts: '=',
        opt: '=options'
      },
      link: function (scope) {
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
