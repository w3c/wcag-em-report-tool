'use strict';
describe('Controller: EvalExploreCtrl', function () {
  var modelName = 'exploreModel';

  // load the service's module
  setupwcagReporterTest();

  var scope;
  var ctrl;
  var model;

  beforeEach(inject(function ($controller, $rootScope, evalModel) {
    scope = $rootScope.$new();
    ctrl = $controller('EvalExploreCtrl', { $scope: scope });
    model = evalModel[modelName];

    model.reliedUponTechnology = [];
  }));

  it('Should be able to update the evalModel.' + modelName, function () {
    expect(scope[modelName])
      .toBe(model);
  });

  it('should add known technologies by checking them', function () {
    var i;
    var runs = 3;
    expect(model.reliedUponTechnology.length)
      .toBe(0);
    expect(scope.knownTech.length).not.toBe(0);

    scope.knownTech.forEach(function (tech) {
      expect(tech.checked)
        .not.toBe(true);
    });

    // Test adding tech by selecting known technologies
    for (i = 0; i < runs; i++) {
      scope.knownTech[i].checked = true;
      scope.changeTech(scope.knownTech[i]);
      scope.$digest();

      expect(scope.knownTech[i].title)
        .toBe(model.reliedUponTechnology[i].title);

      expect(scope.knownTech[i].id)
        .toBe(model.reliedUponTechnology[i].id);
    }

    // Test removing tech by deselecting known technologies
    for (i = 0; i < runs; i++) {
      scope.knownTech[i].checked = false;
      scope.changeTech(scope.knownTech[i]);
      scope.$digest();

      model.reliedUponTechnology.forEach(function (tech) {
        expect(tech.id)
          .not.toBe(scope.knownTech[i].id);
        expect(tech.title)
          .not.toBe(scope.knownTech[i].title);
      });
    }
    expect(model.reliedUponTechnology.length)
      .toBe(0);
  });

  it('should add new technologies with input fields', function () {
    var testTitle = 'foo bar';
    var testId = 'fooBar';

    // Check the default empty tech
    expect(scope.otherTech[0])
      .toEqual({ type: 'Technology' });
    expect(model.reliedUponTechnology.length)
      .toBe(0);

    // Add a technology field
    scope.addTechnology();
    scope.$digest();
    expect(scope.otherTech.length)
      .toBe(2);
    expect(model.reliedUponTechnology.length)
      .toBe(0);

    // Add a technology to the model
    scope.otherTech[0].title = testTitle;
    scope.updateOtherTech(scope.otherTech[0]);
    scope.$digest();
    expect(model.reliedUponTechnology[0])
      .toBe(scope.otherTech[0]);

    // Add another technology to the model
    scope.otherTech[1].id = testId;
    scope.updateOtherTech(scope.otherTech[1]);
    scope.$digest();
    expect(model.reliedUponTechnology[1])
      .toBe(scope.otherTech[1]);

    // Remove a technology from the model
    scope.otherTech[0].title = '';
    scope.updateOtherTech(scope.otherTech[0]);
    scope.$digest();
    expect(model.reliedUponTechnology[0])
      .toBe(scope.otherTech[1]);
    expect(model.reliedUponTechnology[1])
      .toBe(undefined);

    // Remove another technology from the model
    scope.otherTech[1].id = '';
    scope.updateOtherTech(scope.otherTech[1]);
    scope.$digest();
    expect(model.reliedUponTechnology[0])
      .toBe(undefined);

    // Delete a technology field
    scope.removeTechnology(0);
    scope.$digest();
    expect(scope.otherTech.length)
      .toBe(1);

    // Delete a technology field
    scope.removeTechnology(0);
    scope.$digest();
    expect(scope.otherTech.length)
      .toBe(0);
  });
});
