'use strict';

angular.module('wcagReporter')
  .service('evalAuditModel', function (
    TestCaseAssert,
    evalScopeModel,
    wcag2spec,
    CriterionAssert,
    types
  ) {
    var auditModel;
    var criteria = {};

    wcag2spec.onLangChange(function () {
      wcag2spec.getCriteria()
        .forEach(function (spec) {
          if (typeof criteria[spec.id] === 'undefined') {
            auditModel.addCritAssert({
              test: spec.id
            });
          }
        });
    });

    function updateAssertionResult (assertion, data) {
      var testResult = data.result;

      if (assertion.result.description.length) {
        assertion.result.description += '\n\n';
      }

      assertion.result.description += testResult.description || '';

      // Decide what outcome should be set.
      // Set Failed if imported result is Failed
      // This forces the evaluator to check the import and this is the only outcome
      // that can be set with certainty by automatic assertors.
      if (
        // Dont try to modify if it already has failed outcome
        assertion.result.outcome !== types.EARL.OUTCOME.FAILED &&
        testResult.outcome === types.EARL.OUTCOME.FAILED
      ) {
        assertion.result.outcome = types.EARL.OUTCOME.FAILED;
      }
    }

    auditModel = {
      criteria: criteria,

      exportData: function () {
        // Deep copy:
        var criteria = angular.copy(auditModel.getCriteriaSorted());
        criteria.reduce(function (list, criterion) {
          // Remove all empty test case asserts
          criterion.hasPart = criterion.hasPart
            .filter(function (testcase) {
              return TestCaseAssert.isDefined(testcase);
            });

          // Delete any methods from the output object
          Object.keys(criterion)
            .forEach(function (key) {
              if (typeof criterion[key] === 'function') {
                delete criterion[key];
              }
            });

          // get all hasPart
          list.push.apply(list, criterion.hasPart);
          return list;
        }, [])
          .forEach(function (testcase) {
            // replace the page object with it's id
            testcase.subject = testcase.subject.map(function (page) {
              return page.id;
            });
          });

        return criteria;
      },

      importData: function (evalData) {
        if (evalData.auditResult) {
          if (!angular.isArray(evalData.auditResult)) {
            evalData.auditResult = [evalData.auditResult];
          }
          // NOTE: Why was this done? (Reset criteria to imported criteria)
          // criteria = {};
          // auditModel.criteria = criteria;

          evalData.auditResult.forEach(auditModel.addCritAssert);
        }
      },

      getCritAssert: function (idref) {
        if (typeof criteria[idref] !== 'object') {
          throw new Error('Unknown criterion of id ' + idref);
        }
        return criteria[idref];
      },

      getCriteriaSorted: function () {
        if (!wcag2spec.isLoaded()) {
          return [];
        }
        var critSpec = wcag2spec.getCriteria();
        return critSpec.map(function (criterion) {
          return criteria[criterion.id];
        })
          .filter(angular.isDefined);
      },

      addCritAssert: function (result) {
        var prop;
        var newCrit = Object.create(CriterionAssert.prototype);
        CriterionAssert.apply(newCrit);

        for (prop in result) {
          if (prop === 'hasPart') {
            // Make sure hasPart is an array:
            if (!angular.isArray(result.hasPart)) {
              result.hasPart = [result.hasPart];
            }
            result.hasPart.forEach(newCrit.addTestCaseAssertion, newCrit);
          } else {
            newCrit[prop] = result[prop];
          }
        }
        criteria[newCrit.test] = newCrit;
      },

      updateCritAssert: function updateCritAssert (id, data) {
        if (data === undefined) {
          return;
        } else if (typeof data !== 'object') {
          return;
        }

        // First try to get a matching criteria before anything else
        var criterion = auditModel.getCritAssert(id);

        if (data.result) {
          updateAssertionResult(criterion, data);
        }
      },

      addPageForAsserts: function (page) {
        Object.keys(criteria)
          .forEach(function (critName) {
            criteria[critName].addPage(page);
          });
      },

      removePageFromAsserts: function (page) {
        Object.keys(criteria)
          .forEach(function (critName) {
            criteria[critName].removePage(page);
          });
      }
    };
    return auditModel;
  });
