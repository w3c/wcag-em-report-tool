'use strict';

angular.module('wcagReporter')
.controller('ImportCtrl', function ($scope, $location, 
        appState, wcagReporterImport) {
    var newWindow, reader;

    function setEvalData(data) {
        wcagReporterImport.fromJson(data);
        $location.path('/audit/scope');
        appState.setDirtyState();
        
        delete window.evalData;
        delete window.setEvalData;
        delete window.loadingEvaluation;
    }


    try {
        reader = new FileReader();
        reader.addEventListener('load', function(event) {
            var textFile = event.target;
            if (newWindow) {
                if (typeof newWindow.setEvalData === 'function') {
                    newWindow.setEvalData(textFile.result);
                } else {
                    newWindow.evalData = textFile.result;
                }
                
                newWindow = undefined;
            } else {
                setEvalData(textFile.result);
            }
        });

    } catch (e) {
        $scope.showError = 'ERR_NO_SUPPORT';
    }

    if (window.loadingEvaluation) {
        delete window.loadingEvaluation;
        if (window.evalData) {
            setEvalData(window.evalData);
        } else {
            window.setEvalData = setEvalData;
        }
        
    }

    $scope.showError = false;
    $scope.loadFile = function () {
        var file = window.jQuery('#load_json')[0].files[0];
        if (!file) {
            $scope.showError = 'ERR_NO_FILE';
            return;
        } else if (reader) {
            $scope.showError = false;
            if (!appState.empty) {
                newWindow = window.open(window.location.href, '_blank');
                if (typeof newWindow === 'undefined') {
                    window.alert('Please disable popup blocker');
                } else {
                    newWindow.focus();
                    newWindow.loadingEvaluation = true;
                }
            }
            reader.readAsText(file);
        }
    };
});
