'use strict';

angular.module('wcagReporter').service('evalExploreModel', function(evalSampleModel) {

    this.reliedUponTechnology = [];
    this.commonPages = undefined;
    this.essentialFunctionality = undefined;
    this.pageTypeVariety = undefined;
    this.otherRelevantPages = undefined;

    this.knownTech = [
        {title: 'HTML5', specs: 'http://www.w3.org/TR/html5/'},
        {title: 'CSS', specs: 'http://www.w3.org/Style/CSS/specs/'},
        {title: 'HTML 4.01', specs: 'http://www.w3.org/TR/html401/'},
        {title: 'WAI-ARIA', spec: 'http://www.w3.org/TR/wai-aria/'},
        {title: 'XHTML 1.0', spec: 'http://www.w3.org/TR/xhtml1/'},
        {title: 'ECMAScript 3', spec: ''},
        {title: 'ECMAScript 4', spec: ''},
        {title: 'ECMAScript 5', spec: ''},
        {title: 'DOM level 1', spec: ''},
        {title: 'DOM level 2', spec: ''},
        {title: 'DOM level 3', spec: ''},
        {title: 'Silverlight', spec: ''},
        {title: 'PDF/A', spec: ''},
        {title: 'PDF/UA', spec: ''},
        {title: 'DOCX', spec: ''},
        {title: 'ODF', spec: ''},
        {title: 'SMIL', spec: ''}
    ];

    this.addReliedUponTech = function () {
        this.reliedUponTechnology.push({
            title: '', spec: ''
        });
    };

    /**
     * Integrate export notes into the sample model
     */
    this.updateSample = function () {

        // Do stuff to the sample
        evalSampleModel.structuredSample;

    };

    this.toExport = function () {
        return this;
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