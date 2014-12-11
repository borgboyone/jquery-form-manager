var form = $.widget( "aw.form", {
	version: "1.0.0",
	options: {
	},
	_create: function() {
		this._super();
		if ($.aw.utilities.filters.get(this.widgetFullName) === null) {
			var filters = {properties: {}, dichotomies: {}};
	        filters.properties.name = function(inputs, property) {
	            return inputs.reduce(function(pass, input) {
	                if (input['theName']() == property.value) {
	                    pass.push(input);
	                }
	                return pass;
	            }, []);
	        };
	        filters.properties.type = function(inputs, property) {
	            return inputs.reduce(function(pass, input) {
	                if (input['_instanceOf'](property.value)) {
	                    pass.push(input);
	                }
	                return pass;
	            }, []);
	        };
	        filters.properties.valid = function(inputs, property) {
	            return inputs.reduce(function(pass, input) {
	                if (input['validationState']() == property.value) {
	                    pass.push(input);
	                }
	                return pass;
	            }, []);
	        };
	        filters.dichotomies.hasChanged = function(inputs, dichotomy) {
				return inputs.reduce(function(pass, input) {
	                if (((input['hasChanged']() ? 1 : 0) ^ (dichotomy.negate ? 1 : 0))) {
	                    pass.push(input);
	                }
	                return pass;
	            }, []);
	        };
	        filters.dichotomies.isValid = function(inputs, dichotomy) {
				return inputs.reduce(function(pass, input) {
	                if (((input['isValid']() ? 1 : 0) ^ (dichotomy.negate ? 1 : 0))) {
	                    pass.push(input);
	                }
	                return pass;
	            }, []);
	        };
	        filters.dichotomies.isDisabled = function(inputs, dichotomy) {
				return inputs.reduce(function(pass, input) {
	                if (((input['isDisabled']() ? 1 : 0) ^ (dichotomy.negate ? 1 : 0))) {
	                    pass.push(input);
	                }
	                return pass;
	            }, []);
	        };
	        $.aw.utilities.filters.create(this.widgetFullName, filters);
	    }
	},
	_filter: function(inputs, selector) {
		return $[this.namespace].utilities.filters.get(this.widgetFullName).parse(selector, {initialInputs: inputs});
	},
/*	@method{name: "inputs(selector)"}
		Retrieves all inputs that are attached to HTML elements under this
		form, optionally filtered by the value of selector.
	@param{name: "selector", type:"mixed", optional:true}
		Selector can take either:
			- array of string names
			- function taking input as it's only argument and returns
			  true or false if that input should be kept or discarded,
			  respectively
			- string of propertiy and boolean filter arguments (See the
			  module description for format details.)
	@return{type:"array"}
		Returns an array, possibly empty, of inputs.
	@end
*/
	inputs: function(selector) {
		var namespace = this.namespace;
		var $form = this.element;
		// all inputs in the form
		var inputs = $form.find(":data(" + $[namespace].input.prototype.widgetFullName + ")").map(function(i,e) { return $(e).data($[namespace].input.prototype.widgetFullName) }).get();
		if ($.isFunction(selector)) {
			inputs = inputs.reduce(function(prev, cur) { if (selector(cur)) { prev.push(cur); } return prev; }, []);
		} else if ($.isArray(selector) && selector.reduce(function(prev, cur) { return prev && (typeof cur == 'string') }, true)) { // if array, must be an array of names
			inputs = inputs.reduce(function(prev, cur) { if ($.inArray(cur.name(), temp)) { prev.push(cur); return prev; } }, []);
		} else if (typeof selector == 'string') {
			inputs = this._filter(inputs, selector);
		} else if (selector === undefined) {
		} else {
			throw Error("Unusable selector.");
		}
		return inputs;
	},
/*	@method{name: "hasChanged(selector)"}
		Returns the inputs that are attached to HTML elements under this 
		form where the input property <input:hasChanged> is true, optionally 
		filtered by selector.
	@param{name: "selector", type:"mixed", optional:true}
		See <inputs> for parameter details.
	@return{type:"array"}
		Returns an array, possibly empty, of strings corresponding to the inputs' name.
	@end
*/
	hasChanged: function(selector) {
		return this.inputs(selector).reduce(function(prev, input) { if (input.hasChanged()) { prev.push(input); } return prev; }, []);
	},
/*	@method{name: "isValid(selector)"}
		Retrieves all inputs that are attached to HTML elements under this 
		form where the input property isValid is true, optionally filtered 
		by selector.
	@param{name: "selector", type: "mixed", optional: true}
		See <inputs> for parameter details.
	@return{type:"array"}
		Returns an array, possibly empty, of inputs.
	@end
*/
	isValid: function(selector) {
		return this.inputs(selector).reduce(function(prev, input) { if (input.isValid()) { prev.push(input); } return prev; }, []);
	},
	// this is more or less a short-cut for values(hasChanged(selector));
//	changed: function(selector) {
//		return this.inputs(selector).reduce(function(prev, input) { if (input.hasChanged()) { prev[input.theName()] = input.value(); } return prev; }, {});
//	},
/*	@method{name: "validate(selector)"}
		Calls the `validate` method on inputs that are attached to HTML
		elements under this form with inputs optionally filtered by
		selector.
	@params{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return
		This method returns no arguments.
	@end
*/
	validate: function(selector) {
		this.inputs(selector).forEach(function(input) { input.validate(); });
	},
/*	@method{name: "reset(selector)"}
		Calls the `reset` method on inputs that are attached to HTML
		elements under this form with inputs optionally filtered by
		selector.
	@params{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return
		This method returns no arguments.
	@end
*/
	reset: function(selector) {
		this.inputs(selector).forEach(function(input) { input.reset(); });
	},
/*	@method{name: "clear(selector)"}
		Calls the `clear` method on inputs that are attached to HTML
		elements under this form with inputs optionally filtered by
		selector.
	@params{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return
		This method returns no arguments.
	@end
*/
	clear: function(selector) {
		this.inputs(selector).forEach(function(input) { input.clear(); });
	},
/*	@method{name: "invalidate(selector)"}
		Calls the `invalidate` method on inputs that are attached to HTML
		elements under this form with inputs optionally filtered by
		selector.
	@param{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return
		This method returns no arguments.
	@end
*/
	invalidate: function(selector) {
		this.inputs(selector).forEach(function(input) { input.invalidate(); });
	},
/*	@method{name: "disable(selector)"}
		Calls the `disable` method on inputs that are attached to HTML
		elements under this form with inputs optionally filtered by
		selector.
	@params{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return
		This method returns no arguments.
	@end
*/
	disable: function(selector) {
		this.inputs(selector).forEach(function(input) { input.disable(); });
	},
/*	@method{name: "enable(selector)"}
		Calls the `enable` method on inputs that are attached to HTML
		elements under this form with inputs optionally filtered by
		selector.
	@params{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return
		This method returns no arguments.
	@end
*/
	enable: function(selector) {
		this.inputs(selector).forEach(function(input) { input.enable(); });
	},
/*	@method{name: "theNames(selector)"}
		Returns an array of string values corresponding to the theName property
		of inputs that are attached to HTML elements under this form with
		inputs optionally filtered by selector.
	@param{name: "selector", typed: "mixed", optional: true}
		See <inputs> for parameter details.
	@return{type:"Array"}
		An array, possibly empty, of string values.
	@end
*/
	theNames: function(selector) {
		return this.inputs(selector).reduce(function(prev, input) { prev.push(input.theName()); return prev; }, []);
	},
/*	@method{name: "values(mixed)"}
		Returns or sets the input values based on the value of mixed.
	@params
		If mixed is unspecified, a string, array, or function, inputs are
		filtered accordingly (See <inputs> for details.). The resulting inputs
		are enumerated with thier corresponding values into a plain object 
		which is returned.
		If mixed is an object, the key, value pairs are used to set the value 
		for inputs that are encompassed by this form. Each key must match an 
		input via <input:theName>, otherwise, an `Error` is thrown.
	@return
		Optionally returns a plain object consisting of key, value pairs
		compromised of the input name and input value.
	@end
*/
	values: function(mixed) {
		var inputs;
		if ((typeof mixed == 'string') || $.isArray(mixed) || $.isFunction(mixed) || (typeof mixed === 'undefined')) {
			return this.inputs(mixed).reduce(function(prev, cur) { prev[cur.theName()] = cur.value(); return prev; }, {});
		} else if ($.isPlainObject(mixed)) {
			mixed.keys().forEach(function(key) {
				var inputs = this.inputs("[name=" + key + "]");
				if (inputs.length == 0) {
					throw new Error("No input with name (" + key + ").");
				}
				inputs[0].value(mixed[key]);
			});
		}
	}
});
