'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter').factory('wcagReporterExport',
			function(evalModel) {

	function getJsonLd () {
		var jsonLd = {
			'@context': evalModel.context,
			type: 'evaluation',
			'id': evalModel.id,
			evaluationScope: evalModel.scopeModel.toExport(),
			auditResult: evalModel.testModel.toExport()
		};

		angular.extend(jsonLd, evalModel.sampleModel.toExport());
		angular.extend(jsonLd, evalModel.exploreModel.toExport());
		angular.extend(jsonLd, evalModel.reportModel.toExport());
		return jsonLd;
	}



	return {
		setAutoSave: function (options) {
			console.log('autosave set', options);
		},
		getString: function () {
			var output = [getJsonLd()].concat(evalModel.otherData);
			return angular.toJson(output, true);
		}
	};
});