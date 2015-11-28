'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl',
function ($scope, $translate, wcag20spec) {

  	$scope.changeLanguage = function (lang) {
        $translate.use(lang);
        wcag20spec.loadLanguage(lang);
  	};

});
