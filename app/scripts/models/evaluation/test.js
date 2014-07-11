'use strict';

angular.module('wcagReporter').service('evalTestModel', function() {
	var criterion = {},
		currentUser = {},
		num = 0;

	function TestCaseAssert() {
		this.pages = [];
		this.testCase = this.testCase += (num++);
	}

	TestCaseAssert.prototype = {
		'@type': 'earl:assertion',
		assertedBy: currentUser,
        description: 'myDesc',
        pages: undefined,
        testCase: 'myTestName',
        outcome: 'earl:pass',
        mode: '@earlMode',
        addNewPage: function (url) {
        	this.pages.push({url: url});
        },
		removePage: function (i) {
			this.pages.splice(i, 1);
		}
	};

	function CriterionAssert(idref) {
		this.testRequirement = idref;
		this.testCaseAsserts = [];
		this.addTestCaseAssertion();
	}

	CriterionAssert.prototype = {
		'@type': 'earl:assertion',
		testRequirement: undefined,
		assertedBy: currentUser,
        subject: 'website--todo',
 	    outcome: '',
 	    mode: 'manual',
        testCaseAsserts: undefined,
        addTestCaseAssertion: function () {
        	this.testCaseAsserts.push(new TestCaseAssert());
        }
	};

	return {
		getResult: function (idref) {
			if (typeof criterion[idref] === 'undefined') {
				criterion[idref] = new CriterionAssert(idref);
			}
			return criterion[idref];
		}
	};
});