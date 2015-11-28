'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl',
function ($scope, $translate, wcag20spec, $rootScope) {

	$scope.languages = [
		{'code': 'en', 'localName': 'English'},
		{'code': 'nl', 'localName': 'Nederlands'}
	];

	$scope.currentLang = $rootScope.lang;
	
    $rootScope.$on('$translateChangeSuccess', function (e, change) {
    	$scope.currentLang = change.language.toLowerCase();
    });

  	$scope.changeLanguage = function (lang) {
        $translate.use(lang);
        wcag20spec.loadLanguage(lang);
  	};

});
