'use strict';

describe('Controller: AuditFinalizeCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporterApp'));

  var AuditFinalizeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditFinalizeCtrl = $controller('AuditFinalizeCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
