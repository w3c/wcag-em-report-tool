'use strict';

angular.module('wcagReporter')
		.controller('AuditFinalizeCtrl', function (
			$scope, appState, evalReportModel) {
  	$scope.state = appState.moveToState('finalize');
  	$scope.report = evalReportModel;

  	$scope.processInput = function () {
		var errors = evalReportModel.validate();

		if (errors.length > 0) {
			// display errors
			// prevent default
		} else {
			evalReportModel.updateSample();
			// continue to next step
		}
		console.log(evalReportModel);
	};
});

