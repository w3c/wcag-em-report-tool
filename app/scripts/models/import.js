'use strict';
/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter').factory('wcagReporterImport',
			function(evalModel) {
	
	function objectCollide(obj1, obj2) {
		Object.keys(obj1).forEach(function (prop) {
			if (typeof obj1[prop] !== 'function' &&
				typeof obj2[prop] !== 'undefined') {
				obj1[prop] = obj2[prop];
			}
		});
	}

	return {
		/**
		 * Inject evaluation data into the reporter
		 * @param {[Object]} evalData
		 */
		_setData: function (evalData) {
			if (evalData.evaluationScope) {
				objectCollide(evalModel.scopeModel,
							  evalData.evaluationScope);
			}

			['exploreModel', 'sampleModel', 'testModel', 'reportModel']
				.forEach(function (modelName) {
				objectCollide(evalModel[modelName], evalData);
			});

		}

	};
});