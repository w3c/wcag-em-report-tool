'use strict'; 

angular.module('wcagReporter') 
.filter('earlToLabel', function() {
	var keymap = {
		'earl:passed': 'Pass',
		'earl:failed': 'Fail',
		'earl:cantTell': 'Cannot tell',
		'earl:inapplicable': 'Inapplicable',
		'earl:untested': 'Untested'
	};

	return function(earl) {
		return keymap[earl];
	};
});