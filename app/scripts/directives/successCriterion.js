'use strict';

angular.module('wcagReporter')
.directive('successCriterion', function (directivePlugin, $rootScope) {
    var className = {
        'earl:untested': 'panel-default',
        'earl:passed': 'panel-success',
        'earl:failed': 'panel-danger',
        'earl:inapplicable': 'panel-info',
        'earl:cantTell': 'panel-warning'
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
            scope.critHide = scope.spec.number + '-cb';
            scope.getClassName = function (state) {
                return className[state];
            };
        },
        templateUrl: 'views/directives/successCriterion.html'
    });
});