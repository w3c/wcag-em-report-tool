'use strict';

angular.module('wcagReporter')
.service('TestCaseAssert', function (evalSampleModel, currentUser) {
	var num = 0,
        protoResult = {
            description: '',
            outcome: 'earl:untested'
        };


	function TestCaseAssert() {
        this.subject = [];
        this.testCase = this.testCase += (num++);
        this.result = Object.create(protoResult);
    }

    TestCaseAssert.prototype = {
        '@type': 'earl:assertion',
        assertedBy: currentUser.id,
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
        },

        isDefined: function () {
            return this.result.description === protoResult.description &&
                   this.result.outcome === protoResult.outcome;
        }
    };

    return TestCaseAssert;
});
