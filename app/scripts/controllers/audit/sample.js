'use strict';

angular.module('wcagReporter')
.controller('AuditSampleCtrl', function ($scope, appState) {
	$scope.state = appState.moveToState('sample');

});
