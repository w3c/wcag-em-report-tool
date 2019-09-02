'use strict';

angular.module('wcagReporter')
  .controller(
    'EvalReportCtrl',
    function ($scope, appState, evalReportModel) {
      $scope.state = appState.moveToState('report');
      $scope.reportModel = evalReportModel;
    }
  );
