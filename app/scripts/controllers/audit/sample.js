'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState, evalSampleModel) {
    $scope.state = appState.moveToState('sample');

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;

    $scope.addPage = function (sample) {
        return function () {
            return evalSampleModel.addNewPage(sample);
        };
    };
    $scope.removePage = function (sample) {
        return function (index) {
            return evalSampleModel.removePage(sample, index);
        };
    };

    $scope.randPageCount = function () {
        return Math
        .ceil($scope.structuredSample.webpage.length / 10);
    };


    $scope.processInput = function () {
        var errors = evalSampleModel.validate();
        if (errors.length > 0) {
            // display errors
            // prevent default
        } else {
            // continue to next step
        }
    };

    if (evalSampleModel.structuredSample.webpage.length === 0) {
        evalSampleModel.addNewPage(
            evalSampleModel.structuredSample
        );
    }
    if (evalSampleModel.randomSample.webpage.length === 0) {
        evalSampleModel.addNewPage(
            evalSampleModel.randomSample
        );
    }
});
