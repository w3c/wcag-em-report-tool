'use strict';

angular.module('wcagReporter')
.controller('AuditExploreCtrl', function ($scope, appState) {
  	$scope.state = appState.moveToState('explore');
  	
});
