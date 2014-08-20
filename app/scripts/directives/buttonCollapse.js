'use strict';
angular.module('wcagReporter')
.directive('buttonCollapse', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
        	obj: '=target',
        	prop: '@property'
        },
        templateUrl: 'views/directives/buttonCollapse.html'
	});
});
