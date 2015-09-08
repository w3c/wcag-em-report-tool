'use strict';

angular.module('wcagReporter')
.controller('EvalAuditCtrl', function ($scope, appState, $location) {

    $scope.state = appState.moveToState('audit');

    $scope.nextStep = function () {
        $location.path('/evaluation/report');
    };

    $scope.previousStep = function () {
        $location.path('/evaluation/sample');
    };

    $scope.nextStepName = 'STEP_REPORT';
    $scope.previousStepName = 'STEP_SAMPLE';

});