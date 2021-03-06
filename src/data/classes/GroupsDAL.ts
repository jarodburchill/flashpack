import _ = require("lodash");
import { IGroup, INewGroup } from "../../models/Group";
import { IPack } from "../../models/Pack";
import { Utilities } from "../../util/Utilities";
import { Validation } from "../../validation/Validation";
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
    if (requestedGroup === undefined) {
      throw new Error("Could not find matching Group ID.");
    }
    return requestedGroup;
  }
  public addGroup(newGroup: INewGroup): void {
    const errors: string[] = [];
    const group: IGroup = _.merge({ id: this.assignId() }, newGroup);
    const groups: IGroup[] = this.getGroups();
    if (!Validation.isValidGroup(group, errors)) {
      this.rollbackId();
      throw new Error(`Invalid Group:${Utilities.mapToString(errors)}.`);
    }
    groups.push(group);
    this.setGroups(groups);
  }
  public updateGroup(updatedGroup: IGroup): void {
    const errors: string[] = [];
    const groups: IGroup[] = this.getGroups();
    const updateIndex: number = groups.findIndex((group: IGroup) => {
      return group.id === updatedGroup.id;
    });
    if (updateIndex === -1) {
      throw new Error("Could not find matching Group to update.");
    }
    if (!Validation.isValidGroup(updatedGroup, errors)) {
      throw new Error(`Invalid Group:${Utilities.mapToString(errors)}.`);
    }
    groups[updateIndex] = updatedGroup;
    this.setGroups(groups);
  }
  public removeGroup(removalGroup: IGroup): void {
    const groups: IGroup[] = this.getGroups();
    const removeIndex: number = groups.findIndex((group: IGroup) => {
      return _.isEqual(group, removalGroup);
    });
    if (removeIndex === -1) {
      throw new Error("Could not find matching Group to remove.");
    }
    this.removeGroupPacks(removalGroup);
    groups.splice(removeIndex, 1);
    this.setGroups(groups);
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
}
