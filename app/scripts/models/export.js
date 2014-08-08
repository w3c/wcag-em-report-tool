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
			'id': evalModel.id
		};
		angular.extend(jsonLd, evalModel.reportModel.toExport());
		
		jsonLd.evaluationScope =  evalModel.scopeModel.toExport();
		jsonLd.auditResult =  evalModel.testModel.toExport();

		angular.extend(jsonLd, evalModel.sampleModel.toExport());
		angular.extend(jsonLd, evalModel.exploreModel.toExport());
		return jsonLd;
	}

	return {
		setAutoSave: function (options) {
			console.log('autosave set', options);
		},

		getJson: function () {
			return [getJsonLd()]
			.concat(evalModel.otherData);
		},

		getString: function () {
			return angular.toJson(this.getJson(), true);
		},

		getBlob: function () {
			// Take the URL
			return (window.URL || window.webkitURL)
			// Create a blob for that URL
			.createObjectURL(new Blob(
				// Using the JSON from getString()
				[ this.getString() ],
				{ type : 'application/json;charset=utf-8' }
			));
		},

		getFileName: function () {
			return evalModel.reportModel.title
			.replace(/(^\-+|[^a-zA-Z0-9\/_| -]+|\-+$)/g, '')
            .toLowerCase()
            .replace(/[\/_| -]+/g, '-') + '.json';
		}
	};
});