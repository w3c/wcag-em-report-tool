'use strict';
angular.module('wcagReporter')
  .directive('criterionBody', function (directivePlugin, evalSampleModel, selectedCasesOnlyFilter) {
    function singlePageAssert (scope) {
      var pages = evalSampleModel.getFilledPages();
      var asserts = scope.criterion.getSinglePageAsserts();

      if (scope.opt.editable) {
        return selectedCasesOnlyFilter(asserts)
          .sort(function (assertA, assertB) {
            return pages.indexOf(assertA.subject[0]) - pages.indexOf(assertB.subject[0]);
          });
      } else {
        return asserts.filter(function (assert) {
          return assert.isDefined();
        })
          .sort(function (assertA, assertB) {
            return pages.indexOf(assertA.subject[0]) - pages.indexOf(assertB.subject[0]);
          });
      }
    }

    return directivePlugin({
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        criterion: '=assert',
        opt: '=options'
      },

      controller: [
        '$scope',
        function ($scope) {
          if ($scope.opt.editable) {
            $scope.criterion.setCaseForEachPage();
          }

          $scope.$on('audit:sample-change', function () {
            $scope.multiPageAsserts = $scope.criterion.getMultiPageAsserts();
            $scope.singlePageAsserts = singlePageAssert($scope);
          });
        }
      ],

      link: function (scope) {
        scope.showBody = function () {
          return scope.multiPageAsserts.length > 0 ||
                        scope.singlePageAsserts.length > 0 ||
                        scope.opt.editable;
        };

        scope.multiPageAsserts = scope.criterion.getMultiPageAsserts();
        scope.singlePageAsserts = singlePageAssert(scope);

        scope.hasMultipage = false;
        scope.addMultiPage = function () {
          scope.criterion.addTestCaseAssertion({
            multiPage: true,
            subject: evalSampleModel.getSelectedPages()
          });
          scope.multiPageAsserts = scope.criterion.getMultiPageAsserts();
        };
      },
      templateUrl: 'views/directives/criterion/criterionBody.html'
    });
  });
