'use strict';
angular.module('wcagReporter')
.directive('criterionBody', function(directivePlugin, evalSampleModel) {

    return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            criterion: '=assert',
            opt: '=options'
        },
        controller: ['$scope', function ($scope) {
            $scope.addMultiPage = function () {
                $scope.criterion.addTestCaseAssertion({
                    multiPage : true,
                    subject: evalSampleModel.getSelectedPages()
                });

                console.log('broadcast');
                $scope.$broadcast('macroPageUpdated', []);
                $scope.$emit('macroPageUpdated', []);
            };
        }],

        link: function (scope) {
            scope.getMultiPageAsserts = scope.criterion.getMultiPageAsserts;
            scope.hasMultipage = false;
        },
        templateUrl: 'views/directives/criterion/criterionBody.html'
    });
});