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
        'pageTypeVariety'
    ],
    pageProps = ['commonPages', 'otherRelevantPages'];


    function getAvailablePageNum(pages, prefix) {
        if (!angular.isArray(pages) || pages.length === 0) {
            return 1;
        }
        var lastId = pages.map(function (page) {
            if (page.handle.indexOf(prefix) === 0) {
                return +page.handle.substr(prefix.length+1);
            }
        }).sort(function (a,b) {
            return a - b;
        }).pop();

        return lastId + 1;
    }

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
        var num,
        page = evalSampleModel.addNewStructuredPage();

        if (pages === exploreModel.commonPages) {
            num = getAvailablePageNum(pages, 'Common page');
            page.handle = 'Common page ' + num;
        } else if (pages === exploreModel.otherRelevantPages) {
            num = getAvailablePageNum(pages, 'Other relevant page');
            page.handle = 'Other relevant page ' + num;
        }
        pages.push(page);
        return page;
    };

    exploreModel.addCommonPage = function () {
        return exploreModel.addPageToProp(exploreModel.commonPages);
    };

    exploreModel.addRelevantPage = function () {
        return exploreModel.addPageToProp(exploreModel.otherRelevantPages);
    };

    exploreModel.removePageFromProp = function (pages, index) {
        var page = pages.splice(index, 1)[0];
        evalSampleModel.removePage(evalSampleModel.structuredSample, page);
        return page;
    };


    exploreModel.importData = function (evalData) {
        if (!angular.isArray(evalData.reliedUponTechnology)) {
            evalData.reliedUponTechnology = [evalData.reliedUponTechnology];
        }
        basicProps.forEach(function (prop) {
            if (evalData[prop]) {
               exploreModel[prop] = evalData[prop];
            }
        });
        pageProps.forEach(function (prop) {
            if (!angular.isArray(evalData[prop])) {
                exploreModel[prop] = [];
            } else {
                exploreModel[prop] = evalData[prop].map(function (pageId) {
                    if (typeof pageId === 'string') {
                        return evalSampleModel.getPageById(pageId);
                    }
                }).filter(angular.isDefined);
            }
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