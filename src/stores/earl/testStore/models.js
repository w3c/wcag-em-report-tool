import { Base as BaseModel, partsMixin } from '@app/stores/earl/models.js';

export const TestCriterionTypes = {
  TESTCRITERION: 'TestCriterion',
  TESTREQUIREMENT: 'TestRequirement',
  TESTCASE: 'TestCase'
};

class TestCriterion extends partsMixin(BaseModel) {
  constructor(options) {
    super(options);

    const { TESTCRITERION } = TestCriterionTypes;

    Object.assign(this['@context'], {
      [TESTCRITERION]: 'earl:TestCriterion'
    });

    this.type = [TESTCRITERION];
  }
}

export class TestRequirement extends TestCriterion {
  constructor(options) {
    super(options);

    const { TESTREQUIREMENT } = TestCriterionTypes;

    Object.assign(this['@context'], {
      [TESTREQUIREMENT]: 'earl:TestRequirement'
    });

    this.type.push(TESTREQUIREMENT);
  }
}

export class TestCase extends TestCriterion {
  constructor(options) {
    super(options);

    const { TESTCASE } = TestCriterionTypes;

    Object.assign(this['@context'], {
      [TESTCASE]: 'earl:TestCase'
    });

    this.type.push(TESTCASE);
  }
}
