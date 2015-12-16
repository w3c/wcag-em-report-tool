'use strict';

angular.module('wcagReporter')
.value('evalContextV2', {
    // Current namespace
    '@vocab': 'http://www.w3.org/TR/WCAG-EM/#',

    // Namespaces
    'reporter': 'https://github.com/w3c/wcag-em-report-tool/blob/master/dataformat.md#',
    'wcagem': 'http://www.w3.org/TR/WCAG-EM/#',
    'wcag2': 'http://www.w3.org/TR/WCAG20/#',
    'earl': 'http://www.w3.org/ns/earl#',
    'dct': 'http://purl.org/dc/terms/',
    'wai': 'http://www.w3.org/WAI/',
    'sch': 'https://schema.org/',

    // Classes
    'Evaluation': 'wcagem:Evaluation',
    'EvaluationScope': 'wcagem:EvaluationScope',
    'WebSite': ['TestSubject', 'sch:WebSite'],
    'Sample': 'wcagem:Sample',
    'WebPage': 'sch:WebPage',
    'Technology': 'wcag2:technologydef',
    'Assertion': 'earl:Assertion',
    'Assertor': 'earl:Assertor',
    'TestResult': 'earl:TestResult',

    // Evaluation class properties
    'title': 'dct:title',
    'summary': 'dct:summary',
    'creator': {
        '@id':'dct:creator',
        '@type': ['@id', 'earl:Assertor']
    },
    'date': 'dct:date',
    'commissioner': 'wcagem:commissioner',
    'reliedUponTechnology': {
        '@id':'wcag2:reliedupondef',
        '@type': 'wcag2:technologydef'
    },
    'evaluationScope': {
        '@id':   'step1',
        '@type': 'EvaluationScope'
    },
    'commonPages': 'step2a',
    'essentialFunctionality': 'step2b',
    'pageTypeVariety': 'step2c',
    'otherRelevantPages': 'step2e',
    'structuredSample': {
        '@id': 'step3a',
        '@type': 'Sample'
    },
    'randomSample': {
        '@id': 'step3b',
        '@type': 'Sample'
    },
    'auditResult': {
        '@id': 'step4',
        '@type': 'earl:Assertion'
    },
    'specifics': 'step5b',

    // EvaluationScope class properties
    'conformanceTarget': {
        '@id': 'step1b',
        '@type': '@id'
    },
    'accessibilitySupportBaseline': 'step1c',
    'additionalEvalRequirement': '@id': 'step1d',
    'website': {
        '@id': 'wcag2:set-of-web-pagesdef',
        '@type': 'WebSite'
    },

    // sch:WebSite class properties
    'siteScope': 'step1a',
    'siteName': 'sch:name',

    // Sample class properties
    'webpage': {
        '@id': 'wcag2:webpagedef',
        '@type': ['TestSubject', 'sch:WebPage']
    },
        
    // sch:WebPage class properties
    'description': 'dct:description',
    // 'title': 'dct:title',  -- As in the Evaluation class
    'source': {
        '@id': 'dct:source',
        '@type': '@id'
    },
    'tested': 'reporter:tested',

    // wcag2:technologydef class properties
    // 'title': 'dct:title',  -- As in the Evaluation class
    
    // earl:Assertion class properties
    'test': {
        '@id': 'earl:test',
        '@type': '@id'
    }
    'assertedBy': {
        '@id': 'earl:assertedBy',
        '@type': ['@id', 'Assertor']
    },
    'subject': {
        '@id': 'earl:subject',
        '@type': '@id'
    },
    'result': {
        '@id': 'earl:result',
        '@type': 'TestResult'
    },
    'mode': {
        '@id': 'earl:mode',
        '@type': '@id'
    },
    'hasPart', 'dct:hasPart',

    // earl:TestResult class properties
    // 'description': 'dct:description',  -- As in the sch:WebPage class
    'outcome': {
        '@id': 'earl:outcome',
        '@type': '@id'
    },

    // shorthand, because @ can't be used in dot notation
    'id': '@id',
    'type': '@type',
    'lang': '@language'
});