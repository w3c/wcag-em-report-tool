'use strict';

describe('Controller: AuditTestCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporter'));

  var AuditTestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditTestCtrl = $controller('AuditTestCtrl', {
      $scope: scope
    });
  }));

});
