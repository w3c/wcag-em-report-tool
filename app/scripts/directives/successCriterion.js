'use strict';

angular.module('wcagReporter').directive(
		'scAudit', function ($compile, directivePlugin) {
	var uniqueNum = 0;

    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	desc: '=description',
        	sampleListId: '@samplelistid',
        	assertion: '='
        },

        link: function (scope) {
        	scope.addResult = function (assertion) {
        		assertion.addTestCaseAssertion();
        	};
        	scope.getUnique = function () {
    			return uniqueNum += 1;
        	};
        },
        templateUrl: 'views/scAudit.drt.html'
    });

}).directive('scResult', function(directivePlugin) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        link: function (scope) {
        	scope.newPage = '';
        	scope.removeWhenEmpty = function (page, i) {
        		if (page.url === '') {
        			this.tcAssert.removePage(i);
        		}
        	};
        	scope.addNewPage = function () {
    			if (this.newPage === '') {
    				return;
    			}
				this.tcAssert.addNewPage(this.newPage);
    			this.newPage = '';
        	};
        },
        templateUrl: 'views/scResult.drt.html'
    });
});

