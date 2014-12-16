jQuery-Form-Manager
===================

The **jQuery Form Manager** plugin provides a comprehensive framework for working with not only standard HTML forms and their inputs but also user defined input elements.

###Overview
The W3C has been working toward providing a meaningful and functionally useful specification of form input control and validation for some time.  As it stands, implementation varies from browser to browser, with some browsers providing no support at all.  This collection of jQuery UI Widgets aims to provide a constitent, cross browser interface that can be extended to accomodate any user input construct.

###Input
The base foundation in this collection of form related tools is the _Input_ widget.  The _Input_ widget specifies the interface that users should make available when extending the widget and also provides some rudimentary functionality.

Core concept functions include:

- `input([value])`: get or set the value of the input
- `name`: name of the input either set as an option or element attribute
- `reset`: reset the input to its initial value
- `validation`:a user defined validation function
- `invalidate`: visual response method to negative validation outcome
- `clear`: removal of these visuals
- `change`: callback when the value is changed
- `validationState`: the current validation state of the input

State functions include:

- `hasChanged`: Has the input value changed since the value was last set
- `isValid`: Is the input's value considered valid
- `isDisabled`: Is the input disabled

The _Input_ widget is noval in that it brings the concept of an interface to the jQuery UI framework; a key feature that has been lacking for some time.  Any interactive element can become an _Input_ by extending the base widget and implementing a handful of functions (See Examples below).

###Form
Bringing everything together is the _Form_ widget which provides the cohesive glue expected for a collection of Inputs, acting as both the overseer and manager of any Input widget that falls under its umbrella.

The Form functionality mirrors that of the Input interface with the only difference being that functions are applied to all Inputs that are considered a part of the Form.  For example, users can query all the values of the Inputs, the names of the Inputs, call any of the Input methods such as `clear`, `reset`, `validate`...all at the Form level.

Note, the Form doesn't require an actual form element; it can be attached to any element.  Also, it is not necessary to specify the Inputs when instantiating the Form.  Any Input that is a descendent of the Form element is automatically associated with the Form.  There is no stored association and Input's can be created and destroyed at will.

The jQuery UI Form manager also provides an extensive selector mechanism for filtering Inputs in all Form functions.  _Inputs_ can be filtered by properties (aka attributes) and dichotomies (aka booleans).  In addition to these filters there are also various Venn type operators available, including exclude ('-'), group ('('...')'), merge ('|') and intersect ('&').  Combined with the base filtering mechanisms, these operators provide aggregation of inputs that would normally only be accomplished through several intermediate calls to the `inputs` function.

An Input implementation for basic input form elements (text, password, textarea, select, checkbox, and radio) is provided to aid users in getting started quickly with the Form Manager.

A demo and further information, including access to the api, is available at http://borgboyone.github.io/jquery-form-manager/

Examples
--------
####Radio Button Group
```html
<div id="season">
	<label for="season">Season</label>
	<input type="radio" name="season" checked="checked" value="winter">Winter</input>
	<input type="radio" name="season" value="spring">Spring</input>
	<input type="radio" name="season" value="summer">Summer</input>
	<input type="radio" name="season" value="autumn">Autumn</input>
</div>
```
with
```javascript
var seasonInput = $('#season').inputBasic({initialValue: 'spring'}).inputBasic("instance");
console.log(seasonInput.value()); // Outputs 'spring'
seasonInput.value('summer');
console.log(seasonInput.value()); // Outputs 'summer'
```
####UI Slider as an Input
```javascript
var inputSlider = $.widget("ui.slider", 
    $.aw.experimental.implement(
        $.aw.experimental.acquireTraits(
            {
				_create: function() {
					this._super();
					this._defaultValue = this.value();
				},
				value: function(value) {
					this._super(value);
					this._defaultValue = value;
				},
				reset: function() {
					this.value(this._defaultValue);
				},
				hasChanged: function() {
					return this.value !== this._defaultValue;
				},
				_change: function(event) {
					var uiHash = {
						'element': this.element,
						'currentValue': this.value(),
						'value': this.value(),
						'name': this.name,
						'previousValue': this._lastChangedValue,
						'source': (event != null ? this.element[0] : undefined)
					};
					this._lastChangedValue = uiHash.currentValue;
					this._trigger( "change", event, uiHash );
				}
            },
            $.aw.input
        ),
        $.aw.input
    )
);
```

####Form Input values for Ajax Post
```javascript
$.post({
    my_url,
    $.param($('body').form('values'))
});
```

Limitations
-----------
There are no known limitations at this time.

License
-------
MIT License. Copyright 2014, Anthony Wells.
