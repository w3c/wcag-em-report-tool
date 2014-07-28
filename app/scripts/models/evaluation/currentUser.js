'use strict';

angular.module('wcagReporter')
.service('currentUser', function() {
	return {
		id: '_:user' + Math.floor(Math.random() * 10000)
	};
});
