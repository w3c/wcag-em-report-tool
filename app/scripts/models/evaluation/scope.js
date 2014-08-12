'use strict';

angular.module('wcagReporter')
.service('evalScopeModel', function() {
    var scopeModel = {
    	conformanceTarget: 'wcag20:level_aa',
        additionalEvalRequirement: '',
        website: { title: '', siteScope: '' },
        accessibilitySupportBaseline: ''
    };

    scopeModel.exportData = function () {
        return Object.create(scopeModel);
    };
    
    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    scopeModel.validate = function () {
        return [];
    };

    scopeModel.matchConformTarget = function (level) {
        return scopeModel.conformanceTarget.length >= level.length;
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(scopeModel.website);
    Object.preventExtensions(scopeModel);

   return scopeModel; 
});