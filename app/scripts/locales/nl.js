'use strict';

try {
  angular.module('wcagReporter');
} catch (e) {
  angular.module('wcagReporter', ['pascalprecht.translate']);
}

angular.module('wcagReporter').config(['$translateProvider',
  function ($translateProvider) {
    var translations = {
      'NAV_START': 'Toetsing beginnen',
      'NAV_LINKS': 'Belangrijke links',
      'NAV_IMPORT': 'Importeren',
      'NAV_EXPORT': 'Exporteren',
      'NAV_HELP': 'Hulp'
    };
    $translateProvider.translations('nl', translations);
    $translateProvider.translations(translations);
    $translateProvider.preferredLanguage('nl');
  }
]);
