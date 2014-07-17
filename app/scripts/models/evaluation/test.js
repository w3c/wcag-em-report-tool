'use strict';

angular.module('wcagReporter').service('evalTestModel', function() {
	var criteria = {},
		currentUser = {},
		num = 0;

	function TestCaseAssert() {
		this.subject = [];
		this.testCase = this.testCase += (num++);
	}

	TestCaseAssert.prototype = {
		'@type': 'earl:assertion',
		assertedBy: currentUser,
        description: 'myDesc',
        subject: undefined,
        testCase: 'myTestName',
        outcome: 'earl:untested',
        mode: undefined,
        addNewPage: function (page) {
        	this.subject.push(page);
        },
		removePage: function (i) {
			this.subject.splice(i, 1);
		}
	};

	function CriterionAssert(idref) {
		this.testRequirement = idref;
		this.testCaseAsserts = [];
	}

	CriterionAssert.prototype = {
		'@type': 'earl:assertion',
		testRequirement: undefined,
		assertedBy: currentUser,
        subject: '_:website',
 	    outcome: 'earl:untested',
 	    mode: 'manual',
        testCaseAsserts: undefined,
        addTestCaseAssertion: function (obj) {
        	var key,
        		tc = new TestCaseAssert();
        	if (obj) {
        		for (key in obj) {
        			tc[key] = obj[key];
        		}
        	}
        	this.testCaseAsserts.push(tc);
        }
	};

	return {
		getResult: function (idref) {
			if (typeof criteria[idref] === 'undefined') {
				criteria[idref] = new CriterionAssert(idref);
			}
			return criteria[idref];
		},
		criteria: criteria
	};
});