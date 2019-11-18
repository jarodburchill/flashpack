import ElectronStore = require("electron-store");
import { ElectronStoreStub } from "tests/stubs/ElectronStoreStub";
import { ISchema } from "../../models/Schema";

export class BaseDAL {
  protected store: ElectronStore<ISchema> | ElectronStoreStub;
  constructor(store: ElectronStore<ISchema> | ElectronStoreStub) {
    this.store = store;
  }
  protected assignId(): number {
    const id: number = this.store.get("nextId");
    this.store.set("nextId", id + 1);
    return id;
  }
}
