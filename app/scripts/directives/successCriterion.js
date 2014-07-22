'use strict';

angular.module('wcagReporter').directive(
		'successCriterion', function (directivePlugin) {
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
        	assertion: '=',
            showallpages: '='
        },

        link: function (scope, elm, attr) {
            scope.outcomes = outcomes;
        	scope.getUnique = function () {
    			return uniqueNum += 1;
        	};

            scope.getCases = function () {
                return scope.assertion.hasPart;
            };

            scope.flipCollapse = function () {
                if (typeof attr.showallpages !== 'undefined') {
                    if (!this.hasAllPages) {
                        this.assertion.setCaseForEachPage();
                        this.hasAllPages = true;
                    }
                }
                this.isVisible = !this.isVisible;
            };
        },
        templateUrl: 'views/audit/test/successCriterion.drt.html'
    });
})