'use strict';

angular.module('wcagReporter').directive(
		'successCriterion', function (directivePlugin, $filter) {
	var uniqueNum = 0,
        outcomes = ['earl:untested', 'earl:passed',
                    'earl:failed', 'earl:cantTell',
                    'earl:inapplicable']
        .map(function (rdfId) {
            return {
                id: rdfId,
                name: $filter('rdfToLabel')(rdfId)
            };
        });       


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
        },
        templateUrl: 'views/audit/test/successCriterion.drt.html'
    });
});