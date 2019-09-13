'use strict';

angular.module('wcagReporter')
  .factory('importV1', function (evalContextV1, evalContextV2, $filter) {
    var getUrl = $filter('getUrl');

    function convertor (importArray) {
      return importArray.map(function (importObj) {
        // upgrade from v1 to v2
        if (isV1Evaluation(importObj)) {
          importObj = upgradeToV2(importObj);

          // Correct the foaf namespace
        } else if (typeof importObj === 'object' &&
                typeof importObj['@context'] === 'object' &&
                importObj['@context']['@vocab'] === 'http://xmlns.com/foaf/spec/#') {
          importObj['@context']['@vocab'] = 'http://xmlns.com/foaf/0.1/';
        }
        return importObj;
      });
    }

    /**
     * Check if an Evaluation object is of v1
     */
    function isV1Evaluation (data) {
      if (typeof data !== 'object') {
        throw new TypeError('Expected object for ' + data);
      }
      var dataContext = data['@context'];
      var contextProps = Object.keys(evalContextV1);
      // Skip if the context isn't there
      if (typeof dataContext !== 'object') {
        return false;
      }

      // Dirty check if they have the same keys
      if (contextProps.sort()
        .join(',') !== Object.keys(dataContext)
        .sort()
        .join(',')) {
        return false;
      }

      return contextProps.reduce(function (result, prop) {
        if (!result) { // false is false
          return result;

          // Context prop doesn't exist
        } else if (typeof dataContext[prop] === 'undefined') {
          return false;

          // Context prop is different value
        } else if (typeof dataContext[prop] === 'string' &&
                dataContext[prop] !== evalContextV1[prop]) {
          return false;

          // Context prop is an object, compare it's content
        } else if (typeof dataContext[prop] === 'object') {
          return Object.keys(evalContextV1[prop])
            .reduce(function (result, subProp) {
              if (!result) {
                return result;
              } else if (typeof dataContext[prop][subProp] === 'undefined') {
                return false;
              } else if (typeof dataContext[prop][subProp] === 'string' &&
                        dataContext[prop][subProp] !== evalContextV1[prop][subProp]) {
                return false;
              } else {
                return true;
              }
            }, true);
        } else {
          return true;
        }
      }, true);
    }

    /** Upgrade Page to v2 */
    function fixPage (page) {
      if (page.type === 'webpage') {
        page.type = [
          'TestSubject',
          'WebPage'
        ];
      }
      page.title = page.handle;
      delete page.handle;
      var source = getUrl(page.description);
      if (source) {
        page.source = source;
      }
    }

    /**
     * Evaluation object from v1 to v2
     */
    function upgradeToV2 (evaluation) {
      // Replace with the v2 context
      evaluation['@context'] = evalContextV2;

      // Capitalize Evaluation
      evaluation.type = evaluation.type.replace('evaluation', 'Evaluation');

      // Update the EvaluationScope object
      var evalScope = evaluation.evaluationScope;
      evalScope.type = evalScope.type || 'EvaluationScope';
      evalScope.website.type = evalScope.website.type || [
        'TestSubject',
        'WebSite'
      ];

      evaluation.reliedUponTechnology.forEach(function (tech) {
        tech.type = tech.type || 'Technology';
      });

      var evalScope = evaluation.evaluationScope;
      if (evalScope.conformanceTarget.substr(0, 13) === 'wcag20:level_') {
        evalScope.conformanceTarget = 'wai:WCAG2' + (
          evalScope.conformanceTarget.replace('wcag20:level_', '')
            .toUpperCase()
        ) + '-Conformance';
      }
      if (evalScope.website.title) {
        evalScope.website.siteName = evalScope.website.title;
        delete evalScope.website.title;
      }

      // Update the sample
      if (!angular.isArray(evaluation.structuredSample.webpage)) {
        evaluation.structuredSample.webpage = [evaluation.structuredSample.webpage];
      }
      evaluation.structuredSample.type = evaluation.structuredSample.type || 'Sample';
      evaluation.structuredSample.webpage.forEach(fixPage);

      if (!angular.isArray(evaluation.randomSample.webpage)) {
        evaluation.randomSample.webpage = [evaluation.randomSample.webpage];
      }
      evaluation.randomSample.type = evaluation.randomSample.type || 'Sample';
      evaluation.randomSample.webpage.forEach(fixPage);

      // Update assertions
      evaluation.auditResult.forEach(function updateAsserts (assertion) {
        assertion.type = assertion.type.replace('earl:assertion', 'Assertion');

        if (assertion.testRequirement) {
          assertion.test = assertion.testRequirement.replace('wcag20:', 'WCAG2:');
          delete assertion.testRequirement;
        } else if (assertion.testcase) {
          assertion.test = assertion.testcase.replace('wcag20:', 'WCAG2:');
          delete assertion.testcase;
        }

        assertion.result.type = assertion.result.type || 'TestResult';
        if (assertion.mode === 'manual') {
          assertion.mode = 'earl:manual';
        }
        if (assertion.hasPart) {
          assertion.hasPart.forEach(updateAsserts);
        }
      });

      return evaluation;
    }

    // Expose methods for testing
    convertor.isV1Evaluation = isV1Evaluation;
    convertor.upgradeToV2 = upgradeToV2;

    return convertor;
  });
