'use strict';

angular.module('wcagReporter')
.controller('AuditTestCtrl', function ($scope, appState) {
    $scope.state = appState.moveToState('test');
    
});
