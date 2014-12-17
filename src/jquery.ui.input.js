/*!
 * jQuery UI Input 1.0.0
 * https://github.com/borgboyone/jquery-form-manager
 *
 * Copyright 2014 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-form-manager/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-form-manager/
 */

/*	@module{name: "input"}
		Provides the input interface and default functionality
		for inputs used with the form manager.
	@description
		This widget provides the input interface and default functionality
		for users who wish to create their own input's that are compatible
		with the jQuery Form Manager.

		Extensions of this widget must call _super() in their _create
		method in order for the interface object to be exported as a data
		attribute in the attached element.

		If is not necessary for the widget to be attached directly to the
		input element, but keep in mind the default functionality in
		<validate> and <clear> adds (or removes) the `invalidateClass` from
		this element.

		At a bare minimum, users must implement the following functions:
		<value>, <hasChanged>, and <reset> and provide a `_create` that
		handles the <initialValue> option and preferably the <change>
		callback.
	@end
*/

var input = $.widget( "aw.input", {
	version: "1.0.0",
	widgetEventPrefix: "input",
	options: {
/*	@option{name: "name", type: "String", default: "none"}
		The name of the input as used by the form manager.  If undeclared, 
		the name of the input element is used.
	@end
*/
		name: null,
/*	@option{name: "initialValue", type: "varied", default: "none"}
		The initial value for the input.  If undeclared, the current value of 
		the input element is used.
	@end
*/
		initialValue: undefined,
/*	@option{name: "invalidateClass", type: "string", default: "none"}
		The class added to the input element when validation fails.
	@end
*/
		invalidateClass: null,
/*	@option{name: "validation", type: "function", default: "none"}
		The function used to validate the input element's current value.
*/
		validation: null,

		// event callbacks
/*	@callback{name: "focus", type: "function", default: "none"}
		The function called when the input element gains or loses focus.
	@description
		The function takes the form: function(event, ui) {} where
		ui is a plain object with the the following fields:
			- name:
			- hasFocus: true if the element has gained focus, false otherwise.
	@end
*/
		focus: null,
/*		@callback{name: "change", type: "Function", default: "none"}
			The function called when the input element value changes.
		@description
			For text based inputs, change is called when the input loses
			focus and the value has either changed from the value when
			the input gained focus or from the value being set. The
			supplied callback is passed two paramteres; `event`, `ui`.

			`ui` is a plain object with the following fields:
				- `element`: The jQuery element representing the actual input or the attached widget
				- `name`: The name as specified in options
				- `previousValue`: The value either when the input gained focus or set with <value>.
				- `currentValue`: The current value of the input
		@end
*/
		change: null
	},
	_base: function() {
        // get __proto__ right before "widget" and use that as interface object
        var base = this;
        while (base.__proto__.widgetName != "widget") {
            base = base.__proto__;
        }
        return base;
	},
	_init: function() {
		if (this == this._base())
			throw Error("Input cannot be instantiated directly but must be extended.");
	},
	_create: function() {
		this._super();
        var base = this._base();
        if (this != base) {
            this.element.data(base.widgetFullName, this);
        }
		this.valid = "unset";
		this.name = "";
	},
	_destroy: function() {
		var base = this._base();
		if (this != base) {
			this.element.data(base.widgetFullName, null);
		}
		this._super();
	},
/*	@method{name: "theName"}
		Returns the input's name as set by either the name option or
		possibly other sources, such as the element's attribute.  (Note, the
		method name "theName" is used due to conflicts with "name" where
		elements bound with this widget have the name attribute.)
	@params
		This method takes no arguments.
	@return{type:"String"}
		Returns the input's name.
	@end
*/
	theName: function() {
		return this.name;
	},
/*	@method{name: "validationState"}
		Returns the input's validation state as set by validate, invalidate, or
		clear.  (Note, the method name "validationState" is used due to 
		conflicts with "valid" where elements bound with this widget have the 
		valid attribute.)
	@params
		This method takes no arguments.
	@return{type:"String"}
		Returns the input's validation state, either "valid", "unset", or 
		"invalid".
	@end
*/
	validationState: function() {
		return this.valid;
	},
/*	@method{name: "validate"}
		Validates the input's value using the function provided to
		the validation option.
	@params
		This method takes no arguments.
	@end
*/
	validate: function() {
		if ($.isFunction(this.options.validation)) {
			if (!this.options.validation()) {
				this.valid = "invalid";
				if ($.isFunction(this.invalidate)) { 
					this.invalidate();
				}
			} else {
				this.valid = "valid";
			}
		}
	},
/*	@method{name: "isValid"}
		Returns the current validitation state of the input
		as returned by the function supplied in the validation option.
	@returns{type: "Boolean"}
		Returns `true` if validationState is "valid", `false` otherwise.
	@end
*/
	isValid: function() {
			return this.valid == "valid";
	},
/*	@method{name: "isDisabled"}
		Returns the current disabled state of the input
	@returns{type: "Boolean"}
		Returns `true` if disabled is `true`, `false` otherwise.
	@end
*/
	isDisabled: function() {
			return this.options.disabled;
	},
/*	@method{name: "reset"}
		Resets the input elements value to the either the initial value
		or the value set with the <value> method and calls the 
		<clear> method.
	@params
		This method takes no arguments.
	@end
*/
	reset: function() { this.clear(); },
/*	@method{name: "clear"}
		Sets the valid state of the input to "valid" and clears the
		invalidateClass option from the input element.  Should be overridden
		in tandem with a custom invalidate method.
	@params
		This method takes no arguments.
	@end
*/
	clear: function() {
		this.valid = "unset";
		if (typeof this.options.invalidateClass == "string") {
			this.element.removeClass(this.options.invalidateClass); 
		}
	},
/*	@method{name: "invaliate"}
		Sets the validation state to "invalid". If the invalidateClass option is 
		provided, the class is added to the element the widget is attached
		to.  Can be overridden to provide custom invalidation of the input.
	@params
		This method takes no arguments.
	@end
*/
	invalidate: function() {
			this.valid = "invalid";
			if (typeof this.options.invalidateClass == "string") {
				this.element.addClass(this.options.invalidateClass);
			}
	},
/*	@method{name: "hasChanged"}
		Provides the current changed state of the input. Must be overridden 
		in the extended input widget.
	@params
		This method takes no arguments.
	@return{type: "boolean"}
		`true` is the value has changed, `false` otherwise
	@end
*/
	hasChanged: function() { return false; },
/*	@method{name: "value( [value] )"}
		Either sets or gets the value for the input.  If no value is provided,
		returns the current value of the input.  If a value is provided, that
		value is applied to the input.  Must be overridden.
	@params
		@param{type: "varied", optional: true}
			If provided, the value applied to the input.
	@return{type: "varied"}
		If no argument is provided, returns the current value of the input.
	@end
*/
	value: function(value) { 
		if (typeof value == 'undefined') {
			$noop();
		} else {
			return undefined;
		}
	}
/*  inherited */
/*	@option {name: "disabled", type: "boolean", default: false}
		Either enables or disables the input using the methods <enable> and
		<disable>, respectively, if the option value is specified.  If the
		option value is not provided, returns the current state of the input.
	@end
*/
/*	@method {name: "disable"}
		Disables the input.  Must be overridden.  The overriding function
		should call <_super()> or provide replacement functionality for the
		base widget class.
	@params
		This method takes no arguments.
	@end
*/
/*	@method {name: "enable"}
		Enables the input.  Must be overridden.  The overriding function
		should call <_super()> or provide replacement functionality for the
		base widget class.
	@params
		This method takes no arguments.
	@end
*/
});
