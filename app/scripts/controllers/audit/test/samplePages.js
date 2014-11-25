'use strict';

angular.module('wcagReporter')
.controller('TestSamplePagesCtrl', function ($scope, evalSampleModel, Page) {

	var getSelected = evalSampleModel.getSelectedPages;
	var getPages = evalSampleModel.getPages;

    $scope.structuredSample = evalSampleModel.structuredSample; 
    $scope.randomSample = evalSampleModel.randomSample;

    $scope.allPages = function () {
        return evalSampleModel.getPages();
    };

	$scope.auditSize = getSelected.length;
	$scope.anySelect = $scope.auditSize !== 0;

	$scope.openSelected = function () {
		getSelected().forEach(function (page) {
			Page.openInWindow(page);
		});
	};

    $scope.openPage = function (clickedPage) {
        Page.openInWindow(clickedPage);
    };

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
    	console.log('!!This event does\'t get picked up anymore!!');
        $scope.$broadcast('audit:sample-change');
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

    $scope.nextPages = function () {
    	if ($scope.auditSize === 0) {
    		return;
    	}

    	var selected = getSelected();
    	var pages = getPages();
    	// Find the index of the last selected page
    	var lastIndex = pages.indexOf(selected[$scope.auditSize-1]);

    	// Remove current selection
    	selected.forEach(function (page) {
    		page.selected = false;
    	});

		$scope.anySelect = true;
    	
    	if (lastIndex === pages.length-1) {
    		lastIndex = 0;
    	}

    	for (var i=1; i <= $scope.auditSize; i++) {
    		if (lastIndex + i < pages.length) {
    			pages[lastIndex + i].selected = true;
    		}
    	}
    };

    $scope.prevPages = function () {
    	if ($scope.auditSize === 0) {
    		return;
    	}

    	var selected = getSelected();
    	var pages = getPages();
    	// Find the index of the first selected page
    	var firstIndex = pages.indexOf(selected[0]);

    	// Remove current selection
    	selected.forEach(function (page) {
    		page.selected = false;
    	});

    	$scope.anySelect = true;

    	if (firstIndex === 0) {
    		firstIndex = pages.length;
    	}

    	for (var i=1; i <= $scope.auditSize; i++) {
    		if (firstIndex - i >= 0) {
    			pages[firstIndex - i].selected = true;
    		}
    	}
    };



});