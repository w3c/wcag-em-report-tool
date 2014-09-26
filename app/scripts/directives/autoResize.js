'use strict';
angular.module('wcagReporter')
.directive('autoResize', function(directivePlugin) {
    return directivePlugin({
        restrict: 'A',
        link: function (scope, element) {
            angular.element(element).textareaAutoSize();
        }
	});
});
