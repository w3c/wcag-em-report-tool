'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl',
function ($scope, $rootScope, $translate, wcag20spec) {

  	$scope.changeLanguage = function (key) {
	    $translate.use(key);
        wcag20spec.useLanguage(key);

        $rootScope.$broadcast('langChange');
  	};

});
