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
        packs: [],
      },
    });
  }
  public setDarkMode(darkMode: boolean) {
    this.store.set("darkMode", darkMode);
  }
  public getDarkMode() {
    return this.store.get("darkMode");
  }
}
