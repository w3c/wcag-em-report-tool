'use strict';

describe('Service: evalContext', function () {

    // load the service's module
    setupwcagReporterTest();

    // instantiate service
    var evalContext;
    beforeEach(inject(function (_evalContext_) {
        evalContext = _evalContext_;
    }));

    beforeEach(function (done) {
        inject(function ($rootScope) {
            $rootScope.$on('wcag20spec:langChange', done);
        });
    });

    it('should be an object', function () {
        expect(typeof evalContext).toBe('object');
    });

});
