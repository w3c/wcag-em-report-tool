'use strict';

describe('Controller: AuditTestCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporterApp'));

  var AuditTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditTestCtrl = $controller('AuditTestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
