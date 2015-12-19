'use strict';

describe('model: evalModel import', function () {

    // load the angular module
    setupwcagReporterTest();

    function getEval(linkedData) {
        return linkedData['@graph'].filter(function (obj) {
            return obj.type === 'Evaluation';
        })[0];
    }

    var reportImport;
    var dummyData;
    var evalModel;
    var importEval;

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, basicEvalOutput2, _evalModel_) {
        reportImport = wcagReporterImport;
        dummyData    = basicEvalOutput2;
        evalModel    = _evalModel_;
        importEval   = getEval(dummyData);
    }));

    beforeEach(function (done) {
        inject(function ($rootScope) {
            $rootScope.$on('wcag20spec:langChange', done);
        });
    });

    beforeEach(function (done) {
        reportImport.fromJson(dummyData, done);
        setTimeout(done, 100);
    });

    it('shares the evaluation ID', function () {
    	expect(evalModel.id)
    	.toBe(importEval.id);
    });


    it('stores scope properties on evalModel.scopeModel', function () {
    	var scopeModel = evalModel.scopeModel;
    	[	'additionalEvalRequirement',
    	 	'conformanceTarget',
    	 	'accessibilitySupportBaseline',
    	 	'website']
    	.forEach(function (prop) {
	    	expect(scopeModel[prop])
	    	.toEqual(importEval.evaluationScope[prop]);
    	});
    });

    // Save the page URI separate from the page #223
    xit('puts URLs of the description in dct:source');


    it('stores explore properties on evalModel.exploreModel', function () {
    	var exploreModel = evalModel.exploreModel;
    	[	'reliedUponTechnology',
    	 	'essentialFunctionality',
    	 	'pageTypeVariety',
    	 	'commonPages',
    	 	'otherRelevantPages']
    	.forEach(function (prop) {
	    	expect(exploreModel[prop])
	    	.toEqual(importEval[prop]);
    	});
    });


    it('stores sample properties on evalModel.sampleModel', function () {
    	var sampleModel = evalModel.sampleModel;

    	['structuredSample', 'randomSample']
    	.forEach(function (sampleType) {
    		var modelPages  = sampleModel[sampleType].webpage;
    		var importPages = importEval[sampleType].webpage;

    		expect(modelPages.length)
    		.toBe(importPages.length);

    		importPages.forEach(function (importPage, i) {
    			var modelPage = modelPages[i];
    			["type", "id", "description", "handle", "tested"]
    			.forEach(function (prop) {
    				expect(modelPage[prop])
    				.toEqual(importPage[prop]);
    			});
    		});
       	});
    });


    it('stores audit properties on evalModel.auditModel', function () {
    	var auditModel = evalModel.auditModel;

        importEval.auditResult
        .forEach(function (assert) {
            var critAssert = auditModel
            .criteria[assert.test];

            ['type', 'assertedBy', 'mode', 'subject',
             'result', 'test']
            .forEach(function (prop) {
                expect(critAssert[prop])
                .toEqual(assert[prop]);
            });
        });

    });


    it('stores report properties on evalModel.reportModel', function () {
        var reportModel = evalModel.reportModel;

        ['title', 'summary', 'specifics',
         'commissioner']
    	.forEach(function (prop) {
	    	expect(reportModel[prop])
	    	.toEqual(importEval[prop]);
    	});

    	var creatorId;
    	if (typeof importEval.creator === 'string') {
    		creatorId = importEval.creator;
    	} else if (typeof importEval.creator === 'object') {
    		if (importEval.creator.id) {
    			creatorId = importEval.creator.id;
    		} else if (importEval.creator['@id']) {
    			creatorId = importEval.creator['@id'];
    		}
    	}
		expect(reportModel.creator.id).toBe(creatorId);
    });


});