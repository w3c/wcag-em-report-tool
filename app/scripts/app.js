'use strict';
angular.module('wcagReporter', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'pascalprecht.translate',
  'wert-templates'
])
  .config(function ($routeProvider, $compileProvider) {
    $compileProvider
      .aHrefSanitizationWhitelist(/^\s*(https?|data|blob):/);

    $routeProvider
      .when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
      })
      .when('/evaluation/scope', {
        templateUrl: 'views/evaluation/scope.html',
        controller: 'EvalScopeCtrl'
      })
      .when('/evaluation/explore', {
        templateUrl: 'views/evaluation/explore.html',
        controller: 'EvalExploreCtrl'
      })
      .when('/evaluation/sample', {
        templateUrl: 'views/evaluation/sample.html',
        controller: 'EvalSampleCtrl'
      })
      .when('/evaluation/audit', {
        templateUrl: 'views/evaluation/audit.html',
        controller: 'EvalAuditCtrl'
      })
      .when('/evaluation/report', {
        templateUrl: 'views/evaluation/report.html',
        controller: 'EvalReportCtrl'
      })
      .when('/view_report', {
        templateUrl: 'views/viewReport.html',
        controller: 'ViewReportCtrl'
      })
      .when('/open', {
        templateUrl: 'views/open.html',
        controller: 'OpenCtrl'
      })
      .when('/save', {
        templateUrl: 'views/save.html',
        controller: 'SaveCtrl'
      })
      .when('/error', {
        templateUrl: 'views/error.html'
      })
      .when('/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl'
      })
      .otherwise({
        redirectTo: '/error'
      });
  });
