'use strict';

angular.module('wcagReporter')
.controller('ExportCtrl', function ($scope, wcagReporterExport) {

    $scope.exportUrl = wcagReporterExport.getBlob();
    $scope.exportFile = wcagReporterExport.getFileName();
    
});