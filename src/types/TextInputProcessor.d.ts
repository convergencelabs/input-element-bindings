/**
 * The options that configure the TextInputProcessor
 */
export declare interface TextInputProcessorOptions {
  /**
   * The id of the element or the element to bind to.
   */
  element: string | HTMLInputElement | HTMLTextAreaElement;

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
  onRemove?: (index: number, value: string) => void;
}

/**
 * A helper class designed to enable processing of local and remote to an a HTMLInputElement
 * or a HTMLTextAreaElement.
 *
 * @param options {TextInputProcessorOptions}
 */
export declare class TextInputProcessor {
  constructor(options: TextInputProcessorOptions);

  public bind(): void;

  public unbind(): void;
}
