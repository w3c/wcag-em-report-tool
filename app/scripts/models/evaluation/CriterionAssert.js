'use strict';

angular.module('wcagReporter')
.service('CriterionAssert', function(evalSampleModel,
TestCaseAssert, wcag20spec, currentUser) {

	function CriterionAssert(idref) {
        var self = this;
        
        this.testRequirement = idref;
        this.hasPart = [];
        this.result = {
            outcome: 'earl:untested',
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
    }

    CriterionAssert.prototype = {
        type: 'earl:assertion',
        testRequirement: undefined,
        assertedBy: currentUser.id,
        subject: '_:website',
        result: undefined,
        mode: 'manual',
        hasPart: undefined,
        getSinglePageAsserts: undefined,
        getMultiPageAsserts: undefined,

        addTestCaseAssertion: function (obj) {
            var key,
                tc = new TestCaseAssert();
            tc.testcase = this.testRequirement;
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

        /**
         * For each page in the sample, create a 
         * test case if none exists already
         */
        setCaseForEachPage: function () {
            var singlePageCases,
                self = this;

            // Find all test cases with a single page
            singlePageCases = this.hasPart
            .filter(function (assert) {
                return (angular.isArray(assert.subject) &&
                       assert.subject.length === 1);
            // Put all pages from them in singlePageCases
            }).map(function (assert) {
                return assert.subject[0];
            });

            // Select all pages, filter those not singlePageCases
            evalSampleModel.getPages()
            .filter(function (page) {
                return singlePageCases.indexOf(page) === -1;

            // Then add a test case assertion with that page
            }).forEach(function (page) {
                self.addTestCaseAssertion({
                    subject: [page]
                });
            });
        },

        getSpec: function () {
            return wcag20spec.getCriterion(this.testRequirement);
        }
    };

    return CriterionAssert;
});
