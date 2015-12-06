'use strict';

describe('Controller: AuditCriteriaCtrl', function () {

    // load the service's module
    beforeEach(setupwcagReporterTest());

    var scope;
    var ctrl;
    var criteria;
    var criteriaLvlA;
    var criteriaLvlAA;
    var criteriaLvlAAA;

    beforeEach(inject(function($controller, $rootScope, wcag20spec) {
        scope = $rootScope.$new();
        ctrl  = $controller('AuditCriteriaCtrl', { $scope: scope });
        criteria = wcag20spec.getCriteria();

        criteriaLvlA    = criteria.filter(function (crit) {
            return crit.level === 'wcag20:level_a';
        });

        criteriaLvlAA   = criteria.filter(function (crit) {
            return crit.level === 'wcag20:level_aa';
        });

        criteriaLvlAAA = criteria.filter(function (crit) {
            return crit.level === 'wcag20:level_aaa';
        });

    }));

    xit('knows what criteria to show based on critFilter', function () {
        expect(criteriaLvlA.length).not.toBe(0);
        expect(criteriaLvlAA.length).not.toBe(0);
        expect(criteriaLvlAAA.length).not.toBe(0);

        scope.critFilter.level['wcag20:level_a'] = true;
        scope.critFilter.level['wcag20:level_aa'] = true;
        scope.critFilter.level['wcag20:level_aaa'] = true;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        scope.critFilter.level['wcag20:level_a'] = false;
        scope.critFilter.level['wcag20:level_aa'] = true;
        scope.critFilter.level['wcag20:level_aaa'] = true;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        scope.critFilter.level['wcag20:level_a'] = false;
        scope.critFilter.level['wcag20:level_aa'] = false;
        scope.critFilter.level['wcag20:level_aaa'] = true;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        scope.critFilter.level['wcag20:level_a'] = false;
        scope.critFilter.level['wcag20:level_aa'] = false;
        scope.critFilter.level['wcag20:level_aaa'] = false;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });
    });


    xit('finds assertions based on criteria IDs', function () {
        criteria.forEach(function (critSpec) {
            var assert = scope.getCritAssert(critSpec.id);
            expect(assert.testRequirement).toBe(critSpec.id);
        });
    });

});
