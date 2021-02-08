'use strict';

angular.module('wcagReporter')
  .controller(
    'StepButtonsCtrl',
    function ($scope, $location, appState) {
      var previous = appState.getPreviousState();
      var next = appState.getNextState();

      if (next) {
        $scope.nextStep = function () {
          $location.path(next.route);
        };
        $scope.nextStepName = 'STEP_' + (next.name).toUpperCase();
      }

      if (previous) {
        $scope.previousStep = function () {
          $location.path(previous.route);
        };
        $scope.previousStepName = 'STEP_' + (previous.name).toUpperCase();
      }
    }
  );
