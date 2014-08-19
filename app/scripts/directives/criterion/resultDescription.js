'use strict';
angular.module('wcagReporter')
.directive('resultDescription', function(directivePlugin) {

	return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
            value: '=',
            id: '@'
        },
        templateUrl: 'views/directives/criterion/resultDescription.html'
	});
});