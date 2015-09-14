'use strict';

angular.module('wcagReporter')
.controller('EvalReportCtrl', function ($scope, appState,
$location, evalSampleModel, evalReportModel) {

    $scope.state = appState.moveToState('report');
    $scope.report = evalReportModel;

    $scope.processInput = function () {
        var errors = evalReportModel.validate();

        if (errors.length > 0) {
            // display errors
            // prevent default
        } else {
            evalReportModel.updateSample();
            // continue to next step
        }
    };

    $scope.nextStep = function () {
        $location.path('/report');
    };

    $scope.previousStep = function () {
        $location.path('/evaluation/audit');
    };

    $scope.nextStepName = 'STEP_VIEW';
    $scope.previousStepName = 'STEP_AUDIT';

});

