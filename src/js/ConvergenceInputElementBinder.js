import {resolveElement} from "./ElementUtils";
import {TextInputProcessor} from "./TextInputProcessor";
import {RealTimeString, RealTimeNumber, RealTimeBoolean} from "@convergence/convergence";
import {TextInputUtils} from "./TextInputUtils";

/**
 * Binds a <input> element or a <textarea> element to a RealTimeString.
 *
 * @param textInput {HTMLInputElement | HTMLTextAreaElement}
 *   The text input element to bind to the model.
 * @param stringElement {RealTimeString}
 *   The RealTimeString element to bind to the input element
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindTextInput(textInput, stringElement) {
  const element = resolveElement(textInput);

  element.value = stringElement.value();

  const processor = new TextInputProcessor({
    element: element,
    event: "input",
    onInsert: (index, value) => stringElement.insert(index, value),
    onRemove: (index, length) => stringElement.remove(index, length)
  });

  const onRemoteInsert = event => {
    if (!event.local) {
      const originalSelection = TextInputUtils.getTextSelection(element);
      processor.insertText(event.index, event.value);
      const xFormedSelection = TextInputUtils.transformSelection(originalSelection, event);
      TextInputUtils.setTextSelection(xFormedSelection, element);
    }
  };

  stringElement.on(RealTimeString.Events.INSERT, onRemoteInsert);

  const onRemoteRemove = event => {
    if (!event.local) {
      const originalSelection = TextInputUtils.getTextSelection(element);
      processor.removeText(event.index, event.value.length);
      const xFormedSelection = TextInputUtils.transformSelection(originalSelection, event);
      TextInputUtils.setTextSelection(xFormedSelection, element);
    }
  };

  stringElement.on(RealTimeString.Events.REMOVE, onRemoteRemove);

  const onRemoteValue = event => {
    if (!event.local) processor.setValue(event.value);
  };

  stringElement.on(RealTimeString.Events.VALUE, onRemoteValue);

  const unbind = () => {
    processor.unbind();
    stringElement.off(RealTimeString.Events.INSERT, onRemoteInsert);
    stringElement.off(RealTimeString.Events.REMOVE, onRemoteRemove);
    stringElement.off(RealTimeString.Events.VALUE, onRemoteValue);
  };

  stringElement.on(RealTimeString.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}

/**
 * Binds an <input type="number"> element to a RealTimeNumber.
 *
 * @param numberInput {HTMLInputElement}
 *   The input element to bind to the model.
 * @param numberElement {RealTimeNumber}
 *   The RealTimeNumber to bind to the input element.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindNumberInput(numberInput, numberElement) {
  const element = resolveElement(numberInput);

  element.value = numberElement.value();
  const onChange = event => numberElement.value(Number(numberInput.value));
  element.addEventListener("input", onChange, false);

  const onRemoteValue = event => {
    if (!event.local) numberInput.value = event.element.value();
  };
  numberElement.on(RealTimeNumber.Events.VALUE, onRemoteValue);

  const onRemoteDelta = event => {
    if (!event.local) numberInput.value = Number(numberInput.value) + event.value;
  };
  numberElement.on(RealTimeNumber.Events.DELTA, onRemoteDelta);

  const unbind = () => {
    element.removeEventListener("input", onChange);
    numberElement.off(RealTimeNumber.Events.VALUE, onRemoteValue);
    numberElement.off(RealTimeNumber.Events.DELTA, onRemoteDelta);
  };

  numberElement.on(RealTimeNumber.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}

/**
 * Binds an <input type="checkbox"> element to a RealTimeBoolean.
 *
 * @param checkboxInput {HTMLInputElement}
 *   The input element to bind to the model.
 * @param booleanElement {RealTimeBoolean}
 *   The RealTimeBoolean to bind to the input element.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindCheckboxInput(checkboxInput, booleanElement) {
  const element = resolveElement(checkboxInput);

  element.checked = booleanElement.value();
  const onChange = event => booleanElement.value(element.checked);
  checkboxInput.addEventListener("change", onChange, false);

  const onRemoteValue = event => {
    if (!event.local) checkboxInput.checked = event.element.value();
  };
  booleanElement.on(RealTimeBoolean.Events.VALUE, onRemoteValue);

  const unbind = () => {
    checkboxInput.removeEventListener("change", onChange);
    booleanElement.off(RealTimeBoolean.Events.VALUE, onRemoteValue);
  };

  booleanElement.on(RealTimeNumber.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}

/**
 * Binds an <input type="range"> element to a RealTimeNumber.
 *
 * @param rangeInput {HTMLInputElement}
 *   The input element to bind to the model.
 * @param numberElement {RealTimeNumber}
 *   The RealTimeNumber to bind to the input element.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindRangeInput(rangeInput, numberElement) {
  return bindNumberInput(rangeInput, numberElement);
}


/**
 * Binds an <input type="color"> element to a RealTimeString.
 *
 * @param colorInput {HTMLInputElement}
 *   The input element to bind to the model.
 * @param stringElement {RealTimeString}
 *   The RealTimeString to bind to the input element.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindColorInput(colorInput, stringElement) {
  const element = resolveElement(colorInput);

  element.value = stringElement.value();

  const onChange = event => stringElement.value(colorInput.value);
  element.addEventListener("input", onChange, false);

  const onRemoteValue = event => {
    if (!event.local) colorInput.value = event.element.value();
  };
  stringElement.on(RealTimeNumber.Events.VALUE, onRemoteValue);

  const unbind = () => {
    element.removeEventListener("input", onChange);
    stringElement.off(RealTimeNumber.Events.VALUE, onRemoteValue);
  };

  stringElement.on(RealTimeNumber.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}

export function bindSingleSelect(selectInput, stringElement) {
  const element = resolveElement(selectInput);

  element.value = stringElement.value();

  const onChange = event => stringElement.value(selectInput.value);
  element.addEventListener("input", onChange, false);

  const onRemoteValue = event => {
    if (!event.local) selectInput.value = event.element.value();
  };
  stringElement.on(RealTimeNumber.Events.VALUE, onRemoteValue);

  const unbind = () => {
    element.removeEventListener("input", onChange);
    stringElement.off(RealTimeNumber.Events.VALUE, onRemoteValue);
  };

  stringElement.on(RealTimeNumber.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}

export function bindMultiSelect(selectInput, arrayElement) {
  const element = resolveElement(selectInput);

  const selectItems = () => {
    const selected = arrayElement.value();
    for (let i = 0; i < selectInput.options.length; i++) {
      const option = selectInput.options[i];
      option.selected = selected.indexOf(option.value) >= 0;
    }
  };

  selectItems();

  const onChange = event => {
    const selected = [];
    for (let i = 0; i < selectInput.options.length; i++) {
      const option = selectInput.options[i];
      if (option.selected) {
        selected.push(option.value);
      }
    }
    arrayElement.value(selected);
  };
  element.addEventListener("input", onChange, false);

  const onRemoteValue = event => {
    if (!event.local) selectItems();
  };
  arrayElement.on(RealTimeNumber.Events.VALUE, onRemoteValue);

  const unbind = () => {
    element.removeEventListener("input", onChange);
    arrayElement.off(RealTimeNumber.Events.VALUE, onRemoteValue);
  };

  arrayElement.on(RealTimeNumber.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}

export function bindRadioInputs(radioInputs, stringElement) {
  const elements = radioInputs.map(input => resolveElement(input));

  const selectItems = () => {
    const selected = stringElement.value();
    radioInputs.forEach(input => input.checked = input.value === selected);
  };

  selectItems();

  const onChange = event => {
    let set = false;
    radioInputs.forEach(input => {
      if (input.checked) {
        stringElement.value(input.value);
        set = true;
      }
    });
    if (!set) {
      stringElement.value("");
    }
  };

  elements.forEach(element => element.addEventListener("change", onChange, false));

  const onRemoteValue = event => {
    if (!event.local) selectItems();
  };
  stringElement.on(RealTimeNumber.Events.VALUE, onRemoteValue);

  const unbind = () => {
    elements.forEach(element => element.removeEventListener("change", onChange, false));
    stringElement.off(RealTimeNumber.Events.VALUE, onRemoteValue);
  };

  stringElement.on(RealTimeNumber.Events.DETACHED, unbind);

  return {
    unbind: unbind
  };
}
