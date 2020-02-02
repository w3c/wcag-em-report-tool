'use strict';
angular.module('wcagReporter')
  .directive('pageSelect', function (directivePlugin, evalSampleModel) {
    var sample;
    return directivePlugin({
      restrict: 'E',
      replace: true,
      scope: {
        pages: '='
      },
      controller: [
        '$scope',
        function ($scope) {
          $scope.updateSampleList = function () {
            $scope.unselectedPages = sample.filter(function (page) {
              return $scope.pages.indexOf(page) === -1;
            });
          };

          $scope.removePage = function (page) {
            var index = $scope.pages.indexOf(page);
            if (index >= 0) {
              $scope.pages.splice(index, 1);
              $scope.updateSampleList();
            }
          };

          $scope.addPageToAssert = function () {
            var page = evalSampleModel.getPageByTitle($scope.newPage);

            if (page && $scope.pages.indexOf(page) === -1) {
              $scope.unselectedPages.splice($scope.unselectedPages.indexOf(page), 1);
              $scope.pages.push(page);
              $scope.newPage = '';
            }
          };

          sample = evalSampleModel.getPages();
          $scope.updateSampleList();
        }
      ],
      templateUrl: 'views/directives/criterion/pageSelect.html'
    });
  });
