'use strict';

angular.module('wcagReporter')
.service('Page', function () {

	function Page() {
	}

	Page.getUrl = function (page) {
        var linkReg = /((https?):\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\-\w\d@:%_\+.~#?,&\/\/=]+)/g,
            match = page.description.match(linkReg);
        if (match) {
            return match[0];
        }
    };

    Page.prependProtocol = function (page) {
        if (page.description && page.description.match(/^([\da-z\.-]+)\.([a-z\.]{2,6})/)) {
            page.description = 'http://' + page.description;
        }
    };

    Page.openInWindow = function (page, target) {
        target = target || '_blank';
        var url = Page.getUrl(page);
        if (url) {
            window.open(url, target);
        }
    };

    Page.prototype = {
        'type': 'webpage',
        'id': '',
        description: undefined,
        handle: '',
        tested: false,
        selected: false
    };

    return Page;
});