'use strict';

angular.module('wcagReporter')
.controller('ExportCtrl', function ($scope, wcagReporterExport, reportStorage) {

    $scope.exportUrl = wcagReporterExport.getBlob();
    $scope.exportFile = wcagReporterExport.getFileName();
    $scope.url = 'http://example.com/?a11y=1234';
    $scope.postJson = function (url) {
    	var q = reportStorage.post(url);
    	q.success(function (data, status, headers, config) {
    		console.log(data, status, headers, config);

    	}).error(function (data, status, headers, config) {
    		console.log(data, status, headers, config);
    	});
    };

});