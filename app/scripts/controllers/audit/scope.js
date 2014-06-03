'use strict';

angular.module('wcagReporter')
.controller('AuditScopeCtrl', function ($scope, appState) {
	$scope.state = appState.moveToState('scope');


});
