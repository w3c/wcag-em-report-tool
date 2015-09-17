'use strict';

describe('Service: evalContext', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    // instantiate service
    var evalContext;
    beforeEach(inject(function (_evalContext_) {
        evalContext = _evalContext_;
    }));

    it('should be an object', function () {
        expect(typeof evalContext).toBe('object');
    });

});
