'use strict';

angular.module('wcagReporter')
.controller('AuditCriteriaCtrl', function ($scope, evalAuditModel, evalScopeModel,
wcag20spec, $rootElement, $anchorScroll, $filter, $rootScope) {

    evalAuditModel.updateToConformance();

    $scope.criteria = evalAuditModel.getCriteriaSorted();
    $scope.principles = wcag20spec.getPrinciples();
    $scope.getCritAssert = evalAuditModel.getCritAssert;


    if ($rootScope.rootHide.criteria) {
    	$scope.critFilter = $rootScope.rootHide.criteria;

    } else {
    	$scope.critFilter = {
	    	level: {},
	    	outcome: {}
		};
	    // Create filters based known RDF values
	    Object.keys($filter('rdfToLabel').keymap)
	    .forEach(function (key) {
	    	// WCAG 2 stuff is all about levels
	    	if (key.substr(0, 7) === 'wcag20:') {
	    		$scope.critFilter.level[key] = evalScopeModel.matchConformTarget(key);

			// EARL stuff is about outcomes
	    	} else if (key.substr(0, 5) === 'earl:') {
	    		$scope.critFilter.outcome[key] = true;
	    	}
	    });
    	$rootScope.rootHide.criteria = $scope.critFilter;
    }

    var levelMap = {
        'A': 'wcag20:level_a',
        'AA': 'wcag20:level_aa',
        'AAA': 'wcag20:level_aaa'
    };

    $scope.isCriterionVisible = function (critSpec) {
		var critAssert;
        var critLevel = levelMap[critSpec.level];
		// Check if the level of this criterion should be shown
    	if ($scope.critFilter.level[critLevel] !== true) {
    		return false;
    	}
		// Check if the assert has an outcome, if no, don't show the criterion
		critAssert = evalAuditModel.getCritAssert(critSpec.uri);
		if (typeof critAssert !== 'object' ||
		typeof critAssert.result !== 'object') {
			return false;
		}
		// Check if the outcome is set to hidden
    	return ($scope.critFilter.outcome[critAssert.result.outcome] === true);
    };

    $scope.isGuidelineVisible = function (guideline) {
    	var visible = false;
    	guideline.successcriteria.forEach(function (critSpec) {
    		// Only check the criterion if a previous check hasn't already returned true
    		if (visible || $scope.isCriterionVisible(critSpec)) {
    			visible = true;
    		}
    	});
    	return visible;
    };

    $scope.isPrincipleVisible = function (principle) {
    	var visible = false;
    	principle.guidelines.forEach(function (guideline) {
    		// Only check the criterion if a previous check hasn't already returned true
    		if (visible || $scope.isGuidelineVisible(guideline)) {
    			visible = true;
    		}
    	});
    	return visible;
    };

    // Scroll to the top, then move focus to the h1
    $scope.toTop = function () {
        $('html, body').animate({
            scrollTop: $rootElement.offset().top
        }, 200, $rootElement.focusH1);
    };
});