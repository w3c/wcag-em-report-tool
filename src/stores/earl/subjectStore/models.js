import { Base, partsMixin } from '../models.js';

export const TestSubjectTypes = {
  TESTSUBJECT: 'TestSubject',
  WEBSITE: 'Website',
  WEBPAGE: 'Webpage'
};

export const TestSubjectContext = {
  [TestSubjectTypes.TESTSUBJECT]: 'earl:TestSubject',
  wcagem: 'http://www.w3.org/TR/WCAG-EM/#',
  [TestSubjectTypes.WEBSITE]: 'wcagem:website',
  [TestSubjectTypes.WEBPAGE]: 'wcagem:webpage'
};

export class TestSubject extends partsMixin(Base) {
  constructor(options = {}) {
    super(options);

    let { type } = options;
    const ALLOWED_TYPES = [
      TestSubjectTypes.WEBSITE,
      TestSubjectTypes.WEBPAGE
    ];

    this['@context'] = {
      ...this['@context'],
      ...TestSubjectContext
    };

    if (!this.id) {
      this.id = `_:subject_${this.ID}`;
    }
    this.type = [TestSubjectTypes.TESTSUBJECT];

    if (!Array.isArray(type)) {
      type = [type];
    }

    if (!this.title) {
      this.title = '';
    }

    if (!this.description) {
      this.description = '';
    }

    type.forEach((t) => {
      if (ALLOWED_TYPES.indexOf(t) >= 0) {
        this.type.push(t);
      }
    });
  }
}
