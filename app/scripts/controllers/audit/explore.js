'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState, evalExploreModel) {
  	$scope.state = appState.moveToState('explore');
  	$scope.explore = evalExploreModel;
  	$scope.knownTech = evalExploreModel.knownTech;
  	if (evalExploreModel.reliedUponTechnology.length === 0) {
  		evalExploreModel.addReliedUponTech();
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

	$scope.addPage =    function (pages) {
		console.log('add page');
	};

	$scope.removePage = function (pages) {
		console.log('Remove page');
	};
});
