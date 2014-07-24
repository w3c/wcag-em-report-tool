'use strict';

angular.module('wcagReporter').directive('testCase', function(directivePlugin, evalSampleModel) {
    return directivePlugin({
        restrict: 'E',
        replace: true,
        link: function (scope, elm, attr) {
            if (attr.urls) {
                scope.urls = true;
            }

        	scope.newPage = '';
        	scope.removeWhenEmpty = function (page, i) {
        		if (page.description === '') {
        			this.tcAssert.removePage(i);
        		}
        	};
        	scope.addNewPage = function () {
                var page = evalSampleModel.getPageByDescr(this.newPage);
                if (this.newPage === '') {
                    return;
                }
				this.tcAssert.addNewPage(page);
    			this.newPage = '';
        	};
        },
        templateUrl: 'views/audit/test/testCase.drt.html'
    });
});

