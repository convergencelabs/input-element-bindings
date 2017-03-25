import {resolveElement} from "./ElementUtils";
import StringChangeDetector from "@convergence/string-change-detector";

/**
 * A helper class designed to enable processing of local and remote to an a HTMLInputElement
 * or a HTMLTextAreaElement.
 *
 * @param options {{
 *   element: string | HTMLInputElement | HTMLTextAreaElement
 *   input: string
 *   onInsert: Function
 *   onRemove: Function
 * }}
 */
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
    this._event = options.event || "input";

    this._detector = new StringChangeDetector({
      value: this._input.value,
      onInsert: options.onInsert,
      onRemove: options.onRemove
    });
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
    this._detector.insertText(index, value);
    this._input.value = this._detector.getValue();
  }

  removeText(index, length) {
    this._detector.removeText(index, length);
    this._input.value = this._detector.getValue();
  }

  setValue(value) {
    this._input.value = value;
    this._detector.setValue(value);
  }

  _onEvent() {
    this._detector.processNewValue(this._input.value);
  }
}
