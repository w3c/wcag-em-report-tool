'use strict';

angular.module('wcagReporter')
.controller('ReportCriteriaCtrl', function ($scope, wcag20spec, evalTestModel) {

    evalTestModel.updateToConformance();

    $scope.principles = wcag20spec.getPrinciples();
    $scope.testModel = evalTestModel;
    $scope.critOpt = {
        editable: false,       collapsed: false,
        showallpages: false,   hideCollapseBtn: true
    };

    $scope.getCritAssert = evalTestModel.getCritAssert;
    
});