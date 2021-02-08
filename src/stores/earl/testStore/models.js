import { Base as BaseModel, partsMixin } from '@app/stores/earl/models.js';

class TestCriterion extends partsMixin(BaseModel) {
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
