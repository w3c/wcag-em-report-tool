'use strict';

try {
  angular.module('wcagReporter');
} catch (e) {
  angular.module('wcagReporter', ['pascalprecht.translate']);
}

angular.module('wcagReporter').config(function ($translateProvider) {
  $translateProvider.translations('en', {
    'NAV_START': 'Start Evaluating',
    'NAV_LINKS': 'Important links',
    'NAV_IMPORT': 'Import',
    'NAV_EXPORT': 'Export',
    'NAV_HELP': 'Help'
  });
  $translateProvider.preferredLanguage('en');
});
