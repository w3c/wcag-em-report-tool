'use strict';
angular.module('wcagReporter')
  .directive('infoButton', function (directivePlugin) {
    return directivePlugin({
      restrict: 'E',
      scope: {
        label: '@',
        target: '@'
      },
      link: function (scope, elm) {
        var tgt;

        elm.on('click', function () {
          if (!tgt) {
            if (typeof scope.target === 'undefined') {
              tgt = elm.next();
            } else {
              tgt = angular.element('#' + scope.target);
            }
            tgt.find('.close')
              .on(
                'click',
                elm.attr.bind(elm, 'aria-expanded', false)
              );
          }
          tgt.toggle(200, function () {
            tgt.focus();
            elm.attr('aria-expanded', tgt.is(':visible'));
          });
        });
      },
      replace: true,
      templateUrl: 'views/directives/evaluate/infoButton.html'
    });
  });
