'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState, 
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
        evalExploreModel.addPageToProp(evalExploreModel.commonPages);
    }
    
    if (evalExploreModel.otherRelevantPages && 
    evalExploreModel.otherRelevantPages.length === 0) {
        evalExploreModel.addPageToProp(evalExploreModel.otherRelevantPages);
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

    $scope.addTechnology = function () {
        $scope.explore.addReliedUponTech();
    };

    $scope.addPage = function (prop) {
        return function () {
            var page = evalExploreModel.addPageToProp(evalExploreModel[prop]);
            evalTestModel.addPageForAsserts(page);
        };
    };

    $scope.removePage = function (prop) {
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
