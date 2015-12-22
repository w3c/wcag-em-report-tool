'use strict';

angular.module('wcagReporter')
.factory('importV1', function (evalContextV1, evalContextV2, $filter) {
    var getUrl = $filter('getUrl');



    function convertor (importArray) {
        return importArray.map(function (importObj) {
            // upgrade from v1 to v2
            if (isV1Evaluation(importObj)) {
                importObj = upgradeToV2(importObj);

            // Correct the foaf namespace
            } else if (typeof importObj === 'object' &&
                typeof importObj['@context'] === 'object' &&
                importObj['@context']['@vocab'] === 'http://xmlns.com/foaf/spec/#') {
                importObj['@context']['@vocab'] = 'http://xmlns.com/foaf/0.1/';
            }
            return importObj;
        });
    }

    /**
     * Check if an Evaluation object is of v1
     */
    function isV1Evaluation(data) {
        if (typeof data !== 'object') {
            throw new TypeError('Expected object for ' + data);
        }
        var dataContext  = data['@context'];
        var contextProps = Object.keys(evalContextV1);
        // Skip if the context isn't there
        if (typeof dataContext !== 'object') {
            return false;
        }

        // Dirty check if they have the same keys
        if (contextProps.sort().join(',') !== Object.keys(dataContext).sort().join(',')) {
            return false;
        }

        return contextProps.reduce(function (result, prop) {
            if (!result) { // false is false
                return result;

            // Context prop doesn't exist
            } else if (typeof dataContext[prop] === 'undefined') {
                return false;

            // Context prop is different value
            } else if (typeof dataContext[prop] === 'string' &&
                dataContext[prop] !== evalContextV1[prop]) {
                return false;

            // Context prop is an object, compare it's content
            } else if (typeof dataContext[prop] === 'object') {
                return Object.keys(evalContextV1[prop])
                .reduce(function (result, subProp) {
                    if (!result) {
                        return result;

                    } else if (typeof dataContext[prop][subProp] === 'undefined') {
                        return false;

                    } else if (typeof dataContext[prop][subProp] === 'string' &&
                        dataContext[prop][subProp] !== evalContextV1[prop][subProp]) {
                        return false;
                    } else {
                        return true;
                    }
                }, true);

            } else {
                return true;
            }
        }, true);
    }

    /**
     * Evaluation object from v1 to v2
     */
    function upgradeToV2(data) {
        // Capitalize Evaluation
        data.type = data.type.replace('evaluation', 'Evaluation');
        data.auditResult.forEach(function (assertion) {
            assertion.type = assertion.type.replace('earl:assertion', 'Assertion');
            assertion.test = assertion.testRequirement.replace('wcag20:', 'WCAG2:');
            delete assertion.testRequirement;

            assertion.result.type = assertion.result.type || 'TestResult'
        });

        function fixPage(page) {
            if (page.type === 'webpage') {
                page.type = ['TestSubject', 'WebPage'];
            }
            page.title = page.handle;
            delete page.handle;
            page.source = getUrl(page.description);
        }

        if (!angular.isArray(data.structuredSample.webpage)) {
            data.structuredSample.webpage = [data.structuredSample.webpage];
        }
        data.structuredSample.type = data.structuredSample.type || 'Sample';
        data.structuredSample.webpage.forEach(fixPage);

        if (!angular.isArray(data.randomSample.webpage)) {
            data.randomSample.webpage = [data.randomSample.webpage];
        }
        data.randomSample.type = data.randomSample.type || 'Sample';
        data.randomSample.webpage.forEach(fixPage);

        var evalScope = data.evaluationScope;
        evalScope.type = evalScope.type || 'EvaluationScope';
        evalScope.website.type = evalScope.website.type || ['TestSubject', 'WebSite'];
        
        data.reliedUponTechnology.forEach(function (tech) {
            tech.type = tech.type || 'Technology';
        });

        data['@context'] = evalContextV2;

        return data;
    }
    
    // Expose methods for testing
    convertor.isV1Evaluation = isV1Evaluation;
    convertor.upgradeToV2 = upgradeToV2;

    return convertor;

});