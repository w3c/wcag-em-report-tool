'use strict';

angular.module('wcagReporter')
  .service('changeLanguage', function ($translate, wcag2spec, $rootScope) {
    function createCookie (name, value) {
      document.cookie = name + '=' + value + '; path=/';
    }

    return function changeLanguage (lang) {
      if ($rootScope.lang === lang) {
        return;
      }

      if (document) {
        createCookie('wcagReporter-lang', lang);
      }
      $translate.use(lang);
      wcag2spec.loadLanguage(lang);
    };
  });
