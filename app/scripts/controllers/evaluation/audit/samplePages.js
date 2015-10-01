'use strict';

angular.module('wcagReporter')
.controller('AuditSamplePagesCtrl',
function ($scope, evalSampleModel, Page, $rootScope) {

	var getSelected = evalSampleModel.getSelectedPages;
	var getPages = evalSampleModel.getPages;

    $scope.structuredSample = evalSampleModel.structuredSample;
    $scope.randomSample = evalSampleModel.randomSample;


    $scope.filledPages = function () {
        return evalSampleModel.getFilledPages();
    };

	$scope.auditSize = getSelected.length;
	$scope.anySelect = $scope.auditSize !== 0;

	$scope.openSelected = function () {
		getSelected().forEach(function (page) {
			Page.openInWindow(page);
		});
	};

    $scope.openPage = Page.openInWindow;

	$scope.changeAll = function () {
		var pages = getPages();
		pages.forEach(function (page) {
			page.selected = $scope.anySelect;
		});
		$scope.auditSize = ($scope.anySelect ? pages.length : 0);
	};

    $scope.sampleChange = function () {
    	var selected = getSelected().length;
    	$scope.auditSize = selected;
    	$scope.anySelect = selected > 0;
    	// console.log('!!This event does\'t get picked up anymore!!');
        $rootScope.$broadcast('audit:sample-change');
    };

    $scope.completePages = function () {
    	getSelected().forEach(function (page) {
			page.tested = true;
		});
    };

    $scope.uncompletePages = function () {
    	getSelected().forEach(function (page) {
			page.tested = false;
		});
    };

});