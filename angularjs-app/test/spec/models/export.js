'use strict';

describe('model: evalModel export', function () {
  // load the angular module
  setupwcagReporterTest();

  function getEval (linkedData) {
    return linkedData['@graph'].filter(function (obj) {
      return obj.type === 'Evaluation';
    })[0];
  }

  var reportImport;
  var reportExport;
  var dummyData;
  var exportData;
  var importEval;
  var exportEval;
  var context;
  var $rootScope;

  beforeEach(
    inject(function (
      wcagReporterImport,
      wcagReporterExport,
      basicEvalOutput3,
      evalContextV3
    ) {
      reportImport = wcagReporterImport;
      reportExport = wcagReporterExport;
      dummyData = basicEvalOutput3;
      context = evalContextV3;
    })
  );

  beforeEach(function (done) {
    inject(function (_$rootScope_) {
      $rootScope = _$rootScope_;
      $rootScope.$on('wcag2spec:langChange', done);
    });
  });

  beforeEach(function (done) {
    reportImport.fromJson(dummyData, done);

    setTimeout(function () {
      exportData = reportExport.getJson();
      importEval = getEval(dummyData);
      exportEval = getEval(exportData);
      done();
    }, 200);
  });

  it('shares properties with imported data', function () {
    [
      'evaluationScope',
      'type',
      'id',
      'title',
      'commissioner',
      'summary',
      'creator',
      'reliedUponTechnology',
      'essentialFunctionality',
      'pageTypeVariety'
    ].forEach(function (prop) {
      expect(exportEval[prop])
        .toEqual(importEval[prop]);
    });
  });

  it('has the latest context', function () {
    expect(exportEval['@context'])
      .toEqual(context);
  });

  it('has the same sample', function () {
    [
      'structuredSample',
      'randomSample'
    ]
      .forEach(function (sampleType) {
        var importPages = importEval[sampleType].webpage;
        var exportPages = exportEval[sampleType].webpage;

        expect(importPages.length)
          .toBe(exportPages.length);

        importPages.forEach(function (importPage, i) {
          expect(importPage)
            .toEqual(exportPages[i]);
        });
      });
  });

  it('has the same results', function () {
    importEval.auditResult

      // Find all none-empty assertions
      .filter(function (assert) {
        var result = assert.result;

        return (
          result.outcome !== 'earl:untested' ||
        !!result.description
        );
      })

      // Check if there is 1 none-empty assertion in the output
      .forEach(function (assertOut) {
        var asserts = [];

        // Find all asserts with the same subject & test
        exportEval.auditResult
          .forEach(function (assertIn) {
            if (
              assertIn.test === assertOut.test &&
              assertIn.subject === assertOut.subject
            ) {
              // Remove methods & inherited properties
              assertIn = JSON.parse(JSON.stringify(assertIn));
              asserts.push(assertIn);
            }
          });

        // Check there is only 1, and it has all the same properties
        expect(asserts.length)
          .toBe(1);

        expect(asserts[0])
          .toEqual(assertOut);
      });

    // Check the sane number of results came out as went in
    expect(exportEval.auditResult.length)
      .toBe(importEval.auditResult.length);
  });

  // Identify version of the tool used to generate the format #229
  it('Defines the Tool version as (dct:)publisher', function () {
    expect(exportEval.publisher)
      .toBe('reporter:releases/tag/' + '<%= pkg.version =%>');
  });

  it('exports the current language of the tool', function () {
    expect(exportEval.lang)
      .toBe($rootScope.lang);
  });
});
