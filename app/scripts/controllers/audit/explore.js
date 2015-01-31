'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState, $timeout,
evalExploreModel, evalTestModel, $location) {

    $scope.state = appState.moveToState('explore');
    $scope.explore = evalExploreModel;

    $scope.processInput = function () {
        var errors = evalExploreModel.validate();

        if (errors.length > 0) {
            // display errors
            // prevent default
        } else {
            evalExploreModel.updateSample();
            // continue to next step
        }
    };

    $scope.nextStep = function () {
        $location.path('/audit/sample');
    };

    $scope.previousStep = function () {
        $location.path('/audit/scope');
    };

    $scope.nextStepName = 'STEP_SAMPLE';
    $scope.previousStepName = 'STEP_SCOPE';

});
