'use strict';

/**
 * Originally created by Justin Marsan
 * https://github.com/justinmarsan/wcag.json
 */
angular.module('wcagReporter')
.factory('wcagReporterImport',
function($rootScope, evalModel, currentUser, reportStorage) {
	var jsonld = window.jsonld;


	function objectCollide(obj1, obj2) {
		Object.keys(obj1).forEach(function (prop) {
			if (typeof obj1[prop] !== 'function' &&
				typeof obj2[prop] !== 'undefined') {
				obj1[prop] = obj2[prop];
			}
		});
	}


	function compactEach(callback) {
		var testCallback,
			results = [],
			calls = 0,
			evalType = 'http://www.w3.org/TR/WCAG-EM/#evaluation',
			personType = 'http://xmlns.com/foaf/spec/#Person';

		testCallback = function (err, compacted) {
			results.push(compacted);
			if (results.length === calls) {
				callback(results);
			}
		};

		return function (evalObj) {
			calls += 1;

			if (evalObj['@type'] &&
					evalObj['@type'].indexOf(evalType) !== -1) {
				// Compact with the evaluation context
				jsonld.compact(evalObj,
						evalModel.context, testCallback);

			} else if (evalObj['@type'] &&
					evalObj['@type'].indexOf(personType) !== -1) {
				// Compact with the FOAF context
				jsonld.compact(evalObj,
						currentUser['@context'], testCallback);
			} else {
				results.push(evalObj);
			}
		};
	}


	/**
	 * Inject evaluation data into the reporter
	 * @param {[Object]} evalData
	 */
	function updateEvalModel(evalData) {
		if (evalData.evaluationScope) {
			objectCollide(evalModel.scopeModel, evalData.evaluationScope);
		}
		
		evalModel.id = evalData.id;
		
		objectCollide(evalModel.sampleModel, evalData);
		objectCollide(evalModel.reportModel, evalData);
		
		evalModel.testModel.importData(evalData);
		evalModel.exploreModel.importData(evalData);
	}

	var importModel = {

		storage: reportStorage,

		/**
		 * Import an evaluation from a JSON string
		 * @param  {string} json Evaluation
		 */
		fromJson: function (json) {
			importModel.fromObject(angular.fromJson(json));
		},

		getFromUrl: function () {
			return reportStorage.get()
			.then(function (data) {
				importModel.fromJson(data);
				return data;
			});
		},

		fromObject: function (evalData) {
			jsonld.expand(evalData, function(err, expanded) {
				importModel.fromExpanded(expanded);
			});
		},

		fromExpanded: function (evalData) {
			evalData.forEach(compactEach(function(results) {
				var evaluation = results.reduce(function (result, data) {
					if (data.type === 'evaluation') {
						if (typeof result !== 'undefined') {
							throw new Error('Only one evaluation object allowed in JSON data');
						}
						return data;
					}
					return result;
				}, undefined);

				if (evaluation.creator.indexOf('_:') === 0) {
					currentUser.id = evaluation.creator;
				}
				evaluation.creator = currentUser;

				results.forEach(function (data) {
					if (data.type === 'Person') {
						if (data.id === currentUser.id) {
							angular.extend(currentUser, data);
						}
					}
				});

				if (!evaluation) {
					throw new Error('No evaluation found in data');
				}

				// Put the evaluation as the first on the list
				$rootScope.$apply(function () {
					updateEvalModel(evaluation);

					// Add the remaining data to evalModel.otherData
					evalModel.otherData = evalModel.otherData
					.concat.apply(evalModel.otherData, results.filter(function (item) {
						return item !== evaluation;
					}));
				});
			}));
		}
	};
	
	return importModel;
});