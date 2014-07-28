'use strict';

angular.module('wcagReporter').service('evalScopeModel', function() {
	this.conformanceTarget = 'wcag20:level_aa';
    this.additionalEvalRequirement = '';
    this.website = {
    	title: '',
    	siteScope: ''
    };
    this.accessibilitySupportBaseline = '';
    
    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    this.validate = function () {
        return [];
    };

    this.matchConformTarget = function (level) {
        return this.conformanceTarget.length >= level.length;
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this.website);
    Object.preventExtensions(this);
});