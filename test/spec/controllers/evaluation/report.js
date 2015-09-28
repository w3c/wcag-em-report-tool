'use strict';

var ctrlName  = 'EvalReportCtrl';
var modelName = 'reportModel';

describe('Controller: ' + ctrlName, function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;
    var model;

    beforeEach(inject(function($controller, $rootScope, _evalModel_) {
        scope = $rootScope.$new();
        ctrl  = $controller(ctrlName, { $scope: scope });
        model = _evalModel_[modelName];
    }));

    it('Should be able to update the evalModel.' + modelName, function () {
        expect(scope[modelName]).toBe(model);
    });

});
