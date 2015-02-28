'use strict';

angular.module('wcagReporter')
.controller('EvalExploreCtrl', function ($scope, appState, $timeout,
evalExploreModel, evalTestModel, $location) {

    $scope.state = appState.moveToState('explore');
    $scope.exploreModel = evalExploreModel;
    $scope.knownTech = evalExploreModel.knownTech;

    if (evalExploreModel.reliedUponTechnology &&
    evalExploreModel.reliedUponTechnology.length === 0) {
        evalExploreModel.addReliedUponTech();
    }

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
        $location.path('/evaluation/sample');
    };

    $scope.previousStep = function () {
        $location.path('/evaluation/scope');
    };

    $scope.nextStepName = 'STEP_SAMPLE';
    $scope.previousStepName = 'STEP_SCOPE';

});
