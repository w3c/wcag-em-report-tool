'use strict';

angular.module('wcagReporter').service('evalSampleModel', function() {
    var randomPages = [],
        structuredPages = [];

    function Page() {}
    Page.prototype = {
        'type': 'webpage',
        'id': 'someid',
        description: undefined,
        handle: undefined,
        tested: true,
        selected: true
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

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this);

});