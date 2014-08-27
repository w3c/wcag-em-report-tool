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
                var html;
                text = (typeof text === 'string' ? text.trim() : '');

                html = (text !== '' ? $filter('txtToHtml')(text) :
                '<p><em>' + $filter('translate')('NO_TEXT_PROVIDED') + '</em></p>');

                html = '<p><strong>' +  $filter('translate')('LABEL_DESCR') + ':</strong> ' +
                        html.substr(3);
                return html;
            };
            scope.htmlResult = scope.getStaticHtmlResult(scope.result.description);

        },
        templateUrl: 'views/directives/criterion/earlAssert.html'
    });
});