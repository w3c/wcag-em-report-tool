'use strict';

describe('Controller: AuditStartCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporterApp'));

  var AuditStartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditStartCtrl = $controller('AuditStartCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
