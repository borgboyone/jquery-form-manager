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