'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState, $location,
evalExploreModel, evalSampleModel, evalTestModel) {
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
            var page = evalSampleModel.addNewPage(sample);
            evalTestModel.addPageForAsserts(page);
            return page;
        };
    };

    $scope.removePage = function (sample) {
        return function (index) {
            var page = evalSampleModel.removePage(sample, index);
            evalTestModel.removePageFromAsserts(page);
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

    $scope.nextStepName = 'STEP_AUDIT';
    $scope.previousStepName = 'STEP_EXPLORE';

});
