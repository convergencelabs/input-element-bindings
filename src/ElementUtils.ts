import {TextInputElement} from "./TextInputElement";

/**
 * @param element {HTMLElement | string}
 * @returns {HTMLElement}
 */
export function resolveElement(element: string | HTMLElement): HTMLElement {
  if (element instanceof HTMLElement) {
    return element;
  }

  if (typeof element === "string") {
    let candidate = document.getElementById(element);

    if (candidate === undefined) {
      throw new ReferenceError(`An element with id '${element}' could not be found.`);
    }
    return candidate as TextInputElement;
  }

  throw new Error("The supplied argument must be an HTMLElement or a string representing an element id.");
}
