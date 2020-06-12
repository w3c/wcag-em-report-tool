'use strict';

angular.module('wcagReporter')
  .value('supportedLanguages', [
    {
    	code: 'en',
    	localName: 'English'
    },
    {
    	code: 'nl',
      localName: 'Nederlands'
    }
  ])
  .config(function ($translateProvider, wcag2specProvider) {
    var lang;
    function createCookie (name, value) {
      document.cookie = name + '=' + value + '; path=/';
    }

    function readCookie (name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }

    try {
      lang = readCookie('wcagReporter-lang');
      if (!lang) {
        lang = jQuery('*[ng-app="wcagReporter"]')
          .attr('lang') || 'en';
        lang = lang.substr(0, 2);
        createCookie('wcagReporter-lang', lang);
      }
    } catch (e) {
      lang = 'en';
    }

    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
      prefix: 'locale/',
      suffix: '.json'
    });

    wcag2specProvider.setSpecPath('wcag2spec/wcag2-${lang}.json');
    wcag2specProvider.loadLanguage(lang);
    $translateProvider.preferredLanguage(lang);
  })
  .run(function ($rootScope, $rootElement, translateFilter) {
    $rootScope.translate = translateFilter;

    $rootElement.addClass('app-loading');
    $rootScope.$on('$translateChangeSuccess', function (e, change) {
      // Update the lang data
      $rootElement.attr('lang', change.language);
      $rootScope.lang = change.language;
      $rootElement.removeClass('app-loading');
    });
  });
