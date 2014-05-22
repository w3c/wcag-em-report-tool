'use strict';

describe('Controller: ReportCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporterApp'));

  var ReportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportCtrl = $controller('ReportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
