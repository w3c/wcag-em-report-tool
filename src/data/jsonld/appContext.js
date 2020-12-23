const deprecatedContext = {
  DfnTechnologyWcag20: 'WCAG20:technologydef',
  DfnReliedUponTechnologyWcag20: 'WCAG20:reliedupondef',
  DfnSetOfWebpagesWcag20: 'WCAG20:set-of-web-pagesdef',
  DfnWebpageWcag20: 'WCAG20:webpagedef',

  DfnTechnologyWcag21: 'WCAG21:dfn-technologies',
  DfnReliedUponTechnologyWcag21: 'WCAG21:dfn-relied-upon',
  DfnSetOfWebpagesWcag21: 'WCAG21:dfn-set-of-web-pages',
  DfnWebpageWcag21: 'WCAG21:dfn-web-page-s',
};

export const importContext = {
  // Add deprecatedContext to support previous versions of this tool
  ...deprecatedContext,

  reporter: 'https://github.com/w3c/wcag-em-report-tool/',

  // WCAG-EM
  wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
  Evaluation: 'wcagem:procedure',
  defineScope: 'wcagem:step1',
  scope: 'wcagem:step1a',
  conformanceTarget: 'wcagem:step1b',
  accessibilitySupportBaseline: 'wcagem:step1c',
  additionalEvaluationRequirements: 'wcagem:step1d',
  exploreTarget: 'wcagem:step2',
  essentialFunctionality: 'wcagem:step2b',
  pageTypeVariety: 'wcagem:step2c',
  technologiesReliedUpon: 'wcagem:step2d',
  selectSample: 'wcagem:step3',
  structuredSample: 'wcagem:step3a',
  randomSample: 'wcagem:step3b',
  auditSample: 'wcagem:step4',
  reportFindings: 'wcagem:step5',
  documentSteps: 'wcagem:step5a',
  commissioner: 'wcagem:commissioner',
  evaluationSpecifics: 'wcagem:step5b',

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
  assertedBy: 'earl:assertedBy',
  mode: 'earl:mode',
  result: 'earl:result',
  subject: 'earl:subject',
  test: 'earl:test',
  outcome: 'earl:outcome',

  // Dublin Core
  dcterms: 'http://purl.org/dc/terms/',
  title: 'dcterms:title',
  description: 'dcterms:description',
  summary: 'dcterms:summary',
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

const exportContext = {
  reporter: 'https://github.com/w3c/wcag-em-report-tool/',

  // WCAG-EM
  wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
  Evaluation: 'wcagem:procedure',
  defineScope: 'wcagem:step1',
  scope: 'wcagem:step1a',
  conformanceTarget: 'wcagem:step1b',
  accessibilitySupportBaseline: 'wcagem:step1c',
  additionalEvaluationRequirements: 'wcagem:step1d',
  exploreTarget: 'wcagem:step2',
  essentialFunctionality: 'wcagem:step2b',
  pageTypeVariety: 'wcagem:step2c',
  technologiesReliedUpon: 'wcagem:step2d',
  selectSample: 'wcagem:step3',
  structuredSample: 'wcagem:step3a',
  randomSample: 'wcagem:step3b',
  auditSample: 'wcagem:step4',
  reportFindings: 'wcagem:step5',
  documentSteps: 'wcagem:step5a',
  commissioner: 'wcagem:commissioner',
  evaluationSpecifics: 'wcagem:step5b',

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
  assertedBy: 'earl:assertedBy',
  mode: 'earl:mode',
  result: 'earl:result',
  subject: 'earl:subject',
  test: 'earl:test',
  outcome: 'earl:outcome',

  // Dublin Core
  dcterms: 'http://purl.org/dc/terms/',
  title: 'dcterms:title',
  description: 'dcterms:description',
  summary: 'dcterms:summary',
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

export default exportContext;
