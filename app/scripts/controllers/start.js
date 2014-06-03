'use strict';

angular.module('wcagReporter')
.controller('StartCtrl', function ($scope, appState) {
  	$scope.state = appState.moveToState('start');
  	
});
