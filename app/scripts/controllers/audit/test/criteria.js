'use strict';

angular.module('wcagReporter')
.controller('TestPrinciplesCtrl', function ($scope, evalTestModel, wcag20spec) {

    evalTestModel.updateToConformance();

    $scope.criteria = evalTestModel.getCriteriaSorted();
    $scope.principles = wcag20spec.getPrinciples();

    $scope.getCritAssert = evalTestModel.getCritAssert;

    $scope.isCriterionVisible = function (critSpec) {
    	return evalTestModel.getCritAssert(critSpec.uri);
    };

    $scope.isGuidelineVisible = function () {
    	return true;
    };

    $scope.isPrincipleVisible = function () {
    	return true;
    };

});