'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState, evalSampleModel) {
    $scope.state = appState.moveToState('sample');

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;

    $scope.addPage = evalSampleModel.addPage;
    $scope.removePage = evalSampleModel.removePage;

    $scope.processInput = function () {
        var errors = evalSampleModel.validate();
        if (errors.length > 0) {
            // display errors
            // prevent default
        } else {
            // continue to next step
        }

        console.log(evalSampleModel);
    };
});
