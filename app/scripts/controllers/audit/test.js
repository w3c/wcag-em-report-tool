'use strict'; 

angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, wcag20spec,
             evalScopeModel, evalTestModel, evalSampleModel) {

    evalTestModel.updateToConformance();

    $scope.criteria = evalTestModel.getCriteriaSorted();

    $scope.state = appState.moveToState('test'); 
    $scope.principles = wcag20spec.getPrinciples();


    $scope.getCritAssert = evalTestModel.getCritAssert;

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