'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter').factory('wcagReporterExport',
			function(evalModel) {

	return {
		setAutoSave: function (options) {
			console.log('autosave set', options);
		}
	};
});