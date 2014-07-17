'use strict';

angular.module('wcagReporter').service('evalSampleModel', function() {
    var randomPages = [],
        structuredPages = [];

    function Page() {}
    Page.prototype = {
        '@type': 'webpage',
        '@id': 'someid',
        description: undefined,
        handle: undefined
    };


    this.structuredSample = {
        webpage: randomPages
    };

    this.randomSample = {
        webpage: structuredPages
    };

    this.removePage = function (sample, index) {
        sample.webpage.splice(index, 1);
    };

    this.addPage = function (sample) {
        sample.webpage.push(new Page());
    };

    this.getPageByDescr = function (description) {
        var foundPage;
        function findPage (page) {
            if (page.description === description) {
                foundPage = page;
            }
        }
        this.randomSample.webpage.forEach(findPage);
        this.structuredSample.webpage.forEach(findPage);
        return foundPage;
    };


    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    this.validate = function () {
        return [];
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this);

});