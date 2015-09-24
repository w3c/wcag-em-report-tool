'use strict';

describe('model: evalModel import+export', function () {

    // load the angular module
    beforeEach(module('wcagReporter'));
    beforeEach(module('wertDummy'));

    function getEval(linkedData) {
        return linkedData['@graph'].filter(function (obj) {
            return obj.type === 'evaluation';
        })[0];
    }

    // instantiate model
    var reportImport;
    var reportExport;
    var context;
    var dummyData;

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, evalContext, basicEvalOutput) {
        reportImport = wcagReporterImport;
        reportExport = wcagReporterExport;
        context      = evalContext;
        dummyData    = basicEvalOutput;
    }));

    var testTitel = 'some title';
    beforeEach(function () {
        // reportImport.fromObject(dummyData);
    });

    // it('export the same title it imports', function () {
    //     reportImport.fromObject(dummyData);
    //     var out = reportExport.getJson();

    //     expect(out)
    //     .toBe(getEval(dummyData).title);
    // });

});
