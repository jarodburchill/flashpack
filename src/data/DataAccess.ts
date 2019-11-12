import Store = require("electron-store");
import { IGroup, INewGroup } from "../models/Group";
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
  private assignId() {
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
  addGroup(newGroup: INewGroup) {
    const groups = this.getGroups();
    const group = Object.assign({ id: this.assignId() }, newGroup);
    groups.push(group);
    this.setGroups(groups);
  }
  getGroup(id: number) {
    const groups = this.getGroups();
    const requestedGroup = groups.find((group: IGroup) => {
      return group.id === id;
    });
    if (requestedGroup !== undefined) {
      return requestedGroup;
    } else {
      throw new Error("Could not find matching Group ID.");
    }
  }
  updateGroup(updatedGroup: IGroup) {
    const groups = this.getGroups();
    const updateIndex = groups.findIndex((group: IGroup) => {
      return group.id === updatedGroup.id;
    });
    if (updateIndex > -1) {
      groups[updateIndex] = updatedGroup;
      this.setGroups(groups);
    } else {
      throw new Error("Could not find matching Group ID when updating.");
    }
  }
  removeGroup(removalGroup: IGroup) {
    const groups = this.getGroups();
    const removeIndex = groups.findIndex((group: IGroup) => {
      return group === removalGroup;
    });
    if (removeIndex > -1) {
      groups.splice(removeIndex, 1);
      this.setGroups(groups);
    } else {
      throw new Error("Could not find matching Group object when deleting.");
    }
  }
}
