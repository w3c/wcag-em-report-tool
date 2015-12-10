'use strict';

describe('model: evalModel export', function () {

    // load the angular module
    setupwcagReporterTest();

    function getEval(linkedData) {
        return linkedData['@graph'].filter(function (obj) {
            return obj.type === 'evaluation';
        })[0];
    }

    var reportImport;
    var reportExport;
    var dummyData;
    var exportData;
    var importEval;
    var exportEval;

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, basicEvalOutput) {
        reportImport = wcagReporterImport;
        reportExport = wcagReporterExport;
        dummyData    = basicEvalOutput;
    }));

    beforeEach(function (done) {
        inject(function ($rootScope) {
            $rootScope.$on('wcag20spec:langChange', done);
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
        ['evaluationScope', '@context', 'type',
         'id', 'title', 'commissioner', 'summary',
         'creator', 'reliedUponTechnology',
         'essentialFunctionality', 'pageTypeVariety'
        ].forEach(function (prop) {

            expect(exportEval[prop])
            .toEqual(importEval[prop]);
        });
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
                assertIn.testRequirement === assertOut.testRequirement) {
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