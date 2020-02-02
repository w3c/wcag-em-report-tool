'use strict';

describe('model: wcag2spec', function () {
  // load the service's module
  setupwcagReporterTest();

  // instantiate service
  var wcag2spec;
  beforeEach(
    inject(function (_wcag2spec_) {
      wcag2spec = _wcag2spec_;
    })
  );

  beforeEach(function (done) {
    inject(function ($rootScope) {
      $rootScope.$on('wcag2spec:langChange', done);
    });
  });

  describe('getPrinciples', function () {
    var principles;

    beforeEach(function () {
      principles = wcag2spec.getPrinciples();
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
      guidelines = wcag2spec.getGuidelines();
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
      criteria = wcag2spec.getCriteria();
    });

    it('should return an array', function () {
      expect(jQuery.isArray(criteria))
        .toBe(true);
    });
  });

  describe('getCriterion', function () {
    it('should return a criterion with the given ID (WCAG2:non-text-content)', function () {
      var criterionId = 'WCAG2:non-text-content';
      var criterion = wcag2spec.getCriterion(criterionId);

      expect(typeof criterion)
        .toBe('object');

      expect(criterion.id)
        .toBe(criterionId);
    });

    it('should return undefined if the ID is unknown', function () {
      var getCriterion = wcag2spec.getCriterion;

      // No ID passed to getCriterion
      expect(typeof getCriterion())
        .toBe('undefined');

      [
        '',
        'someUnknownId'
      ].forEach(function (unknownId) {
        var criterion = getCriterion(unknownId);

        expect(typeof criterion)
          .toBe('undefined');
      });
    });
  });
});
