'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState, evalExploreModel) {
  	$scope.state = appState.moveToState('explore');
  	$scope.explore = evalExploreModel;

  	$scope.validateInput = function () {
		var errors = evalExploreModel.validate();

		if (errors.length > 0) {
			// display errors
			// prevent default
		} else {
			// continue to next step
		}

		console.log(evalExploreModel);
	};

});
