'use strict';

angular.module('wcagReporter')
.controller('StartCtrl',
function ($scope, $location, appState, $timeout, $rootScope) {
  	$scope.state = appState.moveToState('start');
    
    if (typeof $rootScope.rootHide.start1 === 'undefined') {
        $scope.initial = 'hidden';
        console.log($scope.initial);
        $timeout(function () {
            console.log($scope.initial);
            $scope.initial = '';
        }, 500);
        $timeout(function () {
            console.log($scope.initial);
            $rootScope.rootHide.start1 = false;
        }, 700);
    }

    $scope.nextStep = function () {
        $location.path('/evaluation/scope');
    };

    $scope.nextStepName = 'STEP_SCOPE';

});
