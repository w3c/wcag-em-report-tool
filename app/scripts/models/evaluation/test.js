'use strict';

angular.module('wcagReporter').service('evalTestModel',
        function(evalSampleModel) {
    var criteria = {},
        currentUser = {},
        num = 0;

    function TestCaseAssert() {
        this.subject = [];
        this.testCase = this.testCase += (num++);
        this.result = {
            description: 'myDesc',
            outcome: 'earl:untested'
        };
    }

    TestCaseAssert.prototype = {
        '@type': 'earl:assertion',
        assertedBy: currentUser,
        subject: undefined,
        testCase: 'myTestName',
        result: undefined,
        mode: undefined,
        addNewPage: function (page) {
            this.subject.push(page);
        },
        removePage: function (i) {
            this.subject.splice(i, 1);
        },
        setSubject: function (pageIds) {
            var subject = [];
            this.subject = subject;
            pageIds.forEach(function (pageId) {
                var page = evalSampleModel.getPageById(pageId);
                if (page) {
                    subject.push(page);
                }
            });
        }
    };

    function CriterionAssert(idref) {
        this.testRequirement = idref;
        this.hasPart = [];
        this.result = {
            outcome: 'earl:untested',
            description: ''
        };
    }

    CriterionAssert.prototype = {
        '@type': 'earl:assertion',
        testRequirement: undefined,
        assertedBy: currentUser,
        subject: '_:website',
        result: undefined,
        mode: 'manual',
        hasPart: undefined,

        addTestCaseAssertion: function (obj) {
            var key,
                tc = new TestCaseAssert();
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
        }
    };

    return {
        criteria: criteria,
        getResult: function (idref) {
            if (typeof criteria[idref] === 'undefined') {
                criteria[idref] = new CriterionAssert(idref);
            }
            return criteria[idref];
        },

        addResult: function (result) {
            var prop,
                newCrit = Object.create(CriterionAssert.prototype);
            newCrit.hasPart = [];

            for (prop in result) {
                if (prop === 'hasPart') {
                    result.hasPart.forEach(
                            newCrit.addTestCaseAssertion, newCrit);
                } else {
                    newCrit[prop] = result[prop];
                }
            }
            criteria[newCrit.testRequirement] = newCrit;
        },

    };
});