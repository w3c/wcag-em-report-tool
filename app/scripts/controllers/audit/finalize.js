'use strict';

angular.module('wcagReporter')
.controller('AuditFinalizeCtrl', function ($scope, appState,
$location, evalSampleModel, evalReportModel) {

    $scope.state = appState.moveToState('finalize');
    $scope.report = evalReportModel;

    $scope.allPages = function () {
          return evalSampleModel.getPages();
    };

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
        $location.path('/audit/test');
    };

    $scope.nextStepName = 'STEP_VIEW';
    $scope.previousStepName = 'STEP_AUDIT';

});

