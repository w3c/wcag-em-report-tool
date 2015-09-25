'use strict';

describe('Controller: EvalSampleCtrl', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;
    var sampleModel;

    beforeEach(inject(function($controller, $rootScope, _evalModel_) {
        scope = $rootScope.$new();
        ctrl  = $controller('EvalSampleCtrl', { $scope: scope });
        sampleModel    = _evalModel_.sampleModel;
    }));

    xit('Should be able to update the evalSampleModel', function () {
        expect(scope.sampleModel).toBe(sampleModel);
    });

});
