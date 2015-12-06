'use strict';

function setupwcagReporterTest() {
	return module('wcagReporter', function ($provide, $translateProvider) {
       $provide.factory('customLoader', function ($q) {
        return function () {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        };
      });
      $translateProvider.useLoader('customLoader');
    });
}