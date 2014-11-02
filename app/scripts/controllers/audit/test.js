'use strict'; 

angular.module('wcagReporter') 
.controller('AuditTestCtrl', function ($scope, appState, wcag20spec, Page,
evalScopeModel, evalTestModel, evalSampleModel, $location,
$rootElement, $anchorScroll) {

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

    $scope.openPage = function (clickedPage) {
        Page.openInWindow(clickedPage);
    };

    $scope.nextStep = function () {
        $location.path('/audit/finalize');
    };

    $scope.previousStep = function () {
        $location.path('/audit/sample');
    };

    $scope.nextStepName = 'STEP_REPORT';
    $scope.previousStepName = 'STEP_SAMPLE';


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
    
    $scope.toTop = function () {
        console.log($rootElement);
        $rootElement.focus();
        $anchorScroll();
    };
});