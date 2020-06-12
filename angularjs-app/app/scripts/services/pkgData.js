'use strict';

angular.module('wcagReporter')
  .value('pkgData', {
    name: '<%= pkg.name =%>',
    version: '<%= pkg.version =%>',
    buildDate: '<%= pkg.buildDate =%>'
  });
