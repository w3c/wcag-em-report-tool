'use strict';

angular.module('wcagReporter')
.controller('EvalTestCtrl', function ($scope, appState, $location) {

    $scope.state = appState.moveToState('test');

    $scope.nextStep = function () {
        $location.path('/evaluation/finalize');
    };

    $scope.previousStep = function () {
        $location.path('/evaluation/sample');
    };

    $scope.nextStepName = 'STEP_REPORT';
    $scope.previousStepName = 'STEP_SAMPLE';
});