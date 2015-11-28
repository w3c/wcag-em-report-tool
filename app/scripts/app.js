'use strict';

angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    '720kb.tooltips',
    'ui.bootstrap',
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
    }).otherwise({
        redirectTo: '/'
    });


}).config(function ($translateProvider, wcag20specProvider) {
    var lang = 'en';

    $translateProvider.useSanitizeValueStrategy(null);
    $translateProvider.useStaticFilesLoader({
        prefix: 'locale/',
        suffix: '.json'
    });

    wcag20specProvider.setSpecPath('wcag20spec/json/wcag2-${lang}.json');
    wcag20specProvider.loadLanguage(lang);
    $translateProvider.preferredLanguage(lang);

// Setup the tooltips default
}).config(function(tooltipsConfigProvider) {
    tooltipsConfigProvider.options({
        speed: 'fast',
        lazy: false,
        showTrigger: 'mouseover focus',
        hideTrigger: 'mouseout blur'
    });
});


