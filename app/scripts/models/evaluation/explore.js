'use strict';

angular.module('wcagReporter')
.service('evalExploreModel', function(knownTech) {

    var self = this,
    properties = [
        'reliedUponTechnology',
        'commonPages',
        'essentialFunctionality',
        'pageTypeVariety',
        'otherRelevantPages'
    ];
    // add all properties to this
    properties.forEach(function (prop) {
        self[prop] = undefined;
    });
    this.reliedUponTechnology = [];

    this.knownTech = knownTech;

    this.addReliedUponTech = function () {
        this.reliedUponTechnology.push({
            title: '', spec: ''
        });
    };

    this.toExport = function () {
        var exportData = {};
        properties.forEach(function (prop) {
            exportData[prop] = self[prop];
        });
        return exportData;
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