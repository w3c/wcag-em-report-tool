'use strict';

angular.module('wcagReporter')
.controller('ReportCtrl', function ($scope, $document, $interval, $timeout,
		evalModel, wcag20spec, appState, wcagReporterExport) {
	
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
        var blob = wcagReporterExport.makeBlob(
            html, 'text/html;charset=utf-8'
        );
        $document.find('#html_download_link').attr('href', blob);
    });

    $scope.exportHtmlFile = evalModel.reportModel.title.replace(/(^\-+|[^a-zA-Z0-9\/_| -]+|\-+$)/g, '')
    .toLowerCase().replace(/[\/_| -]+/g, '-') + '.html';

    $scope.exportJsonUrl = wcagReporterExport.getBlob();
    $scope.exportJsonFile = wcagReporterExport.getFileName();    
});
