'use strict';

try {
  angular.module('pascalprecht.translate');
} catch (e) {
  angular.module('pascalprecht.translate', ['pascalprecht.translate']);
}

angular.module('pascalprecht.translate').config(function ($translateProvider) {
  $translateProvider.translations('es', {
    'TITLE': 'Habla Espanol?'
  });
  $translateProvider.preferredLanguage('es');
});
