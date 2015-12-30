'use strict';

angular.module('wcagReporter')
.controller('ViewReportCtrl', function ($scope, $document,
		evalModel, appState, wcagReporterExport, toggleCriterionText) {
	var htmlBlob;

	$scope.state = appState.moveToState('viewReport');
    $scope.scope = evalModel.scopeModel;
    $scope.explore = evalModel.exploreModel;

    $scope.filledPages = function () {
        return evalModel.sampleModel.getFilledPages();
    };

    evalModel.auditModel.updateToConformance();

    

    $scope.report = evalModel.reportModel;
    var tpl = ['<!DOCTYPE html><html lang="en"><head>' +
    '<meta charset="utf-8">' +
    '<title>' + evalModel.reportModel.title +  '</title>' +
    '<script>' + toggleCriterionText.toString() + '</script>' +
    '<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />'+
    '<link rel="stylesheet" href="report.css" />'+
    '</head><body><div class="container reporter-view">',  '</div></body></html>'];

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
