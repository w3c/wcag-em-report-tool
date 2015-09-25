'use strict';

describe('Controller: EvalExploreCtrl', function () {

    // load the service's module
    beforeEach(module('wcagReporter'));

    var scope;
    var ctrl;
    var exploreModel;

    beforeEach(inject(function($controller, $rootScope, _evalModel_) {
        scope = $rootScope.$new();
        ctrl  = $controller('EvalExploreCtrl', { $scope: scope });
        exploreModel    = _evalModel_.exploreModel;
    }));

    it('Should be able to update the evalScopeModel', function () {
        expect(scope.exploreModel).toBe(exploreModel);
    });

    xit('should add known technologies by checking them');

    xit('should add new technologies with input fields');

});
