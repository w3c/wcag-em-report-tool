'use strict';

angular.module('wcagReporter')
  .controller('AuditCriteriaCtrl', function (
    $scope,
    evalAuditModel,
    evalScopeModel,
    wcag2spec,
    $rootElement,
    $anchorScroll,
    $filter,
    $rootScope,
    $timeout
  ) {
    var principlesOrigin = [];

    $scope.criteria = evalAuditModel.getCriteriaSorted();

    $scope.getCritAssert = evalAuditModel.getCritAssert;

    function buildPrinciples (target, origin) {
      var tgtPrinciple = origin[target.length];
      target.push(tgtPrinciple);

      // tgtPrinciple.guidelines.forEach(function (g) {
      //     g.hideCriteria = true;
      // });

      if (target.length !== origin.length) {
        $timeout(function () {
          buildPrinciples(target, origin);
        }, 50);
      }
    }

    $scope.principles = [];

    if (wcag2spec.isLoaded()) {
      principlesOrigin = wcag2spec.getPrinciples();
      buildPrinciples($scope.principles, principlesOrigin);
    }

    $scope.$on('wcag2spec:langChange', function () {
      principlesOrigin = wcag2spec.getPrinciples();
      $scope.principles = [];
      buildPrinciples($scope.principles, principlesOrigin);
    });

    if ($rootScope.rootHide.criteria) {
    	$scope.critFilter = $rootScope.rootHide.criteria;
    } else {
    	$scope.critFilter = {
        'wai:WCAG2A-Conformance': evalScopeModel.matchConformTarget('wai:WCAG2A-Conformance'),
        'wai:WCAG2AA-Conformance': evalScopeModel.matchConformTarget('wai:WCAG2AA-Conformance'),
        'wai:WCAG2AAA-Conformance': evalScopeModel.matchConformTarget('wai:WCAG2AAA-Conformance')
      };
    	$rootScope.rootHide.criteria = $scope.critFilter;
    }

    $scope.isCriterionVisible = function (critSpec) {
      // Check if the level of this criterion should be shown
    	if ($scope.critFilter[critSpec.level] !== true) {
    		return false;
    	}

      // Check if the assert has an outcome, if no, don't show the criterion
      var critAssert = evalAuditModel.getCritAssert(critSpec.id);
      if (typeof critAssert !== 'object' ||
        typeof critAssert.result !== 'object') {
        return false;
      }

      // Check if the outcome is set to hidden
    	return true;
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

    var untested = [
      'earl:untested',
      'earl:cantTell'
    ];
    $scope.criteriaUntested = function (guideline) {
      var count = 0;
      guideline.successcriteria.forEach(function (critSpec) {
        var critAssert = evalAuditModel.getCritAssert(critSpec.id);
        if (untested.indexOf(critAssert.result.outcome) !== -1) {
          count += 1;
        }
      });
      return count;
    };

    // Scroll to the top, then move focus to the h1
    $scope.toTop = function () {
      $('html, body')
        .animate({
          scrollTop: $rootElement.offset().top
        }, 200, $rootElement.focusH1);
    };
  });
