// id lookup
// May be better to move this to collectionStore
const _ids = {};

export const partsMixin = (SuperClass) =>
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

export class Base {
  constructor(options = {}) {
    const { ID, date, title, description, summary } = options;

    this['@context'] = {
      earl: 'http://www.w3.org/ns/earl#',
      dcterms: 'http://purl.org/dc/terms/',
      title: 'dcterms:title',
      date: 'dcterms:date',
      description: 'dcterms:description',
      id: '@id',
      type: '@type'
    };

    if (options.id) {
      this.id = options.id;
    }

    this.ID = ID ? ID : createID(this.constructor.name);
    this.date = date ? createDate(date) : createDate();
    this.title = title;
    this.description = description;
    this.summary = summary;
  }

  update() {
    this.date = createDate();
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
  id: 'earl:passed',
  type: 'Pass'
});
Object.freeze(PASSED);

const FAILED = new OutcomeValue({
  id: 'earl:failed',
  type: 'Fail'
});
Object.freeze(FAILED);

const CANT_TELL = new OutcomeValue({
  id: 'earl:cantTell',
  type: 'CannotTell'
});
Object.freeze(CANT_TELL);

const INAPPLICABLE = new OutcomeValue({
  id: 'earl:inapplicable',
  type: 'NotApplicable'
});
Object.freeze(INAPPLICABLE);

const UNTESTED = new OutcomeValue({
  id: 'earl:untested',
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
  constructor(options = {}) {
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
    this.outcome = options.outcome || { ...UNTESTED };
  }
}

function createDate(date = new Date()) {
  let dateObject;

  try {
    dateObject = (new Date(date)).toISOString();
  } catch (e) {
    console.warn(`[createDate]: ${e.message}`);
    dateObject = date;
  }

  return dateObject;
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
