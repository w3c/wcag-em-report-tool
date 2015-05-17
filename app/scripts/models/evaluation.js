'use strict';

/**
 *
 */
angular.module('wcagReporter').factory('evalModel', function(
		evalScopeModel, evalExploreModel, evalSampleModel,
		evalAuditModel, evalReportModel, evalContext, currentUser) {

	var evalModel = {
		id: undefined,
		context: evalContext,
		scopeModel:   evalScopeModel,
		exploreModel: evalExploreModel,
		sampleModel:  evalSampleModel,
		testModel:    evalAuditModel,
		reportModel:  evalReportModel,
		// This array collects data that is outside the evaluation
		// For example the author and external rdf data
		otherData: [currentUser]
	};

    return evalModel;
});