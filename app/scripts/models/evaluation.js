'use strict';

angular
  .module('wcagReporter')
  .factory('evalModel', function (
    evalScopeModel,
    evalExploreModel,
    evalSampleModel,
    evalAuditModel,
    evalReportModel,
    evalContextV3,
    currentUser
  ) {
    var evalModel = {
      id: undefined,
      type: 'Evaluation',
      context: evalContextV3,
      scopeModel: evalScopeModel,
      exploreModel: evalExploreModel,
      sampleModel: evalSampleModel,
      auditModel: evalAuditModel,
      reportModel: evalReportModel,
      // This array collects data that is outside the evaluation
      // For example the author and external rdf data
      otherData: [currentUser]
    };

    return evalModel;
  });
