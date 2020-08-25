# Convergence Input Element Bindings
[![Build Status](https://travis-ci.org/convergencelabs/input-element-bindings.svg?branch=master)](https://travis-ci.org/convergencelabs/input-element-bindings)

This module provides a set of utilities to bind plain HTML Input / Form Elements to a Convergence model. The module provides simple two way data binding between the HTML input element and a particular field in the Convergence data model. The module currently supports the following input elements:

* Text Input Fields
  * &lt;input type="text" /&gt;
  * &lt;input type="password" /&gt;
  * &lt;input type="email" /&gt;
  * &lt;input type="url" /&gt;
  * &lt;input type="search" /&gt;
  * &lt;textarea /&gt;
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

You can [see it in action here](https://examples.convergence.io/input-elements/index.html).

## Installation
```npm install @convergence/input-element-bindings```


## Example Usage

```html
<html>
<head>
  <script src="http://localhost:8000/client/rxjs.umd.min.js" />
  <script src="http://localhost:8000/client/convergence.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@convergence/input-element-bindings@0.3.4/umd/convergence-input-element-bindings.min.js" />
</head>
<body>
  <input type="text" id="textInput" disabled="disabled"/>
  
  <script>
  const DOMAIN_URL = "http://localhost:8000/realtime/domain/convergence/default";
  Convergence.connectAnonymously(DOMAIN_URL)
      .then((domain) => {
          return domain.models().openAutoCreate({
              collection: "input-binder",
              id: "example",
              data: () => {
                  return {textInput: "Text to collaborate on"};
              }
          });
      })
      .then((model) => {
          const textInput = document.getElementById("textInput");
          textInput.disabled = false;
          const realTimeString = model.elementAt("textInput");
          ConvergenceInputElementBinder.bindTextInput(textInput, realTimeString);
      })
      .catch((error) => {
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
