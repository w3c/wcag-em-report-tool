'use strict';

angular.module('wcagReporter')
.controller('EvalAuditCtrl', function ($scope, appState, $location) {

    $scope.state = appState.moveToState('audit');

    $scope.nextStep = function () {
        $location.path('/evaluation/report');
    };

    $scope.previousStep = function () {
        $location.path('/evaluation/sample');
    };

    $scope.nextStepName = 'STEP_REPORT';
    $scope.previousStepName = 'STEP_SAMPLE';

    /*
    evalTestModel.updateToConformance();

    $scope.criteria = evalTestModel.getCriteriaSorted();

    $scope.state = appState.moveToState('test');
    $scope.principles = wcag20spec.getPrinciples();

    $scope.sampleChange = function () {
        $scope.$broadcast('audit:sample-change');
    };

    $scope.getCritAssert = evalTestModel.getCritAssert;

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;

    $scope.filledPages = function () {
        //console.log(evalSampleModel.getFilledPages());
        return evalSampleModel.getFilledPages();
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
    */
});