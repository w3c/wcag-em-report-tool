'use strict';

angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    'ui.bootstrap',
    'wert-templates'
]).config(function ($routeProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data|blob):/);

    $routeProvider.when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
    }).when('/audit/scope', {
        templateUrl: 'views/audit/scope.html',
        controller: 'AuditScopeCtrl'
    }).when('/audit/explore', {
        templateUrl: 'views/audit/explore.html',
        controller: 'AuditExploreCtrl'
    }).when('/audit/sample', {
        templateUrl: 'views/audit/sample.html',
        controller: 'AuditSampleCtrl'
    }).when('/audit/test', {
        templateUrl: 'views/audit/test.html',
        controller: 'AuditTestCtrl'
    }).when('/audit/finalize', {
        templateUrl: 'views/audit/finalize.html',
        controller: 'AuditFinalizeCtrl'
    }).when('/report', {
        templateUrl: 'views/report.html',
        controller: 'ReportCtrl'
    }).when('/import', {
        templateUrl: 'views/import.html',
        controller: 'ImportCtrl'
    }).when('/export', {
        templateUrl: 'views/export.html',
        controller: 'ExportCtrl'
    }).otherwise({
        redirectTo: '/'
    });


}).run(function (translateFilter, $rootScope, $document, appState,
$location, $rootElement) {
    var titleElm = $document.find('title'),
        prefix = titleElm.text().trim();
    
    if (prefix) {
        prefix = titleElm.text() + ' - ';
    }

    $rootScope.setTitle = function (title) {
        titleElm.text(prefix + title);
        return title;
    };

    $rootScope.translate = translateFilter;
    $rootScope.rootHide = {};

    appState.init();

    $rootScope.setEvalLocation = function () {
        appState.setDirtyState();
        $location.path('/audit/scope');
    };

    $rootElement.attr('tabindex', -1);
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootElement.focus();
    });

// Setup automatic import/export based on attributes of the root element
}).run(function (wcagReporterImport, wcagReporterExport, $rootElement) {
    //var autosave = $rootElement.attr('autosave');
    wcagReporterExport.storage.init({
        //autosave: (autosave === '' || autosave.toLowerCase() === 'autosave'),
        url: $rootElement.attr('url'),
        saveDelay: ($rootElement.attr('save-delay') || 1500)
    });

    if ($rootElement.attr('url')) {
        wcagReporterImport.getFromUrl();
    }
});

