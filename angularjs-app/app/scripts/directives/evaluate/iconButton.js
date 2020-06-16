'use strict';

angular.module('wcagReporter')
  .directive('iconButton', function (directivePlugin) {
    return directivePlugin({
      restrict: 'E',
      replace: true,
      scope: {
        label: '=',
        icon: '=',
        click: '&'
      },
      templateUrl: 'views/directives/evaluate/iconButton.html'
    });
  });
