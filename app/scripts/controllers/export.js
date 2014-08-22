'use strict';
window.rnd = Math.ceil(Math.random() * 1000000);
console.log("REMOVE ME PLZ");

angular.module('wcagReporter')
.controller('ExportCtrl', function ($scope, wcagReporterExport, reportStorage) {

    $scope.exportUrl = wcagReporterExport.getBlob();
    $scope.exportFile = wcagReporterExport.getFileName();
    $scope.postSettings = reportStorage.settings;
    $scope.posted = false;
    $scope.failure = false;
    $scope.success = false;
    $scope.postSettings.url = 'https://wcag-em-reporter-tool.iriscouch.com/reports/' +
                                window.rnd;
    $scope.postJson = function () {
        $scope.posted = true;
        $scope.failure = false;

        reportStorage.post()
        .success(function () {
            $scope.success = true;
            $scope.posted = false;
        })
        .error(function (data) {
            $scope.failure = (data ? data : true);
            $scope.posted = false;
        });
    };

});