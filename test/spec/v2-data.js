'use strict';

describe('Changes for 1.1+ data format', function () {

    // load the angular module
    beforeEach(module('wcagReporter'));
    beforeEach(module('wertDummy'));

    function getEval(linkedData) {
        return linkedData['@graph'].filter(function (obj) {
            return obj.type === 'evaluation';
        })[0];
    }

    var reportImport;
    var dummyData;
    var evalModel;
    var importEval;
    var importV2;

    beforeEach(inject(function (wcagReporterImport, _importV2_,
    wcagReporterExport, basicEvalOutput1, _evalModel_) {
        reportImport = wcagReporterImport;
        dummyData    = basicEvalOutput1;
        evalModel    = _evalModel_;
        importEval   = getEval(dummyData);
        importV2     = _importV2_;
        expect(importV2.isV1(importEval)).toBe(true);
    }));

    beforeEach(function (done) {
        reportImport.fromObject(dummyData, done);
        setTimeout(done, 100);
    });


    // Identify version of the data format #229
    xit('Defines the Tool version as (dct:)publisher', function () {
        'reporttool:releases/tag/1.0.3';
    });


    // Capitalize assertion type #226
    it('gives type:Assertion to each assertion', function () {
        var critIds = Object.keys(evalModel.auditModel.criteria);

        expect(critIds.length).not.toBe(0);
        critIds.forEach(function (critId) {
            var assertion = evalModel.auditModel.criteria[critId];
            expect(assertion.type).toBe('Assertion');
        });
    });


    // Change webpage properties to Dublin Core #222
    it('Dublin Core variables for pages', function () {
        var pages = evalModel.sampleModel.getPages();

        expect(pages.length).not.toBe(0);

        pages.forEach(function (page) {
            expect(page.description).toBeDefined();
            expect(page.title).toBeDefined();
            expect(page.handle).not.toBeDefined();
        });

    });

    // Add @type to all properties of the output #221
    it('has a @type on each object', function () {

        expect(evalModel.type).toBe('Evaluation');

        expect(evalModel.scopeModel.type).toBe('Scope');

        expect(evalModel.exploreModel.knownTech.length).not.toBe(0);
        evalModel.exploreModel.reliedUponTechnology.forEach(function (tech) {
            expect(tech.type).toBe('Technology');
        });

        expect(evalModel.scopeModel.website.type).toBe('WebSite');

        expect(evalModel.sampleModel.structuredSample.type).toBe('Sample');
        expect(evalModel.sampleModel.randomSample.type).toBe('Sample');

        var pages = evalModel.sampleModel.getPages();
        expect(pages.length).not.toBe(0);
        pages.forEach(function (page) {
            expect(page.type).toBe('WebPage');
        });

        var critIds = Object.keys(evalModel.auditModel.criteria);
        expect(critIds.length).not.toBe(0);
        critIds.forEach(function (critId) {
            var assertion = evalModel.auditModel.criteria[critId];
            expect(assertion.result.type).toBe('TestResult');
        });

    });

    // Make the @context external #219
    xit('uses an external context, which is known locally');


    xit('Uses the correct FOAF namespace', function () {});


});
