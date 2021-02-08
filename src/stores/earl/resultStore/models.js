import { Base as BaseModel } from '@app/stores/earl/models.js';

export class OutcomeValue extends BaseModel {
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

export class TestResult extends BaseModel {
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
