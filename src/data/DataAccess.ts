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
  private assignId(): number {
    const id: number = this.store.get("nextId");
    this.store.set("nextId", id + 1);
    return id;
  }
  public getDarkMode(): boolean {
    return this.store.get("darkMode");
  }
  public setDarkMode(darkMode: boolean): void {
    this.store.set("darkMode", darkMode);
  }
  public getGroups(): IGroup[] {
    return this.store.get("groups");
  }
  private setGroups(groups: IGroup[]): void {
    this.store.set("groups", groups);
  }
  public addGroup(newGroup: INewGroup): void {
    const groups: IGroup[] = this.getGroups();
    const group: IGroup = Object.assign({ id: this.assignId() }, newGroup);
    groups.push(group);
    this.setGroups(groups);
  }
  public getGroup(id: number): IGroup {
    const groups: IGroup[] = this.getGroups();
    const requestedGroup: IGroup = groups.find((group: IGroup) => {
      return group.id === id;
    });
    if (requestedGroup !== undefined) {
      return requestedGroup;
    } else {
      throw new Error("Could not find matching Group ID.");
    }
  }
  public updateGroup(updatedGroup: IGroup): void {
    const groups: IGroup[] = this.getGroups();
    const updateIndex: number = groups.findIndex((group: IGroup) => {
      return group.id === updatedGroup.id;
    });
    if (updateIndex > -1) {
      groups[updateIndex] = updatedGroup;
      this.setGroups(groups);
    } else {
      throw new Error("Could not find matching Group ID when updating.");
    }
  }
  public removeGroup(removalGroup: IGroup): void {
    const groups: IGroup[] = this.getGroups();
    const removeIndex: number = groups.findIndex((group: IGroup) => {
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
