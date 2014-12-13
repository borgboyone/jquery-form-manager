/*!
 * jQuery UI Filter Base 1.0.0
 * https://github.com/borgboyone/jquery-form-manager
 *
 * Copyright 2014 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-form-manager/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-form-manager/
 */

(function($, undefined) {
	$.aw = $.aw || {};

	if (!$.aw.version || $.aw.version < "1.0.0") {
		$.extend( $.aw, {
			version: "1.0.0",
			unique: function(array1) {
				for(var i = array1.length - 1; i >= 0; i--) {
					for(var j = i - 1; j >= 0; j--) {
						if (array1[i] === array1[j]) {
							array1.splice(i,1);
							break;
						}
					}
				}
				return array1;
			},
			union: function(array1, array2) {
				return $.aw.unique($.merge(array1, array2));
			},
		    exclude: function(array1, array2) {
		    	for(var i = array1.length - 1; i >= 0; i--) {
		    		if ($.inArray(array1[i], array2) != -1) {
		    			array1.splice(i,1);
		    		}
		    	}
		    	return array1;
		    },
		    intersect: function(array1, array2) {
				for(var i = array1.length - 1; i>= 0; i--) {
					if ($.inArray(array1[i], array2) == -1) {
						array1.splice(i,1);
					}
				}
				return array1;
	        },
    	});
    }

	$.aw.utilities = $.aw.utilities || {};

	if (!$.aw.utilities.filters) {
		$.aw.utilities.filters = (function() {
			var filter_cache = {};
			var filterManager = {
				version: "1.0.0",
				"create" : function(name, filters) {
					if (!name) {
						throw new Error("Filter name is a required argument.");
					}
					if (name in filter_cache) {
						throw new Error("A filter of " + name + " already exists.");
					}
					if ($.isPlainObject(filters) && 
						((("properties" in filters) && $.isPlainObject(filters['properties']) && Object.keys(filters['properties']).map(function(key) { return filters['properties'][key]; }).reduce(function(prev, cur){ return prev && $.isFunction(cur); }, true) ) || 
						 (("dichotomies" in filters) && $.isPlainObject(filters['dichotomies']) && Object.keys(filters['dichotomies']).map(function(key) { return filters['dichotomies'][key]; }).reduce(function(prev, cur){ return prev && $.isFunction(cur); }, true)))) {
						return filter_cache[name] = new Parser({yy: {filters: filters}});
					} else {
						throw new Error("Filters is not provided or is not the correct format.");
					}
				},
				"get" : function(name) {
					return filter_cache[name] ? filter_cache[name] : null;
				},
				"getAll": function() { return filter_cache; },
				"remove" : function(name) {
					if (!(name in filter_cache)) {
						return false;
					}
					delete filter_cache[name];
					return true;
				}
			};
			Object.freeze(filterManager);
			return filterManager;
		})();
		var Parser = [% INSERT './filter.munge.js' %]
	} // if
})(jQuery);