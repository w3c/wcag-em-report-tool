'use strict';

angular.module('wcagReporter')
.controller('ExportCtrl', function ($scope, wcagReporterExport) {

    $scope.export = wcagReporterExport.getString();
    
});