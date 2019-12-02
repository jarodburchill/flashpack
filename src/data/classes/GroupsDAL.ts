import _ = require("lodash");
import { IPack } from "src/models/Pack";
import { IGroup, INewGroup } from "../../models/Group";
import { BaseDAL } from "./BaseDAL";
import { PacksDAL } from "./PacksDAL";

export class GroupsDAL extends BaseDAL {
  public getGroups(): IGroup[] {
    return this.electronStore.get("groups");
  }
  private setGroups(groups: IGroup[]): void {
    this.electronStore.set("groups", groups);
  }
  public findGroup(searchGroup: IGroup): boolean {
    const groups: IGroup[] = this.getGroups();
    const requestedGroup: IGroup = groups.find((group: IGroup) => {
      return _.isEqual(group, searchGroup);
    });
    return requestedGroup !== undefined;
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
  public addGroup(newGroup: INewGroup): void {
    const groups: IGroup[] = this.getGroups();
    const group: IGroup = { ...{ id: this.assignId() }, ...newGroup };
    groups.push(group);
    this.setGroups(groups);
  }
  public updateGroup(updatedGroup: IGroup): void {
    const groups: IGroup[] = this.getGroups();
    const updateIndex: number = groups.findIndex((group: IGroup) => {
      return group.id === updatedGroup.id;
    });
    if (updateIndex !== -1) {
      groups[updateIndex] = updatedGroup;
      this.setGroups(groups);
    } else {
      throw new Error("Could not find matching Group to update.");
    }
  }
  private removeGroupPacks(group: IGroup): void {
    const packsDAL: PacksDAL = new PacksDAL(this.electronStore);
    const packs: IPack[] = packsDAL.getPacks();
    const removalPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId === group.id;
    });
    removalPacks.forEach((pack: IPack) => {
      packsDAL.removePack(pack);
    });
  }
  public removeGroup(removalGroup: IGroup): void {
    const groups: IGroup[] = this.getGroups();
    const removeIndex: number = groups.findIndex((group: IGroup) => {
      return _.isEqual(group, removalGroup);
    });
    if (removeIndex !== -1) {
      this.removeGroupPacks(removalGroup);
      groups.splice(removeIndex, 1);
      this.setGroups(groups);
    } else {
      throw new Error("Could not find matching Group to remove.");
    }
  }
}
