'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState, $location,
evalExploreModel, evalSampleModel) {
    $scope.state = appState.moveToState('sample');

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;
    
    $scope.exploreModel = evalExploreModel;

    if ($scope.structuredSample && 
    $scope.structuredSample.webpage.length === 0) {
        evalSampleModel.addNewPage($scope.structuredSample);
    }

    if ($scope.randomSample && 
    $scope.randomSample.webpage.length === 0) {
        evalSampleModel.addNewPage($scope.randomSample);
    }

    $scope.addPage = function (sample) {
        return function () {
            return evalSampleModel.addNewPage(sample);
        };
    };
    $scope.removePage = function (sample) {
        return function (index) {
            evalSampleModel.removePage(sample, index);
            evalExploreModel.updatePages();
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

    $scope.nextStep = function () {
        $location.path('/audit/test');
    };

    $scope.previousStep = function () {
        $location.path('/audit/explore');
    };
});
