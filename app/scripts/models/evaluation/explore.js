'use strict';

angular.module('wcagReporter')
.service('evalExploreModel', function(knownTech, evalSampleModel) {

    var self = this,
    basicProps = [
        'reliedUponTechnology', 'essentialFunctionality',
        'pageTypeVariety',      'reliedUponTechnology'
    ],
    pageProps = ['commonPages', 'otherRelevantPages'];



    // add all properties to this
    basicProps.forEach(function (prop) {
        self[prop] = undefined;
    });
    
    this.reliedUponTechnology = [];
    this.commonPages = [];
    this.otherRelevantPages = [];

    this.knownTech = knownTech;

    this.addReliedUponTech = function () {
        self.reliedUponTechnology.push({
            title: '', spec: ''
        });
    };

    this.updatePages = function () {
        pageProps.forEach(function (prop) {
            self[prop] = self[prop].filter(function (page) {
                return angular.isDefined(evalSampleModel.getPageById(page.id));
            });
        });
    };

    this.addPageToProp = function (pages) {
        pages.push(evalSampleModel.addNewPage(evalSampleModel.structuredSample));
    };

    this.removePageToProp = function (pages, index) {
        var page = pages.splice(index, 1)[0];
        evalSampleModel.removePage(evalSampleModel.structuredSample, page);
    };

    
    this.importData = function (evalData) {
        basicProps.forEach(function (prop) {
            if (evalData[prop]) {
               self[prop] = evalData[prop];
            }
        });

        pageProps.forEach(function (prop) {
            self[prop] = evalData[prop].map(function (pageId) {
                if (typeof pageId === 'string') {
                    return evalSampleModel.getPageById(pageId);
                }
            }).filter(angular.isDefined);
        });
    };


    this.exportData = function () {
        var exportData = {};

        basicProps.forEach(function (prop) {
            exportData[prop] = self[prop];
        });

        pageProps.forEach(function (prop) {
            exportData[prop] = self[prop].map(function (page) {
                return page.id;
            });
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