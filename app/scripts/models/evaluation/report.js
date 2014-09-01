'use strict';

angular.module('wcagReporter').service('evalReportModel', function() {
    var today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth()+1,
    yyyy = today.getFullYear(),
    protoModel = {
        creator: '',
        title: '',
        summary: '',
        specifics: '',
        commissioner: ''
    },
    reportModel = Object.create(protoModel);
     
    if (dd<10){
        dd = '0' + dd;
    } 
    if (mm<10) {
        mm = '0' + mm;
    }
    protoModel.date = yyyy+'-'+mm+'-'+dd;

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