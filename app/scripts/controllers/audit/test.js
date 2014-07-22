'use strict'; 
  
angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, 
             evalTestModel, evalSampleModel, wcag20spec) { 
    $scope.state = appState.moveToState('test'); 
      
    $scope.structuredSample = evalSampleModel.structuredSample; 
    $scope.randomSample = evalSampleModel.randomSample;
  
    $scope.wcag20spec = wcag20spec; 
    $scope.criteria = [];
    $scope.allPages = function () {
        return evalSampleModel.getPages();
    };

    $scope.invertPageSelect = function () {
        var pages = $scope.structuredSample.webpage
            .concat($scope.randomSample.webpage);
        pages.forEach(function (page) {
            console.log(page.selected);
            page.selected = !page.selected;
        });
    };

    $scope.completeSelected = function () {
        var pages = $scope.structuredSample.webpage
            .concat($scope.randomSample.webpage);
        pages.forEach(function (page) {
            if (page.selected) {
                page.tested = true;
            }
        });
    };

    $scope.incompleteSelected = function () {
        var pages = $scope.structuredSample.webpage
            .concat($scope.randomSample.webpage);
        pages.forEach(function (page) {
            if (page.selected) {
                page.tested = false;
            }
        });
    };

    $scope.getAssert = function (criterion) {
        return evalTestModel.getResult('wcag20:' + criterion.uri.substr(1));
    };
    
    wcag20spec.forEach(function(principle) {
        principle.guidelines.forEach(function (guideline) {
            $scope.criteria = $scope.criteria.concat(guideline.criteria);
        });
    });
    
});