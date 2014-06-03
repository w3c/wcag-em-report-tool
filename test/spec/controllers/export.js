'use strict';

describe('Controller: ExportCtrl', function () {

  // load the controller's module
  beforeEach(module('wcagReporterApp'));

  var ExportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExportCtrl = $controller('ExportCtrl', {
      $scope: scope
    });
  }));
});
