'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter')
.factory('wcagReporterExport', function(evalModel, reportStorage) {

	function getJsonLd () {
		var jsonLd = {
			'@context': evalModel.context,
			type: 'evaluation',
			'id': evalModel.id
		};
		
		jsonLd.evaluationScope =  evalModel.scopeModel.exportData();
		jsonLd.auditResult =  evalModel.testModel.exportData();

		angular.extend(jsonLd, 
			evalModel.reportModel.exportData(),
			evalModel.sampleModel.exportData(),
			evalModel.exploreModel.exportData());
		
		return jsonLd;
	}
	
	var exportModel = {

		storage: reportStorage,

		saveToUrl: function () {
			return reportStorage.post(exportModel.getJson());
		},

		getJson: function () {
			return { 
				'@graph': [getJsonLd()].concat(evalModel.otherData)
			};
		},

		getString: function () {
			return angular.toJson(exportModel.getJson(), true);
		},

		getBlobUrl: function (blob) {
			blob = blob || exportModel.getBlob();
			return (window.URL || window.webkitURL).createObjectURL(blob);
		},

		saveBlobIE: function (blob, filename) {
			blob = blob || exportModel.getBlob();
			filename = filename || exportModel.getFileName();

			if (window.navigator.msSaveOrOpenBlob) {
	            window.navigator.msSaveBlob(blob, filename);
	        }
		},

		getBlob: function (data, type) {
			data = data || exportModel.getString();
			type = type || 'application/json;charset=utf-8';
			return new Blob([data], { type: type });
		},

		getFileName: function (title, ext) {
			title = title || evalModel.reportModel.title;
			ext = ext || 'json';
			if (title === '') {
				title = 'evaluation';
			}
			return title.replace(/(^\-+|[^a-zA-Z0-9\/_| -]+|\-+$)/g, '')
            .toLowerCase()
            .replace(/[\/_| -]+/g, '-') + '.' + ext;
		}
	};

	reportStorage.exportModel = exportModel;

	return exportModel;
});