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

        link: function (scope) {
            scope.getMultiPageAsserts = scope.criterion.getMultiPageAsserts;
            scope.hasMultipage = false;

            scope.addMultiPage = function () {
                scope.criterion.addTestCaseAssertion({
                    multiPage : true,
                    subject: evalSampleModel.getSelectedPages()
                });
            };
            
        },
        templateUrl: 'views/directives/criterion/criterionBody.html'
    });
});