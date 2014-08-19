'use strict';

angular.module('wcagReporter')
.service('TestCaseAssert', function (evalSampleModel, currentUser) {
	var protoResult = {
        description: '',
        outcome: 'earl:untested'
    };


	function TestCaseAssert() {
        this.subject = [];
        this.result = Object.create(protoResult);
    }
    
    TestCaseAssert.isDefined = function (tc) {
        return !(tc.result.description === protoResult.description &&
               tc.result.outcome === protoResult.outcome);
    };

    TestCaseAssert.prototype = {
        type: 'earl:assertion',
        assertedBy: currentUser.id,
        subject: undefined,
        testCase: undefined,
        result: undefined,
        multiPage: false,
        mode: 'manual',

        addNewPage: function (page) {
            this.subject.push(page);
        },

        removePage: function (i) {
            this.subject.splice(i, 1);
        },

        setSubject: function (pages) {
            var subject = [];
            this.subject = subject;
            if (pages && !angular.isArray(pages)) {
                pages = [pages];
            }
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
