'use strict';

describe('Controller: AuditSampleCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporter'));

  var AuditSampleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditSampleCtrl = $controller('AuditSampleCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
