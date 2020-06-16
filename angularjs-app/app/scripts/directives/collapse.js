// Based on the work from the great guys at bootstrap UI.
'use strict';
angular.module('wcagReporter')
  .directive('collapse', [
    '$animate',
    function ($animate) {
      return {
        link: function (scope, element, attrs) {
          var initialAnimSkip = true;
          var currentTransition;

          function doTransition (change) {
            var fromState = {};
            Object.keys(change)
              .forEach(function (cssProp) {
                fromState[cssProp] = element.css(cssProp);
              });

            var newTransition = $animate.animate(element, fromState, change);
            if (currentTransition) {
              $animate.cancel(currentTransition);
            }

            currentTransition = newTransition;
            newTransition.then(newTransitionDone, newTransitionDone);
            return newTransition;

            function newTransitionDone () {
              // Make sure it's this transition, otherwise, leave it alone.
              if (currentTransition === newTransition) {
                currentTransition = undefined;
              }
            }
          }

          function expand () {
            if (initialAnimSkip) {
              initialAnimSkip = false;
              expandDone();
            } else {
              element.removeClass('collapse')
                .addClass('collapsing');
              doTransition({ height: element[0].scrollHeight + 'px' })
                .then(expandDone);
            }
          }

          function expandDone () {
            element.removeClass('collapsing');
            element.addClass('collapse in');
            element.css({ height: 'auto' });
          }

          function collapse () {
            if (initialAnimSkip) {
              initialAnimSkip = false;
              collapseDone();
              element.css({ height: 0 });
            } else {
              // CSS transitions don't work with height: auto, so we have to manually change the height to a specific value
              element.css({ height: element[0].scrollHeight + 'px' });
              // trigger reflow so a browser realizes that height was updated from auto to a specific value
              var x = element[0].offsetWidth;

              element.removeClass('collapse in')
                .addClass('collapsing');

              doTransition({ height: 0 })
                .then(collapseDone);
            }
          }

          function collapseDone () {
            element.removeClass('collapsing');
            element.addClass('collapse');
          }

          scope.$watch(attrs.collapse, function (shouldCollapse) {
            if (shouldCollapse) {
              collapse();
            } else {
              expand();
            }
          });
        }
      };
    }
  ]);
