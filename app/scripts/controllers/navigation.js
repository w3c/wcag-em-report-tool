'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl',
function ($scope, $rootScope, $translate, wcag20spec, localeLoader) {

  	$scope.changeLanguage = function (lang) {

        localeLoader.loadLang(lang, function (err) {
            if (!err) {
                $scope.$apply(function () {
                    $translate.use(lang);
                    wcag20spec.useLanguage(lang);
                    $rootScope.$broadcast('langChange', lang);
                });
            } else {
                console.log(err);
            }
        });

  	};

});
