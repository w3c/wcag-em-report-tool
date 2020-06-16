'use strict';
angular.module('wcagReporter')
  .directive('resultDescription', function (directivePlugin) {
    return directivePlugin({
      restrict: 'E',
      replace: true,
      scope: {
        value: '=',
        updateMetadata: '='
      },
      templateUrl: 'views/directives/criterion/resultDescription.html'
    });
  });
