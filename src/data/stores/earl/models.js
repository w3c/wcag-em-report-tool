// id lookup
const _ids = {};

const partsMixin = (SuperClass) =>
  class PartsMixin extends SuperClass {
    constructor(options = {}) {
      super(options);

      Object.assign(this['@context'], {
        hasPart: 'dcterms:hasPart',
        isPartOf: 'dcterms:isPartOf'
      });
      this.hasPart = options.hasPart;
      this.isPartOf = options.isPartOf;
    }
  };

class Base {
  constructor(options = {}) {
    const { ID, date, title, description, summary } = options;

    this['@context'] = {
      earl: 'http://www.w3.org/ns/earl#',
      dcterms: 'http://purl.org/dc/terms/',
      W3CDTF: 'http://www.w3.org/TR/NOTE-datetime',
      title: 'dcterms:title',
      date: {
        '@id': 'dcterms:date',
        '@type': 'W3CDTF'
      },
      description: 'dcterms:description',
      type: '@type'
    };

    if (options['@id']) {
      this['@id'] = options['@id'];
    }

    this.ID = ID ? ID : createID(this.constructor.name);
    this.date = date ? date : createDate();
    this.title = title;
    this.description = description;
    this.summary = summary;
  }

  update() {
    this.date = createDate();
  }
}

export class TestSubject extends partsMixin(Base) {
  constructor(options = {}) {
    super(options);

    const { type } = options;
    const ALLOWED_TYPES = ['WebSite', 'WebPage'];

    Object.assign(this['@context'], {
      schema: 'http://schema.org/',
      WebSite: 'schema:WebSite',
      WebPage: 'schema:WebPage',
      TestSubject: 'earl:TestSubject'
    });

    if (!this['@id']) {
      this['@id'] = `_:subject_${this.ID}`;
    }
    this.type = ['TestSubject'];

    if (ALLOWED_TYPES.indexOf(type) >= 0) {
      this.type.push(type);
    }
  }
}

class TestCriterion extends partsMixin(Base) {
  constructor(options) {
    super(options);

    Object.assign(this['@context'], {
      TestCriterion: 'earl:TestCriterion'
    });

    this.type = ['TestCriterion'];
  }
}

export class TestRequirement extends TestCriterion {
  constructor(options) {
    super(options);

    Object.assign(this['@context'], {
      TestRequirement: 'earl:TestRequirement'
    });

    this.type.push('TestRequirement');
  }
}

export class OutcomeValue extends Base {
  constructor(options) {
    super(options);

    const { type } = options;
    const ALLOWED_TYPES = [
      'Pass',
      'Fail',
      'CannotTell',
      'NotApplicable',
      'NotTested'
    ];

    Object.assign(this['@context'], {
      OutcomeValue: 'earl:OutcomeValue',
      Pass: 'earl:Pass',
      Fail: 'earl:Fail',
      CannotTell: 'earl:CannotTell',
      NotApplicable: 'earl:NotApplicable',
      NotTested: 'earl:NotTested'
    });

    this.type = ['OutcomeValue'];

    if (ALLOWED_TYPES.indexOf(type) >= 0) {
      this.type.push(type);
    }

    delete this.date;
  }

  update() {}
}

const PASSED = new OutcomeValue({
  '@id': 'earl:passed',
  type: 'Pass'
});
Object.freeze(PASSED);

const FAILED = new OutcomeValue({
  '@id': 'earl:failed',
  type: 'Fail'
});
Object.freeze(FAILED);

const CANT_TELL = new OutcomeValue({
  '@id': 'earl:cantTell',
  type: 'CannotTell'
});
Object.freeze(CANT_TELL);

const INAPPLICABLE = new OutcomeValue({
  '@id': 'earl:inapplicable',
  type: 'NotApplicable'
});
Object.freeze(INAPPLICABLE);

const UNTESTED = new OutcomeValue({
  '@id': 'earl:untested',
  type: 'NotTested'
});
Object.freeze(UNTESTED);

export const OUTCOME = {
  PASSED,
  FAILED,
  CANT_TELL,
  INAPPLICABLE,
  UNTESTED
};
Object.freeze(OUTCOME);

export class TestResult extends Base {
  constructor(options) {
    super(options);

    Object.assign(this['@context'], {
      TestResult: 'earl:TestResult',
      OutcomeValue: 'earl:OutcomeValue',
      outcome: {
        '@id': 'earl:outcome',
        '@type': 'earl:OutcomeValue'
      }
    });

    this.type = ['TestResult'];
    this.outcome = { ...UNTESTED };
  }
}

export class Assertion extends Base {
  constructor(options = {}) {
    super(options);

    Object.assign(this['@context'], {
      Assertion: 'earl:Assertion',
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
      }
    });

    this.type = 'Assertion';
    this.assertedBy = null;
    this.mode = 'earl:manual';
    this.result = options.result;
    this.subject = options.subject;
    this.test = options.test;
  }
}

function createDate(date = new Date()) {
  let dateObject;

  try {
    dateObject = new Date(date);
  } catch (e) {
    console.warn(`[createDate]: ${e.message}`);
    return date;
  }

  return dateObject.toISOString();
}

function createID(className) {
  let currentIds = _ids[className];
  let newId;

  if (!currentIds) {
    currentIds = _ids[className] = [];
  }

  newId = currentIds.length > 0 ? Math.max.apply(null, currentIds) + 1 : 1;

  currentIds.push(newId);

  return newId;
}
