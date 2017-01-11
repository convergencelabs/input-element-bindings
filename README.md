# Convergence Input Element Bindings
[![Build Status](https://travis-ci.org/convergencelabs/input-element-bindings.svg?branch=master)](https://travis-ci.org/convergencelabs/input-element-bindings)

This module provides a set of utilities to bind plain HTML Input / Form Elements to a Convergence model. The module provides simple two way data binding between the HTML input element and a particular field in the Convergence data model. The module currently supports the following input elements:

* Text Input Fields
  * &lt;input type="text" /&gt;
  * &lt;input type="password" /&gt;
  * &lt;input type="email" /&gt;
  - &lt;input type="url" /&gt;
  - &lt;input type="search" /&gt;
  - &lt;textarea /&gt;
- Radio Buttons
  - &lt;input type="radio" /&gt;
- Select Elements
  - &lt;select /&gt;
  - &lt;select multiple /&gt; 
- Color Selector
  - &lt;input type="color" /&gt;
- Number Fields
  - &lt;input type="number" /&gt;
  - &lt;input type="range" /&gt;

## Installation
```npm install --save @convergence/input-element-bindings```

or

```npm install --save-dev @convergence/input-element-bindings```

## Example Usage

```html
<html>
<head>
  <script src="https://client.convergence.io/v1/convergence.js" language="JavaScript" />
  <script src="https://client.convergence.io/libs/convergence-html-input-bindings.js" language="JavaScript" />
</head>
<body>
  <input type="text" id="textInput" />
  
  <script>
  const DOMAIN_URL = "https://api.convergence.io/realtime/domain/<username>/<domain-id>";
  Convergence.connectAnonymously(DOMAIN_URL).then(function(domain) {
    return domain.models().open("input-binder", "test", function() {
      return { textInput: "textInput" };
    });
  }).then(function(model) {
    const textInput = document.getElementById("textInput");
    const realTimeString = model.elementAt("textInput");
    ConvergenceInputElementBinder.bindTextInput(textInput, realTimeString);
  }).catch(function(error) {
    console.error(error);
  });
  </script>
</body>
</html>
```

## API
```javascript
function bindTextInput(textInput, stringElement)
function bindNumberInput(numberInput, numberElement)
function bindCheckboxInput(checkboxInput, booleanElement)
function bindRangeInput(rangeInput, numberElement)
function bindColorInput(colorInput, stringElement)
function bindSingleSelect(selectInput, stringElement)
function bindMultiSelect(selectInput, arrayElement)
function bindRadioInputs(radioInputs, stringElement)
```