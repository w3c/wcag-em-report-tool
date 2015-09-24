'use strict';

angular.module('wcagReporter')
.controller('EvalExploreCtrl', function ($scope, appState, $timeout,
evalExploreModel, evalAuditModel, $location) {

    $scope.state = appState.moveToState('explore');
    $scope.exploreModel = evalExploreModel;
    $scope.knownTech = evalExploreModel.knownTech;

    $scope.updateSpec = function (tech) {
        if (techMap[tech.title]) {
            tech.id = techMap[tech.title];
        }
    };

    var knownTech    = angular.copy(evalExploreModel.knownTech);
    $scope.otherTech = [];
    // set relied upon technologies in the right field
    evalExploreModel.reliedUponTechnology.forEach(function (tech) {
        var index = knownTech
        .reduce(function(index, currTech, currIndex) {
            if (currTech.id === tech.id && currTech.title === tech.title) {
                return currIndex;
            }
            return index;
        }, -1);

        // Set checkboxes for known fields
        if (index !== -1) {
           knownTech[index].checked = true;
        } else {
        // Push the tech to the other tech field
            $scope.otherTech.push(tech);
        }
    });

    // Add an empty field by default
    if ($scope.otherTech.length === 0) {
        $scope.otherTech.push({});
    } else {
        $scope.rootHide.OtherTech = $scope.rootHide.OtherTech || true;
    }

    $scope.techLists = knownTech;

    $scope.changeTech = function (tech) {
        if (tech.checked) {
            evalExploreModel.reliedUponTechnology.push({
                title: tech.title,
                id: tech.id
            });
        } else {
            evalExploreModel.reliedUponTechnology = evalExploreModel.reliedUponTechnology
            .filter(function (item) {
                return item.title !== tech.title && item.id !== tech.id;
            });
        }
    };


    $scope.updateOtherTech = function (tech) {
        var index   = evalExploreModel.reliedUponTechnology.indexOf(tech);
        var isEmpty = !!tech.title || !!tech.id;
        if (index === -1 && isEmpty) {
            evalExploreModel.reliedUponTechnology.push(tech);
        } else if (index !== -1 && !isEmpty) {
            evalExploreModel.reliedUponTechnology.splice(index, 1);
        }
        console.log(evalExploreModel.reliedUponTechnology);
    };


    $scope.addTechnology = function ($event) {
        $scope.otherTech.push({});

        //evalExploreModel.addReliedUponTech();
        var button = angular.element($event.delegateTarget);
        $timeout(function () {
            var inputs = button.prev().find('input');
            inputs[inputs.length-2].select();
        }, 100);
    };


    $scope.removeTechnology = function ($index, $event) {
        var tech = $scope.otherTech[$index];
        var index   = evalExploreModel.reliedUponTechnology.indexOf(tech);
        evalExploreModel.reliedUponTechnology.splice(index, 1);
        $scope.otherTech.splice($index, 1);

        console.log(evalExploreModel.reliedUponTechnology);
        // evalExploreModel.reliedUponTechnology.splice($index,1);
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
