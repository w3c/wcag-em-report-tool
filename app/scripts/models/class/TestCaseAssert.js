'use strict';

angular.module('wcagReporter')
.service('TestCaseAssert', function (evalSampleModel, currentUser) {
	var protoResult = {
        description: '',
        outcome: 'earl:untested'
    };


	function TestCaseAssert() {
        // Copy prototype onto the object - prevents problems with JSON.stringify()
        for (var key in TestCaseAssert.prototype) {
            if (!this.hasOwnProperty(key)) {
                this[key] = TestCaseAssert.prototype[key];
            }
        }

        this.subject = [];
        this.result = Object.create(protoResult);
    }

    TestCaseAssert.isDefined = function (tc) {
        var hasPage = false;
        tc.subject.forEach(function (page) {
            hasPage = (hasPage || page.title || page.description);
        });
        return ((tc.result.description || tc.result.outcome !== protoResult.outcome) && hasPage);
    };

    TestCaseAssert.prototype = {
        type: 'Assertion',
        assertedBy: currentUser.id,
        subject: undefined,
        testCase: undefined,
        result: undefined,
        multiPage: false,
        mode: 'earl:manual',
        isDefined: function () {
            return TestCaseAssert.isDefined(this);
        },

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
