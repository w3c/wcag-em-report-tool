'use strict';

describe('model: evalModel import+export', function () {
    // load the angular module
    beforeEach(module('wcagReporter'));

    // instantiate model
    var reportImport;
    var reportExport;
    var context;

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, evalContext) {
        reportImport = wcagReporterImport;
        reportExport = wcagReporterExport;
        context      = evalContext;
    }));

    var dummyData;
    var testTitel = 'some title';
    beforeEach(function () {
        dummyData = {
            '@context': context,
            'title': testTitel
        };
    });

    it('export the same title it imports', function () {
        reportImport.fromObject(dummyData);
        var out = reportExport.getJson()['@graph'][0];

        expect(out.title).toBe(testTitel);
    });

});
>>>>>>> d3cdf7928110e0708e8832b8f8aea237489c6da1
