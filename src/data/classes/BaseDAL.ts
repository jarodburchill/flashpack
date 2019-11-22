import ElectronStore = require("electron-store");
import { ISchema } from "../../models/Schema";

export class BaseDAL {
  // TODO: rename to electronStore
  protected store: ElectronStore<ISchema>;
  constructor(store: ElectronStore<ISchema>) {
    this.store = store;
  }
  protected assignId(): number {
    const id: number = this.store.get("nextId");
    this.store.set("nextId", id + 1);
    return id;
  }
}
