'use strict';

angular.module('wcagReporter').service('evalSampleModel', function() {
    
    this.structuredSample = [];

    this.randomSample = [];

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    this.validate = function () {
        return [];
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this);

});