'use strict';

angular.module('wcagReporter')
.service('reportStorage', function ($http, wcagReporterExport) {

	var reportStorage = {
		post: function (url) {
			return $http.post(url, wcagReporterExport.getString());
		}
	};

	return reportStorage;
});
