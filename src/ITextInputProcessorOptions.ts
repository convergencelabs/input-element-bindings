/**
 * The options that configure the TextInputProcessor
 */
import {TextInputElement} from "./TextInputElement";

export interface ITextInputProcessorOptions {
  /**
   * The id of the element or the element to bind to.
   */
  element: string | TextInputElement;

  /**
   * The name of the event to bind to.
   */
  event?: string;

  /**
   * A callback to invoke when the processing of the change indicates
   * an insert was performed.
   */
  onInsert?: (index: number, value: string) => void;

  /**
   * A callback to invoke when the processing of the change indicates
   * an remove was performed.
   */
  onRemove?: (index: number, length: number) => void;
}
