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
    var activeFilters = [];

    $scope.criteria = evalAuditModel.getCriteriaSorted();

    $scope.getCritAssert = evalAuditModel.getCritAssert;

    function buildPrinciples (target, origin) {
      var tgtPrinciple = origin[target.length];
      target.push(tgtPrinciple);

      if (target.length !== origin.length) {
        $timeout(function () {
          buildPrinciples(target, origin);
        }, 50);
      }
    }

    // Read from critFilter
    function getActiveFilters () {
      var filters = $scope.critFilter;
      var activatedFilters = [];

      for (var filter in filters) {
        // levels is an object with level key value boolean
        if (
          Object.prototype.hasOwnProperty.call($scope.critFilter, filter) &&
          typeof filters[filter] === 'object'
        ) {
          for (var filterOption in filters[filter]) {
            if (
              Object.prototype.hasOwnProperty.call(filters[filter], filterOption) &&
              filters[filter][filterOption] === true
            ) {
              activatedFilters.push(filterOption);
            }
          }
        }

        // version is a string; WCAG21, WCAG20 or WCAG20 WCAG21
        if (
          Object.prototype.hasOwnProperty.call($scope.critFilter, filter) &&
          typeof filters[filter] === 'string'
        ) {
          filters[filter].split(' ')
            .forEach(function (filterOption) {
              activatedFilters.push(filterOption);
            });
        }
      }

      return activatedFilters.slice();
    }

    function setActiveFilters () {
      activeFilters = getActiveFilters();
    }

    function filteredByLevel () {
      var levelFilter = $scope.critFilter.levels;

      for (var level in levelFilter) {
        if (
          Object.prototype.hasOwnProperty.call(levelFilter, level) &&
          levelFilter[level] === true
        ) {
          return true;
        }
      }

      return false;
    }

    function criterionMatchFilter (criterion) {
      var versionActive = criterion.versions
        ? (activeFilters.indexOf(criterion.versions[0]) !== -1)
        : true;
      var levelActive = (activeFilters.indexOf(criterion.level) !== -1);

      if (
        versionActive &&
        levelActive
      ) {
        return true;
      }

      // Version filtering is always on so if no level is filtered
      // show criteria based on version occurence alone
      if (
        versionActive &&
        !filteredByLevel()
      ) {
        return true;
      }

      return false;
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

    $scope.handleFilterChange = function handleFilterChange () {
      setActiveFilters();
    };

    if ($rootScope.rootHide.criteria) {
      $scope.critFilter = $rootScope.rootHide.criteria;
    } else {
      $scope.critFilter = {
        version: evalScopeModel.wcagVersion === 'WCAG21'
          ? 'WCAG21 WCAG20'
          : 'WCAG20',
        levels: {
          'wai:WCAG2A-Conformance': evalScopeModel.matchConformTarget('wai:WCAG2A-Conformance'),
          'wai:WCAG2AA-Conformance': evalScopeModel.matchConformTarget('wai:WCAG2AA-Conformance'),
          'wai:WCAG2AAA-Conformance': evalScopeModel.matchConformTarget('wai:WCAG2AAA-Conformance')
        }
      };

      $rootScope.rootHide.criteria = $scope.critFilter;
    }
    setActiveFilters();

    $scope.isCriterionVisible = function (critSpec) {
      // Check if the level of this criterion should be shown
      if (!criterionMatchFilter(critSpec)) {
        return false;
      }

      return true;
    };

    $scope.isGuidelineVisible = function (guideline) {
      return guideline.successcriteria.some(function (criterion) {
        return $scope.isCriterionVisible(criterion);
      });
    };

    $scope.isPrincipleVisible = function (principle) {
      return principle.guidelines.some(function (guideline) {
        return $scope.isGuidelineVisible(guideline);
      });
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
