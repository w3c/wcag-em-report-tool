'use strict';

describe('model: evalModel export', function () {

    // load the angular module
    beforeEach(module('wcagReporter'));
    beforeEach(module('wertDummy'));

    function getEval(linkedData) {
        return linkedData['@graph'].filter(function (obj) {
            return obj.type === 'evaluation';
        })[0];
    }

    var reportImport;
    var reportExport;
    var dummyData;
    var exportData;

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, basicEvalOutput) {
        reportImport = wcagReporterImport;
        reportExport = wcagReporterExport
        dummyData    = basicEvalOutput;
    }));

    beforeEach(function (done) {
		reportImport.fromJson(dummyData, done);
		setTimeout(function () {
            exportData = reportExport.getJson()
            done();
        }, 100);
    });


    it('shares properties with imported data', function () {
        var importEval = getEval(dummyData);
        var exportEval = getEval(exportData);

        ['evaluationScope', '@context', 'type',
         'id', 'title', 'commissioner', 'summary',
         'creator', 'reliedUponTechnology', 
         'essentialFunctionality', 'pageTypeVariety'
        ].forEach(function (prop) {

        	expect(exportEval[prop])
        	.toEqual(importEval[prop]);
        });
    });

    xit('has the same sample');
    
    xit('has the same results');

});