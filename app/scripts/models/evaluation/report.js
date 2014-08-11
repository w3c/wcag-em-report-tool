'use strict';

angular.module('wcagReporter').service('evalReportModel', function() {
	this.creator   = '';
	this.title     = '';
	this.date      = Date.now();
	this.summary   = '';
	this.specifics = '';
	this.commissioner = '';

    this.toExport = function () {
    	var res = Object.create(this);
    	res.creator = res.creator.id;
        return res;
    };
});