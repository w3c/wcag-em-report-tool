'use strict';

angular.module('wcagReporter')
  .controller(
    'ReportFindingsCtrl',
    function ($scope, wcag2spec, evalAuditModel, evalScopeModel, CriterionAssert) {
      if (wcag2spec.isLoaded()) {
        $scope.principles = wcag2spec.getPrinciples();
      } else {
        $scope.principles = [];
        wcag2spec.onLangChange(function () {
          $scope.principles = wcag2spec.getPrinciples();
        });
      }

      $scope.auditModel = evalAuditModel;
      $scope.critOpt = {
        editable: false,
        collapsed: false,
        showallpages: false,
        hideCollapseBtn: true
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
    }
  );
