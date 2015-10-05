'use strict';

describe('Changes for 1.1 data format', function () {

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

    beforeEach(inject(function (wcagReporterImport,
    wcagReporterExport, basicEvalOutput10, _evalModel_) {
        reportImport = wcagReporterImport;
        dummyData    = basicEvalOutput10;
        evalModel    = _evalModel_;
        importEval   = getEval(dummyData);
    }));

    // Identify version of the data format #229
    xit('Defines the Tool version in the output format')

    // Capitalize assertion type #226
    xit('gives type:Assertion to each assertion');

    // Change webpage properties to Dublin Core #222
    xit('Dublin Core variables for pages');

    // Save the page URI separate from the page #223
    xit('puts URLs of the description in dct:source');

    // Add @type to all properties of the output #221
    xit('has a @type on each object');

    // Make the @context external #219
    xit('uses an external context, which is known locally');

    describe('conversion from 1.0', function () {

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
