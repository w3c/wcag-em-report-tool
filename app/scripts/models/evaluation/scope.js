'use strict';

angular.module('wcagReporter').service('evalScopeModel', function() {
	this.conformanceTarget = undefined;
    this.additionalEvalRequirement = undefined;
    this.website = {
    	name: undefined,
    	siteScope: undefined
    };
    this.accessibilitySupportBaseline = undefined;
    
    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    this.validate = function () {
        return [];
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(this);
});