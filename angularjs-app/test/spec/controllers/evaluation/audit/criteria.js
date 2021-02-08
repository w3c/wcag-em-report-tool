'use strict';

describe('Controller: AuditCriteriaCtrl', function () {
  // load the service's module
  setupwcagReporterTest();

  beforeEach(function (done) {
    inject(function ($rootScope) {
      $rootScope.$on('wcag2spec:load', done);
    });
  });

  var scope;
  var ctrl;
  var criteria;
  var criteriaLvlA;
  var criteriaLvlAA;
  var criteriaLvlAAA;

  beforeEach(inject(function ($controller, $rootScope, wcag2spec) {
    scope = $rootScope.$new();
    ctrl = $controller('AuditCriteriaCtrl', { $scope: scope });
    criteria = wcag2spec.getCriteria();

    criteriaLvlA = criteria.filter(function (crit) {
      return crit.level === 'wai:WCAG2A-Conformance';
    });

    criteriaLvlAA = criteria.filter(function (crit) {
      return crit.level === 'wai:WCAG2AA-Conformance';
    });

    criteriaLvlAAA = criteria.filter(function (crit) {
      return crit.level === 'wai:WCAG2AAA-Conformance';
    });
  }));

  it('should set default filters and apply to view', function () {
    expect(scope.critFilter.version)
      .withContext('WCAG 2.1')
      .toBe('WCAG21 WCAG20');

    expect(scope.critFilter.levels['wai:WCAG2A-Conformance'])
      .withContext('Level A')
      .toBe(true);

    criteriaLvlA
      .forEach(function (criterion) {
        expect(scope.isCriterionVisible(criterion))
          .withContext(criterion.id + ' should be visible')
          .toBe(true);
      });

    expect(scope.critFilter.levels['wai:WCAG2AA-Conformance'])
      .withContext('Level AA')
      .toBe(true);

    criteriaLvlAA
      .forEach(function (criterion) {
        expect(scope.isCriterionVisible(criterion))
          .withContext(criterion.id + ' should be visible')
          .toBe(true);
      });

    expect(scope.critFilter.levels['wai:WCAG2AAA-Conformance'])
      .withContext('Level AAA')
      .toBe(false);

    criteriaLvlAAA
      .forEach(function (criterion) {
        expect(scope.isCriterionVisible(criterion))
          .withContext(criterion.id + ' should NOT be visible')
          .toBe(false);
      });
  });

  it('should show all criteria with version 2.1 when all level filters are unchecked', function () {
    scope.critFilter.levels['wai:WCAG2A-Conformance'] = false;
    scope.critFilter.levels['wai:WCAG2AA-Conformance'] = false;
    scope.handleFilterChange();
    scope.$apply();

    criteria
      .forEach(function (criterion) {
        expect(scope.isCriterionVisible(criterion))
          .withContext(criterion.id)
          .toBe(true);
      });
  });

  it('should show all criteria with version 2.0 when all level filters are unchecked', function () {
    scope.critFilter.version = 'WCAG20';
    scope.critFilter.levels['wai:WCAG2A-Conformance'] = false;
    scope.critFilter.levels['wai:WCAG2AA-Conformance'] = false;

    // Trigger ng-change and apply to scope
    scope.handleFilterChange();
    scope.$apply();

    criteria
      .forEach(function (criterion) {
        if (criterion.versions[0] === 'WCAG20') {
          expect(scope.isCriterionVisible(criterion))
            .withContext(criterion.id + ' ' + criterion.versions[0])
            .toBe(true);
        } else {
          expect(scope.isCriterionVisible(criterion))
            .withContext(criterion.id + ' ' + criterion.versions[0])
            .toBe(false);
        }
      });
  });

  it('should show all criteria new in version 2.1 when all level filters are unchecked', function () {
    scope.critFilter.version = 'WCAG21';
    scope.critFilter.levels['wai:WCAG2A-Conformance'] = false;
    scope.critFilter.levels['wai:WCAG2AA-Conformance'] = false;
    scope.handleFilterChange();
    scope.$apply();

    criteria
      .forEach(function (criterion) {
        if (criterion.versions[0] === 'WCAG21') {
          expect(scope.isCriterionVisible(criterion))
            .withContext(criterion.id + ' ' + criterion.versions[0])
            .toBe(true);
        } else {
          expect(scope.isCriterionVisible(criterion))
            .withContext(criterion.id + ' ' + criterion.versions[0])
            .toBe(false);
        }
      });
  });

  it('finds assertions based on criteria IDs', function () {
    criteria.forEach(function (critSpec) {
      var assert = scope.getCritAssert(critSpec.id);
      expect(assert.test)
        .toBe(critSpec.id);
    });
  });
});
