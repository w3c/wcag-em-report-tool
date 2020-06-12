'use strict';

angular.module('wcagReporter')
  .controller('EvalAuditCtrl', function ($scope, appState) {
    $scope.state = appState.moveToState('audit');
  });
