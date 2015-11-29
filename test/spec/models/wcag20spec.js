'use strict';

describe('model: wcag20spec', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    // instantiate service
    var wcag20spec;
    beforeEach(inject(function (_wcag20spec_) {
        wcag20spec = _wcag20spec_;
    }));

    beforeEach(function (done) {
        inject(function ($rootScope) {
            $rootScope.$on('wcag20spec:langChange', done);
        });
    });

    describe('getPrinciples', function () {
        var principles;
        beforeEach(function () {
            principles = wcag20spec.getPrinciples();
        });

        it('should return an array', function () {
            expect(jQuery.isArray(principles))
            .toBe(true);
        });

        it('should contain guidelines', function () {
            principles.forEach(function (p) {
                expect(jQuery.isArray(p.guidelines))
                .toBe(true);
            });
        });
    });

    describe('getGuidelines', function () {
        var guidelines;
        beforeEach(function () {
            guidelines = wcag20spec.getGuidelines();
        });

        it('should return an array', function () {
            expect(jQuery.isArray(guidelines))
            .toBe(true);
        });

        it('should contain successcriteria', function () {
            guidelines.forEach(function (g) {
                expect(jQuery.isArray(g.successcriteria))
                .toBe(true);
            });
        });
    });

    describe('getCriteria', function () {
        var criteria;
        beforeEach(function () {
            criteria = wcag20spec.getCriteria();
        });

        it('should return an array', function () {
            expect(jQuery.isArray(criteria))
            .toBe(true);
        });
    });

    describe('getCriterion', function () {
        it('should return a criterion with the given URI', function () {
            var crit = wcag20spec.getCriterion('wcag20:text-equiv-all');
            expect(typeof crit).toBe('object');
        });

        it('should return undefined if the URI is unknown', function() {
            var crit = wcag20spec.getCriterion();

            expect(typeof crit).toBe('undefined');
            crit = wcag20spec.getCriterion('');
            expect(typeof crit).toBe('undefined');

            crit = wcag20spec.getCriterion('someRandomThing');
            expect(typeof crit).toBe('undefined');
        });
    });

});
