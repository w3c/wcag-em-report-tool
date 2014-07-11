'use strict';

angular.module('wcagReporter')
		.controller('AuditFinalizeCtrl', function (
			$scope, appState, evalFinalizeModel) {
  	$scope.state = appState.moveToState('finalize');
  	
});

