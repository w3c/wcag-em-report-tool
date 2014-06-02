'use strict';

describe('Controller: AuditScopeCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporter'));

  var AuditStartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuditStartCtrl = $controller('AuditScopeCtrl', {
      $scope: scope
    });
  }));


});
