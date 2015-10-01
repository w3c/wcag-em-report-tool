'use strict';

angular.module('wcagReporter')
.controller('EvalScopeCtrl',
function ($scope, appState, evalScopeModel,
          evalReportModel, $filter) {
    $scope.state      = appState.moveToState('scope');
    $scope.scopeModel = evalScopeModel;

    $scope.conformanceOptions = evalScopeModel.conformanceOptions
    .reduce(function (tgt, lvl) {
        tgt[lvl] = $filter('rdfToLabel')(lvl);
        return tgt;
    }, {});


    // Give the report a default title
    // (won't if one is already set)
    $scope.$on('$routeChangeStart', function() {
        if (evalScopeModel.website.title) {
            var translate     = $filter('translate');
            var title = translate('REPORT.TITLE_PREFIX') + ' ' +
                        evalScopeModel.website.title;
            evalReportModel.setDefaultTitle(title);
        }
    });

});
