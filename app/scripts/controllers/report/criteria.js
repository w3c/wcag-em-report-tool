'use strict';

angular.module('wcagReporter')
.controller('ReportCriteriaCtrl',
function ($scope, wcag20spec, evalAuditModel, evalScopeModel, CriterionAssert) {

    evalAuditModel.updateToConformance();

    $scope.principles = wcag20spec.getPrinciples();
    $scope.auditModel = evalAuditModel;
    $scope.critOpt = {
        editable: false,       collapsed: false,
        showallpages: false,   hideCollapseBtn: true
    };

    $scope.getCritAssert = evalAuditModel.getCritAssert;
    $scope.shouldCritRender = function (critSpec) {
        if (evalScopeModel.matchConformTarget(critSpec.level)) {
            return true;

        } else {
            var critAssert = $scope.getCritAssert(critSpec.id);
            return CriterionAssert.isDefined(critAssert);
        }
    };
});