'use strict';
angular.module('wcagReporter')
  .directive('shyPlaceholder', function (directivePlugin) {
    var ph = 'placeholder';

    return directivePlugin({
      restrict: 'A',
      scope: {
        shyPlaceholder: '='
      },
      compile: function (elm, attrs) {
        return function (scope, elm) {
          var phValue = scope.$eval(attrs.shyPlaceholder);

          elm.attr(ph, phValue)
            .bind({
              focus: elm.attr.bind(elm, ph, ''),
              blur: elm.attr.bind(elm, ph, phValue)
            });
        };
      }
    });
  });
