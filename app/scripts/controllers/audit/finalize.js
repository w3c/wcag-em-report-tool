'use strict';

angular.module('wcagReporter')
		.controller('AuditFinalizeCtrl', function (
			$scope, appState, evalReportModel, evalTestModel) {

  	$scope.state = appState.moveToState('finalize');
  	$scope.report = evalReportModel;

  	evalTestModel.updateToConformance();
  	$scope.criteria = evalTestModel.getCriteriaSorted();

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

