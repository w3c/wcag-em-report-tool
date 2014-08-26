'use strict';

angular.module('wcagReporter')
.controller('ExportCtrl', function ($scope, wcagReporterExport) {

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
            $scope.failure = (data ? data : true);
            $scope.posted = false;
        });
    };

    $scope.openBlobIE = wcagReporterExport.saveBlobIE;    

    $scope.updateSettings = function () {
        wcagReporterExport.storage.updateSettings();
    };
});
