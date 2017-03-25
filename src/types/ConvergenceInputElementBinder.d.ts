
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
export declare function bindTextInput(textInput, stringElement);

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
export declare function bindNumberInput(numberInput, numberElement);

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
export declare function bindCheckboxInput(checkboxInput, booleanElement);

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
export declare function bindRangeInput(rangeInput, numberElement);

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
export declare function bindColorInput(colorInput, stringElement);

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
export declare function bindSingleSelect(selectInput, stringElement);

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
export declare function bindMultiSelect(selectInput, arrayElement);

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
export declare function bindRadioInputs(radioInputs, stringElement);
