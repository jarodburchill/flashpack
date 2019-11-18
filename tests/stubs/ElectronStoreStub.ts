import { ISchema } from "../../src/models/Schema";

export class ElectronStoreStub {
  public store: ISchema;
  constructor(
    store: ISchema = {
      cards: [],
      darkMode: false,
      groups: [],
      nextId: 1,
      packs: [],
    }
  ) {
    this.store = store;
  }
  public get(key: string): any {
    return this.store[key];
  }
  public set(key: string, value: any): void {
    this.store[key] = value;
  }
}
