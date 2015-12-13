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
		'A': 'LEVEL_A',
		'AA': 'LEVEL_AA',
		'AAA': 'LEVEL_AAA',
		'wcag20:level_a': 'LEVEL_A',
		'wcag20:level_aa': 'LEVEL_AA',
		'wcag20:level_aaa': 'LEVEL_AAA'
	};

	rdfToLabel = function(earl) {
		return $filter('translate')('EARL.' + keymap[earl]);
	};
	rdfToLabel.keymap = keymap;
	rdfToLabel.$stateful = true;

	return rdfToLabel;
});