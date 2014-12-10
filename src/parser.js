var Parser = (function(){
var symbols_ = {"error":2,"inputs":3,"compound_selector":4,"EOF":5,"unary_selector":6,"|":7,"&":8,"group_selector":9,"(":10,")":11,"selector":12,"-":13,"attribute":14,"properties":15,"[":16,"attribute_list":17,"]":18,"attribute_expression":19,",":20,"ident":21,"=":22,"value":23,"string":24,"property":25,":":26,";":27,"IDENT":28,"STRING":29,"$accept":0,"$end":1},
terminals_ = {2:"error",5:"EOF",7:"|",8:"&",10:"(",11:")",13:"-",16:"[",18:"]",20:",",22:"=",26:":",27:";",28:"IDENT",29:"STRING"},
productions_ = [0,[3,2],[4,1],[4,3],[4,3],[9,3],[6,1],[6,2],[6,1],[6,2],[12,1],[12,1],[12,2],[14,3],[17,1],[17,3],[19,3],[23,1],[23,1],[15,1],[15,2],[25,2],[25,2],[21,1],[24,1]],
table_ = [{3:1,4:2,6:3,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{1:[3]},{5:[1,14],7:[1,15],8:[1,16]},{5:[2,2],7:[2,2],8:[2,2],11:[2,2]},{5:[2,6],7:[2,6],8:[2,6],11:[2,6]},{9:18,10:[1,9],12:17,14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{5:[2,8],7:[2,8],8:[2,8],11:[2,8]},{5:[2,10],7:[2,10],8:[2,10],11:[2,10],15:19,25:11,26:[1,12],27:[1,13]},{5:[2,11],7:[2,11],8:[2,11],11:[2,11],25:20,26:[1,12],27:[1,13]},{4:21,6:3,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{17:22,19:23,21:24,28:[1,25]},{5:[2,19],7:[2,19],8:[2,19],11:[2,19],26:[2,19],27:[2,19]},{21:26,28:[1,25]},{21:27,28:[1,25]},{1:[2,1]},{6:28,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{6:29,9:6,10:[1,9],12:4,13:[1,5],14:7,15:8,16:[1,10],25:11,26:[1,12],27:[1,13]},{5:[2,7],7:[2,7],8:[2,7],11:[2,7]},{5:[2,9],7:[2,9],8:[2,9],11:[2,9]},{5:[2,12],7:[2,12],8:[2,12],11:[2,12],25:20,26:[1,12],27:[1,13]},{5:[2,20],7:[2,20],8:[2,20],11:[2,20],26:[2,20],27:[2,20]},{7:[1,15],8:[1,16],11:[1,30]},{18:[1,31],20:[1,32]},{18:[2,14],20:[2,14]},{22:[1,33]},{5:[2,23],7:[2,23],8:[2,23],11:[2,23],18:[2,23],20:[2,23],22:[2,23],26:[2,23],27:[2,23]},{5:[2,21],7:[2,21],8:[2,21],11:[2,21],26:[2,21],27:[2,21]},{5:[2,22],7:[2,22],8:[2,22],11:[2,22],26:[2,22],27:[2,22]},{5:[2,3],7:[2,3],8:[2,3],11:[2,3]},{5:[2,4],7:[2,4],8:[2,4],11:[2,4]},{5:[2,5],7:[2,5],8:[2,5],11:[2,5]},{5:[2,13],7:[2,13],8:[2,13],11:[2,13],26:[2,13],27:[2,13]},{19:34,21:24,28:[1,25]},{21:36,23:35,24:37,28:[1,25],29:[1,38]},{18:[2,15],20:[2,15]},{18:[2,16],20:[2,16]},{18:[2,17],20:[2,17]},{18:[2,18],20:[2,18]},{18:[2,24],20:[2,24]}],
defaultActions = {14:[2,1]},
performAction = function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$, yyerror) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: case 8: case 17: case 18: this.$ = $$[$0]; 
break;
case 3: this.$ = union($$[$0-2], $$[$0]); 
break;
case 4: this.$ = intersect($$[$0-2], $$[$0]); 
break;
case 6: this.$ = filter(yy['data']['initialInputs'].slice(0), $$[$0].attributes, $$[$0].properties, yy['filters']); 
break;
case 7: var inputs = filter(yy['data']['initialInputs'].slice(0), $$[$0].attributes, $$[$0].properties, yy['filters']); this.$ = exclude(yy['data']['initialInputs'].slice(0), inputs); 
break;
case 9: this.$ = exclude(yy['data']['initialInputs'].slice(0), $$[$0]);
break;
case 10: this.$ = {attributes: $$[$0]}; 
break;
case 11: this.$ = {properties: $$[$0]}; 
break;
case 12: this.$ = {attributes: $$[$0-1], properties: $$[$0]}; 
break;
case 13: this.$ = $$[$0-1]; 
break;
case 14: this.$ = [$$[$0]]; 
break;
case 15: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 16: if (!($$[$0-2] in yy['filters']['properties'])) { yyerror("Invalid attribute name (" + $$[$0-2] + ")", {recoverable: false}); } this.$ = {name: $$[$0-2], value: $$[$0], operator: $$[$0-1]}; 
break;
case 19: this.$ = [$$[$0]]; 
break;
case 20: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 21: if (!($$[$0] in yy['filters']['dichotomies'])) { yyerror("Invalid property name (" + $$[$0] + ")", {recoverable: false}); } this.$ = {name: $$[$0], negate: false}; 
break;
case 22: if (!($$[$0] in yy['filters']['dichotomies'])) { yyerror("Invalid property name (" + $$[$0] + ")", {recoverable: false}); } this.$ = {name: $$[$0], negate: true}; 
break;
case 23: case 24: this.$ = yytext; 
break;
}
};
var proto = {trace: function trace(){}, 'parse': null };

    function filter(inputs, attributes, properties, filters) {
        if ($['isArray'](attributes)) {
            attributes.forEach(function(property){
                inputs = filters['properties'][property.name](inputs, property);
            });
        }
        if ($['isArray'](properties)) {
            properties.forEach(function(dichotomy){
                inputs = filters['dichotomies'][dichotomy.name](inputs, dichotomy);
            });
        }
        return inputs;
    }

    function unique(array1) {
        for(var i = array1.length - 1; i >= 0; i--) {
            for(var j = i - 1; j >= 0; j--) {
                if (array1[i] === array1[j]) {
                    array1.splice(i,1);
                    break;
                }
            }
        }
        return array1;
    }
    function union(array1, array2) {
        return unique($['merge'](array1, array2));
    }
    function exclude(array1, array2) {
        return array1.filter(function(n) {
            return (array2.indexOf(n) == -1);
        });
    }
    function intersect(array1, array2) {
        return array1.filter(function(n) {
            return array2.indexOf(n) != -1;
        });
    }

/* generated by jison-lex 0.2.1 */
var Lexer = (function(){
var proto = {

EOF:1,

parseError:function parseError(str,hash){
"use strict";
if(this.yy.parser){this.yy.parser.parseError(str,hash)}else{throw new Error(str)}},

// resets the lexer, sets new input
setInput:function (input){
"use strict";
this._input=input;this._more=this._backtrack=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};if(this.options.ranges){this.yylloc.range=[0,0]}this.offset=0;return this},

// consumes and returns one char from the input
input:function (){
"use strict";
var ch=this._input[0];this.yytext+=ch;this.yyleng++;this.offset++;this.match+=ch;this.matched+=ch;var lines=ch.match(/(?:\r\n?|\n).*/g);if(lines){this.yylineno++;this.yylloc.last_line++}else{this.yylloc.last_column++}if(this.options.ranges){this.yylloc.range[1]++}this._input=this._input.slice(1);return ch},

// unshifts one char (or a string) into the input
unput:function (ch){
"use strict";
var len=ch.length;var lines=ch.split(/(?:\r\n?|\n)/g);this._input=ch+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-len-1);this.offset-=len;var oldLines=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);if(lines.length-1){this.yylineno-=lines.length-1}var r=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:lines?(lines.length===oldLines.length?this.yylloc.first_column:0)+oldLines[oldLines.length-lines.length].length-lines[0].length:this.yylloc.first_column-len};if(this.options.ranges){this.yylloc.range=[r[0],r[0]+this.yyleng-len]}this.yyleng=this.yytext.length;return this},

// When called from action, caches matched text and appends it on next action
more:function (){
"use strict";
this._more=true;return this},

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function (){
"use strict";
if(this.options.backtrack_lexer){this._backtrack=true}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}return this},

// retain first n characters of the match
less:function (n){
"use strict";
this.unput(this.match.slice(n))},

// displays already matched input, i.e. for error messages
pastInput:function (){
"use strict";
var past=this.matched.substr(0,this.matched.length-this.match.length);return(past.length>20?"...":"")+past.substr(-20).replace(/\n/g,"")},

// displays upcoming input, i.e. for error messages
upcomingInput:function (){
"use strict";
var next=this.match;if(next.length<20){next+=this._input.substr(0,20-next.length)}return(next.substr(0,20)+(next.length>20?"...":"")).replace(/\n/g,"")},

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function (){
"use strict";
var pre=this.pastInput();var c=new Array(pre.length+1).join("-");return pre+this.upcomingInput()+"\n"+c+"^"},

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match,indexed_rule){
"use strict";
var token,lines,backup;if(this.options.backtrack_lexer){backup={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done};if(this.options.ranges){backup.yylloc.range=this.yylloc.range.slice(0)}}lines=match[0].match(/(?:\r\n?|\n).*/g);if(lines){this.yylineno+=lines.length}this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:lines?lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+match[0].length};this.yytext+=match[0];this.match+=match[0];this.matches=match;this.yyleng=this.yytext.length;if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng]}this._more=false;this._backtrack=false;this._input=this._input.slice(match[0].length);this.matched+=match[0];token=this.performAction.call(this,this.yy,this,indexed_rule,this.conditionStack[this.conditionStack.length-1]);if(this.done&&this._input){this.done=false}if(token){return token}else if(this._backtrack){for(var k in backup){this[k]=backup[k]}return false}return false},

