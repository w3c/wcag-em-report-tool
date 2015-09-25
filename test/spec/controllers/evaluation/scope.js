'use strict';

describe('Controller: EvalScopeCtrl', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;
    var scopeModel;

    beforeEach(inject(function($controller, $rootScope, _evalModel_) {
        scope = $rootScope.$new();
        ctrl  = $controller('EvalScopeCtrl', { $scope: scope });
        scopeModel    = _evalModel_.scopeModel;
    }));

    it('Should be able to update the evalScopeModel', function () {
        expect(scope.evalScope).toBe(scopeModel);
    });

});
