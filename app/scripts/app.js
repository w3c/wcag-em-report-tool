'use strict';

angular
  .module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/audit/start', {
        templateUrl: 'views/audit/start.html',
        controller: 'AuditStartCtrl'
      })
      .when('/audit/scope', {
        templateUrl: 'views/audit/scope.html',
        controller: 'AuditScopeCtrl'
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
      .when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
      })
      .otherwise({
        redirectTo: '/audit/start'
      });
  });
