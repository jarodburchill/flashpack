import ElectronStore = require("electron-store");
import { ISchema } from "src/models/Schema";
import { CardsDAL } from "./classes/CardsDAL";
import { DarkModeDAL } from "./classes/DarkModeDAL";
import { GroupsDAL } from "./classes/GroupsDAL";
import { PacksDAL } from "./classes/PacksDAL";

export class DAL {
  public darkMode: DarkModeDAL;
  public groups: GroupsDAL;
  public packs: PacksDAL;
  public cards: CardsDAL;
  constructor() {
    const electronStore: ElectronStore<ISchema> = new ElectronStore<ISchema>({
      defaults: {
        darkMode: false,
        nextId: 1,
        groups: [],
        packs: [],
        cards: [],
      },
    });
    this.darkMode = new DarkModeDAL(electronStore);
    this.groups = new GroupsDAL(electronStore);
    this.packs = new PacksDAL(electronStore);
    this.cards = new CardsDAL(electronStore);
  }
}
