'use strict';

angular.module('wcagReporter')
  .controller('SaveCtrl', function ($scope, wcagReporterExport, appState) {
    $scope.exportUrl = wcagReporterExport.getBlobUrl();
    $scope.exportFile = wcagReporterExport.getFileName();
    $scope.postSettings = wcagReporterExport.storage.settings;
    $scope.posted = false;
    $scope.failure = false;
    $scope.success = false;

    $scope.postJson = function () {
      $scope.posted = true;
      $scope.failure = false;

      wcagReporterExport.saveToUrl()
        .then(function () {
          $scope.success = true;
          $scope.posted = false;
        }, function (data) {
          $scope.failure = (data || true);
          $scope.posted = false;
        });
    };

    $scope.downloadStart = function () {
      wcagReporterExport.saveBlobIE();
      appState.setPrestineState();
    };

    $scope.updateSettings = function () {
      wcagReporterExport.storage.updateSettings();
    };
  });
