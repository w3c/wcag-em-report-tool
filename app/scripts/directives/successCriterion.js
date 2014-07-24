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
        ],
        levels = {
            'wcag20:level_a': 'Level A',
            'wcag20:level_aa': 'Level AA',
            'wcag20:level_aaa': 'Level AAA'
        };

    return directivePlugin({
        restrict: 'E',
        replace: true,
        scope: {
        	assert: '=',
            showallpages: '=',
            editable: '@'
        },

        link: function (scope, elm, attr) {
            if (attr.editable === 'false') {
                scope.editable = false;
            } else if (typeof attr.editable !== 'undefined') {
                scope.editable = !!attr.editable;
            } else {
                scope.editable = false;
            }

            scope.desc = scope.assert.getSpec();
            scope.outcomes = outcomes;
        	scope.getUnique = function () {
    			return uniqueNum += 1;
        	};

            scope.getCases = function () {
                return scope.assert.hasPart;
            };

            scope.flipCollapse = function () {
                if (typeof attr.showallpages !== 'undefined') {
                    if (!this.hasAllPages) {
                        this.assert.setCaseForEachPage();
                        this.hasAllPages = true;
                    }
                }
                this.isVisible = !this.isVisible;
            };

            scope.getLevel = function (earlLevel) {
                return levels[earlLevel];
            };
        },
        templateUrl: 'views/audit/test/successCriterion.drt.html'
    });
});