/*!
 * jQuery Form Manager 1.0.0
 * https://github.com/borgboyone/jquery-form-manager
 *
 * Copyright 2014 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-form-manager/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-form-manager/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

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
		var Parser = (function(){function F(c,a,n,b,g,d,k,m){a=d.length-1;switch(g){case 1:return d[a-1];case 2:case 8:case 17:case 18:this.b=d[a];break;case 3:b=$.merge(d[a-2],d[a]);for(c=b.length-1;0<=c;c--)for(g=c-1;0<=g;g--)if(b[c]===b[g]){b.splice(c,1);break}this.b=b;break;case 4:this.b=y(d[a-2],d[a]);break;case 6:this.b=s(b.data.initialInputs.slice(0),d[a].attributes,d[a].t,b.filters);break;case 7:c=s(b.data.initialInputs.slice(0),d[a].attributes,d[a].t,b.filters);this.b=t(b.data.initialInputs.slice(0),c);break;
case 9:this.b=t(b.data.initialInputs.slice(0),d[a]);break;case 10:this.b={attributes:d[a]};break;case 11:this.b={t:d[a]};break;case 12:this.b={attributes:d[a-1],t:d[a]};break;case 13:this.b=d[a-1];break;case 14:this.b=[d[a]];break;case 15:d[a-2].push(d[a]);this.b=d[a-2];break;case 16:d[a-2]in b.filters.properties||m("Invalid attribute name ("+d[a-2]+")",{u:!1});this.b={name:d[a-2],value:d[a],operator:d[a-1]};break;case 19:this.b=[d[a]];break;case 20:d[a-1].push(d[a]);this.b=d[a-1];break;case 21:d[a]in
b.filters.dichotomies||m("Invalid property name ("+d[a]+")",{u:!1});this.b={name:d[a],negate:!1};break;case 22:d[a]in b.filters.dichotomies||m("Invalid property name ("+d[a]+")",{u:!1});this.b={name:d[a],negate:!0};break;case 23:case 24:this.b=c}}function s(c,a,n,b){$.isArray(a)&&a.forEach(function(a){c=b.properties[a.name](c,a)});$.isArray(n)&&n.forEach(function(a){c=b.dichotomies[a.name](c,a)});return c}function t(c,a){return c.filter(function(c){return-1==a.indexOf(c)})}function y(c,a){return c.filter(function(c){return-1!=
a.indexOf(c)})}function q(c){function a(a,b){if(b.u)this.trace(a);else throw Error(a);}var n={},b=new z;if(this instanceof q)c&&"[object Object]"===Object.prototype.toString.call(c)&&(c.yy&&(n=c.yy),c.lexer&&(b=c.lexer),c.error&&(a=c.error));else throw Error("Parser called in static context; use new Parser() instead.");this.__proto__.parse=function(c,d){var k=[0],m=[null],f=[],q="",v=0,s=0,t=0,y=f.slice.call(arguments,1);b.M(c);b.o=n;n.Q=b;n.F=this;n.data=d;"undefined"==typeof b.a&&(b.a={});var A=
b.a;f.push(A);for(var z=b.options&&b.options.r,e,B,p,h,r={},w,l;;){p=k[k.length-1];if(C[p])h=C[p];else{if(null===e||"undefined"==typeof e)e=void 0,e=b.C()||1,"number"!==typeof e&&(e=G[e]||e);h=x[p]&&x[p][e]}if("undefined"===typeof h||!h.length||!h[0]){var D="";l=[];for(w in x[p])u[w]&&2<w&&l.push("'"+u[w]+"'");D=b.s?"Parse error on line "+(v+1)+":\n"+b.s()+"\nExpecting "+l.join(", ")+", got '"+(u[e]||e)+"'":"Parse error on line "+(v+1)+": Unexpected "+(1==e?"end of input":"'"+(u[e]||e)+"'");a(D,{text:b.match,
H:u[e]||e,D:b.d,R:A,O:l})}if(h[0]instanceof Array&&1<h.length)throw Error("Parse Error: multiple actions possible at state: "+p+", token: "+e);switch(h[0]){case 1:k.push(e);m.push(b.f);f.push(b.a);k.push(h[1]);e=null;B?(e=B,B=null):(s=b.l,q=b.f,v=b.d,A=b.a,0<t&&t--);break;case 2:l=E[h[1]][1];r.b=m[m.length-l];r.w={n:f[f.length-(l||1)].n,i:f[f.length-1].i,m:f[f.length-(l||1)].m,g:f[f.length-1].g};z&&(r.w.j=[f[f.length-(l||1)].j[0],f[f.length-1].j[1]]);p=F.apply(r,[q,s,v,n,h[1],m,f,a].concat(y));if("undefined"!==
typeof p)return p;l&&(k=k.slice(0,-2*l),m=m.slice(0,-1*l),f=f.slice(0,-1*l));k.push(E[h[1]][0]);m.push(r.b);f.push(r.w);h=x[k[k.length-2]][k[k.length-1]];k.push(h);break;case 3:return!0}}}}var G={error:2,inputs:3,compound_selector:4,EOF:5,unary_selector:6,"|":7,"&":8,group_selector:9,"(":10,")":11,selector:12,"-":13,attribute:14,properties:15,"[":16,attribute_list:17,"]":18,attribute_expression:19,",":20,ident:21,"=":22,value:23,string:24,property:25,":":26,";":27,IDENT:28,STRING:29,$accept:0,$end:1},
u={2:"error",5:"EOF",7:"|",8:"&",10:"(",11:")",13:"-",16:"[",18:"]",20:",",22:"=",26:":",27:";",28:"IDENT",29:"STRING"},E=[0,[3,2],[4,1],[4,3],[4,3],[9,3],[6,1],[6,2],[6,1],[6,2],[12,1],[12,1],[12,2],[14,3],[17,1],[17,3],[19,3],[23,1],[23,1],[15,1],[15,2],[25,2],[25,2],[21,1],[24,1]],x=[{3:1,4:2,6:3,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{1:[3]},{5:[1,14],7:[1,15],8:[1,16]},{5:[2,2],7:[2,2],8:[2,2],11:[2,2]},{5:[2,6],7:[2,6],8:[2,6],11:[2,6]},{9:18,10:[1,9],12:17,
14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{5:[2,8],7:[2,8],8:[2,8],11:[2,8]},{5:[2,10],7:[2,10],8:[2,10],11:[2,10],15:19,25:11,26:[1,12],27:[1,13]},{5:[2,11],7:[2,11],8:[2,11],11:[2,11],25:20,26:[1,12],27:[1,13]},{4:21,6:3,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{17:22,19:23,21:24,28:[1,25]},{5:[2,19],7:[2,19],8:[2,19],11:[2,19],26:[2,19],27:[2,19]},{21:26,28:[1,25]},{21:27,28:[1,25]},{1:[2,1]},{6:28,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,
12],27:[1,13]},{6:29,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{5:[2,7],7:[2,7],8:[2,7],11:[2,7]},{5:[2,9],7:[2,9],8:[2,9],11:[2,9]},{5:[2,12],7:[2,12],8:[2,12],11:[2,12],25:20,26:[1,12],27:[1,13]},{5:[2,20],7:[2,20],8:[2,20],11:[2,20],26:[2,20],27:[2,20]},{7:[1,15],8:[1,16],11:[1,30]},{18:[1,31],20:[1,32]},{18:[2,14],20:[2,14]},{22:[1,33]},{5:[2,23],7:[2,23],8:[2,23],11:[2,23],18:[2,23],20:[2,23],22:[2,23],26:[2,23],27:[2,23]},{5:[2,21],7:[2,21],8:[2,21],11:[2,21],
26:[2,21],27:[2,21]},{5:[2,22],7:[2,22],8:[2,22],11:[2,22],26:[2,22],27:[2,22]},{5:[2,3],7:[2,3],8:[2,3],11:[2,3]},{5:[2,4],7:[2,4],8:[2,4],11:[2,4]},{5:[2,5],7:[2,5],8:[2,5],11:[2,5]},{5:[2,13],7:[2,13],8:[2,13],11:[2,13],26:[2,13],27:[2,13]},{19:34,21:24,28:[1,25]},{21:36,23:35,24:37,28:[1,25],29:[1,38]},{18:[2,15],20:[2,15]},{18:[2,16],20:[2,16]},{18:[2,17],20:[2,17]},{18:[2,18],20:[2,18]},{18:[2,24],20:[2,24]}],C={14:[2,1]},z=function(){function c(){if(!(this instanceof c))return new c}c.prototype=
{v:1,parseError:function(a,c){if(this.o.F)this.o.F.parseError(a,c);else throw Error(a);},M:function(a){this.c=a;this.q=this.p=this.k=!1;this.d=this.l=0;this.f=this.h=this.match="";this.e=["INITIAL"];this.a={n:1,m:0,i:1,g:0};this.options.r&&(this.a.j=[0,0]);this.offset=0;return this},input:function(){var a=this.c[0];this.f+=a;this.l++;this.offset++;this.match+=a;this.h+=a;a.match(/(?:\r\n?|\n).*/g)?(this.d++,this.a.i++):this.a.g++;this.options.r&&this.a.j[1]++;this.c=this.c.slice(1);return a},reject:function(){if(this.options.A)this.p=
!0;else return this.parseError("Lexical error on line "+(this.d+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.s(),{text:"",H:null,D:this.d});return this},K:function(){var a=this.h.substr(0,this.h.length-this.match.length);return(20<a.length?"...":"")+a.substr(-20).replace(/\n/g,"")},N:function(){var a=this.match;20>a.length&&(a+=this.c.substr(0,20-a.length));return(a.substr(0,20)+(20<a.length?"...":"")).replace(/\n/g,
"")},s:function(){var a=this.K(),c=Array(a.length+1).join("-");return a+this.N()+"\n"+c+"^"},G:function(a,c){var b,g;this.options.A&&(g={d:this.d,a:{n:this.a.n,i:this.i,m:this.a.m,g:this.a.g},f:this.f,match:this.match,matches:this.matches,h:this.h,l:this.l,offset:this.offset,q:this.q,c:this.c,o:this.o,e:this.e.slice(0),k:this.k},this.options.r&&(g.a.j=this.a.j.slice(0)));if(b=a[0].match(/(?:\r\n?|\n).*/g))this.d+=b.length;this.a={n:this.a.i,i:this.d+1,m:this.a.g,g:b?b[b.length-1].length-b[b.length-
1].match(/\r?\n?/)[0].length:this.a.g+a[0].length};this.f+=a[0];this.match+=a[0];this.matches=a;this.l=this.f.length;this.options.r&&(this.a.j=[this.offset,this.offset+=this.l]);this.p=this.q=!1;this.c=this.c.slice(a[0].length);this.h+=a[0];b=this.L.call(this,this.o,this,c,this.e[this.e.length-1]);this.k&&this.c&&(this.k=!1);if(b)return b;if(this.p)for(var d in g)this[d]=g[d];return!1},next:function(){if(this.k)return this.v;this.c||(this.k=!0);var a,c,b;this.q||(this.match=this.f="");for(var g=this.I(),
d=0;d<g.length;d++)if((c=this.c.match(this.rules[g[d]]))&&(!a||c[0].length>a[0].length))if(a=c,b=d,this.options.A){a=this.G(c,g[d]);if(!1!==a)return a;if(this.p)a=!1;else return!1}else if(!this.options.P)break;return a?(a=this.G(a,g[b]),!1!==a?a:!1):""===this.c?this.v:this.parseError("Lexical error on line "+(this.d+1)+". Unrecognized text.\n"+this.s(),{text:"",H:null,D:this.d})},C:function(){var a=this.next();return a?a:this.C()},J:function(a){this.e.push(a)},I:function(){return this.e.length&&this.e[this.e.length-
1]?this.B[this.e[this.e.length-1]].rules:this.B.INITIAL.rules},pushState:function(a){this.J(a)},options:{},L:function(a,c,b){switch(b){case 1:return 8;case 2:return 7;case 3:return 13;case 4:return 10;case 5:return 11;case 6:return 16;case 7:return 18;case 8:return 22;case 9:return 26;case 10:return 27;case 11:return 28;case 12:return 5;case 13:return"INVALID"}},rules:[/^(?:\s+)/,/^(?:&)/,/^(?:\|)/,/^(?:-)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:=)/,/^(?::)/,/^(?:;)/,/^(?:(\\.|[\w-]|[^\x00-\xa0])+)/,
/^(?:$)/,/^(?:.)/],B:{INITIAL:{rules:[0,1,2,3,4,5,6,7,8,9,10,11,12,13],inclusive:!0}}};return c.prototype.constructor=c}();q.prototype={trace:function(){},parse:null};return q.prototype.constructor=q})();

	} // if
})(jQuery);

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
	_instanceOf: function(name) {
		var base = this, found = false;
		while ((base.__proto__.widgetName != "widget") && !(found = (base.__proto__.widgetName == name))) {
			base = base.__proto__;
		}
		return found;
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
		initialValue: undefined,
		checkboxValues: null,
		name: null,
		change: null,
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


/*!
 * jQuery UI Form 1.0.0
 * https://github.com/borgboyone/jquery-form-manager
 *
 * Copyright 2014 Anthony Wells
 * Released under the MIT license.
 * https://raw.githubusercontent.com/borgboyone/jquery-form-manager/master/LICENSE
 *
 * http://borgboyone.github.io/jquery-form-manager/
 */

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


}));