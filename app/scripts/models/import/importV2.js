'use strict';

angular.module('wcagReporter')
.factory('importV2', function (evalContextV1, evalContextV2) {

    function isV1(data) {
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

    function convertToV2(data) {
        data.type = data.type.replace('evaluation', 'Evaluation');
        data.auditResult.forEach(function (assertion) {
            assertion.type = assertion.type.replace('earl:assertion', 'Assertion');
            assertion.result.type = assertion.result.type || 'TestResult'
        });

        function fixPage(page) {
            if (page.type === 'webpage') {
                page.type = ['TestSubject', 'WebPage'];
            }
            page.title = page.handle;
            delete page.handle;
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
        evalScope.type = evalScope.type || 'Scope';
        evalScope.website.type = evalScope.website.type || ['TestSubject', 'WebSite'];
        
        data.reliedUponTechnology.forEach(function (tech) {
            tech.type = tech.type || 'Technology';
        });

        data['@context'] = evalContextV2;

        return data;
    }

    function convertor (data) {
        if (isV1(data)) {
            data = convertToV2(data);
        }
        return data;
    }

    convertor.isV1 = isV1;
    convertor.convertToV2 = convertToV2;

    return convertor;

});