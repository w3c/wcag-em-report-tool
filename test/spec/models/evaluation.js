'use strict';

describe('Model: evalModel', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    // instantiate service
    var evalModel;
    beforeEach(inject(function (_evalModel_) {
        evalModel = _evalModel_;
    }));

    it('should exist', function () {
        expect(!!evalModel).toBe(true);
    });
    
});
