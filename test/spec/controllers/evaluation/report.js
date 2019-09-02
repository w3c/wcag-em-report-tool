'use strict';
describe('Controller: EvalReportCtrl', function () {
  var modelName = 'reportModel';

  // load the service's module
  setupwcagReporterTest();

  var scope;
  var ctrl;
  var model;

  beforeEach(inject(function ($controller, $rootScope, _evalModel_) {
    scope = $rootScope.$new();
    ctrl = $controller('EvalReportCtrl', { $scope: scope });
    model = _evalModel_[modelName];
  }));

  it('Should be able to update the evalModel.' + modelName, function () {
    expect(scope[modelName])
      .toBe(model);
  });
});
