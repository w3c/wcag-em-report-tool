'use strict';

angular.module('wcagReporter')
.controller('EvalScopeCtrl',    
function ($scope, appState, ldEval, $filter, evalScopeModel) {
    $scope.state      = appState.moveToState('scope');
    
    $scope.scopeModel = ldEval().getOne('EvaluationScope');

    $scope.conformanceOptions = evalScopeModel.conformanceOptions
    .reduce(function (tgt, lvl) {
        tgt[lvl] = $filter('rdfToLabel')(lvl);
        return tgt;
    }, {});


    // Give the report a default title
    // (won't if one is already set)
    $scope.$on('$routeChangeStart', function() {
        if ($scope.scopeModel.website.siteName) {
            var translate     = $filter('translate');
            var siteName = translate('REPORT.TITLE_PREFIX') + ' ' +
                        $scope.scopeModel.website.siteName;
            evalReportModel.setDefaultTitle(siteName);
        }
    });

});
