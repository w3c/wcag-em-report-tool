'use strict';

angular.module('wcagReporter')
.service('evalLoader', function (evalWindow, appState, fileReader, wcagReporterImport, $q) {

	function loadFactory(promiseGen) {
        var importTarget;

        return function () {
            var promise = promiseGen.apply(null, arguments),
            	defer = $q.defer();
            
            function reject(e) {
            	defer.reject(e);
            	importTarget.abort();
            }

            if (!appState.empty) {
                importTarget = evalWindow.openEmptyWindow();
            }  else {
                importTarget = evalWindow;
            }

            promise.then(function (data) {
            	try {
                	importTarget.loadJson(data);
                	appState.setDirtyState();
                	defer.resolve();
            	} catch (e) {
            		reject(e);
            	}
            }, reject);

            return defer.promise;
        };
    }

	return {
		openFromFile: loadFactory(function (file) {
	        return fileReader.readAsText(file);
	    }),

	    openFromUrl: loadFactory(function (url) {
            return wcagReporterImport.getFromUrl()
	    })
	};
});