'use strict';
angular.module('wcagReporter')
.directive('resultDescription', function(directivePlugin) {

	return directivePlugin({
        restrict: 'E',
        scope: {
            value: '=',
            id: '@'
        },
        templateUrl: 'views/audit/test/resultDescription.drt.html'
	});
});