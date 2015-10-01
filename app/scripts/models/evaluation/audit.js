'use strict';

angular.module('wcagReporter')
.service('evalAuditModel', function(TestCaseAssert,
evalScopeModel, wcag20spec, CriterionAssert) {

    var auditModel,
        criteria = {};

    auditModel = {
        criteria: criteria,

        exportData: function () {
            // Deep copy:
            var criteria = angular.copy(this.getCriteriaSorted());

            criteria.reduce(function (list, criterion) {
                // Remove all empty test case asserts
                criterion.hasPart = criterion.hasPart
                .filter(function (testcase) {
                    return TestCaseAssert.isDefined(testcase);
                });

                // Delete any methods from the output object
                Object.keys(criterion).forEach(function (key) {
                    if (typeof criterion[key] === 'function') {
                        delete criterion[key];
                    }
                });

                // get all hasPart
                list.push.apply(list, criterion.hasPart);
                return list;

            }, []).forEach(function (testcase) {

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
                evalData.auditResult.forEach(auditModel.addCritAssert);
            }
        },

        getCritAssert: function (idref) {
            if (typeof criteria[idref] !== 'object') {
                throw 'Unknown criterion of id ' + idref;
            }
            return criteria[idref];
        },

        getCriteriaSorted: function () {
            return wcag20spec.getCriteria()
            .map(function (criterion) {
                    return criteria[criterion.id];
            }).filter(angular.isDefined);
        },

        addCritAssert: function (result) {
            var prop,
                newCrit = Object.create(CriterionAssert.prototype);
            CriterionAssert.apply(newCrit);

            for (prop in result) {
                if (prop === 'hasPart') {
                    // Make sure hasPart is an array:
                    if (!angular.isArray(result.hasPart)) {
                        result.hasPart = [result.hasPart];
                    }
                    result.hasPart.forEach(
                            newCrit.addTestCaseAssertion, newCrit);
                } else {
                    newCrit[prop] = result[prop];
                }
            }
            criteria[newCrit.testRequirement] = newCrit;
        },

        addPageForAsserts: function (page) {
            Object.keys(criteria).forEach(function (critName) {
                criteria[critName].addPage(page);
            });
        },

        removePageFromAsserts: function (page) {
            Object.keys(criteria).forEach(function (critName) {
                criteria[critName].removePage(page);
            });
        },

        updateToConformance: function () {
            wcag20spec.getCriteria()
            .forEach(function (spec) {
                if (typeof criteria[spec.id] === 'undefined') {
                    auditModel.addCritAssert({
                        'testRequirement': spec.id
                    });
                }
            });
        }
    };
    return auditModel;
});