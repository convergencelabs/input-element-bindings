import {resolveElement} from "./ElementUtils";

export class TextInputProcessor {
  constructor(options) {
    const element = resolveElement(options.element);

    if (element instanceof HTMLInputElement) {
      if (element.type !== "text" &&
        element.type !== "url" &&
        element.type !== "tel" &&
        element.type !== "search" &&
        element.type !== "password") {
        throw new Error(`HTMLInputElement must of of type 'text', 'url', 'tel', or 'search': ${element.type}`);
      }
    } else if (!(element instanceof HTMLTextAreaElement)) {
      throw new Error(`Input element must either an HTMLTextInput or a HTMLTextArea.`);
    }

    this._input = element;

    this._onInsert = options.onInsert;
    this._onRemove = options.onRemove;
    this._event = options.event || "input";

    this._oldValue = this._input.value;
    this._listener = this._onEvent.bind(this);

    this.bind();
  }

  bind() {
    this._input.addEventListener(this._event, this._listener);
  }

  unbind() {
    this._input.removeEventListener(this._event, this._listener);
  }

  insertText(index, value) {
    const oldVal = this._input.value;
    const newVal =
      oldVal.substring(0, index) +
      value +
      oldVal.substring(index, oldVal.length);
    this.setValue(newVal);
  }

  removeText(index, length) {
    const oldVal = this._input.value;
    const newVal = oldVal.substring(0, index) +
      oldVal.substring(index + length, oldVal.length);
    this.setValue(newVal);
  }

  setValue(value) {
    this._input.value = value;
    this._oldValue = value;
  }

  _onEvent() {
    const newValue = this._input.value;

    let commonEnd = 0;
    let commonStart = 0;

    if (this._oldValue === newValue) {
      return;
    }

    while (this._oldValue.charAt(commonStart) === newValue.charAt(commonStart)) {
      commonStart++;
    }

    while (this._oldValue.charAt(this._oldValue.length - 1 - commonEnd) ===
        newValue.charAt(newValue.length - 1 - commonEnd) &&
        commonEnd + commonStart < this._oldValue.length &&
        commonEnd + commonStart < newValue.length) {
      commonEnd++;
    }

    // Characters were removed.
    if (this._oldValue.length !== commonStart + commonEnd) {
      if (this._onRemove) {
        this._onRemove(commonStart, this._oldValue.length - commonStart - commonEnd);
      }
    }

    // Characters were added
    if (newValue.length !== commonStart + commonEnd) {
      if (this._onInsert) {
        this._onInsert(commonStart, newValue.slice(commonStart, (newValue.length - commonEnd)));
      }
    }

    this._oldValue = newValue;
  }
}
