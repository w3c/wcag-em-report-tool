'use strict';

angular.module('wcagReporter')
.controller('AuditScopeCtrl', function ($scope, appState) {
	var stateIndex = 1;
  	$scope.state = appState;
  	if (appState.currentStateIndex < stateIndex) {
  		appState.currentStateIndex = stateIndex;
  	}


});
