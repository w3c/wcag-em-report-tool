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
		_setData: function (data) {
			var evalData = data[0];

			if (evalData.evaluationScope) {
				objectCollide(evalModel.scopeModel,
							  evalData.evaluationScope);
			}

			['exploreModel', 'sampleModel', 'reportModel']
				.forEach(function (modelName) {
				objectCollide(evalModel[modelName], evalData);
			});

			if (evalData.auditResult) {
				evalData.auditResult.forEach(
						evalModel.testModel.addCritAssert,
						evalModel.testModel);
			}

			// Add the remaining data to evalModel.otherData
			data = data.slice();
			data.shift();
			evalModel.otherData = evalModel.otherData
			.concat.apply(evalModel.otherData, data);
		}

	};
});