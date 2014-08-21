'use strict';

angular.module('wcagReporter')
.service('Page', function () {

	function Page() {
	}

	Page.getUrl = function (page) {
        var linkyReg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            match = page.description.match(linkyReg);
        if (match) {
            return match[0];
        }
    };

    Page.windowOpen = function (page, target) {
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
        selected: true,
        
    };

    return Page;
});