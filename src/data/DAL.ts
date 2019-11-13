import { DarkModeDAL } from "./classes/DarkModeDAL";
import { GroupsDAL } from "./classes/GroupsDAL";

export class DAL {
  public darkMode: DarkModeDAL;
  public groups: GroupsDAL;
  constructor() {
    this.darkMode = new DarkModeDAL();
    this.groups = new GroupsDAL();
  }
}
