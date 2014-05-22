'use strict';

describe('Controller: AuditExploreCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporterApp'));

  var AuditExploreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditExploreCtrl = $controller('AuditExploreCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
