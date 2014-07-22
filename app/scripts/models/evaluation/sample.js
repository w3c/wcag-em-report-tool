'use strict';

angular.module('wcagReporter').service('evalSampleModel', function() {
    var self = this,
        randomPages = [],
        structuredPages = [];

    /**
     * Get the next available page number for a given sample
     * @param  {object} sample 
     * @return {int}    pageNum      
     */
    function getAvailablePageNum(sample) {
        var name, lastId;
        name = (sample === self.randomSample ? '_:rand_' : '_:struct_');
        lastId = sample.webpage.map(function (page) {
            return +page.id.substr(name.length);
        }).sort(function (a,b) {
            return a - b;
        }).pop();

        return lastId + 1;
    }

    function Page() {}

    Page.prototype = {
        'type': 'webpage',
        'id': '',
        description: undefined,
        handle: '',
        tested: true,
        selected: true
    };

    this.structuredSample = {
        webpage: randomPages,
    };

    this.randomSample = {
        webpage: structuredPages
    };

    this.removePage = function (sample, index) {
        sample.webpage.splice(index, 1);
    };

    this.addNewPage = function (sample) {
        var num, page;
        sample = sample || this.randomSample;

        page = new Page();
        num = getAvailablePageNum(sample);

        if (sample === this.randomSample) {
            page.id = '_:rand_' + num;
            page.handle = 'Random page ' + (1+ num);
        } else {
            page.id = '_:struct_' + num;
            page.handle = 'Structured page ' + (1 + num);
        }

        sample.webpage.push(page);
        return page;
    };

    this.getPageByDescr = function (description) {
        var res;
        this.getPages().forEach(function(page) {
            if (page.description === description) {
                res = page;
            }
        });
        return res;
    };

    this.getPages = function () {
        return this.randomSample.webpage
            .concat(this.structuredSample.webpage);
    };

    this.getSelectedPages = function () {
        return this.getPages().map(function (page) {
            if (page.selected) {
                return page;
            }
        });
    };

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    this.validate = function () {
        return [];
    };

    this.getPageById = function (id) {
        // I really need the .find() method :\
        var pages = this.getPages();
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].id === id) {
                return pages[i];
            }
        }
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this);

});