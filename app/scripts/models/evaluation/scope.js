'use strict';

angular.module('wcagReporter')
  .service('evalScopeModel', function () {
    var scopeModel = {
      type: 'EvaluationScope',
      wcagVersion: 'WCAG21',
      conformanceTarget: 'wai:WCAG2AA-Conformance',
      additionalEvalRequirement: '',
      website: {
        type: [
          'TestSubject',
          'WebSite'
        ],
        id: '_:website',
        siteName: '',
        siteScope: ''
      },
      accessibilitySupportBaseline: ''
    };

    scopeModel.exportData = function () {
      return {
        type: scopeModel.type,
        conformanceTarget: scopeModel.conformanceTarget,
        additionalEvalRequirement: scopeModel.additionalEvalRequirement,
        website: {
          type: scopeModel.website.type,
          id: scopeModel.website.id,
          siteName: scopeModel.website.siteName,
          siteScope: scopeModel.website.siteScope
        },
        accessibilitySupportBaseline: scopeModel.accessibilitySupportBaseline
      };
    };

    scopeModel.wcagVersionOptions = [
      'WCAG21',
      'WCAG20'
    ];

    scopeModel.conformanceOptions = [
      'wai:WCAG2A-Conformance',
      'wai:WCAG2AA-Conformance',
      'wai:WCAG2AAA-Conformance'
    ];

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    scopeModel.validate = function () {
      return [];
    };

    scopeModel.matchConformTarget = function (level) {
      return scopeModel.conformanceTarget.length >= level.length;
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(scopeModel.website);
    Object.preventExtensions(scopeModel);

    return scopeModel;
  });
