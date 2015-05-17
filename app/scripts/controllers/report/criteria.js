'use strict';

angular.module('wcagReporter')
.controller('ReportCriteriaCtrl', function ($scope, wcag20spec, evalAuditModel) {

    evalAuditModel.updateToConformance();

    $scope.principles = wcag20spec.getPrinciples();
    $scope.testModel = evalAuditModel;
    $scope.critOpt = {
        editable: false,       collapsed: false,
        showallpages: false,   hideCollapseBtn: true
    };

    $scope.getCritAssert = evalAuditModel.getCritAssert;

});