'use strict';



angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    'wert-templates'
]).config(function ($routeProvider, $compileProvider) {

    $compileProvider
    .aHrefSanitizationWhitelist(/^\s*(https?|data|blob):/);

    $routeProvider.when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
    }).when('/evaluation/scope', {
        templateUrl: 'views/evaluation/scope.html',
        controller: 'EvalScopeCtrl'
    }).when('/evaluation/explore', {
        templateUrl: 'views/evaluation/explore.html',
        controller: 'EvalExploreCtrl'
    }).when('/evaluation/sample', {
        templateUrl: 'views/evaluation/sample.html',
        controller: 'EvalSampleCtrl'
    }).when('/evaluation/audit', {
        templateUrl: 'views/evaluation/audit.html',
        controller: 'EvalAuditCtrl'
    }).when('/evaluation/report', {
        templateUrl: 'views/evaluation/report.html',
        controller: 'EvalReportCtrl'
    }).when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
    }).when('/open', {
        templateUrl: 'views/open.html',
        controller: 'OpenCtrl'
    }).when('/save', {
        templateUrl: 'views/save.html',
        controller: 'SaveCtrl'
    }).when('/error', {
        templateUrl: 'views/error.html'
    }).otherwise({
        redirectTo: '/error'
    });

// Setup the tooltips default
}).config(function(tooltipsConfProvider) {
    tooltipsConfProvider.configure({
        smart: true,
        speed: 'fast',
        showTrigger: 'mouseover focus',
        hideTrigger: 'mouseout blur'
    });
});


