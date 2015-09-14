'use strict';

angular.module('wcagReporter', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'pascalprecht.translate',
    '720kb.tooltips',
    'ui.bootstrap',
    'wert-templates',
    'wcag20spec'
]).config(function ($routeProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data|blob):/);

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


}).run(function (translateFilter, $rootScope, $document, appState, wcagReporterExport,
$location, $rootElement, evalScopeModel, showSave) {
    var titleElm = $document.find('title');
    var prefix = titleElm.text().trim();
    var moveFocusToH1;

    if (prefix) {
        prefix = titleElm.text() + ', ';
    }

    /*
    Few workaround to make screen readers behave.
    We move the focus to the h1, but since angular has no ready
    event for route loading we've moved this to a delayed call
    in the setTile method above.

    JAWS will always read the updated title. To have NVDA comply
    we'll blur when the route changes so SR's won't try to read
    all the changes to the DOM. Then once setTitle indicates the
    view is loaded, we'll wait another half second for it to compile
    and then move focus to the h1.
     */
    $rootElement.focusH1 = function focusH1() {
        var h1 = $rootElement.find('h1:first()').attr({
            'tabindex': -1,
            // This is a bug workaround for NVDA + IE, which
            // seems to think our <h1> is an input field
            'role': 'heading'
        });
        setTimeout(function () {
            h1.focus();
        }, 10);
    };

    $rootScope.setTitle = function (title) {
        var sitename = '';
        if (evalScopeModel.website && evalScopeModel.website.title) {
            sitename = evalScopeModel.website.title + ' - ';
        }

        titleElm.text(prefix + sitename + title);

        // Move focus to h1 when the title is set after the initial load
        if (moveFocusToH1) {
            moveFocusToH1 = false;
            // Wait for the template to compile, then focus to h1
            setTimeout($rootScope.focusH1, 750);
        }

        return title;
    };


    $rootScope.translate = translateFilter;
    $rootScope.rootHide = {};

    appState.init();

    $rootScope.setEvalLocation = function () {
        appState.setDirtyState();
        $location.path('/evaluation/scope');
    };

    /*
    Set the next title change up to move the focus to h1
    This little workaround is to ensure
     */
    $rootScope.$on('$routeChangeSuccess', function () {
        // Move focus, starting at the second route change
        moveFocusToH1 = (moveFocusToH1 !== undefined);

        if (document.activeElement) {
            document.activeElement.blur();
        }
    });

    $rootScope.support = {
        hasSupport: appState.hasBrowserSupport(),
        hideMessage: false
    };

    if (showSave) {
        $rootElement.on('keydown', function (e) {
            // ctrl+s || cmd+s
            if (e.keyCode === 83 && (e.ctrlKey || e.metaKey)) {
                showSave(wcagReporterExport.getString(),
                         wcagReporterExport.getFileName(),
                         'application/json');

                appState.setPrestineState();
                e.preventDefault();
            }
        });
    }

// Setup the tooltips default
}).config(function(tooltipsConfigProvider) {
    tooltipsConfigProvider.options({
        speed: 'fast',
        lazy: false,
        showTrigger: 'mouseover focus',
        hideTrigger: 'mouseout blur'
    });

// Setup automatic import/export based on attributes of the root element
}).run(function (wcagReporterImport, wcagReporterExport, $rootElement) {

    wcagReporterExport.storage.init({
        autosave: (typeof $rootElement.attr('autosave') === 'string'),
        url: $rootElement.attr('url'),
        saveDelay: ($rootElement.attr('save-delay') || 1500)
    });

    if ($rootElement.attr('url')) {
        wcagReporterImport.getFromUrl();
    }
});
