'use strict';

angular.module('wcagReporter')
.controller('AuditScopeCtrl', function ($scope, appState, 
evalScopeModel, $location, $filter) {
	$scope.state = appState.moveToState('scope');
	$scope.evalScope = evalScopeModel;

	$scope.conformanceOptions = evalScopeModel.conformanceOptions
	.reduce(function (tgt, lvl) {
		tgt[lvl] = $filter('rdfToLabel')(lvl);
		return tgt;
	}, {});

	$scope.processInput = function () {
		var errors = evalScopeModel.validate();

		if (errors.length > 0) {
			// display errors
			// prevent default
		} else {
			// continue to next step
		}
	};

    $scope.nextStep = function () {
        $location.path('/audit/explore');
    };

    $scope.previousStep = function () {
        $location.path('/');
    };

    $scope.nextStepName = 'STEP_EXPLORE';
    $scope.previousStepName = 'STEP_START';

});
