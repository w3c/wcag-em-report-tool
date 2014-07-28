'use strict';
angular.module('wcagReporter')
.directive('resultDescription', function(directivePlugin) {

	return directivePlugin({
        restrict: 'E',
        scope: {
            value: '=',
            id: '@'
        },
    	template: '<textarea ng-model="value" class="expanding"' +
    			  'cols="20" rows="4" id="id"></textarea>'
	});
});