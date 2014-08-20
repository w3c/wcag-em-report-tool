'use strict';

angular.module('wcagReporter')
.service('evalSampleModel', function() {
    var sampleModel = {},
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

        name = (sample === sampleModel.randomSample ? '_:rand_' : '_:struct_');
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

    sampleModel.structuredSample = {
        webpage: randomPages,
    };

    sampleModel.randomSample = {
        webpage: structuredPages
    };

    sampleModel.removePage = function (sample, pageNum) {
        var page;
        if (!angular.isNumber(pageNum)) {
            pageNum = sample.webpage.indexOf(pageNum);
        }

        if (angular.isNumber(pageNum) && pageNum >= 0) {
            page = sample.webpage.splice(pageNum, 1)[0];
        }
    };

    sampleModel.addNewPage = function (sample) {
        var num, page, minRndSmpl, i;
        sample = sample || sampleModel.randomSample;

        page = new Page();
        num = getAvailablePageNum(sample);
        sample.webpage.push(page);

        if (sample === sampleModel.randomSample) {
            page.id = '_:rand_' + num;
            page.handle = 'Random page ' + (1+ num);
        } else {
            page.id = '_:struct_' + num;
            page.handle = 'Structured page ' + (1 + num);

            minRndSmpl = Math
                .ceil(sample.webpage.length / 10);
            i = minRndSmpl - sampleModel.randomSample.webpage.length;

            while (i > 0) {
                sampleModel.addNewPage();
                i -= 1;
            }
        }

        return page;
    };

    sampleModel.getPageByHandle = function (handle) {
        var res;
        sampleModel.getPages().forEach(function(page) {
            if (page.handle === handle) {
                res = page;
            }
        });
        return res;
    };

    sampleModel.getPages = function () {
        return sampleModel.structuredSample.webpage
            .concat(sampleModel.randomSample.webpage);
    };

    sampleModel.getSelectedPages = function () {
        return sampleModel.getPages().filter(function (page) {
            return page.selected === true;
        });
    };

    sampleModel.getSelectedPages = function () {
        return sampleModel.getPages().map(function (page) {
            if (page.selected) {
                return page;
            }
        });
    };

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    sampleModel.validate = function () {
        return [];
    };

    /**
     * Clean up the data so it can be exported
     */
    sampleModel.exportData = function () {
        var samples,
            // Only export the following properties
            props =['type', 'id', 'description',
        'handle', 'tested'];
        // For both samples
        samples = [sampleModel.structuredSample.webpage, sampleModel.randomSample.webpage]
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

    sampleModel.getPageById = function (id) {
        var pages = sampleModel.getPages();
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].id === id) {
                return pages[i];
            }
        }
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(sampleModel);

    return sampleModel;

});

