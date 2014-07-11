'use strict';

angular.module('wcagReporter').directive(
		'scAudit', function ($compile, directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	desc: '=description',
        	sampleListId: '@samplelistid',
        	assertion: '='
        },
        link: function (scope, elm) {
        	scope.addResult = function (assertion) {
        		assertion.addTestCaseAssertion();
        	};
        },
        templateUrl: 'views/scAudit.drt.html'
    });

}).directive('scResult', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        link: function (scope) {
        	scope.updateUrlList = function () {

        	};
        },
        templateUrl: 'views/scResult.drt.html'
    });
});

