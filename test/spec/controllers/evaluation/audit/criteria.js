'use strict';
var ctrlName  = 'AuditCriteriaCtrl';

describe('Controller: ' + ctrlName, function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;

    beforeEach(inject(function($controller, $rootScope, evalModel) {
        scope = $rootScope.$new();
        ctrl  = $controller(ctrlName, { $scope: scope });
    }));

    xit('knows what criteria to show based on critFilter');

    xit('knows what guidelines to show based on critFilter');

    xit('knows what principles to show based on critFilter');

    xit('should update when the filter is changed');

});
