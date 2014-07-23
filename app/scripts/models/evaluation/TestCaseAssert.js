'use strict';

angular.module('wcagReporter')
.service('TestCaseAssert', function (evalSampleModel) {
	var num = 0;

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
        assertedBy: undefined,
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
        
        setSubject: function (pages) {
            var subject = [];
            this.subject = subject;
            pages.forEach(function (page) {
                if (typeof page === 'string') {
                    page = evalSampleModel.getPageById(page);    
                }
                if (typeof page === 'object') {
                    subject.push(page);
                }
            });
        }
    };

    return TestCaseAssert;
});