// return next match in input
next:function (){
"use strict";
if(this.done){return this.EOF}if(!this._input){this.done=true}var token,match,tempMatch,index;if(!this._more){this.yytext="";this.match=""}var rules=this._currentRules();for(var i=0;i<rules.length;i++){tempMatch=this._input.match(this.rules[rules[i]]);if(tempMatch&&(!match||tempMatch[0].length>match[0].length)){match=tempMatch;index=i;if(this.options.backtrack_lexer){token=this.test_match(tempMatch,rules[i]);if(token!==false){return token}else if(this._backtrack){match=false;continue}else{return false}}else if(!this.options.flex){break}}}if(match){token=this.test_match(match,rules[index]);if(token!==false){return token}return false}if(this._input===""){return this.EOF}else{return this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}},

// return next match that has a token
lex:function lex(){
"use strict";
var r=this.next();if(r){return r}else{return this.lex()}},

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition){
"use strict";
this.conditionStack.push(condition)},

// pop the previously active lexer condition state off the condition stack
popState:function popState(){
"use strict";
var n=this.conditionStack.length-1;if(n>0){return this.conditionStack.pop()}else{return this.conditionStack[0]}},

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules(){
"use strict";
if(this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules}else{return this.conditions["INITIAL"].rules}},

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n){
"use strict";
n=this.conditionStack.length-1-Math.abs(n||0);if(n>=0){return this.conditionStack[n]}else{return"INITIAL"}},

