'use strict';
angular.module('wcagReporter')
  .directive('inputPages', function (directivePlugin, $timeout, Page) {
    return directivePlugin({
      restrict: 'E',
      replace: true,
      scope: {
        pages: '=',
        addPage: '&',
        removePage: '&'
      },
      link: function (scope) {
        var addPageFunc = scope.addPage();
        var removePageFunc = scope.removePage();
        scope.addPage = function ($event) {
          var button = angular.element($event.delegateTarget);
          addPageFunc();

          $timeout(function () {
            var inputs = button.prev()
              .find('input');
            inputs[inputs.length - 2].select();
          }, 100);
        };

        scope.processPage = function (page) {
          Page.prependProtocol(page);
          Page.updateSource(page);
        };

        scope.removePage = function ($index, $event) {
          removePageFunc($index);
          // We need this timeout to prevent Angular UI from throwing an error
          $timeout(function () {
            angular.element($event.delegateTarget)
              .closest('fieldset')
              .parent()
              .children()
              .last()
              .focus();
          });
        };
      },
      templateUrl: 'views/directives/evaluate/inputPages.html'
    });
  });
