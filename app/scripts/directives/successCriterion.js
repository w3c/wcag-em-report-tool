'use strict';

angular.module('wcagReporter').directive(
		'scAudit', function ($compile, directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	desc: '=description',
        	sampleListId: '@samplelistid'
        },
        link: function (scope, elm) {
        	console.log(scope.sampleListId);
        	scope.addResult = function () {
        		elm.append($compile('<sc-result></sc-result>')(scope));
        	};
        },
        templateUrl: 'views/scAudit.drt.html'
    });

}).directive('scResult', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        link: function () {
        	
        },
        templateUrl: 'views/scResult.drt.html'
    });
});

