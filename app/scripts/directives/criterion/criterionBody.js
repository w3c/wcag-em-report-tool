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
            
            $scope.getSinglePageAsserts = function () {
                if ($scope.opt.editable) {
                    $scope.criterion.setCaseForEachPage();
                }
                $scope.getSinglePageAsserts = $scope.criterion.getSinglePageAsserts;
                return $scope.getSinglePageAsserts();
            };
            
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