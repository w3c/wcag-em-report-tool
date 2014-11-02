'use strict';

angular.module('wcagReporter').service('evalReportModel', function($filter) {
    var protoModel = {
        creator: '',
        title: '',
        summary: '',
        specifics: '',
        commissioner: ''
    },
    reportModel = Object.create(protoModel);
    protoModel.date = $filter('date')(new Date(), 'longDate');

    reportModel.exportData = function () {
        var res = angular.copy(reportModel);
        res.creator = res.creator.id;
        return res;
    };

    reportModel.importData = function (evalData) {
        Object.keys(protoModel).forEach(function (key) {
            if (angular.isDefined(evalData[key])) {
                reportModel[key] = evalData[key];
            }
        });
    };

    return reportModel;
});