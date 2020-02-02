'use strict';
angular.module('wcagReporter')
  .directive(
    'earlAssert',
    function ($filter, directivePlugin, CriterionAssert, $rootScope) {
      function getOutcomes () {
        return [
          'earl:untested',
          'earl:passed',
          'earl:failed',
          'earl:inapplicable',
          'earl:cantTell'
        ]
          .map(function (rdfId) {
            return {
              id: rdfId,
              name: $filter('rdfToLabel')(rdfId)
            };
          });
      }

      return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          opt: '=options',
          assert: '='
        },
        link: function (scope) {
          scope.result = scope.assert.result;
          scope.outcomes = getOutcomes();
          scope.updateMetadata = function () {
            CriterionAssert.updateMetadata(scope.assert);
          };

          scope.getStaticHtmlResult = function (text) {
            text = ('' + text).trim() || '–';
            return '<p><strong>' + $filter('translate')('HTML_REPORT.LABEL_DESCR') + ':</strong> ' +
                        $filter('txtToHtml')(text)
                          .substr(3);
          };
          scope.htmlResult = scope.getStaticHtmlResult(scope.result.description);
        },
        templateUrl: 'views/directives/criterion/earlAssert.html'
      });
    }
  );
