'use strict';

angular.module('wcagReporter')
.controller('AuditFinalizeCtrl', function ($scope, appState) {
  	$scope.state = appState.moveToState('finalize');
  	
});

