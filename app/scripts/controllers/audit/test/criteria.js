'use strict';

angular.module('wcagReporter')
.controller('TestPrinciplesCtrl', function ($scope, evalTestModel, wcag20spec,
$rootElement, $anchorScroll, $filter, $rootScope) {

    evalTestModel.updateToConformance();

    $scope.criteria = evalTestModel.getCriteriaSorted();
    $scope.principles = wcag20spec.getPrinciples();
    $scope.getCritAssert = evalTestModel.getCritAssert;


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
	    		$scope.critFilter.level[key] = true;
			// EARL stuff is about outcomes
	    	} else if (key.substr(0, 5) === 'earl:') {
	    		$scope.critFilter.outcome[key] = true;
	    	}
	    });
    	$rootScope.rootHide.criteria = $scope.critFilter;
    }


    $scope.isCriterionVisible = function (critSpec) {
		var critAssert;
		// Check if the level of this criterion should be shown
    	if ($scope.critFilter.level[critSpec.level] !== true) {
    		return false;
    	}
		// Check if the assert has an outcome, if no, don't show the criterion
		critAssert = evalTestModel.getCritAssert(critSpec.uri);
		if (typeof critAssert !== 'object' ||
		typeof critAssert.result !== 'object') {
			return false;
		}
		// Check if the outcome is set to hidden
    	return ($scope.critFilter.outcome[critAssert.result.outcome] === true);
    };

    $scope.isGuidelineVisible = function (guideline) {
    	var visible = false;
    	guideline.criteria.forEach(function (critSpec) {
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
    
    $scope.toTop = function () {
        $rootElement.focus();
        $anchorScroll();
    };
});