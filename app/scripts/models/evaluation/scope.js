'use strict';

angular.module('wcagReporter')
.service('evalScopeModel', function() {
    var scopeModel = {
        type: 'Scope',
    	conformanceTarget: 'wcag20:level_aa',
        additionalEvalRequirement: '',
        website: {
            type: 'WebSite',
            'id': '_:website',
            title: '',
            siteScope: '' },
        accessibilitySupportBaseline: ''
    };

    scopeModel.exportData = function () {
        return {
            type: scopeModel.type,
            conformanceTarget: scopeModel.conformanceTarget,
            additionalEvalRequirement: scopeModel.additionalEvalRequirement,
            website: {
                type:      scopeModel.website.type,
                id:        scopeModel.website.id,
                title:     scopeModel.website.title,
                siteScope: scopeModel.website.siteScope
            },
            accessibilitySupportBaseline: scopeModel.accessibilitySupportBaseline
        };
    };

    scopeModel.conformanceOptions = [
        'wcag20:level_a', 'wcag20:level_aa', 'wcag20:level_aaa'
    ];

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