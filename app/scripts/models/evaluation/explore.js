'use strict';

angular.module('wcagReporter').service('evalExploreModel', function() {

    this.reliedUponTechnology = [];
    this.commonPages = undefined;
    this.essentialFunctionality = undefined;
    this.pageTypeVariety = undefined;
    this.otherRelevantPages = undefined;

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    this.validate = function () {
        return [];
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this);
});