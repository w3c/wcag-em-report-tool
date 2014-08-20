'use strict';
angular.module('wcagReporter')
.directive('criterionBody', function(directivePlugin) {

    return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            criterion: '=assert',
            opt: '=options'
        },
        controller: ['$scope', function ($scope) {
            $scope.getMultiPageAsserts = function () {
                return $scope.criterion.getMultiPageAsserts().reverse();
            };
            
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

            $scope.removeAssert = function (assert) {
                var index = $scope.criterion.hasPart.indexOf(assert);
                if (index >= 0) {
                    $scope.criterion.hasPart.splice(index, 1);
                }
            };
        }],
        link: function (scope) {
            scope.hasMultipage = false;
        },
        templateUrl: 'views/directives/criterion/criterionBody.html'
    });
});