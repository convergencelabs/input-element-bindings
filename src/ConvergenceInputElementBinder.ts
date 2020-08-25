import {resolveElement} from "./ElementUtils";
import {TextInputProcessor} from "./TextInputProcessor";
import {
  RealTimeString,
  RealTimeNumber,
  RealTimeBoolean,
  StringInsertEvent,
  StringRemoveEvent,
  StringSetValueEvent,
  NumberSetValueEvent,
  NumberDeltaEvent,
  BooleanSetValueEvent,
  RealTimeArray,
  ArraySetValueEvent
} from "@convergence/convergence";
import {TextInputUtils} from "./TextInputUtils";
import {TextInputElement} from "./TextInputElement";
import {IConvergenceDomBinding} from "./IConvergenceDomBinding";

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
export function bindTextInput(textInput: string | TextInputElement, stringElement: RealTimeString): IConvergenceDomBinding {
  const element = resolveElement(textInput) as HTMLInputElement;

  element.value = stringElement.value();

  const processor = new TextInputProcessor({
    element: element,
    event: "input",
    onInsert: (index, value) => stringElement.insert(index, value),
    onRemove: (index, length) => stringElement.remove(index, length)
  });

  const onRemoteInsert = (event: StringInsertEvent) => {
    if (!event.local) {
      const originalSelection = TextInputUtils.getTextSelection(element);
      console.log(originalSelection);
      processor.insertText(event.index, event.value);
      const xFormedSelection = TextInputUtils.transformSelection(originalSelection, event);
      TextInputUtils.setTextSelection(xFormedSelection, element);
    }
  };

  stringElement.on(RealTimeString.Events.INSERT, onRemoteInsert);

  const onRemoteRemove = (event: StringRemoveEvent) => {
    if (!event.local) {
      const originalSelection = TextInputUtils.getTextSelection(element);
      processor.removeText(event.index, event.value.length);
      const xFormedSelection = TextInputUtils.transformSelection(originalSelection, event);
      TextInputUtils.setTextSelection(xFormedSelection, element);
    }
  };

  stringElement.on(RealTimeString.Events.REMOVE, onRemoteRemove);

  const onRemoteValue = (event: StringSetValueEvent) => {
    if (!event.local) processor.setValue(event.element.value());
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
export function bindNumberInput(numberInput: string | HTMLInputElement, numberElement: RealTimeNumber): IConvergenceDomBinding {
  const element = resolveElement(numberInput) as HTMLInputElement;

  element.value = String(numberElement.value());
  const onChange = () => numberElement.value(Number(element.value));
  element.addEventListener("input", onChange, false);

  const onRemoteValue = (event: NumberSetValueEvent) => {
    if (!event.local) element.value = String(event.element.value());
  };
  numberElement.on(RealTimeNumber.Events.VALUE, onRemoteValue);

  const onRemoteDelta = (event: NumberDeltaEvent) => {
    if (!event.local) element.value = String(Number(element.value) + event.value);
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
export function bindCheckboxInput(checkboxInput: string | HTMLInputElement, booleanElement: RealTimeBoolean): IConvergenceDomBinding {
  const element = resolveElement(checkboxInput) as HTMLInputElement;

  element.checked = booleanElement.value();
  const onChange = () => booleanElement.value(element.checked);
  element.addEventListener("change", onChange, false);

  const onRemoteValue = (event: BooleanSetValueEvent) => {
    if (!event.local) element.checked = event.element.value();
  };
  booleanElement.on(RealTimeBoolean.Events.VALUE, onRemoteValue);

  const unbind = () => {
    element.removeEventListener("change", onChange);
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
export function bindRangeInput(rangeInput: string | HTMLInputElement, numberElement: RealTimeNumber): IConvergenceDomBinding {
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
export function bindColorInput(colorInput: string | HTMLInputElement, stringElement: RealTimeString): IConvergenceDomBinding {
  const element = resolveElement(colorInput) as HTMLInputElement;

  element.value = stringElement.value();

  const onChange = () => stringElement.value(element.value);
  element.addEventListener("input", onChange, false);

  const onRemoteValue = (event: StringSetValueEvent) => {
    if (!event.local) element.value = event.element.value();
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

/**
 * Binds an <select> element to a RealTimeString.
 *
 * @param selectInput {HTMLSelectElement}
 *   The select element to bind to the model.
 * @param stringElement {RealTimeString}
 *   The RealTimeString to bind to the input element.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindSingleSelect(selectInput: string | HTMLSelectElement, stringElement: RealTimeString): IConvergenceDomBinding {
  const element = resolveElement(selectInput) as HTMLSelectElement;

  element.value = stringElement.value();

  const onChange = () => stringElement.value(element.value);
  element.addEventListener("input", onChange, false);

  const onRemoteValue = (event: StringSetValueEvent) => {
    if (!event.local) element.value = event.element.value();
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

/**
 * Binds an <select multiple> element to a RealTimeArray.
 *
 * @param selectInput {HTMLSelectElement}
 *   The select element to bind to the model.
 * @param arrayElement {RealTimeArray}
 *   The RealTimeString to bind to the input element.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindMultiSelect(selectInput: string | HTMLSelectElement, arrayElement: RealTimeArray): IConvergenceDomBinding {
  const element = resolveElement(selectInput) as HTMLSelectElement;

  const selectItems = () => {
    const selected = arrayElement.value();
    for (let i = 0; i < element.options.length; i++) {
      const option = element.options[i];
      option.selected = selected.indexOf(option.value) >= 0;
    }
  };

  selectItems();

  const onChange = () => {
    const selected = [];
    for (let i = 0; i < element.options.length; i++) {
      const option = element.options[i];
      if (option.selected) {
        selected.push(option.value);
      }
    }
    arrayElement.value(selected);
  };
  element.addEventListener("input", onChange, false);

  const onRemoteValue = (event: ArraySetValueEvent) => {
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

/**
 * Binds a set of <input type="radio"> elements to a RealTimeString.
 *
 * @param radioInputs {HTMLInputElement[]}
 *   The input elements to bind to the model.
 * @param stringElement {RealTimeString}
 *   The RealTimeString to bind to the input elements.
 * @returns {{unbind: (function())}}
 *   An object containing an "unbind()" method that will unbid the input from the model.
 */
export function bindRadioInputs(radioInputs: (string | HTMLInputElement)[], stringElement: RealTimeString): IConvergenceDomBinding {
  const elements = radioInputs.map((input: string | HTMLInputElement )  => resolveElement(input) as HTMLInputElement);

  const selectItems = () => {
    const selected = stringElement.value();
    elements.forEach(input => input.checked = input.value === selected);
  };

  selectItems();

  const onChange = () => {
    let set = false;
    elements.forEach(input => {
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

  const onRemoteValue = (event: StringSetValueEvent) => {
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
