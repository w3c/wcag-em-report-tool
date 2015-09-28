'use strict';
var ctrlName  = 'AuditSamplePagesCtrl';

describe('Controller: ' + ctrlName, function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;

    beforeEach(inject(function($controller, $rootScope, evalModel) {
        scope = $rootScope.$new();
        ctrl  = $controller(ctrlName, { $scope: scope });
    }));

    xit('allows access to structured and random sample');

    xit('has access to filled pages');

    xit('be able to select and deselect pages');

    xit('complete and uncomplete selected pages');

    xit('should select previous/next X pages');

});
