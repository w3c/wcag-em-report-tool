'use strict';

angular.module('wcagReporter')
.service('evalTestModel', function(evalSampleModel, TestCaseAssert,
        evalScopeModel, wcag20spec, CriterionAssert) {

    var criteria = {};
    
    return {
        criteria: criteria,

        toExport: function () {
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

        updateToConformance: function () {
            var self = this;
            wcag20spec.getCriteria().forEach(function (spec) {
                if (evalScopeModel.matchConformTarget(spec.level) &&
                typeof self.criteria[spec.uri] === 'undefined') {
                    self.addCritAssert({
                        'testRequirement': spec.uri
                    });
                }
            });
        }
    };
    
});