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

	$.aw.experimental = $.aw.experimental || {};

	if (!$.aw.experimental.implement) {
		$.aw.experimental.implement = function(ext, imp) {
			if (!(imp instanceof $.widget.constructor))
				throw new Error("Implementable must be instance of $.widget");
			// TODO: verify core functions of imp exist in ext
			ext['_create'] = (function(_create, imp){ 
				return function() {
					if ($.isFunction(_create)) {
						_create.apply(this);
					} else {
						this._super();
					}
					this.element.data(imp.widgetFullName, this);
				};
			})(ext._create, imp.prototype);
			ext['_destroy'] = (function(_destroy, imp){
				return function() {
					this.element.data(imp.widgetFullName, null);
					if ($.isFunction(_destroy)) {
						_destroy.apply(this);
					} else {
						this._super();
					}
				};
			})(ext._destroy, imp.prototype);
			return ext;
		};
	}
	if (!$.aw.experimental.acquireTraits) {
		$.aw.experimental.acquireTraits = function(to, from) {
			// make sure "from" is a $.widget
			if (!(from instanceof $.widget.constructor))
				throw new Error("Trait supplier must be instance of $.widget");
			// make sure "to" is a PlainObject
			if (!$.isPlainObject(to))
				throw new Error("Trait receiver must be a plain object");
			var traits = $.aw.exclude(Object.keys(from.prototype), ['widgetName', 'widgetFullName', 'widgetEventPrefix', 'namespace', 'constructor', 'version', 'options']).reduce(function(prev, cur) { if (cur.substring(0,1) !== '_') { prev.push(cur); } return prev; }, []);
			// only add trait to "to" if it doesn't exist
			traits.forEach(function(trait) { if (!(trait in to)) { to[trait] = from.prototype[trait]; }});
			// same for options
			var options = from.prototype.options;
			if ($.isPlainObject(options)) {
				if (!('options' in to)) { to['options'] = {}; }
				Object.keys(options).forEach(function(option) { if (!(option in to)) { to['options'][option] = options[option]; }});
			}
			return to;
		};
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
						throw new Error("Filters are not provided or are not in the correct format.");
					}
				},
				"get" : function(name) {
					return filter_cache[name] ? filter_cache[name] : null;
				},
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
