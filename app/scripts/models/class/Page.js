'use strict';

angular.module('wcagReporter')
.service('Page', function (translateFilter) {

	function Page() {
	}

	Page.getUrl = function (page) {
        if (!page.source) {
            page.source = translateFilter('getUrl')(page.description);
        }
        return page.source;
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
        title: '',
        tested: false,
        selected: false,
        displayTitle: function () {
            var num = 0;
            if (this.title.trim()) {
                return this.title;
            } else if (this.id.substr(0, 9) === '_:struct_') {
                num = +this.id.substr(9);
                return translateFilter('SAMPLE.STRUCTURED_PAGE') + ' ' + (num + 1);
            } else if (this.id.substr(0, 7) === '_:rand_') {
                num = +this.id.substr(7);
                return translateFilter('SAMPLE.RANDOM_PAGE') + ' ' + (num + 1);
            } else {
                return translateFilter('SAMPLE.SAMPLE_PAGE');
            }
        }
    };

    return Page;
});