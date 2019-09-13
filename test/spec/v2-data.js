'use strict';
/**
 * Testing if version 1 evaluation data model is updated to the newer
 * version 2 model.
 * ---
 * NB1:
 *  This test does not take into account that there possibly will be a newer
 *  data model available. Due to this the test suite will fail whenever the evalModel
 *  implements a newer context e.g. for example WCAG 2.1 or 2.2? Instead of testing if
 *  version 1 data is converted to current context, it should
 * ---
 * TODO:
 * -
 *
 * @return undefined
 */
describe('Changes for 1.1+ data format', function () {
  // load the angular module
  setupwcagReporterTest();

  function getEval (linkedData) {
    return linkedData['@graph'].filter(function (obj) {
      return obj.type === 'evaluation';
    })[0];
  }

  var reportImport;
  var dummyData;
  var evalModel;
  var importEval;
  var importV1;
  var getUrl;
  var assertions;
  var evalContextV2;
  var latestContext;

  beforeEach(
    inject(function (
      wcagReporterImport,
      _importV1_,
      // wcagReporterExport,
      basicEvalOutput1,
      _evalModel_,
      $filter,
      _evalContextV2_,
      _evalContextV3_
    ) {
      reportImport = wcagReporterImport;
      dummyData = basicEvalOutput1;
      evalModel = _evalModel_;
      importEval = getEval(dummyData);
      importV1 = _importV1_;
      evalContextV2 = _evalContextV2_;

      expect(importV1.isV1Evaluation(importEval))
        .withContext('Version 1 is identified as such')
        .toBe(true);

      getUrl = $filter('getUrl');
      latestContext = _evalContextV3_;
    })
  );

  beforeEach(function (done) {
    // Load the dummydata v1 into application
    reportImport.fromObject(dummyData, done);

    setTimeout(function () {
      // Fetch criteria objects, should be loaded by reportImport
      assertions = Object
        .keys(evalModel.auditModel.criteria)
        .map(function (critId) {
          return evalModel.auditModel.criteria[critId];
        });

      expect(assertions.length)
        .withContext('Dummy data contains assertions and should be loaded in application')
        .not
        .toBe(0);

      done();
    }, 100);
  });

  // Update to reflect current context version
  it('changes to the latest context version', function () {
    expect(evalModel.context)
      .toEqual(latestContext);
  });

  // Capitalize assertion type #226
  it('gives type:Assertion to each assertion', function () {
    assertions
      .forEach(function checkAssertionType (assertion) {
        expect(assertion.type)
          .toBe('Assertion');

        if (assertion.hasPart) {
          assertion.hasPart
            .forEach(checkAssertionType);
        }
      });
  });

  // Change webpage properties to Dublin Core #222
  it('Dublin Core variables for pages', function () {
    var pages = evalModel.sampleModel.getPages();

    expect(pages.length)
      .not
      .toBe(0);

    pages
      .forEach(function (page) {
        var url = getUrl(page.description);

        // page.handle is replaced with page.title
        expect(page.handle)
          .not
          .toBeDefined();

        expect(page.title)
          .toBeDefined();

        if (url === false) {
          expect(page.source)
            .toBeUndefined();
        } else {
          expect(page.source)
            .toBe(url);
        }
      });
  });

  // Add @type to all properties of the output #221
  it('has a @type on each object', function () {
    expect(evalModel.type)
      .toBe('Evaluation');

    expect(evalModel.scopeModel.type)
      .toBe('EvaluationScope');

    expect(evalModel.exploreModel.knownTech.length)
      .not
      .toBe(0);

    evalModel.exploreModel.reliedUponTechnology
      .forEach(function (tech) {
        expect(tech.type)
          .toBe('Technology');
      });

    expect(evalModel.scopeModel.website.type)
      .toEqual([
        'TestSubject',
        'WebSite'
      ]);

    expect(evalModel.sampleModel.structuredSample.type)
      .toBe('Sample');

    expect(evalModel.sampleModel.randomSample.type)
      .toBe('Sample');

    var pages = evalModel.sampleModel.getPages();

    expect(pages.length)
      .not
      .toBe(0);

    pages
      .forEach(function (page) {
        expect(page.type)
          .toEqual([
            'TestSubject',
            'WebPage'
          ]);
      });

    assertions
      .forEach(function testResultType (assertion) {
        expect(assertion.result.type)
          .toBe('TestResult');
      });
  });

  it('Uses the correct FOAF namespace', function () {
    expect(evalModel.otherData.length)
      .toBe(1);

    var user = evalModel.otherData[0];

    expect(user.type)
      .toBe('Person');

    expect(user['@context']['@vocab'])
      .toBe('http://xmlns.com/foaf/0.1/');
  });

  it('wcag20:level_aa becomes wai:WCAG2AA-Conformance', function () {
    var confTgt = evalModel.scopeModel.conformanceTarget;

    expect(confTgt.substr(0, 9))
      .toBe('wai:WCAG2');

    expect(confTgt.substr(-12, 12))
      .toBe('-Conformance');
  });

  it('website.title becomes website.siteName', function () {
    var website = evalModel.scopeModel.website;

    expect(website.title)
      .toBeUndefined();

    expect(website.siteName)
      .toBeDefined();
  });

  it('renames testRequirement / testcase to test', function () {
    assertions
      .forEach(function testAssert (assertion) {
        expect(assertion.test)
          .toBeDefined();

        expect(assertion.testRequirement)
          .toBeUndefined();

        expect(assertion.testcase)
          .toBeUndefined();

        if (assertion.hasPart) {
          assertion.hasPart
            .forEach(testAssert);
        }
      });
  });

  it('should be properly upgraded to version 2 first', function () {
    var importEvalV2 = importV1.upgradeToV2(importEval);

    expect(importEvalV2['@context'])
      .toEqual(evalContextV2);
  });

  it('changes the wcag20 namespace to WCAG2', function () {
    assertions
      .forEach(function testAssert (assertion) {
        expect(assertion.test)
          .withContext('Start with "WCAG2:"')
          .toMatch(/^WCAG2:/);

        if (assertion.hasPart) {
          assertion.hasPart
            .forEach(testAssert);
        }
      });
  });

  it('has mode:earl:manual', function () {
    assertions
      .forEach(function testAssert (assertion) {
        expect(assertion.mode)
          .toBe('earl:manual');

        if (assertion.hasPart) {
          assertion.hasPart
            .forEach(testAssert);
        }
      });
  });

  it('updates testcase to test property of page asserts', function () {
    var pageAsserts = [];

    assertions
      .forEach(function testAssert (siteAssert) {
        if (
          siteAssert.hasPart &&
          siteAssert.hasPart.length > 0
        ) {
          Array.prototype.push.apply(pageAsserts, siteAssert.hasPart);
        }

        if (siteAssert.hasPart) {
          siteAssert.hasPart
            .forEach(testAssert);
        }
      });

    expect(pageAsserts.length)
      .not
      .toBe(-1);
  });
});
