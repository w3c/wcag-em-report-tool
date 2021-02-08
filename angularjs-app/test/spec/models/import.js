'use strict';

describe('model: evalModel import', function () {
  // load the angular module
  setupwcagReporterTest();

  function getEval (linkedData) {
    return linkedData['@graph']
      .filter(function (obj) {
        return obj.type === 'Evaluation';
      })[0];
  }

  var reportImport;
  var dummyData;
  var evalModel;
  var importEval;

  beforeEach(
    inject(function (
      _wcagReporterImport_,
      _basicEvalOutput3_,
      _evalModel_
    ) {
      reportImport = _wcagReporterImport_;
      dummyData = _basicEvalOutput3_;
      evalModel = _evalModel_;
      importEval = getEval(dummyData);
    })
  );

  beforeEach(function (done) {
    inject(function ($rootScope) {
      $rootScope.$on('wcag2spec:langChange', done);
    });
  });

  beforeEach(function (done) {
    reportImport.fromJson(dummyData, done);
    setTimeout(done, 100);
  });

  it('shares the evaluation ID', function () {
    expect(evalModel.id)
      .toBe(importEval.id);
  });

  it('stores scope properties on evalModel.scopeModel', function () {
    var scopeModel = evalModel.scopeModel;
    [
      'additionalEvalRequirement',
      'conformanceTarget',
      'accessibilitySupportBaseline',
      'website'
    ].forEach(function (prop) {
      expect(scopeModel[prop])
        .toEqual(importEval.evaluationScope[prop]);
    });
  });

  it('stores explore properties on evalModel.exploreModel', function () {
    var exploreModel = evalModel.exploreModel;

    [
      'reliedUponTechnology',
      'essentialFunctionality',
      'pageTypeVariety',

      // Following properties are added to the model but excluded from view
      // Still testing for it since it is part of WCAG-EM
      'commonPages',
      'otherRelevantPages'
    ].forEach(function (property) {
      expect(exploreModel[property])
        .withContext(property)
        .toEqual(importEval[property]);
    });
  });

  it('stores sample properties on evalModel.sampleModel', function () {
    var sampleModel = evalModel.sampleModel;

    [
      'structuredSample',
      'randomSample'
    ].forEach(function (sampleType) {
      var modelPages = sampleModel[sampleType].webpage;
      var importPages = importEval[sampleType].webpage;

      expect(modelPages.length)
        .toBe(importPages.length);

      importPages
        .forEach(function (importPage, i) {
          var modelPage = modelPages[i];
          [
            'type',
            'id',
            'description',
            'handle',
            'tested'
          ].forEach(function (prop) {
            expect(modelPage[prop])
              .toEqual(importPage[prop]);
          });
        });
    });
  });

  it('stores audit properties on evalModel.auditModel', function () {
    var auditModel = evalModel.auditModel;

    importEval.auditResult
      .forEach(function (assert) {
        var critAssert = auditModel
          .criteria[assert.test];

        [
          'type',
          'assertedBy',
          'mode',
          'subject',
          'result',
          'test'
        ].forEach(function (prop) {
          expect(critAssert[prop])
            .toEqual(assert[prop]);
        });
      });
  });

  it('stores report properties on evalModel.reportModel', function () {
    var reportModel = evalModel.reportModel;

    [
      'title',
      'summary',
      'specifics',
      'commissioner'
    ].forEach(function (prop) {
      expect(reportModel[prop])
        .toEqual(importEval[prop]);
    });

    var creatorId;

    if (typeof importEval.creator === 'string') {
      creatorId = importEval.creator;
    } else if (typeof importEval.creator === 'object') {
      if (importEval.creator.id) {
        creatorId = importEval.creator.id;
      } else if (importEval.creator['@id']) {
        creatorId = importEval.creator['@id'];
      }
    }

    expect(reportModel.creator.id)
      .toBe(creatorId);
  });
});
