'use strict';
angular.module('wcagReporter')
  .directive('infoField', function (directivePlugin, $document) {
    /**
     * Get the next visible element that can receive focus outside the .alert-info
     */
    function getNextFocusElement (elm) {
      var selector = ':input:visible, a[href]:visible';
      var focusable = $document.find(selector);

      elm = angular.element(elm)
        .closest('.alert-info')
        .find(selector)
        .last();
      return focusable[focusable.index(elm) + 1];
    }

    return directivePlugin({
      restrict: 'E',
      scope: {
        ref: '@',
        button: '@',
        exitto: '@'
      },
      link: function (scope, elm) {
        elm.hide(0);
        scope.close = function ($event) {
          var nextElm;

          if ($event.type === 'keyup' &&
                ($event.keyCode !== 13 && $event.keyCode !== 27)) {
            return;
          }
          if (scope.exitto) {
            nextElm = angular.element('#' + scope.exitto);
          }
          if (!nextElm || nextElm.length === 0) {
            nextElm = getNextFocusElement($event.target);
          }
          nextElm.focus();
          elm.hide(200);
        };
      },
      replace: true,
      transclude: true,
      templateUrl: 'views/directives/evaluate/infoField.html'
    });
  });
