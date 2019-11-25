import { IGroup } from "src/models/Group";
import { INewPack, IPack } from "../../models/Pack";
import { BaseDAL } from "./BaseDAL";

export class PacksDAL extends BaseDAL {
  private getPacks(): IPack[] {
    return this.electronStore.get("packs");
  }
  private setPacks(packs: IPack[]): void {
    this.electronStore.set("packs", packs);
  }
  public getGroupPacks(groupId: number): IPack[] {
    const packs: IPack[] = this.getPacks();
    const groupPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId === groupId;
    });
    return groupPacks;
  }
  public removeGroupPacks(groupId: number): void {
    const packs: IPack[] = this.getPacks();
    const remainingPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId !== groupId;
    });
    this.setPacks(remainingPacks);
  }
  public addPack(group: IGroup, newPack: INewPack): void {
    const packs: IPack[] = this.getPacks();
    const pack: IPack = Object.assign(
      { id: this.assignId(), groupId: group.id },
      newPack
    );
    packs.push(pack);
    this.setPacks(packs);
  }
  public getPack(id: number): IPack {
    const packs: IPack[] = this.getPacks();
    const requestedPack: IPack = packs.find((pack: IPack) => {
      return pack.id === id;
    });
    if (requestedPack !== undefined) {
      return requestedPack;
    } else {
      throw new Error("Could not find matching Pack ID.");
    }
  }
  public updatePack(updatedPack: IPack): void {
    const packs: IPack[] = this.getPacks();
    const updateIndex: number = packs.findIndex((pack: IPack) => {
      return pack.id === updatedPack.id;
    });
    packs[updateIndex] = updatedPack;
    this.setPacks(packs);
  }
  public removePack(removalPack: IPack): void {
    const packs: IPack[] = this.getPacks();
    const removeIndex: number = packs.findIndex((pack: IPack) => {
      return pack.id === removalPack.id;
    });
    packs.splice(removeIndex, 1);
    this.setPacks(packs);
  }
}
