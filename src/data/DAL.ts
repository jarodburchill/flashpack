import { DarkModeDAL } from "./classes/DarkModeDAL";
import { GroupsDAL } from "./classes/GroupsDAL";
import { PacksDAL } from "./classes/PacksDAL";

export class DAL {
  public darkMode: DarkModeDAL;
  public groups: GroupsDAL;
  public packs: PacksDAL;
  constructor() {
    this.darkMode = new DarkModeDAL();
    this.groups = new GroupsDAL();
    this.packs = new PacksDAL();
  }
}
