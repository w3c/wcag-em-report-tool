'use strict';
// Launch the app once the locale is loaded
angular.element(document).ready(function() {
    var elm = angular.element('#report-tool');
    if (elm) {

        var lang = (elm.attr('lang') || 'en')
                    .substr(0,2).toLowerCase();
        window.wcagReporterLoadLocale(lang, function (e) {
            if (e) {
                throw new Error(e);
            }
            angular.bootstrap(elm, ['wcagReporter']);
        });

    } else {
        throw new Error('Could not find element #report-tool');
    }
});


angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    '720kb.tooltips',
    'ui.bootstrap',
    'wert-templates'
]).config(function ($routeProvider, $compileProvider, $translateProvider) {

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

    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.preferredLanguage('EN');

// Setup the tooltips default
}).config(function(tooltipsConfigProvider) {
    tooltipsConfigProvider.options({
        speed: 'fast',
        lazy: false,
        showTrigger: 'mouseover focus',
        hideTrigger: 'mouseout blur'
    });
});


