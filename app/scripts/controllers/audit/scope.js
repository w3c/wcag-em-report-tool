'use strict';

angular.module('wcagReporter')
.controller('AuditScopeCtrl', function ($scope, appState, evalScopeModel) {
	$scope.state = appState.moveToState('scope');
	$scope.evalScope = evalScopeModel;

	$scope.processInput = function () {
		var errors = evalScopeModel.validate();

		if (errors.length > 0) {
			// display errors
			// prevent default
		} else {
			// continue to next step
		}
	};

});
