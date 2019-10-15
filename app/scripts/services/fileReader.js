/**
  * Original module by K. Scott Allen
 * http://odetocode.com/blogs/scott/archive/2013/07/03/building-a-filereader-service-for-angularjs-the-service.aspx
 */
(function (module) {
  'use strict';

  var fileReader = function ($q, $rootScope) {
    var onLoad = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };

    var onProgress = function (reader, scope) {
      return function (event) {
        scope.$broadcast(
          'fileProgress',
          {
            total: event.total,
            loaded: event.loaded
          }
        );
      };
    };

    var getReader = function (deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
    };

    var readAsText = function (file, scope) {
      scope = scope || $rootScope;
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);

      scope.$evalAsync(function () {
        try {
          reader.readAsText(file);
        } catch (e) {
          deferred.reject(e);
        }
      });

      return deferred.promise;
    };

    var readAsDataURL = function (file, scope) {
      scope = scope || $rootScope;
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);

      scope.$evalAsync(function () {
        try {
          reader.readAsDataURL(file);
        } catch (e) {
          deferred.reject(e);
        }
      });

      return deferred.promise;
    };

    return {
      readAsDataUrl: readAsDataURL,
      readAsText: readAsText
    };
  };

  module.factory('fileReader', [
    '$q',
    '$rootScope',
    fileReader
  ]);
}(angular.module('wcagReporter')));
