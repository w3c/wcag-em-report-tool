'use strict';

function setupwcagReporterTest () {
  beforeEach(module(
    'wcagReporter',
    function ($provide, $translateProvider) {
      $provide.factory('customLoader', function ($q) {
        return function () {
          var deferred = $q.defer();
          deferred.resolve({});
          return deferred.promise;
        };
      });
      $translateProvider.useLoader('customLoader');
    }
  ));

  beforeEach(module('wertDummy'));
}
