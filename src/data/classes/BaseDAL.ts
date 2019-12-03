import ElectronStore = require("electron-store");
import { ISchema } from "../../models/Schema";

export abstract class BaseDAL {
  protected electronStore: ElectronStore<ISchema>;
  constructor(electronStore: ElectronStore<ISchema>) {
    this.electronStore = electronStore;
  }
  protected assignId(): number {
    const id: number = this.electronStore.get("nextId");
    this.electronStore.set("nextId", id + 1);
    return id;
  }
}
