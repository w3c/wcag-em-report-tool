'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState) {
	var stateIndex = 3;
  	$scope.state = appState;
  	if (appState.currentStateIndex < stateIndex) {
  		appState.currentStateIndex = stateIndex;
  	}

});
