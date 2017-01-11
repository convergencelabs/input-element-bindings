export declare interface TextInputProcessorOptions {
  element: string | HTMLInputElement;
  onChange?: Function;
  onRemove?: Function;
  event?: string;
}

export declare class TextInputProcessor {
  constructor(options: TextInputProcessorOptions);

  public bind(): void;

  public unbind();

}
