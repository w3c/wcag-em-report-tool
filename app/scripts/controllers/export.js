'use strict';

angular.module('wcagReporter')
.controller('ExportCtrl', function ($scope, wcagReporterExport) {

    $scope.export = wcagReporterExport.getString();
    $scope.exportUrl = wcagReporterExport.getBlob();
    $scope.exportFile = wcagReporterExport.getFileName();
    
});