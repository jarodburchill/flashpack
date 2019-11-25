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
    groups[updateIndex] = updatedGroup;
    this.setGroups(groups);
  }
  public removeGroup(removalGroup: IGroup): void {
    const groups: IGroup[] = this.getGroups();
    const removeIndex: number = groups.findIndex((group: IGroup) => {
      return group.id === removalGroup.id;
    });
    groups.splice(removeIndex, 1);
    new PacksDAL(this.electronStore).removeGroupPacks(removalGroup.id);
    this.setGroups(groups);
  }
}
