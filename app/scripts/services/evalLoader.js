'use strict';

angular.module('wcagReporter')
  .service('evalLoader', function (evalWindow, appState, fileReader, wcagReporterImport, $q) {
    function loadFactory (promiseGen) {
      var importTarget;

      return function () {
        var promise = promiseGen.apply(null, arguments);
        var defer = $q.defer();

        function reject (e) {
          defer.reject(e);
          if (importTarget) {
            importTarget.abort();
          }
        }

        if (!appState.empty) {
          try {
            importTarget = evalWindow.openEmptyWindow();
          } catch (e) {
            reject('Popup blocker detected. Please allow popups so the evaluation can open in a new window.');
          }
        } else {
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

      openFromUrl: loadFactory(function () {
        return wcagReporterImport.getFromUrl();
      })
    };
  });
