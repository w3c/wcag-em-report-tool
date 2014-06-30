'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState, evalSampleModel) {
    $scope.state = appState.moveToState('sample');

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;

});
