'use strict';

angular.module('wcagReporter')
.factory('importV2', function () {
    var v1context = {
        '@vocab': 'http://www.w3.org/TR/WCAG-EM/#',
        'wcag20': 'http://www.w3.org/TR/WCAG20/#',
        'earl': 'http://www.w3.org/ns/earl#',
        'dct': 'http://purl.org/dc/terms/',
        'reporter': 'https://github.com/w3c/wcag-em-report-tool/blob/master/dataformat.md#',
        'conformanceTarget': {'id': 'step1b', 'type': 'id'},
        'evaluationScope':              {'id':   'step1'},
        'accessibilitySupportBaseline': {'id':   'step1c'},
        'additionalEvalRequirement':    {'id':   'step1d'},
        'siteScope':                    {'id':   'step1a'},
        'commonPages':                  {'id':   'step2a'},
        'essentialFunctionality':       {'id':   'step2b'},
        'pageTypeVariety':              {'id':   'step2c'},
        'otherRelevantPages':           {'id':   'step2e'},
        'structuredSample':             {'id':   'step3a'},
        'randomSample':                 {'id':   'step3b'},
        'specifics':                    {'id':   'step5b'},
        'auditResult':                  {'id':   'step4'},
        'outcome':                 {'type': 'id'},
        'subject':                 {'type': 'id'},
        'assertedBy':              {'type': 'id'},
        'testRequirement':         {'type': 'id'},
        'creator':                 {'type': 'id'},
        'handle': 'reporter:handle',
        'description': 'reporter:description',
        'tested': 'reporter:tested',
        'id': '@id',
        'type': '@type',
        'title': 'dct:title',
        'hasPart': 'dct:hasPart',
        'specs': '@id',
        'reliedUponTechnology': 'wcag20:reliedupondef'
    };

    function isV1(data) {
        var dataContext = data['@context'];
        var isV1 = true;

        Object.keys(v1context)
        .forEach(function (prop) {
            if (typeof v1context[prop] === 'string' &&
                dataContext[prop] !== v1context[prop]) {
                isV1 = false;
            }
            if (typeof v1context[prop] === 'object') {
                Object.keys(v1context[prop])
                .forEach(function (subProp) {
                    if (typeof v1context[prop][subProp] === 'string' &&
                        dataContext[prop][subProp] !== v1context[prop][subProp]) {
                        isV1 = false;
                    }
                });
            }
        });
        return isV1;
    }

    function convertToV2(data) {
        data.auditResult.forEach(function (result) {
            result.type = result.type.replace('earl:assertion', 'earl:Assertion');
        });

        return data;
    }

    return function (data) {
        if (isV1(data)) {
            data = convertToV2(data);
        }
        return data;
    };

});