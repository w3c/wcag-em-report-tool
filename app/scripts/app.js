'use strict';

angular
  .module('wcagReporterApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/start', {
        templateUrl: 'views/start.html'
      })
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .when('/audit/scope', {
        templateUrl: 'views/audit/scope.html',
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
        redirectTo: '/start'
      });
  });
