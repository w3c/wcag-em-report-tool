'use strict';
var ctrlName  = 'EvalScopeCtrl';
var modelName = 'scopeModel';

describe('Controller: ' + ctrlName, function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;
    var model;

    beforeEach(inject(function($controller, $rootScope, evalModel) {
        scope = $rootScope.$new();
        ctrl  = $controller(ctrlName, { $scope: scope });
        model = evalModel[modelName];
    }));

    it('Should be able to update the evalModel.' + modelName, function () {
        expect(scope[modelName]).toBe(model);
    });

});
