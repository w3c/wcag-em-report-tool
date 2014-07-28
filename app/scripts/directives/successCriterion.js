'use strict';

angular.module('wcagReporter').directive(
		'successCriterion', function (directivePlugin) {
	var uniqueNum = 0,
        outcomes = [
            {id: 'earl:untested', name: 'Untested'},
            {id: 'earl:passed', name: 'Passed'},
            {id: 'earl:failed', name: 'Failed'},
            {id: 'earl:cantTell', name: 'Cannot tell'},
            {id: 'earl:inapplicable', name: 'Inapplicable'},
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
            editable: '@',
            opt: '=options'
        },

        link: function (scope, elm, attr) {
            scope.desc = scope.assert.getSpec();
            scope.outcomes = outcomes;
        	scope.getUnique = function () {
    			return uniqueNum += 1;
        	};

            scope.getCases = function () {
                if (!scope.opt.editable) {
                    return scope.assert.hasPart
                    .filter(function (assert) {
                        return assert.result.outcome !== 'earl:untested' ||
                               assert.result.description.trim() !== '';
                   });
                }
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