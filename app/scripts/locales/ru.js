'use strict';

try {
  angular.module('pascalprecht.translate');
} catch (e) {
  angular.module('pascalprecht.translate', ['pascalprecht.translate']);
}

angular.module('pascalprecht.translate').config(function ($translateProvider) {
  $translateProvider.translations('ru', {
    'TITLE': 'Ik spreek toch geen Russisch'
  });
  $translateProvider.preferredLanguage('ru');
});
