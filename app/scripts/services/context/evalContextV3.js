'use strict';

angular
  .module('wcagReporter')
  .constant('evalContextV3', {
    // Current namespace
    '@vocab': 'http://www.w3.org/TR/WCAG-EM/#',

    // Namespaces
    reporter: 'https://github.com/w3c/wcag-em-report-tool/',
    wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
    WCAG2: 'http://www.w3.org/TR/WCAG21/#',
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
    Technology: 'WCAG2:dfn-technologies',
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
    reliedUponTechnology: 'WCAG2:dfn-relied-upon',
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
    website: 'WCAG2:dfn-set-of-web-pages',

    // sch:WebSite class properties
    siteScope: 'step1a',
    siteName: 'sch:name',

    // Sample class properties
    // sch:WebPage class properties
    webpage: 'WCAG2:dfn-web-page-s',
    description: 'dct:description',
    source: {
      '@id': 'dct:source',
      '@type': '@id'
    },
    tested: 'reporter:blob/master/docs/EARL%2BJSON-LD.md#tested',

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
    outcome: {
      '@id': 'earl:outcome',
      '@type': '@id'
    },

    // shorthand, because @ can't be used in dot notation
    id: '@id',
    type: '@type',
    lang: '@language'
  });
