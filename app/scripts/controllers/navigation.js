'use strict';

angular.module('wcagReporter')
  .controller(
    'NavigationCtrl',
    function ($scope, $rootScope, supportedLanguages, changeLanguage) {
      $scope.languages = supportedLanguages;
      $scope.currentLang = $rootScope.lang;

      $rootScope.$on('$translateChangeSuccess', function (e, change) {
        $scope.currentLang = change.language.toLowerCase();
      });

      $scope.changeLanguage = changeLanguage;
    }
  );
