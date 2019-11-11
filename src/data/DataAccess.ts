import Store = require("electron-store");
import { ISchema } from "../models/Schema";

export class DataAccess {
  private store: Store<ISchema>;
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
  assignId() {
    const id = this.store.get("nextId");
    this.store.set("nextId", id + 1);
    return id;
  }
  getDarkMode() {
    return this.store.get("darkMode");
  }
  setDarkMode(darkMode: boolean) {
    this.store.set("darkMode", darkMode);
  }
  getCards() {
    return this.store.get("cards");
  }
}
