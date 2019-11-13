import { INewPack, IPack } from "../../models/Pack";
import { BaseDAL } from "./BaseDAL";

export class PacksDAL extends BaseDAL {
  private getPacks(): IPack[] {
    return this.store.get("packs");
  }
  private setPacks(packs: IPack[]): void {
    this.store.set("packs", packs);
  }
  public getGroupPacks(groupId: number): IPack[] {
    const packs: IPack[] = this.store.get("packs");
    const groupPacks: IPack[] = packs.filter((pack: IPack) => {
      return pack.groupId === groupId;
    });
    return groupPacks;
  }
  public addPack(groupId: number, newPack: INewPack): void {
    const packs: IPack[] = this.getPacks();
    const pack: IPack = Object.assign(
      { id: this.assignId(), groupId },
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
    if (updateIndex > -1) {
      packs[updateIndex] = updatedPack;
      this.setPacks(packs);
    } else {
      throw new Error("Could not find matching Pack ID when updating.");
    }
  }
  public removePack(removalPack: IPack): void {
    const packs: IPack[] = this.getPacks();
    const removeIndex: number = packs.findIndex((pack: IPack) => {
      return pack === removalPack;
    });
    if (removeIndex > -1) {
      packs.splice(removeIndex, 1);
      this.setPacks(packs);
    } else {
      throw new Error("Could not find matching Pack object when deleting.");
    }
  }
}
