'use strict';

angular.module('wcagReporter').service('evalScopeModel', function() {
	this.conformanceTarget = undefined;
    this.commissioner = undefined;
    this.additionalEvalRequirement = undefined;
    this.website = {
    	name: undefined,
    	siteScope: undefined
    };
    this.accessibilitySupportBaseline = undefined;
    
    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     * @return {[type]} [description]
     */
    this.validate = function () {
        return [];
    };

    Object.preventExtensions(this);
});