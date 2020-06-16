'use strict';

describe('Service: evalContext', function () {
  // load the service's module
  setupwcagReporterTest();

  // instantiate service
  var evalContext;
  beforeEach(inject(function (evalContextV2) {
    evalContext = evalContextV2;
  }));

  beforeEach(function (done) {
    inject(function ($rootScope) {
      $rootScope.$on('wcag2spec:langChange', done);
    });
  });

  it('should be an object', function () {
    expect(typeof evalContext)
      .toBe('object');
  });
});
