'use strict';

angular
  .module('wcagReporter')
  .controller('ImportCtrl', function (
    $scope,
    $rootScope
  ) {
    var FEEDBACK = {
      ERROR: {
        type: 'error',
        message: 'Import error'
      },
      PENDING: {
        type: 'info',
        message: 'Import pending...'
      },
      SUCCESS: {
        type: 'success',
        message: 'Import successfull'
      }
    };

    $scope.feedback = false;
    $scope.importFile = {};

    /**
     * Try to load a file and progress to 1
     * Send feedback on what happens
     * @param  {String} source Url to file
     * @return {Object}        File that loaded
     */
    $scope.loadFile = function loadFile (source) {
      $scope.feedback = FEEDBACK.PENDING;

      try {
        $scope.importFile = source;
        $scope.feedback = FEEDBACK.SUCCESS;
      } catch (error) {
        $scope.feedback = FEEDBACK.ERROR;
      }
      $scope.$apply();
    };
  });
