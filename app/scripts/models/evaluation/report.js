'use strict';

angular.module('wcagReporter').service('evalReportModel', function() {
	var today = new Date(),
	dd = today.getDate(),
	mm = today.getMonth()+1,
	yyyy = today.getFullYear(),
	reportModel = {
		creator: '',
		title: '',
		summary: '',
		specifics: '',
		commissioner: ''
	};
	 
    if (dd<10){
    	dd = '0' + dd;
    } 
    if (mm<10) {
    	mm = '0' + mm;
    }
	reportModel.date = yyyy+'-'+mm+'-'+dd;

    reportModel.exportData = function () {
    	var res = Object.create(reportModel);
    	res.creator = res.creator.id;
        return res;
    };
    return reportModel;
});