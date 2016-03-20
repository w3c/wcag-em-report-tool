'use strict';

/**
 *
 */
angular.module('wcagReporter')
.factory('partialImport', function (evalContextV2, evalModel, ldModel) {

	var jsonld = window.jsonld;

	function importer(data, callback) {
		callback = callback || new Function ();
		ldModel(data, evalContextV2, function (err, model) {
			if (err) {
				return callback(err);
			}
			console.log(Object.keys(model));
			var asserts = model.getAssertions();
			var pages = model.getTestSubjects();

			evalModel.sampleModel.importData({
				structuredSample: {
					webpage: pages
				}
			});

			callback(null, model);
		});
	}

	return importer;

});