// alias for begin(condition)
pushState:function pushState(condition){
"use strict";
this.begin(condition)},

// return the number of states currently on the stack
stateStackSize:function stateStackSize(){
"use strict";
return this.conditionStack.length},
options: {},
performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1: return 8; 
break;
case 2: return 7; 
break;
case 3: return 13; 
break;
case 4: return 10; 
break;
case 5: return 11; 
break;
case 6: return 16; 
break;
case 7: return 18; 
break;
case 8: return 22; 
break;
case 9: return 26; 
break;
case 10: return 27; 
break;
case 11: return 28; 
break;
case 12: return 5; 
break;
case 13: return 'INVALID'; 
break;
}
},
rules: [/^(?:\s+)/,/^(?:&)/,/^(?:\|)/,/^(?:-)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:=)/,/^(?::)/,/^(?:;)/,/^(?:(\\.|[\w-]|[^\x00-\xa0])+)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
};
function Lexer() {
    if (this instanceof Lexer) {
        //return this.__proto__;
    } else {
        return new Lexer();
    }
}
Lexer.prototype = proto;
Lexer.prototype.constructor = Lexer;
return Lexer;
})();
//proto.lexer = lexer;
function Parser (options) {
"use strict";
    var yy = {};
    var parseError = function(str,hash){if(hash.recoverable){this.trace(str)}else{throw new Error(str)}};
    var lexer = new Lexer();
    if (this instanceof Parser) {
        // if ($.isPlainObject(options)) { for now...
        if (options && (Object.prototype.toString.call( options ) === "[object Object]")) {
            if (options['yy']) { // && isPO...
                yy = options['yy'];
            }
            if (options['lexer']) {
                lexer = options['lexer'];
            }
            if (options['error']) {
                parseError = options['error'];
            }
        }
    } else {
        throw new Error("Parser called in static context; use new Parser() instead.");
    }
/* ====================== */
this.__proto__['parse'] = function parse(input, data) {
    var self = this, stack = [0], vstack = [null], lstack = [], yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    lexer.setInput(input);
    lexer.yy = yy;
    yy.lexer = lexer;
    yy.parser = this;
    yy['data'] = data;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (defaultActions[state]) {
            action = defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table_[state] && table_[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table_[state]) {
                    if (terminals_[p] && p > TERROR) {
                        expected.push('\'' + terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (terminals_[symbol] || symbol) + '\'');
                }
                parseError(errStr, {
                    text: lexer.match,
                    token: terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                yy,
                action[1],
                vstack,
                lstack,
                parseError
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table_[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
}/* ====================== */
}
Parser.prototype = proto;
Parser.prototype.constructor = Parser;
return Parser;
})();
