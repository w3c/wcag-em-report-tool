'use strict';
describe('Controller: EvalScopeCtrl', function () {
  var modelName = 'scopeModel';

  // load the service's module
  setupwcagReporterTest();

  var scope;
  var ctrl;
  var model;

  beforeEach(inject(function ($controller, $rootScope, evalModel) {
    scope = $rootScope.$new();
    ctrl = $controller('EvalScopeCtrl', { $scope: scope });
    model = evalModel[modelName];
  }));

  it('Should be able to update the evalModel.' + modelName, function () {
    expect(scope[modelName])
      .toBe(model);
  });
});
