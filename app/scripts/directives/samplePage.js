'use strict';

angular.module('wcagReporter')
	.directive('samplePage', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        scope: {
        	page: '='
        },
        template: 'asdf {{page.description}} {{page.handle}}'
    });
});