'use strict';

angular.module('wcagReporter')
.service('reportStorage', function ($http) {
	var reportStorage,
		settings = {
			url: '',
			revisionId: undefined,
			autosave: false
		};

	reportStorage = {
		settings: settings,
		
		post: function (json) {
			if (settings.revisionId) {
				json._rev = settings.revisionId;
			}
			return $http.put(settings.url, json, {}, {
				withCredentials: true,
			}).then(function (response) {
				if (response && response.data && response.data.rev) {
					settings.revisionId = response.data.rev;
				}
				return response.data;
			});
		},

		get: function () {
			return $http.get(settings.url, {}, {
				withCredentials: true,
			}).then(function (response) {
				if (response.data._rev) {
					settings.revisionId = response.data._rev;
				}
				return response.data;
			});
		}
	};

	return reportStorage;
});
