'use strict';

angular.module('wcagReporter')
.factory('importV2', function (evalContextV1) {

    function isV1(data) {
        var dataContext = data['@context'];
        var checkv1 = true;

        Object.keys(evalContextV1)
        .forEach(function (prop) {
            if (typeof evalContextV1[prop] === 'string' &&
                dataContext[prop] !== evalContextV1[prop]) {
                checkv1 = false;
            }
            if (typeof evalContextV1[prop] === 'object') {
                Object.keys(evalContextV1[prop])
                .forEach(function (subProp) {
                    if (typeof evalContextV1[prop][subProp] === 'string' &&
                        dataContext[prop][subProp] !== evalContextV1[prop][subProp]) {
                        checkv1 = false;
                    }
                });
            }
        });
        return checkv1;
    }

    function convertToV2(data) {
        data.auditResult.forEach(function (result) {
            result.type = result.type.replace('earl:assertion', 'earl:Assertion');
        });

        function fixPage(page) {
            page.type  = page.type.replace('webpage', 'Webpage');
            page.title = page.handle;
            delete page.handle;
        }

        if (!angular.isArray(data.structuredSample.webpage)) {
            data.structuredSample.webpage = [data.structuredSample.webpage];
        }
        data.structuredSample.webpage.forEach(fixPage);

        if (!angular.isArray(data.randomSample.webpage)) {
            data.randomSample.webpage = [data.randomSample.webpage];
        }
        data.randomSample.webpage.forEach(fixPage);

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