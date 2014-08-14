'use strict';
angular.module('wcagReporter')
	.directive('samplePage', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	page: '=',
        	opt: '=options'
        },
        templateUrl: 'views/audit/test/samplePage.drt.html'
    });
});