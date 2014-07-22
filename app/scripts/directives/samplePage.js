'use strict';
angular.module('wcagReporter')
	.directive('samplePage', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        scope: {
        	page: '='
        },
        templateUrl: 'views/audit/test/samplePage.drt.html'
    });
});