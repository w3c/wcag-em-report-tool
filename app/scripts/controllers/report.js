'use strict';

angular.module('wcagReporter')
.controller('ReportCtrl', function ($scope, $document,
		evalModel, wcag20spec, appState, wcagReporterExport) {
	
	$scope.state = appState.moveToState('save');
    $scope.scope = evalModel.scopeModel;
    $scope.explore = evalModel.exploreModel;

    $scope.allPages = function () {
        return evalModel.sampleModel.getPages();
    };

    evalModel.testModel.updateToConformance();
    
    $scope.report = evalModel.reportModel;

    $scope.getHtml = function () {
        var str = (window.URL || window.webkitURL)
        // Create a blob for that URL
        .createObjectURL(new Blob(
            // Using the JSON from getString()
            [ $document.find('#final_report').html() ],
            { type : 'text/html;charset=utf-8' }
        ));
        console.log(str);
    };

    $scope.exportJsonUrl = wcagReporterExport.getBlob();
    $scope.exportJsonFile = wcagReporterExport.getFileName();    

});
