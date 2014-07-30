'use strict';

angular.module('wcagReporter')
.controller('ReportCtrl', function ($scope,
		evalModel, wcag20spec, appState) {
	
	$scope.state = appState.moveToState('save');
    $scope.scope = evalModel.scopeModel;
    $scope.explore = evalModel.exploreModel;

    $scope.allPages = function () {
        return evalModel.sampleModel.getPages();
    };

    $scope.principles = wcag20spec.getPrinciples();

    evalModel.testModel.updateToConformance();
    $scope.getCritAssert = evalModel.testModel.getCritAssert;
    $scope.report = evalModel.reportModel;

});
