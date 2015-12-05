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
            result: '=value',
            opt: '=options'
        },
        link: function (scope) {
            scope.outcomes = outcomes;

            scope.getStaticHtmlResult = function (text) {
                text = ('' + text).trim() || '–';
                return '<p><strong>' +  $filter('translate')('HTML_REPORT.LABEL_DESCR') + ':</strong> ' +
                        $filter('txtToHtml')(text).substr(3);
            };
            scope.htmlResult = scope.getStaticHtmlResult(scope.result.description);

        },
        templateUrl: 'views/directives/criterion/earlAssert.html'
    });
});