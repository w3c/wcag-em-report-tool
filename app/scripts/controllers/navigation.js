'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl',
function ($scope, $translate, wcag20spec, $rootScope) {
    function createCookie(name,value) {
        document.cookie = name+"="+value+"; path=/";
    }

    $scope.languages = [
        {'code': 'en', 'localName': 'English'},
        {'code': 'nl', 'localName': 'Nederlands'}
    ];

    $scope.currentLang = $rootScope.lang;
    
    $rootScope.$on('$translateChangeSuccess', function (e, change) {
        $scope.currentLang = change.language.toLowerCase();
    });

    $scope.changeLanguage = function (lang) {
        if (document) {
            createCookie('wcagReporter-lang', lang);
        }
        
        $translate.use(lang);
        wcag20spec.loadLanguage(lang);
    };

});
