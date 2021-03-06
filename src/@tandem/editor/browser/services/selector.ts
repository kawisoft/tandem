
import { MetadataKeys } from "@tandem/editor/browser/constants";
import { SyntheticDOMNode } from "@tandem/synthetic-browser";
import { FileEditorProvider } from "@tandem/sandbox";
import {
  loggable,
  bindable,
  RemoveMutation,
  flattenTree,
  ApplicationServiceProvider,
} from "@tandem/common";

import {
  SelectRequest,
  SelectAllRequest,
  RemoveSelectionRequest,
} from "@tandem/editor/browser/messages";

// @loggable()
// export default class SelectorService extends BaseApplicationService<any> {


//   [SelectEntitiesAtSourceOffsetAction.SELECT_ENTITIES_AT_SOURCE_OFFSET](message: SelectEntitiesAtSourceOffsetAction) {

//     // if (!this.app.workspace) return;

//     // const selectableSynthetics = flattenTree(this.app.workspace.document).filter((element) => {
//     //   return element;
//     // });

//     // const selectableEntities = this.app.workspace.file.entity.flatten().filter((entity: IEntity) => {
//     //   return entity.source.source ? String((<DocumentFile<any>>entity.source.source).path).indexOf(message.uri) !== -1 && entity.metadata.get(MetadataKeys.SELECTABLE) !== false : false;
//     // });

//     // const selection = [];
//     // const selectedSources = [];

//     // for (const entity of selectableEntities) {

//     //   const source = <BaseASTNode<any>>entity.source;

//     //   for (const cursor of message.data) {
//     //     if (source.inRange(cursor)) {

//     //       const parentIndex = selection.indexOf(entity.parent);

//     //       // there are cases where registered components will use the same source -- skip them.
//     //       if (selectedSources.indexOf(entity.source) !== -1) continue;

//     //       if (parentIndex > -1) {
//     //         selection.splice(parentIndex, 1);
//     //       }

//     //       selection.push(entity);
//     //       selectedSources.push(entity.source);
//     //     }
//     //   }
//     // }

//     // this.bus.dispatch(new SelectRequest(selection, false, false));
//   }

//   /**
//    */

//   async [RemoveSelectionRequest.REMOVE_SELECTION]() {

//     // await FileEditorProvider.getInstance(this.app.kernel).applyMutations(...this.app.workspace.selection.map((selection) => {
//     //   return new RemoveMutation(selection);
//     // }));

//     // this.bus.dispatch(new SelectRequest());
//   }

//   /**
//    */

//   [SelectRequest.SELECT]({ items, toggle, keepPreviousSelection }) {
//     // // const app = this.app;

//     // if (!items.length) {
//     //   return app.workspace.selection = [];
//     // }
//     // const prevSelection = app.workspace.selection;

//     // const type = items[0].type;

//     // const newSelection = [];

//     // if (keepPreviousSelection) {
//     //   newSelection.push(...prevSelection);
//     // } else {
//     //   newSelection.push(...prevSelection.filter((item) => !!~items.indexOf(item)));
//     // }

//     // for (const item of items) {
//     //   const i = newSelection.indexOf(item);
//     //   if (~i) {
//     //     if (toggle) {
//     //       newSelection.splice(i, 1);
//     //     }
//     //   } else {
//     //     newSelection.push(item);
//     //   }
//     // }

//     // // parents and children cannot be selected. For now - deselect
//     // // parent entities that appear in the selection
//     // newSelection.concat().forEach((node: SyntheticDOMNode) => {
//     //   let i;
//     //   if (node.parentNode && (i = newSelection.indexOf(node.parentNode)) !== -1) {
//     //     newSelection.splice(i, 1);
//     //   }
//     // });

//     // app.workspace.selection = newSelection;

//   }

//   [SelectAllRequest.SELECT_ALL]() {

//     // TODO - select call based on focused entity
//     // this.bus.dispatch(new SelectRequest(this.app.workspace.document.body.children, false, false));
//   }
// }

// // export const selectorServiceProvider = new ApplicationServiceProvider("selector", SelectorService);