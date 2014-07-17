'use strict'; 
  
angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, 
             evalTestModel, evalSampleModel, wcag20spec) { 
    $scope.state = appState.moveToState('test'); 
      
    $scope.structuredSample = evalSampleModel.structuredSample; 
    $scope.randomSample = evalSampleModel.randomSample;
  
    $scope.wcag20spec = wcag20spec; 
    $scope.criteria = [];

    /**
     * Add a detail for each sample page to each success criteiron
     */
    $scope.addAllDetails = function () {
        var sample = $scope.structuredSample.webpage
            .concat($scope.randomSample.webpage);

        Object.keys(evalTestModel.criteria).forEach(function (key) {
            var criterion = evalTestModel.criteria[key];
            sample.forEach(function (page) {
                criterion.addTestCaseAssertion({
                    subject: [page]
                });
            });
        });
    };

    $scope.getAssert = function (criterion) {
        return evalTestModel.getResult(criterion.uri);
    };
    
    wcag20spec.forEach(function(principle) {
        principle.guidelines.forEach(function (guideline) {
            $scope.criteria = $scope.criteria.concat(guideline.criteria);
        });
    });
    
});