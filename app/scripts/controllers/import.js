'use strict';

angular
  .module('wcagReporter')
  .controller('ImportCtrl', function (
    fileReader,
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
    $scope.importFile = undefined;
    $scope.importConfirmed = undefined;

    function resetImport () {
      $scope.feedback = false;
      $scope.importFile = undefined;
      $scope.importConfirmed = undefined;
    }

    function handleLoad (defer, feedback) {
      defer.then(
        function success (result) {
          $scope.importFile.body = result;
          feedback = false;
        },
        function error (e) {
          feedback = FEEDBACK.ERROR;
          if (e.message) {
            feedback.message = e.message;
          } else {
            feedback.message = e;
          }
        }
      );
    }

    $scope.loadFile = function loadFile (source) {
      $scope.feedback = FEEDBACK.PENDING;
      $scope.importFile = {
        name: source.name
      };

      handleLoad(fileReader.readAsText(source, $scope), $scope.feedback);
    };

    $scope.handleConfirmation = function handleConfirmation (confirmed) {
      if (confirmed === undefined) {
        confirmed = false;
      }

      if (confirmed) {
        $scope.importConfirmed = confirmed;
        $scope.feedback = FEEDBACK.SUCCESS;
      } else {
        resetImport();
      }
    };

    $scope.handleDoneClick = function handleDoneClick () {
      $rootScope.setEvalLocation();
    };
  });
