'use strict';

angular.module('wcagReporter')
  .service('reportStorage', function ($http, $rootScope, appState, $timeout) {
    var reportStorage; var autosave; var loading;
    var failedSaveAttempts = 0;
    var settings = {
      url: undefined,
      revisionId: undefined,
      autosave: false,
      saveDelay: 3000
    };

    function startAutosave () {
      if (!settings.url) {
        settings.autosave = false;
        return;
      }
      autosave = $timeout(function autosaveFunc () {
        reportStorage.exportModel.saveToUrl()
          .then(function () {
            failedSaveAttempts = 0;
          }, function () {
            failedSaveAttempts += 1;
            if (settings.autosave) {
              autosave = $timeout(
                autosaveFunc,
                settings.saveDelay * failedSaveAttempts,
                0,
                false
              );
            }
          });
      }, settings.saveDelay, 0, false);
    }

    $rootScope.$on('appstate:prestine', function () {
      if (autosave) {
        $timeout.cancel(autosave);
        autosave = undefined;
      }
    });

    $rootScope.$on('appstate:dirty', function () {
      if (settings.autosave && autosave === undefined) {
        startAutosave();
      }
    });

    reportStorage = {
      settings: settings,

      exportModel: undefined,

      init: function (obj) {
        reportStorage.updateSettings(obj);
      },

      updateSettings: function (obj) {
        if (obj) {
          angular.extend(settings, obj);
        }

        if (settings.autosave && loading) {
          loading.then(startAutosave);
        } else if (settings.autosave) {
          startAutosave();
        }
      },

      post: function (json) {
        if (settings.revisionId) {
          json._rev = settings.revisionId;
        }
        return $http.put(settings.url, json, {}, {
          withCredentials: true
        })
          .then(function (response) {
            if (response && response.data && response.data.rev) {
              settings.revisionId = response.data.rev;
            }
            appState.setPrestineState();
            return response.data;
          });
      },

      get: function () {
        $timeout.cancel(autosave);
        loading = $http.get(settings.url, {}, {
          withCredentials: true
        })
          .then(function (response) {
            if (response.data._rev) {
              settings.revisionId = response.data._rev;
            }
            appState.setPrestineState();
            return response.data;
          });
        return loading;
      }
    };

    return reportStorage;
  });
