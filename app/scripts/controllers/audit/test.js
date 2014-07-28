'use strict'; 
  
angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, 
             evalScopeModel, evalTestModel, evalSampleModel) {

    evalTestModel.updateToConformance();
    
    $scope.criteria = evalTestModel.getCriteriaSorted();

    $scope.state = appState.moveToState('test'); 

    $scope.structuredSample = evalSampleModel.structuredSample; 
    $scope.randomSample = evalSampleModel.randomSample;

    $scope.allPages = function () {
        return evalSampleModel.getPages();
    };

    $scope.invertPageSelect = function () {
        var pages = $scope.structuredSample.webpage
            .concat($scope.randomSample.webpage);
        pages.forEach(function (page) {
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
    
});