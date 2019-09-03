'use strict';

angular.module('wcagReporter')
  .controller('OpenCtrl', function ($scope, reportStorage, evalLoader, $rootScope) {
    $scope.postSettings = reportStorage.settings;
    $scope.fileFeedback = {
      posted: false, failures: false
    };
    $scope.evalFile = '';

    $scope.urlFeedback = {
      posted: false, failures: false
    };

    function handleLoad (defer, feedback) {
      feedback.posted = true;
      feedback.failure = false;

      defer.then(function success () {
        feedback.posted = false;
        $rootScope.setEvalLocation();
      }, function error (e) {
        feedback.posted = false;
        if (e.message) {
          feedback.failure = e.message;
        } else {
          feedback.failure = e;
        }
      });
    }

    $scope.loadFile = function (filePath) {
      var uploadResponse = evalLoader.openFromFile(filePath);
      handleLoad(uploadResponse, $scope.fileFeedback);
    };

    $scope.loadUrl = function () {
      handleLoad(evalLoader.openFromUrl($scope.postSettings.url), $scope.urlFeedback);
    };

    $scope.updateSettings = function () {
      reportStorage.updateSettings();
    };
  });
