'use strict';
angular.module('wcagReporter')
.directive('criterionBody', function($filter, directivePlugin) {

    return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            criterion: '=assert',
            opt: '=options'
        },
        controller: function ($scope) {
            $scope.getMultiPageAsserts = $scope.criterion.getMultiPageAsserts;
            $scope.getSinglePageAsserts = $scope.criterion.getSinglePageAsserts;
            $scope.addMultiPage = function () {
                $scope.criterion.addTestCaseAssertion({ multiPage : true });
            };
        },
        link: function (scope) {
            scope.hasMultipage = false;
        },
        templateUrl: 'views/directives/criterion/criterionBody.html'
    });
});