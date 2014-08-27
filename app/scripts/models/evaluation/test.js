'use strict';

angular.module('wcagReporter')
.service('evalTestModel', function(TestCaseAssert,
evalScopeModel, wcag20spec, CriterionAssert) {

    var testModel,
        criteria = {};
    
    testModel = {
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
                evalData.auditResult.forEach(testModel.addCritAssert);
            }
        },

        getCritAssert: function (idref) {
            return criteria[idref];
        },

        getCriteriaSorted: function () {
            return wcag20spec.getCriteria()
            .map(function (criterion) {
                    return criteria[criterion.uri];
            }).filter(angular.isDefined);
        },

        addCritAssert: function (result) {
            var prop,
                newCrit = Object.create(CriterionAssert.prototype);
            CriterionAssert.apply(newCrit);
            
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

        addPageForAsserts: function (page) {
            Object.keys(criteria).forEach(function (critName) {
                criteria[critName].addPage(page);
                console.log(criteria[critName].hasPart.length);
            });
        },

        removePageFromAsserts: function (page) {
            Object.keys(criteria).forEach(function (critName) {
                criteria[critName].removePage(page);
            });
        },

        updateToConformance: function () {
            wcag20spec.getCriteria().forEach(function (spec) {
                if (evalScopeModel.matchConformTarget(spec.level) &&
                typeof testModel.criteria[spec.uri] === 'undefined') {
                    testModel.addCritAssert({
                        'testRequirement': spec.uri
                    });
                }
            });
        }
    };
    return testModel;
});