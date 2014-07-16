'use strict';

/**
 * 
 */
angular.module('wcagReporter').factory('evalModel', function(
		evalScopeModel, evalExploreModel, evalSampleModel, 
		evalTestModel, evalReportModel) {

	function objectMerge(target, source) {
		Object.keys(source).forEach(function (key) {
			target[key] = source[key];
		});
	}

	var evalModel = {
		
		scopeModel:   evalScopeModel,
		exploreModel: evalExploreModel,
		sampleModel:  evalSampleModel,
		testModel:    evalTestModel,
		reportModel:  evalReportModel,

		// getJsonLd: function () {
		// 	var jsonLd = {
		// 		dataType: 'evaluation',
		// 		evaluationScope: evalScopeModel,
		// 		successCriteria: evalTestModel
		// 	};
		// 	objectMerge(jsonLd, evalExploreModel);
		// 	objectMerge(jsonLd, evalSampleModel);
		// 	objectMerge(jsonLd, evalReportModel);
		// 	return JSON.stringify(jsonLd);
		// }
	};

    return evalModel;
});