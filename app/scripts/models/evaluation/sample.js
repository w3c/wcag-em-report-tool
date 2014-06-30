'use strict';

angular.module('wcagReporter').service('evalSampleModel', function() {
    
    function Page() {
        this.url = 'http://example.com';
        this.state = 'some state';
    }

    this.structuredSample = [];

    this.randomSample = [];

    this.removePage = function (sample, index) {
        sample.splice(index, 1);
    };

    this.addPage = function (sample) {
        console.log(sample);
        sample.push(new Page());
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