'use strict';

angular.module('wcagReporter')
.service('evalExploreModel', function(knownTech, evalSampleModel) {

    var exploreModel = {
        commonPages: [],
        otherRelevantPages: [],
        knownTech: knownTech
    },
    basicProps = [
        'reliedUponTechnology', 'essentialFunctionality',
        'pageTypeVariety',      'reliedUponTechnology'
    ],
    pageProps = ['commonPages', 'otherRelevantPages'];

    // add all properties to this
    basicProps.forEach(function (prop) {
        exploreModel[prop] = undefined;
    });

    exploreModel.reliedUponTechnology = [];
    
    exploreModel.addReliedUponTech = function () {
        exploreModel.reliedUponTechnology.push({
            title: '', id: ''
        });
    };

    exploreModel.updatePages = function () {
        pageProps.forEach(function (prop) {
            exploreModel[prop] = exploreModel[prop].filter(function (page) {
                return angular.isDefined(evalSampleModel.getPageById(page.id));
            });
        });
    };

    exploreModel.addPageToProp = function (pages) {
        pages.push(evalSampleModel.addNewPage(evalSampleModel.structuredSample));
    };

    exploreModel.removePageToProp = function (pages, index) {
        var page = pages.splice(index, 1)[0];
        evalSampleModel.removePage(evalSampleModel.structuredSample, page);
    };

    
    exploreModel.importData = function (evalData) {
        basicProps.forEach(function (prop) {
            if (evalData[prop]) {
               exploreModel[prop] = evalData[prop];
            }
        });

        pageProps.forEach(function (prop) {
            exploreModel[prop] = evalData[prop].map(function (pageId) {
                if (typeof pageId === 'string') {
                    return evalSampleModel.getPageById(pageId);
                }
            }).filter(angular.isDefined);
        });
    };


    exploreModel.exportData = function () {
        var exportData = {};

        basicProps.forEach(function (prop) {
            exportData[prop] = exploreModel[prop];
        });

        pageProps.forEach(function (prop) {
            exportData[prop] = exploreModel[prop].map(function (page) {
                return page.id;
            });
        });

        return exportData;
    };

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    exploreModel.validate = function () {
        return [];
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(exploreModel);

    return exploreModel;
});