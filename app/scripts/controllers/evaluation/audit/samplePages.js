'use strict';

angular.module('wcagReporter')
  .controller(
    'AuditSamplePagesCtrl',
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
        getSelected()
          .forEach(function (page) {
            Page.openInWindow(page);
          });
      };

      $scope.openPage = Page.openInWindow;

      $scope.changeAll = function () {
        var pages = getPages();
        pages.forEach(function (page) {
          page.selected = $scope.anySelect;
        });
        $scope.sampleChange();
      };

      var previousSelection;
      $scope.multiSelect = function (index, event) {
        if (event.toElement.nodeName.toLowerCase() !== 'input') {
          return;
        }

        if (typeof previousSelection !== 'undefined' && event.shiftKey) {
          var pages = evalSampleModel.getFilledPages();
          var start = Math.min(previousSelection, index);
          var end = Math.max(previousSelection, index);
          var state = pages[index].selected;

          for (var i = start; i <= end; i++) {
            pages[i].selected = state;
          }
          $scope.sampleChange();
        }
        previousSelection = index;
      };

      $scope.sampleChange = function () {
    	var selected = getSelected().length;
    	$scope.auditSize = selected;
    	$scope.anySelect = selected > 0;
        $rootScope.$broadcast('audit:sample-change');
      };

      $scope.completePages = function () {
    	getSelected()
          .forEach(function (page) {
            page.tested = true;
          });
      };

      $scope.uncompletePages = function () {
    	getSelected()
          .forEach(function (page) {
            page.tested = false;
          });
      };
    }
  );
