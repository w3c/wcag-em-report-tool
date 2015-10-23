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
        reportImport.fromJson(dummyData, done);
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
            expect(assertion.type).toBe('earl:Assertion');
        });
    });


    // Change webpage properties to Dublin Core #222
    it('Dublin Core variables for pages', function () {
        var pages = evalModel.sampleModel.getPages();

        expect(pages.length).not.toBe(0);
        pages.forEach(function (page) {
            expect(page.type).toBe('Webpage');
            expect(page.description).toBeDefined();
            expect(page.title).toBeDefined();
            expect(page.handle).not.toBeDefined();
        });

    });

    // Add @type to all properties of the output #221
    xit('has a @type on each object');

    // Make the @context external #219
    xit('uses an external context, which is known locally');


    xit('Switches context "id" and "type" properties to "@id" and "@type"', function () {

    });

    xit('Uses the correct FOAF namespace', function () {});

    describe('conversion from 1.0', function () {

        beforeEach(function (done) {
            reportImport.fromJson(dummyData, done);
            setTimeout(function () {
                exportData = reportExport.getJson();
                importEval = getEval(dummyData);
                exportEval = getEval(exportData);
                done();
            }, 200);
        });

        // Capitalize assertion type #226
        xit('Capitalizes Assertion type');

        // Change webpage properties to Dublin Core #222
        xit('converts WCAG-EM page types to dublin core types');

        // Save the page URI separate from the page #223
        xit('extracts URLs from page description for dct:source');

        // Add @type to all properties of the output #221
        xit('adds @type to each object');

        // Replace testRequirement with "test" #220
        xit('renames testRequirement to "test"');
    });


});
