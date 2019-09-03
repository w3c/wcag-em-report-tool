'use strict';

angular.module('wcagReporter')
  .service('evalWindow', function ($http, wcagReporterImport, $rootScope) {
    var curWindow;
    var waitingForEvaluation = 'waitingForEvaluation';
    var loadEvaluationData = 'loadEvaluationData';
    var evaluateDataWhenReady = 'evaluateDataWhenReady';

    function EvalWindow () {}

    EvalWindow.prototype = {
      openEmptyWindow: function () {
        var newRunner = new EvalWindow();
        var newWindow = window.open(window.location.href, '_blank');

        newWindow[waitingForEvaluation] = true;

        // open a window
        newRunner.abort = function () {
          newWindow.close();
        };

        newRunner.loadJson = function (data) {
          if (newWindow[loadEvaluationData]) {
            newWindow[loadEvaluationData](data);
          } else {
            newWindow[evaluateDataWhenReady] = data;
          }
          // Tell the new window where to look
        };

        return newRunner;
      },

      loadJson: function (data) {
        wcagReporterImport.fromJson(data);
      },

      abort: angular.noop
    };

    function processPageData (data) {
    	curWindow.loadJson(data);
      $rootScope.setEvalLocation();
    }

    curWindow = new EvalWindow();

    if (window[waitingForEvaluation]) {
      window[waitingForEvaluation] = undefined;

      if (window[evaluateDataWhenReady]) {
        processPageData(window[evaluateDataWhenReady]);
    	} else {
    		window[loadEvaluationData] = processPageData;
    	}
    }

    return curWindow;
  });
