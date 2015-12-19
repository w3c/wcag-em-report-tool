'use strict';

describe('Controller: AuditCriteriaCtrl', function () {

    // load the service's module
    setupwcagReporterTest();

    beforeEach(function (done) {
       inject(function ($rootScope) {
           $rootScope.$on('wcag20spec:load', done);
        });
    });

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
            return crit.level === 'wai:WCAG2A-Conformance';
        });

        criteriaLvlAA   = criteria.filter(function (crit) {
            return crit.level === 'wai:WCAG2AA-Conformance';
        });

        criteriaLvlAAA = criteria.filter(function (crit) {
            return crit.level === 'wai:WCAG2AAA-Conformance';
        });
    }));

    it('knows what criteria to show based on critFilter', function () {
        expect(criteriaLvlA.length).not.toBe(0);
        expect(criteriaLvlAA.length).not.toBe(0);
        expect(criteriaLvlAAA.length).not.toBe(0);

        scope.critFilter['wai:WCAG2A-Conformance'] = true;
        scope.critFilter['wai:WCAG2AA-Conformance'] = true;
        scope.critFilter['wai:WCAG2AAA-Conformance'] = true;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        scope.critFilter['wai:WCAG2A-Conformance'] = false;
        scope.critFilter['wai:WCAG2AA-Conformance'] = true;
        scope.critFilter['wai:WCAG2AAA-Conformance'] = true;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        scope.critFilter['wai:WCAG2A-Conformance'] = false;
        scope.critFilter['wai:WCAG2AA-Conformance'] = false;
        scope.critFilter['wai:WCAG2AAA-Conformance'] = true;
        criteriaLvlA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(false);
        });

        criteriaLvlAAA.forEach(function (critId) {
            expect(scope.isCriterionVisible(critId)).toBe(true);
        });

        scope.critFilter['wai:WCAG2A-Conformance'] = false;
        scope.critFilter['wai:WCAG2AA-Conformance'] = false;
        scope.critFilter['wai:WCAG2AAA-Conformance'] = false;
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


    it('finds assertions based on criteria IDs', function () {
        criteria.forEach(function (critSpec) {
            var assert = scope.getCritAssert(critSpec.id);
            expect(assert.test).toBe(critSpec.id);
        });
    });


    // Update assert meta data when the assert changes #106
    xit('updates assert metadata when an assert is edited');

});
