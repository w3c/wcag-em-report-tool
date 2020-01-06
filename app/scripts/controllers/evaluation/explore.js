'use strict';

angular
  .module('wcagReporter')
  .controller('EvalExploreCtrl', function (
    $scope,
    appState,
    $timeout,
    evalExploreModel
  ) {
    $scope.state = appState.moveToState('explore');
    $scope.exploreModel = evalExploreModel;

    $scope.updateSpec = function (tech) {
      if (techMap[tech.title]) {
        tech.id = techMap[tech.title];
      }
    };

    $scope.knownTech = angular.copy(evalExploreModel.knownTech);
    $scope.otherTech = [];

    // set relied upon technologies in the right field
    evalExploreModel.reliedUponTechnology
      .forEach(function (tech) {
        var index = $scope.knownTech
          // Find exact matching index in knownTech of reliedUponTechnology
          // it will be an user defined technology otherwise
          .reduce(function (index, currTech, currIndex) {
            if (currTech.id === tech.id && currTech.title === tech.title) {
              return currIndex;
            }
            return index;
          }, -1);

        // Set checkboxes for known fields
        if (index !== -1) {
          $scope.knownTech[index].checked = true;
        } else {
        // Push the tech to the other tech field (it is user defined)
          $scope.otherTech.push(tech);
        }
      });

    // Add an empty field by default
    if ($scope.otherTech.length === 0) {
      $scope.otherTech.push({ type: 'Technology' });
    } else {
      $scope.rootHide.OtherTech = $scope.rootHide.OtherTech || true;
    }

    $scope.changeTech = function (tech) {
      if (tech.checked) {
        var newTech = angular.extend({}, tech);
        delete newTech.checked;
        evalExploreModel.reliedUponTechnology.push(newTech);
      } else {
        evalExploreModel.reliedUponTechnology = evalExploreModel.reliedUponTechnology
          .filter(function (item) {
            return item.title !== tech.title && item.id !== tech.id;
          });
      }
    };

    $scope.updateOtherTech = function (tech) {
      var index = evalExploreModel.reliedUponTechnology.indexOf(tech);
      var isEmpty = !tech.title && !tech.id;
      if (index === -1 && !isEmpty) {
        evalExploreModel.reliedUponTechnology.push(tech);
      } else if (index !== -1 && isEmpty) {
        evalExploreModel.reliedUponTechnology.splice(index, 1);
      }
    };

    $scope.addTechnology = function ($event) {
      $scope.otherTech.push({ type: 'Technology' });

      // evalExploreModel.addReliedUponTech();
      if ($event) {
        var button = angular.element($event.delegateTarget);

        $timeout(function () {
          var inputs = button.prev()
            .find('input');

          if (inputs.length > 0) {
            inputs[0].select();
          }
        });
      }
    };

    $scope.removeTechnology = function ($index, $event) {
      var tech = $scope.otherTech[$index];
      var index = evalExploreModel.reliedUponTechnology.indexOf(tech);
      evalExploreModel.reliedUponTechnology.splice(index, 1);
      $scope.otherTech.splice($index, 1);

      // evalExploreModel.reliedUponTechnology.splice($index,1);
      // We need this timeout to prevent Angular UI from throwing an error
      if ($event) {
        $timeout(function () {
          angular.element($event.delegateTarget)
            .closest('fieldset')
            .parent()
            .children()
            .last()
            .focus();
        });
      }
    };

    var techMap = {};
    $scope.knownTech.forEach(function (knownTech) {
      techMap[knownTech.title] = knownTech.id;
    });
  });
