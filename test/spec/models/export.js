'use strict';

describe('model: evalModel export', function () {

    // load the angular module
    beforeEach(module('wcagReporter'));
    beforeEach(module('wertDummy'));

    function getEval(linkedData) {
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

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, basicEvalOutput2, evalContextV2) {
        reportImport = wcagReporterImport;
        reportExport = wcagReporterExport;
        dummyData    = basicEvalOutput2;
        context      = evalContextV2;
    }));

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
        ['evaluationScope', 'type',
         'id', 'title', 'commissioner', 'summary',
         'creator', 'reliedUponTechnology',
         'essentialFunctionality', 'pageTypeVariety'
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
        ['structuredSample', 'randomSample']
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
        // Find all none-empty assertions
        importEval.auditResult.filter(function (assert) {
            var result = assert.result;
            return (result.outcome !== 'earl:untested' ||
                    !!result.description);

        }).forEach(function (assertOut) {
            var asserts = [];
            exportEval.auditResult.forEach(function (assertIn) {
                if (assertIn.subject === assertOut.subject &&
                assertIn.test === assertOut.test) {
                    asserts.push(assertIn);
                }
            });
            expect(asserts.length).toBe(1);
            expect(asserts[0]).toEqual(assertOut);
        });
        expect(exportEval.auditResult.length)
        .toBe(importEval.auditResult.length);
    });

});