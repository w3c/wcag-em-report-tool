'use strict';

angular.module('wcagReporter')
  .constant('evalContextV2', {
    // Current namespace
    '@vocab': 'http://www.w3.org/TR/WCAG-EM/#',

    // Namespaces
    reporter: 'https://github.com/w3c/wcag-em-report-tool/',
    wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
    WCAG2: 'http://www.w3.org/TR/WCAG20/#',
    earl: 'http://www.w3.org/ns/earl#',
    dct: 'http://purl.org/dc/terms/',
    wai: 'http://www.w3.org/WAI/',
    sch: 'http://schema.org/',

    // Classes
    Evaluation: 'wcagem:Evaluation',
    EvaluationScope: 'wcagem:EvaluationScope',
    TestSubject: 'earl:TestSubject',
    WebSite: 'sch:WebSite',
    Sample: 'wcagem:Sample',
    WebPage: 'sch:WebPage',
    Technology: 'WCAG2:technologydef',
    Assertion: 'earl:Assertion',
    Assertor: 'earl:Assertor',
    TestResult: 'earl:TestResult',

    // Evaluation class properties
    title: 'dct:title',
    summary: 'dct:summary',
    creator: {
      '@id': 'dct:creator',
      '@type': '@id'
    },
    date: 'dct:date',
    commissioner: 'wcagem:commissioner',
    reliedUponTechnology: 'WCAG2:reliedupondef',
    evaluationScope: 'step1',
    commonPages: 'step2a',
    essentialFunctionality: 'step2b',
    pageTypeVariety: 'step2c',
    otherRelevantPages: 'step2e',
    structuredSample: 'step3a',
    randomSample: 'step3b',
    auditResult: 'step4',
    specifics: 'step5b',
    publisher: {
      '@id': 'dct:publisher',
      '@type': '@id'
    },

    // EvaluationScope class properties
    conformanceTarget: {
      '@id': 'step1b',
      '@type': '@id'
    },
    accessibilitySupportBaseline: 'step1c',
    additionalEvalRequirement: 'step1d',
    website: 'WCAG2:set-of-web-pagesdef',

    // sch:WebSite class properties
    siteScope: 'step1a',
    siteName: 'sch:name',

    // Sample class properties
    webpage: 'WCAG2:webpagedef',

    // sch:WebPage class properties
    description: 'dct:description',
    // 'title': 'dct:title',  -- As in the Evaluation class
    source: {
      '@id': 'dct:source',
      '@type': '@id'
    },
    tested: 'reporter:blob/master/docs/EARL%2BJSON-LD.md#tested',

    // WCAG2:technologydef class properties
    // 'title': 'dct:title',  -- As in the Evaluation class

    // earl:Assertion class properties
    test: {
      '@id': 'earl:test',
      '@type': '@id'
    },
    assertedBy: {
      '@id': 'earl:assertedBy',
      '@type': '@id'
    },
    subject: {
      '@id': 'earl:subject',
      '@type': '@id'
    },
    result: 'earl:result',
    mode: {
      '@id': 'earl:mode',
      '@type': '@id'
    },
    hasPart: 'dct:hasPart',

    // earl:TestResult class properties
    // 'description': 'dct:description',  -- As in the sch:WebPage class
    outcome: {
      '@id': 'earl:outcome',
      '@type': '@id'
    },

    // shorthand, because @ can't be used in dot notation
    id: '@id',
    type: '@type',
    lang: '@language'
  });
