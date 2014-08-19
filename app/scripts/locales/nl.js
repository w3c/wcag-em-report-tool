'use strict';

try {
  angular.module('wcagReporter');
} catch (e) {
  angular.module('wcagReporter', ['pascalprecht.translate']);
}

angular.module('wcagReporter').config(function ($translateProvider) {
  $translateProvider.translations('nl', {
    'NAV_START': 'Toetsing beginnen',
    'NAV_LINKS': 'Belangrijke links',
    'NAV_IMPORT': 'Importeren',
    'NAV_EXPORT': 'Exporteren',
    'NAV_HELP': 'Hulp'
  });
  $translateProvider.preferredLanguage('nl');
});
