import Store = require("electron-store");
import { IGroup } from "src/models/Group";
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
  getGroups() {
    return this.store.get("groups");
  }
  // should be private?
  setGroups(groups: Array<IGroup>) {
    this.store.set("groups", groups);
  }
  addGroup(group: IGroup) {
    const groups = this.getGroups();
    groups.push(group);
    this.setGroups(groups);
  }
  getGroup(id: number) {
    const groups = this.getGroups();
    const requestedGroup = groups.find((group: IGroup) => {
      return group.id === id;
    });
    return requestedGroup;
  }
  updateGroup(updatedGroup: IGroup) {
    const groups = this.getGroups();
    const updateIndex = groups.findIndex((group: IGroup) => {
      return group.id === updatedGroup.id;
    });
    groups[updateIndex] = updatedGroup;
    this.setGroups(groups);
  }
  removeGroup(id: number) {
    const groups = this.getGroups();
    const removeIndex = groups.findIndex((group: IGroup) => {
      return group.id === id;
    });
    groups.splice(removeIndex, 1);
    this.setGroups(groups);
  }
}
