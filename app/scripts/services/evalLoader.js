'use strict';

angular.module('wcagReporter')
.service('evalLoader', function (evalWindow, appState, fileReader, $http) {

	function loadFactory(promiseGen) {
        var importTarget;

        return function () {
            var promise = promiseGen.apply(null, arguments);

            if (!appState.empty) {
                importTarget = evalWindow.openEmptyWindow();
            }  else {
                importTarget = evalWindow;
            }

            promise.success(function (data) {
                importTarget.loadJson(data);
            });

            promise.error(function () {
                // Show error
                importTarget.abort();
            });

            return promise;
        };
    }

	return {
		openFromFile: loadFactory(function (file) {
	        // return  FileReader promise
	        return fileReader.get(file);
	    }),
	    openFromUrl: loadFactory(function (url) {
	        return $http.get(url);
	    })
	};
});