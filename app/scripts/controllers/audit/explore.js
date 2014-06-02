'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState) {
  	var stateIndex = 2;
  	$scope.state = appState;
  	if (appState.currentStateIndex < stateIndex) {
  		appState.currentStateIndex = stateIndex;
  	}
  	
});
