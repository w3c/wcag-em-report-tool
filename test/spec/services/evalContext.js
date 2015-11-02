'use strict';

describe('Service: evalContext', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    // instantiate service
    var evalContext;
    beforeEach(inject(function (evalContextV2) {
        evalContext = evalContextV2;
    }));

    it('should be an object', function () {
        expect(typeof evalContext).toBe('object');
    });

});
