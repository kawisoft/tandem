import { inject } from "@tandem/common/decorators";
import { CoreEvent } from "@tandem/common/messages";
import { InsertTool } from "@tandem/editor/browser/stores/insert-tool";
import { BaseCommand } from "@tandem/common/commands";
import { SetToolRequest } from "@tandem/editor/browser/messages";
import { textToolProvider } from "../stores";
import { TEXT_TOOL_KEY_CODE } from "@tandem/html-extension/constants";
import { pointerToolProvider } from "@tandem/editor/browser/stores/pointer-tool";
import { evaluateMarkup, SyntheticDOMElement } from "@tandem/synthetic-browser";
import { ClassFactoryProvider, KernelProvider, Kernel } from "@tandem/common";
import { WorkspaceToolFactoryProvider, GlobalKeyBindingProvider } from "@tandem/editor/browser/providers";

abstract class BaseInsertElementTool extends InsertTool {

  @inject(KernelProvider.ID)
  private _kernel: Kernel;

  constructor(readonly options: any, editor: any) {
    super(editor);
    this.entityIsRoot = options.root;
  }

  get displayEntityToolFactory() {
    return this._kernel.query<WorkspaceToolFactoryProvider>(pointerToolProvider.id);
  }

  createSyntheticDOMElement() {

    return null;
    // width & height need to be 0'd since some elements have a size by default such as iframes
    // return evaluateMarkup(parseMarkup(`<${this.options.nodeName} ${this.options.attributes ? this.options.attributes + " " : ""}style="${this.options.style}position:absolute;width:0px;height:0px;" />`).childNodes[0], this.editor.document) as SyntheticDOMElement;
  }
}

function createElementInsertToolClass(options) {
  return class InsertElementTool extends BaseInsertElementTool {
    constructor(editor: any) {
      super(options, editor);
    }
  };
}

export const keyBindingProvider = [
  new GlobalKeyBindingProvider(TEXT_TOOL_KEY_CODE, class SetPointerToolCommand extends BaseCommand {
    execute(message: CoreEvent) {
      // this.bus.dispatch(new SetToolRequest(this.kernel.query<WorkspaceToolFactoryProvider>(textToolProvider.id)));
    }
  })
];

const insertElementKeyBindings = {
  "d" : { nodeName:  "div", attributes: ``, style: "background:rgba(0,0,0,0.1);" },
  "a" : { nodeName: "template", attributes: `title="Untitled"`, style: "background: white; position:absolute; ", root: true }
};

for (const key in insertElementKeyBindings) {
  addElementKeyBinding(key, insertElementKeyBindings[key]);
}

function addElementKeyBinding(key: string, options: { nodeName: string, attributes: string }) {
  keyBindingProvider.push(new GlobalKeyBindingProvider(key, class SetPointerToolCommand extends BaseCommand {
    execute(message: CoreEvent) {
      this.bus.dispatch(new SetToolRequest(<ClassFactoryProvider>this.kernel.link(new ClassFactoryProvider(null, createElementInsertToolClass(options)))));
    }
  }));
}