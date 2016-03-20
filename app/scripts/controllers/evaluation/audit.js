'use strict';

angular.module('wcagReporter')
.controller('EvalAuditCtrl', function ($scope, appState, partialImport) {

    $scope.state = appState.moveToState('audit');
    $scope.importExternal = function () {
    	partialImport(window.importData);
    };
});