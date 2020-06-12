'use strict';
angular.module('wcagReporter')
  .directive('autoResize', function (directivePlugin) {
    return directivePlugin({
      restrict: 'A',
      link: function (scope, element) {
        scope.$evalAsync(function () {
            	angular.element(element)
            .textareaAutoSize();
        });
      }
    });
  });
