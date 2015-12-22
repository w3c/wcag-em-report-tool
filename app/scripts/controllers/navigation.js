'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl',
function ($scope, $translate, wcag2spec, $rootScope, supportedLanguages) {
    function createCookie(name,value) {
        document.cookie = name+"="+value+"; path=/";
    }

    $scope.languages = supportedLanguages;
    $scope.currentLang = $rootScope.lang;
    
    $rootScope.$on('$translateChangeSuccess', function (e, change) {
        $scope.currentLang = change.language.toLowerCase();
    });

    $scope.changeLanguage = function (lang) {
        if (document) {
            createCookie('wcagReporter-lang', lang);
        }
        
        $translate.use(lang);
        wcag2spec.loadLanguage(lang);
    };

});
