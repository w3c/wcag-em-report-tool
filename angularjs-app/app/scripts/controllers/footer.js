'use strict';

angular.module('wcagReporter')
  .controller(
    'FooterCtrl',
    function ($scope, pkgData) {
      $scope.pkg = pkgData;
    }
  );
