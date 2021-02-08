'use strict';

/**
 * ImportV1; imports and migrates jsonld data
 * TODO: Use JSONLD API
 */

angular
  .module('wcagReporter')
  .factory('importV1', function (
    types,
    wcagSpecIdMap,
    evalContextV1,
    evalContextV2,
    evalContextV3,
    $filter
  ) {
    var getUrl = $filter('getUrl');
    var isLatestVersion = isV3Evaluation;
    /**
     * Converts json-ld @graph contents
     * @param  {Array} '@graph'-contents
     * @return {Array} new updated '@graph'-contents
     */
    function convertor (importArray) {
      return importArray
        .map(function (importObj) {
          // upgrade from v1 to v2
          if (isV1Evaluation(importObj)) {
            importObj = upgradeToV2(importObj);
          }

          if (isV2Evaluation(importObj)) {
            importObj = upgradeToV3(importObj);
          }

          // Correct the foaf namespace
          if (
            typeof importObj === 'object' &&
            typeof importObj['@context'] === 'object' &&
            importObj['@context']['@vocab'] === 'http://xmlns.com/foaf/spec/#'
          ) {
            importObj['@context']['@vocab'] = 'http://xmlns.com/foaf/0.1/';
          }

          return importObj;
        });
    }

    /**
     * Updates the test WCAG ID to latest version.
     * The test ID exist of 2 parts: [WCAG2, <ID>]
     * @param  {String}      test string
     * @return {String}      new test ID string
     */
    function updateTestId (test) {
      var testId = test.split(':');
      var criterionIdSet = wcagSpecIdMap
        .filter(function (idSet) {
          return idSet.indexOf(testId[1]) >= 0;
        })[0];
      var latestId = criterionIdSet
        ? criterionIdSet.length - 1
        : false;

      if (!latestId) {
        return test;
      }

      testId[1] = criterionIdSet[latestId].toString();

      return testId.join(':');
    }

    /**
     * Check if an Evaluation object is of v1
     */
    function isV1Evaluation (data) {
      if (typeof data !== 'object') {
        throw new TypeError('Expected data to be of type object but is ' + typeof data + ' instead.');
      }

      var dataContext = data['@context'];

      // Skip if the context isn't there
      if (typeof dataContext !== 'object') {
        return false;
      }

      // Check if full context V1 is represented in dataContext
      return _atLeastEqualTo(dataContext, evalContextV1);
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

    function upgradeToV2 (evaluation) {
      // Initiate update to prevent side-effect alteration of evaluation
      var update = angular.copy(evaluation);
      update['@context'] = evalContextV2;
      update.type = 'Evaluation';

      // Update the EvaluationScope object
      var evalScope = update.evaluationScope;
      evalScope.type = evalScope.type || 'EvaluationScope';
      evalScope.website.type = evalScope.website.type || [
        'TestSubject',
        'WebSite'
      ];

      update.reliedUponTechnology.forEach(function (tech) {
        tech.type = tech.type || 'Technology';
      });

      // Change conformanceTarget to "wai:WCAG2X-Conformance" where X is A{1,3}
      if (evalScope.conformanceTarget.substr(0, 13) === 'wcag20:level_') {
        evalScope.conformanceTarget = 'wai:WCAG2' + (
          evalScope.conformanceTarget
            .replace('wcag20:level_', '')
            .toUpperCase()
        ) + '-Conformance';
      }

      // website.title > website.siteName
      if (evalScope.website.title) {
        evalScope.website.siteName = evalScope.website.title;
        delete evalScope.website.title;
      }

      // Update the structured and random sample
      if (!angular.isArray(update.structuredSample.webpage)) {
        update.structuredSample.webpage = [update.structuredSample.webpage];
      }
      update.structuredSample.type = update.structuredSample.type || 'Sample';
      update.structuredSample.webpage.forEach(fixPage);

      if (!angular.isArray(update.randomSample.webpage)) {
        update.randomSample.webpage = [update.randomSample.webpage];
      }
      update.randomSample.type = update.randomSample.type || 'Sample';
      update.randomSample.webpage.forEach(fixPage);

      // Update assertions
      update.auditResult.forEach(function updateAsserts (assertion) {
        assertion.type = assertion.type.replace('earl:assertion', 'Assertion');

        if (assertion.testRequirement) {
          assertion.test = assertion.testRequirement.replace('wcag20:', 'WCAG2:');
          delete assertion.testRequirement;
        } else if (assertion.testcase) {
          assertion.test = assertion.testcase.replace('wcag20:', 'WCAG2:');
          delete assertion.testcase;
        }

        if (assertion.result.type !== types.EARL.RESULT.class) {
          assertion.result.type = types.EARL.RESULT.class;
        }

        if (assertion.mode !== types.EARL.MODE.MANUAL) {
          assertion.mode = types.EARL.MODE.MANUAL;
        }
        if (assertion.hasPart) {
          assertion.hasPart.forEach(updateAsserts);
        }
      });

      return update;
    }

    function isV2Evaluation (data) {
      if (typeof data !== 'object') {
        throw new TypeError('Expected object but got ' + typeof data);
      }

      if (!Object.prototype.hasOwnProperty.call(data, '@context')) {
        return false;
      }

      if (data['@context'] === evalContextV2) {
        return true;
      }

      return _atLeastEqualTo(data['@context'], evalContextV2);
    }

    function upgradeToV3 (evaluation) {
      var update = angular.copy(evaluation);

      // update context to v3
      update['@context'] = evalContextV3;

      // Update successcriteria ids
      update.auditResult
        .forEach(function (assertion) {
          if (assertion.test) {
            assertion.test = updateTestId(assertion.test);
          }

          if (
            assertion.hasPart &&
            assertion.hasPart.length
          ) {
            assertion.hasPart
              .forEach(function (subAssertion) {
                if (subAssertion.test) {
                  subAssertion.test = updateTestId(subAssertion.test);
                }
              });
          }
        });

      return update;
    }

    function isV3Evaluation (data) {
      if (typeof data !== 'object') {
        throw new TypeError('Expected object but got ' + typeof data);
      }

      if (!Object.prototype.hasOwnProperty.call(data, '@context')) {
        return false;
      }

      if (data['@context'] === evalContextV3) {
        return true;
      }

      return false;
    }

    function _atLeastEqualTo (object1, object2) {
      var result = true;

      for (var property in object2) {
        if (!Object.prototype.hasOwnProperty.call(object1, property)) {
          result = false;
          break;
        }

        if (
          typeof object1[property] === 'object' &&
          !_atLeastEqualTo(object1[property], object2[property])
        ) {
          result = false;
          break;
        }

        if (
          typeof object1[property] === 'string' &&
          object1[property] !== object2[property]
        ) {
          result = false;
          break;
        }
      }

      return result;
    }

    // Compatibility check
    convertor.isLatestVersion = isLatestVersion;

    // Expose methods for testing
    convertor.isV1Evaluation = isV1Evaluation;
    convertor.isV2Evaluation = isV2Evaluation;
    convertor.isV3Evaluation = isV3Evaluation;
    convertor.upgradeToV2 = upgradeToV2;
    convertor.upgradeToV3 = upgradeToV3;

    return convertor;
  });
