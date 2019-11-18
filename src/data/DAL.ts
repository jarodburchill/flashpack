import ElectronStore = require("electron-store");
import { ISchema } from "src/models/Schema";
import { DarkModeDAL } from "./classes/DarkModeDAL";
import { GroupsDAL } from "./classes/GroupsDAL";
import { PacksDAL } from "./classes/PacksDAL";

export class DAL {
  public darkMode: DarkModeDAL;
  public groups: GroupsDAL;
  public packs: PacksDAL;
  constructor() {
    const store: ElectronStore<ISchema> = new ElectronStore<ISchema>({
      defaults: {
        cards: [],
        darkMode: false,
        groups: [],
        nextId: 1,
        packs: [],
      },
    });
    this.darkMode = new DarkModeDAL(store);
    this.groups = new GroupsDAL(store);
    this.packs = new PacksDAL(store);
  }
}
