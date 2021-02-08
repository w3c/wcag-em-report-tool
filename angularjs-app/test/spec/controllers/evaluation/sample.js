'use strict';
describe('Controller: EvalSampleCtrl', function () {
  var modelName = 'sampleModel';

  // load the service's module
  setupwcagReporterTest();

  beforeEach(function (done) {
    inject(function ($rootScope) {
      $rootScope.$on('wcag2spec:load', done);
    });
  });

  var scope;
  var ctrl;
  var evalModel;
  var model;

  beforeEach(inject(function ($controller, $rootScope, _evalModel_) {
    scope = $rootScope.$new();
    ctrl = $controller('EvalSampleCtrl', { $scope: scope });
    evalModel = _evalModel_;
    model = evalModel[modelName];
  }));

  afterEach(function () {
    model.structuredSample.webpage = [];
    model.randomSample.webpage = [];
  });

  it('provides access to structured & random sample', function () {
    expect(scope.structuredSample)
      .toBe(model.structuredSample);

    expect(scope.randomSample)
      .toBe(model.randomSample);
  });

  // getPageAdder, getPageRemover
  it('adds and removes pages to a sample', function () {
    var sample = model.structuredSample;
    // Check that an empty first page is present
    expect(sample.webpage.length)
      .toBe(1);

    var addPage = scope.getPageAdder(sample);
    var removePage = scope.getPageRemover(sample);

    removePage(0);
    expect(sample.webpage.length)
      .toBe(0);

    var page1 = addPage();
    expect(sample.webpage[0])
      .toBe(page1);

    var page2 = addPage();
    expect(sample.webpage[1])
      .toBe(page2);

    removePage(0);
    expect(sample.webpage.length)
      .toBe(1);

    removePage(0);
    expect(sample.webpage.length)
      .toBe(0);
  });

  it('tracks the number of random pages to use', function () {
    expect(scope.randPageCount())
      .toBe(1);

    for (var i = 0; i < 25; i++) {
      model.addNewPage(model.structuredSample);
    }
    expect(scope.randPageCount())
      .toBe(3);
  });

  it('adds/removes assertions for each page added/removed', function () {
    var criteria = evalModel.auditModel.criteria;
    var critIds = Object.keys(criteria)
      .splice(0, 3);

    expect(critIds.length).not.toBe(0);

    // Default pages
    var struct0 = model.structuredSample.webpage[0];
    var rand0 = model.randomSample.webpage[0];

    critIds.forEach(function (critId) {
      expect(criteria[critId].hasPart[0].subject[0])
        .toBe(struct0);
      expect(criteria[critId].hasPart[1].subject[0])
        .toBe(rand0);
    });

    var sample = model.structuredSample;
    var addStrPage = scope.getPageAdder(sample);
    var removeStrPage = scope.getPageRemover(sample);

    var struct1 = addStrPage();
    critIds.forEach(function (critId) {
      expect(criteria[critId].hasPart.length)
        .toBe(3);
      var pageAssert = criteria[critId].hasPart[2];
      expect(pageAssert.subject[0])
        .toBe(struct1);
    });

    var struct2 = addStrPage();
    critIds.forEach(function (critId) {
      expect(criteria[critId].hasPart.length)
        .toBe(4);
      var pageAssert = criteria[critId].hasPart[3];
      expect(pageAssert.subject[0])
        .toBe(struct2);
    });

    removeStrPage(0); // removes struct0 from structuredSample
    critIds.forEach(function (critId) {
      expect(criteria[critId].hasPart.length)
        .toBe(3);
      var pageAssert = criteria[critId].hasPart[2];
      expect(pageAssert.subject[0])
        .toBe(struct2);
    });

    removeStrPage(0); // remove struct1 from structuredSample
    critIds.forEach(function (critId) {
      expect(criteria[critId].hasPart.length)
        .toBe(2);
    });
  });

  it('adds random pages as the structured sample grows', function () {
    var addStrPage = scope.getPageAdder(model.structuredSample);
    for (var i = 0; i < 40; i++) {
      addStrPage();
      expect(model.randomSample.webpage.length)
        .toBe(Math.ceil(model.structuredSample.webpage.length / 10));
    }
  });
});
