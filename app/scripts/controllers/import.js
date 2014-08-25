'use strict';

angular.module('wcagReporter')
.controller('ImportCtrl', function ($scope, reportStorage, evalLoader, $rootScope) {

    $scope.postSettings = reportStorage.settings;
    $scope.fileFeedback = {
        posted: false, failures: false
    };

    $scope.urlFeedback = {
        posted: false, failures: false
    };
    
    function handleLoad(defer, feedback) {
        feedback.posted = true;
        feedback.failure = false;

        defer.then(function success() {
            feedback.posted = false;
            $rootScope.setEvalLocation();

        }, function error(e) {
            feedback.posted = false;
            if (e.message) {
                feedback.failure = e.message;
            } else {
                feedback.failure = e;
            }
        });
    }

    $scope.loadFile = function () {
        var file = window.jQuery('#load_json')[0].files[0];
        handleLoad( evalLoader.openFromFile(file), $scope.fileFeedback);
    };

    $scope.loadUrl = function () {
        handleLoad( evalLoader.openFromUrl($scope.postSettings.url), $scope.urlFeedback );
    };
});
