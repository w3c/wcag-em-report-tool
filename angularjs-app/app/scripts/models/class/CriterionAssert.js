'use strict';

angular.module('wcagReporter')
  .service('CriterionAssert', function (
    types,
    evalSampleModel,
    $filter,
    TestCaseAssert,
    wcag2spec,
    currentUser
  ) {
    function CriterionAssert (idref) {
      var self = this;

      // Copy prototype onto the object - prevents problems with JSON.stringify()
      for (var key in CriterionAssert.prototype) {
        if (!this.hasOwnProperty(key)) {
          this[key] = CriterionAssert.prototype[key];
        }
      }

      this.test = idref;
      this.mode = types.EARL.MODE.MANUAL;
      this.hasPart = [];
      this.result = {
        type: types.EARL.RESULT.class,
        outcome: types.EARL.OUTCOME.UNTESTED,
        description: ''
      };

      this.getSinglePageAsserts = function () {
        return self.hasPart.filter(function (page) {
          return page.multiPage !== true;
        });
      };

      this.getMultiPageAsserts = function () {
        return self.hasPart.filter(function (page) {
          return page.multiPage === true;
        });
      };

      this.addPage = function (page) {
        this.addTestCaseAssertion({
          subject: [page]
        });
      };

      this.removePage = function (page) {
        var parts = this.hasPart;
        var x = parts.map(function (assert) {
          return assert.subject[0].id;
        });
        parts.forEach(function (assert, partIndex) {
          var subjIndex = assert.subject.indexOf(page);
          if (subjIndex !== -1) {
            if (assert.multiPage) {
              parts.subject.splice(subjIndex, 1);
            } else {
              parts.splice(partIndex, 1);
            }
          }
        });
      };
    }

    CriterionAssert.prototype = {
      type: 'Assertion',
      test: undefined,
      assertedBy: undefined,
      subject: '_:website',
      result: undefined,
      mode: undefined,
      hasPart: undefined,
      getSinglePageAsserts: undefined,
      getMultiPageAsserts: undefined,

      addTestCaseAssertion: function (obj) {
        var key;
        var tc = new TestCaseAssert();
        tc.testcase = this.test;
        this.hasPart.push(tc);
        if (!obj) {
          return;
        }
        for (key in obj) {
          if (key === 'subject') {
            tc.setSubject(obj.subject);
          } else {
            tc[key] = obj[key];
          }
        }
      },

      transferMacroData: function (macroAssert) {
        this.getSinglePageAsserts()
          .filter(function (assert) {
            return macroAssert.subject.indexOf(assert.subject[0]) !== -1;

          // Append the current result
          })
          .forEach(function (assert) {
            if (typeof assert.result.description !== 'string') {
              assert.result.description = '';
            }

            if (assert.result.description.trim() === '') {
              assert.result.description = macroAssert.result.description.trim();
            } else {
              assert.result.description = (macroAssert.result.description +
                        '\n\n' + assert.result.description).trim();
            }
            assert.result.outcome = macroAssert.result.outcome;
          });
      },

      /**
         * For each page in the sample, create a
         * test case if none exists already
         */
      setCaseForEachPage: function () {
        var singlePageCases;
        var self = this;

        // Find all test cases with a single page
        singlePageCases = this.hasPart
          .filter(function (assert) {
            return (angular.isArray(assert.subject) &&
                       assert.subject.length === 1);
            // Put all pages from them in singlePageCases
          })
          .map(function (assert) {
            return assert.subject[0];
          });

        // Select all pages, filter those not singlePageCases
        evalSampleModel.getPages()
          .filter(function (page) {
            return singlePageCases.indexOf(page) === -1;

            // Then add a test case assertion with that page
          })
          .forEach(function (page) {
            self.addTestCaseAssertion({
              subject: [page]
            });
          });
      },

      getSpec: function () {
        return wcag2spec.getCriterion(this.test);
      }
    };

    // Checks if an assert is empty
    CriterionAssert.isDefined = function (critAssert) {
      var hasPart = critAssert.hasPart
        .reduce(function (hasPart, tcAssert) {
          if (hasPart || tcAssert.isDefined()) {
            return true;
          } else {
            return false;
          }
        }, false);

      return hasPart || !!critAssert.result.description ||
               critAssert.result.outcome !== types.EARL.OUTCOME.UNTESTED;
    };

    CriterionAssert.updateMetadata = function (critAssert) {
      critAssert.assertedBy = currentUser.id;
      critAssert.mode = types.EARL.MODE.MANUAL;
      critAssert.result.date = $filter('date')(Date.now(), 'yyyy-MM-dd HH:mm:ss Z');
    };

    return CriterionAssert;
  });
