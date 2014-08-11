'use strict';

angular.module('wcagReporter')
.service('currentUser', function() {
	return {
		'@context': {
			'@vocab' : 'http://xmlns.com/foaf/spec/#',
			id: '@id',
			type: '@type'
		},
		id: '_:evaluator',
		type: 'Person',
		name: ''
	};
});
