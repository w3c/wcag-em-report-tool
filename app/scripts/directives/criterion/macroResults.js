'use strict';
angular.module('wcagReporter')
.directive('macroResults', function(directivePlugin) {

	return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
            criterion: '=value',
            opt: '=options'
        },

        controller: ['$scope', function ($scope) {
            $scope.$on('macroPageUpdated', function () {
                console.log('on');
                $scope.multiPageAsserts = $scope.criterion.getMultiPageAsserts();
            });
        }],

        link: function (scope) {
        	scope.multiPageAsserts = scope.criterion.getMultiPageAsserts();

            scope.removeAssert = function (assert) {
                var index = scope.criterion.hasPart.indexOf(assert);
                if (index >= 0) {
                    scope.criterion.hasPart.splice(index, 1);
                }
            };
            
        },
        templateUrl: 'views/directives/criterion/macroResults.html'
	});
});