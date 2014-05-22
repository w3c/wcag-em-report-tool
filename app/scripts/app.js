'use strict';

angular
  .module('wcagReporterApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .when('/audit/start', {
        templateUrl: 'views/audit/start.html',
        controller: 'AuditStartCtrl'
      })
      .when('/audit/explore', {
        templateUrl: 'views/audit/explore.html',
        controller: 'AuditExploreCtrl'
      })
      .when('/audit/sample', {
        templateUrl: 'views/audit/sample.html',
        controller: 'AuditSampleCtrl'
      })
      .when('/audit/test', {
        templateUrl: 'views/audit/test.html',
        controller: 'AuditTestCtrl'
      })
      .otherwise({
        redirectTo: '/audit/start'
      });
  });
