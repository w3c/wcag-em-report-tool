'use strict';
angular.module('wcagReporter')
.directive('pageSelect', function($filter, directivePlugin) {

    return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            pages: '=',
            // opt: '=options'
        },
        controller: function () {
        },
        link: function () {
        },
        templateUrl: 'views/directives/criterion/pageSelect.html'
    });
});