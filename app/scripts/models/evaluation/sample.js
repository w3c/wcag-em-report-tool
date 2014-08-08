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
        if (sample.webpage.length === 0) {
            return 0;
        }

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
        tested: false,
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
        var num, page, minRndSmpl, i;
        sample = sample || self.randomSample;

        page = new Page();
        num = getAvailablePageNum(sample);
        sample.webpage.push(page);

        if (sample === self.randomSample) {
            page.id = '_:rand_' + num;
            page.handle = 'Random page ' + (1+ num);
        } else {
            page.id = '_:struct_' + num;
            page.handle = 'Structured page ' + (1 + num);

            minRndSmpl = Math
                .ceil(sample.webpage.length / 10);
            i = minRndSmpl - self.randomSample.webpage.length;

            while (i > 0) {
                self.addNewPage();
                i -= 1;
            }
        }

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
        return this.structuredSample.webpage
            .concat(this.randomSample.webpage);
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

    /**
     * Clean up the data so it can be exported
     */
    this.toExport = function () {
        var samples,
            // Only export the following properties
            props =['type', 'id', 'description',
        'handle', 'tested'];
        // For both samples
        samples = [this.structuredSample.webpage, this.randomSample.webpage]
        .map(function (webpages) {
            return webpages.map(function (page) {
                // create a copy of a page with only the permitted properties
                var newPage = {};
                props.forEach(function (prop) {
                    newPage[prop] = page[prop];
                });
                return newPage;
            });
        });
        // and return the samples
        return {
            structuredSample: {webpage: samples[0]},
            randomSample:     {webpage: samples[1]}
        };
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