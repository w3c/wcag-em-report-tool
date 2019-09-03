'use strict';
angular.module('wcagReporter')
  .directive('buttonCollapse', function (directivePlugin) {
    return directivePlugin({
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        	obj: '=target',
        	prop: '@property'
      },
      link: function (scope, elm, attr) {
        // If collapsed and the property is not defined, set the default to collapse
        if (attr.collapsed !== undefined && scope.obj[scope.prop] === undefined) {
          scope.obj[scope.prop] = true;
        }
      },
      templateUrl: 'views/directives/buttonCollapse.html'
    });
  });
