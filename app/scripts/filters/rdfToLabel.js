'use strict'; 

angular.module('wcagReporter') 
.filter('rdfToLabel', function($filter) {
	var keymap = {
		'earl:passed': 'Pass',
		'earl:failed': 'Fail',
		'earl:cantTell': 'Cannot tell',
		'earl:inapplicable': 'Inapplicable',
		'earl:untested': 'Untested',
		
		'wcag20:level_a': 'Level A',
		'wcag20:level_aa': 'Level AA',
		'wcag20:level_aaa': 'Level AAA'
	};

	return function(earl) {
		return $filter('translate')(keymap[earl]);
	};
});