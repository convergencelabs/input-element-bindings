import {
  StringInsertEvent,
  StringRemoveEvent
} from "@convergence/convergence";
import {TextInputElement} from "./TextInputElement";
import {ISelection} from "./ISelection";
import {IValueChangedEvent} from "@convergence/convergence/typings/model/events/IValueChangedEvent";

export class TextInputUtils {
  static getTextSelection(element: TextInputElement): ISelection {
    if ((document as any).selection) {
      // IE < 9 Support
      const range = (document as any).selection.createRange();
      const rangeLen = range.text.length;
      range.moveStart('character', -element.value.length);
      const start = range.text.length - rangeLen;
      return {'start': start, 'end': start + rangeLen};
    }

    if (element.selectionStart || Number(element.selectionStart) === 0) {
      // IE >=9 and other browsers
      return {'start': element.selectionStart, 'end': element.selectionEnd};
    }

    return {'start': 0, 'end': 0};
  }

  static setTextSelection(selection: ISelection, element: TextInputElement) {
    const start = selection.start;
    const end = selection.end;

    if (element.setSelectionRange) {
      // IE >= 9 and other browsers
      element.focus();
      element.setSelectionRange(start, end);
    } else if ((element as any).createTextRange) {
      // IE < 9
      const range = (element as any).createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  static transformSelection(selection: ISelection, event: IValueChangedEvent) {
    return {
      start: TextInputUtils.transformIndex(selection.start, event),
      end: TextInputUtils.transformIndex(selection.end, event)
    };
  }

  static transformIndex(index: number, event: IValueChangedEvent) {
    if (event instanceof StringInsertEvent) {
      if (event.index <= index) {
        return index + event.value.length;
      }
      return index;
    } else if (event instanceof StringRemoveEvent) {
      const removeIndex = event.index;
      const length = event.value.length;
      if (index > removeIndex) {
        return index - Math.min(index - removeIndex, length);
      }
      return index;
    }
    throw new Error("Invalid operation type");
  }
}
