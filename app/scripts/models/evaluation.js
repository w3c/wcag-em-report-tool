'use strict';

/**
 *
 */
angular.module('wcagReporter').factory('evalModel', function(
		evalScopeModel, evalExploreModel, evalSampleModel,
		evalAuditModel, evalReportModel, evalContextV2, currentUser) {

	var evalModel = {
		id: undefined,
		context: evalContextV2,
		scopeModel:   evalScopeModel,
		exploreModel: evalExploreModel,
		sampleModel:  evalSampleModel,
		auditModel:   evalAuditModel,
		reportModel:  evalReportModel,
		// This array collects data that is outside the evaluation
		// For example the author and external rdf data
		otherData: [currentUser]
	};

    return evalModel;
});