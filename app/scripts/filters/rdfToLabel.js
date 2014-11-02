'use strict'; 

angular.module('wcagReporter') 
.filter('rdfToLabel', function($filter) {
	var rdfToLabel;
	var keymap = {
		'earl:passed': 'PASSED',
		'earl:failed': 'FAILED',
		'earl:cantTell': 'CANT_TELL',
		'earl:inapplicable': 'NOT_PRESENT',
		'earl:untested': 'NOT_CHECKED',
		
		'wcag20:level_a': 'LEVEL_A',
		'wcag20:level_aa': 'LEVEL_AA',
		'wcag20:level_aaa': 'LEVEL_AAA'
	};

	rdfToLabel = function(earl) {
		return $filter('translate')(keymap[earl]);
	};
	rdfToLabel.keymap = keymap;

	return rdfToLabel;
});