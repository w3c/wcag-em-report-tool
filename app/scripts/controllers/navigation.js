'use strict';

angular.module('wcagReporter')
.controller('NavigationCtrl', function ($scope, $translate) {
	
  	$scope.changeLanguage = function (key) {
	    $translate.use(key);
  	};

});
