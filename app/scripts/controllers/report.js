'use strict';

angular.module('wcagReporter')
.controller('ReportCtrl', function ($scope, $document, $interval, $timeout,
		evalModel, wcag20spec, appState, wcagReporterExport) {
	var htmlBlob;

	$scope.state = appState.moveToState('save');
    $scope.scope = evalModel.scopeModel;
    $scope.explore = evalModel.exploreModel;

    $scope.allPages = function () {
        return evalModel.sampleModel.getPages();
    };

    evalModel.testModel.updateToConformance();

    
    $scope.report = evalModel.reportModel;
    var tpl = ['<!DOCTYPE html><html lang="en"><head>' +
    '<title>' + evalModel.reportModel.title +  '</title>' +
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />'+
    '</head><body><div class="container">',  '</div></body></html>'];

    $scope.$on('reportReady', function(e, data) {
        var html = tpl[0] + data.html() + tpl[1];

        htmlBlob = wcagReporterExport.getBlob(
            html, 'text/html;charset=utf-8'
        );
        $document.find('#html_download_link').attr('href',
            wcagReporterExport.getBlobUrl(htmlBlob));
    });

    $scope.downloadJsonStart = function () {
        wcagReporterExport.saveBlobIE();
        appState.setPrestineState();
    };

    $scope.saveHtmlBlobIE = function () {
        if (htmlBlob) {
            wcagReporterExport.saveBlobIE(htmlBlob, $scope.exportHtmlFile);
        }
    };

    $scope.exportHtmlFile = wcagReporterExport.getFileName('html');
    $scope.exportJsonUrl  = wcagReporterExport.getBlobUrl();
    $scope.exportJsonFile = wcagReporterExport.getFileName();

});
