'use strict'; 

angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, $location,
$rootElement, $anchorScroll) {

    $scope.state = appState.moveToState('test'); 

    $scope.nextStep = function () {
        $location.path('/audit/finalize');
    };

    $scope.previousStep = function () {
        $location.path('/audit/sample');
    };

    $scope.nextStepName = 'STEP_REPORT';
    $scope.previousStepName = 'STEP_SAMPLE';
    
    $scope.toTop = function () {
        $rootElement.focus();
        $anchorScroll();
    };
});