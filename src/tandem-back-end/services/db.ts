import { IActor } from "tandem-common/actors";
import { titleize } from "inflection";
import * as MemoryDsBus from "mesh-memory-ds-bus";
import { IApplication } from "tandem-common/application";
import { PostDsNotifierBus } from "tandem-common/busses";
import { loggable, document } from "tandem-common/decorators";
import { BaseApplicationService } from "tandem-common/services";
import { ApplicationServiceDependency } from "tandem-common/dependencies";
import {
  DSAction,
  DSFindAction,
  DSInsertAction,
  DSRemoveAction,
  DSUpdateAction,
  PostDSAction
} from "tandem-common/actions";

@loggable()
export default class DBService extends BaseApplicationService<IApplication> {

  private _db:IActor;

  didInject() {
    this._db = new PostDsNotifierBus(MemoryDsBus.create(), this.bus);
  }

  /**
   * finds one or more items against the database
   */

  @document("finds an item in the database")
  [DSFindAction.DS_FIND](action: DSFindAction) {
    return this._db.execute(action);
  }

  /**
   * removes one or more items against the db
   */

  @document("removes an item in the database")
  [DSRemoveAction.DS_REMOVE](action: DSRemoveAction) {
    return this._db.execute(action);
  }

  /**
   * inserts one or more items against the db
   */

  @document("inserts an item in the database")
  [DSInsertAction.DS_INSERT](action: DSInsertAction) {
    return this._db.execute(action);
  }

  /**
   */

  @document("updates an item in the database")
  [DSUpdateAction.DS_UPDATE](action: DSUpdateAction) {
    return this._db.execute(action);
  }
}

export const dependency = new ApplicationServiceDependency("db", DBService);
