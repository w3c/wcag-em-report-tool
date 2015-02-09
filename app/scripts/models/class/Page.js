'use strict';

angular.module('wcagReporter')
.service('Page', function (translateFilter) {

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
        selected: false,
        displayHandle: function () {
            var num = 0;
            if (this.handle.trim()) {
                return this.handle;
            } else if (this.id.substr(0, 9) === '_:struct_') {
                num = +this.id.substr(9);
                return translateFilter('STRUCTURED_PAGE') + ' ' + (num + 1);
            } else if (this.id.substr(0, 7) === '_:rand_') {
                num = +this.id.substr(7);
                return translateFilter('RANDOM_PAGE') + ' ' + (num + 1);
            } else {
                return translateFilter('SAMPLE_PAGE');
            }
        }
    };

    return Page;
});