'use strict';
describe('Controller: EvalSampleCtrl', function () {
    var modelName = 'sampleModel';

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;
    var model;

    beforeEach(inject(function($controller, $rootScope, evalModel) {
        scope = $rootScope.$new();
        ctrl  = $controller('EvalSampleCtrl', { $scope: scope });
        model = evalModel[modelName];
    }));

    it('provides access to structured & random sample', function () {
        expect(scope.structuredSample)
        .toBe(model.structuredSample);

        expect(scope.randomSample)
        .toBe(model.randomSample);
    });

    // getPageAdder, getPageRemover
    it('adds and removes pages to a sample', function () {
        var sample = model.structuredSample;
        // Check that an empty first page is present
        expect(sample.webpage.length)
        .toBe(1);

        var addPage    = scope.getPageAdder(sample);
        var removePage = scope.getPageRemover(sample);

        removePage(0);
        expect(sample.webpage.length).toBe(0);

        var page1 = addPage();
        expect(sample.webpage[0]).toBe(page1);

        var page2 = addPage();
        expect(sample.webpage[1]).toBe(page2);

        removePage(0);
        expect(sample.webpage.length).toBe(1);

        removePage(0);
        expect(sample.webpage.length).toBe(0);
    });


    it('tracks the number of random pages to use', function () {
        expect(scope.randPageCount()).toBe(1);

        for (var i=0; i < 25; i++) {
            model.addNewPage(model.structuredSample);
        }
        expect(scope.randPageCount()).toBe(3);
    });


    xit('adds/removes assertions for each page added/removed');

});
