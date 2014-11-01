'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState, $timeout,
evalExploreModel, evalTestModel, $location) {

    $scope.state = appState.moveToState('explore');
    $scope.explore = evalExploreModel;
    $scope.knownTech = evalExploreModel.knownTech;

    if (evalExploreModel.reliedUponTechnology && 
    evalExploreModel.reliedUponTechnology.length === 0) {
        evalExploreModel.addReliedUponTech();
    }

    if (evalExploreModel.commonPages && 
    evalExploreModel.commonPages.length === 0) {
        evalExploreModel.addCommonPage();
    }
    
    if (evalExploreModel.otherRelevantPages && 
    evalExploreModel.otherRelevantPages.length === 0) {
        evalExploreModel.addRelevantPage();
    }
    
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

    $scope.addTechnology = function ($event) {
        $scope.explore.addReliedUponTech();
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

    $scope.getPageAdder = function (prop) {
        return function () {
            var page = evalExploreModel.addPageToProp(evalExploreModel[prop]);
            evalTestModel.addPageForAsserts(page);
        };
    };

    $scope.getPageRemover = function (prop) {
        return function (index) {
            var page = evalExploreModel.removePageFromProp(evalExploreModel[prop], index);
            evalTestModel.removePageFromAsserts(page);
        };
    };

    var techMap = {};
    evalExploreModel.knownTech.forEach(function (knownTech) {
        techMap[knownTech.title] = knownTech.id;
    });
    
    $scope.updateSpec = function (tech) {
        if (techMap[tech.title]) {
            tech.id = techMap[tech.title];
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
