/*!
 * jQuery UI InputBasic 1.0.0
 * https://github.com/borgboyone/jquery-form-manager
 *
 * Copyright 2014 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-form-manager/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-form-manager/
 */

var inputBasic = $.widget("aw.inputBasic", $.aw.input, {
	version: "1.0.0",
	options: {
/*	@option{name: "initialValue", type: "Mixed", default: "none"}
		The initial value used to set the input's value on widget creation.
*/
		initialValue: undefined,
/*	@option{name: "checkboxValues", type: "String", default: "none"}
		This option allows the user to set both the checked and unchecked
		value if the input is of type checkbox. The values must be separated
		with the '|' character with the checked (true) value appearing first.
*/
		checkboxValues: null,
/*	@option{name: "name", type: "String", default: "none"}
		The name used for the input widget not necessarily the same as the
		underlying input's name attribute. If name is not provided, the
		input's name attribute is used instead.
*/
		name: null,
		change: null,
/*	@option{name: "maintainInitialDefault", type: "Boolean", default: "false"}
		If set to true, the initial value of the input is not used to set the
		default when no initialValue option is provided. This is particularly 
		useful in situations where the browser's auto-fill feature populates
		form fields on page load.  If set to false, the initial value of the
		input is used to set the default if an initialValue option is not
		provided.
*/
		maintainInitialDefault: false
	},
	_change: function(event) {
		var uiHash = {
			'element': this.element,
			'currentValue': this.value(),
			'name': this.name,
			'previousValue': this._lastChangedValue,
			'source': (event != null ? this.element[0] : undefined)
		};
		this._lastChangedValue = uiHash.currentValue;

		this._trigger( "change", event, uiHash );
		// jQuery ui _trigger doesn't appear to call setTimeout when envoking callbacks, yikes!
		// FIXME: consider wrapping and unwrapping this.options.change in below
		//setTimeout($.proxy(function() { this.options.change.call(this, event, ui); }, this), 0);
	},
	_destroy: function() {
		this._super();
	},
	_create: function() {
		this._super();
		var input_filter = "input[type=text],input[type=password],input[type=checkbox],input[type=radio],textarea,select";
		var temp = this.element.filter(input_filter);
		if (temp.length == 0) {
			temp = this.element.find(input_filter);
		}
		if (temp.length == 0) {
			this._destroy();
			throw Error("No input elements were found.");
		}
		// only radio can be plural and must be same name (or no name) (also allow filtering by option name)
		if (temp.length > 1) {
			// make sure radio
			if ((temp.filter("[type=radio]").length != temp.length) && (temp.filter("[type=checkbox]").length != temp.length)) {
				this._destroy();
				throw Error("Multiple input elements were found; only one input or grouped input type allowed.");
			}
			// TODO: Allow filtering radio elements by option name
			// Consider also filtering input above by option name if multimple inputs
			var hasSameName = temp.map(
					(function() {
						var name = null; // Note use of null over undef
						return function(i,e) {
							if (i == 0) {
								name = $(e).attr('name');
								return true;
							} else {
								return $(e).attr('name') == name;
							}
						};
					})()
				).get().reduce(function(prev, cur) { return prev && cur; }, true);
			if (!hasSameName) {
				this._destroy();
				throw Error("Grouped radio or checkbox inputs must have the same name.");
			}
		}
		this.input = temp;
		// get input type
		this.inputType = temp.is('textarea') ? 'textarea' : temp.is("select") ? 'select' : temp.is("[type=text]") ? 'text' : temp.is("[type=radio]") ? 'radio' : temp.is('[type=checkbox]') ? (temp.length == 1 ? 'checkbox' : 'checkboxes') : 'unknown';

		// get name, if needed
		if ((this.options.name === null) || (typeof this.options.name === 'undefined')) {
			// name may still end up being undefined; consider error state in this case
			var name = this.input.first().attr('name');
			this.name = (name != "" ? name : undefined);
		} else {
			this.name = this.options.name.toString();
		}

		// check for dual checkbox values either specified as an option or in the value itself
		if (this.inputType == 'checkbox') {
			this.checkboxHasDualValues = false;
			// check checkboxValues
			if (this.options.checkboxValues != null) {
				if ($.isArray(this.options.checkboxValues)) {
					if (this.options.checkboxValues.length == 2) {
						this.checkboxHasDualValues = true;
						this.input.val(join('|', this.options.checkboxValues));
					}
				} else if (typeof this.options.checkboxValues == 'string') {
					if (this.options.checkboxValues.indexOf("|") != -1) {
						this.checkboxHasDualValues = true;
						this.input.val(this.options.checkboxValues);
					}
				}
			} else {
				// check checkbox value itself
				if (this.input.val().indexOf("|") != -1) {
					this.checkboxHasDualValues = true;
				}
			}
		}

		// set initial value (Note: null is a valid value, undefined is not)
		if (typeof this.options.initialValue !== 'undefined') {
			// MAYBE: this.options.maintainDefault here as well, will require second option to this.value(, xxx)
			this.value(this.options.initialValue);
		} else {
			// get current value and use that if keepDefaults is false
			if (this.options.maintainInitialDefault !== true) {
				this.value(this.value());
			}
		}
		this._lastChangedValue = this.value();

		// set-up disabled (MAYBE: should we work this into input?)
		if (this.options.disabled) {
			this.disable();
		} else {
			this.enable();
		}

		this._on(this.input, {"change": function(event) {
			this._change(event);
		}});

		// export as base input (alread done via this._super())
	},
	invalidate: function() {
		this._super();
		// MAYBE: Should we leave this to the user?
		this._on(this.input, {"focusin": function(event) { this.clear(); this._off(this.input, "focusin"); }});
	},
	hasChanged: function() {
			switch (this.inputType) {
				case 'textarea':
				case 'text':
				case 'password': return this.input.val() != this.input.prop("defaultValue");
				case 'select': return !this.input.find("option").filter(function(i,e) { return $(e).prop("selected") && $(e).prop("defaultSelected"); }).length;
				case 'radio': return this.input.filter(function(i,e) { return $(e).prop("defaultChecked") !== $(e).prop("checked"); }).length != 0;
				case 'checkbox': return this.input.prop("defaultChecked") != this.input.prop("checked");
				case 'checkboxes' : return this.input.filter(function(i,e) { return $(e).prop("defaultChecked") !== $(e).prop("checked"); }).length != 0;
			}
	},
	value: function(value) {
		if (typeof value == 'undefined') {
			// get the value
			switch (this.inputType) {
				// case 'textarea', 'text', 'password': (This should be standard syntax)
				case 'textarea':
				case 'text':
				case 'password': return this.input.val();
				case 'select': return this.input.find("option:selected").val();
				case 'radio': return this.input.filter(":checked").val();
				case 'checkbox':
					if (this.checkboxHasDualValues && ((pos = this.input.val().indexOf("|")) != -1)) {
						return this.input.prop("checked") ? this.input.val().substring(0, pos) : this.input.val().substring(pos+1);
					} else {
						return this.input.prop("checked") ? this.input.val() : ""; // some have recommended undefined	
					}
				case 'checkboxes' :
					return this.input.filter(function(i,e) { return $(e).prop("checked"); }).map(function(i,e) { return $(e).val(); }).get();//.reduce(function(prev, cur) { prev.push($(cur).val()); return prev; }, []);
			}
		} else {
			// set the value
			// FIXME: What if value is not a part of the select, or radio or checkbox?
			switch (this.inputType) {
				case 'textarea':
				case 'text':
				case 'password': this.input.val(value).prop("defaultValue", value); return;
				case 'select': this.input.find("option").each(function(i,e) { $(e).prop("defaultSelected", $(e).val() == value); }).each(function(i,e) { $(e).prop("selected", $(e).val() == value); }); return;
				case 'radio' : this.input.each(function(i,e) { $(e).prop("defaultChecked", $(e).val() == value); }).each(function(i,e) { $(e).prop("checked", $(e).val() == value); }); return;
				case 'checkbox': this.input.prop("defaultChecked", this.input.val() == value).prop("checked", this.input.val() == value); return;
					if (this.checkboxHasDualValues && ((pos = this.input.val().indexOf("|")) != -1)) {
						this.input.prop("defaultChecked", this.input.val().substring(0,pos) == value).prop("checked", this.input.val().substring(0,pos) == value); return;
					} else {
						this.input.prop("defaultChecked", this.input.val() == value).prop("checked", this.input.val() == value); return;
					}
				case 'checkboxes' :
					if (!$.isArray(value)) { value = [value]; }
					this.input.each(function(i,e) { $(e).prop("defaultChecked", $.inArray($(e).val(), value) != -1);}).each(function(i,e) { $(e).prop("checked", $.inArray($(e).val(), value) != -1); });
					return;
			}
			// FIXME: this._change(null);
		}
	},
	reset: function() {
		switch(this.inputType) {
			case 'textarea':
			case 'text':
			case 'password': this.input.val(this.input.prop("defaultValue")); break;
			case 'select' : this.input.find("option").filter(function(i,e) { return $(e).prop("defaultSelected"); }).each(function(i,e) { $(e).prop("selected", true); }); break;
			case 'radio'  : this.input.each(function(i,e) { $(e).prop("checked", $(e).prop("defaultChecked")); }); break;
			case 'checkbox': this.input.prop("checked", this.input.prop("defaultChecked")); break;
			case 'checkboxes' : this.input.each(function(i,e) { $(e).prop("checked", $(e).prop("defaultChecked")); }); break;
		}
		this.clear();
	},
	disable: function() {
			this._super();
		 	this.input.prop("disabled", true);
	},
	enable: function() {
			this._super();
			this.input.prop("disabled", false);
	}
});
