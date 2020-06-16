'use strict';
angular.module('wcagReporter')
  .directive('fullReport', function (directivePlugin, $interval) {
    function testFilter (element) {
      return function (query) {
        return element.find(query).length === 0;
      };
    }

    return directivePlugin({
      restrict: 'E',
      replace: true,
      link: function (scope, element) {
        var tests = [
          '.panel-heading',
          '.sample_narrow',
          '.score-total'
        ];
        var stop = $interval(function () {
          tests = tests.filter(testFilter(element));
          if (tests.length === 0) {
            scope.$emit('reportReady', element);
            $interval.cancel(stop);
          }
        }, 200);
      },
      templateUrl: 'views/directives/fullReport.html'
    });
  });
