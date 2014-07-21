'use strict';

angular.module('wcagReporter').directive(
		'scAudit', function (directivePlugin) {
	var uniqueNum = 0,
        outcomes = [
            {id: 'earl:untested', name: 'Untested'},
            {id: 'earl:pass', name: 'Pass'},
            {id: 'earl:fail', name: 'Fail'},
            {id: 'earl:cantTell', name: 'Can\'t tell'},
            {id: 'earl:inapplicable', name: 'inapplicable'},
        ];

    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	desc: '=description',
        	sampleListId: '@samplelistid',
        	assertion: '='
        },

        link: function (scope) {
            scope.outcomes = outcomes;
        	scope.addDetails = function (assertion) {
        		assertion.addTestCaseAssertion();
                scope.isVisible = true;
        	};
        	scope.getUnique = function () {
    			return uniqueNum += 1;
        	};
        },
        templateUrl: 'views/scAudit.drt.html'
    });

}).directive('scResult', function(directivePlugin, evalSampleModel) {
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
        templateUrl: 'views/scResult.drt.html'
    });
});

