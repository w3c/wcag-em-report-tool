'use strict';

angular.module('wcagReporter')
.directive('successCriterion', function (directivePlugin, $rootScope) {
    var className = {
        'earl:untested': 'untested',
        'earl:passed': 'passed',
        'earl:failed': 'failed',
        'earl:inapplicable': 'inapplicable',
        'earl:cantTell': 'canttell'
    };

    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
            assert: '=assertion',
            spec: '=requirement',
            opt: '=options'
        },
        link: function (scope) {
            // scope.outcomes = outcomes;
            scope.rootHide = $rootScope.rootHide;
            scope.critHide = scope.spec.id + '-cb';
            scope.getClassName = function (state) {
                return className[state];
            };
        },
        templateUrl: 'views/directives/successCriterion.html'
    });
});