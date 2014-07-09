'use strict'; 
  
angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, evalSampleModel, wcag20spec) { 
    $scope.state = appState.moveToState('test'); 
      
    $scope.structuredSample = evalSampleModel.structuredSample; 
    $scope.randomSample = evalSampleModel.randomSample; 
  
    $scope.wcag20spec = wcag20spec; 
    $scope.criteria = [];
    
    wcag20spec.forEach(function(principle) {
        principle.guidelines.forEach(function (guideline) {
            $scope.criteria = $scope.criteria.concat(guideline.criteria);
        });
    });
    
}); 