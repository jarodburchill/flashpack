import Store = require("electron-store");
import { ISchema } from "../../models/Schema";

export class BaseDAL {
  protected store: Store<ISchema>;
  constructor() {
    this.store = new Store<ISchema>({
      defaults: {
        cards: [],
        darkMode: false,
        groups: [],
        nextId: 1,
        packs: [],
      },
    });
  }
  protected assignId(): number {
    const id: number = this.store.get("nextId");
    this.store.set("nextId", id + 1);
    return id;
  }
}
