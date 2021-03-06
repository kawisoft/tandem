import { inject } from "@tandem/common/decorators";
import { IDispatcher } from "@tandem/mesh";
import { BaseEditorTool } from "@tandem/editor/browser/stores";
import { POINTER_TOOL_KEY_CODE } from "@tandem/editor/browser/constants";
import { ApplicationServiceProvider } from "@tandem/common";
import { WorkspaceToolFactoryProvider } from "@tandem/editor/browser/providers";
import { IInjectable, PrivateBusProvider } from "@tandem/common";
import { SelectRequest, MouseAction, KeyboardAction, RemoveSelectionRequest } from "@tandem/editor/browser/messages";

// TODO - everything here should just be a command

export class PointerTool extends BaseEditorTool implements IInjectable {

  name = "pointer";

  @inject(PrivateBusProvider.ID)
  readonly bus: IDispatcher<any, any>;

  canvasMouseDown(message: MouseAction) {
    this.bus.dispatch(new SelectRequest());
  }

  canvasKeyDown(message: KeyboardAction) {

    // const selection = new VisibleDOMEntityCollection(...this.editor.selection);
    // if (selection.length) return;

    // if (selection["display"] == null) return;

    // const bounds = selection.display.bounds;

    // let left = bounds.left;
    // let top  = bounds.top;

    // if (message.keyCode === 38) {
    //   top--;
    // } else if (message.keyCode === 40) {
    //   top++;
    // } else if (message.keyCode === 37) {
    //   left--;
    // } else if (message.keyCode === 39) {
    //   left++;
    // } else {

    //   // deselect all when escape key is hit
    //   if (message.keyCode === 27) {
    //     this.bus.dispatch(new SelectRequest());
    //   }

    //   return;
    // }

    // message.preventDefault();

    // selection.display.position = { left, top };
  }

  deleteSelection() {
    this.bus.dispatch(new RemoveSelectionRequest());
  }
}

export const pointerToolProvider = new WorkspaceToolFactoryProvider("pointer", "cursor", "display", POINTER_TOOL_KEY_CODE, PointerTool);
