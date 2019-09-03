'use strict';
describe('Controller: AuditSamplePagesCtrl', function () {
  // load the service's module
  setupwcagReporterTest();

  var scope;
  var ctrl;
  var evalModel;
  var sampleModel;

  beforeEach(inject(function ($controller, $rootScope, _evalModel_) {
    scope = $rootScope.$new();
    ctrl = $controller('AuditSamplePagesCtrl', { $scope: scope });
    evalModel = _evalModel_;
    sampleModel = evalModel.sampleModel;

    expect(sampleModel.randomSample.webpage.length)
      .toBe(0);
    expect(sampleModel.structuredSample.webpage.length)
      .toBe(0);
  }));

  it('gives access to structured and random sample', function () {
    expect(scope.randomSample)
      .toBe(sampleModel.randomSample);

    expect(scope.structuredSample)
      .toBe(sampleModel.structuredSample);
  });

  it('has access to filled pages', function () {
    var filledPages = scope.filledPages();
    expect(filledPages.length)
      .toBe(0);

    var page0 = sampleModel.addNewPage();
    var page1 = sampleModel.addNewPage();
    var page2 = sampleModel.addNewPage();
    var page3 = sampleModel.addNewPage();

    page0.title = 'foo';
    page1.title = 'bar';

    filledPages = scope.filledPages();
    expect(filledPages[0])
      .toBe(page0);
    expect(filledPages[1])
      .toBe(page1);
    expect(filledPages.length)
      .toBe(2);

    page2.description = 'http://foo.com';
    page3.description = 'http://bar.com';
    filledPages = scope.filledPages();
    expect(filledPages[2])
      .toBe(page2);
    expect(filledPages[3])
      .toBe(page3);
    expect(filledPages.length)
      .toBe(4);

    page2.description = '';
    page3.description = '';
    filledPages = scope.filledPages();
    expect(filledPages[0])
      .toBe(page0);
    expect(filledPages[1])
      .toBe(page1);
    expect(filledPages.length)
      .toBe(2);

    page0.title = '';
    page1.title = '';
    filledPages = scope.filledPages();
    expect(filledPages.length)
      .toBe(0);
  });

  it('complete and uncomplete selected pages', function () {
    var page0 = sampleModel.addNewPage();
    var page1 = sampleModel.addNewPage();

    expect(sampleModel.getSelectedPages().length)
      .toBe(0);

    page0.selected = true;
    page1.selected = true;

    scope.completePages();
    expect(page0.tested)
      .toBe(true);
    expect(page1.tested)
      .toBe(true);

    page0.selected = false;
    scope.uncompletePages();
    expect(page0.tested)
      .toBe(true);
    expect(page1.tested)
      .toBe(false);

    page0.selected = true;
    page1.selected = false;
    scope.uncompletePages();
    expect(page0.tested)
      .toBe(false);
    expect(page1.tested)
      .toBe(false);

    page0.selected = false;
    expect(sampleModel.getSelectedPages().length)
      .toBe(0);
  });
});
