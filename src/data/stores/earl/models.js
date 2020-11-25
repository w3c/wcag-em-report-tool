class Base {
  constructor(options) {
    const {
      ID,
      date,
      title,
      description
    } = options;

    this.ID = ID || null;
    this.date = new Date(date) || new Date();
    this.title = title || '';
    this.description = description || '';
  }
}



export class TestSubject extends Base {
  constructor(options) {
    super(options);

    const { type } = options;
    const ALLOWED_TYPES = [
      'WebSite',
      'WebPage'
    ];

    this.type = ['TestSubject'];

    if (ALLOWED_TYPES.indexOf(type) >= 0) {
      this.type.push(type);
    }
  }
}

