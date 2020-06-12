'use strict';

angular
  .module('wcagReporter')
  .service('evalExploreModel', function (
    knownTech,
    evalSampleModel
  ) {
    var exploreModel = {
      knownTech: knownTech
    };
    var basicProps = [
      'reliedUponTechnology',
      'essentialFunctionality',
      'pageTypeVariety',
      'commonPages',
      'otherRelevantPages'
    ];

    // add all properties to this
    basicProps
      .forEach(function (prop) {
        exploreModel[prop] = undefined;
      });

    exploreModel.reliedUponTechnology = [];

    exploreModel.importData = function (evalData) {
      if (!angular.isArray(evalData.reliedUponTechnology)) {
        evalData.reliedUponTechnology = [evalData.reliedUponTechnology];
      }

      basicProps
        .forEach(function (prop) {
          if (evalData[prop]) {
            exploreModel[prop] = evalData[prop];
          }
        });
    };

    exploreModel.exportData = function () {
      var exportData = {};

      basicProps
        .forEach(function (prop) {
          exportData[prop] = exploreModel[prop];
        });

      return exportData;
    };

    /**
     * Returns an array of errors indicating which (if any) properties are invalid
     */
    exploreModel.validate = function () {
      return [];
    };

    // Lock up the object, for a little more dev security
    Object.preventExtensions(exploreModel);

    return exploreModel;
  });
