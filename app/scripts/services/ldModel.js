'use strict';

/**
 *
 */
angular.module('wcagReporter')
.factory('ldModel', function (evalContextV2, evalModel) {

	var jsonld = window.jsonld;

	function getTypes(obj) {
		if (obj.type) {
			return Array.isArray(obj.type) ? obj.type : [obj.type];
		} else if (obj['@type']) {
			return Array.isArray(obj['@type']) ? ob['@type'] : [obj['@type']];
		} else {
			return [];
		}
	}

	var ldModelFactory = function (source) {
		source = source || {};
		var data = {};
		var idMap = {};
		var context = source['@context'];

		var getter = function (type) {
			return function (filter) {
				if (typeof filter === 'undefined') {
					return [].concat(data[type]);

				} else if (typeof filter === 'function') {
					return data.filter(filter);
				}
			}
		};

		var model = {
			get: function (id) {
				return idMap[id];
			},

			updateRefs: function (obj) {
				if (!idMap[obj.id]) {
					throw new Error('Unknown object with id ' + obj.id);
				}

	    		Object.keys(obj)
	    		.forEach(function (key) {
	    			if (key === 'id' || key === '@id') {
	    				return;
	    			}
	    			if (typeof obj[key] === 'object' && obj[key].id && idMap[obj[key].id]) {
	    				obj[key] = idMap[obj[key].id];

	    			} else if (Array.isArray(obj[key])) {
	    				obj[key] = obj[key].map(function (prop) {
	    					if (typeof prop === 'object' &&
	    						prop.id && idMap[prop.id]) {
	    						return idMap[prop.id];
	    					} else {
	    						return prop;
	    					}
	    				});
	    			} else if (typeof obj[key] === 'string' && obj[key].substr(0,2) === '_:' && idMap[obj[key]]) {
	    				obj[key] = idMap[obj[key]];

	    			}
	    		});
			},

			add: function (obj) {
				if (Array.isArray(obj)) {
					obj.forEach(model.add);
					obj.forEach(model.updateRefs);
					return model;
				}
				// remember the object's id
				idMap[obj.id] = obj;

				// Register object with it's types
				getTypes(obj)
				.forEach(function (type) {
					if (!data[type]) {
						// Create a new type and a getter for it
						data[type] = [];
						model['get' + type + 's'] = getter(type);
					}
					// new object
					if (data[type].indexOf(obj) === -1) {
						data[type].push(obj);
					}
				});

				// Build the object's connections
				model.updateRefs(obj);

				return model;
			},

			forget: function (obj) {
				if (Array.isArray(obj)) {
					obj.forEach(model.remove);
					return model;
				}
				getTypes(obj)
				.forEach(function (type) {
					data[type].splice(data[type].indexOf(obj), 1);
				});
				delete idMap[obj.id];

				return model;
			}
		}

		if (source['@graph']) {
			model.add(source['@graph']);
		}
		return model;
	}
		
	function ldModel(data, context, callback) {
		callback = callback || function () {};
		jsonld.flatten(data, context, function (err, res) {
			if (err) {
				callback(err);
			}
			var ldModel = ldModelFactory(res);
			callback(null, ldModel);
		});
	}

	return ldModel;

});