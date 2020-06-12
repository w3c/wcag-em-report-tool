'use strict';
angular.module('wcagReporter')
  .directive('macroResults', function (directivePlugin) {
    return directivePlugin({
      restrict: 'E',
      replace: true,
      scope: {
        criterion: '=value',
        asserts: '=',
        opt: '=options'
      },

      link: function (scope) {
        scope.removeAssert = function (assert) {
          var index = scope.criterion.hasPart.indexOf(assert);
          if (index >= 0) {
            scope.criterion.hasPart.splice(index, 1);
          }
          index = scope.asserts.indexOf(assert);
          if (index >= 0) {
            scope.asserts.splice(index, 1);
          }
        };

        scope.transferMacroData = function (macroAssert) {
          // Get all single page asserts where a tag is part of this macro assert
          scope.criterion.transferMacroData(macroAssert);
          scope.removeAssert(macroAssert);
        };

        scope.getAllTitles = function (assert) {
          return assert.subject.map(function (page) {
            return page.displayTitle();
          })
            .join(', ');
        };
      },
      templateUrl: 'views/directives/criterion/macroResults.html'
    });
  });
