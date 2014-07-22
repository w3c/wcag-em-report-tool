'use strict';
angular.module('wcagReporter')
	.directive('samplePage', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        scope: {
        	page: '='
        },
        templateUrl: 'views/samplePage.drt.html'
    });
});