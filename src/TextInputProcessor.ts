import {resolveElement} from "./ElementUtils";
import StringChangeDetector from "@convergence/string-change-detector";
import {ITextInputProcessorOptions} from "./ITextInputProcessorOptions";
import {TextInputElement} from "./TextInputElement";

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
  private readonly _input: TextInputElement;
  private readonly _event: string;
  private readonly _detector: StringChangeDetector;

  constructor(options: ITextInputProcessorOptions) {
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

    this.bind();
  }

  bind() {
    this._input.addEventListener(this._event, this._onEvent);
  }

  unbind() {
    this._input.removeEventListener(this._event, this._onEvent);
  }

  insertText(index: number, value: string) {
    this._detector.insertText(index, value);
    this._input.value = this._detector.getValue();
  }

  removeText(index: number, length: number) {
    this._detector.removeText(index, length);
    this._input.value = this._detector.getValue();
  }

  setValue(value: string) {
    this._input.value = value;
    this._detector.setValue(value);
  }

  _onEvent = () => {
    this._detector.processNewValue(this._input.value);
  }
}
