'use strict';

angular.module('wcagReporter')
		.controller('AuditFinalizeCtrl', function (
			$scope, appState, evalSampleModel, 
			evalReportModel, evalTestModel,
			wcag20spec) {

  	$scope.state = appState.moveToState('finalize');
  	$scope.report = evalReportModel;
  	$scope.principles = wcag20spec.getPrinciples();

  	evalTestModel.updateToConformance();
  	$scope.getCritAssert = evalTestModel.getCritAssert;

  	$scope.allPages = function () {
  		return evalSampleModel.getPages();
  	};

  	$scope.processInput = function () {
		var errors = evalReportModel.validate();

		if (errors.length > 0) {
			// display errors
			// prevent default
		} else {
			evalReportModel.updateSample();
			// continue to next step
		}
	};
});

