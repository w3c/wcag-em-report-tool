export default {
  // WCAG-EM
  wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
  Evaluation: 'wcagem:procedure',
  defineScope: 'wcagem:step1',
  scope: 'wcagem:step1a',
  conformanceTarget: 'wcagem:step1b',
  exploreTarget: 'wcagem:step2',
  essentialFunctionality: 'wcagem:step2b',
  pageTypeVariety: 'wcagem:step2c',
  technologiesReliedUpon: 'wcagem:step2d',
  selectSample: 'wcagem:step3',
  structuredSample: 'wcagem:step3a',
  randomSample: 'wcagem:step3b',
  auditSample: 'wcagem:step4',
  reportFindings: 'wcagem:step5',

  // WCAG
  WCAG20: 'http://www.w3.org/TR/WCAG20/#',
  WCAG21: 'http://www.w3.org/TR/WCAG21/#',
  wcagVersion: 'http://www.w3.org/WAI/standards-guidelines/wcag/#versions',

  // EARL
  earl: 'http://www.w3.org/ns/earl#',

  // - earl:Classes
  Assertion: 'earl:Assertion',
  TestMode: 'earl:TestMode',
  TestCriterion: 'earl:TestCriterion',
  TestRequirement: 'earl:TestRequirement',
  TestSubject: 'earl:TestSubject',
  TestResult: 'earl:TestResult',
  OutcomeValue: 'earl:OutcomeValue',
  Pass: 'earl:Pass',
  Fail: 'earl:Fail',
  CannotTell: 'earl:CannotTell',
  NotApplicable: 'earl:NotApplicable',
  NotTested: 'earl:NotTested',

  // - earl:properties
  assertedBy: {
    '@id': 'earl:assertedBy',
    '@type': 'earl:Assertor'
  },
  mode: {
    '@id': 'earl:mode',
    '@type': 'earl:TestMode'
  },
  result: {
    '@id': 'earl:result',
    '@type': 'earl:TestResult'
  },
  subject: {
    '@id': 'earl:subject',
    '@type': 'earl:TestSubject'
  },
  test: {
    '@id': 'earl:test',
    '@type': 'earl:TestCriterion'
  },
  outcome: {
    '@id': 'earl:outcome',
    '@type': 'earl:OutcomeValue'
  },

  // Dublin Core
  dcterms: 'http://purl.org/dc/terms/',
  title: 'dcterms:title',
  description: 'dcterms:description',
  date: {
    '@id': 'dcterms:date',
    '@type': 'W3CDTF'
  },
  hasPart: 'dcterms:hasPart',
  isPartOf: 'dcterms:isPartOf',

  // Schema
  schema: 'http://schema.org/',
  WebSite: 'schema:WebSite',
  WebPage: 'schema:WebPage',

  // Value types
  // - datetime format
  W3CDTF: 'http://www.w3.org/TR/NOTE-datetime',

  // @json-ld; Makes props accessible by dotnotation
  id: '@id',
  type: '@type',
  language: '@language'
};
