'use strict';

describe('Changes for 1.1+ data format', function () {

    // load the angular module
    setupwcagReporterTest();

    function getEval(linkedData) {
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

    beforeEach(inject(function (wcagReporterImport, _importV1_,
    wcagReporterExport, basicEvalOutput1, _evalModel_, $filter) {
        reportImport = wcagReporterImport;
        dummyData    = basicEvalOutput1;
        evalModel    = _evalModel_;
        importEval   = getEval(dummyData);
        importV1     = _importV1_;
        expect(importV1.isV1Evaluation(importEval)).toBe(true);
        getUrl = $filter('getUrl');
    }));

    beforeEach(function (done) {
        reportImport.fromObject(dummyData, done);
        setTimeout(function () {
            assertions = Object.keys(evalModel.auditModel.criteria)
            .map(function (critId) {
                return evalModel.auditModel.criteria[critId];
            });
            expect(assertions.length).not.toBe(0);
            done();
        }, 100);
    });


    // Capitalize assertion type #226
    it('gives type:Assertion to each assertion', function () {
        assertions.forEach(function (assertion) {
            expect(assertion.type).toBe('Assertion');
        });
    });

    it('renames testRequirement to test', function () {
        assertions.forEach(function (assertion) {
            expect(assertion.test).toBeDefined();
            expect(assertion.testRequirement).toBeUndefined();
        });
    });

    it('changes the wcag20 namespace to WCAG2', function () {
        assertions.forEach(function (assertion) {
            expect(assertion.test.substr(0, 6)).toBe('WCAG2:');
        });
    });


    // Change webpage properties to Dublin Core #222
    it('Dublin Core variables for pages', function () {
        var pages = evalModel.sampleModel.getPages();

        expect(pages.length).not.toBe(0);

        pages.forEach(function (page) {
            expect(page.description).toBeDefined();
            expect(page.title).toBeDefined();
            expect(page.source).toBe(getUrl(page.description));

            expect(page.handle).not.toBeDefined();
        });

    });

    // Add @type to all properties of the output #221
    it('has a @type on each object', function () {
        expect(evalModel.type).toBe('Evaluation');
        expect(evalModel.scopeModel.type).toBe('EvaluationScope');

        expect(evalModel.exploreModel.knownTech.length).not.toBe(0);
        evalModel.exploreModel.reliedUponTechnology.forEach(function (tech) {
            expect(tech.type).toBe('Technology');
        });

        expect(evalModel.scopeModel.website.type)
        .toEqual(['TestSubject', 'WebSite']);

        expect(evalModel.sampleModel.structuredSample.type).toBe('Sample');
        expect(evalModel.sampleModel.randomSample.type).toBe('Sample');

        var pages = evalModel.sampleModel.getPages();
        expect(pages.length).not.toBe(0);
        pages.forEach(function (page) {
            expect(page.type)
            .toEqual(['TestSubject', 'WebPage']);
        });

        var critIds = Object.keys(evalModel.auditModel.criteria);
        expect(critIds.length).not.toBe(0);
        critIds.forEach(function (critId) {
            var assertion = evalModel.auditModel.criteria[critId];
            expect(assertion.result.type).toBe('TestResult');
        });
    });

    it('Uses the correct FOAF namespace', function () {
        expect(evalModel.otherData.length).toBe(1);
        var user = evalModel.otherData[0]
        expect(user.type).toBe('Person');
        expect(user['@context']['@vocab'])
        .toBe('http://xmlns.com/foaf/0.1/');
    });


});
