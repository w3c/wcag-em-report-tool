'use strict';
angular.module('wcagReporter')
.directive('inputPages', function(directivePlugin) {

    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
            pages: '=',
            addPage: '&',
            removePage: '&'
        },
        link: function (scope) {
            scope.addPage = scope.addPage();
            scope.removePage = scope.removePage();
        },
        templateUrl: 'views/audit/inputPages.drt.html'
    });
});
