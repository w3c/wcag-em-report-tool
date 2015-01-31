'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState, $location, $timeout,
evalExploreModel, evalSampleModel, evalTestModel) {
    $scope.state = appState.moveToState('sample');

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;
    
    $scope.exploreModel = evalExploreModel;
    $scope.knownTech = evalExploreModel.knownTech;

    if ($scope.structuredSample && 
    $scope.structuredSample.webpage.length === 0) {
        evalSampleModel.addNewStructuredPage();
    }

    if ($scope.randomSample && 
    $scope.randomSample.webpage.length === 0) {
        evalSampleModel.addNewRandomPage();
    }

    if (evalExploreModel.reliedUponTechnology && 
    evalExploreModel.reliedUponTechnology.length === 0) {
        evalExploreModel.addReliedUponTech();
    }

    $scope.getPageAdder = function (sample) {
        return function () {
            var page = evalSampleModel.addNewPage(sample);
            evalTestModel.addPageForAsserts(page);
            return page;
        };
    };

    $scope.getPageRemover = function (sample) {
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

    
    $scope.updateSpec = function (tech) {
        if (techMap[tech.title]) {
            tech.id = techMap[tech.title];
        }
    };



    $scope.addTechnology = function ($event) {
        evalExploreModel.addReliedUponTech();
        var button = angular.element($event.delegateTarget);
        $timeout(function () {
            var inputs = button.prev().find('input');
            inputs[inputs.length-2].select();
        }, 100);
    };

    $scope.removeTechnology = function ($index, $event) {
        evalExploreModel.reliedUponTechnology.splice($index,1);
        // We need this timeout to prevent Angular UI from throwing an error
        $timeout(function () {
            angular.element($event.delegateTarget)
            .closest('fieldset').parent()
            .children().last()
            .focus();
        });
    };

    var techMap = {};
    evalExploreModel.knownTech.forEach(function (knownTech) {
        techMap[knownTech.title] = knownTech.id;
    });


    $scope.nextStep = function () {
        $location.path('/audit/test');
    };

    $scope.previousStep = function () {
        $location.path('/audit/explore');
    };

    $scope.nextStepName = 'STEP_AUDIT';
    $scope.previousStepName = 'STEP_EXPLORE';

});
